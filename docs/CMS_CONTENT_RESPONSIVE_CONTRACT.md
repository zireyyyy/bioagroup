# BIO-A GROUP — CMS CONTENT & RESPONSIVE-SAFE PUBLISHING CONTRACT

**Authority:** owner instruction 2026-10-15. **Permanent contract** for all future copy, CMS, asset, page and section work. Read with `AGENTS.md §7A`, `docs/WORKFLOW.md §1B`, `docs/RESPONSIVE_SOURCE_PARITY_CONTRACT.md`, `docs/CONTENT_GUIDE.md`, and `docs/SOURCE_MAP.md`.

**Current implementation status:** BIO-A currently builds page HTML from repository-controlled content and source-owner modules (`build.mjs`, `bioa-*.mjs`) on GitHub/Cloudflare Pages. `package.json` does **not** have a Sanity SDK/CMS integration. **Sanity Free is a future owner preference, not a deployed integration.** This document specifies future architecture and acceptance requirements; it does not activate a CMS, change build/deploy, or make Production public.

## Mandatory principle — edit content once, inherit approved responsive behavior

- **Owner-PASS components are canonical reusable templates.** One component owner controls DOM, CSS, responsive variants, interactions, animation, and icon/CTA source. A CMS must supply *validated data only*, not new DOM/CSS/JS, per-device markup or free-form layout instructions.
- **Content edits do not normally require code for Desktop, Tablet or Mobile** when the entry fits a component's approved fields and data bounds. The same content is rendered by the existing source-owned responsive component on all three device surfaces, VI/EN.
- **Adding a new visual pattern** or changing behavior, slot counts, breakpoints, interactions, layout, text capacity or image shapes **IS development**. Implement responsive behavior **once in its canonical source component**, validate three surfaces, then expose that pattern to CMS for safe reuse. Do not code separately for each future content record.
- Responsive PASS means **tested behavior within a defined content envelope**, *not* a perpetual guarantee for arbitrary copy/HTML/media. No content editor may bypass design constraints and blame missing per-device CSS later.

## Publishing change classification — follow this decision table

| Kind of future change | Owner | Device-specific code? | Required gate |
|---|---|---|---|
| Edit approved VI/EN H1, description, contact info, FAQ, card text inside supported lengths | CMS/editor | NO | Schema validation, paired locale, content preview, normal publish checks |
| Replace image with correct ratio, size, alt, crop/focal point | CMS/editor | NO | Image/alt/ratio/asset accessibility checks; content preview |
| Publish Blog article built from approved H2/paragraph/card/CTA/table blocks | CMS/editor | NO | Schema + URL/SEO + dynamic TOC anchor checks; preview |
| Add/reorder CMS items within a component supporting dynamic counts | CMS/editor | NO | Count/empty state/slider behavior constraints; CI smoke or staged preview if meaningful |
| Copy materially longer than approved layout envelope; missing translation; unexpected crop; unsupported amount of data | Editorial review | Normally NO code initially | Reject or revise content; investigate template only if legitimate business need exceeds envelope |
| Add new section type, page composition mode, interaction, image layout, navigation behavior, or global style system | Developer | YES, **once per canonical component** | Source-first implementation; Desktop/Tablet/Mobile & VI/EN QA; owner PASS then CMS schema exposure |
| Change existing canonical template's responsive layout/JS | Developer | Scoped code at one source owner | Full affected width and interaction regression; protect all existing PASS regions |

## Planned Sanity content contract — implement when CMS phase is explicitly approved

