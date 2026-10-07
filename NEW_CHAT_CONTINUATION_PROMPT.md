# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

Read first:
1. START_HERE.md
2. CURRENT STATE SNAPSHOT at top of FULL_HANDOFF.md
3. AGENTS.md
4. docs/WORKFLOW.md
5. docs/SOURCE_MAP.md
6. exact route/component owner file
7. Blog contract only for Blog
8. final deploy checklist only during closeout/deploy

## Current runtime state

Production-confirmed baseline before current candidate:
`76bab2b472b252f804c6022147209631cb691c81`
— SHARED-MOBILE1C — PASS.

Current candidate:
**MOBILE-NAV-ICON1 — PENDING OWNER TEST**.

Exact current change:
only five Mobile bottom-nav artworks were replaced using the owner-supplied shapes:
Trang Chủ / Gia Công / Dịch Vụ / Blog / Liên Hệ.

Do not modify bottom-bar layout, routes, labels, scroll behavior, first-tap menu, Cookie or Chat while owner tests this candidate.

## PASS / FROZEN

Blog PATCH-G8, Contacts CONTACT-C1, shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu, Mobile first-tap behavior, Mobile full-hide/show behavior, Chat/Cookie clearance, accepted Home sections.

## PARTIAL / NOT ROLLBACK

e331acd... SHARED-MOBILE1
8fb80a7... SHARED-MOBILE1A
26f2fdc... SHARED-MOBILE1B

Rollback if current candidate fails:
`76bab2b472b252f804c6022147209631cb691c81`.

## Bio-A architecture only

Merywood source = visual/runtime source-of-truth.
Legacy Bio-A source = content source where documented.

Shared owners:
`bioa-transform.mjs`, shared layer of `bioa-home-refine.mjs`.

Route owners:
Home / About / Gia Công Mỹ Phẩm / Dịch Vụ Khác / Blog / Contacts dedicated refine modules.

Build owner:
`build.mjs`.

Do not introduce architecture terminology from the PMX Shop project.

## Workflow

Read exact block -> identify root cause -> smallest patch -> protect PASS areas -> update handoff only when state/behavior changes -> commit -> push -> report SHA/status.

Home remains section-by-section.
Desktop / Tablet / Mobile are independent regression surfaces.

## Next test

Owner tests MOBILE-NAV-ICON1 on Mobile for:
icon fidelity, active/inactive state, centering, text clarity, hide/show, first-tap menu, Chat/Cookie clearance.

After PASS:
remaining small fixes -> FULL Tablet pass -> cleanup -> production package -> domain deploy.
