# BIO-A — PHASE 2 FULL TABLET REGRESSION (2026-10-14)

## Authority and promotion
- Owner **VISUAL PASS**: PR #9 `0aeb989` for Manrope Variable Main Menu 550, site CTA 550, Hero Stats 300/400 and Cookie label size/copy/readiness. PR #9 merged to `main` as `cb4e92f73c1ef800f7507db2330347664fc323d4` following a PASS rerun of GitHub Actions.
- `main` is the production baseline. Phase 2 lives in `candidate/full-tablet-regression-phase2-20261014`. No unverified responsive change may overwrite production.
- Desktop, Mobile, existing accepted Tablet components and all approved Footer/Zalo, FIRST-PAINT1, Cookie, Hero Stats, Header/CTA weights, maintenance/noindex, lead backend are FROZEN.
- Merywood's supplied original responsive CSS/DOM/JS are the source of truth; 768px Mobile boundary and fluid >=769px Desktop mode apply. No arbitrary Tablet redesign or fresh breakpoint.

## Current implementation — audit only
- `tests/tablet-full-route-audit.mjs` visits VI/EN Home, About, Cosmetics, Other Services, Blog index and Contacts across 768/834/1024/1180px in isolated Chromium pages; collects document width, shell geometry, possible horizontal overflow elements and JS exceptions. No form submissions, network mutations, Cookie clicks or style changes.
- `.github/workflows/validate-source-component-rebuild.yml` runs the script after build and browser dependencies; stores `audit-artifacts/tablet-phase2/route-matrix.json` as an artifact. A browser script PASS means routing/shared-shell presence ONLY — not visual source parity.
- This audit does not yet cover every Blog detail, 404, every breakpoint-adjacent width, or actual touch/scroll/interaction parity. These remain PENDING.
- **No UI, CSS, DOM, site JavaScript or deployed routes modified in this patch.** No sitewide Full Tablet PASS claim.

## Tablet QA matrix — still owner runtime PENDING
| Surface | Tablet 768/834/1024/1180 | VI/EN | Visual signoff |
| --- | --- | --- | --- |
| Shared Header/Nav | single-row source layout; logo/actions/lang do not collide | both | PENDING |
| Shared Footer | four groups, brand info, social icons/links fit | both | PENDING |
| Cookie, Chat/Zalo | source look and accepted no-jolt behavior | both | PR #9 Cookie owner PASS; Tablet wider regression PENDING |
| Home | Hero/Stats, product formats, reviews, CTA, roadmap | both | PENDING |
| About | hero, icon set, typography and cards | both | PENDING |
| Cosmetics + Services | grids, tabs, scroll/carousels, CTA | both | PENDING |
| Blog index/detail | pagination, article text, sticky TOC | both | PENDING |
| Contacts | map, FAQ and safe form visuals; no actual lead POST | both | PENDING |
| 404 | frozen approved artwork and routes/status check | both | previous visual PASS frozen; technical response PENDING |

## Decision gate
1. CI audit generates the matrix; inspect possible overflow/exception evidence.
2. Compare any real failure with exact original Merywood source CSS and corresponding BIO-A component owner in `docs/SOURCE_MAP.md`.
3. For a proved defect only: one minimal source-owned patch; validate Desktop/Tablet/Mobile independently and VI/EN. Do not patch a PASS area by guess.
4. Owner accepts Tablet runtime, then Phase 2B cross-device convergence audit. Phase 3 cleanup and SEO follow only after Phase 2B.

## Owner test for this audit-only change
**KHÔNG CẦN TEST RUNTIME CHO PATCH NÀY** because this commit creates only read-only CI diagnostics and this handoff; existing website output is unchanged. Review the Actions job and its route-matrix artifact. Any visual defect reports must include route, VI/EN, viewport, screenshot and source expected result. No secrets or private authorization links.

## Phase 2 audit findings — CI run 38504183758 and refined diagnostics
- Original CI attempt 1 PASS: **48/48** VI/EN route-by-width navigations HTTP 200; document width == viewport throughout, shared Header/Footer present. This is structural CI PASS only.
- Initial analyzer reported `runtimeErrors: ["Object"]` for every route, because `String(e)` on a nonstandard Playwright pageerror object lost error details. **No application root cause is yet established.** Updated audit collects name/message/stack to diagnose.
- Initial offscreen warnings are mostly Swiper slides, other carousel cards and intentionally displaced children; slide bounding boxes past the viewport do not imply a user-visible horizontal-scroll regression. Updated audit records clipping ancestors and separates unclassified offscreen elements.
- Added representative Blog detail and independent 404.html VI/EN checks for structural coverage; 404 is a standalone page without shared Header/Footer by design, so it is not asserted to have them.
- New browser run is required after these test-only edits. On any new error inspect raw CI output before changing site code. No owner-approved visual surface has been edited.

