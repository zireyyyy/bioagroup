# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-07

## Current runtime state

Last owner-confirmed runtime baseline before the current candidate:

`76bab2b472b252f804c6022147209631cb691c81`
— SHARED-MOBILE1C — **PASS**

Current candidate:
**MOBILE-NAV-ICON1 — owner-supplied bottom-nav artwork**
— **PENDING OWNER TEST**

## Exact current block

Only the five Mobile bottom-nav artworks changed:
- Trang Chủ — house;
- Gia Công — factory + cosmetic bottle;
- Dịch Vụ — lab flask + leaf;
- Blog — document;
- Liên Hệ — support/headset person.

The supplied silhouettes were converted to crisp inline SVG paths for runtime use.
No bottom-bar layout, route, label, scroll, menu, Cookie or Chat logic was changed.

Expected state treatment remains:
- inactive: very-light Bio-A green surface + green icon;
- active: Bio-A green surface + cream icon.

## PASS / FROZEN

- Blog PATCH-G8 — PASS / LOCKED.
- Contacts CONTACT-C1 — PASS / LOCKED.
- Cookie outside-dismiss + confirmed-choice gear behavior.
- Mobile Menu first-tap.
- Mobile bottom-bar full hide/show behavior.
- Chat/Cookie bottom-bar clearance.
- shared Header/Footer/Chat/Zalo/Mobile Menu.
- accepted Home sections unless explicitly reopened.

## PARTIAL — not rollback targets

- `e331acd33910faceed318928cc2b9eb557e4b2b1` — SHARED-MOBILE1.
- `8fb80a78b2c60e1e640851ca18c573ef22123af8` — SHARED-MOBILE1A.
- `26f2fdc665c014c17093b6b36f8469c5ea2c1265` — SHARED-MOBILE1B.

## Rollback

If MOBILE-NAV-ICON1 fails visually/runtime:
rollback runtime to `76bab2b472b252f804c6022147209631cb691c81`.

## Real Bio-A ownership

Merywood owner source = visual/runtime source-of-truth.
Legacy Bio-A ZIP/database = content source only where documented.

Shared:
- `bioa-transform.mjs`
- shared portion of `bioa-home-refine.mjs`

Route owners:
- Home — `bioa-home-refine.mjs`
- About — `bioa-about-refine.mjs`
- Gia Công Mỹ Phẩm — `bioa-cosmetics-refine.mjs`
- Dịch Vụ Khác — `bioa-services-refine.mjs`
- Blog — `bioa-blog-refine.mjs`
- Contacts — `bioa-contacts-refine.mjs`

Build: `build.mjs`.

Do not import Woo/Suite/Child/PMX Shell/Product Card or other project-specific architecture into Bio-A.

## Next test

Test Mobile:
1. all 5 icon shapes;
2. active/inactive color state;
3. optical centering;
4. labels remain clear;
5. scroll down fully hides bar;
6. scroll up restores;
7. first-tap Mobile Menu still works;
8. Chat/Cookie still clear the bar.

If PASS:
- lock MOBILE-NAV-ICON1;
- finish remaining small fixes;
- FULL Tablet pass;
- cleanup;
- production package/domain deploy.
