# BIO-A — OWNER ISSUE LEDGER (recovery branch)

One row per issue, deduplicated. The developer never marks OWNER PASS. Fixes are grouped by canonical owner; each fix gets a regression test, a scope-gate run (`tests/phase-diff-scope.mjs`) and the browser smoke.

## Intake process for owner screenshots / videos
1. Owner sends: screenshot or video + route + VI/EN + viewport (and zoom if not 100%) + how the site was opened (`npm run serve` locally, or a Preview URL).
2. Dev assigns `BIOA-OI-<n>`, reproduces **in a real browser on the same build and viewport**, and records the request/network state (failed requests, missing stylesheet) before touching any CSS.
3. Root cause at the canonical owner (SOURCE_MAP); minimal patch; targeted test; scope gate; `npm run test:smoke` on affected routes incl. 768/769 and 1200/1201.
4. Evidence to `D:\BIOA_WORKSPACE\QA_EVIDENCE\OI-<n>\`; local commit `BIOA-OI-<n>: ...`.
5. Status stays `OWNER VISUAL PENDING` until the owner confirms; release is held while any BLOCKING row is open.

## Owner-reported
| ID | Report | Root cause | Fix | Proof | Status |
|---|---|---|---|---|---|
| OI-1 (2026-11-08) | Local `http://127.0.0.1:4173/` Desktop Home: Header as bullet list, nav repeated, links unstyled, avatar/chat image broken | `tools/serve-dist.mjs` (P0–P7 branch) wrote headers before reading the file; the first missing file — `/cdn-cgi/scripts/.../email-decode.min.js`, which only the Cloudflare edge serves — crashed the server, so `main.css` and images requested afterwards got `ERR_CONNECTION_REFUSED`. Built HTML/CSS were not at fault (same dist served correctly = 4/4 PASS vs approved Preview) | BIOA-R0: crash-proof server + `tests/serve-dist.test.mjs` + `tests/recovery-visual-smoke.mjs` (negative control without `main.css` reproduces the owner screenshot) | `_reports\recovery\repro-buggy.log`, `buggy-server-home-1440.png`, `negctl\` | FIXED (tech) · OWNER VISUAL PENDING |
| R12 (pre-roadmap) | Other Services icon ≠ Home icon 04 | `9737eb0` removed icon CSS from Home bundle | P1 port `e2c78c6` | `tests/p1p2-icon-tablet-type.mjs` 22 cases | OWNER VISUAL PENDING |
| R12 (pre-roadmap) | Tablet small text, modal | dead selector `.formats__description`; consent is `label.label-check`; 8-line clamp cut steps | P2 port `22ccdf4` | same test | OWNER VISUAL PENDING |
| OI-2 (2026-11-10) | Local Desktop Home Roadmap "Từ Ý Tưởng Đến Thành Phẩm": CTA/Footer overlap the card, slide offset (screenshots `Screenshot 2026-11-10 133613/133621.png`) | Merywood `swiperAutoHeight` measures on window resize before Swiper re-lays the slides; `.step{transition:.5s}` animates vw padding after. Any width change after load (resize/maximize/zoom/DevTools) left a stale slider height. Not MOTION-U1 (ROADMAP-R4) this time. Same on Cosmetics and on approved d59f50d | BIOA-R24 ROADMAP-R5 `497467a`: Home-owned sync re-runs the source path after Swiper resize + after the card transition; Cosmetics reuses the owner | `tests/home-roadmap-visual.mjs` static + resized 18/18 each (Home, Cosmetics); before: overlap 222/319px; `docs/HOME_REGRESSION_R24.md` | FIXED (tech) · OWNER VISUAL PENDING |
| OI-3 (2026-11-10) | Tablet 834 "Quy Trình Hợp Tác": cards taller than Merywood, photo short with blank band (screenshots `133901.png` vs Merywood `133926.png`) | full VI copy at 12px (TABLET-TYPE-SOURCE1, P2 clamp off) grows the info column; photo keeps source fixed 26.0417vw | BIOA-R24 HOWWORKS-T1: Tablet-only, card fills slide height, photo = row height; copy/order/grid kept | `tests/home-howworks-tablet.mjs` 28/28; VI still ~49% taller than Merywood (trade-off) | FIXED (tech) · OWNER VISUAL PENDING |
| OI-4 (2026-11-10) | Owner content decision: hide Careers, remove Shipping link | — | BIOA-R24 CONTENT-C1 | D11 audit 0 dead, P3 static 0 hard | DONE (tech) · OWNER VISUAL PENDING |
| OI-5 (2026-11-10) | Owner: Tablet FAIL on `eabcd48` (Desktop CTA PASS/FREEZE, Desktop/Mobile FREEZE) | TABLET-TYPE-SOURCE1 12px floor + line-height 1.5 (Phase 2B, never PASS) made copy 1.7× the vw-scaled layout and shrank Why Choose titles (`.item p`); HOWWORKS-T1 let the photo ratio and the tallest hidden slide set card heights | BIOA-R24g `cbda526`: TABLET-TYPE-SOURCE2 `max(9px, source vw)` copy slots only + HOWWORKS-T2 | `_reports\tablet-r25\final\SHEET-*.png` (28 sheets Merywood/VI/EN); Tablet-only diff proof 102/102; `docs/HOME_REGRESSION_R24.md` | FIXED (tech) · OWNER VISUAL PENDING |
| BL-1 / ROADMAP-M1 (2026-11-10, backlog) | Mobile Roadmap words joined where the source hides `<br>` («tưởng,nhóm», «sáchvà») | Merywood `.block-roadmap .step__text br{display:none}` ≤768 + ROADMAP-R3 copy without a space before `<br>`; identical on approved d59f50d | not in R24: content-only space before each `<br>` | `qa-final\compare\SHEET-roadmap-390-vi.png` | BACKLOG (owner decision) |

