# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-08

## Current runtime state

Last owner-confirmed runtime baseline before the current candidate:
`76bab2b472b252f804c6022147209631cb691c81` — SHARED-MOBILE1C — **PASS**

Current candidate:
**MOBILE-NAV-PAUSE1 — temporary removal of Mobile bottom bar**
— **PENDING OWNER TEST**

## Current decision

Owner has postponed the Mobile bottom-navigation feature.

This candidate:
- removes the Mobile bottom bar from all routes;
- removes its body safe-area padding and all Chat/Cookie offsets created for that bar;
- therefore Chat returns to its existing lower-right Mobile position and Cookie returns to source positioning;
- keeps Mobile Header scroll behavior:
  - down -> hide;
  - up -> show;
  - near top -> show;
  - Mobile Menu open -> force Header visible.

The owner-supplied 5-icon set is future enhancement only.

## PASS / FROZEN

- Cookie outside-dismiss without saving.
- Cookie gear remains while undecided and hides after confirmed decision.
- Mobile Menu first tap + outside/scroll/Escape close.
- Mobile Header directional hide/show.
- Blog PATCH-G8.
- Contacts CONTACT-C1.
- shared Footer/Chat/Zalo.
- accepted Home sections.

## Bottom-nav history

Not current UI targets:
- e331acd... — PARTIAL
- 8fb80a7... — PARTIAL
- 26f2fdc... — PARTIAL
- 1a9f819... — icon candidate, NOT PROMOTED / superseded by removal

Do not re-enable bottom navigation unless owner explicitly requests it.

## Real Bio-A ownership

Merywood source = visual/runtime source-of-truth.
Legacy Bio-A source = content source where documented.

Shared:
- bioa-transform.mjs
- shared layer of bioa-home-refine.mjs

Route owners:
Home / About / Gia Công Mỹ Phẩm / Dịch Vụ Khác / Blog / Contacts refine modules.

Build:
build.mjs

## Next test

Mobile:
1. no bottom bar;
2. no extra bottom padding;
3. Chat back at lower-right source position;
4. Cookie gear/popup back at source position when undecided;
5. confirmed Cookie choice still hides gear;
6. Header down-hide / up-show;
7. Mobile Menu first tap;
8. no regression to page content.

After PASS:
remaining small fixes -> FULL Tablet pass -> cleanup -> production package/domain deploy.