## Further investigation — 2026-10-14
- CI `38505207647` **PASS**: 64/64 VI/EN routes at widths 768/834/1024/1180, no root scrolling overflow, wrapped main navigation, or EN footer title overflow. All offscreen candidates have clipping ancestors, normally expected for source sliders.
- Chromium emits an unhelpful page error described as `Object` for 55/64 cases. This is a **diagnostic lead**, not a proven UI defect; no patch is justified until provenance is understood.
- Added `tests/tablet-runtime-investigation.mjs` that collects the in-page error event location/type and read-only request/console failures at 3 representative routes, without storing visitor inputs or credentials. CI will upload scrubbed diagnostics in the same Phase 2 artifact.
- This patch only touches test harness, CI workflow and this handoff. Website JS, CSS, DOM and owner-frozen look remain identical.

## Visual evidence pass — candidate update 2026-10-14
- The earlier 64-case run `38505207647` is automated PASS, **not owner visual PASS**. Browser pageerror `Object` remains unproven and must not trigger speculative CSS/runtime edits.
- Updated `tests/tablet-full-route-audit.mjs` saves representative viewport screenshots (834/1024px, VI/EN each route) plus Footer screenshots under `audit-artifacts/tablet-phase2/visual/`. Capture warnings are recorded as advisory and do not fail otherwise passing structural tests.
- Screenshot evidence is for owner comparison to Merywood and protected prior PASS components. No site output, source component or production code is modified.
- Owner QA remains PENDING for Tablet visual/interaction parity and source authority; do not promote Phase 2 on screenshots or CI alone.

## 2026-10-14 — CI artifact reviewed and screenshot methodology corrected
- Previous candidate head `86c6fdf` CI PASS; downloaded artifact `bioa-full-tablet-regression-phase2` from run `38508296221` and inspected `route-matrix.json`, `runtime-diagnostics.json` and representative captured screenshots.
- All 64 routes HTTP 200, no document-width overflow, no nav wrapping and no footer EN measured overflow. The first screenshots were not reliable visual signoff: first-visit consent modal could cover content and offscreen footer screenshot was taken before scroll-triggered Merywood reveals. **Do not infer invisible footer bug from these images.**
- In local Chromium diagnostics, warnings include third-party Cloudflare Turnstile `110200` (localhost/site-key origin mismatch), Manrope static fonts from Merywood CORS denial, Merywood WordPress `wp-json`/email-decode script requests and offline Promise. **These are build/test-origin clues, not proof of a Production error.** Turnstile/lead/backend/cookie origin guards are FROZEN.
- New read-only screenshot sequence: capture first-visit modal separately, click the already-present `.mw-deny` control in a disposable isolated browser page when visible (never inject consent), capture unblocked content, scroll the existing footer into view and capture after reveal. Results are for manual owner comparison; visual PASS still PENDING. No site output/CSS/JS changed.

## Phase 2 first visual fix candidate — ABOUT-TABLET-LABEL1 (2026-10-14)
- **Verified symptom:** 834px and 1024px Chromium captures show tiny About Hero Stats label text despite stable layout. Unlike carousel clipping/localhost Turnstile, this is a legibility concern in the actual captured Tablet rendering.
- **Exact owner:** `bioa-home-refine.mjs`, `patchSharedHeroStatsParityCss`, existing `@media(max-width:1024px) and (min-width:769px)` About-only `.mwa-hero .mwa-stat__l` declaration. No new breakpoint, global style, or duplicate owner.
- **Patch:** `font-size:.9375rem!important` → `font-size:clamp(12px,.9375rem,15px)!important`, preserving Manrope weight 400 and line-height 1.4, About card layout, stats number, Home Hero, desktop and mobile.
- **Owner test — BẠN CẦN TEST GÌ:** on PR #10 preview, `/about/` and `/en/about/` at Tablet 834px and 1024px: labels are visibly readable; numbers remain evenly light; no label/card collision. Spot-check Home Hero at same widths and About Desktop 1440px and Mobile 390px to confirm no changes. Mark **PASS/FAIL** with a screenshot. Candidate is not owner PASS until explicitly accepted.
- **Status:** candidate pushed; automated CI and owner runtime QA PENDING. Production baseline stays `cb4e92f`.

