#!/usr/bin/env node
/**
 * cloud-runner.mjs — Zero-dependency $0 Cloud Runner (GitHub Actions + Gemini API Free Tier)
 * Runs autonomously when the user's PC is powered off.
 *
 * Hard Guardrails:
 * 1) Strictly skips 20:00–23:59 Asia/Ho_Chi_Minh (user's 4h personal free window).
 * 2) Strictly $0: uses only Gemini API Free Tier (gemini-3.8-flash -> auto-downgrade gemini-3.5-flash-lite).
 * 3) Never-Stop Protocol: always executes an independent value task from cloudQueue or Daily Review.
 * 4) Tracks requests & tokens on every cycle and updates state.json + state.js atomically.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncStateJs } from './sync-state.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STATE_FILE = path.join(ROOT, 'state.json');

function getVietnamNow() {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const hour = Number(parts.hour === '24' ? '0' : parts.hour);
  const minute = Number(parts.minute);
  const dateStr = `${parts.year}-${parts.month}-${parts.day}`;
  const isoVn = `${dateStr}T${String(hour).padStart(2, '0')}:${parts.minute}:${parts.second}+07:00`;
  return { dateStr, hour, minute, minutesOfDay: hour * 60 + minute, isoVn };
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

async function callGeminiFreeTier({ apiKey, model, prompt }) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
      'Api-Revision': '2026-05-20',
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  const textBody = await res.text();
  if (!res.ok) {
    const err = new Error(`Gemini API HTTP ${res.status}: ${textBody.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }

  const data = JSON.parse(textBody);
  const outputText =
    data.output_text ||
    (data.steps || [])
      .filter((s) => s.type === 'model_output')
      .flatMap((s) => s.content || [])
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('\n') ||
    (data.outputs || [])
      .filter((o) => o.type === 'text')
      .map((o) => o.text)
      .join('\n');

  const totalTokens = data.usage?.total_tokens || Math.ceil((prompt.length + outputText.length) / 4);
  return { outputText: outputText.trim(), totalTokens };
}

function updateDailyScheduleStatuses(state, vn) {
  const dayEntry = state.schedule.find((d) => d.date === vn.dateStr) || state.schedule[0];
  if (!dayEntry) return { dayEntry: null, currentBlock: null };

  state.meta.currentDay = dayEntry.dayNumber;
  let currentBlock = null;

  for (const block of dayEntry.blocks) {
    if (block.status === 'Nghỉ 4h') continue;
    const startMin = toMinutes(block.start);
    const endMin = toMinutes(block.end);
    if (vn.minutesOfDay >= endMin) {
      if (block.status !== 'Đã xong' && block.status !== 'Bị kẹt') {
        block.status = 'Đã xong';
      }
    } else if (vn.minutesOfDay >= startMin && vn.minutesOfDay < endMin) {
      block.status = 'Đang chạy';
      currentBlock = block;
    } else if (block.status === 'Đang chạy') {
      block.status = 'Sắp chạy';
    }
  }
  return { dayEntry, currentBlock };
}

async function main() {
  const vn = getVietnamNow();
  const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));

  // 1) STRICT 4-HOUR REST WINDOW GUARD (20:00 - 23:59 GMT+7)
  if (vn.hour >= 20) {
    console.log(`[REST WINDOW] Current VN time is ${vn.isoVn} (20:00-24:00 protected). Exiting cleanly with 0 tokens.`);
    return;
  }

  // Reset Cloud daily counters if date changed
  const lastDate = (state.quota.cloudFreeTier.lastChecked || '').slice(0, 10);
  if (lastDate && lastDate !== vn.dateStr) {
    state.quota.cloudFreeTier.requestsUsedToday = 0;
    state.quota.cloudFreeTier.tokensUsedToday = 0;
    state.quota.cloudFreeTier.remainingPct = 100;
  }

  const { dayEntry, currentBlock } = updateDailyScheduleStatuses(state, vn);
  const apiKey = process.env.GEMINI_API_KEY || '';
  const cloudQuota = state.quota.cloudFreeTier;

  state.meta.lastUpdated = vn.isoVn;
  state.meta.lastRunner = 'Cloud $0 (GitHub Actions)';
  state.meta.cloudActivated = Boolean(apiKey);
  cloudQuota.lastChecked = vn.isoVn;

  if (!apiKey) {
    cloudQuota.status = 'Chưa có GEMINI_API_KEY (Heartbeat only — 0 tokens)';
    state.heartbeatLog.unshift({
      time: vn.isoVn,
      runner: 'Cloud $0',
      block: currentBlock ? `${currentBlock.start}-${currentBlock.end}` : 'Sync',
      action: 'Cập nhật lịch tự động (chưa gắn GEMINI_API_KEY trong GitHub Secrets nên chưa gọi LLM).',
      quotaSnapshot: `Cloud ${cloudQuota.remainingPct}% | Pro ~${state.quota.googleAiPro.estimatedRemainingPct}%`,
      costUsd: 0,
    });
    state.heartbeatLog = state.heartbeatLog.slice(0, 40);
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    syncStateJs();
    console.log('Updated schedule heartbeat without GEMINI_API_KEY.');
    return;
  }

  // 2) Pick next task (matching active block first, else Never-Stop next pending task)
  const queue = state.cloudQueue || [];
  let task =
    queue.find((q) => q.status === 'pending' && currentBlock && q.blockId === currentBlock.id) ||
    queue.find((q) => q.status === 'pending');

  // If 18:30+ and no Daily Review generated yet for today, create an automatic Daily Review task
  if (!task && vn.minutesOfDay >= 18 * 60 + 30) {
    const reviewFile = `outputs/day${state.meta.currentDay}/99_daily_review_day${state.meta.currentDay}.md`;
    if (!fs.existsSync(path.join(ROOT, reviewFile))) {
      task = {
        id: `auto-review-d${state.meta.currentDay}`,
        day: state.meta.currentDay,
        blockId: currentBlock?.id || `d${state.meta.currentDay}-b7`,
        projectId: 'system',
        title: `Daily Review — Day ${state.meta.currentDay} (${vn.dateStr})`,
        outputFile: reviewFile,
        status: 'pending',
        prompt: `Write a concise, brutally honest Daily Review in Vietnamese for Day ${state.meta.currentDay} (${vn.dateStr}) of our 20h/day $0 global USD AI operations system. Current projects snapshot: ${JSON.stringify(state.projects.map((p) => ({ name: p.name, progressPct: p.progressPct, eta: p.eta, status: p.status })))}. Open blockers: ${JSON.stringify(state.blockers.filter((b) => b.status === 'open').map((b) => ({ priority: b.priority, title: b.title })))}. Include: 1) Real outputs produced, 2) Honest USD readiness assessment, 3) Bottlenecks, 4) Concrete adjustments for tomorrow. Keep it under 350 words.`,
      };
    }
  }

  if (!task) {
    cloudQuota.status = 'Hoạt động tốt (Hết hàng đợi — chờ nạp task mới)';
    state.heartbeatLog.unshift({
      time: vn.isoVn,
      runner: 'Cloud $0',
      block: currentBlock ? `${currentBlock.start}-${currentBlock.end}` : 'Idle',
      action: 'Heartbeat $0: Tất cả task trong cloudQueue đã hoàn thành, lịch và trạng thái đã đồng bộ.',
      quotaSnapshot: `Cloud ${cloudQuota.remainingPct}% (${cloudQuota.requestsUsedToday}/${cloudQuota.dailySoftCap} req)`,
      costUsd: 0,
    });
    state.heartbeatLog = state.heartbeatLog.slice(0, 40);
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    syncStateJs();
    console.log('No pending tasks in cloudQueue. Synced heartbeat.');
    return;
  }

  // 3) Model selection with automatic quota-saving downgrade & 429/503 fallback chain
  const modelChain =
    cloudQuota.remainingPct <= cloudQuota.autoDowngradeThresholdPct
      ? [cloudQuota.fallbackModel, 'gemini-2.5-flash']
      : [cloudQuota.primaryModel, cloudQuota.fallbackModel, 'gemini-2.5-flash'];

  if (cloudQuota.requestsUsedToday >= cloudQuota.dailySoftCap) {
    cloudQuota.status = 'Đạt giới hạn an toàn ngày (Tự dừng bảo vệ Free Tier)';
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    syncStateJs();
    console.log('Reached daily soft cap. Skipping LLM call to preserve $0 Free Tier.');
    return;
  }

  let model = modelChain[0];
  let result = null;
  let lastErr = null;
  for (const candidate of modelChain) {
    model = candidate;
    try {
      result = await callGeminiFreeTier({ apiKey, model: candidate, prompt: task.prompt });
      break;
    } catch (err) {
      lastErr = err;
      if ([429, 500, 502, 503, 504].includes(err.status)) {
        console.log(`Model ${candidate} returned HTTP ${err.status}; trying next fallback model...`);
        continue;
      }
      throw err;
    }
  }

  // Never block GitHub Pages deploy on a temporary upstream 503 spike
  if (!result) {
    cloudQuota.status = `Tạm nghẽn upstream (HTTP ${lastErr?.status || 'err'}) — tự thử lại nhịp sau`;
    state.heartbeatLog.unshift({
      time: vn.isoVn,
      runner: 'Cloud $0',
      block: currentBlock ? `${currentBlock.start}-${currentBlock.end}` : `Day ${state.meta.currentDay}`,
      action: `Upstream Gemini API tạm nghẽn (${lastErr?.status || '503'}) trên toàn chuỗi fallback — đã bỏ qua an toàn để vẫn deploy Dashboard và tự thử lại sau 30p.`,
      quotaSnapshot: `Cloud ${cloudQuota.remainingPct}% (${cloudQuota.requestsUsedToday}/${cloudQuota.dailySoftCap} req)`,
      costUsd: 0,
    });
    state.heartbeatLog = state.heartbeatLog.slice(0, 40);
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    syncStateJs();
    console.log('All models temporarily busy; saved heartbeat cleanly with exit 0 so Pages still deploys.');
    return;
  }

  // 4) Write real deliverable to outputs/
  const outAbs = path.join(ROOT, task.outputFile);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  const header = `<!-- Generated autonomously by Cloud $0 (${model}) at ${vn.isoVn} -->\n\n`;
  fs.writeFileSync(outAbs, header + result.outputText + '\n', 'utf8');

  // 5) Update queue, project progress, schedule block, and quota metrics
  task.status = 'done';
  task.completedAt = vn.isoVn;
  task.modelUsed = model;
  task.tokensUsed = result.totalTokens;

  cloudQuota.requestsUsedToday += 1;
  cloudQuota.tokensUsedToday += result.totalTokens;
  const reqPct = Math.max(0, Math.round((1 - cloudQuota.requestsUsedToday / cloudQuota.dailySoftCap) * 100));
  const tokPct = Math.max(0, Math.round((1 - cloudQuota.tokensUsedToday / cloudQuota.tokenSoftCap) * 100));
  cloudQuota.remainingPct = Math.min(reqPct, tokPct);
  cloudQuota.status = cloudQuota.remainingPct <= cloudQuota.autoDowngradeThresholdPct
    ? `Tiết kiệm Quota (${model})`
    : `Đang chạy tốt (${model})`;

  const proj = state.projects.find((p) => p.id === task.projectId);
  if (proj) {
    proj.progressPct = Math.min(95, proj.progressPct + 8);
    proj.latestOutput = {
      title: task.title,
      path: task.outputFile,
      updatedAt: vn.isoVn,
    };
  }

  if (currentBlock && !currentBlock.outputPath) {
    currentBlock.outputPath = task.outputFile;
  }

  if (!state.dailyReview.realOutputsToday.some((x) => x.startsWith(task.outputFile))) {
    state.dailyReview.realOutputsToday.push(`${task.outputFile} — ${task.title}`);
  }
  state.dailyReview.weekCompletionPct = Math.min(100, state.dailyReview.weekCompletionPct + 3);

  state.heartbeatLog.unshift({
    time: vn.isoVn,
    runner: `Cloud $0 (${model})`,
    block: currentBlock ? `${currentBlock.start}-${currentBlock.end}` : `Day ${state.meta.currentDay}`,
    action: `Hoàn tất tự động: ${task.title} → ${task.outputFile} (${result.totalTokens.toLocaleString()} tokens).`,
    quotaSnapshot: `Cloud ${cloudQuota.remainingPct}% (${cloudQuota.requestsUsedToday}/${cloudQuota.dailySoftCap} req)`,
    costUsd: 0,
  });
  state.heartbeatLog = state.heartbeatLog.slice(0, 40);

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  syncStateJs();
  console.log(`Cloud run succeeded: ${task.outputFile} (${result.totalTokens} tokens via ${model}).`);
}

main().catch((err) => {
  console.error('Cloud runner error:', err);
  process.exit(1);
});
