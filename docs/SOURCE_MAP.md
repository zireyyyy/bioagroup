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


## HOME-VI1 — We Produce text-only localization

Merywood DOM authority:
- .block-we-produce > .container > .grid > .item
- .item__title > p
- .item__text > p

BIO-A:
- bioa-transform.mjs
- localizeWeProduceSourceText($, lang)

Rule:
- Only text nodes inside the source <p> elements may be changed.
- Do not add layout/stacking/positioning CSS while localizing this locked component.

Status:
- Desktop: ACTIVE CANDIDATE
- Mobile: existing custom BIO-A mobile Produce remains protected
- Tablet: PENDING / DEFERRED

## COOKIE-B1 — Cookie brand logo

Merywood:
- #mw-consent .mw-brand .mw-logo is the brand logo.
- #mw-gear uses cookie.svg and is a neutral functional cookie icon.

BIO-A:
- bioa-transform.mjs
- brandCookieBanner($)
- .mw-logo -> /assets/bioa-monogram.svg

Protected:
- consent JS/state;
- buttons;
- cookie gear;
- cookie modal geometry.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING

## MOTION-M1 — Home scroll reveal

Reference:
- supplied skl-index.html reveal system.
- Source behavior: opacity/translate transition + one-time IntersectionObserver activation.

BIO-A:
- bioa-home-refine.mjs
- patchMotionM1Css
- addHomeReveal($)

Selected behavior:
- fade-up only, milder than SKL;
- optional short stagger delays;
- threshold .08;
- rootMargin bottom -36px;
- one-time reveal;
- reduced-motion safe.

Explicitly excluded:
- We Produce;
- Header;
- Footer;
- Chat;
- Cookie;
- swiper-slide transform owners.

Status:
- Desktop: PENDING
- Tablet: PENDING / page layout still deferred
- Mobile: PENDING

## CHAT-C6 — Proactive BIO-A sales chat

Merywood:
- source pages load external Dashly for proactive chat behavior.
- Dashly credential/provider is not reusable project authority.

BIO-A:
- bioa-home-refine.mjs
- patchC6ProactiveCss
- addContactLauncher($, lang)
- assets/bioa-sales-avatar.webp

Behavior:
- teaser appears after 4.2 seconds or meaningful scroll;
- teaser/avatar opens BIO-A panel;
- teaser can be dismissed;
- employee avatar is used in launcher/header/messages;
- desktop panel is slightly larger than prior BIO-A chat;
- mobile panel/teaser are constrained to avoid excessive viewport coverage;
- no external chat provider is connected.

Shared ownership:
- Chat CSS/runtime is included in the shared shell for current BIO-A routes.
- Header/Footer logic remains protected and unchanged.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING


## CONTENT BUDGET AUTHORITY

File:
- docs/CONTENT_GUIDE.md

Rule:
- Home text samples must be sized against the original Merywood visible-character load.
- Normal paragraph/card copy target: ~80–100% of source character count.
- Do not exceed source by >10% without three-surface runtime verification.
- Do not change component geometry to force longer copy into a source-owned layout.

## MOTION-M2

Reference:
- supplied SKL reveal system.

BIO-A:
- bioa-home-refine.mjs
- patchMotionM2Css
- addHomeReveal($)

Change from M1:
- 36px / .9s source-like reveal strength;
- later observer trigger for clearer visibility;
- target list unchanged;
- We Produce / Header / Footer / Cookie / Chat / swiper transforms protected.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING

## CHAT-C6A Avatar Fit

BIO-A:
- assets/bioa-sales-avatar.webp
- patchC6ProactiveCss

Rule:
- preserve pre-existing avatar/launcher frame sizes;
- employee image must be fit into the frame without face zoom/crop;
- object-fit: contain;
- centered image positioning.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING


## ROADMAP-R1

Authority:
- rollback target: 1ce91e97e479fda03e116e637e4b1ddb449a26ce
- component: .block-roadmap only

Rule:
- roadmap title/step text payload restored to 1ce copy;
- no DOM/CSS/layout rollback outside roadmap;
- longer How It Works copy remains independent.

## MOTION-M3

BIO-A:
- bioa-home-refine.mjs
- patchMotionM3Css
- addHomeReveal($)

Section-level targets:
- #why-choose-us > .container
- .block-how-works > .container
- .block-products-desctop/mobile > .container
- .block-product-formats > .container
- .block-reviews > .container
- .block-right-choice > .container
- .block-roadmap > .container
- contact CTA content

Protected:
- .block-we-produce
- swiper-slide transforms
- Header/Footer
- Cookie/Chat runtime mechanics

## CHAT-C6B

Asset authority:
- /assets/bioa-sales-avatar.webp
- must contain the complete owner-provided square artwork including employee portrait + BIO-A logo.
- do not crop/recompose/remove logo.

Frame authority:
- keep existing chat/launcher/avatar dimensions.
- fit image with object-fit:contain.


## CHAT-C7

Display authority:
- Khánh Như Bio-A

Locations:
- proactive teaser heading;
- chat panel title;
- intro message author;
- generated reply author.

Protected:
- accepted full employee artwork;
- avatar frame geometry;
- chat panel geometry;
- channel links and interactions.

## MOTION-M4

Home-wide whole-section reveal targets:
- .block-we-produce > .container
- #why-choose-us > .container
- .block-how-works > .container
- .block-products-desctop > .container
- .block-products-mobile > .container
- .block-product-formats > .container
- .block-reviews > .container
- .block-right-choice > .container
- .block-roadmap > .container
- final contact CTA content

Effect:
- fade in;
- 38px lift;
- scale(.985) to 1;
- clip-path inset opening to full frame;
- slight saturation recovery.

Important:
- We Produce inclusion is explicitly owner-approved.
- Only its outer container animates; internal cards/images/text mechanics remain source-owned.

## ROADMAP-R2

Ownership:
- bioa-transform.mjs / resetHomeVI + resetHomeEN / roadmapSteps only.

