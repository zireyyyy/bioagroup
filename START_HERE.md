# BIO-A GROUP — START HERE — 2026-10-09

Repository zireyyyy/bioagroup. Read latest main SHA before further work, owner instructions override docs.

## Phase roadmap — OWNER AUTHORITY
1. PHASE 1: owner supplies remaining small patches; each is tested and frozen individually. **Current active: TURNSTILE-RUNTIME-NEGATIVE-QA1**. Production runtime test pending. Do not auto-jump into phase 2 until this final pending QA is resolved and owner agrees.
2. PHASE 2: FULL TABLET PASS — inspect whole website Tablet independently of already-accepted Desktop/Mobile. Some Tablet components are PASS (e.g., Footer), but SITE-WIDE Tablet is not PASS.
3. PHASE 3: cleanup/hardening only after Tablet PASS: unused CSS/JS, duplicate selectors, Merywood residue, assets/routes/helpers, VI/EN, SEO/canonical, link and overflow QA.
4. PHASE 4: production clean dist build and custom domain, sitemap/robots/404; final package and owner public launch approval. **404 artwork pending owner new image; must not create a guessed 404 page now.**

## Production-confirmed PASS/FROZEN
- Current accepted production `bioagroup.vn` remains in maintenance with real Bio-A logo + signed owner preview 14 days. `BIOA_SITE_MODE` stays `maintenance` or unset; Pages Functions Fail closed required. Only explicit owner approval may open `public`.
- Popup short form + auto-close, Cloudflare D1, Google Sheets CRM short IDs + H/I/K controls, Resend actual corporate email and personal forwarding PASS. `sheet_status=sent`, `email_status=sent` verified. Keep code, environment and UI untouched.
- Previously owner-approved Merywood-derived Home, Header/Menu, Footer, Cookie/Chat, Blog, Contacts, VI/EN and page content are frozen for surfaces actually tested. Tablet must never be implied by Desktop or Mobile PASS.

## Active patch checkpoint
- `TURNSTILE-RUNTIME-NEGATIVE-QA1` — test-only/documentation candidate. Source handler (`functions/api/lead.js`) and client/lead system remain unchanged.
- Repeatable offline tests added in `tests/lead-turnstile.test.mjs`, npm command `npm run test:turnstile`. Fake D1, fake siteverify; no external network. Negative new-lead requests must reject with 403 and cause zero inserts/deliveries; valid confirmation permits D1 continuation. See `docs/TURNSTILE_RUNTIME_QA.md`.
- Actual Cloudflare production negative test **PENDING OWNER TEST**. Owner should execute ONE controlled malformed-token request within authenticated site and verify 403 + zero matching ID in D1 + Sheets + Resend. Already-live positive form/Resend PASS remains frozen.
- A retry with *existing* submission ID returns `ok:true` by idempotency prior to challenge verification. It creates no new lead. Use unique ID for negative test; do not 'fix' retry semantics without evidence/owner request.

## Strict boundaries
- Do not change, leak or request `BIOA_PREVIEW_SECRET`, Resend or Google credentials. Keep all iNET/OneMail DNS untouched.
- Do not use PMX/Woo architecture. GLOBAL middleware / ROUTE transformed pages / COMPONENT lead endpoint. Source Merywood authority; patch tiny, build and test then push and write fresh handoff.
- Current rollback reference for this test-only patch: `74ac3533113db8b4d4a9a19ce677733afde16240`, which preserves security/production lead flow.
- 404 artwork **PENDING**; no replacement/auto-generation. Sitemap/robots cleanup **PENDING PHASE 3/4**.
