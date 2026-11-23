# Anh Dev — 5 Productized Fixed-Price Automation & Web Fix Packages ($50 – $250)

- **Project:** `Sửa Lỗi Web & Tự Động Hóa ($50) — Anh Dev`
- **Target Market:** US / UK / CA / AU / EU Shopify Store Owners, Solo Founders & Small Agencies
- **Live $50 Offer Page ($0 Host):** `https://duconghoanganhit.github.io/ai-ops-global-week1/outputs/day2/02_dev_quickfix_offer_page.html`
- **Public Proof Repos:**
  - `https://github.com/duconghoanganhit/shopify-health-auditor`
  - `https://github.com/duconghoanganhit/ghl-n8n-lead-followup`
- **Compliance & Billing Terms:** Flat USD scope confirmed in writing before billing · 50% deposit via Wise / PayPal / Ko-fi, 50% upon verified handoff · Theme duplicate or workflow JSON backup taken before any production change.

---

## Quick Price Ladder (Copy-Paste Comparison Table for Quotes & DMs)

| Package | Flat Price (USD) | Turnaround | Best For | Primary Upgrade Path |
| :--- | :---: | :---: | :--- | :--- |
| **1. Same-Day 60-Min Quick Fix** | **$50** | Same day (1–4 hrs) | One annoying bug blocking sales or leads today | → Package 2 (`$99`) or 3 (`$150`) |
| **2. Store Speed & Mobile Checkout Polish** | **$99** | 24 hours | Slow Shopify mobile pages & hidden checkout friction | → Package 4 (`$150`) or 5 (`$250/wk`) |
| **3. Lead Form → CRM n8n Pipeline** | **$150** | 48 hours | Agencies & B2B teams dropping leads between form & CRM | → Package 5 (`$250/wk`) |
| **4. Shopify Ops & Revenue Alert Sync** | **$150** | 48 hours | Stores needing live order/VIP/low-stock/refund alerts | → Package 5 (`$250/wk`) |
| **5. Weekly On-Call Tech & Automation Retainer** | **$250 / week** | Same-day priority | Busy founders who want one reliable engineer on standby | Recurring weekly USD |

---

## Package 1 — Same-Day 60-Minute Quick Fix (`$50` Flat)

**One-Line Pitch:** *Clear one stubborn Shopify, WordPress, webhook, or script blocker today—flat $50, confirmed in 5 minutes before you pay.*

### Exact Deliverables
- Root-cause diagnosis and surgical fix for **1 isolated issue** (examples: mobile CSS/z-index widget blocking checkout, broken Liquid section, WordPress layout/plugin conflict, failing n8n/Make webhook payload, or a small Python/Node CSV/API script).
- Pre-change safety backup (`Backup-PreFix-YYYYMMDD` Shopify theme copy or exported n8n/Make blueprint JSON).
- Before-and-after verification proof (desktop + 390px mobile viewport screenshot or live test payload log).
- Plain-English summary of what broke, what changed, and which file/node was touched.

### Turnaround & Warranty
- **Turnaround:** Same day (typically 1–4 hours after deposit & access).
- **Warranty:** 48-hour fix guarantee on the exact code/node modified.

### Hard Scope Boundaries (Zero Scope Creep)
- **Included:** 1 clearly defined bug or micro-task fitting within 60 minutes of focused engineering.
- **Not Included:** Multi-page redesigns, custom Shopify app builds, full site migrations, or third-party SaaS outages outside your store/workflow. If the issue exceeds 60 minutes, I tell you upfront before billing and quote Package 2 or 3 instead.

---

## Package 2 — Store Speed & Mobile Checkout Polish (`$99` Flat)

**One-Line Pitch:** *Stop leaking mobile buyers during peak traffic—cut heavy above-the-fold bloat and clear checkout friction in 24 hours.*

### Exact Deliverables
- Full automated + manual front-end check using `shopify-health-auditor` across Home, Collection, Product, and Cart pages.
- Image weight cleanup for top revenue pages: convert oversized hero/banner PNGs to responsive WebP and apply `fetchpriority="high"` on the LCP image + lazy-loading below the fold.
- Safe removal of up to **5 orphaned `<script>` / stylesheet remnants** left behind by uninstalled Shopify apps inside `theme.liquid`.
- Mobile viewport checkout/cart audit (390px iPhone & 430px Pro Max): fix sticky chat/rewards/announcement bars overlapping "Add to Cart" or "Checkout" buttons.
- Missing meta/Open Graph tag repair for cleaner social shares.
- Concise 1-page Before vs. After Report (Lighthouse/PageSpeed numbers + screenshots + backup theme preserved).

