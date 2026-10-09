# BIO-A GROUP — MERYWOOD RESPONSIVE OWNER REBASE (2026-10-09)

**AUTHORITATIVE BASE FOR THIS PATCH:** `6f984c7f41352976dad17af42aef7bdd2634458b`. Owner requires original Merywood responsive CSS rules as **sole authority for source-owned layout** on EVERY route, not separate BIO-A-specific Tablet layouts. Owner supplied original `main.txt`; its real media queries are `<=768px` Mobile and `769–1920px` fluid Desktop with exact `vw` sizing for Merywood `.container`, `.header`, `.footer`, `.swiper`, cards, typography. 9.7/10.2 inch sizes are not CSS breakpoints; CSS viewport width/orientation decides.

**THIS CANDIDATE CHANGES PRODUCTION CODE ON SHARED SHELL ACROSS ALL ROUTES.**
- `bioa-home-refine.mjs` removes legacy custom 1100/1200px rules that overrode Merywood Header logo, navigation, menu gap, typography and button min-width on Tablet; source original selector behavior comes through. The owner-approved custom BIO-A Header language/social/consulting action group still exists, but its compact 769–1200 values reuse Merywood's exact `.5208vw`, `2.4479vw`, `1.1458vw`, `.8333vw` scaling rather than hand-invented clamp values.
- `bioa-transform.mjs` removes the global 1200px forced navigation/text rules and hiding of source email contact. Shared source Merywood layout thus controls all Home, About, Cosmetics, Other Services, Blog, Contacts and route variants.
- `bioa-cosmetics-refine.mjs` removes fabricated 1023px intermediate cosmetics card geometry; its **BIO-A-only** mobile category switch remains at <=768.
- Blog source detail column grid mobile collapse at <=768 was already corrected at `6f984c7f41352976dad17af42aef7bdd2634458b`; no further change.
- `tests/tablet-header-compact.test.mjs` now locks all-route source ownership and protects the previously-approved exceptions; `npm run test:responsive` exists.

**EXPLICIT PRESERVED BIO-A EXCEPTIONS:** supplied BIO-A copy/VI+EN/branding/colors/assets, chat/consent/lead form, Footer Tablet `patchD5FooterTabletCss` (owner PASS), existing Hero-stat special formatting for long Bio-A metrics, verified Home cold-load repair, approved Mobile menu and 404 graphics/layout. Removing these would break owner PASS and is NOT requested by the source-parity objective. They are BIO-A modifications and still require three-device QA; do not claim they are identical to third-party stock source.

**STATUS:** Github source candidate once pushed, not runtime or entire site owner PASS. CSS Merywood live baseline is already inherited from original `<link id="main-css"...>`; **do not paste full third-party CSS again** or replace site themes/assets. NO Cloudflare settings or API touched. Next: owner tests entire site (VI/EN pages) at <=768, 834/1024/1180, 1366/1440/1920, portrait/landscape. If defects remain, compare exact source before fixing. Preserve maintenance 14d and noindex. Rollback to gated `6f984c7f41352976dad17af42aef7bdd2634458b`.

**Immediate next phases after owner PASS:** finalize Tablet, Phase 2B CSS override compaction for all device families, SEO/cleanup and final deployment package. Sanity Free selected for FUTURE CMS only.
