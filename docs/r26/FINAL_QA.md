# R26 — Final QA (2026-11-15)

- **Developer evidence:** everything here is technical QA. It is not an owner PASS.
- **Paths:** raw logs are under `evidence/` in the ZIP, a copy of `D:\BIOA_WORKSPACE\_reports\r26\`.
- **Frozen QA build:** `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-r26`, 195 files, tree sha256 `0f69bd7e…`. The build was unchanged after the whole gate run (`gates/summary.txt`).

## 1. Repository gates (local, frozen build)

| Gate | Result |
|---|---|
| `test:p0a` determinism + cumulative phase gate P1…R26 | 9/9, PASS |
| Scope gate R26 vs R24RC2 (`phase-diff-scope.mjs`) | PASS: only hreflang/og:locale in HTML; sitemap lost only the 4 noindex pages |
| `test:cms` (registry, slots, release pin/extract, canonical, legal hash, mode decision) | 15/15 |
| SEO/content audit (`r26-seo-content-audit.mjs`) | 110 pages, 4 noindex, 106 in sitemap, **0 fails, 0 warnings** |
| Middleware: maintenance host 6/6, R26 Production hash gate 4/4 | PASS |
| Responsive 15/15, 404 6/6, Turnstile 7/7, chat gateway 8/8 | PASS |
| P0B1 runtime pin | 24/24 cases |
| Careers flow | 186/186 checks |
| P1/P2 | PASS |
| D11 legacy redirects | 40/40 |
| Home Roadmap (home + cosmetics) | 36/36 + 36/36 |
| How It Works | 28/28 |
| Home sections | 20/20 |
| Route smoke | 220/220 loads |
| Chat UI probe | 60/60 |
| Lead form probe | 36/36 (no request left the browser) |
| Tablet suites: browser smoke, services swiper, blog TOC, contacts/404, full route audit | PASS |
| `npm run test:candidate`, final clean rerun | exit 0 (`gates/gate-test-candidate-rerun.txt`) |

**D11 note.** The first `test:candidate` run (exit 1, D11 38/40) happened while the machine was also running the browser suites. D11 passed 40/40 on its own and in the clean rerun. It was not changed.

## 2. Browser E2E on the real Cloudflare Preview (`e2e-full/`)

**Coverage**

| Item | Value |
|---|---|
| Routes | 110 (VI + EN), plus 6 redirect stubs and 2 not-found probes |
| Widths | 375, 390, 768, 834, 1024, 1440, 1920 |
| Zoom profiles | 1440 @ 125 % (= 1152 CSS px) and 390 @ 125 % (= 312 CSS px) |
| Page loads | **798** |

**Results**

| Check | Result |
|---|---|
| Page loads, first pass | 795 PASS |
| Transient network failures | 3, all on font/page fetches: `ERR_QUIC_PROTOCOL_ERROR`, `ERR_NETWORK_CHANGED`, one 60 s timeout. Retried: **3/3 PASS** (`retry-network-errors.txt`) |
| Horizontal overflow | **0** |
| Broken images / resources | **0** |
| Unexpected console errors | **0** |
| Flows | **11/11 PASS**: cookie banner VI/EN (choice persists), mobile menu @390 (13 links), no hamburger @834 (desktop nav), quote modal @390/@1440, slider @390/@1440, language switch (About, Careers detail), keyboard Tab order |

**Expected on `*.pages.dev`, classified, not failures**
- Turnstile error 110200: the site key allows only `bioagroup.vn`.
- `challenge-platform` 400 responses: counted, 789.
- The Preview `/api` is locked by design.

**Findings (P3, none changed, see `ROADMAP_FINAL_STATUS.md`)**
- Footer "Services" column clipped by 13 px at 312 CSS px, EN only. Present in R24RC2 (frozen owner-PASS Footer).
- Quote modal does not close with ESC. This is Merywood source behaviour; the close button works.
- The "clipped text" warnings on Dịch Vụ Khác / Chai lọ were measured before the reveal animation ended. Screenshots after the reveal show the full text (`e2e-full/*.png`).

## 3. Visual / geometry parity vs R24RC2 (`visual/`, contact sheets)

- **Matrix:** 12 page families × VI/EN × 390/834/1440.
- **Checks:** section geometry ±1 px and a first-screen pixel diff.
- **Result:** **72/72 PASS**, 0.00 % changed pixels.
- **Contact sheets:** `visual-contact-sheet-vi.png`, `visual-contact-sheet-en.png`.

## 4. Sanity CMS on Preview (`qa-sanity-preview.txt`, `qa-cms-preview-webhook.txt`, `qa-release-isolation.txt`)

| Case | Result |
|---|---|
| Publish images | Home hero `<img>` and mobile `<picture>` source, tube desktop + mobile cuts, About background → correct cropped WebP files; a neighbouring locked image was untouched |
| Text | Home H1 VI/EN changed |
| Blog | draft not visible (404) → published visible VI/EN |
| Careers | status Đang tuyển visible → Đã ngừng tuyển (pill, removed from the list) |
| Wrong canonical published | Preview build **failed closed**, and the last good build kept serving |
| Rollback | 10 representative pages byte-identical to the R26 build |
| After the merge: webhook → `cms-preview` | edit visible, restore → 8 pages byte-identical |
| Production isolation, 8 cases | as expected (`DEPLOY_AND_ROLLBACK.md` §4) |
| Sanity left clean | 0 drafts, 0 QA documents, 0 assets, 0 image slots with an upload |

- **Edge cache:** after a QA page is deleted, the Preview alias can keep serving the cached copy (`s-maxage`) for a while. A query string bypasses the cache. This is Cloudflare cache behaviour, documented in the owner guide; it is not a build defect.

## 5. Lead API (isolated staging, `qa/lead-staging.txt`)

- **Setup:** local `wrangler pages dev` with a fresh local D1. Sheets/Resend were not configured, so no external call was made.
- **Result: 10/10 PASS.**
  - GET 405; cross-origin 403; missing consent 400; non-JSON 415; invalid JSON 400;
  - honeypot accepted silently and not stored;
  - valid VI and EN leads stored;
  - idempotent `submission_id`;
  - rate limit 429.
- **Production:** read-only/HEAD only: `/api/lead` 503 in maintenance. **No POST to Production.**
- The real Production lead E2E was owner-verified on 2026-11-12.

## 6. Production (after the merge)

See `DEPLOY_AND_ROLLBACK.md` §3–4:
- build log `CMS mode: off`;
- all hosts 503 + `noindex`;
- new hash URL gated;
- rollback rehearsed with maintenance held.

## Not verified by the developer

- Real phones/tablets: a browser emulation was used.
- Production pages behind the owner access link: the secret was not used.
- Search Console indexing: maintenance blocks indexing.
- The owner's visual acceptance.
