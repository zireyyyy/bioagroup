# P0B1 — Pinned runtime main.css / main.js

Status: **LOCAL CANDIDATE — TECH PASS, OWNER VISUAL PENDING.** Not pushed, not deployed.

## Why
Every page loaded Merywood's live `main.css` and `main.js`. Merywood changed them on 2026-10-29 (Last-Modified 16:43 / 16:27 UTC). With the new `main.js`, Swiper sliders stopped initializing on Home/Cosmetics Products and Reviews (Reviews showed 12 duplicated slides, empty left card) on the live Preview `abdd7602`, although CI run 38864607899 (2026-10-16) recorded them initialized with 6 Reviews slides.

## What changed (build only)
- `main.css` = owner-supplied `main.txt` (177,766 B, SHA-256 `290a3199…a46c`). Served as `/assets/runtime/merywood-main.css`. Its 25 relative `url(../img|../fonts/...)` are rewritten to the same absolute Merywood theme URLs the browser resolved before (`https://merywood.com/wp-content/themes/mery-wood/assets/...`), so images keep loading and the legacy Manrope TTF stay CORS-blocked exactly as before (Manrope Variable from Google remains the only body font).
- `main.js` = `merywood/pages/index/assets/js/main.js` from the verified ZIP (11,600 B, SHA-256 `c362c416…7194`, identical on all 54 crawled pages). Served as `/assets/runtime/merywood-main.js`.
- Only the URL of `link#main-css` and `script#main-js` changes; id, position, media and load order stay as in the source. Build fails if either tag is missing or a live Merywood `main.css`/`main.js` reference remains.
- Bytes live only in the private bundle (`runtime/main.txt`, `runtime/main.js`); hashes in `source-manifest.json`.

## Caveat
These are **historical candidates** (ZIP crawl 2026-10-02 and owner `main.txt`), not proven byte-identical to the files live on 2026-10-16. Evidence they reproduce the approved behaviour: Swiper state/slide counts match the CI log of 2026-10-16; the approved Preview rendered with these two files is identical to the local build (guard below).

## Evidence (local)
- `tests/p0b1-runtime-pin.mjs` 24/24: Home, Cosmetics, Other Services × VI/EN × 390/834/1024/1440 — every visible Swiper initialized, next and prev really move, Reviews 6 slides, no live `main.css`/`main.js` request, no legacy TTF loaded, body font Manrope.
- Guard `tests/p0a-custom-pass-guard.mjs` with `BIOA_REF_PIN_DIR`: local build vs Preview `abdd7602` served the same pinned files — **64/64 PASS** (final guard version, 4 shards).
- P0A gates on the integrated build: fidelity 104/104 (allowlist adds the 2 runtime tag URLs), determinism 2 clean builds identical (140 files), `test:responsive` 15/15, 13 dist tests PASS.
- Before/after screenshots: `D:\BIOA_WORKSPACE\QA_EVIDENCE\p0b1-before-after\` (before = Preview with today's live runtime, after = P0B1 build).

## Visible change for OWNER review
Products and Reviews sliders work again (Reviews 6 dots instead of 12, both side cards visible). Anything else that differs from the owner-approved look must be reported as a FAIL.
