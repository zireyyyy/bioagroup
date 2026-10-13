# Merywood source provenance — 2026-10-13
Owner-supplied Library inputs retrieved and inspected locally on 2026-10-13 (NOT committed into public repo).

| File | Size bytes | SHA-256 |
|---|---:|---|
| `merywood-export 210-3(1).zip` | 184107032 | `9904a5d6fa59afb551957809e82b100fc5c3923f8c434fe6aa4de2ed43967c41` |
| `BIOA-Website.zip` | 185550789 | `eb4b2270889a6e982bfd399470eec745c92607699b729f2824f9bda9a832bc36` |
| `main.txt` original raw CRLF file | 177766 | `290a3199ee9f1d74419e5effd0b4617342e3c15f3f721b01e510e9759b67a46c` |

## Exact source HTML comparison
Normalized archive entries `merywood/pages/.../index.html` versus `pages\...\index.html`. **55/55 page names align**; **54 HTML files are byte-identical**. The sole exception is `pages/index/index.html`: Merywood ZIP includes `<base href="https://merywood.com/">` and BIOA-Website ZIP removes it; no other text diff was observed in that page's unified diff. Merywood Home file SHA-256: `237fbf9c8158b32c980c515aab0040e08502677030c2612d0322c01b59377b7d`; BIOA-Website Home: `8cb4c875811712ee528e6502f2e2028acf3ad8be7b0d8862d6d13e7711f62d53`.

`main.txt` decodes to 166333 characters / 11358 lines. Source media rules include `max-width:768px`, `max-width:560px`, `min-width:769px` and `min-width:769px,max-width:1920px` (plus other queries); there are 12 `@media` at-rule occurrences.

**Important version caveat:** 55 source HTML pages contain **53 distinct `main.css?ver=...` link URLs**, e.g. Home `ver=1790811557`, About `ver=1790818581`, Cosmetics `ver=1790811761`. The corresponding external CSS file is not in either ZIP. The standalone owner `main.txt` was not independently verified as byte-identical to each external URL. We cannot assert perfect stylesheet-source parity without further evidence. No third-party CSS/image archive is committed to the public repository.

## New read-only build-output instrumentation
- `tools/audit-generated-bioa.mjs`: reads `dist` after build and records routes, exact local asset references from generated HTML/CSS, missing and unreferenced candidates, inline CSS style-block counts, About 01–06 icon presence.
- `tools/audit-browser-bioa.mjs`: read-only local browser computed geometry, typography, image natural dimensions, selected matching rules from BIO-A inline style owners and external stylesheet access status across VI/EN Home, About, Cosmetics, Services, Blog, Contact at 390/768/769/834/1024/1180/1440. No clicks/form sends/personal data collected.
- CI uploads JSON evidence artifact when available. These scripts do **not** touch `dist/` pages, change BIO-A rendering or prove live Cloudflare visual PASS. Build continues fetching remote live Merywood; only a future approved source pin will make builds reproducible.

**Frozen:** `main` `c320f28`; all owner-confirmed PASS; 404 PNG, D1/Sheets/Resend/Turnstile, signed maintenance/noindex and Sanity future-only. No runtime patch authorized or performed here.
