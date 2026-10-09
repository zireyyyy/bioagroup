# Bio-A 404 — SOURCE DOM / ORIGINAL ASSET handoff (2026-10-09)
**Asset-in-Git integrity: PASS**. Owner uploaded exact `assets/bioa-404-original.png` on commit `4b0864736cf1233116df826019b942a5f6591e56`. GitHub reports 2,404,033 bytes and blob `adc8d907c01c8bd8f6fcbfbf9416f4ad94e4f05b`, matching the owner's file (1808×870; SHA256 `00a6939ecab5ddbb6964a26c24d72ee56c8bf8c574f80bef07cce477cd13c076`). New `tests/not-found.test.mjs` guard checks original byte hash and PNG dimensions.
**404 production/runtime: still PENDING**. No assertion that Cloudflare has deployed that commit or served HTTP 200 from authenticated preview; Desktop/Tablet/Mobile independent owner acceptance and true HTTP404 remain to be checked.

## Merywood reference / locked visual owner
Owner supplied Merywood export `BIOA-Website.zip/pages/index/index.html` contains CTA `a.btn > i.icon.btn__icon.arrow > svg[width=20][height=20] > path[d=M13.75...] + span.btn__text`. Existing BIO-A `bioa-404.mjs` reuses this pattern, English "Ooops!" and original text on both VI/EN nearest-404 pages. The exact source `404.php` / CSS is NOT available; do not claim pixel parity from screenshot. Owner confirmed remaining 404 visual components PASS in conversation — **no further font, icon, DOM, CTA, image generation or layout edits authorized**.

## Route and security contract
- ROUTE `bioa-404.mjs` references `/assets/bioa-404-original.png`, with old 18,520-byte AVIF ONLY as temporary `onerror` fallback. Do not remove fallback until owner approves final cleanup.
- `build.mjs` generates `dist/404.html` and `dist/en/404.html`, retains `noindex,nofollow,noarchive` and `dist/_routes.json` includes all paths.
- GLOBAL `functions/_middleware.js` must keep guests behind 503, owner signed private preview (14d), and noindex. Do not turn on public mode.
- Locked Home, Header, Footer, Chat, Blog, Contacts, D1, Sheets, Resend unchanged.

## Next verification
1. Check Cloudflare deployed revision includes asset commit; in authenticated owner preview confirm image returns HTTP200 `image/png`, full 1808×870, sharp at Desktop, Tablet and Mobile.
2. Check signed-owner unknown VI/EN URLs return true 404 with Merywood content/CTA, and guest incognito still sees 503 + noindex/robots deny.
3. Record independently Desktop/Tablet/Mobile owner PASS. Only then freeze route 404. No forced retest of other locked UI.
4. Proceed to controlled production Turnstile negative test described in docs/LEAD_SECURITY_NOTIFY_SETUP.md without changing the frozen form.
**Rollback:** Prior 404 code candidate `26282b954ab090858976c7c61308729cbde0b521` is maintenance-gated but lacks original asset and must not be labeled image-PASS.

## BIOA-404-RESPONSIVE-SOURCEFLOW1 — 2026-10-09
Owner runtime screenshots: Desktop 404 PASS/LOCKED; Merywood iPhone original shows heading → description → contained centered artwork → wide CTA. Current BIO-A mobile/tablet instead rendered the source artwork fullscreen `object-fit:cover` and CTA above it. This was traced to `bioa-404.mjs`'s absolute background and desktop-flow CTA coupled with a mobile media query that only shrank text.
**Minimal ROUTE fix**: keep byte-identical PNG, original English copy and Merywood-derived CTA SVG, Desktop base styles unchanged. At existing site responsive range <=1200px, use one grid composition and `display:contents` on the wrapper so the existing nodes can occupy heading row1, description row2, artwork row3, CTA row4 **without DOM duplication**. Artwork switches from fullscreen cover to relative height-auto contain. At source-known <=768px mobile split, reduce text/spacing and stretch existing CTA to content width. These breakpoints align with existing project responsive families; 404-specific original Merywood stylesheet remains **not archived**. The owner's Merywood mobile screenshot is the visual reference, **not proof of exact original CSS equivalence**.
**Desktop >1200px**: source CSS and markup unchanged; owner PASS preserved pending regression check.
**Tablet 769–1200px**: source-derived stacked layout CANDIDATE / RUNTIME PENDING (portrait+landscape).
**Mobile <=768px**: screenshot-derived stacked layout CANDIDATE / RUNTIME PENDING (iPhone/Android).
**VI/EN** both share `renderNotFound()`; site private 14d/noindex gate and real 404 must remain. No PNG re-render, no global shell, other routes, backend, D1/Sheets/Resend, Turnstile changes.
**Test requirement**: signed-in owner preview on nonexistent `/bioa-404-qa-notfound/` and `/en/bioa-404-qa-notfound/` at widths 390,430,768,820,1024,1180,1440. Mobile/Tablets text→contained PNG→full/well-sized CTA, no clip/overflow; Desktop original screenshot matches previous PASS; CTA returns Home; signed-out visitors remain 503 maintenance. Record owner PASS/FAIL per surface.
**Rollback**: HEAD prior to patch `d3999a7f350a1bc465892321d20c09950396bbd4` (maintenance-gated, Desktop PASS; compact route FAIL). Do not revert to an unsecured commit.
