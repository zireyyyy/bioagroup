## 2026-10-13 — FONT-SOURCE1 / trace-grounded cold-load candidate (visual QA PENDING)

**Owner decision:** Footer EN (translated company title and approved wrapping) PASS, but repeated loading/navigation jolt on PR #9 FAIL relative to `44879b4`. Do NOT merge until first-paint parity owner PASS. Production `main` remains `44879b49c180a5f9433a9a118b9ff9979b329f3d`; approved initial BODY margin/gutter fix from `d328e76f` MUST stay bitwise unchanged.

**Actual uploaded Chromium trace** `Trace-20261013T154358.json.gz`, page `5db31fd8.bioagroup.pages.dev/`:
- Navigation t=0; first paint ≈132ms; Manrope static TTFs from Merywood requested ≈192ms, completed ≈334ms.
- Extra Google Fonts Manrope WOFF2s requested ≈338ms, loaded ≈377ms.
- Single scored main-frame LayoutShift ≈434ms, 0.000305, 6px max affecting hero text and header anchors. Potential font-family swap, but trace does not prove every perceptual movement; CSS transform/reveal animations are unscored by CLS.
- Earlier user Trace 10:38 had 3 main-frame shifts (8px BODY reset first, 15px late scrollbar-related). New trace no initial 8px BODY reset; retains only small text-related movement.
- CI generated layout-shift JSON from PR#9 has separate cookie-consent `bioa-consent show` shifts (approx 0.004–0.019 depending viewport), **not evidence of full-page content movement**.
- Original owner-supplied `main.txt` CSS contains original Merywood `@font-face` for Manrope 300/400/500/600/700/800, all `font-display:swap`. The live source also embeds redundant `https://fonts.googleapis.com/css2?family=Manrope...` style/preload, producing a later font face download. Double-font-source is independently evidenced by the trace.

**Minimal FONT-SOURCE1 candidate:** only in `bioa-transform.mjs` `cleanupExternal`, remove stylesheet and style-preload links pointing to Google CSS *and containing Manrope*. Keep Merywood `main.css` and all original font-face rules; no custom fonts, font sizes, animations, transitions, first-paint style, breakpoint, layouts, Cookie scripts, content or Zalo changes. This may remove the second font swap but does **not** guarantee zero perceptual motion; first print/scroll and route-switch screenshot test still required. New CI test ensures no duplicated Google Manrope stylesheet while original Merywood stylesheet + first paint guard remain on ten routes.

**Owner verification:** after Preview redeploy check repeated hard refresh Home VI/EN, Home→About→Home, cold browser incognito at Desktop 1440/1900, Tablet 834/1024, Mobile 390. Check typography and Cookie, all previously PASS Footer visual and loading. No merge if motion/jolt persists, investigate source `lockHeight` and intentional AOS transform separately. Do not add global opacity blockers or change SmoothScrollbar speculatively.

---
## 2026-10-13 — FOOTER-EN-WRAP1 / loading nonregression (authoritative latest)

Owner reported PR #9 EN Footer title OVERFLOW/OVERLAP and repeat page-load/navigation slight shift; main `44879b4` reportedly still shifts once on initial load. **PR #9 was already CI FAIL** on `tests/tablet-cross-route-regression.test.mjs` expecting obsolete `addFooterCompanyInfo($)` signature; never merge the failed candidate. Review screenshot at Desktop ~1900px: the EN name collides with Cosmetic Manufacturing section.

**Verified first-order root cause for EN overlap:** existing `bioa-home-refine.mjs` `patchFooterInfo1Css` includes `@media(min-width:1201px) .bioa-footer-company-info--desktop .bioa-footer-company-info__title{ white-space:nowrap!important }`. English name is much longer than approved Vietnamese copy and exceeds its 320–360px grid column. Correct with an **English-only** overriding rule adjacent to this original rule at Desktop: `html[lang="en"] .bioa-footer-company-info--desktop .bioa-footer-company-info__title {white-space:normal!important;overflow-wrap:break-word!important;max-width:100%!important}`. No grid/font/line-height/VI CSS changes. Source output HTML `lang` is explicitly set by `bioa-transform.mjs`.

**CI guard hardening:** update stale cross-route assertion to the new `addFooterCompanyInfo($,lang)` and assert EN wrapping rule; add Playwright read-only tests for actual English Footer rectangles / overflow at Tablet 834/1024 and Desktop 1280/1440/1900, with screenshot artifacts. Also capture initial/settled Header/scrollbar and layout-shift events as **diagnostics**, NOT presume the loaded page is motion-free solely because page source style is unchanged.