Rules:
- Roadmap copy is independent from How It Works.
- Keep the PASS Roadmap DOM/CSS/layout.
- Use a guarded medium-length copy payload after the previous near-source-length attempt caused a runtime regression.
- Do not add CSS, font changes or height overrides to accommodate Roadmap copy.


## MOTION-M5

Reference authority:
- supplied SKL:
  - .rv translateY(36px)
  - .rvl translateX(-56px)
  - .rvr translateX(56px)
  - .9s cubic-bezier(.16,1,.3,1)

BIO-A adaptation:
- combine horizontal x offset with +34px vertical lift;
- alternate left/right by Home section;
- mobile uses 55% horizontal offset + 24px lift;
- no clip-path, scale or saturation effect.

Protected:
- only outer section containers receive transform;
- internal sliders/cards/images stay source-owned.

## ROADMAP-R3

Merywood source authority:
- .block-roadmap .step__text > p contains explicit <br> tags.
- source uses roughly 4–6 visual lines per Roadmap slide.

BIO-A:
- roadmapSteps body is an array of source-style lines;
- existing <p> receives line1<br>line2<br>...;
- title/DOM/CSS/layout unchanged.

Status:
- Desktop: PENDING
- Tablet: DEFERRED
- Mobile: PENDING


## HERO-NUM1 — Hero statistic count-up

BIO-A:
- bioa-home-refine.mjs
- addHeroCounters($)

Targets:
- .block-title .info .item__number
- .block-title-continue .info .item__number
- .block-title-mobile .info .item__number

Contract:
- animate numeric metrics from 0 to the existing final value;
- preserve grouping and suffixes (+ / m²);
- OEM/ODM remains static;
- run once per DOM node;
- runtime-only, no layout/typography changes.

## FOOTER-HOVER1

BIO-A:
- bioa-home-refine.mjs
- patchFooterHover1Css

Desktop:
- child links move +5px;
- underline reveals left-to-right;
- cream emphasis.

Protected:
- headings;
- grid/spacing;
- Tablet/Mobile layout;
- existing Footer PASS styling.


## FOOTER-INFO1

BIO-A:
- bioa-home-refine.mjs
- company.address / company.phoneIntl / company.taxId
- patchFooterInfo1Css
- addFooterCompanyInfo($)

Desktop ownership:
- .footer-top__left
- append official company information under the accepted Bio-A logo.

Tablet ownership:
- responsive company info row is centered before category columns;
- do not widen the accepted 88px logo column.

Mobile ownership:
- buildMobileFooterV2() remains contact-row owner;
- addFooterCompanyInfo() inserts company information immediately after .bioa-footer-mobile-v2;
- category menu remains after that row.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING

## MOTION-U1 — UNILA-derived Home element motion

Supplied UNILA ZIP authority:
- fade-up: translate3d(0,100px,0)
- fade-right: translate3d(-100px,0,0)
- fade-left: translate3d(100px,0,0)
- homepage element duration: 700ms
- delays: primarily 300ms / 600ms
- once: true
- offset: 150
- source CountUp: triggered around 50% viewport

BIO-A:
- bioa-home-refine.mjs
- patchMotionU1Css
- addHomeReveal($)

Design rule:
- animate section internals in sequence instead of moving the entire section wrapper.
- preserve Merywood internal runtime transforms.
- never target .swiper-wrapper.

Responsive adaptation:
- Desktop: source-like 100px motion.
- Tablet: 72px.
- Mobile: 54px vertical and 34px horizontal with small vertical lift.

Status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING

## ROADMAP-R4 — Motion transform ownership guard

Merywood:
- source: merywood/pages/index/index.html
- component: .block-roadmap
- repeated card/slide nodes: .block-roadmap .step
- text owner: .step__text > p with source-style explicit <br> line breaks.

BIO-A:
- file: bioa-home-refine.mjs
- function: addHomeReveal($)

Rule:
- .block-roadmap .step must remain source/runtime transform-owned.
- MOTION-U1 must NOT add data-bioa-aos or transform transitions to repeated Roadmap .step nodes.
- Safe reveal target: .block-roadmap > .container > .title-wrapper only.
- Roadmap R3 text/line-break ownership remains unchanged.

Reason:
- owner runtime testing showed repeated Roadmap step transforms regress Desktop slider/card geometry and produce excessive Mobile blank height/whitespace.

Status:
- Desktop: ACTIVE FIX CANDIDATE.
- Tablet: REGRESSION CHECK / PENDING.
- Mobile: ACTIVE FIX CANDIDATE.

## FOOTER-INFO1B — company-information hierarchy / spacing

BIO-A:
- bioa-home-refine.mjs
- patchFooterInfo1Css
- addFooterCompanyInfo($)
- footerInfoIcons

Desktop ownership:
- .footer-top__wrapper is rebalanced only above 1200px into identity / navigation / contact zones.
- .footer-top__menu remains four source-derived BIO-A navigation groups with tighter column gaps.
- company title is protected from wrapping at normal Desktop widths.

Tablet ownership:
- existing FOOTER-D5B 769–1200 grid remains authority and is not structurally changed.

Mobile ownership:
- .bioa-footer-company-info--responsive remains after .bioa-footer-mobile-v2.
- text is centered.
- address / phone / tax labels are replaced visually by inline icons; official values are unchanged.

Protected:
- footer colors;
- D2 typography hierarchy;
- category labels/links;
- email/social controls;
- mobile block order;
- footer hover behavior.

## MOTION-U1M — Mobile timing adaptation

BIO-A:
- bioa-home-refine.mjs
- patchMotionU1Css
- addHomeReveal($)

Mobile <=768px only:
- transition duration: 500ms;
- delay scale: 55% of the existing UNILA stagger variable;
- fade-up: 42px;
- horizontal entry: ±28px + 12px lift;
- observer bottom offset: 80px.