## Defects closed during recovery (technical)
| ID | Finding | Fix | Status |
|---|---|---|---|
| D11 | 30 of 52 dead internal links are legacy Bio-A slugs in Footer v2 / About cards with a same-meaning page | BIOA-R1 redirect pages (Footer DOM unchanged) | FIXED · 22 remain (below) |
| D12 | Blog index/pagination had no `h1` | BIOA-R2 tag only, computed style identical | FIXED · OWNER VISUAL PENDING |
| SEO-1 | Merywood Yoast/Organization JSON-LD on every page: "OÜ Bio-A Group", EU supplement claims, Merywood articles, invalid host `https://Bio-A Group.com/` | BIOA-R3 removed (BIO-A JSON-LD kept) | FIXED |
| SEC-1 (was T5) | Merywood WP `hs-reader-timer` beacon on 76 Blog posts (POST every 15 s) | BIOA-R3 removed | FIXED |
| RUN-1 | Swiper sliders broken (live Merywood `main.js` changed 2026-10-29) | P0B1 port `510ab9e` | FIXED · OWNER VISUAL PENDING |
| BLD-1 | Build fetched merywood.com live (non-deterministic) | P0A port `2c71f52` | FIXED |
| RUN-2 (P0B2-A) | jQuery/Swiper/smooth-scrollbar/WP hooks+i18n loaded live from merywood.com; site broke when it was blocked/slow | BIOA-R12 self-hosted, byte-identical, SHA-256 fail-closed; blocked-merywood sliders 18/18 init | FIXED · OWNER VISUAL PENDING (N1) |
| I18N-1 | VI pages: «+N more / Show fewer», 16 Merywood English strings in packaging cards | BIOA-R13 | FIXED · OWNER VISUAL PENDING (N2/N3) |
| T4 | VI quote dropdown label clipped at 375/390/769 | BIOA-R13 «Sản phẩm / dịch vụ (tùy chọn)» | FIXED · OWNER VISUAL PENDING (N4) |
| D11-toggles | 8 format-toggle hrefs to Merywood 404 pages | BIOA-R13 href "#" | FIXED |
| ID-1 | Three duplicated company objects | BIOA-R14 canonical `bioa-business.mjs` + gate | FIXED |
| ID-2 | careers@merywood.com, info@Merywood.ee (obfuscated) public | BIOA-R15 → contact@bioagroup.vn | FIXED (text of those pages still LEGAL-1/CAREERS-1) |
| SEO-2 | og:url = merywood.com on all 104 pages; Blog share links shared a Merywood article; Merywood favicon/oEmbed/og:image | BIOA-R15 | FIXED |
| CHAT-1 | Chat is a local mock with no server path | BIOA-R16 `/api/chat` gateway, flag OFF (AI-READY) | READY · NOT CONNECTED |
| CHAT-2 | Chat preview reply claimed «đã ghi nhận nhu cầu» without any backend | BIOA-R21 honest reply (design unchanged) | FIXED · OWNER VISUAL PENDING |
| T2-ROOT | Route smoke "Object" page error | CF7 schema fetch to invalid host `Bio-A Group.com`, uncaught `{code:fetch_error}` on every page (also approved Preview); smoke identifies it exactly | ROOT CAUSE KNOWN · runtime unchanged (OD-5/D9) |
| QA-P0A | `test:p0a` exit 1 on final dist | historical fidelity separated (`test:p0a:historical`), final gate `p0a-final-gate` | FIXED (gate) |