## 2026-10-14 — owner Tablet feedback: WA-SOURCE1 + TABLET-TYPE3 candidate
- Owner reports WhatsApp artwork repeatedly malformed on Tablet screenshot. Explicit request: restore original Merywood WhatsApp source icon across shared site, not a re-drawn Bio-A glyph. Exact owner `bioa-home-refine.mjs`: `restoreMerywoodWhatsAppIcon($)` clones source header SVG in the live Merywood HTML used by builder, uses only self-contained artwork, and propagates one `icons.whatsapp` source to Header/Menu/Footer/Mobile and Chat where BIO-A duplicates existed. Existing Zalo and non-WA artwork protected; WhatsApp URLs remain unchanged.
- Owner also requests lighter section titles/content and slightly larger Main Menu on Tablet: same shared module `patchTabletType3Css`, bounded to existing Tablet range 769–1200px, nav font-size 1.06em, section headings font-weight 450, regular descriptive copy weight 400. Hero Stats (300/400), Cookie (600), CTA (550), Footer and Desktop/Mobile fixed.
- New CI check `tests/tablet-wa-original-source.test.mjs` checks Header/Footer icon shape and identity for VI/EN routes; build/CI and owner VISUAL Tablet verification PENDING. If source icon parity cannot be confirmed, do not promote; inspect exact Merywood markup first.
- **BẠN CẦN TEST GÌ:** after candidate preview builds, open VI/EN Home/About/Blog/Contacts Tablet 834px & 1024px. Check WA Header/Footer/Mobile menu/chat appearance (no truncated glyph); nav slightly larger but single-row/no collision; headings/paragraph weights visibly softer yet readable; check Desktop 1440 and Mobile 390 unchanged, including Hero Stats/Cookie and Zalo. Respond PASS/FAIL separately for WA, typography and nav, attach screenshots for FAIL.

## 2026-10-14 — NAV-READABLE1 / BLOG-TYPE-PARITY1 owner screenshot comparison
- **WhatsApp icon: owner PASS**, freeze WA-SOURCE1 across the shared shell, do not change again.
- Owner screenshots compare BIO-A Blog against Merywood Blog; existing Tablet 1.06em nav increase was insufficient because Merywood nav scales with root viewport size; owner sees tiny Main Menu. In existing `patchTabletType3Css` update nav to `font-size:max(12px,.8333vw)` at >=769px. At 1440px it equals the original 12px scale; Mobile untouched, no nav layout modification.
- In same source owner update Tablet section titles to 400, descriptive text to Manrope Variable 375, preserving Hero Stats numbers 300/labels 400 and CTA 550, Cookie buttons 600. In Blog's existing `patchBlogCss`, target .blog-hero and .post-feature title 400 and description 375 at 769-1200px, without global font reset or geometry change.
- Font authority: `bioa-transform.mjs` explicitly imports Google CSS Manrope Variable 200..800 using the font URL owner provided; `main.css` from original Merywood still contains old static @font-face rules. This is **CSS shaping**, not a JS-forced font; do not claim a single font source or no styling overrides. The current patch does not change provider or original @font-face.
- **BẠN CẦN TEST GÌ:** On updated PR #10 Preview open `/blog/`, `/en/blog/`, `/about/` at 834px / 1024px. Compare with provided Merywood screenshot: nav visibly larger and stays in one row without collisions; Blog hero title and featured article headings lighter; description less dense without loss of readability. Check at 390px Mobile and 1440px Desktop, and confirm owner-PASS Hero Stats/Cookie/WhatsApp unchanged. Candidate remains PENDING owner PASS and CI outcome.

## 2026-10-14 — NAV-FLUID2 + TYPE-BALANCE2 all routes (owner screenshot)
- Owner compares 1920 desktop, compact 13-inch laptop, 834px Tablet simulator. Prior `max(12px,.8333vw)` causes visible differences: laptop nav too small, emulated Tablet comparatively large under browser zoom. Replaced older NAV-READABLE1 declaration in the **same existing `patchTabletType3Css` owner** with a continuous `clamp(11px,calc(6.6px + .52vw),16.5px)` from 769px upward, keeping nav 550 and existing header DOM/flex. Verify actual CSS viewport and browser zoom; screenshots alone do not prove device breakpoints.
- User wants typography lighter across **entire site**, not only Blog. Same shared CSS component defines 375 for semantic page content titles and 350 for explanatory copy, with NO `!important` on font weights; preserves Manrope Variable, original font sizes/layout, CTA 550, Hero Stats number 300 and label 400, Cookie 600, Header nav 550, Footer/logo. Removed redundant Blog-only Tablet font weight block to avoid duplicate owners. No JS font override.
- CI initially FAIL on a stale test asserting deleted `font-size:1.06em` and 450 weight; test fixed to check WhatsApp icon source parity only, and new candidate CI pending. This stale check is not a website runtime failure.
- Owner WhatsApp PASS frozen. **BẠN CẦN TEST GÌ:** after preview candidate deployment test Header Home/Blog/About VI+EN at CSS widths 834,1024,1280,1440,1920 (record zoom 100%); confirm Main Menu legible and single line/no Header CTA collision. Compare Home hero title and descriptions, Blog hero/featured/card headings and prose, About and services typography; check Desktop 1440 and Mobile 390, Hero Stats, CTA, Cookie, Footer, WA/Zalo untouched. If a component still appears bold due source-specific weight, report route+element+width, then adjust that owner only. Owner visual PASS pending; production `main` stays `cb4e92f`.