Protected:
- Desktop MOTION-U1 is PASS / LOCKED and must retain 700ms / 100px / source-like delay rhythm.
- Tablet remains unchanged.
- Roadmap .step remains excluded.
- swiper-wrapper is never targeted.

## MOBILE-NAV-ARROW1 — CTA vector parity

Merywood/BIO-A reference:
- source CTA: .header__btn .btn__icon
- BIO-A mobile nav: .bioa-mobile-nav-links

Rule:
- mobile nav arrows must clone the CTA icon DOM/vector rather than use a Unicode arrow character.
- do not use ↗ / → pseudo-content for mobile nav because iOS may render emoji glyphs.

Protected:
- header CTA itself;
- desktop navigation;
- burger/open-close mechanics;
- mobile nav text/spacing/contact controls.

## WHY-ICON1 — Why Choose artwork parity

Merywood:
- Desktop: #why-choose-us .grid.desctop > .item
- Mobile: #why-choose-us .mobile .item
- source artwork order differs between surfaces: Desktop 01/02/03/04; Mobile 01/04/03/02.

BIO-A:
- bioa-home-refine.mjs
- syncWhyChooseIcons($)
- patchWhyChooseIconCss
- assets/bioa-monogram-cream.svg

Authority:
- owner requests Desktop positional artwork mapping to be used on Mobile.
- position 04 is Bio-A-owned and uses the cream Bio-A monogram.
- source card geometry, numbering, text, spacing and responsive layout remain untouched.

## SLIDER-END1 — non-loop endpoint visual state

BIO-A:
- bioa-home-refine.mjs
- patchSliderEndpointCss

Targets:
- .block-how-works
- .block-products-desctop
- .block-products-mobile
- .block-roadmap

Rule:
- style only source/Swiper disabled states (.swiper-button-disabled / aria-disabled=true).
- never change loop, navigation events, slide counts, wrapper transforms or active-button geometry.

## SLIDER-END2 — restore Merywood disabled authority

BIO-A:
- bioa-home-refine.mjs
- patchH2HomeControlPaletteCss

Rule:
- Bio-A green palette applies only to enabled .swiper-button controls.
- disabled controls (.swiper-button-disabled or aria-disabled=true) must not receive BIO-A palette overrides.
- do not add replacement disabled-state CSS; Merywood source remains the visual/runtime authority.

## WHY-ICON1A — preserve icon 03 detail

Rule:
- Why Choose source icon 03 must not receive the whole-image cream filter because it destroys the inner certification/check detail.
- Desktop icon 03 source artwork is authoritative and is mirrored to Mobile position 03.

## COOKIE-C2 — consent presentation and persistence

Merywood source:
- consent categories: Functional, Statistics (Analytics/GA4), Marketing/Ads;
- source runtime owns whether the first-visit modal is shown and remembers a prior choice.

BIO-A:
- bioa-transform.mjs: brandCookieBanner($), VI consent copy.
- bioa-home-refine.mjs: patchCookieConsentCss.

Rules:
- do not force consent modal on every page load after a saved choice.
- do not claim analytics/marketing data is being collected unless the corresponding provider scripts are actually enabled.
- current preview cleanup removes external GTM/GA/Yandex/Dashly trackers; adding GA4/Ads later must respect the saved consent categories.

## SLIDER-END3 — root palette guard

Merywood source:
- pages/index/assets/js/main.js initializes non-loop Swipers using navigation.nextEl / navigation.prevEl.
- Swiper runtime owns endpoint attributes/classes: swiper-button-disabled, disabled, aria-disabled=true.
- source button SVG uses currentColor fill and must remain untouched.

BIO-A root cause:
- bioa-transform.mjs base CSS previously colored every .swiper-button with !important.

Rule:
- base palette may style enabled .swiper-button only.
- disabled endpoint visual state must remain Merywood/Swiper-owned.

## I18N-A1 — site bilingual ownership

Build model:
- one Merywood source route is built into two outputs by build.mjs;
- VI route: /route/
- EN route: /en/route/
- applyFinalFixes($, route, lang) is the shared language-aware transformation entry point.

Shared UI:
- bioa-transform.mjs owns Header/Footer/Cookie/common labels and must branch on lang.

Page content:
- each route owns explicit paired VI/EN content maps.
- Home example: resetHomeVI() / resetHomeEN(), setPackagingCopy($,lang), setFormatsCopy($,lang), etc.

Rule:
- never add Vietnamese-only text to a function that executes for EN.
- do not rely on generic fallback translation for approved production copy.
- each page promotion requires VI + EN visible-content parity review.

## MOTION-U1D2 — Desktop slider speed refinement

BIO-A:
- bioa-home-refine.mjs
- patchMotionU1Css
- addHomeReveal($)

Desktop >1200 only:
- .block-how-works revealed nodes: 560ms; step delay starts at 160ms with 70ms stagger.
- .block-products-desctop revealed nodes: 560ms; swiper delay 160ms.
- .block-reviews revealed nodes: 560ms; delays 160/240ms.

Protected:
- all non-slider Desktop MOTION-U1 timing remains 700ms/source-like.
- Tablet unchanged.
- Mobile MOTION-U1M unchanged.
- Roadmap repeated .step nodes remain excluded.

## COOKIE-C2B — source consent copy authority

EN consent body uses the original Merywood wording supplied/approved by owner.
VI consent body is a faithful translation of the same meaning.
Bio-A policy-change note remains appended in the active language.

## TITLE-CASE1 — Vietnamese heading presentation

BIO-A:
- bioa-home-refine.mjs
- normalizeViTitleCase($,lang)
- viTitleCaseText(value)

Rule:
- VI visual titles/headings use owner-approved Aa Bb capitalization.
- normal paragraph/body sentences remain sentence case.
- preserve Bio-A and technical acronyms exactly.

## MOBILE-MENU-DISMISS1 — natural outside interaction

