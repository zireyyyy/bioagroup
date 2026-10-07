# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-08

## Current runtime state

Production-confirmed baseline:
`3dd614d873ac311485f0f362a689bbe5c8233ce2`
— **MOBILE-NAV-PAUSE1 — OWNER PASS**

Current candidate:
**MOBILE-MENU-CONTRAST1 — scrolled-state menu contrast**
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
