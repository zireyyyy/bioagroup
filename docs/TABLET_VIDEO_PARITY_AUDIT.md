# BIO-A TABLET — VIDEO PARITY AUDIT T2 (2026-10-09)
Status: **TABLET FULL-SITE FAIL / SOURCE CSS BLOCKER**. This is video evidence and source inspection, not a visual code patch or production PASS.

## Evidence: user-provided videos (not committed)
- Video 1 BIO-A `20261009-0755-29.0388107.mp4` — iPad Pro 11" emulator **834 CSS px**, roughly 61 seconds.
- Video 2 Merywood `20261009-0758-33.7666513.mp4` — corresponding iPad Pro 11" emulator **834 CSS px**, roughly 31 seconds.
- Both display the Home route at Tablet width, with Merywood as layout/motion source and BIO-A copy and brand as approved deviations. They do not independently prove about/services/blog/contacts Tablet parity.

## Verified/observed differences

| Component / evidence | BIO-A 834px | Original Merywood 834px | Status and next action |
| --- | --- | --- | --- |
| Header `~3s,12s,31s` BIO-A vs `~3s` Merywood | Multiple primary nav labels wrap to **two lines**: Về Bio-A Group, Gia Công Mỹ Phẩm, Dịch Vụ Khác, Liên Hệ; compact rows compete with large action cluster. | Source nav remains a compact **single line**; logo, nav and action aligned in one row. | **FAIL confirmed.** Inspect existing shared header cascade/owner, source CSS and BIO-A text-length adaptation; protect Desktop/Mobile header PASS. |
| Home hero `~12s` BIO-A vs `~0.8s` Merywood | Bio-A branded copy, stats and form source deviations; first-frame image appears contained | Original hero media, text and stats layout. | **PENDING source mechanics comparison**, not automatically FAIL from content differences. |
| Why Choose / We Produce `~3–13s` BIO-A vs `~3–5s` Merywood | Four benefit cards and two manufacturing/product cards are present, but typography / spacing / transition rhythm may differ. | Source has four white cards then two large product cards. | **PENDING** precise scroll/visual parity; do not rewrite already-working cards from guess. |
| Process / steps `~20–26s` BIO-A vs `~10s,22s` Merywood | BIO-A presents a simplified vertical milestone list with generous empty area and a large green branded CTA panel; needs section-by-section confirmation against intended source route. | Merywood How It Works uses original step/card layout and CTA placement. | **REVIEW** owner-approved BIO-A content vs source geometry before adjusting. |
| Packaging/Product slider `~37s` BIO-A vs `~15s` Merywood | In captured frame, product/artwork is washed out during scrolling/reveal. | Merywood product artwork is legible in a different scroll position. | **PENDING** compare settled state (not a proven bug from one transition frame); preserve source slide transforms. |
| Bottom Home/roadmap/footer `~43s` BIO-A vs `~8s` Merywood | Source-inspired image/text split and footer present; content differs. | Merywood image/text split, CTA below. | **PENDING** per-component Tablet test; don't reopen footer owner PASS without evidence. |
| Overall Tablet navigation & inter-section rhythm | One-row nav FAIL; multiple suspected density/gap issues need per-component reproduction. | Original generally maintains readable Tablet layout and transitions. | **OVERALL TABLET NOT PASS** until owner verifies VI/EN all routes. |

## Source and runtime facts
- `BIOA-Website.zip/pages/index/index.html` **contains** Merywood header DOM (`.header__wrapper`, `.header__nav > ul`, `.header__contacts`) and link `<link id="main-css" href="https://merywood.com/wp-content/themes/mery-wood/assets/css/main.css?ver=1790811557">`. Merywood `main.js` is archived.
- Original theme `main.css` **is not saved** inside the owner ZIP; exact Tablet computed media-rule parity remains unverified. Source-first permanent contract FORBIDS inventing replacement breakpoints or a broad CSS override without this evidence.
- `bioa-home-refine.mjs` currently concatenates many successive `patch*Css` strings in `sharedShellCss` and `applyHomeRefinement()`. The base CSS sets `.header__nav a` font-size 12px at <=1100px, while later Home CSS at <=1200px sets **15px !important**, overriding that compact behavior. BIO-A Vietnamese nav labels are longer than Merywood English labels. This conflicting cascade is a **supported root-cause candidate** for the observed two-line nav (verify computed style before patch).
- Full-site source-first migration **HAS NOT BEEN EXECUTED**. Prior commits scope: 404 responsive and Home cold-load measurement. No all-route Desktop/Tablet/Mobile responsive compact architecture PASS exists.

## Mandatory safe execution / next patch
1. Obtain the exact Merywood theme `main.css` from the URL above, ideally from the same source version, or equivalent authoritative source. A current live CSS copy may have changed since the owner ZIP and needs version/source confirmation. Do not bundle entire WordPress theme or alter old site's backend.
2. Inspect just the shared header's original 769–1200 CSS/DOM and current computed rules at 834px. First T2 production patch should address **shared Header Tablet nav wrapping only** in its existing owner rule (no appended global override), protect owner PASS Desktop/Mobile, then send owner test scope VI/EN across routes at 820/834/1024/1180.
3. Continue route/section passes by confirmed failures, not bulk theme overwrite. Keep CSS/JS ownership, motion and source UI structures, freeze PASS surfaces.
4. Regress each patch Desktop, Tablet, Mobile and breakpoints; only owner promotes Tablet PASS. After full Tablet owner PASS → mandated Phase 2B cross-device compact audit.
5. Keep current Cloudflare 14d signed maintenance/noindex + D1/Google Sheets/CRM/Resend/Turnstile and Sanity Free FUTURE unchanged.

## Baseline
Video audit baseline `b12e4ff681fe4bdce22620ea69d9d29732f25116` (Home cold-load owner PASS in latest statement; 404 visuals Desktop/Tablet/Mobile owner PASS). No production modifications in this documentation checkpoint. If source CSS is absent, **STOP responsive code patch**, do not claim site-wide parity.

## T3 — Code fix candidate
A genuine source-cascade patch `TABLET-HEADER-COMPACT1` now reuses BIO-A's existing compact 12px nav / 13px gap at <=1200px. No separate new CSS override. Owner runtime at 834px must verify one-line navbar; not full Tablet PASS. Original Merywood main.css still essential for systematic whole-site Tablet repair.
