# P0A — Pinned Merywood build source

Status: **LOCAL CANDIDATE** on `candidate/p0a-source-pin` (from `d59f50d`). Not pushed, not deployed. AUTOMATED results below are not OWNER VISUAL PASS.

## What changed
- `build.mjs` no longer fetches `https://merywood.com`. It reads 10 source pages from a verified bundle via `tools/source-bundle.mjs`.
- `source-manifest.json` pins the owner export (`merywood-export 210-3.zip`, 184,107,032 B, SHA-256 `9904a5d6…7c41`, crawled 2026-10-02) and the size + SHA-256 of each of the 10 pages. It contains hashes and public original URLs only; **no Merywood content is committed**.
- Crawler-relative references (`assets/images|css|js/...`) are restored to their original URLs **before** any BIO-A transform, so the 9 BIO-A modules receive the markup they received from the live site. URLs come from Preview `abdd7602` (commit `d59f50d`). `icons/desktop|mobile/{email,whatsapp,facebook}.svg` were collapsed by the crawler and are restored by order of appearance (desktop first, verified on 76 Blog detail routes).
- Fail closed, no live fallback: missing `BIOA_SOURCE_DIR`, size/SHA mismatch, unpinned route, missing required source DOM (Home `.grid.desctop` icon slots, `produce-1_mobile`, product desktop/mobile, Services Swiper/Process), or any crawler path left in output stops the build. `tools/net-guard.mjs` blocks all network access in the build process.
- `.gitattributes` forces LF (Windows CRLF checkouts made 2 responsive source tests fail). `package-lock.json` added for `npm ci`.

## Not changed
9 BIO-A modules (`bioa-*.mjs`), `assets/`, `functions/`, `migrations/`, existing tests, CI workflow, Cloudflare, runtime CSS/JS (still Merywood live, same as `abdd7602`). Swiper behaviour is therefore unchanged by P0A (P0B1 scope).

## Local usage
```
node tools/prepare-source-bundle.mjs --zip "<merywood-export 210-3.zip>" --out <dir outside repo>
set BIOA_SOURCE_DIR=<dir>
npm ci
npm run build
```
The prepare tool refuses to write inside the repository.

## Allowlist vs Preview `abdd7602` (all 104 routes) — `tests/p0a-fidelity-allowlist.mjs`
| Difference | Evidence | Effect |
|---|---|---|
| `?ver=` cache busters | source 2026-10-02 vs 2026-10-13 | none (same live file) |
| `<meta generator>` / emoji `ver` 7.1.2 vs 7.1.3 | WordPress version | none |
| mw-guard `TOKEN_URL` inline script (13/10 adds `inflight`) | targets dead host `Bio-A Group.com` | none; request fails in both |
| Turnstile instance id, WordPress nonce | random per request | none |
| Cloudflare edge email obfuscation | added by Pages edge only | none |
| Careers `mwc-style-inline-css` and whitespace | styles `.mwc-wts/.mwc-hrcard`, absent from both DOMs | not an owner-PASS route |
| Blog listing card `<img width/height>` | Merywood listed other posts on 02/10 | geometry/screenshots equal (guard) |

## Verification (local, Windows, Chrome 156 via `BIOA_CHROME_PATH`)
- `npm run test:p0a`: source-pin 7/7, module isolation 2/2, fidelity 104/104, determinism (2 clean builds, network blocked, 138 files, identical tree SHA-256).
- Existing: `test:responsive` 15/15, host gate 6/6, 404 6/6, Turnstile 7/7, 13 dist tests PASS (incl. `phase2b-home-mobile-convergence`, which fails on a live rebuild).
- `tests/p0a-custom-pass-guard.mjs`: local dist vs Preview `abdd7602`, same live runtime. **Final run 64/64 PASS** (8 routes × VI/EN × 1440/1024/834/390; 320 viewport screenshots, max pixel diff 0.005%). Compares DOM class inventory, visible text, computed type/colour, geometry (1 px), screenshots (≤0.2% px) and interactions with real pointer clicks: Cookie reject, mobile menu open/close, modal open/close (6 fields), Swiper next, VI/EN links, Blog TOC, Contacts FAQ. Every non-GET request and every external navigation is aborted before network on both sides; the *kinds* of blocked requests must match (time-based Blog beacon `hs_reader_ping` fires every 15 s, WhatsApp click tracker `mw_wac_track`). Count-up counters, chat teaser and animations are settled/frozen equally on both sides.

## Open items (owner / reviewer)
- CI workflow and Cloudflare do not yet provide `BIOA_SOURCE_DIR`: on push, builds fail closed until D1/D6/D7 are decided. Do not push before that.
- Node version (D10): local Node 26 used for testing; CI 22; Production `NODE_VERSION=20`.
- Local browser checks used system Chrome (Playwright Chromium extraction blocked locally); CI Chromium remains the automated reference.
- OWNER VISUAL PASS pending.
