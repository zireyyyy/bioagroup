# FULL TABLET REGRESSION — PHASE 2 / T1
Status: **AUDIT CANDIDATE — owner runtime PENDING**, not visual PASS. NO production UI changed.

## Authority
Merywood `BIOA-Website.zip/pages/index/index.html` source verified for .header, .info.desctop, .block-we-produce, .block-roadmap, .block-products-desctop/mobile, #footer, #mw-consent, #get-a-quote and .block-reviews. Original Merywood theme `main.css` is externally linked, not contained in owner ZIP. Do not invent breakpoints without source evidence. Existing source map marks Footer, Home slider controls/reviews, CTA and watermark Tablet PASS/LOCKED; other components require independent tests.

## Coverage
| Route (also verify /en counterpart) | Tablet focus | Status |
|---|---|---|
| Home / | header/menu, stats, slides, cards, footer/chat/cookie | PENDING; named components PASS |
| About /about/ | hero stats, six category icons, spacing | PENDING |
| Cosmetics /contract-manufacturing-cosmetics/ | hero/cards/slider/touch | PENDING |
| Other Services /dich-vu-khac/ | service grid, menu, CTA | PENDING |
| Blog /blog/ + one article | index cards, sticky TOC, long text | PENDING |
| Contacts /contacts/ | forms/consent/popups, no actual lead submit | PENDING |
| 404 nonexistent route | original PNG/text/CTA and 404 response | PENDING |

## How to test
Use authenticated private `bioagroup.vn` owner tab (never disclose preview secret). Chrome DevTools Tablet viewport widths 768 / 820 / 1024 / 1180 CSS pixels, both orientations, VI and EN. These widths are *test probes*, not new site breakpoints. Validate typography, clipping/horizontal scroll, grids, source motion, click/touch, logo proportions, sticky TOC and popup behavior. Manual screenshots required for visual parity.

Optional: paste `tools/tablet-regression-audit.js` into Console on the authenticated tab. It uses same-origin hidden iframes to measure indicative overflow at 7 VI routes, exports `bioa-tablet-audit.json`. It does not submit leads, modify UI source, upload data or test full visual parity. If `maintenance_locked`, sign into the owner preview on that exact hostname; do not bypass maintenance. Check EN separately manually.

On defect report: route, viewport width, screenshot, original Merywood expected, BIO-A observed. Patch exact component ONLY after source comparison. Desktop & Mobile regression checks mandatory, no broad CSS.

Turnstile owner negative QA: **owner PASS**, trace not independently inspected. D1/Sheets/CRM/Resend/maintenance/noindex FROZEN. 404 PNG source integrity PASS, live Cloudflare image/404 status and Tablet behavior remain PENDING. Next Phase 3: cleanup + SEO/sitemap; Phase 4 final build/package. Sanity Free FUTURE only.
