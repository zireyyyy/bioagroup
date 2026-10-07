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

## 5. Mandatory three-surface regression model

Every UI/layout/runtime patch must treat these as three independent regression surfaces:

- Desktop
- Tablet
- Mobile

Never omit Tablet from responsive verification.

Tablet is not automatically equivalent to Mobile and may have its own:
- layout;
- column count;
- container width;
- spacing;
- typography;
- image ratio;
- navigation behavior;
- carousel behavior;
- section alignment;
- touch/hover behavior;
- breakpoint logic.

For a responsive component, compare source parity independently:

MERYWOOD DESKTOP ↔ BIO-A DESKTOP

MERYWOOD TABLET ↔ BIO-A TABLET

MERYWOOD MOBILE ↔ BIO-A MOBILE

Do not invent arbitrary breakpoints. Inspect Merywood media queries, existing BIO-A media queries and component-specific breakpoint behavior first.

A component may have different statuses per surface. Example:
- Desktop: PASS
- Tablet: FAIL
- Mobile: PASS

That component is NOT globally responsive PASS.

If only Tablet fails, patch Tablet only unless a broader change is technically unavoidable. The other verified surfaces remain protected.

A previously recorded PASS that did not explicitly verify Tablet must not be retroactively interpreted as Tablet PASS. Record Tablet as PENDING until independently checked.

## 6. Inspect before edit / root cause before fix

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

## 7. Locked PASS rule

Any visual/runtime behavior confirmed PASS by the owner becomes LOCKED for the surface(s) actually verified.

PASS is surface-specific:
- Desktop PASS does not imply Tablet PASS.
- Tablet PASS does not imply Mobile PASS.
- Mobile PASS does not imply Desktop PASS.

Use FULL RESPONSIVE PASS only when Desktop + Tablet + Mobile are all independently confirmed PASS.

Do not change a PASS/LOCKED component while fixing another issue unless technically unavoidable.

If a locked surface must be touched:
1. identify it before editing;
2. explain why;
3. minimize the affected code;
4. verify the previously approved behavior afterwards.

Never perform opportunistic cleanup in locked components.

## 8. Patch contract

Every patch must define:
- Target — exact bug/feature.
- Root cause — verified reason.
- Files expected to change — smallest possible set.
- Protected surfaces — components that must not change.
- Acceptance criteria — observable PASS conditions.

For responsive UI patches, acceptance criteria must explicitly state:
- Desktop — expected behavior or REGRESSION CHECK — NO CHANGE EXPECTED.
- Tablet — expected behavior or REGRESSION CHECK — NO CHANGE EXPECTED.
- Mobile — expected behavior or REGRESSION CHECK — NO CHANGE EXPECTED.

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

## 9. Minimal patch law

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

## 10. Verification

Node.js: >= 20
Build command: npm run build
Build output: dist

A successful build means BUILD PASS only.
It does not mean visual/runtime/production PASS.

For UI work verify, when relevant:
- desktop;
- tablet;
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

## 11. Diff and commit discipline

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

## 12. Documentation maintenance

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
3. record Desktop / Tablet / Mobile status independently;
4. mark only verified surfaces PASS/LOCKED;
5. use FULL RESPONSIVE PASS only when all three surfaces are PASS;
6. record rollback checkpoint;
7. record remaining work;
8. record rejected candidates when useful.

## 13. Core principle

Think like a maintainer of a production codebase, not a prototype generator.

Default strategy:

FIND → COMPARE → PORT → VERIFY

Never default to:

REINVENT → OVERRIDE → PATCH AGAIN

When uncertain, gather evidence instead of guessing.

## 14. Active-project execution contract

For the BIO-A Group project, an owner request to change, fix, refine, restore, localize, or otherwise modify repository behavior is an execution instruction by default.

Unless the owner explicitly asks for one of the following, do NOT stop at explanation, planning, prompt-writing, or delegation:
- create/generate/edit an image;
- explain only;
- write a prompt for Claude Code, Codex, Cursor, another coding AI, or another developer;
- provide a proposal without implementation.

Default active-project behavior is:

OWNER REQUEST
→ INSPECT CURRENT AUTHORITATIVE BASELINE
→ FOLLOW REPOSITORY WORKFLOW
→ IMPLEMENT THE MINIMAL PATCH
→ BUILD / VERIFY
→ PUSH TO THE REQUESTED REPOSITORY BRANCH
→ RETURN THE EXACT COMMIT SHA AND RUNTIME STATUS

When the request is sufficiently specified, do not ask for an extra confirmation before implementing or pushing.
Do not hand work off to another coding AI unless the owner explicitly requests a prompt or handoff.
Do not create images unless the owner explicitly requests image creation or editing.

This execution contract does not override safety, repository authority, locked-PASS rules, source-first rules, or the mandatory Desktop / Tablet / Mobile regression model.


## Blog content / SEO — mandatory locked contract

Before creating, rewriting, translating or optimizing any Blog article, read `docs/BLOG_CONTENT_CONTRACT.md` and current `bioa-blog-refine.mjs`.
For Blog content/layout, that contract is mandatory and overrides generic writing preferences. Never redesign the owner-approved Blog detail structure during an SEO/content task.


## Handoff hardening — mandatory current-state rule

Current-state files:
- `START_HERE.md`
- `NEW_CHAT_CONTINUATION_PROMPT.md`
- latest mandatory feature/deploy contracts

These files are rewritten for the current handoff state and take precedence over stale historical status in `FULL_HANDOFF.md`.

Every handoff update must:
1. derive state from current repo + latest owner confirmation;
2. rewrite `NEW_CHAT_CONTINUATION_PROMPT.md` for that exact state;
3. update `START_HERE.md` if baseline, candidate, rollback, next task, ownership or closeout phase changed;
4. never copy old version/status text blindly.

Before every patch resolve:
1. current surface/block;
2. code owner;
3. source-of-truth counterpart;
4. PASS/FROZEN vs PENDING adjacency;
5. Desktop/Tablet/Mobile blast radius.

CSS/JS layer classification is mandatory:
- GLOBAL;
- ROUTE;
- COMPONENT.

Fix at the correct owner layer. Do not solve a COMPONENT problem with a broad GLOBAL override unless the owner architecture explicitly requires a final-order global authority.

### Font authority

Bio-A-owned UI/body typography uses:
`Manrope, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.

Do not introduce a new route-local font authority.
Preserve Merywood source typography mechanics when source-owned and already correct.

### Hosting / Cloudflare

GitHub remains application source-of-truth.
Direct hosting/Cloudflare edits are allowed only for deployment-owned concerns.
Any direct hosting change must be documented/backported before PASS.
