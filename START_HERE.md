# BIO-A GROUP — START HERE

Status: **CURRENT HANDOFF AUTHORITY**
Updated: 2026-10-07

This file exists to prevent a new chat from reviving stale patch history.

## Authority order

For current-state decisions, use this order:

1. Owner's latest explicit request.
2. This `START_HERE.md`.
3. `NEW_CHAT_CONTINUATION_PROMPT.md`.
4. Latest mandatory contracts:
   - `docs/BLOG_CONTENT_CONTRACT.md` for Blog;
   - `docs/FINAL_DEPLOY_CHECKLIST.md` for closeout/deploy.
5. `AGENTS.md`.
6. The **CURRENT STATE SNAPSHOT** at the top of `FULL_HANDOFF.md`.
7. `docs/WORKFLOW.md`.
8. `docs/SOURCE_MAP.md`.
9. Historical patch log in `FULL_HANDOFF.md`.

Historical PASS/PARTIAL/FAIL text does **not** override the current snapshot.

Repository source remains authoritative over chat memory unless the owner explicitly selects another baseline.

## Current runtime-confirmed baseline

Owner runtime-confirmed code baseline:

`76bab2b472b252f804c6022147209631cb691c81`
— **SHARED-MOBILE1C — First-Tap Menu + Full Bottom-Bar Hide**

Owner said **PASS** after testing this patch.

Any handoff-only/docs-only commits after this SHA inherit this runtime baseline unless they also change runtime code.

## Current work state

No untested runtime candidate exists at the time of this handoff.

Next intended patch:
**Mobile bottom-nav icon artwork swap only**, after owner explicitly says to use the supplied icon set.

Owner-supplied icon design:
- 5 concepts:
  1. Trang Chủ — house;
  2. Gia Công — factory + cosmetic bottle;
  3. Dịch Vụ — lab flask + leaf;
  4. Blog — document;
  5. Liên Hệ — support/headset person.
- two visual states are supplied in the chat artwork:
  - green artwork;
  - cream artwork.
- desired UI state:
  - inactive: very-light Bio-A green surface + green icon;
  - active: Bio-A green surface + cream icon.
- **DO NOT redraw or reinterpret the icons.**
- The uploaded artwork is not yet stored in the repository. If a future chat no longer has the attachment, ask the owner to re-upload that one asset before the icon-only patch.

Do not change the bottom-nav layout, labels, routes, scroll behavior or collision spacing while replacing only the icon artwork.

## Immediate next sequence

1. Owner confirms whether to use the supplied 5-icon artwork.
2. If confirmed: icon-artwork-only patch + Mobile runtime test.
3. Finish any remaining small owner-requested fixes.
4. Full-site **Tablet** pass.
5. Cleanup / hardening.
6. Production build/package and custom-domain deployment.

Do not start global cleanup before Tablet closes.

## Recent status / rollback

Current PASS / rollback baseline:
- `76bab2b472b252f804c6022147209631cb691c81` — SHARED-MOBILE1C — PASS.

Recent partial history — **not rollback targets**:
- `e331acd33910faceed318928cc2b9eb557e4b2b1` — SHARED-MOBILE1 — PARTIAL: Chat collision + weak/clipped bottom-bar presentation.
- `8fb80a78b2c60e1e640851ca18c573ef22123af8` — SHARED-MOBILE1A — PARTIAL: cookie/menu regression remained.
- `26f2fdc665c014c17093b6b36f8469c5ea2c1265` — SHARED-MOBILE1B — PARTIAL: menu sometimes required two taps; iPhone bottom-bar strip remained visible.

Other locked checkpoints:
- Blog PATCH-G8: OWNER PASS / LOCKED.
- Contacts CONTACT-C1: OWNER PASS / LOCKED for content/map/localization.
- Home accepted baseline and shared components remain protected unless explicitly reopened.

If a future icon patch fails, rollback to `76bab2...`.

## Code ownership summary

### GLOBAL
- `bioa-transform.mjs`
  - global branding transform;
  - Cookie banner presentation/state integration;
  - global payload transforms where already owned.
