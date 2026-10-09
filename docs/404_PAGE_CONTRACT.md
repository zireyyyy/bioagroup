# BIO-A GROUP — 404 PAGE CONTRACT

**Patch: BIOA-404-VI-EN1 | PENDING owner runtime test.**

## Source / files
- Owner supplied artwork: original `404 BIO-A.png` (1808×870). The GitHub asset `assets/bioa-404-art.avif` is an optimized 1808×870 AVIF retaining the same composition; byte-identical to the prepared image artifact's optimized output, verified Git blob SHA `a6e4f83b921200194133662bede0ee2103cdad98`.
- Original Merywood error-page screenshot is the *visual reference*. No unrelated shell component is recreated. CTA uses the same `btn > btn__icon + btn__text` DOM convention as existing Merywood/Bio-A controls, with scoped 404-only geometry and approved brand green. No separate third-party icons or additional CTA.
- ROUTE owner: `bioa-404.mjs`; build owner: `build.mjs`. The generated `dist/404.html` is VI. `dist/en/404.html` is EN for the `/en/...` route prefix.
- Use Cloudflare Pages' built-in **nearest 404.html lookup**. Unmatched root routes use `404.html`, unmatched `/en/...` routes use `en/404.html`, preserving **HTTP 404**, not redirect to `/404/` or returning 200.

## Locked copy
| | VI | EN |
| --- | --- | --- |
| Title | Không tìm thấy trang | Page not found |
| Description | Đường dẫn có thể đã thay đổi hoặc trang không còn tồn tại. Vui lòng quay về trang chủ để tiếp tục khám phá Bio-A Group. | The page may have moved or is no longer available. Return to the homepage to continue exploring Bio-A Group. |
| CTA | ← Về trang chủ | ← Back home |
| CTA target | `/` | `/en/` |

## SEO / security constraints
- Both 404 variants contain `meta name=robots content=noindex,nofollow,noarchive`; they are NOT canonical pages and must not appear in sitemap.
- Global Pages `functions/_middleware.js` still controls maintenance: anonymous visitors get the existing 503 page; authenticated owner can test true 404 on missing URLs. Pages `BIOA_SITE_MODE` must NOT change to public for this patch. Keep `_routes.json` include `/*`, no exclusions and `Fail closed`.
- No change to D1, Sheets, Resend, Turnstile or existing site layout. `robots.txt`/sitemap hardening remain Phase 3–4.

## Verification
- Offline: `npm run test:404` (checks VI+EN HTML, CTA markup/link, AVIF asset, noindex, build wiring).
- Deployment: Cloudflare Pages production build must succeed and serve `404.html` and `en/404.html`. While authenticated with private owner preview, visit `/khong-ton-tai-404-qa/` and `/en/non-existent-404-qa/`.
- In DevTools → Network → main Document confirm **HTTP 404** for each; language copy and CTA must match above; CTA returns `/` or `/en/`. Check image rendering and no horizontal overflow separately on Desktop, Tablet, Mobile.
- In fresh incognito without preview cookie, both URLs must show the **maintenance 503**, not the 404 (privacy lock remains). On `bioagroup.pages.dev` security must remain active.
- **Only owner** may mark Desktop/Tablet/Mobile runtime PASS; until then mark new 404 **candidate / PENDING OWNER TEST**.

## Rollback
- Previous HEAD before this isolated 404 candidate: `c7d29cbdbd901849fc0e664222059873fa21bfef`. Rolling back restores prior missing-route behavior but leaves maintenance and lead systems untouched. Do NOT use a no-gate/pre-maintenance commit for rollback.
- Turnstile negative production test is still pending separately. Complete the owner’s original four phases in order.