1. Establish typed, versioned schemas for **Page**, **Section**, **Blog Post**, **FAQ**, **Contact Details**, **Navigation** (only if owner explicitly permits nav editing), **Media** and translations. Only provide section types backed by approved source components.
2. Use a controlled **section registry** with permitted types/variants and explicit max/min entries. Render sections through a single existing component per type, not arbitrary editor-provided HTML/CSS or per-breakpoint configuration. Preserve source breakpoints and one source owner.
3. Content envelopes/field validation by component:
   - Text length and line-density budgets from `docs/CONTENT_GUIDE.md` and `docs/BLOG_CONTENT_CONTRACT.md`; count limits depend on context and locale, not a blanket sitewide max.
   - Use **aspect-ratio**, approved dimensions, file size, focal point/crop and meaningful alt for each image slot; optimize exported responsive image sources where supported.
   - Enforce configured item counts, slide counts, minimum/maximum cards and appropriate empty-state fallbacks; do not hardcode “always 3” when source supports dynamic 1–N.
   - Sanitize rich text; allowed H2/H3/list/table/approved CTA components only. Never accept arbitrary styles/scripts, inline `font-weight`, unreviewed embeds or layout-breaking manual `<br>` except authorized source-format components.
   - Stable slug/SEO title/meta/OG, unique heading IDs, canonical URLs, useful internal links. Blog Sticky TOC generated from the same actual headings as article content, not editor-managed duplicate hrefs.
   - VI/EN field pairs must be validated independently for length and meaning. Explicitly handle missing locale by reviewed fallback or block publish; **no accidental mixed-language pages**.
4. Give editors a **Preview/Draft** surface using the same approved responsive UI, with Desktop 1440, Tablet 834/1024 and Mobile 390 presets as convenient checks. Those widths are **QA probes, not new CSS breakpoints**. Long content and unusual media should trigger targeted preview warnings rather than silent forced type-size reduction.
5. Connect Sanity dataset credentials **server/build-side only**, not in public frontend output. Versioned CMS content is fetched during build/on demand as appropriate; trigger GitHub/Cloudflare Pages rebuild on approved publish via a secured, authenticated webhook. Configure retries, rollback, staging and cache invalidation. Preview must remain read-only/noindex; Production maintenance/access guard remains unchanged until separate owner authorization.
6. Establish editorial roles, draft/approval, revision history/restore, source content backups/export and a **publish gate**: validate schema and page rendering, block unsafe content or broken links/media/locale/TOC. Developers change code only if the **template or behavior** itself must change.
7. Phase order: owner Full Tablet PASS → Phase 2B canonical responsive source convergence → Phase 3/launch prerequisites as approved → **CMS integration only on owner's instruction**. Do not couple Phase 2B to a silent CMS migration.

## Device-QA policy for future CMS changes

- **Routine content-only update** within proven template bounds: schema & editorial checks + Preview + normal build/link/SEO checks; editor can publish without requesting new Desktop/Tablet/Mobile CSS. A full manual all-route three-device regression **is not required for every text edit**.
- **Risky content update** (long VI vs EN copy, novel image ratio, varied card quantity, new embed, heading rewrite affecting TOC): targeted responsive preview/tests at affected route and breakpoint boundaries; reject invalid data before touching CSS.
- **Template/section/interaction change**: developer checks actual Desktop/Tablet/Mobile and VI/EN; GitHub CI smoke, screenshot/layout/interaction regression, owner QA and documented PASS before CMS editors may use the new module.
- Reuse PASS source first; **fix where modified, clean there**: avoid building duplicate CSS/JS for independent routes or CMS entries. Fix layout only when a validated realistic content case demonstrates a real template defect, and regression-test the source owner.
- After publishing, monitor build failures, 404/broken media, layout overflow and runtime metrics; support rollback of both CMS revision and code release.

## Migration boundaries and acceptance

The current repository is NOT yet a finished content management product. Do not promise "100% automatically responsive" or a drag-and-drop arbitrary layout editor. The intended result is **no repeated coding for routine CMS content**, while **new component types are engineered and accepted once**.

**Acceptance of CMS stage later:** owner can create and publish a VI/EN Blog post, replace an approved section image, edit an FAQ and add a card within schema limits; all render correctly using existing approved Desktop/Tablet/Mobile components without a code change. An unsupported new section type is rejected in CMS until a developer implements it once and obtains owner PASS.

**BẠN CẦN TEST GÌ for this documentation-only contract:** NO WEBSITE RUNTIME TEST; repository documentation changed only. CMS is not connected by this change.
