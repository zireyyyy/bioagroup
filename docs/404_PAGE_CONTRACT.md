# Bio-A 404 — current owner contract (2026-10-09)

Status: `BIOA-404-SOURCE-PARITY2` candidate. **Image-quality part NOT PASS** until asset replaced in repo and visually accepted.

## Latest owner authority
- **Same original Merywood 404 copy for both VI and EN paths:** `Ooops!`, `We can’t find the page you’re looking for`, CTA `← Back home` to `/`. No 404 VI/EN copy-branching.
- CTA must reuse Merywood/Bio-A anchor `btn > btn__icon + btn__text` structure. Scoped styling matched to screenshot: approx 164×54px, 14px corners, muted green; original source CSS **not directly verified** — exact code parity pending source artifact availability.
- Owner's original artwork `404 BIO-A.png` is 1808×870 and 2.4 MB. First committed `assets/bioa-404-art.avif` is only 18,520 B and visually overcompressed. The **higher-quality image has not been pushed to GitHub**, regardless of removal of white gradient. Reupload exact PNG or high-quality 98 WebP at native resolution, update HTML image reference, tests, docs, then owner review.
- No extra gradient/opacities/blur layers on background.
- Maintain `dist/404.html` and `dist/en/404.html` for nearest fallback + true HTTP 404; both texts identical. HTTP 404 is not a redirect. `noindex,nofollow,noarchive`; never include in sitemap.
- Keep `functions/_middleware.js` and `BIOA_SITE_MODE=maintenance` unchanged; guest gets 503, signed 14-day owner preview can see 404. Pages Fail closed unchanged. Desktop/Tablet/Mobile independently verify after binary upload.
- `npm run test:404` checks contract and wiring. Runtime status must remain PENDING until owner tests; `npm run build` uses live external Merywood fetches and needs normal CI/network.
