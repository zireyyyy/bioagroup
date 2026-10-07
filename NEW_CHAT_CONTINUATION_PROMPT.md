# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

Read START_HERE.md, CURRENT STATE SNAPSHOT in FULL_HANDOFF.md, AGENTS.md, docs/WORKFLOW.md, docs/SOURCE_MAP.md and exact owner code before editing.

## Current state

Production-confirmed runtime:
`65152e5fad8799fea36bcf3e03c9a9acf7f600ce`
— MOBILE-HEADER-SOURCE1 — OWNER PASS.

Current candidate:
**CONSULT-POPUP-COLOR1 — PENDING OWNER TEST**.

Only candidate change:
consultation modal background uses Bio-A primary green.

Do not change fields/capture logic until owner approves form simplification.

## Proposed next block

LEAD-FORM-SHORT1:
- Họ tên + SĐT/Zalo required;
- Loại sản phẩm optional quick-select;
- privacy consent remains;
- Email / Số lượng / Request removed from first-step UI;
- capture logic must be updated in the same patch.

Current lead capture endpoint is Bio-A admin-ajax, not Merywood.

## Protected

Mobile Header PASS, inner Mobile Menu, Header scroll logic, Cookie, Chat, paused bottom bar, Blog, Contacts, accepted Home sections.

After popup/form small fixes:
FULL Tablet -> cleanup -> production package -> domain deploy.
