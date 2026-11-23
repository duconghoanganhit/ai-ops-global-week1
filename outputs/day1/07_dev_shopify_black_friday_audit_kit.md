# Anh Dev Quick-Fix USD — 3-Minute Shopify Black Friday Audit Kit & $50 → $250 Closing Templates

- **Project:** `Anh Dev Quick-Fix USD` (`$50` fixed 60-minute urgent fix · upsell to `$250/week` automation retainer)
- **Public Proof Repos:**
  - `https://github.com/duconghoanganhit/shopify-health-auditor`
  - `https://github.com/duconghoanganhit/ghl-n8n-lead-followup`
- **Target Window:** Black Friday / Cyber Monday Sprint (`23/11 – 30/11/2026`) — US & EU Shopify/WordPress founders & agencies.
- **Compliance:** Strictly non-spam — only share audits when a store owner publicly asks for help or opts in; clear fixed-price scope before billing.

---

## Part 1 — 10-Point "3-Minute Shopify Pre-Black-Friday Health Audit" Checklist
*(Run `shopify-health-auditor` + quick manual browser DevTools check; report only the top 2–3 real money-leaking findings.)*

1. **Mobile Add-to-Cart Visibility (Above the Fold):** Does the primary "Add to Cart" button sit visible without excessive scrolling on 390×844 mobile viewport, or do sticky chat/cookie/announcement bars cover it?
2. **Cart Drawer / Checkout Transition Latency:** Click "Add to Cart" → "Checkout" in Incognito. Any JS console errors, broken cart drawer overlays, or 404 assets stalling checkout?
3. **Promo Code & Automatic Discount Stacking Conflict:** Test a Black Friday code (`BF20`, etc.) in cart — does it clash with free-shipping thresholds or silently fail without an error message?
4. **Hero & Product Image Weight (LCP > 3.0s):** Any unoptimized 2MB–6MB PNG/JPEG hero images slowing mobile 4G load time (every +1s load time drops e-commerce conversion ~7%)?
5. **Broken Variant Selector / Sold-Out UX:** Switch size/color variants rapidly — does the price, image, and "Sold Out" state update cleanly without console exceptions?
6. **Leftover Uninstalled App Scripts:** Inspect Network tab / `<head>` for dead third-party `.js` requests (old review/upsell/popup apps returning 404/timeout and blocking rendering).
7. **Broken Announcement Bar / Collection Links:** Verify top banner CTA and hero button don't point to `/collections/all` empty pages or outdated promo URLs.
8. **Express Checkout & Trust Signals:** Check whether Apple Pay / Shop Pay / PayPal buttons render properly without overlapping the native checkout button on mobile.
9. **Lead Capture / Abandoned Cart Webhook Check:** Submit a test email in footer/popup — does it trigger cleanly into Klaviyo/Mailchimp/n8n without a silent CORS or 400 error?
10. **SEO & Social Share Preview (OG Tags):** Check `<title>` and `og:image` on the main Black Friday landing page so links shared on Instagram/WhatsApp/Facebook don't show a broken blank thumbnail.

---

## Part 2 — 4 Zero-Fluff DM / Comment Templates (Qualify & Confirm $50 Scope in <5 Min)

### Template 1 — Fast Qualification Reply (When someone posts a bug in Reddit/LinkedIn/FB Group)
```text
Hey [Name] — took a quick look at what you described. That usually points to [specific likely cause, e.g., a leftover app script colliding with the cart drawer JS / a webhook payload mismatch in n8n].

If you want it cleared today before Black Friday traffic hits, I can jump in for a flat $50 (60-minute focused fix, delivered today). Send over the store URL or error screenshot and I'll confirm within 5 minutes whether it fits the flat $50 scope before you pay anything.
```

### Template 2 — Sharing a Free 3-Minute Audit (Only when a founder asked for store feedback)
```text
Hey [Name], ran a quick 3-minute check on [Store Name] on mobile and caught 2 real conversion leaks right away:
1. [Specific concrete bug, e.g., Hero banner image is 4.2MB PNG pushing mobile load over 5s]
2. [Specific concrete bug, e.g., Sticky rewards widget covers the right edge of the Checkout button on iPhone viewport]

Both are clean 30–45 min fixes. Happy to send you the quick CSS/Liquid snippet to fix #2 yourself, or if you'd rather hand it off today so you can focus on ads, I do flat $50 same-day quick-fix slots. Let me know which is more helpful!
```

### Template 3 — Clean Scope Confirmation & Payment Link (Zero Scope Creep)
```text
Confirmed — I can get this fixed cleanly within 1 focused slot today.

Exact scope for flat $50:
• Fix: [1-sentence exact bug/integration deliverable]
• Verification: Before/after screenshot + quick Loom/test check on mobile & desktop
• Turnaround: Delivered within [X] hours of collaborator access

Payment: $50 flat via Wise / PayPal / Ko-fi (50% upfront to lock the slot, 50% once you verify it live). Let me know your preferred payment method and send Shopify collaborator code / n8n access and I'll start right away.
```

### Template 4 — Handoff Message That Plants the Seed for Repeat Work
```text
All set — [exact fix] is live and tested on both desktop and mobile (see quick verification notes below: [2 bullet points]).

While inside the theme/workflow, I also noticed [1 optional non-urgent improvement, e.g., your lead form isn't pushing UTM tags into your CRM / 3 leftover app scripts are still loading on every product page]. Nothing urgent for today, just flagging it so it's on your radar for after Cyber Monday.
```

---

## Part 3 — Transition Offer: Convert a Satisfied $50 Fix Client Into a $250/Week Retainer
*(Send 24 hours after a smooth $50 delivery — zero pushiness.)*

```text
Glad that fix held up cleanly for your store, [Name]!

Quick note in case it's useful heading into December: for founders who don't want to hire a full-time dev but keep running into small Shopify/WordPress tweaks, webhook breaks, or repetitive CSV/order automations every week, I keep 2 light "On-Call Automation & Fix" retainer spots open at $250/week (covers up to 5 focused fixes or 1 complete n8n/API workflow build per week, same-day turnaround, cancel anytime).

Zero pressure at all — if you ever just need another one-off $50 fix down the road, my inbox is always open.
```
