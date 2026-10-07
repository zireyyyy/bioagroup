# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-08

## Current runtime state

Production-confirmed baseline:
`c6be5735e49510c6e5c340f258dea5b4f85d2a55`
— **MOBILE-MENU-CONTRAST1 — OWNER PASS**

Current candidate:
**MOBILE-HEADER-SOURCE1 — Merywood Mobile Header Geometry Parity**
— **PENDING OWNER TEST**

## Current block

Owner confirmed the Mobile bottom bar removal is okay.

New issue:
- Mobile menu button is clear at page top;
- after scrolling, sticky Header becomes a light surface and the cream menu button visually blends into it.

Candidate changes only the scrolled visual state:
- button background -> very-light Bio-A green;
- hamburger -> Bio-A green;
- subtle green inset border;
- dimensions/position/menu runtime unchanged.

## PASS / FROZEN

- Mobile bottom bar is PAUSED / disabled.
- Chat/Cookie restored to original positions.
- Cookie outside-dismiss and confirmed-choice gear behavior.
- Mobile Menu first-tap + outside/scroll/Escape close.
- Mobile Header down-hide/up-show behavior.
- Blog PATCH-G8.
- Contacts CONTACT-C1.
- shared Footer/Chat/Zalo.
- accepted Home sections.

## Next test

Mobile:
1. menu button clear at top;
2. scroll down then up;
3. scrolled Header menu icon remains clearly visible;
4. first tap still opens menu;
5. menu closes outside/scroll/Escape;
6. no bottom bar reappears.

If PASS:
lock MOBILE-MENU-CONTRAST1 and continue remaining small fixes -> FULL Tablet -> cleanup -> deploy.


### MOBILE-HEADER-SOURCE1
Mobile Header outer geometry now follows the earlier Merywood-source-preserving dimensions:
- Header/wrapper 62px;
- logo shell 46×48px;
- Bio-A logo 38×44px;
- CTA 40px height / 15px side padding / radius 14 / 13px;
- clean menu trigger 40×40px / radius 14;
- burger visual uses 2 bars like Merywood source markup.

Protected:
- inner Mobile Menu content/layout;
- first-tap/outside/scroll/Escape runtime;
- Header down-hide/up-show;
- scrolled green menu-button state;
- Cookie/Chat;
- bottom bar remains PAUSED;
- Desktop/Tablet.
