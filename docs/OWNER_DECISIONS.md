# BIO-A — OWNER DECISIONS (final table, 2026-11-10)

This is the single list of decisions only the owner can make. Nothing here is implemented until the owner picks an option in writing. Details:
- legal and content: `docs/LEGAL_CONTENT_BLOCKERS.md`;
- business data: `docs/BUSINESS_IDENTITY.md`;
- runtime: `docs/RUNTIME_DEPENDENCIES.md`;
- AI chat: `docs/CHAT_AI_INTEGRATION.md`.

| # | Area | Current state (verified) | Options | Recommended | Blocks |
|---|---|---|---|---|---|
| OD-1 | **Privacy Policy** VI/EN | Merywood Estonian text ("Bio-A Group OÜ, Reg no. 16386898, Tallinn", Estonian acts/DPA), English on VI. Only the mailbox was changed to contact@bioagroup.vn | (a) supply approved VI+EN text + legal entity (content-only swap); (b) temporary short notice from confirmed data, wording approved by owner/counsel | (a) | Release |
| OD-2 | **Cookie Policy** VI/EN | Same Merywood text; its cookie list does not match the third parties actually used | (a) approved text + real cookie/third-party inventory (BI-3) | (a) | Release |
| OD-3 | **Careers** VI/EN | **DECIDED 2026-11-10 (owner), done in BIOA-R24 CONTENT-C1:** Merywood Careers page no longer built; `/careers/` VI/EN = noindex redirect to Contacts, out of sitemap; Footer recruitment items removed; legacy recruitment slugs → Contacts; About team CTA → Contacts | reopen only with real BIO-A openings (content-only) | — | — |
| OD-4 | **Shipping Policy** link | **DECIDED 2026-11-10 (owner), done in BIOA-R24:** link removed from the Footer VI/EN (no confirmed retail shipping policy) | add back only with an owner-approved policy page | — | — |
| OD-5 | **Merywood rights** | Build input = owner-supplied Merywood HTML/CSS/JS bundle. Still loaded live from merywood.com: `modal.js`, `input.js` (synchronous: page hangs when merywood.com is slow), CF7 js/css (differs from upstream 6.1.7), theme/upload images incl. cookie icon | (a) written right to use + self-host (D2/D4); (b) replace with BIO-A-owned code/images; (c) accept live dependency (risk documented) | (a) or (b) | Release + Preview build (D2) |
| OD-6 | **Legal entity / business data** | Brand, domain, e-mail, hotline, MST 0318126597, factory address confirmed in source. Not supplied: registered legal name, registered office, privacy contact | supply BI-1, BI-2; BI-4 BIO-A app icon PNG 180×180 + default share image | — | OD-1/OD-2 |
| OD-7 | **Cloudflare Preview build** | Build needs the private bundle (`BIOA_SOURCE_DIR`, 1.8 MB, SHA-256 pinned in `source-manifest.json`). Cloudflare/CI have no storage, no token, no fetch step | see "Steps to a Cloudflare Preview" below | private storage + Preview-only token | Preview |
| OD-8 | **Cloudflare settings** | Pages Functions **Fail open** (docs require fail closed); every non-main branch auto-deploys a Preview; Production `NODE_VERSION=20`, CI Node 22, local 26 | Fail closed; Preview branch control (custom branches); one Node version | Fail closed; deploy only the candidate branch; Node 20 everywhere | Production |
| OD-9 | **Lead capture activation** | Code ready (D1-first, success only after D1 write). Not configured: D1 `BIOA_LEADS_DB` + migration, `LEAD_RATE_SECRET`, Turnstile keys, Sheets/Resend. Preview hosts keep `/api` locked → the form shows an honest error there | follow "Safe lead activation" below; requires OD-1 (privacy text must name processors) | after OD-1 | Live leads |
| OD-10 | **AI chat** | UI = local preview (honest reply, no claim of receipt); gateway `/api/chat` READY, flag OFF; no provider | provider, endpoint/API key (Pages secrets), retention policy, approval to wire UI (FUT-CHAT-1) | after OD-1 | AI LIVE |
| OD-11 | **Tablet aesthetics** | T6 "Quy Trình Hợp Tác": owner FAIL 2026-11-10 → HOWWORKS-T1 (BIOA-R24): equal card heights, photo = text column, full 12px copy. VI cards stay ~49% taller than Merywood at 834 (trade-off in `docs/HOME_REGRESSION_R24.md`). A4 icon 01/02 colour still open | accept the trade-off, or supply shorter VI copy (content-only) | accept | Owner visual |
| OD-12 | **Owner visual QA** | `docs/OWNER_QA_CHECKLIST.md` | PASS/FAIL per row | — | Release |

