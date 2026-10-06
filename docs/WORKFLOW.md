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


## 1A. ACTIVE PROJECT EXECUTION MODE

For an ongoing BIO-A project conversation, a sufficiently specific code/UI/runtime change request is authorization to execute the repository workflow through implementation and push.

Do not replace execution with any of the following unless the owner explicitly asks for it:
- explanation-only response;
- implementation plan only;
- prompt for Claude Code / Codex / Cursor / another code AI;
- image generation or image editing;
- request for redundant confirmation.

Required default completion path:

REQUEST
→ INSPECT
→ ROOT CAUSE
→ PATCH CONTRACT
→ SOURCE COMPARE
→ MINIMAL PATCH
→ BUILD
→ REGRESSION CHECK
→ PUSH
→ REPORT SHA + RUNTIME STATUS

If runtime verification is unavailable, push the verified build candidate and report BUILD PASS — NEEDS OWNER TEST rather than stopping before implementation.

## 2. INSPECT

Before changing anything:
1. confirm the owner-declared authoritative baseline from FULL_HANDOFF.md and the current request;
2. inspect repository state at that exact baseline;
3. read AGENTS.md, FULL_HANDOFF.md, this file, docs/SOURCE_MAP.md and docs/BRAND_PALETTE.md when color/branding is involved;
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

Desktop, Tablet and Mobile are three independent regression surfaces.

Do not assume Tablet = Mobile.
If prior documentation omitted Tablet, Tablet remains PENDING until independently verified.

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

For every responsive component, inspect all three source behaviors before changing responsive code:

MERYWOOD DESKTOP
↔
BIO-A DESKTOP

MERYWOOD TABLET
↔
BIO-A TABLET

MERYWOOD MOBILE
↔
BIO-A MOBILE

Tablet source inspection is mandatory. Do not derive Tablet behavior from Mobile assumptions.

Breakpoint authority:
1. inspect Merywood media queries;
2. inspect existing BIO-A media queries;
3. inspect component-specific breakpoints;
4. preserve source breakpoint mechanics wherever possible;
5. introduce/change a breakpoint only when evidence proves it is necessary.

Do not hardcode device names as implementation logic unless the source itself does so.



Use docs/SOURCE_MAP.md first.

If a mapping exists:
- inspect only the mapped source range plus enough surrounding context to understand it.

If no mapping exists:
- search Merywood narrowly using evidence from the target;
- inspect only the necessary component;
- add the confirmed mapping to docs/SOURCE_MAP.md after locating it.

Do not reread the complete source for every request.

For color/branding changes, consult docs/BRAND_PALETTE.md before creating any new color value. If the legacy BIO-A source already defines the needed brand color, reuse it.

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

For every responsive UI patch define explicitly:

Desktop:
- expected behavior, or REGRESSION CHECK — NO CHANGE EXPECTED.

Tablet:
- expected behavior, or REGRESSION CHECK — NO CHANGE EXPECTED.

Mobile:
- expected behavior, or REGRESSION CHECK — NO CHANGE EXPECTED.

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
- desktop/tablet/mobile implications;
- selector scope;
- interaction scope;
- accidental source rewrites;
- debug code;
- secrets;
- generated/cache junk.

For UI patches inspect relevant:

Desktop:
- layout;
- spacing;
- typography;
- interaction;
- overflow;
- animation.

Tablet:
- layout;
- larger-tablet / landscape behavior where relevant;
- standard tablet width;
- smaller-tablet / portrait behavior where relevant;
- intermediate widths;
- columns/grid;
- spacing;
- text wrapping;
- image ratios;
- touch interaction;
- navigation;
- carousel/slider;
- overflow;
- animation.

Mobile:
- layout;
- stacking;
- spacing;
- touch interaction;
- navigation/menu;
- overflow;
- animation.

Also inspect relevant:
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

Only the owner can promote a visual/runtime patch to PASS for the surface(s) actually tested.

Record status independently:
- Desktop: PASS / FAIL / PENDING / PROTECTED
- Tablet: PASS / FAIL / PENDING / PROTECTED
- Mobile: PASS / FAIL / PENDING / PROTECTED

Use FULL RESPONSIVE PASS — OWNER CONFIRMED only when all three surfaces are PASS.

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
3. record Desktop / Tablet / Mobile status independently;
4. mark only verified surfaces PASS/LOCKED;
5. record rollback checkpoint;
6. record rejected candidates where useful;
7. record remaining work;
8. update SOURCE_MAP only for newly investigated components and responsive ownership actually inspected.

Before ending an important session, ensure another AI can continue from repository files alone.

## 16. Required response format for implementation work

Before implementation:

## Responsive scope

**Desktop:** PASS / affected / protected / pending

**Tablet:** PASS / affected / protected / pending

**Mobile:** PASS / affected / protected / pending

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

## Responsive verification

**Desktop:** result

**Tablet:** result

**Mobile:** result

Never omit Tablet from a responsive UI patch.

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
- PARTIAL PASS — SURFACE-SPECIFIC
- FULL RESPONSIVE PASS — OWNER CONFIRMED
- FAIL — ROOT CAUSE REASSESSMENT REQUIRED
