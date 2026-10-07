# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

Read START_HERE.md, CURRENT STATE SNAPSHOT in FULL_HANDOFF.md, AGENTS.md, docs/WORKFLOW.md, docs/SOURCE_MAP.md and the exact owner file before editing.

## Current state

Production-confirmed baseline:
`c6be5735e49510c6e5c340f258dea5b4f85d2a55` — MOBILE-MENU-CONTRAST1 — OWNER PASS.

Current candidate:
**MOBILE-HEADER-SOURCE1 — PENDING OWNER TEST**.

Only current change:
when Mobile Header is scrolled/light, the menu button gets a very-light Bio-A green surface + Bio-A green hamburger + subtle border so it no longer blends into the Header.

Do not alter:
- menu dimensions/position;
- menu runtime;
- Mobile Header hide/show;
- Cookie;
- Chat;
- paused bottom bar;
- page content.

## PASS / FROZEN

Mobile bottom bar paused; Chat/Cookie original positions; Cookie logic; Mobile Menu first-tap/outside/scroll/Escape; Mobile Header directional behavior; Blog; Contacts; shared Footer/Chat/Zalo; accepted Home sections.

## Next test

Top state -> scroll -> scrolled state contrast -> first-tap menu -> outside/scroll close.

After PASS:
remaining small fixes -> FULL Tablet -> cleanup -> production package -> domain deploy.

Current candidate changes only Mobile Header outer geometry to match Merywood source proportions. Inner Mobile Menu stays locked and untouched.
