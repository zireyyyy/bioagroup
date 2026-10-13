# 2026-10-13 — FIRST-PAINT1 | Early normalize & smooth-scrollbar gutter stability

**Baseline:** c320f2868a46aafd141a7178c03337a1d07b3a82. **Candidate ONLY; main unchanged.** Owner-provided Chrome trace `Trace-20261013T103814.json.gz` analyzed locally; raw trace NOT uploaded to GitHub (contains browser metadata).

## Direct trace evidence
- Navigation from `bioagroup.vn/` at t=0.000, Chromium trace viewport 837 × 945.
- At t≈0.302s `LayoutShift` BODY old rect `[8,8,821,929]` -> new rect `[0,0,837,945]`; weighted CLS delta 0.0084656. Original Merywood stylesheet contains `* {margin:0;padding:0;box-sizing:border-box}`; UA margin of 8px is visible for one painted frame before full normalization settles. Root cause evidenced by exact bounds + source normalize. Proposed fix: emit identical critical normalize *first* in HTML head, before external CSS. This is not a redesign.
- At t≈0.511s small font/text movements up to 3px (delta 0.00016278); font metrics may be involved, but root cause not proven, so **no font substitution**.
- At t≈6.721s header container shifts x 6→13, contact launcher x 770→785 (+15px), custom `rstest-dock-restore-pill` x 798→813; weighted delta 0.00085762. 15px is consistent with an appearing/disappearing browser root scrollbar gutter. The trace does **not** include a definitive owner attribution of the change; the custom `rstest` element and external iframe/network activity may contribute. Treat *gutter fluctuation* as hypothesis, not proven primary cause.
- Merywood original `assets/js/main.js` at source ZIP uses `Scrollbar.init(page)` + `page.style.position='fixed'` at innerWidth>768, switching to native scrolling <=768. It also re-inits on window load/resize. Candidate emits critical root `scrollbar-width:none` ONLY above 768 so transient native scrollbar will not consume document width while original Smooth Scrollbar remains in charge. Does not touch library/motion/sticky or menus. Mobile native scrollbar remains unaffected.

## Exact code owner and changes
- `bioa-transform.mjs` `applyBrandHead()`: inject one `#bioa-first-paint-stability` style as first child of `head`, containing only source-identical normalize and 769+ native scrollbar suppression.
- `tests/first-paint-build.test.mjs` checks 12 VI/EN routes' output head-first ordering, no duplicates and preservation of external Merywood stylesheet.
- `tests/first-paint-browser.test.mjs` checks computed body margin and scrollbarWidth across 390/768/769/834/1024/1440, VI/EN Home/About. Reports layout shifts for investigation.
- Validation CI added for both. No route copy, SVG, HTML sections, backend, 404, lead, cookies, contact functions or component geometry modified.
- **Risk:** if source Smooth Scrollbar fails at >=769, native scrolling remains possible (wheel/key/touch) but browser's native thumb is suppressed. This must be owner-tested. If fallback accessibility is unacceptable, revert this portion separately.

## Desktop/Tablet/Mobile owner test
- Desktop 1440 Home VI/EN: hard refresh and navigate About; header & Hero remain identical at stable load, no left/right nudge; scroll, sticky, custom scrollbar and nav interactions remain functional.
- Tablet 834/1024 Home/About: no 8px early page movement or late 15px lateral snap; Footer should not be interpreted as fixed by this patch. Footer Zalo is separate PR #4 (candidate `6ec1ee2`, currently not merged).
- Mobile 390/768 Home/About: native scroll, menu, body layout, footer, chat same as baseline; no CSS change except first-paint normalize identical to Merywood.
- **Do not infer owner runtime PASS from CI.** If shift persists, provide clean-browser fresh Trace without unnecessary extensions; debug native scrollbar lifecycle before further code.