### Turnaround & Warranty
- **Turnaround:** 24 hours from Collaborator access.
- **Warranty:** 7-day regression fix on any layout or script change made during the polish.

### Hard Scope Boundaries
- **Included:** Front-end asset optimization, dead-script cleanup, and mobile cart/checkout UI fixes inside your active Shopify theme (1 store, up to 5 key templates).
- **Not Included:** Rewriting Shopify core checkout code (Checkout Extensibility / Shopify Plus custom apps), removing active third-party apps you still rely on, or guaranteeing a 100/100 Lighthouse score while heavy marketing pixels (Meta/TikTok/Klaviyo/Hotjar) remain active.

---

## Package 3 — Lead Form → CRM + Instant Follow-Up n8n Pipeline (`$150` Flat)

**One-Line Pitch:** *Never drop a warm lead again—connect your website forms to your CRM with clean formatting, deduplication, and failure alerts in 48 hours.*

### Exact Deliverables
- Production-ready **n8n** (self-hosted or n8n Cloud) or **Make.com** workflow based on the `ghl-n8n-lead-followup` architecture:
  1. **Webhook Intake:** Capture leads from Webflow, Typeform, Tally, WordPress/Elementor, Shopify, or Meta Lead Ads.
  2. **Clean & Normalize:** Trim whitespace, standardize E.164 phone numbers, validate email format, and split full names cleanly.
  3. **Deduplicate & Upsert:** Create or update contact in **1 target CRM** (GoHighLevel, HubSpot, Airtable, Notion, or Google Sheets) without creating duplicate records.
  4. **Instant Notification & Follow-Up:** Trigger immediate owner alert (Slack/Email) + optional CRM workflow/tag for instant SMS or email reply.
  5. **Error Guardrail:** Built-in retry logic plus an automated Slack/Email alert if the webhook or CRM API returns 4xx/5xx.
- Exported JSON workflow backup + 1-page plain-English handover doc (credentials, webhook URL, how to test).
- End-to-end live test with 3 sample payloads (valid lead, duplicate lead, malformed payload).

### Turnaround & Warranty
- **Turnaround:** 48 hours from access + API keys.
- **Warranty:** 14-day bug-fix warranty if any node fails under normal payload structure.

### Hard Scope Boundaries
- **Included:** 1 intake source → 1 CRM destination → 1 notification channel (up to 12 workflow nodes).
- **Not Included:** Hosting fees for n8n/Make/CRM, writing long multi-week sales email copy, or custom OAuth app verification for private enterprise ERPs (quoted separately).

---

## Package 4 — Shopify Ops & Revenue Protection Automation (`$150` Flat)

**One-Line Pitch:** *Turn manual store checks into quiet background alerts—sync orders, VIP buyers, refunds, and low-stock warnings automatically.*

### Exact Deliverables
- **1 complete operational workflow** (built in n8n, Make, or a clean scheduled Python/Node script on GitHub Actions `$0` tier) covering up to **3 automated triggers** from your Shopify store:
  - **High-Value / VIP Order Alert:** Instant Slack or email ping whenever an order exceeds your chosen threshold (e.g., `$200+`) so your team can add a personal note or priority packing.
  - **Clean Daily Ops Sheet Sync:** Append structured order, discount code, shipping, and refund rows into Google Sheets / Airtable for accurate margin tracking (zero manual CSV exports).
  - **Low-Stock & Refund Spike Alert:** Automated warning when a top SKU drops below your safety threshold or when consecutive failed payments/refunds occur.
- Built-in error notification + clean repository/JSON export so you own 100% of the automation with zero monthly agency lock-in.

### Turnaround & Warranty
- **Turnaround:** 48 hours from Shopify Admin API token & destination sheet/Slack webhook.
- **Warranty:** 14-day stability guarantee on schema mapping and scheduled triggers.

