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