BIO-A:
- bioa-home-refine.mjs
- patchMobileMenuDismissCss
- syncMobileHeader($,route,lang)

Rule:
- do not hard-lock document scrolling while the compact mobile menu is open.
- outside pointer interaction or page scrolling dismisses the menu.
- scrolling inside .bioa-mobile-nav-drop does not dismiss it.

## COOKIE-TITLE2 — runtime-visible title authority

BIO-A:
- bioa-transform.mjs
- brandCookieBanner($,lang)
- #bioa-cookie-copy-sync

Rule:
- VI visible cookie title is exactly "Quản Lý Cookie".
- final runtime label sync executes after the Merywood consent runtime initializes.
- persistence/state mechanics remain source-owned.

## ZALO-ICON2 — owner-supplied shared artwork

Asset:
- assets/zalo-bioa-owner.png

BIO-A:
- bioa-home-refine.mjs
- icons.zalo
- syncMobileHeader($,route,lang)
- footerSocials($)
- buildMobileFooterV2($)
- chat/contact CTA surfaces
- bioa-transform.mjs footer source normalization

Rule:
- never render plain text "Zalo" when a social icon slot exists.
- use the same asset across shared surfaces.
- parent social-control hover/focus owns interaction; no Zalo-only hover palette override.

## CHAT-C8 — teaser avatar status treatment

BIO-A:
- bioa-home-refine.mjs
- .bioa-chat__teaser-avatar:after

Rule:
- compact teaser popup avatar must not display an online/status dot.
- launcher button status dot remains separate and unchanged unless explicitly requested.

## ABOUT-A1 — /about/ content ownership

Visual/runtime source:
- owner-supplied Merywood export:
  - merywood/pages/about/index.html
- preserved source sections:
  - .mwa-hero
  - .mwa-story
  - .mwa-values
  - .mwa-team
  - .mwa-expo
  - .mwa-produce
  - .mwa-how
  - .mwa-cta-wrap

Bio-A content source:
- owner-supplied BIOA-Website.zip
- cms/pages/about.php
- authoritative legacy content fields:
  - company introduction
  - Vision
  - Mission
  - GMP
  - HACCP

BIO-A route owner:
- bioa-about-refine.mjs
- applyAboutRefinement($,route,lang)

Rules:
- About edits must be scoped to .mwa-* About components.
- Merywood layout/runtime remains authority unless owner explicitly requests a visual patch.
- Shared shell comes from applySharedShell(); do not duplicate Header/Footer/Cookie/Chat/Mobile Menu code in About.
- VI and EN About content must be updated together.

## SHARED-UX1 — cross-route experience authority

Owner:
- bioa-home-refine.mjs
- sharedShellCss
- applySharedShell($,route,lang)
- addSharedPageReveal($,route)
- addHeroCounters($)

All non-Home core routes inherit:
- Home-approved base palette/type;
- Header + Mobile Menu behavior;
- Footer visual hierarchy/hover/company/meta;
- Cookie;
- Chat;
- Zalo;
- Swiper enabled/disabled control palette;
- MOTION-U1 timing framework;
- compatible hero counter behavior;
- Bio-A watermark replacement.

Route modules:
- own content and page-specific selector maps only;
- must not duplicate shared component CSS/runtime.

Motion safety:
- never transform .swiper-wrapper;
- animate slider shell/title, not translation-owning nodes;
- Header/Footer/Cookie/Chat remain outside reveal mapping.

## ABOUT-HERO1 — shared Home hero authority

Visual/runtime authority:
- Merywood/Bio-A Home .block-title + .block-title-continue.mobile.

About:
- .mwa-hero is replaced at build time with the shared Home hero DOM.
- route-specific ownership is limited to title, lead, image and stat values.

Shared CSS:
- patchBCss
- patchB2Css
- patchHeroStatsSourceCss
- patchHeroStatsOriginalTypeCss
- patchHeroStatsFinalSourceCss

Rule:
- do not reintroduce a separate About hero layout.
- future compatible page heroes should reuse .block-title.

## ABOUT-HERO1B — About hero stats parity only

Visual/layout authority:
- Merywood About .mwa-hero remains intact.
- do not replace .mwa-hero with Home .block-title.

Shared stat treatment:
- bioa-home-refine.mjs
- patchSharedHeroStatsParityCss

Verified source difference:
- About .mwa-stat card geometry already matches Home source rhythm.
- About .mwa-stat__n max-width 7.9375rem clips Bio-A values.
- Home PASS number column width is 13.125rem.

Rule:
- align type, card sizing and number/label allocation only.
- never change About hero grid, content position, image position or section dimensions unless explicitly requested.

## ABOUT-PRODUCT-ICON1 — manufacturing category icon authority

About route:
- bioa-about-refine.mjs
- aboutProductIcons
- setAboutProducts($,lang)

Merywood visual authority retained:
- .mwa-isq
- .mwa-isq svg
- .mwa-num
- .mwa-vcard__top

Mapping:
- 01 makeup -> lipstick
- 02 hair care -> comb
- 03 body care -> pump lotion bottle
- 04 facial skin care -> serum/dropper
- 05 personal care -> soap/hygiene
- 06 mother & baby -> baby face

Rule:
- use one coherent 24x24 outline icon family.
- do not alter card layout, icon-square size, number badge, typography or links when changing category artwork.

## ABOUT-PRODUCT-ICON2 — icon visual authority

Route owner:
- bioa-about-refine.mjs
- aboutProductIcons

Visual reference:
- owner-supplied beauty/cosmetics outline icon sheet.

Rules:
- use a coherent 24x24 outline family;
- use rounded 1.65px strokes;
- keep Merywood .mwa-isq as the sole container/size/background authority;
- do not alter product-card geometry or content while changing icon artwork;
- reference image is a style/category guide only; do not trace/copy stock artwork verbatim.

## ABOUT-CTA-LOGO1 — final CTA logo

About route:
- bioa-about-refine.mjs
- setAboutCta($,lang)