### Hard Scope Boundaries
- **Included:** 1 Shopify store, up to 3 operational triggers/alerts, 1 reporting destination (Google Sheets, Airtable, or Slack/Email).
- **Not Included:** Full ERP/accounting reconciliation (QuickBooks/Xero tax ledger), multi-warehouse 3PL EDI integrations, or historical backfill beyond the last 30 days of orders unless scoped separately.

---

## Package 5 — Weekly On-Call Tech & Automation Retainer (`$250 / Week`)

**One-Line Pitch:** *Your dedicated part-time engineer for Shopify, WordPress, n8n/Make, and scripts—priority same-day turnaround, cancel any week.*

### Exact Deliverables
- Up to **5 focused quick-fix tasks** OR **5 engineering hours per week** (whichever fits your queue better—always agreed transparently before work starts).
- Covers Shopify Liquid/CSS tweaks, WordPress upkeep, n8n/Make workflow maintenance & new micro-automations, Python/Node data scripts, and landing-page fixes.
- **Priority Response:** Same-day acknowledgment and queue pickup aligned with US morning hours (`08:00–13:00 EST`).
- **Weekly Friday Summary:** Short bullet recap of completed fixes, hours used, and any preventive issues spotted.
- **Zero Lock-In:** Billed weekly upfront (`$250/week` via Wise/PayPal); pause or cancel any week with 1 message.

### Hard Scope Boundaries
- **Included:** Ongoing fixes, small features, automation maintenance, and urgent troubleshooting up to the weekly 5-hour/5-task cap.
- **Not Included:** Unused hours do not roll over across weeks; 24/7 pager SLA outside agreed response hours; ground-up SaaS or native mobile app development.

---

## 3 Ready-to-Send Quote & Upsell Scripts (Native US English)

### Script A — Turning a `$50` Quick-Fix Inquiry into Package 2 (`$99`) When Multiple Store Issues Show Up
```text
Hi [Name],

I checked [Store URL] — the mobile button overlap itself is an easy $50 quick fix (about 40 mins).

While inspecting the theme, I also spotted two heavier conversion drags: a 4.2MB hero image and 3 leftover scripts from uninstalled apps still firing on product pages.

Two clean options:
1. $50 flat — I fix just the mobile checkout overlap today (same day).
2. $99 flat — I clear the overlap PLUS compress the top hero images, remove those dead app scripts, and send a full before/after mobile speed report within 24 hours.

Either way works for me — let me know which option you'd like and I'll confirm exact steps before we start.
```

### Script B — Pitching Package 3 (`$150`) to an Agency or Founder with Broken Lead Forms
```text
Hi [Name],

Quick look at what you described: rather than just patching the single broken field, the safest move is a clean Lead Form → CRM pipeline with deduplication and a Slack alert if the webhook ever throws a 4xx/5xx again.

I build this as a flat $150 package (48-hour delivery, you own the full n8n/Make JSON backup, 14-day bug-fix guarantee).

If you'd prefer to keep it minimal first, I can also just repair the current payload error for $50 flat today. Let me know which route fits better.
```

### Script C — Smooth Post-Delivery Seed for Package 5 (`$250 / Week`) — Send 24 Hours After a Great `$50` or `$150` Handoff
```text
Hi [Name],

Glad to see [the fix / pipeline] is running cleanly!

Since Q4 / Cyber Week traffic tends to surface small site and webhook surprises at the worst moments, I keep 2 spots open for a flat $250/week on-call tech & automation retainer (up to 5 tasks or 5 hours/week, same-day priority, cancel any week with zero lock-in).

No rush at all — just wanted to put it on your radar in case you'd like someone on standby this week.
```

---

## Pre-Send Client Onboarding Checklist (3 Minutes, Protects Both Sides)
1. **Confirm Scope in Writing:** Paste exact package name, price (`$50 / $99 / $150 / $250`), deliverables, and turnaround in DM/email.
2. **Collect Least-Privilege Access:**
   - Shopify: Collaborator request (Themes + Apps/Orders only—never ask for owner password).
   - WordPress: Temporary admin account or staging login.
   - n8n/Make: Workspace invite or scoped API token.
3. **Collect 50% Deposit** (or 100% upfront for `$250/week` retainer) via Wise / PayPal / Ko-fi before editing production.
4. **Always Snapshot First:** Duplicate theme or export JSON before writing line 1.
5. **Log Payout for Tax Records:** Save invoice/receipt screenshot + USD amount + date in monthly bookkeeping folder.