## Open — owner decision / hard gate
| ID | Where | Finding | Needed from owner | Blocking release? |
|---|---|---|---|---|
| LEGAL-1 | `/privacy-policy/`, `/cookie-policy/` VI/EN | Whole text is Merywood's Estonian/EU policy (English also on VI pages): "Bio-A Group OÜ, Reg no. 16386898, Narva mnt 7-557 … Tallinn, Estonia", Estonian acts, Estonian Data Protection Inspectorate, contact **info@Merywood.ee** (Cloudflare-encoded, plain on live). Clause list: `docs/LEGAL_CONTENT_BLOCKERS.md` | BIO-A legal entity, registration number, address, contact for data requests; or approved policy text | **YES** |
| D11-rest | `tests/d11-full-audit.mjs` (2026-11-10): of 52 targets, 30 redirect to a 200 page, 8 toggle targets unlinked (R13), **14 still 404**: 6 user-facing (Shipping Policy VI/EN on every page; 4 Careers job cards), 8 hidden Merywood footer items (Omega 3, Probiotics, Vitamin E/K) | 14 targets 404 | Create page, change link, or remove item (removal = owner decision) | Shipping link: recommended before release |
| CAREERS-1 | `/careers/` VI/EN | Page body is Merywood's English content, visible at all widths: "We are a European manufacturer of dietary supplements and personal care cosmetics…", remote EU roles | BIO-A recruitment content (or hide the route until ready) | **YES** (false company claim) |
| T2 | All pages | Other WP leftovers with host `https://Bio-A Group.com/` (wp-emoji loader, `MW_WAC` config) fail silently; same on approved Preview | Accept, or clean in a separate patch | No |
| A4 | Home Tablet 834/1024 | Icons 01/02 cream (Production) vs white (PR #10) | Choose | No |
| T6 | Home Tablet "Quy Trình Hợp Tác" | P2 makes the block taller (no clipping) | Accept | No |
| P0B2 | Runtime | **2026-11-10: OSS part closed by R12; remaining = Merywood-owned `modal.js`/`input.js` (synchronous, still hang the page when merywood.com is slow), CF7, images.** Full inventory and pinning proposal: `docs/RUNTIME_DEPENDENCIES.md`. jQuery 3.7.1, Swiper 11.1.4, smooth-scrollbar 8.8.4 and WP 7.1 hooks/i18n are byte-identical to upstream OSS (pinnable after D2-OSS); modal.js/input.js/images are Merywood-owned (D2/D4); CF7 files differ from 6.1.7 (D9). Blocking merywood.com breaks all sliders and up to 11 images per page. Observed 2026-11-08: during the route smoke, 12 Blog page loads in one time window hit 60 s timeouts or `Swiper/wp is not defined` (merywood.com slow); rerun 28/28 PASS. The site breaks whenever that third-party host is slow or changes | D2 rights, D4 self-host, D9 CF7 CSS | **YES** for Production |
| FAIL-OPEN | Cloudflare Pages Functions | Set to Fail open (docs require fail closed) | Decide in Cloudflare (not changed here) | **YES** for Production |
