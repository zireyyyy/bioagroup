## 2026-10-10 — Candidate 1 redeploy request (branch-only)

The owner reports setting the site public and explicitly requests a new push/redeploy to inspect Source Component Rebuild Candidate 1. This commit retriggers the connected GitHub-to-Cloudflare Pages Preview deployment (if configured). NO production merge, no content/layout/middleware/CRM changes, and no change to BIOA_SITE_MODE, 14d protection code, noindex logic, D1/Sheets/Resend/Turnstile. Candidate 1 source remains the same as `81e6b6c`. Full runtime Tablet/desktop/mobile acceptance still pending.

A validation GitHub Actions workflow now checks Node 22 installation, responsive source tests, and build on candidate pushes/PRs. Build verification remains PENDING until the workflow actually runs and reports a result. Cloudflare Preview deployment and custom-domain publication are managed independently by Cloudflare, not inferred from the GitHub push. Rollback: main `b5c83ad` remains unmodified.

Owner test after a confirmed Preview build: VI/EN Home Header+CTA+Footer at 834/1024/1180px, compare frozen Desktop 1366/1440 and Mobile 390/768; verify other route shared shell and Zalo interactions. Do not claim Full Tablet PASS before that.

---
# BIO-A — SOURCE COMPONENT REBUILD candidate (2026-10-10)

**Authority:** current protected main b5c83ad628960456db68a1c7adc68a17e2f61a1a. This is a separate review branch; main unchanged pending verification. Merywood owner's main.txt supplies Header/Footer DOM responsive rules (769–1920px viewport-fluid, <=768px Mobile). Merywood main.txt does NOT include source CSS for the BIO-A custom project CTA, so preserve BIO-A CTA DOM and make visibility reliable at 769–1200 rather than falsely claiming exact source parity.

**Code delta (only 3 components):** New bioa-source-components.mjs is single owned 769–1200px stylesheet for Merywood-derived Header and Footer and BIO-A custom project CTA. Original class/DOM retained, brand, 5 nav links, four footer category groups and company information preserved. Removed old 769–1200 overrides from patchA7Css, patchA8Css, patchD5FooterTabletCss, patchZaloIconCss; removed duplicate CTA compact Tablet rules from bioa-transform.mjs, leaving independent product format components untouched. Both Home and applySharedShell use same owner style. CTA content has a visible fallback when data-bioa-aos reveal and Smooth Scrollbar do not synchronize.

**PROTECTION:** Desktop >=1201px and Mobile <=768px owner PASS unchanged, all other sections locked. 404 owner PASS, maintenance signed 14 days / noindex, D1/Sheets/Resend/Turnstile, consent/lead/chat behavior preserved. No Sanity integration.

**VERIFICATION HONESTY:** JS candidate and test sources parsed successfully. GitHub connector cannot run build; no successful npm test/build or real browser visual regression has been measured yet. Do NOT promote to main or label Tablet PASS until candidate is built and reviewed. There may still be earlier fixed-pixel desktop rules; the new scoped owner is last in shared and Home style chains.

**OWNER QA / NEXT:** On a preview build test VI+EN Home, About, Cosmetics, Services, Blog, Contacts at 834/1024/1180: Header one row; email and icons contained; Footer logo/company + four columns + socials in same Desktop-style row; CTA text, Zalo icon and link visible on first load and after scroll. Check 390/768 Mobile and 1366/1440 Desktop against frozen screenshots. Then address only evidenced failures, update handoff, promote on owner PASS. Rollback candidate by staying on main b5c83ad.