Target:
- .mwa-cta__media

Asset:
- /assets/bioa-full.svg
- original Bio-A green: #116F47

Rule:
- replace artwork only.
- preserve Merywood CTA media size, position, background sizing, card geometry and copy.

## ABOUT-PRODUCT-ICON3 — owner artwork authority

Assets:
- assets/about-icon-01-trang-diem.png
- assets/about-icon-02-cham-soc-toc.png
- assets/about-icon-03-cham-soc-body.png
- assets/about-icon-04-cham-soc-da-mat.png
- assets/about-icon-05-ca-nhan.png
- assets/about-icon-06-me-be.png

Route owner:
- bioa-about-refine.mjs
- aboutProductIcons
- setAboutProducts($,lang)

Rule:
- these six owner-supplied PNGs are the artwork source-of-truth.
- only trim/center/resize for web delivery is allowed unless owner requests visual editing.
- preserve .mwa-isq geometry and all card layout/spacing.
- artwork centering is owned by .bioa-about-category-icon-wrap (100% of the existing square); the outer green square is not resized.
- default PNG render box is 36x36px, with narrow optical adjustments only for 02 (38px) and 05 (34px).
- object-fit: contain and object-position: center are mandatory.
- if an owner PNG blob is corrupt, recover from the exact owner-supplied source file rather than redrawing the artwork.



## ABOUT-PRODUCT-ICON4 — optical artwork positioning

BIO-A:
- bioa-about-refine.mjs
- #bioa-about-category-icon-style
- .bioa-about-category-icon--01 ... --06

Rule:
- keep the accepted icon render sizes unchanged;
- compensate only for asymmetric transparent margins inside owner PNGs with per-icon optical translation;
- current offsets: 01(-4,+2), 02(0,-2), 03(+2,+2), 04(-3,0), 05(+3,-1), 06(-4,+1) px;
- .mwa-isq size/background, card geometry, badge, typography, links, motion and responsive structure remain source-owned and must not move.


## PATCH-E1 — /contract-manufacturing-cosmetics/ hub

Merywood source:
- route: /contract-manufacturing-cosmetics/
- source order retained: Hero -> 7-card feature grid -> Packaging -> How It Works -> Reviews -> Certification/Testing/QC -> Full-Cycle Support -> contact CTA.
- Desktop / Tablet / Mobile source layout and responsive mechanics remain authoritative.

BIO-A:
- bioa-cosmetics-refine.mjs
- applyCosmeticsHubRefinement($,route,lang)
- build.mjs calls the route owner only for /contract-manufacturing-cosmetics/.
- applySharedShell() remains the sole owner of Header/Footer/Cookie/Chat/Mobile Menu/language/shared UX after route content mapping.

Content authority:
- legacy BIO-A product groups: Trang Điểm, Chăm Sóc Tóc, Chăm Sóc Body, Chăm Sóc Da Mặt, Cá Nhân, Mẹ & Bé;
- R&D/formula development terminology from current Bio-A Home/About project authority;
- only confirmed GMP/HACCP language is allowed; do not restore Merywood EU/ISO/supplement claims without owner evidence;
- source review cards are presentation containers only and must not be used to invent customer testimonials. E1 labels them as sample collaboration scenarios.

Patch rules:
- content/text mapping only inside .page-main;
- preserve source DOM/layout/images/icons/breakpoints;
- preserve slider/swiper transform owners;
- no route-local Header/Footer/Cookie/Chat duplication;
- VI and EN must stay paired.

Status:
- Desktop / Tablet / Mobile: PENDING OWNER TEST.


## PATCH-E2 — cosmetics hub shared parity

Category artwork:
- source cards remain #why-choose-us .grid/.mobile .item;
- cards 01–06 use the exact /about/ PASS PNGs:
  - about-icon-01-trang-diem.png
  - about-icon-02-cham-soc-toc.png
  - about-icon-03-cham-soc-body.png
  - about-icon-04-cham-soc-da-mat.png
  - about-icon-05-ca-nhan.png
  - about-icon-06-me-be.png
- reuse About accepted optical sizing/offsets exactly:
  01 36px (-4,+2), 02 38px (0,-2), 03 36px (+2,+2),
  04 36px (-3,0), 05 34px (+3,-1), 06 36px (-4,+1).
- card 07 R&D keeps source artwork.

Shared watermark authority:
- bioa-home-refine.mjs / patchSharedBrandWatermarkCss
- .product__composition-bg-logo uses /assets/bioa-monogram.svg through the same mask treatment as Home H4.
- sharedShellCss owns this on subpages; route modules must not duplicate it.

Cosmetics motion authority:
- bioa-home-refine.mjs / addSharedPageReveal()
- dedicated /contract-manufacturing-cosmetics/ branch reuses MOTION-U1 safe targets.
- .swiper-wrapper, .swiper-slide and Roadmap repeated .step nodes remain excluded from reveal transforms.

Global rule:
- every new route must first inherit compatible PASS shared behavior/artwork from Home/About before adding page-specific patches.


## PATCH-E3 — cosmetics hub deep content mapping

Route owner:
- bioa-cosmetics-refine.mjs

Hero:
- .block-info.desctop .composition
- .block-info.mobile .composition
- faded Bio-A overlay: /assets/bioa-monogram.svg
- preserve the source product hero background image and geometry.

Paired content owners:
- applyHeroAndCtas()
- applyPackaging()
- applyFormats()
- applyProcess()
- applyCertification()
- applyQuality()
- applyRoadmap()

Legacy BIOA content authority:
- BIOA-Website.zip / cms/pages/home.php
- BIOA-Website.zip / cms/pages/about.php
- confirmed wording/claims include OEM/ODM, GMP Bộ Y Tế Việt Nam, HACCP, end-to-end support from idea to finished product.
- missing detailed service copy may use concise sample text consistent with those confirmed facts.

