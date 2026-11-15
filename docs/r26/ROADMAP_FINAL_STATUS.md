# BIO-A — Roadmap final status (R26, 2026-11-15)

## Status levels

| Status | Meaning |
|---|---|
| **TECH PASS** | Code, build and automated + browser QA done by the developer |
| **CONTENT PENDING** | Real business content or an owner decision is still needed (see `OWNER_INPUTS_REQUIRED.md`) |
| **OWNER PASS** | The owner accepted it visually / functionally |
| **PUBLIC LAUNCH** | Maintenance off; only on the owner's order |

**Overall:**
- TECH PASS for the whole roadmap; deployed to Production behind maintenance.
- OWNER PASS exists for R24RC2 (the website) and the real lead E2E.
- Everything added after R24RC2 (CMS, R26) waits for OWNER UAT.
- PUBLIC LAUNCH: not started.

## Ledger

| Group | Item | Status | Evidence / next |
|---|---|---|---|
| **A. Website** | All routes VI/EN (Home, About, Gia Công Mỹ Phẩm, Dịch Vụ Khác + service family redirects, Contacts, Blog list/pagination/38 articles, Careers list + 3 roles, Privacy, Cookie, 404) | **OWNER PASS (R24RC2)** — frozen; R26 changed only `<head>` metadata | `CHANGELOG_AND_PARITY.md`, scope gate R26 |
| | Responsive Desktop/Tablet/Mobile, sliders, modal, cookie, menu, language switch | TECH PASS (R26 E2E on the real Preview) · OWNER PASS (R24RC2) | `FINAL_QA.md` §2 |
| | SEO head: canonical, hreflang (new), og:locale (fixed), sitemap/robots, JSON-LD | TECH PASS | `tests/r26-seo-content-audit.mjs` 0 issues |
| | Merywood/Estonia text leaks, broken internal links, Cyrillic | TECH PASS (none) | same audit |
| | Images still from Merywood (39/41 CMS positions + blog/careers stock) | **CONTENT PENDING**: owner replaces gradually in Studio; not a technical blocker (owner decision R26) | `MEDIA_REPLACEMENT_MAP.md` |
| | Footer "Services" column clipped by 13 px at a 312 px viewport (390 phone at 125% zoom, EN) | Pre-existing in R24RC2 (P3); not changed (frozen owner-PASS Footer) | `FINAL_QA.md` findings |
| | Quote modal does not close with ESC (close button works) | Merywood source behaviour (P3); not changed | idem |
| **B. CMS (Sanity)** | Studio, 41 image positions / 67 cuts, 6 text pages (410 VI/EN slots), 38 blog posts, careers statuses, 9 SEO pages, legal approval | TECH PASS · OWNER UAT pending | `FINAL_QA.md` §4 |
| | Production isolation: pinned release only, never live Sanity on `main` | TECH PASS (tests + Production build log `CMS mode: off`) | `DEPLOY_AND_ROLLBACK.md` |
| | First Production content release | **CONTENT PENDING** (owner approval) | `OWNER_INPUTS_REQUIRED.md` #3 |
| | Editor preview after merge: branch `cms-preview` = `main` (GitHub Action), Sanity webhook → `cms-preview` deploy hook | TECH PASS | `DEPLOY_AND_ROLLBACK.md` §CMS preview |
| **C. Content / legal** | Privacy, Cookie VI/EN (Law 91/2025 + Decree 356/2025) | Text in code; **CONTENT PENDING** (L-1, L-2, L-4, L-5, counsel) | `OWNER_INPUTS_REQUIRED.md` #2 |
| | Careers: 3 SAMPLE roles, owner-gated details | **CONTENT PENDING** (real openings) | #4 |
| **D. Lead / Cloudflare / security** | Lead form + `/api/lead` (D1 first, Sheets, Resend, Turnstile, idempotency, rate limit) | **OWNER PASS** (real E2E 2026-11-12) · R26 isolated staging re-run 10/10 | `FINAL_QA.md` §5 |
| | Maintenance gate on `bioagroup.vn`, `bioagroup.pages.dev`, unknown hosts | TECH PASS (unchanged) | |
| | Production deployment hash URLs | **FIXED in R26** for new deployments (PROD-HASH-GATE). Older deployment URLs = owner decision #7 | |
| | Pages Functions `fail_open` | **FIXED in R26**: `false` (Production + Preview) | `cloudflare-config-change.txt` |
| | `www.bioagroup.vn` 522 | **BLOCKED BY AUTHORITY** (DNS/custom domain = owner) | #6 |
| | QA TEST lead row in Production D1/Sheet | Waiting for owner approval to delete | #8 |
| **E. Chatbot** | UI honest demo (owner PASS); `/api/chat` gateway with adapters (disabled / mock / http), flag, validation, timeout, rate limit, no message logging, fail closed | TECH PASS (8/8 gateway tests, 60/60 UI probe) · AI LIVE **CONTENT PENDING** (provider, cost, retention) | `docs/CHAT_AI_INTEGRATION.md` |
| **Release** | Production deploy of the technical build (maintenance ON) | TECH PASS — see `START_HERE.md` | |
| | Public launch | Not started (owner) | #1 |
