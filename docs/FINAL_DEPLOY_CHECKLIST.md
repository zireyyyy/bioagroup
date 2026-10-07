# BIO-A GROUP — FINAL DEPLOY CHECKLIST

Status: **ACTIVE CLOSEOUT PLAN**
Updated: 2026-10-07

Mandatory sequence:
1. remaining small owner-requested patches;
2. FULL TABLET PASS;
3. cleanup / hardening;
4. production package;
5. custom-domain deploy;
6. final smoke test.

## Phase 1 — remaining small patches

Current next candidate:
- owner-supplied Mobile bottom-nav icon artwork;
- artwork-only; no layout/routing/runtime redesign.

Exit:
- owner confirms final small patches PASS.

## Phase 2 — FULL TABLET PASS

Tablet is independent from Desktop and Mobile.

Verify at:
- large landscape tablet;
- standard tablet;
- portrait/small tablet;
- intermediate widths around project breakpoints.

Routes/surfaces:
- Header;
- Footer;
- Cookie;
- Chat;
- Mobile/Tablet navigation behavior as applicable;
- Home;
- About;
- Gia Công Mỹ Phẩm;
- Dịch Vụ Khác;
- Blog index + pagination;
- Blog article;
- Contacts + Map + FAQ;
- policy routes retained for production;
- VI + EN.

Check:
- overflow;
- column count/stacking;
- type wrapping;
- image aspect ratio;
- card heights;
- sticky/scroll behavior;
- menu interactions;
- CTA alignment;
- footer grid;
- chat/cookie overlap;
- Blog TOC/cards/table;
- Contact map/FAQ.

Do not use one global Tablet override for unrelated route defects.

Exit:
- owner confirms Tablet PASS.

## Phase 3 — cleanup / hardening

Only after Tablet PASS:
- remove dead CSS;
- remove rejected patch remnants;
- remove duplicate superseded rules;
- remove unused helpers/routes only when proven unused;
- remove stale Merywood identity/contact payload in production output;
- remove debug/temp code;
- audit assets before deleting.

Validate:
- VI/EN route parity;
- canonical/meta;
- internal links;
- external target/rel;
- key alt text;
- no horizontal overflow;
- no mixed Merywood branding;
- no unexpected duplicate shared component.

Do not refactor for style preference.

Exit:
- build PASS;
- cleanup diff does not change accepted visuals/runtime.

## Phase 4 — production package

Requirements:
- Node.js >=20;
- `npm run build`;
- output `dist/`;
- canonical origin `https://bioagroup.vn`;
- verify favicon/logo/OG;
- verify Google Maps;
- verify contact links;
- verify sitemap/robots if present;
- verify 404/fallback behavior;
- remove local/dev URLs;
- package only deploy-required files.

## Phase 5 — custom-domain / Cloudflare

Use Cloudflare/hosting only for deployment-owned concerns.

Record any direct dashboard configuration in `FULL_HANDOFF.md`.
Backport repo config where possible.

## Phase 6 — final smoke

At custom domain:
- Home VI/EN;
- About;
- Gia Công Mỹ Phẩm;
- Dịch Vụ Khác;
- Blog page 1 + later pagination page;
- one Blog article;
- Contacts + Map + FAQ;
- Header/Footer/Cookie/Chat/Zalo;
- Desktop;
- Tablet;
- Mobile;
- HTTPS;
- canonical/domain links.

Final status only after owner verification:

**PRODUCTION DEPLOY PASS — OWNER CONFIRMED**