Rule:
- do not leave English Merywood service claims in the VI route when the component is mapped;
- map Desktop and Mobile source DOM trees together;
- never reintroduce EU/ISO/supplement claims from Merywood unless separately verified for Bio-A.


## PATCH-E4 — hero artwork and Why Choose authority

Hero:
- /assets/cosmetics-hero-bioa.webp is the route-owned hero artwork.
- It replaces the baked Merywood watermark in the source raster; do not add a second pseudo-element watermark over the product composition.
- .block-info.desctop/.mobile geometry, background-size:cover and background-position:center remain source-authoritative.

Why Choose:
- #why-choose-us keeps the Merywood source DOM and source icons.
- semantic authority: Bio-A capabilities/reasons to choose the manufacturer, not the product-category catalogue.
- product-category catalogue authority remains /about/ .mwa-produce with the six owner PNGs.
- do not call applyCategoryArtwork() for /contract-manufacturing-cosmetics/.


## PATCH-E5 — Why Choose semantic mapping

Route:
- /contract-manufacturing-cosmetics/

Source component:
- #why-choose-us retains the Merywood DOM, source icons, grid and responsive behavior.

Card/icon content authority:
1. factory -> OEM/ODM manufacturing;
2. handshake -> comprehensive support;
3. microscope -> formula R&D / sampling;
4. category/network -> diverse product portfolio;
5. package -> packaging / finishing;
6. connection/flexible -> flexible project solutions;
7. certificate/document -> complete, transparent documentation.

Related content consistency:
- Product Formats supports card 04;
- Packaging supports card 05;
- ready/custom formula Process supports cards 03 and 06;
- Roadmap supports cards 02, 03, 05 and 07;
- Manufacturing/QC sections support card 01 and the route's quality-control language.

Do not reorder these subjects independently of the source icons.
Do not replace card 06 with a sustainability claim without verified Bio-A evidence.


## PATCH-E6/E7 — cosmetics hero + manufacturing categories

E6:
- asset: assets/cosmetics-hero-bioa.webp
- renderer: bioa-cosmetics-refine.mjs / applyHeroArtwork()
- flattened watermark composition; never stack an extra DOM/CSS watermark above products.

E7:
- owner: bioa-cosmetics-refine.mjs / applyManufacturingCategorySection()
- section: #bioa-cosmetics-categories
- placement: after #why-choose-us, before Packaging.
- taxonomy/assets: exact six /about/ accepted categories + about-icon-01...06.
- exact About icon optical sizing/offsets reused.
- 2 columns Desktop/Tablet, 1 column Mobile.
- card watermark: /assets/bioa-monogram.svg.

Motion:
- owner: bioa-home-refine.mjs / addSharedPageReveal()
- head -> fade-up
- six cards -> staggered fade-up

Semantic lock:
- Why Choose = Bio-A capabilities/reasons.
- Manufacturing Categories = product taxonomy.
- never merge these two roles again.


## PATCH-E8 — hero layer authority + MOTION-U1D3

Hero authority:
- assets/cosmetics-hero-bioa.webp is now a true three-layer composite:
  - clean background;
  - Bio-A monogram watermark;
  - original Merywood product/stone/plant foreground.
- no Merywood watermark/repair layer is allowed.
- applyHeroArtwork() remains the route renderer; hero DOM/geometry stays source-owned.

Manufacturing Categories:
- #bioa-cosmetics-categories keeps the E7 layout/content/taxonomy.
- the eyebrow is intentionally removed.
- .bioa-category-watermark uses the same hover scale/opacity rhythm as the accepted Home watermark treatment.

Global motion authority:
- bioa-home-refine.mjs / patchMotionU1Css + addHomeReveal() + addSharedPageReveal().
- MOTION-U1D3 keeps the same effects but shortens duration/delays and triggers IntersectionObserver earlier on Desktop/Tablet/Mobile.
- every new route must inherit this shared timing instead of adding route-local motion timing.
- never attach reveal transforms to Swiper translate-owning wrappers/slides.


## PATCH-E9 — shared header top-state + cosmetics rhythm

Shared Header:
- owner: bioa-home-refine.mjs
- CSS: patchHeaderTopParityCss
- runtime: addHeaderTopParity()
- scroll-top (<=8px): .header transparent / no shadow.
- scrolled: .header receives light readable surface.
- mobile nav open overrides transparent top state for readability.
- applies to Home and all routes through the shared shell.

Cosmetics categories:
- owner: bioa-cosmetics-refine.mjs / #bioa-cosmetics-categories.
- only outer section rhythm changed:
  - Desktop 76px;
  - Tablet 64px;
  - Mobile 52px.
- E7 grid/card/icon/content/motion authority unchanged.

Cosmetics Hero:
- assets/cosmetics-hero-bioa.webp remains flattened layer authority.
- E9 only re-centers the Bio-A watermark within the raster.
- product foreground and source cover/center geometry remain locked.


## PATCH-E10 — Home header wiring / E8 hero restore

Home header:
- patchHeaderTopParityCss must be present in BOTH:
  1. sharedShellCss for subpages;
  2. the applyHomeRefinement() Home-only stylesheet chain.
- addHeaderTopParity() remains the single runtime class owner.
- do not replace this with route-local header architecture.

Cosmetics Hero:
- assets/cosmetics-hero-bioa.webp restored exactly to PATCH-E8.
- E9 optical shift is retired.

Manufacturing Categories:
- outer padding authority:
  - Desktop 44px;
  - Tablet 36px;
  - Mobile 30px.
- internal cards/grid/icons/motion remain E7/E8-owned.


## PATCH-E11 — Cosmetics final semantic lock

/contract-manufacturing-cosmetics/ is now PASS/LOCKED after final icon-copy audit.

Final icon/copy corrections:
- Ready Formula step 04 document icon -> documentation + packaging completion.
- Quality checks visual order:
  1. metal/Zn -> heavy-metal testing;
  2. stability/strength -> stability & sensory review;
  3. leaf -> product-specific safety parameters;
  4. medical/health -> microbiological testing.

