# BIO-A × Merywood — Ownership and Static Render Audit (Phase A1)
Date: 2026-10-13
Authority: owner-approved rollback baseline `c320f2868a46aafd141a7178c03337a1d07b3a82`.
State: **AUDIT ONLY / NO UI PATCH / NO OWNER RUNTIME PASS CLAIM**.
This report continues the owner-supplied prior audit `BIOA_MERYWOOD_SOURCE_AUDIT_c320f28.md` and 31-item asset register. That external ZIP/main.txt comparison was documented in the earlier chat; the current pass independently checked **GitHub code at c320f28**, not a new byte-level inspection of the external Merywood ZIP or live computed styles.

## 1. Verified repository and build execution
- GitHub `main` observed at `c320f2868a46aafd141a7178c03337a1d07b3a82` on 2026-10-13, matching explicit owner rollback. Pinned tree `79dbc68c78c0620dac57349eeef6268065010429`. Protect this as the rollback target.
- Build owner: `build.mjs` imports `applyFinalFixes` (`bioa-transform.mjs`), `applyHomeRefinement` and `applySharedShell` (`bioa-home-refine.mjs`), route-specific refiners and `renderNotFound`.
- `buildOne()` fetches `https://merywood.com` + each original source route **at build time** (in `build.mjs`, `BASE`, `fetch(BASE+sourceRoute)`). **Reproducibility risk:** an unchanged BIO-A SHA does not guarantee identical generated HTML if the remote Merywood site changes. `main.txt` and original Merywood ZIP are not vendored as an authoritative build snapshot in this repository. Do not silently substitute a new source snapshot; first establish an approved, license-safe pinned source and content-hash comparison.
- Rendering order: `applyFinalFixes` then, on Home, `applyHomeRefinement`; on subpages, route-specific refinement followed by `applySharedShell`. This is an **intentional difference in style assembly** requiring generated-HTML and computed-style parity testing; source inspection alone does not prove a regression.
- `applySharedShell` injects `#bioa-shared-shell`; Home injects `#bioa-home-refine`. Both include `sourceComponentCss` last within their CSS assembly; their preceding patch lists are not identical.
- The `sourceComponentCss` owner (`bioa-source-components.mjs`) scopes Header, Footer, Chat and project CTA to `769–1200px`. The prior owner-provided Merywood `main.txt` audit reports fluid Desktop from 769px and Mobile at <=768px. This custom intermediate owner needs runtime/source-cascade evidence before any edit.
- Baseline GitHub Actions run `38040527108` reported success for `c320f28`. This is **automated verification only**, not cross-device visual PASS or Cloudflare deployment proof.

## 2. Static CSS/JS concentration (literal occurrences, not active CSS rules)
| File | Source characters | `!important` occurrences | Named `patch*Css` declarations | Literal `@media` |
|---|---:|---:|---:|---:|
| `bioa-transform.mjs` | 56,943 | 190 | 0 | 2 |
| `bioa-home-refine.mjs` | 191,857 | 2,508 | 47 | 53 |
| `bioa-source-components.mjs` | 13,158 | 298 | 0 | 1 |
| `bioa-cosmetics-refine.mjs` | 38,658 | 13 | 0 | 2 |
| `bioa-services-refine.mjs` | 13,443 | 17 | 1 | 1 |
| `bioa-blog-refine.mjs` | 229,777 | 169 | 1 | 2 |
| `bioa-contacts-refine.mjs` | 11,968 | 14 | 1 | 1 |
| `bioa-about-refine.mjs` | 17,525 | 0 | 0 | 0 |

These counts were derived from exact file text, not from generated output or CSSOM. Repeated `@media` strings may coexist inside different declarations; this does **not** establish 53 distinct active breakpoints or prove 2,508 rules can be removed. Do not delete rules by count.

## 3. Component authority and collision queue
| Component | Merywood source reference | Current BIO-A owner(s) | What is owner-approved / protected | Next evidence gate |
|---|---|---|---|---|
| Header + Mobile Menu + VI/EN | original `.header` / menu HTML/CSS/JS | transform + Home/shared CSS + sourceComponentCss | 5 navigation entries, BIO-A logo, language/contact actions, accepted Desktop and Mobile visual states | generated DOM, CSS computed winners by width; logo SVG, Header social icon `fill` and contrast |
| Footer + 4 groups | original `#footer` / `.footer-top` | `bioa-home-refine.mjs` + sourceComponentCss | approved BIO-A Desktop 3-zone grid and four categories, light logo, company details; do not revert content to original Merywood | compare approved Desktop grid to Tablet; check logo, all 4 social artwork hitboxes, links, text wraps |
| Chat/contact launcher | original Merywood injects external Dashly (no local panel source) | `addContactLauncher` in `bioa-home-refine.mjs` + sourceComponentCss | BIO-A avatar, channels, open/close interaction; cannot assume full Dashly 1:1 parity | verify dimensions, visibility, safe-area and motion at all devices |
| Cookie | Merywood cookie shell | `bioa-transform.mjs` + shared/Home CSS | owner-confirmed bilingual copy/state | compare consent lifecycle, overlay, legal links VI/EN |
| Home Hero, We Produce, Why Choose, Roadmap, CTA | Merywood Home source blocks | `bioa-transform.mjs` + `bioa-home-refine.mjs` | content/images/motion and prior PASS blocks unchanged | reproduce CSS cascade/reveal across 768/769 and Tablet sizes |
| About icons (01–06) | Merywood About category artwork/frame | `bioa-about-refine.mjs`, reused by cosmetics | owner-provided artwork, exact six images; icon 06 must not disappear | verify six rendered img references, intrinsic crop and card alignment |
| Cosmetics Hub | source cosmetics page | `bioa-cosmetics-refine.mjs` + shared | Hero/product categories/process without reordering | compare generated sections and responsive overflow |
| Other Services | source Hotel/Spa page | `bioa-services-refine.mjs` + shared | five BIO-A-specific icon illustrations and no duplicate services | SVG viewBox and section responsive geometry |
| Blog list/detail | source Blog/card/article TOC | `bioa-blog-refine.mjs` + shared | existing seven migrated VI/EN article topics, slugs, rich layout & SEO | thumbnail render references, pagination, headings, TOC links |
| Contacts + lead flow | original Contacts shell | `bioa-contacts-refine.mjs` + shared + backend | D1/Sheets/Resend/Turnstile, form data and maintenance unaffected | screenshot/readonly checks; no unsolicited form submissions |
| 404 | source 404 CTA layout | `bioa-404.mjs` | owner-approved `bioa-404-original.png` exact source artwork | preserve byte-identical PNG, actual HTTP 404 & responsive art |

