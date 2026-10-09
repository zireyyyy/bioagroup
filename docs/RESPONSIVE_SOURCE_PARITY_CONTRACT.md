# BIO-A RESPONSIVE SOURCE PARITY & CROSS-DEVICE CONVERGENCE CONTRACT

Authority: **owner instruction 2026-10-09**. Effective immediately and permanent for all future BIO-A visual/runtime changes.
Applies to the active Tablet phase and the cross-device audit **after** owner-confirmed Full Tablet PASS.
Read together with `AGENTS.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md` and `docs/TABLET_REGRESSION.md`.

## Objective — what "compact devices" means
ONE component ownership / ONE shared structural source / ONE responsive contract; device-specific behavior is expressed only where the **original Merywood source or the owner's explicit requirements** justify it. "Compact" means less duplicated code, fewer contradictory overrides, consistent design and regression safety across viewport ranges. **It does not mean** identical Desktop, Tablet and Mobile visual layouts, indiscriminate compression/minification, a redesign, or arbitrarily uniform breakpoints.

## Unconditional source-first gate
For any route/component:
1. Identify exact current owner: GLOBAL shared shell, ROUTE, or COMPONENT. Use existing `SOURCE_MAP.md` mapping before additional source searches.
2. Retrieve/inspect the **exact Merywood DOM, styling (including responsive media queries), JavaScript behavior and assets** of that component at Desktop, Tablet and Mobile. Only search a narrow source range. Inspect original interactions, motion and touch behavior.
3. Compare BIO-A's corresponding source and actual runtime; record the relevant difference. Mark source fields **VERIFIED** or **MISSING**, do not guess.
4. Preserve or port original Merywood implementation where already correct. Change only owner-requested BIO-A copy, logos, colors, localization/contact or expressly approved UX.
5. **Only add new behavior if Merywood lacks the owner-requested feature.** Any added code must follow the existing DOM/class conventions, CSS variables, interaction lifecycle, responsive architecture, accessibility and motion model. No new duplicate component tree if a source component can be extended safely.
6. If the exact original CSS/breakpoint is unavailable, record a **source evidence blocker**, gather additional legitimate evidence (live source stylesheet, archived assets, computed rules), or ask for the precise missing source. Do not represent screenshot approximation/custom CSS as source parity.
7. Verify changes across representative viewport widths and source breakpoint boundaries. Never treat a Desktop PASS as Tablet/Mobile PASS.

**Current source limit (2026-10-09):** owner ZIP `BIOA-Website.zip` preserves original page HTML/JS and some font CSS, but not the full theme `main.css` used for exact responsive behavior. The Tablet audit harness is **diagnostic only**; it is not a substitute for missing source CSS. Do not initiate broad Tablet CSS changes solely from audit hints.

## Component responsive ownership
- Keep canonical component DOM/JS and baseline CSS in the right source-owned module.
- Source-derived media queries represent distinct **layout behaviors** at source breakpoints; reuse the same breakpoints when verified. Do not introduce an arbitrary Tablet breakpoint just because a screenshot uses that width.
- Prefer correcting existing authoritative rules. Narrow additional rule only for a proven BIO-A-specific difference, scoped to that component and justified/documented.
- Do **not** append broad global overrides to repair one route, duplicate Desktop/Mobile layouts into separate copies, or accumulate override chains by patch version.
- Keep shared Header/Footer/Cookie/Chat/Menu in the shared shell owner, not duplicated across page modules. Route-specific elements remain route-owned.
- If two views genuinely require different source-owned DOM/interaction models, **preserve the exact Merywood split**; do not force a single DOM at the expense of source parity.
- Treat breakpoint *boundaries* and intermediate widths as first-class regression surfaces; prevent collisions, clipping, overflow, improper font scaling, icon cropping, tablet hover/touch bugs, and CLS.

## Current Phase 2 — Tablet PASS first
- Work on individual Tablet failures only after source comparison and a recorded root cause. Existing Desktop/Mobile and previously owner-accepted Tablet surfaces are LOCKED.
- Check Tablet portrait, landscape and intermediate widths; source breakpoints take priority over fixed device labels.
- Validate VI/EN Home, About, cosmetics, other services, Blog index/detail, Contacts, 404 and shared shell. Test interactions (menus, cards, carousels, dialogs/consent, chat, touch, keyboard), not just horizontal overflow.
- A diagnostics JSON or successful build is **not** visual PASS; only owner runtime acceptance can promote a surface.
- No global "compact" refactor while Tablet Phase 2 remains open.

## Post-Tablet PASS — cross-device convergence audit (NEW MANDATORY PHASE 2B)
After the owner explicitly confirms FULL TABLET PASS, and **before** Phase 3 cleanup or final launch:
1. Inventory component ownership / shared vs route code, CSS cascade, repeated declarations, JS event ownership, breakpoint overlap, redundant selectors and device-specific exceptions across the site.
2. Audit responsive behavior on a representative matrix of widths (illustrative probes: 360/390/430, 768/820/1024/1180, 1280/1440/1920 CSS px), plus orientations, touch/hover and breakpoint-adjacent values. These are QA probes, **not** implementation breakpoints.
3. Compare each component and device against its verified Merywood source; record owner-approved BIO-A deviations explicitly. Build one auditable responsive owner map and Desktop/Tablet/Mobile PASS matrix for all VI/EN routes.
4. Propose compacting *only* redundant or conflicting code with proven evidence of no behavioral difference. Changes to an owner-LOCKED surface require explicit justification and owner approval of the affected area before editing.
5. Perform small reversible per-component convergence patches, never a site-wide blind CSS/JS refactor. For each patch: baseline screenshots/behavior -> diff -> build/test -> Desktop, Tablet, Mobile and boundary regression -> owner PASS -> freeze.
6. Consolidate shared styling only when component behavior and source constraints support it. Keep deliberate source breakpoints and device variants intact.
7. Preserve 14-day signed maintenance gate/noindex, D1, Google Sheets, Resend, Turnstile, Sanity future-only; no CMS architecture migration.

## Permanent future patch gate
Every future visual change MUST state:
- Component/route and its source-of-truth location and current owner;
- verified Merywood behavior on Desktop / Tablet / Mobile;
- intended source-matching change or explicitly authorized new behavior;
- exact existing CSS/JS rules to adjust (no redundant override); which PASS surfaces are frozen;
- affected widths / interactions, not just three named devices;
- regression evidence at three surface families AND relevant intermediate/boundary widths;
- owner PASS, updated SOURCE_MAP + handoff + reversible SHA.

**Definition of success:** fixing one component changes the intended behavior at the correct owner/source layer, with all device variants remaining consistent **without separately patching Desktop, Tablet and Mobile each time**. It does NOT promise every future responsive change is mechanically zero-risk; verification remains mandatory.
