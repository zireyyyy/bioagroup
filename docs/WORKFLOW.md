# BIO-A GROUP — MANDATORY ENGINEERING WORKFLOW

This document defines the required patch workflow for the BIO-A Group website.
AGENTS.md contains permanent rules. FULL_HANDOFF.md contains current state.

## 1. Mandatory sequence

INSPECT
→ REPRODUCE
→ ROOT CAUSE
→ PATCH CONTRACT
→ SOURCE COMPARE
→ MINIMAL PATCH
→ BUILD
→ REGRESSION CHECK
→ RUNTIME TEST
→ PASS / FAIL
→ COMMIT
→ HANDOFF

Do not skip directly from request to implementation.

## 2. INSPECT

Before changing anything:
1. confirm the owner-declared authoritative baseline from FULL_HANDOFF.md and the current request;
2. inspect repository state at that exact baseline;
3. read AGENTS.md, FULL_HANDOFF.md, this file and docs/SOURCE_MAP.md;
4. identify the exact requested component/behavior;
5. identify locked/protected surfaces around it.

If main is newer than the authoritative baseline, newer code is not automatically usable.

## 3. REPRODUCE / defect definition

Define three things before a fix:

Current behavior:
- what is wrong now.

Expected behavior:
- what should happen.

Protected behavior:
- what must remain unchanged.

Desktop and mobile are independent regression surfaces.

If the issue cannot be directly reproduced in the agent environment, owner screenshots/runtime feedback are evidence. Do not invent a reproduction result.

## 4. ROOT CAUSE

No fix before root-cause investigation.

Use evidence:
- exact DOM;
- exact selector;
- exact source rule;
- computed/declared geometry;
- exact event handler;
- source-vs-BIO-A behavior;
- owner runtime feedback.

If several causes are possible:
1. state the strongest hypothesis;
2. test it;
3. change one variable at a time;
4. discard disproved hypotheses.

Do not stack speculative fixes.

## 5. REQUEST-TO-SOURCE CONTRACT

Before implementation the agent must be able to answer:

Owner request:
- what exactly is requested?

Target component:
- which exact component owns the behavior?

Merywood reference:
- where is the correct source implementation?

BIO-A counterpart:
- where is the current implementation?

Difference:
- what relevant difference exists?

Root cause:
- which difference causes the defect?

Minimal correction:
- what is the smallest necessary change?

Protected components:
- what must remain untouched?

If these are not known, implementation must not begin.

## 6. SOURCE COMPARE

Use docs/SOURCE_MAP.md first.

If a mapping exists:
- inspect only the mapped source range plus enough surrounding context to understand it.

If no mapping exists:
- search Merywood narrowly using evidence from the target;
- inspect only the necessary component;
- add the confirmed mapping to docs/SOURCE_MAP.md after locating it.

Do not reread the complete source for every request.

Allowed expansion:
small scope → evidence → expand only when necessary

## 7. PATCH CONTRACT

Write a small patch contract before editing:

Target:
- one exact behavior.

Root cause:
- verified reason.

Files expected to change:
- smallest possible set.

Protected surfaces:
- all locked/unrelated components.

Acceptance criteria:
- observable conditions required for owner PASS.

If implementation reveals a larger scope, stop and reassess before broadening it.

## 8. MINIMAL PATCH

Implementation priority:
1. exact source behavior;
2. source parity restoration;
3. existing local rule modification;
4. narrow override;
5. new architecture only when unavoidable.

Do not:
- rewrite a component for a small defect;
- add broad CSS;
- rename unrelated classes;
- reformat unrelated code;
- refactor nearby code;
- introduce dependencies without necessity;
- fix defects the owner did not request.

## 9. PATCH CHAIN

For several related changes in one component, split into independently verifiable patches.

Example:
CHAT-A — shell radius
CHAT-B — composer layout
CHAT-C — open/close animation

Unrelated components must not be combined into one patch.

Valid group:
CHAT-A + CHAT-B + CHAT-C

Invalid group:
CHAT + HERO + FOOTER

Each patch must leave a clean rollback point.

## 10. FAILED PATCH RULE

If a patch FAILS:
1. stop the patch chain;
2. inspect actual result vs expected result;
3. compare again with the exact Merywood reference;
4. identify the failed assumption;
5. correct or revert the failed patch;
6. verify;
7. only then continue.

Never:
A FAIL → B → C → D → repair everything later

## 11. BUILD

Project requirement:
- Node.js >= 20
- npm run build
- output: dist

Run npm run build after implementation when applicable.

Report separately:
- CODE REVIEW PASS
- BUILD PASS
- AUTOMATED TEST PASS

Build success does not prove runtime success.

## 12. REGRESSION CHECK

Before commit review:
- exact changed files;
- exact diff;
- neighboring locked surfaces;
- desktop/mobile implications;
- selector scope;
- interaction scope;
- accidental source rewrites;
- debug code;
- secrets;
- generated/cache junk.

For UI patches inspect relevant:
- desktop;
- mobile;
- hover;
- click;
- open/close;
- animation;
- responsive behavior;
- overflow;
- text wrapping;
- image/logo proportions.

## 13. RUNTIME TEST AND OWNER AUTHORITY

When the agent cannot directly verify runtime:
CANDIDATE — NEEDS RUNTIME TEST
or
BUILD PASS — NEEDS OWNER TEST

Only the owner can promote a visual/runtime patch to:
PASS — OWNER CONFIRMED

Do not record an unconfirmed candidate as PASS in FULL_HANDOFF.md.

Owner screenshots and feedback apply to the current patch. Analyze only the remaining mismatch and do not reopen unrelated components.

## 14. COMMIT

Commit rules:
- one purpose;
- focused;
- descriptive;
- reversible;
- no unrelated changes.

Before pushing:
- final diff reviewed;
- applicable build/test performed;
- protected surfaces checked.

Return exact pushed SHA.

## 15. HANDOFF

After owner-confirmed PASS:
1. update FULL_HANDOFF.md;
2. record accepted commit SHA;
3. mark accepted behavior PASS/LOCKED;
4. record rollback checkpoint;
5. record rejected candidates where useful;
6. record remaining work;
7. update SOURCE_MAP only for newly investigated components.

Before ending an important session, ensure another AI can continue from repository files alone.

## 16. Required response format for implementation work

Before implementation:

## Diagnosis
- current issue
- expected behavior
- root cause/evidence

## Source reference
- Merywood location
- BIO-A counterpart
- relevant difference

## Patch scope
- target
- expected files
- protected components

## Plan
- smallest intended change
- verification method

After implementation:

## Changed
- exact meaningful changes

## Verification
- build/test result

## Regression check
- protected surfaces checked

## Commit
- exact SHA if pushed

## Status

Use one:
- CANDIDATE — NEEDS RUNTIME TEST
- BUILD PASS — NEEDS OWNER TEST
- PASS — OWNER CONFIRMED
- FAIL — ROOT CAUSE REASSESSMENT REQUIRED