A listed component is **PROTECTED**, not necessarily `FULL RESPONSIVE PASS`. The last owner feedback rejected Tablet changes after baseline and demanded rollback. Never revive a rejected candidate from historical handoff headings.

## 4. Asset usage — direct string references
31 artwork files exist in repo under `assets/` (six BIO-A logos/marks, four Zalo variants, one chat avatar, six About icons, five service icons, one cosmetics Hero, one 404 PNG, seven Blog thumbnails). The direct scan covered `build.mjs`, `bioa-transform.mjs`, `bioa-home-refine.mjs`, six route refiners and `bioa-404.mjs`.
- **Direct references found for 26 of 31 files**, including all six About icons, all five service icons, seven Blog thumbnails, cosmetics Hero, 404 PNG and main light/dark logos.
- **No direct reference in the inspected rendering modules for 5 files:** `bioa-wordmark.svg`, `bioa-wordmark-light.svg`, `zalo-bioa.svg`, `zalo-bioa-framed-cream.png`, `zalo-bioa-circle-cream.svg`. They are **candidates for further reference investigation, NOT approved for deletion**. Search generated HTML, CSS `url()`, dynamic asset paths and external integrations first.
- In inspected modules, current Zalo PNG literal is `zalo-bioa-owner.png` (Home/shared, transform, Blog and Contacts). Do not assume the unreferenced framed/circle variants are in production.
- Artwork presence and string references **do not prove network load, rendering, pixel-perfect image scale or computed color**. See `docs/BIOA_ASSET_SOURCE_REGISTER_20261013.md` for owners and next checks.

## 5. Required next steps (no speculative UI work)
A2. Obtain a reproducible source comparator: confirm exact original HTML/JS and version/coverage of owner-supplied `main.txt`, without changing the live runtime or copying unlicensed assets into public GitHub. Identify the downloaded Merywood CSS that matches the source snapshot if legitimately available.
A3. Compare **generated** VI+EN DOM/asset requests and style chain on Home and subpages. Capture computed winners (selector, source style, specificity/order, value) for Header/Footer/Zalo/Chat at viewport 390/768/769/820/834/1024/1180/1366/1440/1920.
A4. Classify each verified rule as Merywood-preserved / owner-approved BIO-A adaptation / duplicate with equivalent computed value / active conflicting rule / dead selector. Audit icons separately from buttons: SVG viewBox, intrinsic transparent padding, object-fit, stroke/fill, states and dimensions.
A5. Audit route sections About → Cosmetics → Services → Blog → Contacts and interactions (VI/EN, keyboard/touch, motion, source breakpoints). Freeze and record per-route Desktop/Tablet/Mobile statuses.
A6. Only after reproducible root-cause evidence, send one component-only reversible code patch to a candidate branch, run build + browser comparison and request owner PASS. Production baseline stays `c320f28` until explicit visual promotion.

## 6. Negative scope / safety
This audit modifies **documentation only**. No HTML/CSS/JS/build/runtime/backend/assets/Cloudflare/maintenance/CRM production code changes. No new claim of FULL TABLET PASS or all-routes visual pass. Keep original `main` SHA unchanged and use a separate branch/PR.

## 2026-10-13 — A3 evidence review and read-only audit tool repair

- Original run `38339149965` at `9afe7e4`: **FAILED** at new computed CSS collector, while existing responsive test, build, generated-HTML audit and Chromium component ratio smoke **PASSED**. Root cause: the *audit tool*, not UI source, called `new URL(req.url())` without handling malformed remote source URL `https://bio-a%20group.com/wp-json/mw-guard/v1/token`. Keep URL redacted in diagnostics; do not infer the production lead endpoint from it.
- Generated audit artifact `11786471899`: 106 HTML files, 32 files under `dist/assets/` (31 artwork + leads JS), 6 About artwork refs found in VI/EN About, CSS string reference to missing `/assets/img/logo-bg.svg`. This missing path is a **static reference**, not proof that a live visible watermark is broken. Source icon map for Services exists but the 5 icon assets are not referenced by HTML (the grid was removed in the previously approved service layout). Do not reintroduce it without approval.
- Diagnostics flaws identified: Home route appeared as `//` due route normalization; style attributes like `background-image:url('/assets/cosmetics-hero-bioa.webp')` were not scanned and could incorrectly label assets unused; malformed external request URL aborted all computed CSS collection.
- Patch target: **audit instrumentation only**, two tools. Recover UI-independent CSS computed/asset evidence, including inline `style` and invalid URL cases. No website UI/source media queries, artwork, backend, deployment or shared component changes. Existing `main` at `c320f28` stays protected. Automated probe outputs are NOT visual owner PASS.
- Current task: analyze collector artifact on next passing run before any targeted Header/Footer/Chat production patch. No runtime owner QA needed for this instrumentation.
