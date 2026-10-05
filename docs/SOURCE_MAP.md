# BIO-A GROUP — SOURCE MAP

Purpose: lightweight lazy index between the owner's original Merywood source and the BIO-A implementation.

Rules:
- Do not scan the entire Merywood source to populate this file.
- Add or refine an entry only after that component is actually investigated.
- Reuse an existing confirmed mapping before searching again.
- UNKNOWN means "not yet mapped", not "missing".
- Source ZIP path names refer to the owner-supplied Merywood export, not files committed to this repository.

## Home Header / Brand Logo

Merywood:
- source: merywood/pages/index/index.html
- main selector: .header__logo
- mobile/menu logo is part of the same source header/menu system.

BIO-A:
- file: bioa-home-refine.mjs
- function: setLogo($)
- main selectors: .header__logo img, .menu__logo img
- BIO-A asset: /assets/bioa-full.svg

Responsive status:
- Desktop: PASS / LOCKED for the previously accepted desktop header visual state.
- Tablet: PENDING — not independently verified under the three-surface rule.
- Mobile: PROTECTED — previous accepted/protected mobile state exists.
- FULL RESPONSIVE PASS: NO.
- Mapping confirmed.

Responsive ownership:
- Desktop selectors: .header__logo and source header structure.
- Tablet breakpoint/mechanics: PENDING targeted source inspection when Header is next modified.
- Mobile/menu selectors: source header/menu system; existing BIO-A mobile header logic remains protected.

Protected mechanics:
- source header layout, positioning, spacing, hover and responsive mechanics must remain source-derived.
- logo must preserve BIO-A aspect ratio and must not be cropped.

## Hero / Stats

Merywood:
- source: merywood/pages/index/index.html
- main area: home title/hero block
- main selector: .info.desctop
- stats item selectors include .item, .item__number and .item__text

BIO-A:
- file: bioa-home-refine.mjs
- relevant rules: patchHeroStatsSourceCss, patchHeroStatsOriginalTypeCss, patchHeroStatsFinalSourceCss
- source-parity intent is documented directly in those rules.

Responsive status:
- Desktop: PROTECTED / previously approved state.
- Tablet: PENDING — not independently verified under the three-surface rule.
- Mobile: PROTECTED / previously approved state where applicable.
- FULL RESPONSIVE PASS: NO.
- Mapping confirmed.
- Do not assume later post-baseline hero hotfixes are authoritative.

Responsive ownership:
- Desktop: .info.desctop and related stats rules.
- Tablet: PENDING exact Merywood media-query mapping.
- Mobile: mobile hero/stats selectors in the source/BIO-A counterpart when next inspected.

Protected mechanics:
- typography should come from original Merywood source where possible.
- geometry changes must be limited to what BIO-A content length requires.
- desktop, tablet and mobile must be verified independently.

## We Produce

Merywood:
- source: merywood/pages/index/index.html
- section selector: .block-we-produce
- slider structure uses .swiper, .swiper-wrapper, .swiper-slide and .swiper-button_*.
- source brand decoration includes Merywood logo/watermark artwork.

BIO-A:
- file: bioa-home-refine.mjs
- selectors include .block-we-produce and .block-we-produce .bg__decoration
- brand decoration uses /assets/bioa-monogram.svg
- mobile handling is invoked through replaceMobileProduceSection($, lang).

Responsive status:
- Desktop: PASS / LOCKED.
- Tablet: PENDING — legacy documentation did not independently verify Tablet.
- Mobile: PASS / LOCKED.
- FULL RESPONSIVE PASS: NO until Tablet is owner-confirmed.
- Mapping confirmed.

Responsive ownership:
- Desktop: .block-we-produce source slider/card system.
- Tablet: PENDING exact source media-query mapping; do not inherit Mobile assumptions.
- Mobile: source mobile Produce behavior + BIO-A replaceMobileProduceSection($, lang).

Protected mechanics:
- preserve original slider DOM, navigation, hover and responsive behavior.
- only brand watermark/identity should be replaced unless the owner requests more.

## Footer

Merywood:
- source: merywood/pages/index/index.html
- main selectors: #footer.footer, .footer-top, .footer-top__logo, .footer-top__email, .footer-top__socials, .footer-bottom

