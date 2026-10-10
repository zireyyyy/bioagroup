/* Single responsive owner for the three source-component rebuild targets.
 * Preserve Merywood DOM and 769+/<=768 breakpoints. No global Tablet layer. */
export const sourceComponentCss = `/* BIOA Source Component Rebuild (Tablet candidate).
   Merywood main.txt is the layout authority for Header/Footer from 769px.
   Merywood supplies flex Header and Footer, 1920-relative vw scaling, and
   the <=768px Mobile switch. Keep those classes and their child order.
   BIO-A additions: unified contact/lang cluster, four footer groups/company
   information, and the project CTA absent from supplied Merywood main.txt.
   There are deliberately no rules outside the existing 769–1200 band. */
@media (min-width:769px) and (max-width:1200px) {
  /* SOURCE HEADER — original logo/nav shell, BIO-A actions in source flow */
  .header .header__wrapper { display:flex !important; align-items:center !important; min-width:0 !important; }
  .header .header__nav { min-width:0 !important; margin-right:auto !important; }
  .header .header__nav > ul { display:flex !important; flex-wrap:nowrap !important; }
  .header .header__nav > ul > li > a { white-space:nowrap !important; font-size:inherit !important; }
  .header .bioa-header-actions {
    display:flex !important; flex:0 0 auto !important; align-items:center !important; justify-content:flex-end !important;
    min-width:0 !important; margin-left:auto !important; gap:.5208vw !important;
  }
  .header .bioa-header-actions .header__contacts {
    display:flex !important; align-items:center !important; flex:0 0 auto !important; gap:.5208vw !important;
    margin:0 !important; min-width:0 !important;
  }
  .header .bioa-header-actions .header__email {
    display:flex !important; align-items:center !important; flex:0 0 auto !important;
    width:auto !important; height:auto !important; min-width:0 !important; margin:0 !important; padding:0 !important;
    background:transparent !important; border:0 !important; border-radius:0 !important;
  }
  .header .bioa-header-actions .header__email a {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    box-sizing:border-box !important; width:auto !important; min-width:0 !important;
    height:2.4479vw !important; min-height:0 !important; padding:0 1.1458vw !important; border-radius:.8333vw !important;
    font-size:.8333vw !important; white-space:nowrap !important; line-height:1 !important;
  }
  .header .bioa-header-actions .header__socials .socials__link,
  .header .bioa-header-actions .header__btn {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    box-sizing:border-box !important; flex:0 0 auto !important; height:2.4479vw !important;
    min-height:0 !important; margin:0 !important; border-radius:.8333vw !important;
  }
  .header .bioa-header-actions .header__btn {
    width:auto !important; padding:0 1.1458vw !important; font-size:.8333vw !important;
    white-space:nowrap !important;
  }
  .header .bioa-header-actions .header__socials .socials__link {
    width:2.4479vw !important; min-width:2.4479vw !important;
  }
  .header .bioa-header-actions .header__socials .bioa-zalo-icon,
  .header .bioa-header-actions .header__socials .socials__link svg {
    width:1.4583vw !important; min-width:0 !important; max-width:1.4583vw !important;
    height:1.4583vw !important; max-height:1.4583vw !important;
    flex:0 0 auto !important; object-fit:contain !important;
  }
  .header .bioa-header-actions .bioa-lang {
    display:flex !important; flex:0 0 auto !important; align-items:center !important; gap:0 !important;
    width:auto !important; height:2.4479vw !important; padding:.1563vw !important;
    margin:0 !important; border-radius:.8333vw !important;
  }
  .header .bioa-header-actions .bioa-lang a {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    flex:0 0 auto !important; min-width:1.8229vw !important; width:1.8229vw !important;
    height:1.8229vw !important; padding:0 !important; font-size:.8333vw !important;
    border-radius:.5208vw !important;
  }

  /* SOURCE FOOTER — Merywood flex, BIO-A-approved four groups in place.
     All four footer columns and company rows remain in the original DOM. */
  .footer-top .footer-top__wrapper {
    display:flex !important; align-items:flex-start !important; justify-content:space-between !important;
    gap:1.5625vw !important;
  }
  .footer-top .footer-top__left {
    display:block !important; flex:0 0 14.5833vw !important; min-width:0 !important; width:auto !important;
  }
  .footer-top .footer-top__logo img,
  .footer-top .footer__logo img {
    width:6.7188vw !important; max-width:6.7188vw !important; height:auto !important;
  }
  .footer-top .footer-top__menu {
    display:flex !important; align-items:flex-start !important; justify-content:space-between !important;
    flex:1 1 0 !important; min-width:0 !important; width:auto !important; gap:1.0417vw !important;
  }
  .footer-top .footer-top__nav { flex:1.25 1 0 !important; min-width:0 !important; width:auto !important; }
  .footer-top .footer-top__nav:nth-child(2) { flex-grow:1.45 !important; }
  .footer-top .footer-top__nav:nth-child(3) { flex-grow:.86 !important; }
  .footer-top .footer-top__nav:nth-child(4) { flex-grow:.88 !important; }
  .footer-top .footer-top__nav > ul > li:first-child > a {
    font-size:.9375vw !important; line-height:1.3 !important;
  }
  .footer-top .footer-top__nav > ul > li:not(:first-child) > a {
    font-size:.8333vw !important; line-height:1.45 !important;
    white-space:normal !important; overflow-wrap:normal !important; word-break:normal !important;
  }
  .footer-top .footer-top__right {
    display:block !important; flex:0 0 16.1458vw !important; min-width:0 !important; width:auto !important;
  }
  .footer-top .footer-top__contacts {
    display:flex !important; flex-direction:column !important; align-items:stretch !important;
    min-width:0 !important; width:100% !important; gap:.5208vw !important;
  }
  .footer-top .footer-top__email {
    display:flex !important; align-items:center !important; justify-content:center !important;
    width:100% !important; min-width:0 !important; height:auto !important; padding:0 !important; margin:0 !important;
    border:0 !important; border-radius:0 !important; box-shadow:none !important; background:transparent !important;
  }
  .footer-top .footer-top__email a {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    box-sizing:border-box !important; width:100% !important; min-width:0 !important;
    height:2.4479vw !important; padding:0 .5208vw !important; border-radius:.8333vw !important;
    font-size:.8333vw !important; line-height:1 !important; white-space:nowrap !important;
  }
  .footer-top .footer-top__socials {
    display:flex !important; align-items:center !important; justify-content:space-between !important;
    width:100% !important; min-width:0 !important; gap:.4167vw !important;
  }
  .footer-top .footer-top__socials .socials__link {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    box-sizing:border-box !important; flex:0 0 2.4479vw !important;
    width:2.4479vw !important; min-width:0 !important; height:2.4479vw !important;
    border-radius:.8333vw !important; overflow:hidden !important;
  }
  .footer-top .footer-top__socials a[aria-label="Zalo"] .bioa-zalo-icon {
    width:1.5625vw !important; max-width:1.5625vw !important;
    height:1.5625vw !important; max-height:1.5625vw !important;
    flex:0 0 1.5625vw !important;
  }
  .footer-top .bioa-footer-company-info--desktop {
    display:block !important; width:100% !important; max-width:100% !important; margin-top:1.0417vw !important;
  }
  .footer-top .bioa-footer-company-info--responsive { display:none !important; }
  .footer-top .bioa-footer-company-info--desktop .bioa-footer-company-info__title {
    font-size:.7813vw !important; line-height:1.35 !important; white-space:normal !important;
  }
  .footer-top .bioa-footer-company-info--desktop .bioa-footer-company-info__row {
    font-size:.6510vw !important; line-height:1.45 !important;
  }

  /* BIO-A-added CTA — preserve Desktop row and real link; never allow the
     scroll-reveal observer to leave its content invisible on Tablet. */
  .whatsapp-wrapper { margin-top:3.125vw !important; padding:0 1.3021vw !important; }
  .whatsapp { position:relative !important; width:100% !important; padding:2.0833vw 2.6042vw !important; border-radius:3.125vw !important; }
  .whatsapp .whatsapp__content {
    display:flex !important; align-items:center !important; justify-content:space-between !important;
    gap:2.0833vw !important; opacity:1 !important; visibility:visible !important;
    transform:none !important; transition:none !important;
  }
  /* Static fallback for UNILA reveal on transformed Smooth Scrollbar. */
  .whatsapp .whatsapp__content[data-bioa-aos] {
    opacity:1 !important; visibility:visible !important; transform:none !important; transition:none !important;
  }
  .whatsapp .whatsapp__text { flex:1 1 auto !important; min-width:0 !important; }
  .whatsapp .whatsapp__title { font-size:1.5625vw !important; line-height:1.2 !important; margin-bottom:.3125vw !important; }
  .whatsapp .whatsapp__description { font-size:.8333vw !important; max-width:32.2917vw !important; line-height:1.5 !important; }
  .whatsapp .whatsapp__btn {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    flex:0 0 auto !important; min-width:17.7083vw !important; width:auto !important; height:3.4375vw !important;
    gap:.625vw !important; padding:0 2.0833vw !important; border-radius:.9375vw !important; white-space:nowrap !important;
  }
  .whatsapp .whatsapp__btn .btn__icon {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    width:1.25vw !important; min-width:1.25vw !important; height:1.25vw !important; flex:0 0 1.25vw !important;
    margin:0 !important; line-height:0 !important;
  }
  .whatsapp .whatsapp__btn .bioa-zalo-icon {
    width:1.25vw !important; max-width:1.25vw !important; height:1.25vw !important;
    max-height:1.25vw !important; flex:0 0 auto !important; margin:0 !important;
  }
  .whatsapp .whatsapp__btn .btn__text { font-size:.8333vw !important; line-height:1.2 !important; white-space:nowrap !important; }
  .whatsapp .whatsapp__decoration {
    top:-21.875vw !important; right:-9.375vw !important; width:58.3333vw !important; height:58.3333vw !important;
  }
}`;
