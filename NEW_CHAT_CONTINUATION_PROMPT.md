## ACTIVE NEW-CHAT INSTRUCTION — 2026-10-14 — PHASE 2 TABLET
GitHub `zireyyyy/bioagroup`, production `main` baseline `cb4e92f73c1ef800f7507db2330347664fc323d4` (PR #9 owner PASS and CI PASS, merged). PR #9 typography/cookie and all previously PASS surfaces are FROZEN. Current working branch `candidate/full-tablet-regression-phase2-20261014`: **audit only**, NOT new site UI. Read `AGENTS.md`, `FULL_HANDOFF.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md`, `docs/RESPONSIVE_SOURCE_PARITY_CONTRACT.md` and `docs/FULL_TABLET_PHASE2_20261014.md`. Inspect read-only Tablet VI/EN matrix CI artifact; only change source-owned component for independently verified defects; all Desktop/Tablet/Mobile parity needs QA. Do NOT mistake earlier PR #9 pending/failure historical notes for current state. FULL TABLET PASS still PENDING. Phase 2B only afterward. No new CSS overrides, full component rewrites, visual redesign, broad compaction, or production deployment without owner acceptance.

---
## 2026-10-14 — MVR-TYPE2 + COOKIE-FONT-GATE1 candidate
Owner confirms Hero Stats PASS (numbers 300 labels 400); immutable. Nav and CTA 500 too light: raise narrowly to 550 ordinary weight. Cookie banner shifts/resizes after navigation: preserve Merywood consent behavior, keep visual card hidden until fonts ready (max 1800ms fallback), 12px/600 button labels, copy VI deny `Từ chối`, EN `Reject`; underlying .mw-deny still rejects optional consent. No layout/scroll/other UI changes. Production main 44879b4; PR #9 candidate until owner visual QA. Prior footer/Zalo/loading PASS frozen. Test Home/About VI/EN Desktop/Tablet/Mobile and cold navigation.

---
## 2026-10-13 — MVR-TYPE1 owner visual feedback / scoped weight parity (candidate)

Owner supplied side-by-side screenshot BIO-A vs Merywood on Desktop: BIO-A Header main nav underweight, CTA labels too bold, Hero 5 number values visually inconsistent. This is **owner FAIL on typography only**, not a reason to change frozen layout/first-paint/Footer/Zalo. PR #9 source `fd8e9b2b0f449d911e44b9f3c5622c0ac3375856` latest prior successful CI.

Measured **original Merywood main.txt**:
- `.btn` font-weight 600 (with original/static face, visually lighter than current Google Variable at 600); owner wants **500** for all BIO-A CTAs under Google Manrope Variable; this is an intentional BIO-A adaptation.
- Hero `.block-title .info .list .item__number` weight **300**. Labels inherit regular **400**.
- Nav inherits 400 in Merywood source, but owner's BIO-A screenshot is underweight with Variable Manrope; user-directed visual adaptation to **500** on desktop/Tablet main header links only.

**Verified root cause:** `bioa-home-refine.mjs` contains historical `font-weight:200` experiments and seven `font-variation-settings:"wght" 200|300|400!important` declarations plus a `patchHeroStatsOriginalTypeCss` rule setting `.item__number, .item__number *` to 400 while final card number owner sets 300. This allows parent/child glyph weights to disagree and forces variable-axis values independent of CSS `font-weight`. Corrected at existing owners: one 300 value on all Hero number elements and descendants, 400 on labels, removed nine forced axis settings (7 numeric plus 2 `normal`); 2 historical numeric 200→300. Scoped Header nav 500 and CTA 500 with ordinary CSS (no !important, no new global typography force).

**Protection:** no changes to `bioa-transform.mjs` loading, no font URL change, no DOM, images, geometry, line heights, palette, motion, Footer/Chat copy, Zalo, Cloudflare gate. 390/834/1440 VI/EN browser computed font-weight regression and old source layout test required. Owner visual QA on Preview is mandatory: nav, Header/Hero CTA, all five Hero numbers uniform; verify other CTAs throughout site, Footer EN and Page initial paint.

**Future rule:** No `font-weight:...!important` or direct manual `font-variation-settings:"wght" ...` for BIO-A typography. Adjust explicit weight using ordinary scoped `font-weight` in the component that owns it; do not use assistant-fabricated global overrides.

---
# BIO-A VARIABLE FONT POLICY — permanent, owner-approved 2026-10-13
- Google Fonts Manrope Variable normal 200..800: `https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap`
- All future component typography uses `font-family: "Manrope", sans-serif` by inheritance; `font-optical-sizing:auto`; weights 200–800 with regular 400. Do NOT add new local font files, alternate font families or `font-weight:...!important` / `font-family:...!important` in BIO-A CSS. Use ordinary `font-weight` scoped to the component when an explicit owner-approved change is needed.
- Preserve CSS geometry, font sizes, line heights, responsive breakpoints, DOM and original Merywood motions until owner QA. Never silently normalize all headers to bold.
- FIRST-PAINT1 and Smooth Scrollbar frozen; inspect network requests, computed family/weight and layout shifts at 390/834/1440 before production promotion.
- Existing Merywood `main.css` remains for layout and includes old font-face rules. Google stylesheet is appended last as the new Manrope source; investigate any face-source competition via computed/render inspection before calling single-font-source PASS.
- This is a **candidate** only; previous Footer EN, Zalo and content loading owner PASS preserved but typography appearance needs owner visual confirmation on VI/EN.

---
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