BIO-A:
- file: bioa-home-refine.mjs
- function: setLogo($) for footer logo
- function: footerSocials($)
- function: buildMobileFooterV2($)
- main footer logo selectors: .footer-top__logo img, .footer__logo img
- BIO-A dark-background asset: /assets/bioa-full-light.svg

Responsive status:
- Accepted checkpoint: c3ad6b129502973e89ec321211e9d911a919544c.
- Desktop: PASS / LOCKED.
- Tablet: PASS / LOCKED.
- Mobile: PASS / LOCKED.
- FULL RESPONSIVE PASS — OWNER CONFIRMED.
- Footer D1 categories are being revised from legacy BIO-A source data.
- Footer D3-REV uses owner-directed inverted contrast: #116F47 background + cream foreground.
- Mapping confirmed.

Responsive ownership:
- Desktop: original Merywood footer DOM and BIO-A footer refinements.
- Tablet: Merywood uses the same footer DOM above its 768px mobile split; BIO-A needs a content-safe intermediate-width adaptation without rewriting the source structure.
- Mobile: buildMobileFooterV2($) plus source footer structure; must be regression-checked independently.

Protected mechanics:
- keep original Merywood footer DOM/layout mechanics and section relationships.
- current footer is dark/logo-green and therefore uses the light BIO-A logo.
- D2 font-weight behavior is LOCKED.
- footer brand colors must follow docs/BRAND_PALETTE.md.
- do not add extra brand information that changes footer geometry unless requested.

## Chat / Contact Widget

Merywood:
- source bootstrap: merywood/pages/index/index.html
- original source loads Dashly runtime near the document head.
- the exported page does not provide a local reusable implementation of Dashly's injected panel internals.
- do not reuse or reconnect Merywood Dashly account/credentials.

BIO-A:
- file: bioa-home-refine.mjs
- function: addContactLauncher($, lang)
- root: #bioa-contact-fab / .bioa-contact-fab
- panel: .bioa-contact-fab__panel
- internal selectors: .bioa-chat__*
- current functional baseline implementation originates from commit 54a0248514d920fc1b2cecc7deb8238b37a463ad.

Responsive status:
- Accepted commit: b4c5e94f966ee6283a8b63c82e9ceb3c543e1214.
- Desktop: PASS / LOCKED based on owner-confirmed tested behavior.
- Tablet: PENDING — not independently verified under the three-surface rule.
- Mobile: PENDING unless separately owner-confirmed in a future runtime test.
- FULL RESPONSIVE PASS: NO.
- Mapping confirmed.

Responsive ownership:
- Desktop: .bioa-contact-fab / .bioa-contact-fab__panel / .bioa-chat__*.
- Tablet: PENDING exact source/runtime breakpoint comparison; do not infer from another surface.
- Mobile: current @media(max-width:768px) BIO-A chat rules plus source interaction reference.

Protected mechanics / decisions:
- one BIO-A avatar in header;
- compact Merywood-style shell;
- one contact row for WhatsApp, Facebook, Telegram and Zalo;
- no History cards or duplicated provider line;
- launcher hidden while panel is open;
- panel radius uses the accepted compact shell treatment;
- composer is one integrated input/send shell with DNA-green send button;
- panel open/close motion is anchored to the bottom-right launcher;
- source interaction feel should be preserved;
- Dashly credentials are not part of BIO-A architecture.

## Brand Watermarks / Background Logos

Merywood:
- source: merywood/pages/index/index.html
- source brand artwork includes logo-bg.svg references.

BIO-A:
- file: bioa-home-refine.mjs
- function: replaceBrandWatermarks($)
- primary BIO-A replacement: /assets/bioa-monogram.svg

Status:
- Mapping confirmed.
- Exact target section must still be identified per request before editing.

Protected mechanics:
- replace brand traces only.
- do not treat neutral decorative/product artwork as Merywood branding.


## Home CTA / Slider Controls / Reviews

Merywood:
- source: merywood/pages/index/index.html
- CTA text node: .btn__text
- slider controls: .swiper-button, .swiper-button_left, .swiper-button_right
- review cards: .block-reviews .review

BIO-A:
- file: bioa-home-refine.mjs
- H1: localizeHomeCtas($, lang)
- H2: patchH2HomeControlPaletteCss

