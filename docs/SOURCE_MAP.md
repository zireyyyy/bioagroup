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

Status:
- PASS/LOCKED state is carried from FULL_HANDOFF.md for accepted header visuals.
- Mapping confirmed.

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

Status:
- Existing approved hero/stats state is protected by FULL_HANDOFF.md.
- Mapping confirmed.
- Do not assume later post-baseline hero hotfixes are authoritative.

Protected mechanics:
- typography should come from original Merywood source where possible.
- geometry changes must be limited to what BIO-A content length requires.
- desktop and mobile must be verified independently.

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

Status:
- Desktop PASS/LOCKED.
- Mobile PASS/LOCKED.
- Mapping confirmed.

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

Status:
- Footer typography D2 is owner-confirmed PASS / LOCKED.
- Footer D1 categories are being revised from legacy BIO-A source data.
- Footer D3 palette is being ported from legacy BIO-A source.
- Mapping confirmed.

Protected mechanics:
- keep original Merywood footer DOM/layout mechanics and section relationships.
- use regular BIO-A logo on cream/light footer backgrounds; light logo only on dark backgrounds.
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

Status:
- Patch C4 accepted at b4c5e94f966ee6283a8b63c82e9ceb3c543e1214.
- PASS / LOCKED by owner runtime confirmation.
- Mapping confirmed.

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

## Not yet lazily indexed

The following are intentionally not expanded here until a future patch actually investigates them:
- product/service sections not listed above;
- reviews;
- forms/modals;
- knowledge/content pages;
- other subpages;
- any remaining Merywood animations not tied to an active patch.

Do not pre-scan these areas solely to fill this file.
