# BIO-A GROUP — START HERE — 2026-10-09

Repository `zireyyyy/bioagroup`, owner-selected baseline main before patch `c7d29cbdbd901849fc0e664222059873fa21bfef`; obtain actual new main SHA from GitHub after patch. **New candidate: BIOA-404-VI-EN1 — PENDING CLOUDFLARE BUILD + OWNER RUNTIME TEST.**

## Owner's fixed four-phase plan
1. Remaining small owner-requested patches, each tested then frozen. Current isolated 404 patch is authorized because artwork was supplied. `TURNSTILE-RUNTIME-NEGATIVE-QA1` live negative test remains PENDING.
2. FULL TABLET PASS across all site routes and components, Tablet independent of Desktop/Mobile.
3. Cleanup/hardening: dead/duplicate CSS/JS, Merywood residue, unused route/helper/assets, VI/EN, SEO/canonical/link/overflow and offline-repeatable Merywood baseline.
4. Final clean dist/ package, domain bioagroup.vn, sitemap/robots, verify 404 and public launch only with owner explicit approval. Sitemap generation and full SEO release remain pending.

## Current 404 candidate
- New `bioa-404.mjs` creates **separate VI and EN HTML error pages**; `build.mjs` emits root `dist/404.html` and `dist/en/404.html` for Cloudflare Pages nearest 404 mechanism. User's exact 404 artwork composition encoded as optimized full-res `assets/bioa-404-art.avif`. One back-home CTA reuses Merywood-derived `btn`/`btn__icon`/`btn__text` convention. Code/handoff `docs/404_PAGE_CONTRACT.md`.
- Copy: VI title 'Không tìm thấy trang' / EN 'Page not found', descriptions and CTA link root `/` or `/en/`. No global language switch hack; `/en/...` 404 is served by `en/404.html`.
- SEO: noindex/nofollow/noarchive on both 404 variants; expected HTTP 404 for missing routes, not a 200 route or redirect. Cloudflare confirmation PENDING OWNER TEST.

## Production PASS/FROZEN (DO NOT CHANGE)
- Cloudflare Pages maintenance and 14-day private viewer with official Bio-A logo; `BIOA_SITE_MODE=maintenance` or unset, Pages Runtime `Fail closed`; all anonymous pages/asset/API requests remain gated. Do not publish.
- Existing Home/shared Header/Menu/Footer/Cookie/Chat, Blog, Contacts and responsive owner-approved behavior, VI/EN, lead popup auto-close, Cloudflare D1 + Google Sheets CRM short IDs/H/I/K, Resend actual corporate & forwarded email PASS.
- Previously live Turnstile config `enabled:true,misconfigured:false`; mock negative tests ready `npm run test:turnstile` but **one production negative test remains PENDING**. Do not touch lead API.

## Next test / rollback
- Cloudflare deploy new candidate; authenticated owner test `/khong-ton-tai-404-qa/` & `/en/non-existent-404-qa/` and response HTTP 404, localized CTA and artwork on Desktop/Tablet/Mobile; incognito stays maintenance 503. See `docs/404_PAGE_CONTRACT.md`.
- Rollback code baseline `c7d29cbdbd901849fc0e664222059873fa21bfef` (maintenance remains protected); do not rollback to pre-maintenance insecure source.
- Reassess pending Turnstile QA and owner's remaining small patches before Phase 2. Do not mark final 404 or Phase 1 PASS without owner feedback.