Responsive status:
- Desktop: PASS / LOCKED.
- Tablet: PASS / LOCKED.
- Mobile: PASS / LOCKED.
- FULL RESPONSIVE PASS — OWNER CONFIRMED.

Protected mechanics:
- H1 changes exact-match "Get started" text only on VI Home.
- H2 changes palette only; control geometry/positioning and slider mechanics remain source-owned.
- Review slider DOM, dimensions and movement remain unchanged.

## Home Mobile Contact CTA

Merywood:
- source: merywood/pages/index/index.html
- root: .whatsapp
- watermark layer: .whatsapp__logo
- CTA: .whatsapp__btn
- source mobile rule hides .whatsapp__logo at max-width:768px.

BIO-A:
- file: bioa-home-refine.mjs
- function: refineMobileContactCta($, lang)
- CSS: patchH3MobileContactCss
- CTA target: company.zalo

Responsive status:
- Desktop: PASS / LOCKED.
- Tablet: PASS / LOCKED.
- Mobile: PASS / LOCKED for layout/content/link behavior.
- FULL RESPONSIVE PASS — OWNER CONFIRMED for H3 behavior.
- Zalo icon artwork is reopened as a separate visual patch.

Protected mechanics:
- source .whatsapp box dimensions/spacing remain unchanged;
- only mobile watermark visibility/treatment and CTA content/target are changed.

## Packaging / Airless Product Slider Watermark

Merywood:
- source: merywood/pages/index/index.html
- desktop section: .block-products-desctop
- mobile section: .block-products-mobile
- watermark layer: .product__composition-bg-logo
- product image: .product__composition-image
- navigation: .swiper-button
- indicators/swiper mechanics remain source-owned.

BIO-A:
- file: bioa-home-refine.mjs
- CSS: patchH4PackagingWatermarkCss
- watermark asset/treatment: /assets/bioa-monogram.svg using the same mask/color/opacity family as We Produce.

Responsive status:
- Desktop: PASS / LOCKED.
- Tablet: PASS / LOCKED.
- Mobile: PASS / LOCKED.
- FULL RESPONSIVE PASS — OWNER CONFIRMED.

Protected mechanics:
- do not change section layout;
- do not change product image;
- do not change left/right text;
- do not change navigation arrows;
- do not change indicators;
- do not change spacing.

## Not yet lazily indexed

The following are intentionally not expanded here until a future patch actually investigates them:
- product/service sections not listed above;
- reviews;
- forms/modals;
- knowledge/content pages;
- other subpages;
- any remaining Merywood animations not tied to an active patch.

Do not pre-scan these areas solely to fill this file.

## Zalo Icon Artwork

Owner source:
- framed cream Zalo icon supplied in chat on 2026-10-05.

BIO-A:
- asset: /assets/zalo-bioa-framed-cream.png
- rendered by Home/Footer/Chat/mobile CTA and subpage footer Zalo links.

Responsive status:
- Desktop: ACTIVE — visual-only candidate after b8b94be visual FAIL.
- Tablet: ACTIVE — visual-only candidate after b8b94be visual FAIL.
- Mobile: ACTIVE — visual-only candidate after b8b94be visual FAIL.
- FULL RESPONSIVE PASS: NO for this artwork patch.

Current visual rule:
- keep existing button/container dimensions;
- use tightly cropped framed-cream artwork;
- Footer desktop Zalo: 42px;
- Footer tablet Zalo: 39px;
- Footer mobile Zalo: 32px;
- Chat Zalo: 34px;
- CTA Zalo: 30px;
- Zalo hover keeps green/translucent background and cream artwork; it must not invert to a full cream button;
- Telegram glyph receives a visual-only translateX(-1px) in Footer/Mobile Footer/Chat to correct optical centering.

Protected:
- Zalo hrefs;
- social/contact container sizes;
- spacing;
- hover behavior;
- chat geometry/motion;
- Footer/Home layouts.

## Zalo Circular Icon

Owner source:
- circular Zalo icon supplied on 2026-10-05.

BIO-A:
- asset: /assets/zalo-bioa-circle-cream.svg
- cream circle: #FDFEF5
- Zalo wordmark: #116F47

