## 2026-10-10 — Candidate 1 redeploy request (branch-only)

The owner reports setting the site public and explicitly requests a new push/redeploy to inspect Source Component Rebuild Candidate 1. This commit retriggers the connected GitHub-to-Cloudflare Pages Preview deployment (if configured). NO production merge, no content/layout/middleware/CRM changes, and no change to BIOA_SITE_MODE, 14d protection code, noindex logic, D1/Sheets/Resend/Turnstile. Candidate 1 source remains the same as `81e6b6c`. Full runtime Tablet/desktop/mobile acceptance still pending.

A validation GitHub Actions workflow now checks Node 22 installation, responsive source tests, and build on candidate pushes/PRs. Build verification remains PENDING until the workflow actually runs and reports a result. Cloudflare Preview deployment and custom-domain publication are managed independently by Cloudflare, not inferred from the GitHub push. Rollback: main `b5c83ad` remains unmodified.

Owner test after a confirmed Preview build: VI/EN Home Header+CTA+Footer at 834/1024/1180px, compare frozen Desktop 1366/1440 and Mobile 390/768; verify other route shared shell and Zalo interactions. Do not claim Full Tablet PASS before that.

---
# BIO-A SOURCE COMPONENT REBUILD
Read current main/branch + mandatory docs before edits. Source component rebuild candidate lives in separate branch, main protected b5c83ad. Single CSS owner bioa-source-components.mjs handles 769–1200 Header/Footer/CTA in both Home and shared routes. Original Merywood main.txt had Header/Footer but no project CTA selector, so custom BIO-A CTA only. Full build/runtime and owner QA not yet PASS; do not merge blindly. See START_HERE for route/device checklist and security locks.
