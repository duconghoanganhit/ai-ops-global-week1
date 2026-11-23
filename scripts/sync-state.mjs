#!/usr/bin/env node
/**
 * sync-state.mjs — Zero-dependency helper for ai-ops-global-week1
 * 1) Validates state.json
 * 2) Generates state.js (with inline output previews) so dashboard.html works 100% offline via file:// AND online via GitHub Pages
 * 3) Optional flags:
 *    --report : print a crisp 5-minute heartbeat status summary
 *    --serve  : start a lightweight local HTTP server on http://127.0.0.1:8787/dashboard.html
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STATE_JSON = path.join(ROOT, 'state.json');
const STATE_JS = path.join(ROOT, 'state.js');
const OUTPUTS_DIR = path.join(ROOT, 'outputs');

function collectOutputs(dir, base = '') {
  const result = {};
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(result, collectOutputs(full, rel));
    } else if (/\.(md|txt|json|csv|html)$/i.test(entry.name)) {
      try {
        const text = fs.readFileSync(full, 'utf8');
        // Keep bundle light: cap inline preview at 40KB per file
        result[`outputs/${rel}`] = text.length > 40000 ? `${text.slice(0, 40000)}\n\n... [Truncated in offline preview — open file directly for full content]` : text;
      } catch {
        // ignore unreadable files
      }
    }
  }
  return result;
}

export function syncStateJs() {
  const raw = fs.readFileSync(STATE_JSON, 'utf8');
  const state = JSON.parse(raw);
  const previews = collectOutputs(OUTPUTS_DIR);
  const banner = `// Auto-generated from state.json by scripts/sync-state.mjs — do not edit manually\n`;
  const payload =
    banner +
    `window.__AI_OPS_STATE__ = ${JSON.stringify(state, null, 2)};\n` +
    `window.__AI_OPS_PREVIEWS__ = ${JSON.stringify(previews)};\n`;
  fs.writeFileSync(STATE_JS, payload, 'utf8');
  return { state, previewCount: Object.keys(previews).length };
}

function printReport(state) {
  const openBlockers = (state.blockers || []).filter((b) => b.status !== 'resolved');
  const urgent = openBlockers.filter((b) => b.priority === 'Khẩn cấp').length;
  const activeDay = (state.schedule || []).find((d) => d.dayNumber === state.meta.currentDay) || state.schedule?.[0];
  const activeBlock = activeDay?.blocks?.find((b) => b.status === 'Đang chạy');
  console.log(`=== AI OPS HEARTBEAT (${state.meta.lastUpdated}) ===`);
  console.log(`Runner: ${state.meta.lastRunner} | Day ${state.meta.currentDay}/7 | Cost: $${state.briefing.costProposal.totalUsd}`);
  console.log(`Active Block: ${activeBlock ? `${activeBlock.start}-${activeBlock.end} ${activeBlock.title}` : 'None / Rest Window'}`);
  console.log(`Quota: Pro ~${state.quota.googleAiPro.estimatedRemainingPct}% | Cloud ${state.quota.cloudFreeTier.remainingPct}% (${state.quota.cloudFreeTier.requestsUsedToday}/${state.quota.cloudFreeTier.dailySoftCap} req)`);
  console.log(`Blockers open: ${openBlockers.length} (${urgent} Khẩn cấp) | Week Progress: ${state.dailyReview.weekCompletionPct}%`);
}

function startServer(port = 8787) {
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/plain; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
  };
  const server = http.createServer((req, res) => {
    const cleanUrl = (req.url || '/').split('?')[0];
    const target = cleanUrl === '/' ? '/dashboard.html' : cleanUrl;
    const filePath = path.resolve(ROOT, `.${target}`);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(filePath).pipe(res);
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`AI Ops Dashboard live at http://127.0.0.1:${port}/dashboard.html`);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { state, previewCount } = syncStateJs();
  console.log(`Synced state.json -> state.js (${previewCount} output previews embedded).`);
  if (process.argv.includes('--report')) printReport(state);
  if (process.argv.includes('--serve')) startServer(8787);
}
