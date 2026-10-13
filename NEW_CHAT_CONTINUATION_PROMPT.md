## 2026-10-13 — FOOTER-LEGACY-SOURCE1: corrections after explicit owner FAIL

**Owner explicitly corrected the historical PASS wording:** only `FIRST-PAINT1` at `d328e76f8320b608694751034915fa0bca63010f` was PASS (no lateral movement on page load/navigation). It is **permanently frozen** and must survive EVERY future release; do not treat this as full Footer/Zalo PASS. The earlier claims describing all responsive areas as PASS were mistaken. **Footer Zalo icon and leftover Headquarters are FAIL** on user-provided 2026-10-13 Tablet screenshots, including after `d328e76` and following commits. Desktop and Mobile previously accepted sections must remain unaffected except exact owner-requested Footer artwork correction.

**Root-cause source comparison:** Merywood original ZIP `pages/index/index.html` has a single original logo child under `.footer-top__left` and three source `.socials__link` buttons. Modern live Merywood source appears to add Headquarters/Estonia information under this logo, captured in the owner's Tablet screenshot. BIO-A's `addFooterCompanyInfo()` appended the correct factory info *without removing source-only nonlogo siblings*. Separately, `footerSocials()` adds a fourth Zalo `<a>` without `.socials__link` and uses 30px circular PNG; prior square-height override only addressed outer box size, not DOM/artwork parity.

**Minimal candidate, not a redesign:** in `bioa-home-refine.mjs`, retain the existing Merywood Footer logo, remove source-only direct children in `.footer-top__left` then append one approved BIO-A company info block. Construct Footer Zalo as a Merywood `.socials__link` using already committed `/assets/zalo-bioa.svg` cream glyph (Footer only); preserve links, hover, four category columns and Mobile Zalo PNG. Normalize Desktop icon optical size to 23px and Tablet to 1.5972vw (the 23/1440 ratio) at the original owners; no new breakpoint/CSS injection/brand asset regeneration. Responsive source smoke compares Tablet square/social sizes. Added a generated-HTML test across 10 VI/EN routes to ensure no Headquarters/Estonia, exactly one BIO-A company block, source social class/cream vector, mobile icon untouched.

**PROTECTED:** `bioa-transform.mjs` first-paint normalization + 769px scroll-gutter CSS `#bioa-first-paint-stability` **bitwise unchanged**; `functions/_middleware.js` hostname privacy & read-only Preview **unchanged**; all source animation/motion, untouched sections, Hero/404/assets, D1/Sheets/Resend/Turnstile unchanged.

**Owner QA:** after candidate Preview build, inspect Footer at Tablet 834/1024 and compare to Desktop 1440 on Home + About (VI/EN). No Headquarters/Estonia anywhere in left column; exactly one correct BIO-A address/hotline/tax; Zalo square button with cream artwork visually aligned alongside WhatsApp/Facebook/Telegram (same hover/link). Mobile 390/768 same as accepted earlier; first-paint/navigation without sideways snap. If FAIL, screenshot + viewport + route; **do not promote**. If PASS, promote explicitly, update handoff with exact SHA and preserve first-paint guarantee.

---
## 2026-10-13 — OWNER DEPLOY PASS + BRAND-WATERMARK-RELATIVE-URL1 (candidate)

Owner reported **PASS** on previous deployment/privacy/scroll and Footer Zalo update at GitHub `main` `d328e76f8320b608694751034915fa0bca63010f`. This PASS does **not** imply that all Tablet sections are now fully visually approved. Desktop and Mobile previously accepted surfaces remain LOCKED, Tablet follow-on audit remains OPEN.

Verified in actual 106-page generated HTML artifact from GitHub Actions run `38339522271`: exactly `/assets/img/logo-bg.svg` was referenced in inline style for `/`, `/en/`, `/dich-vu-khac/`, `/en/dich-vu-khac/`, but that file does not exist in output. Original Merywood ZIP uses watermark path `https://merywood.com/wp-content/themes/mery-wood/assets/img/logo-bg.svg`. BIO-A `replaceBrandWatermarks()` previously matched only that full URL, not root-relative `/assets/img/logo-bg.svg`. Correct owner is `bioa-home-refine.mjs`, shared Home and service shell.

Minimal patch: add exactly one relative-path pattern mapping the known Merywood brand watermark to pre-approved `/assets/bioa-monogram.svg` in existing helper (no DOM/shape/breakpoint/color change). Build-output regression checks both VI/EN Home and Other Services. No new design/asset regeneration, Footer/Header/Chat, lead API, privacy middleware or Cloudflare changes.

This is a newly restored artwork reference, so **automated build PASS is not owner visual PASS**. QA Home and Dịch Vụ Khác VI/EN at Desktop 1440 / Tablet 834/1024 / Mobile 390; visual watermark only, no giant logo, clipping, unintended fill. Preserve owner PASS components and original Merywood hover/motion. Do not roll back other already PASS fixes if this fails.

---
# BIO-A NEW CHAT CONTINUATION — 2026-10-13 OWNER DIRECTED PRODUCTION SOURCE

Repository: https://github.com/zireyyyy/bioagroup
Read `START_HERE.md`, `FULL_HANDOFF.md`, `AGENTS.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md`, `docs/DEPLOYMENT_BRANCH_ACCESS_GUIDE.md` before edits.

Owner explicit request: current candidate UI patches may be pushed to `main` so site can be QA'd on existing host; **do not imply Cloudflare deployed when automatic production deployments are disabled**. Source release combines tested Footer Tablet Zalo square fix (PR #4/`6ec1ee2`) and source-first paint and scrollbar stability (PR #5/`7a5f44e`), plus host-scoped middleware gate.

New private/public contract: exact `bioagroup.vn`, `www.bioagroup.vn`, `bioagroup.pages.dev` remain 14-day owner-session private unless explicit BIOA_SITE_MODE=public in Production. Every one-label hash/branch `*.bioagroup.pages.dev` is publicly viewable for static GET/HEAD with noindex, robots Disallow; Preview `/api/*`, lead config/submit, owner session routes and unsafe methods blocked. Environment protection and Access Policy changes may need Cloudflare dashboard action. Fail closed mandatory. No test leads on public previews.

Current confidence: GitHub code CI separately green for both UI candidates; owner visual approval **NOT** granted; Tablet remains PENDING and Desktop/Mobile prior PASS frozen. Source rollback `c320f2868a46aafd141a7178c03337a1d07b3a82` (note rollback restores globally locked Previews). QA Desktop/Tablet/Mobile VI/EN plus production/Preview host privacy matrix after Cloudflare deployment.

GitHub Actions validates, Cloudflare Pages deploys with its own Git integration. Owner can enable automatic Production `main` and Preview `All non-Production branches` in Cloudflare Branch control; do not claim toggled by GitHub code.
