# BIO-A GROUP — START HERE

**Stable entry point for project continuation.** Do not place patch logs, version-specific candidates or current UI measurements in this file. For the current state, read the **single CURRENT RUNTIME SNAPSHOT at the top of `FULL_HANDOFF.md`** and verify its commit/branch against live GitHub.

## Authoritative repository and project
- Repository: `zireyyyy/bioagroup`; GitHub commit/branch is source truth. Cloudflare Pages builds the approved branch. The current Production and candidate SHAs MUST be read from `FULL_HANDOFF.md` and verified, not hard-coded in this entry file.
- Original Merywood HTML/CSS/JavaScript/layout/motion is the source-parity reference wherever correct. Only explicit BIO-A brand/content/functions and owner-approved deviations may differ.
- Website languages: VI + EN. Responsive acceptance: independent Desktop + Tablet + Mobile, including breakpoint boundaries and touch/scroll behavior.
- Home-approved shared components and every owner-PASS equivalent are canonical and must be reused. The source owner may be GLOBAL, ROUTE or COMPONENT; check `docs/SOURCE_MAP.md`.
- Production maintenance and preview security remain controlled by `AGENTS.md`, `docs/DEPLOYMENT_BRANCH_ACCESS_GUIDE.md` and Cloudflare middleware. Never expose secrets or open Production without explicit owner authorization.

## Read in this order
1. `START_HERE.md` — this navigation page.
2. `AGENTS.md` — permanent authority, PASS/FROZEN, source ownership, connection verification and project limits.
3. `FULL_HANDOFF.md` **CURRENT RUNTIME SNAPSHOT ONLY first** — production baseline, candidate, phase, recent owner PASS, pending QA, rollback, next task. Read specific history only if the task needs it.
4. `docs/WORKFLOW.md` — coding/CI/QA/promotion contract.
5. `docs/SOURCE_MAP.md` — inspect only the relevant component mapping and its existing source owner.
6. Task-specific contracts (read only when relevant): `docs/RESPONSIVE_SOURCE_PARITY_CONTRACT.md`, `docs/CONTENT_GUIDE.md`, `docs/BLOG_CONTENT_CONTRACT.md`, `docs/CMS_CONTENT_RESPONSIVE_CONTRACT.md`, `docs/BRAND_PALETTE.md`, `docs/TABLET_REGRESSION.md` and applicable security/deployment docs.
7. `NEW_CHAT_CONTINUATION_PROMPT.md` — one canonical bootstrap prompt, no alternate versioned continuation prompts.

## Precedence and verification
1. Latest explicit owner instruction and owner-declared authoritative baseline.
2. `AGENTS.md` and applicable mandatory contracts.
3. Verified component owner in `docs/SOURCE_MAP.md`.
4. CURRENT RUNTIME SNAPSHOT in `FULL_HANDOFF.md` for dynamic status **after checking GitHub**.
5. Current repository code and test evidence. Historical dated notes are references, not authority to restore superseded behavior.

If instructions and verified runtime disagree, record the discrepancy, do not silently choose the convenient source. Never infer that all Tablet surfaces passed just because one component or CI passed.

## Change-and-handoff contract
- INSPECT → REPRODUCE → SOURCE COMPARE → SCOPE → MINIMAL PATCH → **FIX HERE, CLEAN HERE** → BUILD/CI → Desktop/Tablet/Mobile + VI/EN regression → owner QA where required → promote only when authorized.
- Keep one code owner for each shared behavior. Reuse accepted Home pattern, original Merywood mechanics and exact approved artwork; preserve unrelated PASS/FROZEN behaviors.
- Each code candidate must report changed files/commit, QA verified vs unverified, owner test steps and rollback. A code or CI PASS is not an owner visual PASS.
- After a meaningful candidate or owner PASS, **replace the CURRENT RUNTIME SNAPSHOT block in `FULL_HANDOFF.md` in place**. Add concise historical lessons only if material. Do not prepend “CURRENT” sections to this file or rewrite this file per release.
- GitHub repository is the canonical source package. An optional portable ZIP/checksum manifest is created **only** when an explicit handoff/export requires it; no dummy source/rollback/archive folders, no secrets/dependencies/caches in ZIP.
- For CMS content updates, use the approved responsive component's validated schema; it does not require separate per-device CSS unless a new template/behavior is explicitly being engineered.

**No site code changes are implied by editing this document.**
