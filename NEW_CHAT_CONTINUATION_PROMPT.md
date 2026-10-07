# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

Read START_HERE.md, CURRENT STATE SNAPSHOT in FULL_HANDOFF.md, AGENTS.md, docs/WORKFLOW.md, docs/SOURCE_MAP.md and the exact owner file before editing.

## Current runtime state

Last owner-confirmed runtime baseline before current candidate:
`76bab2b472b252f804c6022147209631cb691c81` — SHARED-MOBILE1C — PASS.

Current candidate:
**MOBILE-NAV-PAUSE1 — PENDING OWNER TEST**.

Owner temporarily removed Mobile bottom navigation and will revisit it later.

Must remain:
- no bottom bar on any route;
- Chat/Cookie restored to pre-bottom-bar positions;
- Cookie outside-dismiss + confirmed-choice gear logic;
- Mobile Menu first-tap + outside/scroll/Escape close;
- Mobile Header scroll-down hide / scroll-up show.

The five-icon set is future work only. Do not re-enable bottom navigation automatically.

## PASS / FROZEN

Blog PATCH-G8.
Contacts CONTACT-C1.
Cookie logic.
Mobile Menu logic.
Mobile Header directional behavior.
shared Footer/Chat/Zalo.
accepted Home sections.

## Superseded bottom-nav work

e331acd... PARTIAL
8fb80a7... PARTIAL
26f2fdc... PARTIAL
1a9f819... NOT PROMOTED / superseded

## Bio-A architecture only

Merywood = visual/runtime source-of-truth.
Legacy Bio-A source = content source where documented.

Shared owners:
bioa-transform.mjs + shared bioa-home-refine.mjs.

Route owners:
Home / About / Gia Công Mỹ Phẩm / Dịch Vụ Khác / Blog / Contacts.

Build:
build.mjs.

Do not import architecture concepts from other projects.

## Next

Owner tests MOBILE-NAV-PAUSE1.
If PASS: remaining small fixes -> FULL Tablet -> cleanup -> production package -> domain deploy.
