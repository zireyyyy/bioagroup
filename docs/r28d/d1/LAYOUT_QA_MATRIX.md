# R28d-D1 — Layout QA matrix (rendered measurements, before vs after)

**Builds and engines:**

| Item | Value |
|---|---|
| Before | frozen R28d build (`6889ec9` = `bbf21b3`, served locally) |
| After | D1 build (`1f03ec1`, served locally) |
| Chrome | 12 widths: 320, 375, 390, 428, 768, 769, 834, 1024, 1152, 1200, 1440, 1920 |
| WebKit | 5 widths: 320, 390, 834, 1024, 1440 |

**Desktop zoom 125%:** 1440 CSS px at 125% zoom lays out as 1152 CSS px, which is measured.

**Routes:** Home, About and Cosmetic Manufacturing, VI and EN. These are the only 3 EN pages that changed. Every other page and every VI page is **byte-identical** (HTML hash and phase-scope gate), so its rendering cannot change.

**Tools:** `tests/r28d-d1-layout-qa.mjs` and `tests/r28d-d1-layout-compare.mjs`. Evidence: `evidence/r28d-d1/compare/`, `before/shots`, `after/shots`.

**What is measured for every text box:**
- DOMRect and computed font-size / family / weight / line-height;
- line count, `scrollWidth` / `clientWidth`, `scrollHeight` / `clientHeight`;
- own clipping and line-clamp, clipping by an ancestor;
- collisions with images and buttons in the same card.

**Also measured:** equal-height card rows and slides (every slider walked to the end), section heights, horizontal page scroll.

## 1. Result

| Engine | Page × width | Text boxes measured | Boxes changed | **FAIL** | FLAG (review) |
|---|---|---|---|---|---|
| Chrome | 72 | 24528 | 672 | **0** | 239 |
| WebKit | 30 | 10220 | 282 | **0** | 102 |

**FAIL = 0 means:**
- no clipped or hidden EN;
- no text over an image or button;
- no horizontal page scroll;
- every slider still reaches its last slide;
- no font-size / family / weight / line-height change;
- no CSS changed (the scope gate proves only text inside the edited sections changed).

**FLAGs:** expected, because the EN went from one-line summaries to full paragraphs.
- Each box at most +214 px, inside sliders and cards that already hold the VI text of the same length.
- Detail per box: `changed-boxes-*.tsv`.

## 2. Fixes made after measuring (content only, no CSS)

| Iteration | Found | Fix |
|---|---|---|
| 1 | How We Work steps 2–3 ran to **12 lines at 320 px**, so the last words were hidden by the Owner-PASS `-webkit-line-clamp: 11`; step 1 exactly 11 lines | Steps 1–3 EN tightened (`f276e2b`); now ≤ 11 lines in Chrome and WebKit |
| 2 | Why Choose section ~1 line (17–27 px) taller than the **VI** section at every width; Cosmetics QC +1 line | Why Choose cards 1 / 2 / 4 and the QC sentence tightened (`1f03ec1`); Why Choose now ≤ VI height at every width except 320 px |

## 3. Section heights: EN after vs the approved VI layout (same width, px)

**Owner review:** sections where the EN is still **taller than the VI section by more than 16 px** after D1.

**Δ vs EN before:** the change caused by D1. When it is 0, the gap already existed before D1.

