## 2026-10-10 — MERYWOOD-DESKTOP-SCALE-RESTORE — candidate only

Owner rejected production e0a9c53 because independently imposed clamp(px,vw,px) minimums changed the Desktop-co-shrinking-into-Tablet system. EXACT Merywood owner-supplied main.txt reviewed: 769–1920px uses html/body font-size:.8333vw, header/email/button height 2.4479vw, footer Merywood Flex and viewport spacing. Owner requires 769px+ preserve Desktop-like structure, <=768 Mobile frozen; no whole-page transform:scale. This **candidate** removes the independently introduced 769–1200 clamp floors in bioa-source-components.mjs and bioa-transform.mjs; retains only two targeted cascade fixes: legacy BIO-A Header email min-height 42px is countered with min-height:0 while retaining Merywood height 2.4479vw; Zalo footer 30px forced artwork flex-basis is countered by a specific rule setting image dimensions and basis to 1.5625vw. No new breakpoint, no change to layout/DOM outside these source components.

Do not state Full Tablet PASS without actual cross-viewport visual parity. The previous pixel-minimum Chromium assertions were inappropriate for the user's parity requirement and disabled in candidate CI, pending ratio-driven browser regression. Other owner PASS surfaces (Desktop >=1201, Mobile <=768, 404, lead pipeline, Cloudflare security, Sanity FUTURE) are untouched. Main remains e0a9c53969088fe87a69cb8eb58f24cd37973637 until explicit owner approval after preview. Rollback/candidate base: e0a9c53. QA: compare Tablet 834/1024/1180 against Merywood Desktop-co-shrink for Header, Footer, CTA and product formats; check VI/EN Home and shared shell routes; verify link interactions; also Desktop 1366/1440 and Mobile 390/768 frozen. This candidate is deliberately a return to Desktop co-scale, not an attempt to make Tablet text separately bigger.

---
# BIO-A CURRENT — TABLET SOURCE RECOVERY2 — CANDIDATE

## 2026-10-10 — BIOA-TABLET-SOURCE-RECOVERY2 (candidate, screenshot follow-up)

Owner sent four actual tablet runtime screenshots after the production Source Component Rebuild commit `bf5b6c6`. They show: (1) Header email visibly taller than adjacent Zalo/language/CTA and small nav labels; (2) project CTA overly short with unreadable title/description/label (no longer blank); (3) BIO-A product formats tabs, list, description and heading remain too small; (4) footer Zalo artwork is much larger than its adjacent WhatsApp/Facebook/Telegram icons, with microtype across four BIO-A columns and company details. The source screenshot also shows horizontal page scrolling; investigate any remaining excess width using browser measurements rather than globally suppressing scrolling. Other Home sections, 404, Mobile and Desktop PASS frozen.

**Verified cascade root causes:** `patchA7Css` still assigns Header email link `min-height:42px!important` outside media queries. The new source owner overrode `height` but not `min-height`, so browser honors the stale 42px minimum. `patchZaloIconCss` sets Footer Zalo to `30px` `flex-basis:30px!important` at a higher CSS specificity than the generic source owner. These are proven rule conflicts. BIO-A-added project CTA and formats are using 1920-derived `vw` typography without a content-length floor, despite having more text than Merywood.

**Actual patch:**
- `bioa-source-components.mjs`: in its **existing and only 769–1200** media block, set Header email `min-height:0` and align email/social/lang/consult to shared accessible hit heights, while retaining source Header flex/DOM; protect CTA title/body/link readability with min-height ~165px and line-height/font floors; make Footer Zalo more specific with artwork, width, height **and flex-basis** bound to the same source icon slot. Improve Footer four-column/company text floors without changing columns or order.
- `bioa-transform.mjs`: in the already-existing added-product-formats 769–1200 owner only, set type/size floors on BIO-A tabs, items and description; no markup or interaction change.
- Add `tests/tablet-regression-screenshot-20261010.test.mjs` static checks and `tests/tablet-browser-smoke.mjs` that starts a local built-site server and uses actual Playwright Chromium computed layout at viewport widths 834,1024,1180. CI workflow runs responsive tests, build and browser checks. Real browser checks are a separate gate and must not be reported PASS until GitHub Actions confirms.

**Deployment workflow:** validate new candidate on branch `candidate/tablet-source-recovery-20261010` before fast-forwarding `main` with owner-requested fix. Preserve main `bf5b6c6` as rollback until owner runtime PASS. GitHub CI does not prove Cloudflare finished deployment. Full Tablet still FAIL/PENDING until owner checks source parity after deployment.

**Protected surfaces:** Merywood breakpoint 769+ Desktop-like, <=768 Mobile unchanged; >=1201 Desktop CSS unchanged; 404 PASS; Hero five accepted stats; shared VI/EN; Footer company identity and all four BIO-A columns preserved; forms and lead pipeline D1/Sheets/Resend, Turnstile, maintenance 14d/noindex middleware untouched; Sanity Free future only.

**Owner QA:** after confirmed production deployment compare at 834/1024/1180 CSS px: Home Header equal-height email/Zalo/lang/CTA and readable nav; project CTA full title, description and Zalo button on first load and after scroll; product-format tabs and list readable; Footer four columns+email/socials with same-size Zalo and no overflow. Check VI/EN shared header/footer on About, Cosmetics, Other Services, Blog, Contact. Regression at 390/768 Mobile and 1366/1440 Desktop must remain unchanged. Report each FAIL with screenshot/route/viewport.

---
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
