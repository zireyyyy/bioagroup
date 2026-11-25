# R27 — QA matrix

- **Paths:** logs are in the ZIP under `evidence/r27/` (copy of `D:\BIOA_WORKSPACE\_reports\r27\`).
- **Code under test:** `7edb4ec`.
- **Frozen QA build:** `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-r27`, 195 files, tree sha256 `0b4a1740…24951cb`. The build was unchanged after the whole gate run (`gates/summary.txt`).

## 1. Repository gates (local, CMS off; `_reports/r27/run-gates.sh`)

| Command | Result |
|---|---|
| `npm run test:candidate` (unit, module isolation incl. R27 approvals, determinism, icon/tablet type, static audit, D11 40/40, business identity) | PASS |
| `npm run test:p0a` (source pin, isolation, final gate P1…R26+**R27**, determinism) | PASS |
| `node tests/phase-diff-scope.mjs dist-final-r26 R27` | PASS (every change inside the declared R27 scope) |
| `node tests/phase-diff-scope.mjs dist-final-rc2 R26+R27` | PASS |
| `npm run test:responsive` 15 · `test:404` 6 · `test:turnstile` 7 · `test:chat` 8 | PASS |
| Middleware: `maintenance-host-gate` 6 + `r26-production-hash-gate` 4 + `r27-www-apex` 4 | 14/14 |
| `npm run test:cms` | 15/15 |
| `tests/r26-seo-content-audit.mjs` | PASS: 102 pages, 46 stubs, 62 noindex, sitemap 40, 0 fails, 0 warnings |
| **`tests/r27-content-audit.mjs`** | **PASS**: 40 indexable pages, 29 pending articles, 0 fails. On the R26 build it fails: chat message box + missing CTAs (110 pages each), 58 pending articles × 3 controls, 8 retired pages, file-name / misleading alts, serum title, duplicate descriptions |
| `npm run test:p0b1` (Swiper runtime pin) | 24/24 |
| `tests/d11-full-audit.mjs` | PASS |
| `tests/careers-flow.mjs` | 186/186 |
| **`tests/r27-browser-defects.mjs`** (local) | **72/72**. On the R26 build: 52/67 (8 Footer + 5 modal + 2 chat failures) |
| `tests/p1p2-icon-tablet-type.mjs` | PASS |
| `tests/home-roadmap-visual.mjs` Home / Cosmetics | 36/36 / 36/36. One 35/36 in the final run under parallel load (static VI @390), 36/36 on the immediate solo rerun and in the first full run |
| `tests/home-howworks-tablet.mjs` · `tests/home-section-screens.mjs` | 28/28 · 20/20 |
| `tests/p3-route-smoke.mjs` | 204/204 loads |
| `tests/chat-ui-probe.mjs` (R27 contract: no message box, 2 real CTAs inside the panel, honest intro, no `/api/chat`, no non-GET) | 60/60 (6 routes × 10 widths 375…1920) |
| `tests/lead-form-probe.mjs` | 36/36 (no request left the browser) |
| Tablet suites: browser smoke, services swiper, blog TOC, contacts/404, full route audit | PASS |
| CI static checks run locally (13 Phase 2B / cookie / font / Zalo / Footer brand / WA / watermark / first-paint build) | 13/13 (`ci-static-local.txt`) |
| **GitHub CI** `candidate-validation` on PR `zireyyyy/bioagroup#13` (includes the Footer-EN browser test, Phase 2B audits, typography, first paint) | **pass** (`ci-pr13.txt`) |

## 2. CMS modes

| Case | Result |
|---|---|
| live mode (preview branch, Sanity published after R27 sync) vs CMS off | byte-identical, 195 files |
| snapshot with one pending article `rewriteApproved` | listed again (10 articles), indexable, in the sitemap |
| injected stale old testimonial slot | not rendered (slot no longer in the registry) |
| Production branch | `CMS mode: off` on `d187b3a4` (no pin); isolation as proven in R26 |
| Webhook on R27 code | published edit rebuilt `cms-preview` and was visible; restore → 8/8 pages byte-identical; Sanity 0 drafts, 0 assets, 0 QA docs |

Evidence: `cms-modes.txt`, `qa-webhook-r27.txt`.

## 3. Browser E2E on the real CMS Preview (https://cms-preview.bioagroup.pages.dev/)

| Run | Coverage | Result |
|---|---|---|
| Full, code `fa4231a` (`e2e-preview/`) | 102 routes: sitemap 40 + 4 policy + **58 pending Blog articles**; 12 redirect stubs (incl. retired `/blog/page/3-6/`); 2 not-found probes; widths **320, 375, 390, 768, 1024, 1440, 1920**; zoom profiles **1440@125 % (1152)** and **390@125 % (312)** | **748 loads, 0 failed loads**, 0 overflow, 0 broken images, 0 unexpected console errors. **11/11 flows**: cookie VI/EN, mobile menu, modal **Esc closes: true**, slider, language switch, keyboard Tab |
| Final, code `7edb4ec` (`e2e-preview-final/`) | 44 routes (sitemap 40 + 4 policy) × **312, 320, 375, 390, 768, 1024, 1440, 1920** + both zoom profiles; 6 stubs, 2 not-found | **380 loads, 0 failed loads**, 0 overflow / broken / unexpected console; **11/11 flows** (modal Esc closes: true) |
| `tests/r27-browser-defects.mjs` on Preview, `fa4231a` and `7edb4ec` | F01 Footer 6 routes × 10 profiles; F02 5 cases; chat 2 | 72/72 and 72/72 |

**Expected on `*.pages.dev`, not failures:**
- Turnstile 110200: the key allows only `bioagroup.vn`.
- `challenge-platform` 400s are counted.
- `/api` is locked on the Preview by design.

**Warnings kept (not R27):** "clipped text" on Dịch Vụ Khác / Chai lọ cards was measured during the reveal animation. The same warning existed in R26 and the cards display fully after the reveal.

## 4. Visual / geometry parity vs R26 (`visual/`, `tests/r26-visual-parity.mjs`)

**53/72 identical** (0.00 % changed pixels, geometry ±1 px): About, Cosmetics, Services, Contacts, career detail, Privacy, Cookie, 404 in VI/EN at 390/834/1440.

The **19 differences are all intentional R27 changes:**

| Page | Difference | R27 cause |
|---|---|---|
| Home ×6 | document height −356 to −750 px; reviews section gone | F03 |
| Home VI @390 | +21 px on the packaging card | MOQ wording "Theo dự án … (MOQ)" |
| Blog index ×5 | different cards | 9 listed articles |
| Pending article detail ×4 | about −116 px | previous/next card now points to listed articles only |
| Careers ×4 | ±20–48 px | longer/shorter honest subline |

**Section joins:** the gap between "Các dòng sản phẩm…" and "Phù Hợp Với" at 1440 is 128 px, the same as every other Home section gap. Screenshots: `moq-vi-390.png`, `moq-en-390.png`, `moq-vi-1440.png`, `home-formats-to-rightchoice-1440.png`.

## 5. Production / `www` (read-only + HEAD, no POST)

| URL | Result |
|---|---|
| `https://bioagroup.vn/`, `/en/about/`, `/sitemap.xml`, `/api/lead` | 503 `noindex` |
| `https://d187b3a4.bioagroup.pages.dev/`, `https://bioagroup.pages.dev/` | 503 |
| `https://www.bioagroup.vn/*` | 301 → apex (path + query); `http://www…` → https → apex (2 hops); certificate valid (Google Trust Services, SAN `www.bioagroup.vn`) |
| Production deployment `d187b3a4` (`9d044a7`) | `CMS mode: off`, `BIOA_SITE_MODE=maintenance`, `BIOA_DEPLOY_ENV=production`, `secret in log: false` |

## 6. R27b re-run (code `cc14ad3`/`fb8edd8`, 2026-11-19)

| Check | Result |
|---|---|
| Full gate suite (`gates/summary.txt`, frozen build `dist-final-r27`: 196 files, tree `1cc7b05f…`, unchanged after QA) | all PASS: candidate, p0a, responsive 15, 404 6, Turnstile 7, chat 8, middleware incl. **r27-redirect-301 4/4**, scope R27 + R26+R27, SEO audit, **R27 content audit** (extended), p0b1 24/24, D11, careers 186/186, R27 browser 72/72, P1/P2, roadmap 36/36 + 36/36, how-works 28/28, home sections 20/20, route smoke 204/204, chat probe 60/60, lead probe 36/36, tablet suites. `test:cms`: the first run had 13/15 because 2 assertions encoded the old (shifted) packaging pairing; after updating them to the image-based pairing, 15/15 |
| Extended `r27-content-audit` on the earlier R27 build | FAIL as expected (Vitamin/Omega/Probiotics hidden Footer labels ×102 pages, "Viên nang", carousel/image mismatch, sample role pages indexable without note, missing 301 map): the new rules catch the defects |
| Off-domain rendered-text scan (`r27b-offdomain-before.txt` → `-after.txt`) | 31 distinct hits → 8, all "dose" (cosmetic dispensing) in 2 EN Blog articles |
| Live CMS build vs CMS off (after the R27b Sanity sync) | byte-identical, 196 files |
| CMS Preview deploys `ff6b8a2e` (`cc14ad3`) and final `490ee5cf` (`fb8edd8`) | `CMS mode: live`; 13/13 and 8/8 sampled files byte-identical to the local build; real **HTTP 301** for `/blog/page/3-6/`, `/en/blog/page/3-6`, `/lien-he/`, `/nang-luc/`, `/careers/*` (query kept); `/blog/page/2/` 200 |
| **Preview E2E (`e2e-preview-r27b/`)** | 102 routes (sitemap 34 + 4 policy + 58 pending articles + 6 sample role pages) + 12 redirect stubs + 2 not-found; widths **312, 320, 375, 390, 768, 1024, 1440, 1920** + zoom 1152@125 % and 312@125 %: **850 loads, 0 failed**, **11/11 flows** |
| `r27-browser-defects` on the R27b Preview | 72/72 |
| Visual/geometry vs R26 (`visual-r27b/`) | 44/72 identical. 28 intentional: Home ×6 (reviews removed, MOQ), Cosmetics EN @390 and Services VI/EN @390 (service-path card text height), Blog ×5, pending article ×4, Careers ×4, **career detail ×6** ("not hiring" note) |
| Screenshots | `pack-before-*` / `pack-after-*` (carousel), `cards-*` (service paths, career note) |
| GitHub CI on PR `zireyyyy/bioagroup#13` at `fb8edd8` | **pass** (`ci-pr13-r27b.txt`) |

## Not verified by the developer

- Real phones/tablets (browser emulation only).
- Pages behind the owner access link (the secret was not used).
- Search Console (maintenance blocks indexing).
- The owner's visual acceptance.
