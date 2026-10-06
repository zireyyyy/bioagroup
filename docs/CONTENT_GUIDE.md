# BIO-A GROUP — HOME CONTENT LENGTH GUIDE

Purpose: keep future VI/EN content changes close to the text load that the original Merywood Home layout was designed to hold.

Source authority:
- owner-supplied Merywood export
- path: `merywood/pages/index/index.html`
- character counts below use visible text after whitespace normalization
- spaces and punctuation are included

## Rule

Character count is a **layout guardrail**, not a guarantee. Font metrics, word length, breakpoints and manual line breaks still affect wrapping.

For Vietnamese copy:
- normal paragraph/card copy: aim for **80–100% of the original Merywood character count**;
- fixed/compact labels: prefer **70–100%**;
- do not exceed the source count by more than ~10% without Desktop + Tablet + Mobile runtime verification;
- never add wrappers, `<br>`, font-size overrides or height fixes just to force longer copy into a component;
- if real content is materially longer, split the content into an approved new component instead of overloading the source block.

## Home source budgets

| Block | Merywood original | Recommended VI target | Current BIO-A sample |
|---|---:|---:|---:|
| Hero H1 | 70 chars | Brand authority overrides count | 41 |
| Hero supporting text | 134 | 110–150 | 152 |
| Why Choose 01 body | 381 | 300–380 | 312 |
| Why Choose 02 body | 312 | 250–315 | 305 |
| Why Choose 03 body | 307 | 245–310 | 302 |
| Why Choose 04 body | 364 | 290–365 | 312 |
| We Produce 01 body | 259 | 210–260 | 258 |
| We Produce 02 body | 235 | 190–240 | 237 |
| Right Choice bullets — Retailers | 85 / 88 / 84 | ~70–90 each | 85 / 87 / 87 |
| Right Choice bullets — Manufacturers | 89 / 72 / 79 | ~70–90 each | 90 / 93 / 90 |
| Right Choice bullets — Entrepreneurs | 88 / 85 / 89 | ~70–95 each | 95 / 93 / 97 |
| Roadmap 01 body | 312 | 250–315 | 294 |
| Roadmap 02 body | 287 | 230–290 | 270 |
| Roadmap 03 body | 298 | 240–300 | 286 |
| Roadmap 04 body | 267 | 215–270 | 245 |
| Roadmap 05 body | 301 | 240–305 | 268 |
| Review 01 | 478 | 330–460 | 362 |
| Review 02 | 285 | 230–300 | 300 |
| Review 03 | 298 | 240–310 | 306 |
| Product Formats lede | 122 | 100–130 | 130 |
| Product Formats note | 206 | 165–210 | 207 |
| Product Formats CTA description | 69 | 55–85 | 74 |
| Contact CTA description | 91 | 70–100 | 87 |

## Future AI writing contract

Use this instruction when rewriting BIO-A content:

> Rewrite only the requested text. Preserve the existing DOM and component structure. Keep the Vietnamese copy inside the character budget recorded in docs/CONTENT_GUIDE.md. Prefer natural Vietnamese over exact character equality, but do not exceed the recorded Merywood source length by more than 10% unless explicitly approved. Return VI and EN as a paired mapping. Do not add HTML wrappers, manual line breaks, CSS, font changes or layout changes.

## Locked components

Content work must not reopen:
- Header
- Footer
- source-owned responsive mechanics
- slider/carousel transforms
- accepted We Produce DOM/layout mechanics

Only the text payload may change when the owner requests copy refinement.


## Roadmap exception after runtime regression

The Roadmap copy is intentionally restored to the shorter PASS-era payload from commit `1ce91e97e479fda03e116e637e4b1ddb449a26ce`.

Do not expand Roadmap copy to its full Merywood character budget until the owner explicitly reopens that component and Desktop + Tablet + Mobile are runtime-tested. The source-length budget remains useful for future writing, but current Roadmap layout safety has priority.


## Roadmap R2 practical density

After Roadmap layout was restored and confirmed visually stable, the owner reopened only the sample text density.

R2 rules:
- keep `roadmapSteps` independent from the longer How It Works copy;
- expand text only;
- preserve the current PASS Roadmap DOM/CSS/layout;
- use a guarded medium-length payload rather than immediately returning to the first near-source-length attempt that caused a regression;
- if R2 passes Desktop + Mobile runtime, use its actual text lengths as the practical Roadmap writing budget until Tablet is completed.


## Roadmap R3 line-break contract

Roadmap is an exception to the generic "do not add manual line breaks" writing rule because the original Merywood Roadmap itself uses explicit `<br>` line breaks inside each step paragraph.

For Roadmap only:
- preserve approximately 4–6 visual lines per slide;
- store copy as line segments and render them into the existing source paragraph;
- do not remove source-style line breaks by replacing the paragraph with plain `.text()`;
- do not use CSS/font-size/height changes to compensate for copy length;
- future AI copy should return Roadmap text already segmented into line-safe phrases.

## Bilingual content authority

Every promoted page must ship as a VI/EN pair.

- Shared interface copy (header, footer, cookie consent, common CTAs, form labels, accessibility labels) is centralized and language-aware.
- Page-specific headings/body/cards must have explicit VI and EN copy maps.
- Do not use generic fallback translation to fill approved production pages.
- When editing one language's page content, verify or update the paired language in the same patch unless the owner explicitly scopes the change to one language.
- A page cannot be marked PASS if visible residual text from the opposite language remains.

