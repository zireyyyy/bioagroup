# BIO-A GROUP — AGENT RULES

This file contains permanent repository development rules.
It is not a patch log. Current project state belongs in FULL_HANDOFF.md.

## 1. Authority

Repository: zireyyyy/bioagroup

An authoritative baseline explicitly provided by the owner overrides:
- current main;
- HEAD;
- newer commits;
- assumptions from previous chats.

Never assume the newest commit is authoritative.

Decision priority:
1. Owner's explicit requirement.
2. Owner-declared authoritative baseline.
3. AGENTS.md.
4. FULL_HANDOFF.md.
5. docs/WORKFLOW.md.
6. docs/SOURCE_MAP.md.
7. docs/BRAND_PALETTE.md for color/brand decisions.
8. Original Merywood source.
9. Existing BIO-A architecture.
10. Minimal-risk implementation.
11. Developer preference.

Repository files + Git history are project authority.
Do not use chat memory as project authority.

## 2. New-session boot sequence

Before implementation:
1. identify repository;
2. identify the authoritative baseline;
3. read AGENTS.md;
4. read FULL_HANDOFF.md;
5. read docs/WORKFLOW.md;
6. read docs/SOURCE_MAP.md;
7. identify the exact target component;
8. reuse an existing SOURCE_MAP entry when available;
9. inspect only missing Merywood source information;
10. inspect the BIO-A counterpart;
11. only then diagnose or implement.

## 3. Merywood source-of-truth

The original Merywood source supplied by the owner is the visual/runtime reference.

When Merywood already behaves correctly, preserve:
- DOM structure;
- layout mechanics;
- positioning;
- responsive mechanics;
- hover behavior;
- animation;
- interaction logic;
- proportions;
- relationships between component parts.

Only change the exact BIO-A-specific portions requested by the owner, such as:
- copy/language;
- BIO-A branding;
- brand colors;
- logos and watermarks;
- contact identity/channels;
- explicitly approved UX differences.

Do not redesign a working Merywood component.
Do not replace source mechanics with custom mechanics unless the owner intentionally requires different behavior.

Brand rule:
- replace Merywood brand traces only when requested/required;
- do not replace ordinary product imagery, neutral icons, decorative artwork or source UI artwork without an explicit request;
- BIO-A logos must keep their original proportions and must not be cropped;
- use the light BIO-A logo on dark backgrounds.

## 4. Source-first rule

For every UI/runtime request use:

OWNER REQUEST
→ TARGET COMPONENT
→ MERYWOOD REFERENCE
→ BIO-A CURRENT IMPLEMENTATION
→ DIFF
→ ROOT CAUSE
→ MINIMAL PATCH
→ VERIFY

Never use:
OWNER REQUEST
→ GUESS
→ NEW CUSTOM CODE
→ MORE OVERRIDES

when the correct Merywood implementation already exists.

Targeted source lookup is mandatory.
Search by exact evidence such as:
- visible text;
- CSS/DOM class;
- section name or ID;
- image/SVG filename;
- JS function;
- event handler;
- animation name;
- distinctive markup.

Do not rescan the entire Merywood source by default.
Expand scope only when evidence requires it.

## 5. Inspect before edit / root cause before fix

No implementation before the agent can state:
- current behavior;
- expected behavior;
- protected behavior;
- owner request;
- target component;
- Merywood reference;
- BIO-A counterpart;
- relevant difference;
- verified root cause or strongest tested hypothesis;
- minimal correction;
- protected components.

Do not patch symptoms blindly.
Do not stack speculative fixes.

## 6. Locked PASS rule

Any visual/runtime behavior confirmed PASS by the owner becomes LOCKED.

Do not change a PASS/LOCKED component while fixing another issue unless technically unavoidable.

If a locked surface must be touched:
1. identify it before editing;
2. explain why;
3. minimize the affected code;
4. verify the previously approved behavior afterwards.

Never perform opportunistic cleanup in locked components.

## 7. Patch contract

Every patch must define:
- Target — exact bug/feature.
- Root cause — verified reason.
- Files expected to change — smallest possible set.
- Protected surfaces — components that must not change.
- Acceptance criteria — observable PASS conditions.

Do not silently expand scope.

One patch = one purpose.
Related small patches are allowed only when they affect the same component, use the same source reference, share one objective, and do not touch unrelated locked surfaces.

If Patch A fails:
- stop;
- diagnose A;
- fix or revert A;
- verify A;
- only then continue.

Do not continue to Patch B while Patch A is failing.

## 8. Minimal patch law

Priority:
1. reuse exact Merywood behavior;
2. restore source parity;
3. modify an existing local rule;
4. add a narrowly scoped override;
5. create new architecture only when absolutely necessary.

Avoid:
- component rewrites;
- broad global CSS;
- duplicated logic;
- guessed selectors;
- unnecessary dependencies;
- large refactors;
- unrelated formatting;
- file moves or class renames;
- cleanup during bug fixing.

A bug fix is not a refactoring opportunity.

## 9. Verification

Node.js: >= 20
Build command: npm run build
Build output: dist

A successful build means BUILD PASS only.
It does not mean visual/runtime/production PASS.

For UI work verify, when relevant:
- desktop;
- mobile;
- hover;
- click;
- open/close;
- animation;
- responsive behavior;
- overflow;
- text wrapping;
- logo/image proportions;
- neighboring locked components.

If direct runtime verification is unavailable, report:
BUILD PASS — RUNTIME VERIFICATION PENDING

Only the owner can promote visual/runtime behavior to final PASS.

## 10. Diff and commit discipline

Before commit inspect the final diff:
- only intended files changed;
- every changed line is necessary;
- no locked component changed unexpectedly;
- no unrelated formatting;
- no broad selector escaped scope;
- no debug code;
- no secrets/credentials/cache/generated junk;
- no unnecessary source rewrite.

Every commit must be focused, descriptive, reversible and limited to one patch purpose.
Return the exact commit SHA after push.

Do not update FULL_HANDOFF.md with an unconfirmed runtime/visual PASS.

## 11. Documentation maintenance

AGENTS.md:
- permanent rules;
- changes rarely;
- never a patch log.

FULL_HANDOFF.md:
- current project state;
- authoritative baseline;
- PASS/LOCKED surfaces;
- active patch;
- architecture decisions;
- rollback/rejected checkpoints;
- remaining work.

docs/WORKFLOW.md:
- detailed mandatory engineering workflow.

docs/SOURCE_MAP.md:
- lazy index from Merywood components to BIO-A counterparts;
- add mappings only after actual investigation;
- do not map the whole source proactively.

docs/BRAND_PALETTE.md:
- authoritative BIO-A color palette derived from owner-supplied BIO-A source;
- must be consulted before introducing or changing brand colors;
- do not invent replacement brand colors when an authority value already exists.

After owner-confirmed PASS:
1. record accepted commit SHA;
2. update authoritative state where appropriate;
3. mark accepted components PASS/LOCKED;
4. record rollback checkpoint;
5. record remaining work;
6. record rejected candidates when useful.

## 12. Core principle

Think like a maintainer of a production codebase, not a prototype generator.

Default strategy:

FIND → COMPARE → PORT → VERIFY

Never default to:

REINVENT → OVERRIDE → PATCH AGAIN

When uncertain, gather evidence instead of guessing.