Do not reorder or rewrite these independently of their visible icons.
Next route work should inherit all shared PASS behavior from Home/About/Cosmetics.


## PATCH-F1 — Other Services route authority

Route:
- /dich-vu-khac/
- paired route: /en/dich-vu-khac/
- source route: Merywood /hotel-spa-cosmetics/

Owner:
- bioa-services-refine.mjs
- build hook: applyOtherServicesRefinement($,route,lang)
- shared shell remains bioa-home-refine.mjs / applySharedShell().

Source component mapping:
- .block-info -> Other Services hero;
- #why-choose-us -> integrated service pillars;
- .block-right-choice -> six-step support process;
- .block-reviews -> project scenarios (not testimonials);
- .block-how-works -> example product groups.

Content source:
- BIOA-Website.zip legacy wording confirms R&D consultation, packaging/container/label support, documentation/product-notification guidance and flexible project support.
- concise sample content is allowed where Merywood has a visual component without an exact legacy Bio-A section.

Shared locks:
- never duplicate Header/Footer/Cookie/Chat/Mobile Menu/language switch;
- inherit MOTION-U1D3 through applySharedShell();
- preserve Merywood Desktop/Tablet/Mobile DOM and swiper mechanics;
- use paired VI/EN page copy;
- do not introduce EU/ISO or other Merywood-only claims.


## PATCH-F2 — Other Services semantic/icon/motion authority

Visual/runtime source remains:
- Merywood /hotel-spa-cosmetics/
- do not switch the whole route to Private/White Label cosmetics unless the owner explicitly reopens layout architecture.

Why this source stays:
- exact compact 5-card service-pillar component;
- exact 6-step workflow component;
- source-owned product-range swiper;
- less duplication with the PASS /contract-manufacturing-cosmetics/ page.

Bio-A service-pillar content authority:
1. Sản Xuất & Gia Công Dược Mỹ Phẩm
2. Đóng Gói & Sang Chiết Mỹ Phẩm
3. Đăng Ký Thương Hiệu & Công Bố
4. Chai Lọ Mỹ Phẩm
5. Thiết Kế Bao Bì Mỹ Phẩm

Icons:
- assets/service-icon-01-manufacturing.svg
- assets/service-icon-02-packing.svg
- assets/service-icon-03-documentation.svg
- assets/service-icon-04-containers.svg
- assets/service-icon-05-label-design.svg
- exact artwork copied from supplied Merywood source; no generated/recreated icon.
- product-range repeated icon = assets/bioa-monogram-cream.svg.

Motion:
- bioa-home-refine.mjs / addSharedPageReveal() owns /dich-vu-khac/ motion.
- mark safe content nodes only; never swiper-wrapper or swiper-slide.


## PATCH-F3 — Other Services monogram/range/VI audit

Service artwork:
- #why-choose-us service cards use assets/bioa-monogram-cream.svg in the original icon slots.
- Product Range icons use the same monogram.
- route no longer depends on service-icon-01...05 for visible service cards.

Product Range:
- owner: bioa-services-refine.mjs / applyRange().
- source seven steps are expanded to 12 by cloning source .step nodes before Swiper runtime.
- numbering is set from data index.
- original seven source product images remain.
- added product groups use assets/cosmetics-hero-bioa.webp as a neutral Bio-A composition.
- never clone/modify runtime Swiper duplicate nodes after initialization.

Shared CTA localization:
- owner: bioa-home-refine.mjs / refineMobileContactCta().
- title, description and button are now paired VI/EN.
- this fix applies to all routes, not only /dich-vu-khac/.

VI route source-leak guard:
- bioa-services-refine.mjs / localizeResidualSourceText().
- exact known Hotel/SPA headings are translated only on lang=vi.


## PATCH-F4 — Other Services icon scope + Swiper hierarchy

Icon scope:
- #why-choose-us service cards: restore F2 semantic icons service-icon-01...05.
- .block-right-choice workflow:
  - item 03 only -> assets/bioa-monogram-cream.svg because source Frame-85.svg is Merywood brand artwork;
  - all other workflow icons remain source-owned.
- Product Range .step__icon remains Bio-A monogram.

Product Range structure:
- source authority: .swiper-wrapper > .swiper-slide > .step.
- applyRange() may expand to 12 only by cloning complete .swiper-slide nodes into .swiper-wrapper.
- never append .step directly inside an existing slide.
- both Desktop and Mobile source blocks use this rule.
- Swiper initialization/navigation remains source-owned.


## PATCH-F5 — Other Services Product Range source parity

Source authority:
- Merywood /hotel-spa-cosmetics/ -> "Our Product Range".
- Keep exactly seven concrete product slides:
  Shower Gel, Shampoo, Conditioner, Soap, Body Cream, Lotion, Scrub.

Bio-A mapping:
- VI heading: "Danh Mục Sản Phẩm".
- EN heading: "Product Range".
- existing seven Merywood product images remain source-owned.
- only .step__icon artwork becomes assets/bioa-monogram-cream.svg.

Do not expand this block into broad manufacturing taxonomies.
Those belong to /contract-manufacturing-cosmetics/.
Do not clone swiper slides for this block.


## PATCH-F6 — Other Services single-showcase authority

/dich-vu-khac/ no longer uses #why-choose-us as a visible service grid.
Do not restore it unless owner explicitly requests a second service-summary layer.

Primary service showcase:
- source block: .block-how-works
- position: immediately after Hero
- title VI: Dịch Vụ Bio-A Group
- title EN: Bio-A Group Services
- exactly five service slides, matching Bio-A legacy service taxonomy.
- source Merywood Swiper/card geometry and existing first-five image slots are preserved.
- small source mark in .step__icon -> assets/bioa-monogram-cream.svg.

Semantic lock:
- one primary service listing only.
- workflow remains process, scenarios remain use cases, CTA remains contact conversion.