- `bioa-home-refine.mjs` shared layer
  - Header;
  - Mobile Menu;
  - Footer;
  - Chat;
  - shared Zalo/social treatment;
  - Mobile bottom navigation;
  - shared responsive shell;
  - shared reveal/motion where documented.

### ROUTE
- Home: `bioa-home-refine.mjs` — Home-specific sections only.
- About: `bioa-about-refine.mjs`.
- Gia Công Mỹ Phẩm: `bioa-cosmetics-refine.mjs`.
- Dịch Vụ Khác: `bioa-services-refine.mjs`.
- Blog: `bioa-blog-refine.mjs`.
- Contacts: `bioa-contacts-refine.mjs`.

### BUILD / ORCHESTRATION
- `build.mjs` selects the Merywood source route, applies the route transform, then applies the shared shell.

Do not duplicate shared components inside route files.

## CSS / JS ownership rule

Every change must be classified before editing:

- **GLOBAL** — shared across site; edit shared authority only.
- **ROUTE** — one route/page; keep it inside that route owner.
- **COMPONENT** — smallest component-specific selector/runtime inside its existing owner.

Never use a broad global CSS override to repair a route/component problem.
Never add a route-local script to re-own shared Header/Footer/Cookie/Chat/Menu behavior.

Before every patch, resolve these 5 items internally:
1. exact current surface/block;
2. current source/code owner;
3. Merywood source-of-truth component;
4. PASS/PENDING status of adjacent surfaces;
5. blast radius: Desktop / Tablet / Mobile.

## Adaptive Bio-A Shared Shell

The shared shell is adaptive but devices are independent regression surfaces:

- Desktop;
- Tablet;
- Mobile.

Tablet is **not** a scaled Mobile assumption.

Current Mobile-only shared behavior:
- bottom nav exists only at <=768px;
- Header + bottom bar hide on downward scroll and return on upward scroll;
- first tap on the clean Mobile burger must open reliably;
- Chat/Cookie clear the bottom bar;
- cookie popup may dismiss by tapping outside without saving a choice;
- cookie gear remains while undecided and disappears after a confirmed decision.

Do not change this behavior during an icon-artwork-only patch.

## Home patch rule

Home is owner-approved baseline.

For any future Home request:
- identify the exact section;
- inspect only that source counterpart;
- patch only that section;
- do not reopen unrelated Home sections;
- never use a broad Home/global rewrite for one small visual issue.

## Font authority

Bio-A-owned typography authority:

`Manrope, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`

Rules:
- Manrope is the default Bio-A UI/body authority where Bio-A explicitly owns typography.
- Preserve Merywood source font sizing/spacing mechanics when a component is source-owned and already correct.
- Do not introduce Inter or another route-local font as a new authority.
- Do not globally change font weight/size to fix one wrapping problem.
- Use the existing component hierarchy; Blog flex-table header is specifically normalized to 600.
- Vietnamese heading capitalization remains governed by existing title-case rules.

## Hosting / Cloudflare policy

GitHub repository is the application source of truth.

Direct Cloudflare Pages/domain/hosting changes are allowed only when the problem belongs to:
- custom domain;
- redirects;
- cache/headers;
- Pages build/deploy;
- other edge/deployment configuration where that layer is clearly the correct owner.

Do not fix normal UI/content/component problems in hosting.

If a direct hosting/Cloudflare setting is changed:
- record the exact change in `FULL_HANDOFF.md`;
- backport equivalent config into the repo when possible;
- if no repo config can represent it, document the dashboard setting precisely before marking PASS.

No hosting-only invisible fix may remain undocumented.

## Absolute do-not-change list

Without explicit owner reopening:
- Merywood working DOM/layout/runtime mechanics;
- Blog G8 visual/content contract;
- Contacts C1 company data/map/localization;
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu behavior;
- SHARED-MOBILE1C first-tap and full-hide behavior;
- 7-articles/page Blog archive rule;
- Home accepted sections;
- current route slugs/canonical mappings;
- VI/EN paired-content rule;
- source-first workflow.