## Steps to a Cloudflare Preview (all missing today)
1. **OD-5 (D2):** written confirmation that the Merywood-derived bundle may be used as build input.
   - The bundle cannot be committed: the repository is public.
2. **Private storage (D1):** upload the existing bundle `D:\BIOA_WORKSPACE\_source_bundle\p0b1-v1` (1.8 MB) as one archive to private storage.
   - Options: a private Cloudflare R2 bucket, or a release asset in a private GitHub repository.
3. **Read-only token (D6):** create a token that can only read that object.
   - Store it as a Cloudflare Pages **Preview-only** encrypted variable (e.g. `BIOA_SOURCE_URL`, `BIOA_SOURCE_TOKEN`).
   - Store it as a GitHub Actions secret if CI must build.
   - Never put it in Git.
4. **Engineering step (after 1–3):** add `tools/fetch-source-bundle.mjs` and make the build fetch the archive before `verify-source-bundle`.
   - The script downloads the archive with the token and unpacks it to a temp dir.
   - It sets `BIOA_SOURCE_DIR` to that dir.
   - The existing SHA-256 manifest check stays fail-closed.
   - Build command: `node tools/fetch-source-bundle.mjs && npm run build`.
   - Add the same step to the CI workflow and add the candidate branch to its trigger list.
5. **OD-8 (D7):** in Cloudflare Pages → Settings → Builds → Branch control, allow Preview only for the candidate branch.
   - Confirm the Preview environment has **no** Production D1/Sheets/Resend secrets.
6. **D10:** run `npm ci && npm run build` once under Node 20, the Production version, before pushing.
7. Push only the candidate branch (new name; never PR #10/#11 or `main`).
8. Open a **Draft PR**.
9. Wait for CI and the Cloudflare Preview build.
10. Run the browser suites against the Preview hash.
11. Owner QA on that hash.

## Safe lead activation (when the owner allows Production leads)
1. OD-1 approved: the Privacy text names D1/Cloudflare, Google Sheets, Resend, retention period and data-subject contact.
2. Create D1 `bioa-leads` and apply `migrations/0001_bioa_leads.sql`.
   - Bind `BIOA_LEADS_DB` and set `LEAD_RATE_SECRET` (≥32 chars) for **Production only**.
   - Use a separate test database if a Preview test is wanted.
3. Turnstile: set both `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The endpoint refuses half-configured pairs.
4. Optional delivery: `GOOGLE_SERVICE_ACCOUNT_JSON` + `GOOGLE_SHEET_ID`, `RESEND_API_KEY` + `LEAD_FROM` + `LEAD_NOTIFY_TO`.
   - Use a confirmed internal mailbox.
   - D1 stays the source of truth.
5. Set Pages Functions to **Fail closed** (OD-8).
6. One end-to-end test with fake data on Desktop/Tablet/Mobile × VI/EN. Check the D1 row, `sheet_status`/`email_status`, double submit (idempotent id) and the rate limit (5/IP/hour).
7. Only then switch `BIOA_SITE_MODE=public` (separate owner decision).
   - Verified locally: `tests/lead-form-probe.mjs` (no request leaves the browser) shows "đã nhận / received" only when the server answers `ok:true`.
   - Locked Preview API, `ok:false` and 429 all show honest error/limit messages.
   - `tests/maintenance-host-gate.test.mjs` 6/6 (Preview `/api` stays private).