Render sizes:
- Footer desktop: 30px
- Footer tablet: 28px
- Footer mobile: 26px
- Chat: 28px
- CTA: 24px

Protected:
- container geometry;
- Zalo hrefs;
- spacing;
- Home/Footer/Chat layout;
- Telegram centering correction.

## Home Mobile Zalo CTA Alignment

Merywood:
- .whatsapp__btn mobile geometry: width 100%, height 54px, padding 0 20px, radius 16px.
- .whatsapp__btn .btn__icon mobile slot: 18x18px.

BIO-A:
- Zalo circular artwork: 24x24px in CTA.
- patchH3MobileContactCss synchronizes the mobile icon slot to 24x24px and centers icon/text.

Status:
- Desktop: PROTECTED
- Tablet: PROTECTED
- Mobile: ACTIVE
- FULL RESPONSIVE PASS: NO for this CTA correction until owner confirms.

Protected:
- CTA width/height/padding/radius;
- CTA link;
- section geometry;
- watermark;
- Desktop/Tablet layout.


## Home Completion — Desktop + Mobile First

Owner direction:
- Desktop: ACTIVE
- Tablet: DEFERRED / PENDING
- Mobile: ACTIVE

BIO-A files:
- bioa-transform.mjs — paired VI/EN content + brand/head identity
- bioa-home-refine.mjs — Home visual/runtime refinements + mobile MOQ layout
- build.mjs — Home uses applyHomeRefinement; subpages use applySharedShell

Current mappings:
- Browser identity: titleFor / applyBrandHead
- Hero/company identity: resetHomeVI / resetHomeEN / finalizeHomeCopy
- We Produce: setProduceCopy
- Packaging/Airless: setPackagingCopy
- Product formats: setFormatsCopy
- Right Choice: setRightChoiceCopy
- Mobile MOQ: patchH5CMobileMoqCss + finalizeHomeCopy
- Shared Header/Footer: applySharedShell

Source authority:
- Merywood Home DOM/layout remains source-of-truth.
- Legacy BIO-A ZIP provides real service/category terminology.
- Missing dynamic legacy copy may use concise placeholders, paired VI/EN.

Status:
- Desktop: NEEDS OWNER RUNTIME TEST
- Tablet: DEFERRED / PENDING
- Mobile: NEEDS OWNER RUNTIME TEST


## Home Regression — Why Choose / Produce / Mobile MOQ

Merywood source verification:
- Why Choose Desktop: #why-choose-us .grid .item (4 items)
- Why Choose Mobile: #why-choose-us .mobile .item (4 items)
- We Produce source title: .block-we-produce .item__title > p
- We Produce source body: .block-we-produce .item__text > p
- Mobile Packaging MOQ number: .block-products-mobile .info__item-text-1
- Mobile Packaging MOQ description: .block-products-mobile .info__item-text-2 > p

BIO-A ownership:
- bioa-transform.mjs
  - resetHomeVI / resetHomeEN map both Why Choose DOM trees.
  - setProduceCopy must preserve source <p> wrappers.
  - finalizeHomeCopy owns Desktop big-label MOQ and Mobile info MOQ separately.
- bioa-home-refine.mjs
  - replaceMobileProduceSection content must mirror Desktop Bio-A Produce copy.
  - patchH5CMobileMoqCss targets .block-products-mobile .info__item-text-1.

Status:
- Desktop: ACTIVE FIX CANDIDATE
- Tablet: DEFERRED / PENDING
- Mobile: ACTIVE FIX CANDIDATE
- Header/Footer: PASS / LOCKED


## We Produce Emergency Rollback

PASS checkpoint:
- 3c88798b52222aa2e6c4baa1ab4a8b827c169279
- Desktop: PASS / LOCKED
- Mobile: PASS / LOCKED
- Tablet: PENDING

Key finding:
- PASS checkpoint had no setProduceCopy() in bioa-transform.mjs.
- Current component CSS/runtime code matched the PASS-era We Produce chain.
- Regression source was the later Desktop/source DOM content mutation.

Current authority:
- Desktop We Produce: Merywood source DOM/content/layout is untouched by finalizeHomeCopy().
- Mobile Produce: existing custom BIO-A replacement remains.
- Header/Footer: protected current PASS authority.
