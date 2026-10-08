# BIO-A GROUP — START HERE (2026-10-08)
Repo zireyyyy/bioagroup. Previous production source baseline 0446f80cbf008370fe5a677909cce8e951719ae9. Current patch candidate **MAINTENANCE-PRIVATE1**: PENDING Cloudflare build + owner private/public test.

**Owner-confirmed PASS/FROZEN:** website bioagroup.vn Cloudflare Pages HTTPS, D1 and Google Sheets receiving lead, compact bioa_ IDs, CRM H/I/K dropdown/colors, successful Send auto-closes popup, Home/Shared Header/Menu/Footer/Cookie/Chat/Blog/Contacts and responsive visual baseline. Turnstile config enabled true but actual rejection tests pending. Resend notify mail still pending; iNET/OneMail mailbox DNS must remain unchanged.

**New GLOBAL Cloudflare security authority**: functions/_middleware.js plus build.mjs emitting dist/_routes.json include /* exclude []. Public/default always gets maintenance 503 with noindex, assets/APIs gated; page.dev also gated. Secret BIOA_PREVIEW_SECRET provisioned only in Cloudflare Production, 32–128 URL-safe chars; private URL /_bioa-access?key=<secret> signs an 8h cookie and redirects; sign out /_bioa-access/exit. Optional BIOA_SITE_MODE defaults maintenance and only explicit public releases it. CRITICAL Cloudflare Runtime Fail closed required, or Functions quota fail-open could reveal static files. Read docs/MAINTENANCE_ACCESS.md.

**PENDING:** Secret setup by user, Fail closed, redeploy, owner guest/incognito and signed-in test across Desktop/Tablet/Mobile, Resend DNS and email sending, live Turnstile verification. Rollback 0446f80c but rollback exposes site. No other code owner touched. GLOBAL / ROUTE / COMPONENT and source Merywood retained.

Prioritize latest START_HERE + NEW_CHAT_CONTINUATION_PROMPT + AGENTS and mandatory docs over historical state in FULL_HANDOFF.