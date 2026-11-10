# BIO-A — RUNTIME DEPENDENCY INVENTORY (P0B2) — 2026-11-08, updated 2026-11-10

> **2026-11-10 — P0B2-A implemented (BIOA-R12, owner directive FINAL COMPLETION §III.B).**
> - jQuery 3.7.1, Swiper 11.1.4 (js+css) and smooth-scrollbar 8.8.4 now come from the official npm packages: exact versions, `package-lock.json` integrity. WordPress 7.1.2 `hooks.min.js`/`i18n.min.js` are vendored in `vendor/wordpress-7.1.2/` with the GPL licence. All of them are served from `/assets/vendor/`.
> - SHA-256 is checked fail-closed at build (`tools/vendor-runtime.mjs`).
> - The bytes are identical to what merywood.com served. All four npm files were re-verified against the tarballs on 2026-11-10. The WP files equal core.svn.wordpress.org tags 7.1 and 7.1.2.
> - Only the URL changes; tag id, position and attributes are unchanged. Licence notices: `/assets/vendor/THIRD_PARTY_LICENSES.txt`.
> - Correction: the earlier comparison file `ss.js` was a different smooth-scrollbar build. The live file equals `smooth-scrollbar@8.8.4/dist/smooth-scrollbar.js` exactly.
> - **Still live from merywood.com (owner gate D2/D4/D9, not self-hosted):** `modal.js`, `input.js`, CF7 js/css, theme/upload images. The final inventory run with merywood.com blocked is in `D:\BIOA_WORKSPACE\_reports\completionuntime\`.

Source: `tests/runtime-dependency-inventory.mjs` (real Chrome, 10 route families × VI/EN × 1440/390, normal / merywood.com blocked / merywood.com slow). Report: `D:\BIOA_WORKSPACE\_reports\recovery\final-runtime\runtime-dependency-inventory.json`, log `final-runtime.log`. Library comparisons: `_reports\recovery\runtime-libs\`.

Already pinned and served by BIO-A (P0A/P0B1): page HTML (built from the hash-verified bundle), Merywood `main.css` and `main.js`.

## 1. Still loaded live from merywood.com
| Resource | Where | Class | Evidence when blocked | Upstream identity |
|---|---|---|---|---|
| `assets/js/jquery.js` | all pages | **REQUIRED** | `jQuery` undefined | **byte-identical to jquery@3.7.1** (MIT) |
| `assets/swiper/swiper-bundle.min.js` + `.css` | all pages | **REQUIRED** | `Swiper is not defined`; Home 0/8, Cosmetics 0/6, Dịch Vụ Khác 0/4 sliders | **byte-identical to swiper@11.1.4** (MIT) |
| `assets/smooth-scrollbar/smooth-scrollbar.js` | all pages | **REQUIRED** (scroll mechanics) | — | **byte-identical to smooth-scrollbar@8.8.4** (MIT) |
| `wp-includes/js/dist/hooks.min.js`, `i18n.min.js` | all pages | **REQUIRED** by CF7 scripts | `wp is not defined` | **byte-identical to WordPress 7.1 / 7.1.1 / 7.1.2** (GPL-2.0-or-later) |
| `assets/js/modal.js`, `assets/js/input.js` | all pages | **REQUIRED** (quote modal, inputs) | modal/input behaviour lost | Merywood theme code (proprietary) → **D2** |
| CF7 `includes/js/index.js`, `swv/js/index.js`, `css/styles.css` (`?ver=6.1.7`) | all pages | REQUIRED by the form markup | — | **NOT identical to CF7 6.1.7** on wordpress.org (live files changed; D9) |
| Images `wp-content/uploads/2025/06…2026/08/*`, theme `assets/img`, `assets/icons/{desktop,mobile}` | Home, Cosmetics, Dịch Vụ Khác, Blog detail, + 1 shared svg on all pages | **REQUIRED** (visible content) | Home 390: 11 broken images, Dịch Vụ Khác 390: 5, Blog detail: 3, others 1 | Merywood media → **D2/D4** |
| Theme fonts `Manrope-*.ttf` (old `@font-face` in `main.css`) | all pages | **UNUSED / FAILING** (CORS `ERR_FAILED`; Google Manrope variable is the font authority) | none | — |

## 2. Other third parties
| Resource | Class | Note |
|---|---|---|
| `fonts.googleapis.com`/`fonts.gstatic.com` Manrope | REQUIRED (font policy) | owner-approved |
| `cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1` | REQUIRED (phone input) | versioned CDN, not Merywood |
| `get.geojs.io/v1/ip/country.json` | OPTIONAL | phone country auto-detect; sends the visitor IP to a third party → privacy decision |
| `challenges.cloudflare.com` Turnstile | REQUIRED for leads | blocked in tests by design |
| `https://Bio-A Group.com/…` (wp-emoji, `mw-guard/v1/token`, CF7 `feedback/schema`) | **BROKEN LEFTOVERS** (invalid host, `ERR_NAME_NOT_RESOLVED`) | same on the approved Preview; `mw-guard` wraps `fetch` only for CF7 feedback URLs |

## 3. Cause of the 12 failed route-smoke loads (2026-11-08)
All 12 were Blog loads inside one time window. Reproduced deterministically:
- merywood.com answering after 65 s → `page.goto: Timeout 60000ms exceeded` (first signature);
- merywood.com failing → `wp is not defined | Swiper is not defined` (second signature).
The pinned BIO-A files were not involved. **Any slowness, block or change at merywood.com degrades every BIO-A page** (the 2026-10-29 `main.js` change already broke the sliders once).

## 4. Pinning proposal (needs owner approval before implementation)
- **P0B2-A (open-source, provenance proven):** serve jQuery 3.7.1, Swiper 11.1.4 (js+css), smooth-scrollbar 8.8.4 from the official npm packages (package-lock + integrity hashes, copied into `dist/assets/vendor/` at build), and WordPress 7.1 `hooks`/`i18n` from the WordPress release (GPL-2.0-or-later). Bytes are identical to what loads today → zero behaviour change; only the URL changes. Licences: MIT / GPL; no Merywood redistribution. Gate: **D2-OSS** (owner confirms self-hosting OSS is acceptable).
- **P0B2-B (Merywood-owned):** `modal.js`, `input.js`, theme/upload images → only after **D2** (written right to host) and **D4** (self-host decision), or replacement by BIO-A-owned images/code.
- **P0B2-C (CF7):** decide **D9**: keep live CF7 assets, pin the exact current Merywood files (needs D2), or replace with upstream CF7 6.1.7 (behaviour change, needs QA).
- Remove the unused Manrope `.ttf` references and broken `Bio-A Group.com` leftovers only in a separate, scope-gated cleanup patch (not done: changes source CSS/scripts of PASS surfaces).

## 5. Merywood resources without proven rights — classification and lawful-replacement priority (owner 2026-11-10, BIOA-R24)
Counted on the final dist `dist-final-r24`: **88 distinct merywood.com URLs**. The split is 77 uploads (40 photos, 37 svg), 8 theme files and 3 CF7 files. On top of those, `main.css` references the unused Manrope `.ttf` files. Nothing is self-hosted or pushed without D2. The table orders **lawful replacements first**; none of them is implemented without the owner's go-ahead per row.

| Priority | Resource | Class | Lawful replacement (preferred) | Fallback |
|---|---|---|---|---|
| 1 | `modal.js`, `input.js` (theme JS, synchronous before `main.js`: the page hangs if merywood.com is slow) | Merywood proprietary code, **REQUIRED** | BIO-A-owned re-implementation of the same quote-modal open/close and input behaviour, inside the existing modal markup, with full modal QA on Desktop/Tablet/Mobile × VI/EN | written permission + self-host (D2/D4) |
| 2 | CF7 `index.js`, `swv/index.js`, `styles.css` (`?ver=6.1.7`, differ from upstream) | third-party plugin as modified by Merywood | upstream Contact Form 7 6.1.7 from wordpress.org (GPL-2.0-or-later), self-hosted like R12. The form submit already goes to BIO-A `/api/lead`, so a behaviour-diff QA is needed. This also removes the T2 `Bio-A Group.com` schema fetch | keep live (risk documented, D9) |
| 3 | 40 photos (`wp-content/uploads/…webp/jpg`: Roadmap, How It Works, products, formats, We Produce, Blog) | Merywood media, visible content | BIO-A-owned photos in the same aspect ratios (owner supplies or commissions). These are content-only swaps inside the existing components and need no CSS change | written permission + self-host |
| 4 | 37 svg icons + 6 theme social icons (`assets/icons/{desktop,mobile}`) + the cookie icon `2025/09/cookie.svg` | Merywood artwork | BIO-A-owned or openly licensed icons (e.g. MIT/ISC icon sets) at the same size and colour slot. Neutral UI icons are kept until the owner decides, per AGENTS.md §3 | written permission |
| 5 | Build input bundle (Merywood HTML/`main.css`/`main.js`, `source-manifest.json`) | Merywood source, core of the layout | long term: BIO-A-owned rewrite of each component. Not in this closure (no redesign) | written permission (D2), **required before any public Preview build** |
| — | Old Manrope `.ttf` `@font-face` in `main.css` | unused, failing CORS | remove in a scope-gated cleanup (Google Manrope variable is the font authority) | — |
