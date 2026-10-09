# BIO-A GROUP — START HERE — 2026-10-09
Repo: https://github.com/zireyyyy/bioagroup; use latest main HEAD and owner's production-confirmed evidence. Documentation-only PASS promotion from prior main c869d3cda1cee5c1dd56bf23dfda2e32fefe96d7. No code or environment variables changed in this checkpoint.

## Production PASS / FROZEN
- Owner confirmed RESEND-ACTIVATION1 end-to-end LIVE PASS: D1 `sheet_status=sent`, D1 `email_status=sent`, email received at `contact@bioagroup.vn` AND forwarded to owner's personal mailbox. Sending subdomain DNS/Resend/API Key was configured and production code accepted the test. Do not reopen Resend/D1/Sheets/CRM or popup without a defect.
- MAINTENANCE-LOGO-SESSION14D1 confirmed PASS: correct Bio-A logo and host-only HMAC signed private preview session lasting 14 days; site remains intentionally closed to public. Production requires Pages Fail closed; only explicit owner authorization may set `BIOA_SITE_MODE=public` and redeploy. `BIOA_PREVIEW_SECRET` is private and must not appear in repo/chat.
- Prior PASS/LOCKED owner surfaces: Merywood-derived Home/shared Header/Mobile Menu/Footer/Cookie/Chat, Blog structure, Contacts, VI/EN, popup source UI & Consent, success auto-close, D1 canonical lead record, Google Sheets CRM short `bioa_` IDs and H/I/K dropdown/colors. Source authority and Desktop/Tablet/Mobile independent regression rules remain.

## Next active block: TURNSTILE-RUNTIME-NEGATIVE-QA1 (PENDING)
- `TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` production configuration and `GET /api/lead/config` enabled:true/misconfigured:false previously observed. **Negative server validation of absent or invalid challenge token and no D1/Sheets/Resend side effects remains unverified.** Do not mark anti-spam full PASS based solely on configuration.
- Then prelaunch check: authenticated site navigation, consent, popup, single legitimate test, maintenance guest/alternate domain lock, HTTPS and UI regression on Desktop/Tablet/Mobile in VI/EN. **Do not go public until owner explicitly asks.**
- Resend API already in `functions/api/lead.js`, no code rewrite needed. Delivery to inbox owner verified. Retries for failed email not implemented; defer until requested.

## Architecture / operational contracts
- GLOBAL security: `functions/_middleware.js`, all-routes `_routes.json` from `build.mjs`, Cloudflare Pages Fail closed and private 14-day owner preview.
- COMPONENT lead pipeline: `functions/api/lead.js` → Cloudflare D1 source of truth; Google Sheets mirror; Resend optional email notification; client `assets/js/bioa-leads.js` handles UX. ROUTE website from Merywood transformations. No PMX/Woo-specific concepts.
- DNS: Cloudflare authoritative; `notify.bioagroup.vn` Resend sender; root `bioagroup.vn` corporate mail iNET/OneMail MX/SPF/DKIM stays unchanged.
- PASS promotion entails docs only. Rollback strategy: retain existing maintenance-enabled owner-PASS main; if Resend fails, inspect `email_status` + Resend Events and restore configuration without touching lead UI/D1/Sheets. Never revert to no-gate baseline.

Authority: latest START_HERE + NEW_CHAT_CONTINUATION_PROMPT, AGENTS, WORKFLOW, SOURCE_MAP, feature docs. Historic FULL_HANDOFF sections may show superseded pending statuses; current top checkpoint overrides them.