## PATCH-G1 — Blog authority

Index:
- /blog/
- visual/runtime source: Merywood /blog/
- owner: bioa-blog-refine.mjs / applyBlogIndex().

Details:
- 7 route bài Bio-A cũ do blogRouteDefs export;
- mỗi route dùng Merywood /blog/cosmetic-manufacturing-process/ làm DOM/runtime template;
- owner: bioa-blog-refine.mjs / applyBlogArticle().

Content authority:
- legacy Bio-A website archive, records type=kien-thuc;
- VI giữ nội dung Bio-A cũ;
- thumbnails local /assets/blog/*.webp;
- không dùng copy bài supplement của Merywood.

Navigation:
- /blog/ label = Blog cho VI và EN.

Motion:
- bioa-home-refine.mjs / addSharedPageReveal();
- index: hero + feature + post cards + CTA;
- detail: title/media/body/nav + CTA.


## PATCH-G2 — Blog clean-content / SEO authority

Route ownership remains:
- `bioa-blog-refine.mjs`.
- Index source: Merywood `/blog/`.
- Detail source: Merywood `/blog/cosmetic-manufacturing-process/`.

Content pipeline:
- G1 raw `bodyVi` archive HTML is retired.
- Seven currently promoted legacy Bio-A topics are rewritten as structured VI/EN editorial data.
- Renderer emits only known H2 / paragraph / list / note nodes into the existing Merywood `.text-block__content`.
- TOC is generated from the same section data; no independent/stale TOC map.
- Never render archive authoring markers, duplicated CTA/contact payloads or unsupported old marketing claims.

Presentation:
- Merywood article shell and source typography remain visual/runtime authority.
- Blog route CSS must not redefine the source heading/body type scale.
- Bio-A Blog hero monogram uses the existing `.blog-hero__bg` source slot.
- Optical artwork position: Desktop 58%, Tablet 56%, Mobile 54%; no new watermark layer.

SEO:
- each detail route owns a concise SEO title + description;
- OG/Twitter article metadata uses the existing local thumbnail;
- BlogPosting JSON-LD is generated per article;
- existing article slugs remain stable.


## PATCH-G3 — Blog rich-detail source map

Exact owner-supplied reference:
- export: `what-affects-moq-in-supplement-manufacturing-export.zip`;
- route equivalent: Merywood `/blog/what-affects-moq-in-supplement-manufacturing/`.

Detail source modules and Bio-A mapping:
- `.bb-toc` -> generated numbered Bio-A TOC;
- `.text-block` -> numbered Bio-A H2/body sections;
- `.image-block` -> local article image in source wide-media geometry;
- `.merywood-cg-wrap` -> Bio-A summary/support cards using source 2/3-column grids;
- `.block-green-card` -> Bio-A project CTA / conclusion cards;
- `.block-flex-table` -> generated 3-column quick checklist;
- `.bb-post-nav-wrap` -> Bio-A previous/next routes.

Authority rule:
- do not flatten `.bb-content-col` into one custom article block again;
- preserve the source module DOM/classes/CSS/runtime and only replace payload;
- never leave visible Merywood text, CTA, image or link payload in a promoted Bio-A article.

Blog index watermark:
- owner is `body.bioa-blog-index` fixed background using `/assets/bioa-monogram.svg`;
- source `.blog-hero__bg` stays hidden on the index;
- no additional generated artwork.


## PATCH-G4 — Blog visual safety guards

Blog index watermark:
- continues to use `/assets/bioa-monogram.svg`;
- viewport authority is fixed + center/center;
- opacity treatment is achieved by a 94% ivory veil above the original SVG;
- target visual strength is approximately 6%;
- do not recolor or modify the shared SVG asset.

Blog detail rich modules:
- Merywood source DOM remains authority;
- route-scoped Bio-A CSS now guarantees source card geometry if inline source styles are reordered or partially overridden;
- all direct article sections and module containers must remain within `.bb-content-col`;
- 2/3-column card grids stay source-like on desktop and collapse to one column <=1024;
- flex-table header font weight is 600 in Bio-A even though the Merywood source uses 800;
- on mobile the 3-column table scrolls horizontally instead of compressing text.


## BLOG ARCHIVE COMPLETION — PATCH-G6

Content source inventory:
- legacy Bio-A database category `kien-thuc`: 38 published articles total;
- 7 articles migrated and owner-approved through PATCH-G5;
- 31 remaining legacy topics migrated in PATCH-G6;
- all legacy slugs retained for route continuity;
- legacy raw HTML remains retired; structured content records are runtime authority.

Blog index now clones the existing Merywood `.post-card` template until every article has a card; no new card component was introduced.
Blog detail remains locked to `/blog/what-affects-moq-in-supplement-manufacturing/` source modules documented above.


## PATCH-G7 — Blog archive pagination owner

Archive page size: 7.
Source mapping per page:
- item 1 -> `.post-feature__card`;
- items 2–7 -> six existing `.post-card` nodes;
- no cloning beyond the six source card nodes.

Static pagination routes:
- `/blog/`;
- `/blog/page/2/` through the computed final page;
- every pagination route uses Merywood `/blog/` as source HTML.

Current inventory: 38 articles -> 6 archive pages (7 + 7 + 7 + 7 + 7 + 3).


## PATCH-G8 — Blog pagination + TOC CTA presentation

Archive pagination presentation:
- owner: Merywood `.posts-grid-pagination`;
- inactive page numbers are transparent/text-like;
- active page alone owns the filled rounded surface;
- compact centered spacing; no large pill/square treatment;
- routing/page slicing remains PATCH-G7 authority.

TOC contact CTA:
- DOM/geometry remains Merywood `.bb-toc__cta-btn`;
- destination is Bio-A Zalo;
- icon asset is the shared PASS `/assets/zalo-bioa-owner.png`;
- copy aligns with shared contact CTA: "Liên Hệ Với Chúng Tôi" / "Contact us".