| Engine | Page | Width | Section | VI | EN before | EN after | Δ vs VI | Δ vs EN before | Caused by D1? |
|---|---|---|---|---|---|---|---|---|---|
| chromium | Home | 320 | block-why-choose-us | 636 | 493 | 660 | +24 | +167 | **yes** |
| chromium | Home | 320 | block-roadmap | 1063 | 1103 | 1103 | +40 | +0 | no (pre-existing) |
| chromium | About | 375 | mwa-produce | 1849 | 1937 | 1937 | +88 | +0 | no (pre-existing) |
| chromium | About | 390 | mwa-produce | 1849 | 1937 | 1937 | +88 | +0 | no (pre-existing) |
| chromium | About | 428 | mwa-produce | 1849 | 1937 | 1937 | +88 | +0 | no (pre-existing) |
| chromium | About | 769 | mwa-produce | 928 | 950 | 950 | +23 | +0 | no (pre-existing) |
| chromium | About | 1152 | mwa-produce | 714 | 759 | 759 | +45 | +0 | no (pre-existing) |
| chromium | About | 1200 | mwa-produce | 720 | 743 | 743 | +23 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 320 | bioa-cosmetics-categories | 1787 | 1886 | 1865 | +78 | -21 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 320 | block-we-conduct | 1574 | 1583 | 1604 | +31 | +21 | **yes** |
| chromium | Cosmetic Manufacturing | 768 | bioa-cosmetics-categories | 1428 | 1469 | 1469 | +40 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1152 | bioa-cosmetics-categories | 948 | 968 | 968 | +19 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1152 | block-we-conduct | 969 | 1027 | 1027 | +58 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1200 | block-we-conduct | 969 | 1027 | 1027 | +58 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1440 | block-we-conduct | 942 | 966 | 966 | +24 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1920 | bioa-cosmetics-categories | 972 | 1032 | 1032 | +60 | +0 | no (pre-existing) |
| chromium | Cosmetic Manufacturing | 1920 | block-we-conduct | 875 | 899 | 899 | +24 | +0 | no (pre-existing) |
| webkit | Home | 320 | block-why-choose-us | 627 | 490 | 651 | +24 | +161 | **yes** |
| webkit | Home | 320 | block-roadmap | 1062 | 1102 | 1102 | +40 | +0 | no (pre-existing) |
| webkit | About | 390 | mwa-produce | 1837 | 1924 | 1924 | +87 | +0 | no (pre-existing) |
| webkit | Cosmetic Manufacturing | 320 | bioa-cosmetics-categories | 1782 | 1881 | 1860 | +78 | -21 | no (pre-existing) |
| webkit | Cosmetic Manufacturing | 320 | block-we-conduct | 1570 | 1580 | 1601 | +31 | +21 | **yes** |
| webkit | Cosmetic Manufacturing | 1440 | block-we-conduct | 938 | 962 | 962 | +24 | +0 | no (pre-existing) |

**D1-caused items for Owner review (no clipping in either case):**
1. **Home Why Choose @ 320 px:** the slider card is one line (+24 px) taller than the VI card, in both Chrome and WebKit. At 375 px and above it is ≤ the VI height.
2. **Cosmetics QC "Kiểm soát trong sản xuất" @ 320 px:** +21 px, the restored VI clause "to limit deviation from the approved sample".

**Pre-existing, not changed by D1:** Roadmap @ 320, About categories, Cosmetics categories. There EN after = EN before.

## 4. Height changes vs EN before (all D1 sections, Chrome)

| Page | Section | Max Δ height vs EN before (px) | Widths with Δ > 16 px |
|---|---|---|---|
| Home | block-title | 0 | — |
| Home | block-why-choose-us | +167 | 320, 375, 390, 428, 768, 769, 834, 1024, 1152, 1200, 1440, 1920 |
| Home | bioa-produce-mobile-clean | 0 | — |
| Home | block-how-works.mobile | +24 | 320 |
| Home | block-product-formats | +59 | 320, 375, 390, 428, 768, 1440, 1920 |
| Home | block-right-choice.mobile | +134 | 320, 375, 390, 428, 768 |
| Home | block-roadmap | 0 | — |
| Home | block-we-produce | 0 | — |
| Home | block-how-works.desctop | +62 | 769, 834 |
| Home | block-right-choice.desctop | +11 | — |
| About | mwa-produce | 0 | — |
| Cosmetic Manufacturing | bioa-cosmetics-categories | 0 | — |
| Cosmetic Manufacturing | block-we-conduct | +27 | 320, 769, 834 |

## 5. Interaction and regression checks

| Check | Result |
|---|---|
| Sliders: Why Choose (mobile), How We Work desktop + mobile, packaging, all on Home / Cosmetics | All reach their last slide before and after; slide heights stay equal within each slider |
| Noise floor | Differences measured on the byte-identical **VI** pages (animated hero counters, cookie banner / chat teaser timing, autoplay collaboration-paths slider) are listed as noise, not as D1 changes |
| Cosmetics "Collaboration paths" card-row flag | Same variation on the VI page, which is byte-identical (autoplay slider): noise, the section was not edited |
| R28b icons / popup, R28d-A chat form, Header / Footer, Blog TOC / 301 | Byte-identical HTML (scope gate). Browser suites: see `QA` in `START_HERE.md` |

## 6. Screenshots

`evidence/r28d-d1/before/shots/` and `after/shots/` (Chrome, 320 / 390 / 834 / 1024 / 1440).
- Each changed section: Hero, Why Choose, We Produce desktop + mobile, How We Work, product formats, Built For, Roadmap, About categories, Cosmetics categories / QC.
- File name: `<engine>-<route>-<width>-<section>.png`.
- VI (`_`) and EN (`_en_`) before / after pairs.