**First-paint freeze:** `bioa-transform.mjs`, `#bioa-first-paint-stability`, `functions/_middleware.js`, source Smooth Scrollbar and fonts are unchanged. The trace-proven 8px BODY reset remains owner PASS from `d328e76f`. The reported intermittent navigation jerk on main predates PR #9 and is NOT proven caused by the English copy. Need compare actual shift timing/sources from captured metrics and, if necessary, obtain owner clean-browser trace. Do not add global scrollbar/font/JS transition patches without root-cause evidence.

**Frozen PASS:** Zalo `/assets/zalo-bioa-owner.png` white background (sole canonical), no Headquarters/Estonia, existing Footer VI, Home Desktop/Mobile, private production/public read-only Preview. **PR #9 remains draft** until CI PASS and owner visual QA of EN at 1440/1900 + Tablet 834/1024 and repeat navigation. Production stays `44879b4` pending owner PASS.

---
## 2026-10-13 — FOOTER-EN-COPY1 candidate (owner visual pending)
PR #8 PASS merged on main `44879b49c180a5f9433a9a118b9ff9979b329f3d`: no Headquarters/Estonia, canonical white-background PNG Zalo. FIRST-PAINT1 `d328e76f` is still the mandatory locked loading behavior. No broad Tablet PASS. Shared `addFooterCompanyInfo` hardcoded VI content on EN routes. Translate title, address and tax labels only; keep exact VI text, official address/phone/tax and all DOM/CSS/image assets unchanged. Test generated VI/EN Footer labels across 10 routes. EN title wrapping needs owner visual QA at 834/1024 Tablet, Desktop 1440 and Mobile 390. No production merge without approval.

---

## 2026-10-13 — ZALO CANONICAL WHITE BACKGROUND + ASSET CLEANUP (owner request)

The owner accepts Zalo's existing 96×96 circular design and explicitly wants ONLY its interior cream to become pure white site-wide. The canonical source remains `/assets/zalo-bioa-owner.png` across shared Header, Footer, Mobile, Chat and CTA (existing source references unchanged). Applied an in-place pixel recolor of cream to RGB(255,255,255), retained PNG RGBA 96×96, positioning, green lettering, alpha and all source CSS/JS. Three obsolete assets confirmed not referenced by rendering modules nor tests: `assets/zalo-bioa.svg`, `assets/zalo-bioa-circle-cream.svg`, `assets/zalo-bioa-framed-cream.png`; delete from candidate Git tree. If old historical docs mention these files, treat them as removed superseded artwork, NEVER authoritative. Added test `tests/zalo-canonical-asset.test.mjs` to enforce the canonical asset and no stale alternatives in source/build.

Other confirmed areas: Headquarters/Estonia removal PASS by owner; Zalo geometry/design before color change PASS by owner. **FIRST-PAINT1** approved at `d328e76f` is FROZEN. This candidate changes only Zalo asset bytes + removes 3 obsolete assets + regression tests/docs; Desktop/Mobile layout and smooth scrollbar unchanged. Owner visual QA pending for white pixel color only. If passed, merge PR #8; not otherwise.

---
## 2026-10-13 — FOOTER-ZALO-ARTWORK-RESTORE: owner correction to PR #8

Owner's screenshot of candidate `74405dc`: **"Headquarters / Estonia" removal PASS**, **Zalo artwork substitution FAIL**. The project must never treat assistant artwork changes as an owner-approved design update. Previous PR #8 incorrectly changed Footer Zalo `/assets/zalo-bioa-owner.png` (cream circular approved PNG) to `/assets/zalo-bioa.svg` and shrank it from Desktop 30px / Tablet 2.0833vw to 23px / 1.5972vw. Reversed **only this artwork and inner image sizing** back to the prior used PNG. Retained the already-approved removal of Merywood Headquarters and one BIO-A business info block. Retained `.socials__link` source class on the outer anchor, four channels and URLs. No other icon artwork, Header/Footer grid, company info, hover or responsive source change.

**Hard freeze:** FIRST-PAINT1 `#bioa-first-paint-stability` and source Smooth Scrollbar at `d328e76f` were the ONLY PASS at that checkpoint; do not alter `bioa-transform.mjs` or first paint. Production `main` remains `4f0c186`, and PR #8 is candidate until owner checks corrected Zalo and Footer. Never claim the entire Footer PASS from absence of Headquarters alone.

Regression: all ten VI/EN routes must use original `/assets/zalo-bioa-owner.png` in Footer; original CSS 30px Desktop and 2.0833vw on Tablet, Zalo square outer slot retained, no Headquarters source text and exactly one BIO-A business info. Confirm Preview image at 834/1024 Tablet and 1440 Desktop and Mobile 390; scrolling first-paint must stay stable. If user rejects, modify only the Footer artwork owner; do not touch loading.

---
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
