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

## Defects closed during recovery (technical)
| ID | Finding | Fix | Status |
|---|---|---|---|
| D11 | 30 of 52 dead internal links are legacy Bio-A slugs in Footer v2 / About cards with a same-meaning page | BIOA-R1 redirect pages (Footer DOM unchanged) | FIXED · 22 remain (below) |
| D12 | Blog index/pagination had no `h1` | BIOA-R2 tag only, computed style identical | FIXED · OWNER VISUAL PENDING |
| SEO-1 | Merywood Yoast/Organization JSON-LD on every page: "OÜ Bio-A Group", EU supplement claims, Merywood articles, invalid host `https://Bio-A Group.com/` | BIOA-R3 removed (BIO-A JSON-LD kept) | FIXED |
| SEC-1 (was T5) | Merywood WP `hs-reader-timer` beacon on 76 Blog posts (POST every 15 s) | BIOA-R3 removed | FIXED |
| RUN-1 | Swiper sliders broken (live Merywood `main.js` changed 2026-10-29) | P0B1 port `510ab9e` | FIXED · OWNER VISUAL PENDING |
| BLD-1 | Build fetched merywood.com live (non-deterministic) | P0A port `2c71f52` | FIXED |

## Open — owner decision / hard gate
| ID | Where | Finding | Needed from owner | Blocking release? |
|---|---|---|---|---|
| LEGAL-1 | `/privacy-policy/`, `/cookie-policy/` VI/EN | Legal text names **"Bio-A Group OÜ, Reg no. 16386898, Narva mnt 7-557 Kesklinna"** (Merywood's Estonian company data) | BIO-A legal entity, registration number, address, contact for data requests; or approved policy text | **YES** |
| D11-rest | Footer "Chính Sách Vận Chuyển / Shipping Policy" (visible); Careers 2 job cards (B2B Sales Manager, Regulatory Affairs Specialist EU — Merywood roles); hidden Merywood items (Omega 3, Vitamin E/K, Probiotics, `+N more`) | 22 targets 404 | Create page, change link, or remove item (removal = owner decision) | Shipping link: recommended before release |
| CAREERS-1 | `/careers/` VI/EN | Page body is Merywood's English content, visible at all widths: "We are a European manufacturer of dietary supplements and personal care cosmetics…", remote EU roles | BIO-A recruitment content (or hide the route until ready) | **YES** (false company claim) |
| T4 | Quote modal VI label "Loại sản phẩm / dịch vụ (không bắt buộc)" | Truncated at ≤390 (Mobile PASS) and 769 (Tablet PASS); same on approved Preview | Shorter label or wrap (visual change) | No |
| T2 | All pages | Other WP leftovers with host `https://Bio-A Group.com/` (wp-emoji loader, `MW_WAC` config) fail silently; same on approved Preview | Accept, or clean in a separate patch | No |
| A4 | Home Tablet 834/1024 | Icons 01/02 cream (Production) vs white (PR #10) | Choose | No |
| T6 | Home Tablet "Quy Trình Hợp Tác" | P2 makes the block taller (no clipping) | Accept | No |
| P0B2 | Runtime | Swiper/jQuery/Smooth Scrollbar/modal JS, theme + wp-content images, CF7 CSS still load from merywood.com | D2 rights, D4 self-host, D9 CF7 CSS | **YES** for Production |
| FAIL-OPEN | Cloudflare Pages Functions | Set to Fail open (docs require fail closed) | Decide in Cloudflare (not changed here) | **YES** for Production |
