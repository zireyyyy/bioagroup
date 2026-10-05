const company = {
  email:'contact@bioagroup.vn',
  phone:'0779 399 379',
  whatsapp:'https://wa.me/84779399379',
  zalo:'https://zalo.me/84779399379',
  facebook:'https://www.facebook.com/nhamaysanxuatduocmypham.BioA',
  telegram:'https://t.me/bioagroup'
};

const icons = {
  whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 00-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
  zalo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"/></svg>',
  telegram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.7 3.3 2.9 10.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.9 5.8c.2.7.1 1 .9 1 .6 0 .9-.3 1.2-.6l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-.9L24 5c.4-1.5-.6-2.2-2.3-1.7ZM9 13.3l9.4-5.9c.5-.3.9-.1.6.2l-7.8 7.1-.3 3.3L9 13.3Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.4 5h19.2A2.4 2.4 0 0124 7.4v9.2a2.4 2.4 0 01-2.4 2.4H2.4A2.4 2.4 0 010 16.6V7.4A2.4 2.4 0 012.4 5zm9.6 7.2L3.1 7.1h17.8L12 12.2zm0 2.4L2 8.9v7.7c0 .2.2.4.4.4h19.2c.2 0 .4-.2.4-.4V8.9l-10 5.7z"/></svg>'
};

const css = `
:root{
  --bioa-primary:#116F47;
  --bioa-dark:#073D29;
  --bioa-deep:#052F21;
  --bioa-sage:#A8C8AE;
  --bioa-mint:#E7F0E8;
  --bioa-cream:#F3F0E4;
  --bioa-ivory:#FCFEF1;
}
html,body{background:var(--bioa-cream)!important}
.header{background:rgba(252,254,241,.96)!important}
.header__logo img{display:block!important;width:132px!important;max-width:132px!important;height:auto!important;object-fit:contain!important}
.menu__logo img{display:block!important;width:150px!important;height:auto!important}
.footer-top__logo img,.footer__logo img{display:block!important;width:128px!important;max-width:128px!important;height:auto!important;object-fit:contain!important}
.footer-top{background:var(--bioa-deep)!important}
.footer-bottom{background:#03271B!important}
.header__nav a,.menu__nav a{color:var(--bioa-deep)!important}
.header__nav a:hover,.menu__nav a:hover,.header__email a{color:var(--bioa-primary)!important}
.btn,.header__socials a,.menu__socials a{background:var(--bioa-primary)!important}
.btn:hover,.header__socials a:hover,.menu__socials a:hover{background:var(--bioa-dark)!important}
.block-product-formats .formats,.whatsapp{background:linear-gradient(135deg,var(--bioa-ivory),#EDF5EE)!important}
.block-reviews .review{background:var(--bioa-dark)!important}
.product__content,.product__row,.item,.step__content{border-color:rgba(17,111,71,.12)!important}
.bioa-lang a{background:var(--bioa-mint)!important;color:var(--bioa-deep)!important}.bioa-lang a.is-active{background:var(--bioa-primary)!important;color:#fff!important}
.footer-top__socials svg{width:23px;height:23px;display:block;fill:currentColor}
.footer-top__socials a{display:inline-flex!important;align-items:center!important;justify-content:center!important;color:#fff!important;background:rgba(255,255,255,.10)!important}
.footer-top__socials a:hover{background:var(--bioa-primary)!important}
.bioa-contact-fab{position:fixed;right:22px;bottom:22px;z-index:99990;display:flex;flex-direction:column;align-items:flex-end;gap:12px}
.bioa-contact-fab__panel{display:none;width:320px;padding:16px;border-radius:22px;background:var(--bioa-ivory);box-shadow:0 18px 55px rgba(5,47,33,.22);border:1px solid rgba(17,111,71,.12)}
.bioa-contact-fab.is-open .bioa-contact-fab__panel{display:block}
.bioa-contact-fab__title{font-weight:700;color:var(--bioa-deep);margin:0 0 4px}.bioa-contact-fab__sub{font-size:13px;color:#5d685f;margin-bottom:12px}
.bioa-contact-fab__links{display:grid;grid-template-columns:1fr 1fr;gap:8px}.bioa-contact-fab__links a{display:flex;align-items:center;gap:9px;padding:10px 11px;border-radius:14px;background:#fff;color:var(--bioa-deep);text-decoration:none;border:1px solid rgba(17,111,71,.10)}.bioa-contact-fab__links svg{width:19px;height:19px;fill:var(--bioa-primary)}
.bioa-contact-fab__toggle{width:68px;height:68px;border:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bioa-ivory);box-shadow:0 10px 32px rgba(5,47,33,.28);cursor:pointer;padding:11px}.bioa-contact-fab__toggle img{width:100%;height:100%;object-fit:contain}.bioa-contact-fab__toggle:after{content:"";position:absolute;width:12px;height:12px;border-radius:50%;background:#21A366;right:4px;bottom:6px;border:2px solid var(--bioa-ivory)}
[id*="dashly" i],[class*="dashly" i],[id*="carrot" i],[class*="carrot" i],iframe[src*="dashly" i],iframe[src*="carrot" i]{display:none!important}
@media(max-width:1100px){.header__logo img{width:112px!important;max-width:112px!important}.header__nav a{font-size:12px!important}.header__nav ul{gap:13px!important}}
@media(max-width:768px){.bioa-contact-fab{right:14px;bottom:14px}.bioa-contact-fab__panel{width:min(320px,calc(100vw - 28px))}.bioa-contact-fab__toggle{width:60px;height:60px}}
`;


const patchACss = `
/* HOME Patch A — brand cleanup + compact translucent header */
.header{
  background:rgba(252,254,241,.30)!important;
  backdrop-filter:none!important;
  -webkit-backdrop-filter:none!important;
  box-shadow:0 1px 0 rgba(5,47,33,.025)!important;
}
.header__inner{
  height:66px!important;
  min-height:66px!important;
  padding-top:0!important;
  padding-bottom:0!important;
}
.header__logo{
  width:58px!important;
  height:58px!important;
  flex:0 0 58px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  overflow:visible!important;
  margin-right:14px!important;
}
.header__logo img{
  display:block!important;
  width:48px!important;
  max-width:48px!important;
  height:56px!important;
  max-height:56px!important;
  object-fit:contain!important;
  object-position:center!important;
}
.menu__logo img{
  width:62px!important;
  max-width:62px!important;
  height:74px!important;
  object-fit:contain!important;
}
.header__nav ul{gap:28px!important}

/* A6 deterministic utility spacing */
.header__wrapper{
  display:flex!important;
  align-items:center!important;
  justify-content:flex-start!important;
}
.header__contacts{
  margin-left:auto!important;
  margin-right:0!important;
}
.header__contacts + .bioa-lang{
  margin-left:10px!important;
  margin-right:0!important;
}
.bioa-lang + .header__btn{
  margin-left:10px!important;
  margin-right:0!important;
}
.header__nav a{
  font-size:17px!important;
  line-height:1.1!important;
  font-weight:400!important;
  letter-spacing:-.01em!important;
}
.header__contacts{
  display:flex!important;
  align-items:center!important;
  gap:10px!important;
  margin-left:auto!important;
  margin-right:0!important;
}
.header__email a{
  padding-left:14px!important;
  padding-right:14px!important;
}
.header__socials .socials__link{
  width:40px!important;
  height:40px!important;
}
.bioa-lang{
  display:inline-flex!important;
  align-items:center!important;
  gap:0!important;
  height:42px!important;
  padding:3px!important;
  margin-left:10px!important;
  margin-right:0!important;
  border-radius:14px!important;
  background:rgba(252,254,241,.72)!important;
  border:1px solid rgba(17,111,71,.12)!important;
  box-sizing:border-box!important;
}
.bioa-lang a{
  min-width:35px!important;
  width:35px!important;
  height:35px!important;
  padding:0!important;
  margin:0!important;
  border-radius:11px!important;
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  background:transparent!important;
  color:var(--bioa-deep)!important;
  font-size:13px!important;
  line-height:1!important;
  text-decoration:none!important;
  transition:background .2s ease,color .2s ease!important;
}
.bioa-lang a.is-active{
  background:var(--bioa-primary)!important;
  color:#fff!important;
}
.header__btn{
  min-width:126px!important;
  padding-left:18px!important;
  padding-right:18px!important;
}
.header__email,.header__socials{margin-left:0!important;margin-right:0!important}
.header__btn{
  margin-left:10px!important;
  margin-right:0!important;
}

/* Merywood brand-watermark replacements only — do not touch product/UI artwork */
.block-we-produce .bg__decoration{
  background-image:none!important;
  background-color:var(--bioa-primary)!important;
  -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
}
.formats__logo{
  --formats-logo:url("/assets/bioa-monogram.svg")!important;
  opacity:.055!important;
}
.whatsapp__logo{
  background:var(--bioa-primary)!important;
  opacity:.055!important;
  top:50%!important;
  left:58%!important;
  right:auto!important;
  bottom:auto!important;
  width:170px!important;
  height:138px!important;
  transform:translate(-50%,-50%) scale(1)!important;
  transform-origin:center!important;
  transition:transform .35s ease,opacity .35s ease!important;
  -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
}
.whatsapp:hover .whatsapp__logo{
  transform:translate(-50%,-50%) scale(1.10)!important;
  opacity:.085!important;
}
@media(max-width:1200px){
  .header__inner{height:64px!important;min-height:64px!important}
  .header__logo{width:54px!important;height:54px!important;flex-basis:54px!important;margin-right:10px!important}
  .header__logo img{width:44px!important;max-width:44px!important;height:52px!important;max-height:52px!important}
  .header__nav ul{gap:20px!important}
  .header__nav a{font-size:16px!important}
  .header__contacts{gap:8px!important}
  .header__contacts + .bioa-lang{margin-left:8px!important}
  .bioa-lang + .header__btn{margin-left:8px!important}
}
`;


const patchA7Css = `
/* HOME Patch A7 — deterministic utility cluster + subtle We Produce watermark */
.bioa-header-actions{
  margin-left:auto!important;
  display:flex!important;
  align-items:center!important;
  justify-content:flex-end!important;
  gap:10px!important;
  flex:0 0 auto!important;
  white-space:nowrap!important;
}
.bioa-header-actions .header__contacts{
  margin:0!important;
  display:flex!important;
  align-items:center!important;
  gap:10px!important;
}
.bioa-header-actions .header__email,
.bioa-header-actions .header__socials,
.bioa-header-actions .bioa-lang,
.bioa-header-actions .header__btn{
  margin:0!important;
  flex:0 0 auto!important;
}
.bioa-header-actions .header__email a{
  height:42px!important;
  min-height:42px!important;
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  padding:0 18px!important;
  border-radius:14px!important;
  background:rgba(252,254,241,.72)!important;
  border:1px solid rgba(17,111,71,.12)!important;
  box-sizing:border-box!important;
  line-height:1!important;
}
.bioa-header-actions .header__socials .socials__link{
  width:42px!important;
  height:42px!important;
  margin:0!important;
}
.bioa-header-actions .bioa-lang{
  height:42px!important;
  padding:3px!important;
  border-radius:14px!important;
  background:rgba(252,254,241,.72)!important;
  border:1px solid rgba(17,111,71,.12)!important;
}
.bioa-header-actions .bioa-lang a{
  width:35px!important;
  min-width:35px!important;
  height:35px!important;
  border-radius:10px!important;
}
.bioa-header-actions .header__btn{
  height:42px!important;
  min-height:42px!important;
  padding-left:20px!important;
  padding-right:20px!important;
}

/* We Produce: small, complete, translucent BIO-A watermark.
   Product photos/icons stay untouched. */
.block-we-produce .item__bg{
  position:relative!important;
}
.block-we-produce .bg__decoration{
  position:absolute!important;
  top:50%!important;
  left:50%!important;
  right:auto!important;
  bottom:auto!important;
  width:42%!important;
  height:42%!important;
  background:var(--bioa-primary)!important;
  background-image:none!important;
  opacity:.075!important;
  pointer-events:none!important;
  z-index:0!important;
  transform:translate(-50%,-50%) scale(1)!important;
  transform-origin:center!important;
  transition:transform .35s ease,opacity .35s ease!important;
  -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
}
.block-we-produce .item:hover .bg__decoration{
  transform:translate(-50%,-50%) scale(1.07)!important;
  opacity:.105!important;
}
.block-we-produce .bg__media{
  position:relative!important;
  z-index:1!important;
}
@media(max-width:1200px){
  .bioa-header-actions{gap:8px!important}
  .bioa-header-actions .header__contacts{gap:8px!important}
}
`;


const patchA8Css = `
/* HOME Patch A8 — fix email pill shell + enlarge contained We Produce watermark */
.bioa-header-actions .header__email{
  margin:0!important;
  padding:0!important;
  width:auto!important;
  min-width:0!important;
  height:auto!important;
  min-height:0!important;
  background:transparent!important;
  border:0!important;
  border-radius:0!important;
  box-shadow:none!important;
  overflow:visible!important;
}
.bioa-header-actions .header__email a{
  height:42px!important;
  min-height:42px!important;
  padding:0 18px!important;
  border-radius:14px!important;
  background:rgba(252,254,241,.72)!important;
  border:1px solid rgba(17,111,71,.12)!important;
  box-shadow:none!important;
  color:var(--bioa-primary)!important;
  line-height:1!important;
}

/* Keep the full BIO-A monogram visible while making it fill the card more naturally */
.block-we-produce .bg__decoration{
  width:62%!important;
  height:72%!important;
  top:50%!important;
  left:50%!important;
  right:auto!important;
  bottom:auto!important;
  opacity:.070!important;
  transform:translate(-50%,-50%) scale(1)!important;
  transform-origin:center!important;
  -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
}
.block-we-produce .item:hover .bg__decoration{
  transform:translate(-50%,-50%) scale(1.055)!important;
  opacity:.095!important;
}
`;


const patchBCss = `
/* HOME Patch B — widen hero stats to the left and keep every value fully visible */
.block-title .info.desctop{
  width:clamp(410px,24vw,470px)!important;
  max-width:470px!important;
  min-width:410px!important;
}
.block-title .info .item{
  width:100%!important;
  min-height:108px!important;
  padding:18px 24px!important;
  display:grid!important;
  grid-template-columns:minmax(235px,1.35fr) minmax(125px,.65fr)!important;
  column-gap:20px!important;
  align-items:center!important;
  box-sizing:border-box!important;
}
.block-title .info .item__number{
  min-width:0!important;
  max-width:none!important;
  font-size:clamp(38px,2.35vw,50px)!important;
  line-height:.98!important;
  letter-spacing:-.035em!important;
  white-space:nowrap!important;
  overflow:visible!important;
}
.block-title .info .item__text{
  min-width:0!important;
  max-width:none!important;
  font-size:clamp(15px,.95vw,18px)!important;
  line-height:1.18!important;
  white-space:normal!important;
  overflow:visible!important;
}
/* Long values get a controlled size instead of clipping */
.block-title .info .item:nth-child(3) .item__number{
  font-size:clamp(32px,1.95vw,42px)!important;
  letter-spacing:-.045em!important;
}
.block-title .info .item:nth-child(4) .item__number{
  font-size:clamp(36px,2.1vw,46px)!important;
}
.block-title .info .item:nth-child(5) .item__number{
  font-size:clamp(31px,1.9vw,40px)!important;
  letter-spacing:-.04em!important;
}
@media(max-width:1500px){
  .block-title .info.desctop{
    width:clamp(390px,29vw,440px)!important;
    min-width:390px!important;
  }
  .block-title .info .item{
    grid-template-columns:minmax(215px,1.3fr) minmax(118px,.7fr)!important;
    padding-left:22px!important;
    padding-right:22px!important;
  }
  .block-title .info .item:nth-child(3) .item__number{
    font-size:34px!important;
  }
}
@media(max-width:1200px){
  .block-title .info.desctop{
    width:390px!important;
    min-width:390px!important;
  }
  .block-title .info .item{
    grid-template-columns:minmax(205px,1.28fr) minmax(115px,.72fr)!important;
    column-gap:16px!important;
  }
  .block-title .info .item__number{font-size:38px!important}
  .block-title .info .item:nth-child(3) .item__number{font-size:31px!important}
  .block-title .info .item:nth-child(5) .item__number{font-size:31px!important}
}
`;


const patchB2Css = `
/* HOME Patch B3 — lighter original-style stats + reliable mobile header */
.block-title .info.desctop{
  width:clamp(405px,23vw,455px)!important;
  min-width:405px!important;
  max-width:455px!important;
}
.block-title .info .item{
  width:100%!important;
  min-height:88px!important;
  padding:14px 22px!important;
  display:grid!important;
  grid-template-columns:minmax(220px,1.25fr) minmax(135px,.75fr)!important;
  column-gap:18px!important;
  align-items:center!important;
  box-sizing:border-box!important;
}
.block-title .info .item__number{
  min-width:0!important;
  max-width:none!important;
  font-size:36px!important;
  font-weight:300!important;
  line-height:1!important;
  letter-spacing:-.025em!important;
  white-space:nowrap!important;
  overflow:visible!important;
}
.block-title .info .item__text{
  min-width:0!important;
  max-width:none!important;
  font-size:15px!important;
  font-weight:400!important;
  line-height:1.22!important;
  white-space:normal!important;
  overflow:visible!important;
}
.block-title .info .item:nth-child(3) .item__number,
.block-title .info .item:nth-child(4) .item__number,
.block-title .info .item:nth-child(5) .item__number{
  font-size:36px!important;
  font-weight:300!important;
  letter-spacing:-.025em!important;
}

/* dedicated mobile header shell: logo | CTA | original burger */
.bioa-mobile-actions{display:none!important}
@media(max-width:768px){
  .bioa-header-actions{display:none!important}
  .header__contacts,
  .header__wrapper > .bioa-lang,
  .header__wrapper > .header__btn{display:none!important}

  .header__wrapper{
    min-height:62px!important;
    height:62px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:flex-start!important;
    padding-top:0!important;
    padding-bottom:0!important;
  }
  .header__logo{
    width:48px!important;
    height:48px!important;
    flex:0 0 48px!important;
    margin:0 auto 0 0!important;
  }
  .header__logo img{
    width:40px!important;
    height:46px!important;
    max-width:40px!important;
    max-height:46px!important;
    object-fit:contain!important;
  }
  .bioa-mobile-actions{
    display:flex!important;
    align-items:center!important;
    gap:8px!important;
    margin-left:auto!important;
    flex:0 0 auto!important;
  }
  .bioa-mobile-cta{
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    height:40px!important;
    padding:0 15px!important;
    border:0!important;
    border-radius:14px!important;
    background:var(--bioa-primary)!important;
    color:#fff!important;
    font-size:13px!important;
    font-weight:600!important;
    line-height:1!important;
    text-decoration:none!important;
    white-space:nowrap!important;
  }
  .bioa-mobile-actions button,
  .bioa-mobile-actions .menu-burger,
  .bioa-mobile-actions [class*="burger"],
  .bioa-mobile-actions [class*="menu"]{
    flex:0 0 auto!important;
  }

  .menu__contacts{
    display:flex!important;
    flex-direction:column!important;
    align-items:flex-start!important;
    gap:14px!important;
  }
  .bioa-mobile-menu-controls{
    display:flex!important;
    align-items:center!important;
    gap:10px!important;
    flex-wrap:wrap!important;
    width:100%!important;
  }
  .bioa-mobile-menu-controls .bioa-lang{
    margin:0!important;
    height:42px!important;
    padding:3px!important;
    border-radius:14px!important;
    background:rgba(252,254,241,.72)!important;
    border:1px solid rgba(17,111,71,.12)!important;
  }
  .bioa-mobile-menu-controls .bioa-lang a{
    width:35px!important;
    min-width:35px!important;
    height:35px!important;
    border-radius:10px!important;
    font-size:13px!important;
  }
  .bioa-mobile-contact{
    width:42px!important;
    height:42px!important;
    border-radius:14px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:var(--bioa-primary)!important;
    color:#fff!important;
    text-decoration:none!important;
  }
  .bioa-mobile-contact svg{
    width:20px!important;
    height:20px!important;
    fill:currentColor!important;
  }

  /* mobile statistics: same light rhythm as desktop */
  .block-title-continue .info .item,
  .block-title-mobile .info .item{
    min-height:80px!important;
    padding:13px 18px!important;
  }
  .block-title-continue .info .item__number,
  .block-title-mobile .info .item__number{
    font-size:30px!important;
    font-weight:300!important;
    line-height:1!important;
  }
  .block-title-continue .info .item__text,
  .block-title-mobile .info .item__text{
    font-size:13px!important;
    font-weight:400!important;
    line-height:1.2!important;
  }
}
`;


const patchMobileMenuCss = `
/* HOME mobile navigation — adapted from ArtistLookup's inline collapsible header menu.
   Keep the Merywood header shell; replace only the mobile menu mechanism. */
.bioa-mobile-nav{display:none}

@media(max-width:768px){
  /* preserve original header composition: logo left, CTA + original burger right */
  .bioa-mobile-actions,.bioa-mobile-menu-controls{display:none!important}
  .bioa-header-actions{
    display:flex!important;
    align-items:center!important;
    margin-left:auto!important;
    gap:8px!important;
  }
  .bioa-header-actions .header__contacts,
  .bioa-header-actions .bioa-lang{display:none!important}
  .bioa-header-actions .header__btn{
    display:inline-flex!important;
    height:40px!important;
    min-height:40px!important;
    margin:0!important;
    padding:0 15px!important;
    border-radius:14px!important;
    font-size:13px!important;
    line-height:1!important;
  }
  .header__wrapper{
    min-height:62px!important;
    height:62px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:flex-start!important;
    padding-left:14px!important;
    padding-right:14px!important;
    overflow:visible!important;
  }
  .header__logo{
    width:46px!important;
    height:48px!important;
    flex:0 0 46px!important;
    margin:0 auto 0 0!important;
  }
  .header__logo img{
    display:block!important;
    width:38px!important;
    max-width:38px!important;
    height:44px!important;
    max-height:44px!important;
    object-fit:contain!important;
    object-position:left center!important;
  }
  .bioa-mobile-menu-button{
    flex:0 0 auto!important;
    margin-left:8px!important;
  }

  /* disable the old Merywood mobile drawer only; desktop remains untouched */
  .bioa-old-mobile-menu{display:none!important}

  /* ArtistLookup reference mechanism: inline collapsible panel inside header */
  .bioa-mobile-nav{
    display:block!important;
    position:static!important;
    inset:auto!important;
    width:100%!important;
    height:auto!important;
    max-height:0!important;
    padding:0!important;
    overflow:hidden!important;
    background:#fff!important;
    border-top:1px solid rgba(5,47,33,.08)!important;
    opacity:1!important;
    visibility:visible!important;
    pointer-events:none!important;
    transition:max-height .22s ease!important;
  }
  .bioa-mobile-nav.open{
    max-height:min(38rem,calc(100dvh - 4rem))!important;
    pointer-events:auto!important;
    box-shadow:0 16px 36px rgba(0,0,0,.08)!important;
  }
  .bioa-mobile-nav-drop{
    width:100%!important;
    padding:10px 16px 18px!important;
    box-sizing:border-box!important;
  }
  .bioa-mobile-nav-links{
    display:grid!important;
    gap:2px!important;
    padding:2px 0 10px!important;
  }
  .bioa-mobile-nav-links a{
    display:flex!important;
    align-items:center!important;
    justify-content:space-between!important;
    min-height:44px!important;
    padding:8px 6px!important;
    border-bottom:1px solid rgba(5,47,33,.07)!important;
    color:var(--bioa-deep)!important;
    text-decoration:none!important;
    font-size:17px!important;
    font-weight:400!important;
    line-height:1.2!important;
  }
  .bioa-mobile-nav-links a:after{
    content:"→";
    color:var(--bioa-primary);
    font-size:15px;
    opacity:.72;
  }
  .bioa-mobile-nav-meta{
    padding-top:10px!important;
  }
  .bioa-mobile-nav-label{
    margin:0 0 8px!important;
    color:#69766f!important;
    font-size:12px!important;
    font-weight:500!important;
  }
  .bioa-mobile-contact-grid{
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:8px!important;
  }
  .bioa-mobile-contact-grid a{
    display:flex!important;
    align-items:center!important;
    gap:8px!important;
    min-height:42px!important;
    padding:8px 10px!important;
    border:1px solid rgba(17,111,71,.10)!important;
    border-radius:12px!important;
    background:var(--bioa-cream)!important;
    color:var(--bioa-deep)!important;
    text-decoration:none!important;
    font-size:13px!important;
    font-weight:500!important;
    box-sizing:border-box!important;
  }
  .bioa-mobile-contact-grid svg{
    width:18px!important;
    height:18px!important;
    flex:0 0 18px!important;
    fill:currentColor!important;
  }
  .bioa-mobile-menu-lang{
    display:inline-flex!important;
    align-items:center!important;
    gap:0!important;
    height:40px!important;
    margin-top:10px!important;
    padding:3px!important;
    border:1px solid rgba(17,111,71,.12)!important;
    border-radius:12px!important;
    background:#F8FAF5!important;
  }
  .bioa-mobile-menu-lang a{
    width:34px!important;
    height:34px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    border-radius:9px!important;
    color:var(--bioa-deep)!important;
    text-decoration:none!important;
    font-size:12px!important;
  }
  .bioa-mobile-menu-lang a.is-active{
    background:var(--bioa-primary)!important;
    color:#fff!important;
  }

  /* Mobile We Produce — same BIO-A watermark treatment as desktop, scaled to card */
  .block-we-produce .bg__decoration{
    width:68%!important;
    height:68%!important;
    top:50%!important;
    left:50%!important;
    opacity:.060!important;
    transform:translate(-50%,-50%) scale(1)!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .block-we-produce .item:hover .bg__decoration{
    transform:translate(-50%,-50%) scale(1.045)!important;
    opacity:.085!important;
  }

  /* keep the full light BIO-A logo proportional in the mobile footer */
  .footer-top__logo img,.footer__logo img{
    width:82px!important;
    max-width:82px!important;
    height:auto!important;
    max-height:98px!important;
    object-fit:contain!important;
    object-position:left top!important;
  }
}
`;


const patchB4Css = `
/* HOME Patch B4 — compact hero, mobile parity, compact inline menu, footer contact parity */

/* 1) Hero stats: restore the lighter, tighter rhythm from the earlier PASS candidate */
.block-title .info.desctop{
  width:clamp(390px,22vw,425px)!important;
  min-width:390px!important;
  max-width:425px!important;
  gap:12px!important;
}
.block-title .info .item{
  min-height:76px!important;
  padding:11px 18px!important;
  grid-template-columns:minmax(195px,1.18fr) minmax(125px,.82fr)!important;
  column-gap:15px!important;
  border-radius:16px!important;
}
.block-title .info .item__number,
.block-title .info .item:nth-child(3) .item__number,
.block-title .info .item:nth-child(4) .item__number,
.block-title .info .item:nth-child(5) .item__number{
  font-size:32px!important;
  font-weight:300!important;
  line-height:1!important;
  letter-spacing:-.025em!important;
}
.block-title .info .item__text{
  font-size:14px!important;
  font-weight:400!important;
  line-height:1.18!important;
}

/* 2) Mobile header: original source shell, strong left/right alignment */
@media(max-width:768px){
  .header,
  .header__inner,
  .header__wrapper,
  .header .container{
    width:100%!important;
    max-width:none!important;
    box-sizing:border-box!important;
  }
  .header__inner,
  .header__wrapper{
    min-height:60px!important;
    height:60px!important;
  }
  .header__wrapper{
    padding:0 12px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:flex-start!important;
  }
  .header__logo{
    width:44px!important;
    height:46px!important;
    flex:0 0 44px!important;
    margin:0!important;
    justify-content:flex-start!important;
  }
  .header__logo img{
    width:36px!important;
    max-width:36px!important;
    height:42px!important;
    max-height:42px!important;
    object-fit:contain!important;
    object-position:left center!important;
  }
  .bioa-header-actions{
    margin-left:auto!important;
    gap:0!important;
  }
  .bioa-header-actions .header__btn{
    height:38px!important;
    min-height:38px!important;
    margin:0!important;
    padding:0 14px!important;
    border-radius:13px!important;
    font-size:12px!important;
  }
  .bioa-mobile-menu-button{
    margin-left:8px!important;
    width:38px!important;
    height:38px!important;
    min-width:38px!important;
    border-radius:12px!important;
  }

  /* 3) Mobile menu: ArtistLookup-style inline collapse, but compact BIO-A contact layout */
  .bioa-mobile-nav-drop{
    padding:8px 14px 14px!important;
  }
  .bioa-mobile-nav-links{
    gap:0!important;
    padding:0 0 8px!important;
  }
  .bioa-mobile-nav-links a{
    min-height:42px!important;
    padding:7px 4px!important;
    font-size:16px!important;
    border-bottom:1px solid rgba(5,47,33,.07)!important;
  }
  .bioa-mobile-nav-links a:after{
    content:"↗"!important;
    font-size:13px!important;
    font-weight:600!important;
    opacity:.72!important;
  }
  .bioa-mobile-nav-meta{
    padding-top:10px!important;
  }
  .bioa-mobile-nav-label{display:none!important}
  .bioa-mobile-menu-email{
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    min-height:40px!important;
    width:100%!important;
    padding:0 12px!important;
    margin:0 0 8px!important;
    border:1px solid rgba(17,111,71,.10)!important;
    border-radius:12px!important;
    background:rgba(252,254,241,.78)!important;
    color:var(--bioa-primary)!important;
    text-decoration:none!important;
    font-size:13px!important;
    box-sizing:border-box!important;
  }
  .bioa-mobile-contact-row{
    display:flex!important;
    align-items:center!important;
    gap:6px!important;
    width:100%!important;
    flex-wrap:nowrap!important;
  }
  .bioa-mobile-contact-row .bioa-mobile-social{
    width:38px!important;
    height:38px!important;
    min-width:38px!important;
    border-radius:11px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:var(--bioa-primary)!important;
    color:#fff!important;
    text-decoration:none!important;
  }
  .bioa-mobile-contact-row .bioa-mobile-social svg{
    width:18px!important;
    height:18px!important;
    fill:currentColor!important;
  }
  .bioa-mobile-menu-lang{
    margin:0 0 0 auto!important;
    height:38px!important;
    padding:3px!important;
    border-radius:11px!important;
    flex:0 0 auto!important;
  }
  .bioa-mobile-menu-lang a{
    width:30px!important;
    min-width:30px!important;
    height:30px!important;
    border-radius:8px!important;
    font-size:11px!important;
  }

  /* 4) We Produce mobile: mirror desktop card treatment instead of image-only tall cards */
  .block-we-produce .item{
    height:auto!important;
    min-height:0!important;
    aspect-ratio:auto!important;
    border-radius:24px!important;
    overflow:hidden!important;
  }
  .block-we-produce .item__bg{
    min-height:0!important;
    height:auto!important;
    aspect-ratio:1.16/1!important;
    border-radius:24px!important;
    overflow:hidden!important;
  }
  .block-we-produce .bg__media{
    width:100%!important;
    height:100%!important;
    object-fit:cover!important;
  }
  .block-we-produce .bg__decoration{
    width:62%!important;
    height:62%!important;
    opacity:.060!important;
  }
  .block-we-produce .item__content,
  .block-we-produce .item__info,
  .block-we-produce .item__text,
  .block-we-produce .item__description{
    display:block!important;
    visibility:visible!important;
    opacity:1!important;
  }
  .block-we-produce .item__content,
  .block-we-produce .item__info{
    position:relative!important;
    z-index:3!important;
    margin:-72px 12px 12px!important;
    padding:14px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.94)!important;
    box-sizing:border-box!important;
  }
  .block-we-produce .item__title,
  .block-we-produce .item h3{
    display:block!important;
    font-size:22px!important;
    line-height:1.1!important;
    font-weight:400!important;
    margin:0 0 8px!important;
  }
  .block-we-produce .item__description,
  .block-we-produce .item__text,
  .block-we-produce .item p{
    display:block!important;
    font-size:13px!important;
    line-height:1.4!important;
    margin:0!important;
  }

  /* Mobile title stats follow same lighter rhythm */
  .block-title-continue .info,
  .block-title-mobile .info{gap:10px!important}
  .block-title-continue .info .item,
  .block-title-mobile .info .item{
    min-height:68px!important;
    padding:10px 14px!important;
    border-radius:14px!important;
  }
  .block-title-continue .info .item__number,
  .block-title-mobile .info .item__number{
    font-size:27px!important;
    font-weight:300!important;
  }
  .block-title-continue .info .item__text,
  .block-title-mobile .info .item__text{
    font-size:12px!important;
    font-weight:400!important;
  }

  /* 5) Footer mobile mirrors desktop contact stack */
  .footer-top__email{
    display:flex!important;
    align-items:center!important;
    justify-content:flex-start!important;
    width:100%!important;
    margin:10px 0 8px!important;
  }
  .footer-top__email a{
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    min-height:40px!important;
    padding:0 14px!important;
    border-radius:12px!important;
    background:rgba(252,254,241,.62)!important;
    color:var(--bioa-primary)!important;
    text-decoration:none!important;
    font-size:13px!important;
  }
  .footer-top__socials{
    display:flex!important;
    align-items:center!important;
    gap:7px!important;
    flex-wrap:wrap!important;
  }
  .footer-top__socials a{
    width:38px!important;
    height:38px!important;
    min-width:38px!important;
    border-radius:11px!important;
  }
  .footer-top__socials svg{
    width:19px!important;
    height:19px!important;
  }
  .footer-top__logo img,.footer__logo img{
    width:72px!important;
    max-width:72px!important;
    height:auto!important;
    max-height:86px!important;
  }
}
`;


const patchB5Css = `
/* HOME Patch B5 — final visual tightening after B4 review */

/* Desktop nav: one step smaller than Patch A */
.header__nav a{
  font-size:16px!important;
}

/* Hero statistics: smaller, lighter, more editorial like the Merywood source */
.block-title .info.desctop{
  width:clamp(360px,21vw,395px)!important;
  min-width:360px!important;
  max-width:395px!important;
  gap:10px!important;
}
.block-title .info .item{
  min-height:64px!important;
  padding:9px 16px!important;
  grid-template-columns:minmax(175px,1.12fr) minmax(120px,.88fr)!important;
  column-gap:13px!important;
  border-radius:14px!important;
}
.block-title .info .item__number,
.block-title .info .item:nth-child(3) .item__number,
.block-title .info .item:nth-child(4) .item__number,
.block-title .info .item:nth-child(5) .item__number{
  font-size:27px!important;
  font-weight:300!important;
  font-variation-settings:"wght" 300!important;
  line-height:1!important;
  letter-spacing:-.02em!important;
}
.block-title .info .item__text{
  font-size:13px!important;
  font-weight:400!important;
  font-variation-settings:"wght" 400!important;
  line-height:1.16!important;
}

/* Desktop footer social sizing: Zalo wordmark needs a wider hit area */
.footer-top__socials a[aria-label="Zalo"]{
  width:48px!important;
  min-width:48px!important;
}
.footer-top__socials a[aria-label="Zalo"] svg{
  width:31px!important;
  height:22px!important;
  max-width:31px!important;
}

/* Mobile-only cloned footer contact header */
.bioa-footer-mobile-head{display:none!important}

@media(max-width:1200px){
  .header__nav a{font-size:15px!important}
}

@media(max-width:768px){
  /* keep mobile header/menu exactly as PASS */

  /* mobile hero stats use the same lighter visual language */
  .block-title-continue .info .item,
  .block-title-mobile .info .item{
    min-height:60px!important;
    padding:8px 12px!important;
    border-radius:13px!important;
  }
  .block-title-continue .info .item__number,
  .block-title-mobile .info .item__number{
    font-size:24px!important;
    font-weight:300!important;
    font-variation-settings:"wght" 300!important;
    line-height:1!important;
  }
  .block-title-continue .info .item__text,
  .block-title-mobile .info .item__text{
    font-size:11.5px!important;
    font-weight:400!important;
    line-height:1.15!important;
  }

  /* Mobile We Produce cards explicitly generated from the mobile source images */
  .bioa-produce-mobile-card{
    position:relative!important;
    display:block!important;
    height:auto!important;
    min-height:0!important;
    margin:0 0 18px!important;
    border-radius:24px!important;
    overflow:hidden!important;
    background:rgba(255,255,255,.16)!important;
  }
  .bioa-produce-mobile-media{
    position:relative!important;
    width:100%!important;
    aspect-ratio:1.08/1!important;
    min-height:0!important;
    overflow:hidden!important;
    border-radius:24px!important;
  }
  .bioa-produce-mobile-media img{
    display:block!important;
    width:100%!important;
    height:100%!important;
    object-fit:cover!important;
  }
  .bioa-produce-mobile-card:before{
    content:""!important;
    position:absolute!important;
    z-index:1!important;
    top:18%!important;
    left:50%!important;
    width:60%!important;
    height:52%!important;
    transform:translateX(-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.055!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .bioa-produce-mobile-title{
    position:absolute!important;
    z-index:3!important;
    top:18px!important;
    left:18px!important;
    margin:0!important;
    max-width:75%!important;
    color:#111!important;
    font-size:23px!important;
    font-weight:400!important;
    line-height:1.08!important;
  }
  .bioa-produce-mobile-copy{
    position:relative!important;
    z-index:4!important;
    margin:-58px 12px 12px!important;
    padding:14px 15px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.95)!important;
    color:#1e1e1e!important;
    font-size:12.5px!important;
    font-weight:400!important;
    line-height:1.42!important;
    box-sizing:border-box!important;
  }

  /* Mobile footer: logo left, contact stack right on one row */
  .footer-top > .container > .footer-top__logo,
  .footer-top > .container > .footer-top__email,
  .footer-top > .container > .footer-top__socials,
  .footer-top__inner > .footer-top__logo,
  .footer-top__inner > .footer-top__email,
  .footer-top__inner > .footer-top__socials{
    display:none!important;
  }
  .bioa-footer-mobile-head{
    display:flex!important;
    align-items:flex-start!important;
    justify-content:space-between!important;
    gap:16px!important;
    width:100%!important;
    margin:0 0 22px!important;
    box-sizing:border-box!important;
  }
  .bioa-footer-mobile-logo{
    flex:0 0 78px!important;
    width:78px!important;
    min-width:78px!important;
  }
  .bioa-footer-mobile-logo img{
    display:block!important;
    width:72px!important;
    max-width:72px!important;
    height:auto!important;
    object-fit:contain!important;
  }
  .bioa-footer-mobile-contact{
    flex:1 1 auto!important;
    min-width:0!important;
    max-width:250px!important;
    display:flex!important;
    flex-direction:column!important;
    align-items:flex-end!important;
    gap:7px!important;
  }
  .bioa-footer-mobile-email{
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    width:100%!important;
    min-height:38px!important;
    padding:0 10px!important;
    border-radius:12px!important;
    background:rgba(252,254,241,.62)!important;
    color:var(--bioa-primary)!important;
    text-decoration:none!important;
    font-size:12px!important;
    white-space:nowrap!important;
    box-sizing:border-box!important;
  }
  .bioa-footer-mobile-socials{
    display:flex!important;
    align-items:center!important;
    justify-content:flex-end!important;
    gap:6px!important;
    width:100%!important;
  }
  .bioa-footer-mobile-socials a{
    width:36px!important;
    height:36px!important;
    min-width:36px!important;
    border-radius:10px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:rgba(255,255,255,.10)!important;
    color:#fff!important;
    text-decoration:none!important;
  }
  .bioa-footer-mobile-socials svg{
    width:18px!important;
    height:18px!important;
    fill:currentColor!important;
  }
  .bioa-footer-mobile-socials a[aria-label="Zalo"]{
    width:44px!important;
    min-width:44px!important;
  }
  .bioa-footer-mobile-socials a[aria-label="Zalo"] svg{
    width:29px!important;
    height:20px!important;
  }
}
`;


const patchB6Css = `
/* HOME Patch B6 — targeted cleanup; mobile header/menu stays on the B4 PASS baseline */

/* Nav desktop: one pixel down from the approved larger setting */
.header__nav a{font-size:16px!important}
@media(max-width:1200px){.header__nav a{font-size:15px!important}}

/* Hero stats — compact geometry + genuinely light typography on every nested node */
.block-title .info.desctop{
  width:clamp(330px,19.5vw,365px)!important;
  min-width:330px!important;
  max-width:365px!important;
  gap:9px!important;
}
.block-title .info .item{
  min-height:60px!important;
  padding:8px 14px!important;
  grid-template-columns:minmax(160px,1.08fr) minmax(112px,.92fr)!important;
  column-gap:12px!important;
  border-radius:13px!important;
}
.block-title .info .item__number,
.block-title .info .item__number *,
.block-title .info .item:nth-child(3) .item__number,
.block-title .info .item:nth-child(4) .item__number,
.block-title .info .item:nth-child(5) .item__number{
  font-size:24px!important;
  font-weight:200!important;
  font-variation-settings:"wght" 200!important;
  line-height:1!important;
  letter-spacing:-.018em!important;
  color:#565656!important;
  -webkit-font-smoothing:antialiased!important;
}
.block-title .info .item__text,
.block-title .info .item__text *{
  font-size:12.5px!important;
  font-weight:300!important;
  font-variation-settings:"wght" 300!important;
  line-height:1.16!important;
  color:#4f4f4f!important;
  -webkit-font-smoothing:antialiased!important;
}

/* Desktop footer contact proportions */
.footer-top__logo img,.footer__logo img{
  width:106px!important;
  max-width:106px!important;
  height:auto!important;
  max-height:126px!important;
  object-fit:contain!important;
}
.footer-top__email a{
  width:208px!important;
  min-width:208px!important;
  box-sizing:border-box!important;
}
.footer-top__socials{
  width:208px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:8px!important;
}
.footer-top__socials a{
  width:46px!important;
  min-width:46px!important;
  height:46px!important;
  border-radius:13px!important;
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  box-sizing:border-box!important;
}
.footer-top__socials a[aria-label="Zalo"]{
  width:46px!important;
  min-width:46px!important;
  height:46px!important;
  border-radius:13px!important;
  font-size:13px!important;
  font-weight:500!important;
  line-height:1!important;
  color:#fff!important;
}
.footer-top__socials a[aria-label="Zalo"] svg{display:none!important}

/* Custom mobile Produce exists only on mobile */
.bioa-produce-mobile-custom{display:none!important}
.bioa-footer-mobile-v2{display:none!important}

@media(max-width:768px){
  /* Mobile stat typography — same thin source-like hierarchy */
  .block-title-continue .info .item,
  .block-title-mobile .info .item{
    min-height:58px!important;
    padding:8px 12px!important;
    border-radius:13px!important;
  }
  .block-title-continue .info .item__number,
  .block-title-continue .info .item__number *,
  .block-title-mobile .info .item__number,
  .block-title-mobile .info .item__number *{
    font-size:22px!important;
    font-weight:200!important;
    font-variation-settings:"wght" 200!important;
    line-height:1!important;
    -webkit-font-smoothing:antialiased!important;
  }
  .block-title-continue .info .item__text,
  .block-title-continue .info .item__text *,
  .block-title-mobile .info .item__text,
  .block-title-mobile .info .item__text *{
    font-size:11px!important;
    font-weight:300!important;
    font-variation-settings:"wght" 300!important;
    line-height:1.15!important;
    -webkit-font-smoothing:antialiased!important;
  }

  /* Hide the source mobile Produce block only after a replacement was built */
  .bioa-produce-mobile-source{display:none!important}
  .bioa-produce-mobile-custom{
    display:block!important;
    padding:34px 14px 42px!important;
    background:var(--bioa-cream)!important;
    box-sizing:border-box!important;
  }
  .bioa-produce-mobile-custom__title{
    margin:0 0 22px!important;
    text-align:center!important;
    font-size:29px!important;
    line-height:1.08!important;
    font-weight:400!important;
    color:#111!important;
  }
  .bioa-produce-mobile-custom__card{
    position:relative!important;
    margin:0 0 18px!important;
    border-radius:25px!important;
    overflow:hidden!important;
    background:#eef0eb!important;
  }
  .bioa-produce-mobile-custom__media{
    position:relative!important;
    width:100%!important;
    aspect-ratio:1.12/1!important;
    overflow:hidden!important;
  }
  .bioa-produce-mobile-custom__media picture,
  .bioa-produce-mobile-custom__media img{
    display:block!important;
    width:100%!important;
    height:100%!important;
  }
  .bioa-produce-mobile-custom__media img{
    object-fit:cover!important;
  }
  .bioa-produce-mobile-custom__card:before{
    content:""!important;
    position:absolute!important;
    z-index:1!important;
    top:18%!important;
    left:50%!important;
    width:62%!important;
    height:48%!important;
    transform:translateX(-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.055!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .bioa-produce-mobile-custom__name{
    position:absolute!important;
    z-index:3!important;
    top:18px!important;
    left:18px!important;
    margin:0!important;
    font-size:23px!important;
    line-height:1.08!important;
    font-weight:400!important;
    color:#111!important;
  }
  .bioa-produce-mobile-custom__copy{
    position:relative!important;
    z-index:4!important;
    margin:-58px 12px 12px!important;
    padding:14px 15px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.95)!important;
    color:#222!important;
    font-size:12.5px!important;
    font-weight:400!important;
    line-height:1.42!important;
    box-sizing:border-box!important;
  }

  /* Hide original footer contact nodes only when the reliable mobile clone exists */
  .bioa-footer-original-contact{display:none!important}
  .bioa-footer-mobile-v2{
    display:flex!important;
    align-items:flex-start!important;
    justify-content:space-between!important;
    gap:14px!important;
    width:100%!important;
    margin:0 0 20px!important;
    box-sizing:border-box!important;
  }
  .bioa-footer-mobile-v2__logo{
    flex:0 0 70px!important;
    width:70px!important;
  }
  .bioa-footer-mobile-v2__logo img{
    display:block!important;
    width:66px!important;
    max-width:66px!important;
    height:auto!important;
    object-fit:contain!important;
  }
  .bioa-footer-mobile-v2__contact{
    flex:0 0 162px!important;
    width:162px!important;
    display:flex!important;
    flex-direction:column!important;
    gap:7px!important;
  }
  .bioa-footer-mobile-v2__email{
    width:162px!important;
    min-height:36px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    padding:0 8px!important;
    border-radius:11px!important;
    background:rgba(252,254,241,.62)!important;
    color:var(--bioa-primary)!important;
    text-decoration:none!important;
    font-size:11.5px!important;
    white-space:nowrap!important;
    box-sizing:border-box!important;
  }
  .bioa-footer-mobile-v2__socials{
    width:162px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:space-between!important;
    gap:6px!important;
  }
  .bioa-footer-mobile-v2__socials a{
    width:36px!important;
    min-width:36px!important;
    height:36px!important;
    border-radius:10px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:rgba(255,255,255,.10)!important;
    color:#fff!important;
    text-decoration:none!important;
    box-sizing:border-box!important;
  }
  .bioa-footer-mobile-v2__socials svg{
    width:18px!important;
    height:18px!important;
    fill:currentColor!important;
  }
  .bioa-footer-mobile-v2__socials a[aria-label="Zalo"]{
    font-size:10.5px!important;
    font-weight:500!important;
    line-height:1!important;
  }
}
`;


const patchB7Css = `
/* HOME Patch B7 — final scoped fixes: footer email, clean mobile trigger, mobile Produce */

/* Footer desktop: no double shell; match header email material and exact social-row width */
.footer-top__email{
  width:208px!important;
  min-width:208px!important;
  margin:0 0 10px!important;
  padding:0!important;
  background:transparent!important;
  border:0!important;
  border-radius:0!important;
  box-shadow:none!important;
  overflow:visible!important;
}
.footer-top__email a{
  width:208px!important;
  min-width:208px!important;
  height:46px!important;
  min-height:46px!important;
  padding:0 14px!important;
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  box-sizing:border-box!important;
  border-radius:14px!important;
  background:rgba(252,254,241,.72)!important;
  border:1px solid rgba(17,111,71,.12)!important;
  box-shadow:none!important;
  color:var(--bioa-primary)!important;
  font-size:13px!important;
  font-weight:400!important;
  line-height:1!important;
  white-space:nowrap!important;
  text-decoration:none!important;
}
.footer-top__socials{
  width:208px!important;
  min-width:208px!important;
}

/* Clean replacement burger: same visual size, no Merywood menu hooks/classes */
.bioa-mobile-menu-button-clean{display:none!important}

@media(max-width:768px){
  .bioa-mobile-menu-button{display:none!important}
  .bioa-mobile-menu-button-clean{
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    flex:0 0 38px!important;
    width:38px!important;
    min-width:38px!important;
    height:38px!important;
    margin-left:8px!important;
    padding:0!important;
    border:0!important;
    border-radius:12px!important;
    background:rgba(252,254,241,.76)!important;
    color:var(--bioa-dark)!important;
    box-shadow:none!important;
    cursor:pointer!important;
  }
  .bioa-mobile-menu-button-clean svg{
    width:18px!important;
    height:18px!important;
    display:block!important;
    stroke:currentColor!important;
    fill:none!important;
  }

  /* Source mobile We Produce is rebuilt in-place, so these rules cannot miss its DOM */
  .bioa-produce-mobile-direct{
    padding:34px 14px 40px!important;
    margin:0!important;
    background:var(--bioa-cream)!important;
    box-sizing:border-box!important;
  }
  .bioa-produce-mobile-shell{
    width:100%!important;
    max-width:none!important;
    margin:0!important;
    padding:0!important;
  }
  .bioa-produce-mobile-direct__title{
    margin:0 0 22px!important;
    text-align:center!important;
    font-size:29px!important;
    line-height:1.08!important;
    font-weight:400!important;
    color:#111!important;
  }
  .bioa-produce-mobile-direct__card{
    position:relative!important;
    width:100%!important;
    margin:0 0 18px!important;
    border-radius:24px!important;
    overflow:hidden!important;
    background:#eef0eb!important;
  }
  .bioa-produce-mobile-direct__media{
    position:relative!important;
    width:100%!important;
    aspect-ratio:1.12/1!important;
    overflow:hidden!important;
  }
  .bioa-produce-mobile-direct__media picture,
  .bioa-produce-mobile-direct__media img{
    display:block!important;
    width:100%!important;
    height:100%!important;
  }
  .bioa-produce-mobile-direct__media img{
    object-fit:cover!important;
  }
  .bioa-produce-mobile-direct__card:before{
    content:""!important;
    position:absolute!important;
    z-index:1!important;
    top:16%!important;
    left:50%!important;
    width:62%!important;
    height:50%!important;
    transform:translateX(-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.055!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .bioa-produce-mobile-direct__name{
    position:absolute!important;
    z-index:3!important;
    top:18px!important;
    left:18px!important;
    max-width:75%!important;
    margin:0!important;
    color:#111!important;
    font-size:22px!important;
    font-weight:400!important;
    line-height:1.08!important;
  }
  .bioa-produce-mobile-direct__copy{
    position:relative!important;
    z-index:4!important;
    margin:-58px 12px 12px!important;
    padding:14px 15px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.95)!important;
    color:#222!important;
    font-size:12.5px!important;
    font-weight:400!important;
    line-height:1.42!important;
    box-sizing:border-box!important;
  }

  /* Keep footer mobile's contact material consistent too */
  .bioa-footer-mobile-v2__email{
    background:rgba(252,254,241,.72)!important;
    border:1px solid rgba(17,111,71,.12)!important;
  }
}
`;


const patchB8Css = `
/* HOME Patch B8 — isolate mobile nav from sticky-header scroll effects + rebuild mobile Produce reliably */
@media(max-width:768px){
  /* Menu lives outside .header, so Merywood sticky/scroll effects cannot blur it. */
  html.bioa-mobile-nav-open,
  body.bioa-mobile-nav-open{
    overflow:hidden!important;
    overscroll-behavior:none!important;
  }
  body > .bioa-mobile-nav{
    position:fixed!important;
    top:60px!important;
    left:0!important;
    right:0!important;
    width:100vw!important;
    height:calc(100dvh - 60px)!important;
    max-height:0!important;
    z-index:99980!important;
    overflow:hidden!important;
    background:#fff!important;
    border-top:1px solid rgba(5,47,33,.08)!important;
    box-shadow:none!important;
    filter:none!important;
    -webkit-filter:none!important;
    backdrop-filter:none!important;
    -webkit-backdrop-filter:none!important;
    opacity:1!important;
    visibility:visible!important;
    pointer-events:none!important;
    transform:none!important;
    transition:max-height .22s ease!important;
  }
  body > .bioa-mobile-nav.open{
    max-height:calc(100dvh - 60px)!important;
    overflow-y:auto!important;
    overflow-x:hidden!important;
    overscroll-behavior:contain!important;
    pointer-events:auto!important;
    box-shadow:0 16px 36px rgba(0,0,0,.08)!important;
  }

  /* Hard reset the actual mobile We Produce section after server-side rebuild. */
  .bioa-produce-mobile-direct{
    display:block!important;
    width:100%!important;
    height:auto!important;
    min-height:0!important;
    max-height:none!important;
    padding:34px 14px 42px!important;
    margin:0!important;
    overflow:visible!important;
    background:var(--bioa-cream)!important;
    box-sizing:border-box!important;
  }
  .bioa-produce-mobile-shell{
    display:block!important;
    width:100%!important;
    max-width:none!important;
    height:auto!important;
    margin:0!important;
    padding:0!important;
  }
  .bioa-produce-mobile-direct__title{
    display:block!important;
    margin:0 0 22px!important;
    text-align:center!important;
    color:#111!important;
    font-size:29px!important;
    font-weight:400!important;
    line-height:1.08!important;
  }
  .bioa-produce-mobile-direct__card{
    position:relative!important;
    display:block!important;
    width:100%!important;
    height:auto!important;
    min-height:0!important;
    margin:0 0 20px!important;
    border-radius:24px!important;
    overflow:hidden!important;
    background:#eef0eb!important;
  }
  .bioa-produce-mobile-direct__media{
    position:relative!important;
    display:block!important;
    width:100%!important;
    height:auto!important;
    aspect-ratio:1.12/1!important;
    overflow:hidden!important;
  }
  .bioa-produce-mobile-direct__media picture,
  .bioa-produce-mobile-direct__media img{
    display:block!important;
    width:100%!important;
    height:100%!important;
    max-width:none!important;
    max-height:none!important;
  }
  .bioa-produce-mobile-direct__media img{
    object-fit:cover!important;
  }
  .bioa-produce-mobile-direct__card:before{
    content:""!important;
    position:absolute!important;
    z-index:1!important;
    top:16%!important;
    left:50%!important;
    width:62%!important;
    height:50%!important;
    transform:translateX(-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.055!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .bioa-produce-mobile-direct__name{
    position:absolute!important;
    z-index:3!important;
    top:18px!important;
    left:18px!important;
    display:block!important;
    max-width:75%!important;
    margin:0!important;
    color:#111!important;
    font-size:22px!important;
    font-weight:400!important;
    line-height:1.08!important;
  }
  .bioa-produce-mobile-direct__copy{
    position:relative!important;
    z-index:4!important;
    display:block!important;
    margin:-58px 12px 12px!important;
    padding:14px 15px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.95)!important;
    color:#222!important;
    font-size:12.5px!important;
    font-weight:400!important;
    line-height:1.42!important;
    box-sizing:border-box!important;
  }
}
`;


const patchB9Css = `
/* HOME Patch B9 — final polish: footer email color, compact mobile menu, visible BIO-A mobile watermark */

/* Match the footer email's visible fill to the header email on a light surface. */
.footer-top__email a{
  background:#FDFEF5!important;
}
@media(max-width:768px){
  .bioa-footer-mobile-v2__email{
    background:#FDFEF5!important;
  }

  /* Keep the menu isolated from sticky-header effects, but size it to its content instead of full-screen. */
  body > .bioa-mobile-nav{
    height:auto!important;
    max-height:0!important;
    bottom:auto!important;
    overflow:hidden!important;
  }
  body > .bioa-mobile-nav.open{
    height:auto!important;
    max-height:min(390px,calc(100dvh - 74px))!important;
    overflow-y:auto!important;
    overflow-x:hidden!important;
  }

  /* Put the BIO-A monogram above each mobile Produce image, like the desktop cards. */
  .bioa-produce-mobile-direct__media{
    position:relative!important;
    isolation:isolate!important;
  }
  .bioa-produce-mobile-direct__media picture,
  .bioa-produce-mobile-direct__media img{
    position:relative!important;
    z-index:1!important;
  }
  .bioa-produce-mobile-direct__media:after{
    content:""!important;
    position:absolute!important;
    z-index:2!important;
    left:50%!important;
    top:50%!important;
    width:64%!important;
    height:58%!important;
    transform:translate(-50%,-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.065!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  /* Disable the older behind-image watermark to avoid doubling. */
  .bioa-produce-mobile-direct__card:before{
    display:none!important;
  }
}
`;


const patchB11Css = `
/* HOME Patch B11 — restore pre-B10 We Produce and keep BIO-A watermark beneath product artwork */
@media(max-width:768px){
  .bioa-produce-mobile-direct__media{
    position:relative!important;
    isolation:isolate!important;
    background:transparent!important;
  }
  .bioa-produce-mobile-direct__media:after{
    z-index:0!important;
    opacity:.055!important;
  }
  .bioa-produce-mobile-direct__media picture,
  .bioa-produce-mobile-direct__media img{
    position:relative!important;
    z-index:1!important;
  }
}
`;


const patchB12Css = `
/* HOME Patch B12 — lock desktop Produce layering + clean mobile Produce from 72dc baseline */

/* Mobile replacement is fully isolated from the desktop source block. */
.bioa-produce-mobile-clean{display:none!important}

@media(max-width:768px){
  .bioa-produce-mobile-source-safe{display:none!important}
  .bioa-produce-mobile-clean{
    display:block!important;
    width:100%!important;
    padding:34px 14px 42px!important;
    margin:0!important;
    background:var(--bioa-cream)!important;
    box-sizing:border-box!important;
  }
  .bioa-produce-mobile-clean__inner{
    width:100%!important;
    margin:0!important;
    padding:0!important;
  }
  .bioa-produce-mobile-clean__title{
    margin:0 0 22px!important;
    text-align:center!important;
    color:#111!important;
    font-size:29px!important;
    line-height:1.08!important;
    font-weight:400!important;
  }
  .bioa-produce-mobile-clean__card{
    position:relative!important;
    isolation:isolate!important;
    width:100%!important;
    margin:0 0 20px!important;
    border-radius:24px!important;
    overflow:hidden!important;
    background:#eef0eb!important;
  }
  .bioa-produce-mobile-clean__media{
    position:relative!important;
    isolation:isolate!important;
    width:100%!important;
    aspect-ratio:1.12/1!important;
    overflow:hidden!important;
    background:#eef0eb!important;
  }
  /* BIO-A watermark sits under the product photo, never over it. */
  .bioa-produce-mobile-clean__media:before{
    content:""!important;
    position:absolute!important;
    z-index:0!important;
    left:50%!important;
    top:50%!important;
    width:62%!important;
    height:58%!important;
    transform:translate(-50%,-50%)!important;
    background:var(--bioa-primary)!important;
    opacity:.055!important;
    pointer-events:none!important;
    -webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
    mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;
  }
  .bioa-produce-mobile-clean__media img{
    position:relative!important;
    z-index:1!important;
    display:block!important;
    width:100%!important;
    height:100%!important;
    object-fit:cover!important;
  }
  .bioa-produce-mobile-clean__name{
    position:absolute!important;
    z-index:3!important;
    top:18px!important;
    left:18px!important;
    max-width:76%!important;
    margin:0!important;
    color:#111!important;
    font-size:22px!important;
    line-height:1.08!important;
    font-weight:400!important;
  }
  .bioa-produce-mobile-clean__copy{
    position:relative!important;
    z-index:4!important;
    margin:-58px 12px 12px!important;
    padding:14px 15px!important;
    border-radius:18px!important;
    background:rgba(255,255,255,.95)!important;
    color:#222!important;
    font-size:12.5px!important;
    line-height:1.42!important;
    font-weight:400!important;
    box-sizing:border-box!important;
  }
}
`;


const patchB13Css = `
/* HOME Patch B13 — keep We Produce copy panels inside each card */

/* Mobile clean cards: keep the description floating inside the image/card,
   matching the desktop overlap instead of extending below the card. */
@media(max-width:768px){
  .bioa-produce-mobile-clean__card{
    position:relative!important;
    overflow:hidden!important;
  }
  .bioa-produce-mobile-clean__copy{
    position:absolute!important;
    left:12px!important;
    right:12px!important;
    bottom:12px!important;
    width:auto!important;
    margin:0!important;
    z-index:4!important;
    box-sizing:border-box!important;
  }
}
`;


const patchB14Css = `
/* HOME Patch B14 — desktop We Produce layer correction only.
   IMPORTANT: preserve Merywood's original positioning rules.
   Merywood already keeps the copy panel inside the card; we only adjust stacking. */
@media(min-width:769px){
  .block-we-produce .bg__decoration{
    z-index:0!important;
  }
  .block-we-produce .bg__media{
    z-index:1!important;
  }
  .block-we-produce .item__content,
  .block-we-produce .item__info,
  .block-we-produce .item__text,
  .block-we-produce .item__description{
    z-index:5!important;
  }
}
`;


const patchHeroStatsSourceCss = `
/* HERO STATS SOURCE-AUTHORITY HOTFIX
   Typography intentionally comes 100% from the original Merywood stylesheet.
   Only geometry is widened enough for BIO-A's longer values so no number is clipped. */
@media(min-width:769px){
  .block-title .info.desctop{
    width:clamp(430px,24vw,470px)!important;
    min-width:430px!important;
    max-width:470px!important;
    gap:16px!important;
  }
  .block-title .info .item{
    width:100%!important;
    min-height:94px!important;
    padding:15px 24px!important;
    display:grid!important;
    grid-template-columns:minmax(220px,1.22fr) minmax(150px,.78fr)!important;
    column-gap:20px!important;
    align-items:center!important;
    border-radius:15px!important;
    box-sizing:border-box!important;
  }
  .block-title .info .item__number{
    min-width:0!important;
    max-width:none!important;
    white-space:nowrap!important;
    overflow:visible!important;
  }
  .block-title .info .item__text{
    min-width:0!important;
    max-width:none!important;
    white-space:normal!important;
    overflow:visible!important;
  }
}
@media(max-width:1200px) and (min-width:769px){
  .block-title .info.desctop{
    width:420px!important;
    min-width:420px!important;
    max-width:420px!important;
  }
  .block-title .info .item{
    min-height:88px!important;
    padding:13px 20px!important;
    grid-template-columns:minmax(205px,1.2fr) minmax(145px,.8fr)!important;
    column-gap:16px!important;
  }
}
@media(max-width:768px){
  .block-title-continue .info,
  .block-title-mobile .info{
    gap:10px!important;
  }
  .block-title-continue .info .item,
  .block-title-mobile .info .item{
    min-height:70px!important;
    padding:10px 14px!important;
    border-radius:14px!important;
    box-sizing:border-box!important;
  }
  .block-title-continue .info .item__number,
  .block-title-mobile .info .item__number{
    white-space:nowrap!important;
    overflow:visible!important;
  }
}
`;


const patchHeroStatsOriginalTypeCss = `
/* HERO STATS — original Merywood typography authority.
   The supplied Merywood source loads Manrope at 400/600/700 only.
   Use the original regular 400 face; do not request synthetic 200/300 weights. */
.block-title .info .item__number,
.block-title .info .item__number *,
.block-title-continue .info .item__number,
.block-title-continue .info .item__number *,
.block-title-mobile .info .item__number,
.block-title-mobile .info .item__number *{
  font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
  font-weight:400!important;
  font-style:normal!important;
  font-variation-settings:normal!important;
  font-synthesis:none!important;
  text-shadow:none!important;
  -webkit-text-stroke:0!important;
  -webkit-font-smoothing:antialiased!important;
}

.block-title .info .item__text,
.block-title .info .item__text *,
.block-title-continue .info .item__text,
.block-title-continue .info .item__text *,
.block-title-mobile .info .item__text,
.block-title-mobile .info .item__text *{
  font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
  font-weight:400!important;
  font-style:normal!important;
  font-variation-settings:normal!important;
  font-synthesis:none!important;
  text-shadow:none!important;
  -webkit-text-stroke:0!important;
  -webkit-font-smoothing:antialiased!important;
}

@media(min-width:769px){
  .block-title .info .item__number,
  .block-title .info .item__number *{
    font-size:40px!important;
    line-height:1.05!important;
    letter-spacing:0!important;
  }
  .block-title .info .item__text,
  .block-title .info .item__text *{
    font-size:16px!important;
    line-height:1.25!important;
    letter-spacing:0!important;
  }
}
@media(max-width:1200px) and (min-width:769px){
  .block-title .info .item__number,
  .block-title .info .item__number *{
    font-size:38px!important;
  }
  .block-title .info .item__text,
  .block-title .info .item__text *{
    font-size:15px!important;
  }
}
@media(max-width:768px){
  .block-title-continue .info .item__number,
  .block-title-continue .info .item__number *,
  .block-title-mobile .info .item__number,
  .block-title-mobile .info .item__number *{
    font-size:28px!important;
    line-height:1.05!important;
    letter-spacing:0!important;
  }
  .block-title-continue .info .item__text,
  .block-title-continue .info .item__text *,
  .block-title-mobile .info .item__text,
  .block-title-mobile .info .item__text *{
    font-size:13px!important;
    line-height:1.22!important;
    letter-spacing:0!important;
  }
}
`;


const patchHeroStatsFinalSourceCss = `
/* HERO STATS FINAL SOURCE FIX
   Desktop follows the original Merywood stat-card rule:
   max-width 27.625rem, gap 1.125rem, card gap 1.5625rem,
   padding 1.5625rem 2rem, number 2.5rem/300, label 1rem/1.4.
   BIO-A adaptation: only widen the number column so longer values never clip. */
@media(min-width:769px){
  .block-title .info.desctop{
    width:27.625rem!important;
    min-width:27.625rem!important;
    max-width:27.625rem!important;
    gap:1.125rem!important;
  }
  .block-title .info.desctop .list{
    gap:1.125rem!important;
  }
  .block-title .info.desctop .list > .item{
    width:100%!important;
    min-height:0!important;
    display:flex!important;
    align-items:center!important;
    gap:1.5625rem!important;
    padding:1.5625rem 2rem!important;
    box-sizing:border-box!important;
    border-radius:.9375rem!important;
  }

  /* Explicit nth-child specificity neutralizes the older BIO-A experiments. */
  body .block-title .info.desctop .list > .item:nth-child(1) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(2) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(3) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(4) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(5) .item__number{
    flex:0 0 13.125rem!important;
    width:13.125rem!important;
    min-width:13.125rem!important;
    max-width:13.125rem!important;
    margin:0!important;
    font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
    font-size:2.5rem!important;
    font-weight:300!important;
    font-style:normal!important;
    line-height:1!important;
    letter-spacing:-.02em!important;
    white-space:nowrap!important;
    overflow:visible!important;
    color:#505050!important;
    -webkit-text-fill-color:#505050!important;
    background:none!important;
    text-shadow:none!important;
    -webkit-text-stroke:0!important;
  }
  body .block-title .info.desctop .list > .item:nth-child(1) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(2) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(3) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(4) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(5) .item__text{
    flex:1 1 auto!important;
    min-width:0!important;
    max-width:none!important;
    margin:0!important;
    font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
    font-size:1rem!important;
    font-weight:400!important;
    font-style:normal!important;
    line-height:1.4!important;
    letter-spacing:0!important;
    color:#4f4f4f!important;
    white-space:normal!important;
    overflow:visible!important;
  }
  body .block-title .info.desctop .list > .item .item__text p{
    margin:0!important;
    font:inherit!important;
    color:inherit!important;
  }
}

@media(max-width:1200px) and (min-width:769px){
  .block-title .info.desctop{
    width:26.25rem!important;
    min-width:26.25rem!important;
    max-width:26.25rem!important;
  }
  .block-title .info.desctop .list > .item{
    gap:1.25rem!important;
    padding:1.35rem 1.5rem!important;
  }
  body .block-title .info.desctop .list > .item:nth-child(1) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(2) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(3) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(4) .item__number,
  body .block-title .info.desctop .list > .item:nth-child(5) .item__number{
    flex-basis:12rem!important;
    width:12rem!important;
    min-width:12rem!important;
    max-width:12rem!important;
    font-size:2.25rem!important;
  }
  body .block-title .info.desctop .list > .item:nth-child(1) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(2) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(3) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(4) .item__text,
  body .block-title .info.desctop .list > .item:nth-child(5) .item__text{
    font-size:.9375rem!important;
  }
}

/* Mobile: keep the already-approved card geometry; correct only type weight/size.
   Explicit nth-child selectors prevent old experimental rules from winning. */
@media(max-width:768px){
  body .block-title-continue .info .list > .item:nth-child(1) .item__number,
  body .block-title-continue .info .list > .item:nth-child(2) .item__number,
  body .block-title-continue .info .list > .item:nth-child(3) .item__number,
  body .block-title-continue .info .list > .item:nth-child(4) .item__number,
  body .block-title-continue .info .list > .item:nth-child(5) .item__number,
  body .block-title-mobile .info .list > .item:nth-child(1) .item__number,
  body .block-title-mobile .info .list > .item:nth-child(2) .item__number,
  body .block-title-mobile .info .list > .item:nth-child(3) .item__number,
  body .block-title-mobile .info .list > .item:nth-child(4) .item__number,
  body .block-title-mobile .info .list > .item:nth-child(5) .item__number{
    font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
    font-size:1.75rem!important;
    font-weight:300!important;
    font-style:normal!important;
    line-height:1!important;
    letter-spacing:-.02em!important;
    text-shadow:none!important;
    -webkit-text-stroke:0!important;
  }
  body .block-title-continue .info .list > .item:nth-child(1) .item__text,
  body .block-title-continue .info .list > .item:nth-child(2) .item__text,
  body .block-title-continue .info .list > .item:nth-child(3) .item__text,
  body .block-title-continue .info .list > .item:nth-child(4) .item__text,
  body .block-title-continue .info .list > .item:nth-child(5) .item__text,
  body .block-title-mobile .info .list > .item:nth-child(1) .item__text,
  body .block-title-mobile .info .list > .item:nth-child(2) .item__text,
  body .block-title-mobile .info .list > .item:nth-child(3) .item__text,
  body .block-title-mobile .info .list > .item:nth-child(4) .item__text,
  body .block-title-mobile .info .list > .item:nth-child(5) .item__text{
    font-family:Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
    font-size:.8125rem!important;
    font-weight:400!important;
    font-style:normal!important;
    line-height:1.25!important;
    letter-spacing:0!important;
  }
}
`;


const patchC2Css = `
/* PATCH C2 — source-first Merywood chat parity.
   Preserve the Merywood information hierarchy: compact agent header, 2 primary actions,
   compact channel row, History cards, composer fixed at the bottom. */
.bioa-contact-fab{
  position:fixed!important;
  right:22px!important;
  bottom:22px!important;
  z-index:99990!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:flex-end!important;
  gap:12px!important;
}
.bioa-contact-fab__panel{
  display:none!important;
  width:360px!important;
  max-width:calc(100vw - 28px)!important;
  height:590px!important;
  max-height:calc(100vh - 96px)!important;
  padding:0!important;
  overflow:hidden!important;
  border-radius:26px!important;
  background:#fff!important;
  border:1px solid rgba(5,47,33,.08)!important;
  box-shadow:0 18px 58px rgba(5,47,33,.20)!important;
}
.bioa-contact-fab.is-open .bioa-contact-fab__panel{
  display:flex!important;
  flex-direction:column!important;
}

/* Merywood-style compact agent header */
.bioa-chat__head{
  position:relative!important;
  flex:0 0 auto!important;
  padding:18px 54px 14px!important;
  background:#f1f1f1!important;
  text-align:center!important;
  border-bottom:1px solid #e9e9e9!important;
}
.bioa-chat__avatars{
  display:flex!important;
  justify-content:center!important;
  align-items:center!important;
  height:42px!important;
  margin:0 0 7px!important;
}
.bioa-chat__avatar{
  width:42px!important;
  height:42px!important;
  margin-left:-7px!important;
  border-radius:50%!important;
  background:var(--bioa-ivory)!important;
  border:2px solid #fff!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  overflow:hidden!important;
  box-sizing:border-box!important;
}
.bioa-chat__avatar:first-child{margin-left:0!important}
.bioa-chat__avatar img{width:78%!important;height:78%!important;object-fit:contain!important}
.bioa-chat__avatar--text{
  font-size:10.5px!important;
  line-height:1!important;
  font-weight:600!important;
  color:var(--bioa-primary)!important;
}
.bioa-chat__title{
  margin:0!important;
  color:#303030!important;
  font-size:20px!important;
  line-height:1.18!important;
  font-weight:600!important;
}
.bioa-chat__sub{
  margin-top:4px!important;
  color:#747474!important;
  font-size:13.5px!important;
  line-height:1.25!important;
  font-weight:400!important;
}
.bioa-chat__collapse{
  position:absolute!important;
  top:16px!important;
  right:16px!important;
  width:38px!important;
  height:38px!important;
  padding:0!important;
  border:0!important;
  border-radius:50%!important;
  background:#fafafa!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  cursor:pointer!important;
  color:#333!important;
}
.bioa-chat__collapse svg{
  width:18px!important;height:18px!important;
  fill:none!important;stroke:currentColor!important;stroke-width:2.2!important;
}

/* Primary actions: same 2-column hierarchy as Merywood */
.bioa-chat__actions-wrap{
  flex:0 0 auto!important;
  background:#fff!important;
  border-bottom:1px solid #e9e9e9!important;
}
.bioa-chat__actions{
  display:grid!important;
  grid-template-columns:1fr 1fr!important;
  min-height:92px!important;
  padding:0 34px!important;
}
.bioa-chat__action{
  border:0!important;
  background:#fff!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:center!important;
  justify-content:center!important;
  gap:5px!important;
  color:#343434!important;
  text-decoration:none!important;
  font:600 14px/1.15 inherit!important;
  cursor:pointer!important;
}
.bioa-chat__action:hover{background:#fafafa!important}
.bioa-chat__action-icon{
  width:43px!important;
  height:43px!important;
  border-radius:50%!important;
  background:#efefef!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
}
.bioa-chat__action-icon svg{
  width:21px!important;height:21px!important;
  fill:var(--bioa-deep)!important;
}
.bioa-chat__action-icon--pencil svg{
  fill:none!important;
  stroke:var(--bioa-deep)!important;
  stroke-width:2.2!important;
  stroke-linecap:round!important;
  stroke-linejoin:round!important;
}

/* Requested contact icons inside the chat — compact, one row, same order/weight */
.bioa-chat__channels{
  display:flex!important;
  justify-content:center!important;
  align-items:center!important;
  gap:8px!important;
  padding:0 16px 12px!important;
}
.bioa-chat__channel{
  width:38px!important;
  height:38px!important;
  flex:0 0 38px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  border-radius:11px!important;
  background:#173f33!important;
  color:#fff!important;
  text-decoration:none!important;
  box-sizing:border-box!important;
}
.bioa-chat__channel:hover{background:var(--bioa-primary)!important}
.bioa-chat__channel svg{width:20px!important;height:20px!important;fill:#fff!important}
.bioa-chat__channel--zalo svg{width:22px!important;height:22px!important}

/* History area — compact cards like Merywood, scrollbar hidden */
.bioa-chat__history{
  flex:1 1 auto!important;
  min-height:0!important;
  overflow:auto!important;
  padding:0 12px 10px!important;
  background:#fff!important;
  scrollbar-width:none!important;
}
.bioa-chat__history::-webkit-scrollbar{display:none!important}
.bioa-chat__history-label{
  display:flex!important;
  align-items:center!important;
  gap:10px!important;
  margin:0 0 9px!important;
  padding-top:8px!important;
  color:#929292!important;
  font-size:12.5px!important;
  line-height:1!important;
}
.bioa-chat__history-label:before{
  content:""!important;
  height:1px!important;
  background:#e2e2e2!important;
  flex:1!important;
}
.bioa-chat__history-card{
  display:grid!important;
  grid-template-columns:42px minmax(0,1fr) auto!important;
  align-items:center!important;
  gap:9px!important;
  min-height:64px!important;
  margin-bottom:8px!important;
  padding:9px 10px!important;
  border-radius:15px!important;
  background:#f1f1f1!important;
  box-sizing:border-box!important;
}
.bioa-chat__history-avatar{
  width:42px!important;
  height:42px!important;
  border-radius:50%!important;
  background:#fff!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  overflow:hidden!important;
}
.bioa-chat__history-avatar img{width:76%!important;height:76%!important;object-fit:contain!important}
.bioa-chat__history-copy{min-width:0!important}
.bioa-chat__history-copy strong{
  display:block!important;
  margin:0 0 2px!important;
  color:#3b3b3b!important;
  font-size:13.5px!important;
  line-height:1.15!important;
  font-weight:600!important;
}
.bioa-chat__history-copy span{
  display:-webkit-box!important;
  -webkit-box-orient:vertical!important;
  -webkit-line-clamp:2!important;
  overflow:hidden!important;
  color:#666!important;
  font-size:12.5px!important;
  line-height:1.28!important;
  font-weight:400!important;
}
.bioa-chat__history-meta{
  align-self:start!important;
  padding-top:2px!important;
  color:#999!important;
  font-size:10.5px!important;
  white-space:nowrap!important;
}

/* Live conversation messages stay visually subordinate to the History shell */
.bioa-chat__messages{padding:3px 2px 0!important}
.bioa-chat__msg{
  display:flex!important;
  align-items:flex-end!important;
  gap:8px!important;
  margin:8px 0!important;
}
.bioa-chat__msg-avatar{
  flex:0 0 32px!important;
  width:32px!important;height:32px!important;
  border-radius:50%!important;
  display:flex!important;
  align-items:center!important;justify-content:center!important;
  background:var(--bioa-mint)!important;
}
.bioa-chat__msg-avatar img{width:72%!important;height:72%!important;object-fit:contain!important}
.bioa-chat__bubble{
  max-width:245px!important;
  padding:9px 11px!important;
  border-radius:14px!important;
  background:#f1f1f1!important;
  color:#414141!important;
  font-size:12.5px!important;
  line-height:1.35!important;
  font-weight:400!important;
}
.bioa-chat__bubble strong{
  display:block!important;
  margin:0 0 2px!important;
  color:#343434!important;
  font-size:12.5px!important;
  font-weight:600!important;
}
.bioa-chat__msg--user{justify-content:flex-end!important}
.bioa-chat__msg--user .bioa-chat__msg-avatar{display:none!important}
.bioa-chat__msg--user .bioa-chat__bubble{background:var(--bioa-mint)!important}

/* Small brand line where Merywood places provider branding */
.bioa-chat__brandline{
  flex:0 0 auto!important;
  padding:5px 12px 2px!important;
  text-align:center!important;
  color:#8a8a8a!important;
  background:#fff!important;
  font-size:10.5px!important;
  line-height:1.2!important;
}

/* Composer fixed at the bottom, Merywood-like proportions */
.bioa-chat__composer{
  flex:0 0 auto!important;
  display:flex!important;
  align-items:center!important;
  gap:7px!important;
  padding:8px 10px 10px!important;
  border-top:0!important;
  background:#fff!important;
}
.bioa-chat__input{
  flex:1!important;
  min-width:0!important;
  height:42px!important;
  padding:0 14px!important;
  border:1px solid #ddd!important;
  border-radius:21px!important;
  outline:none!important;
  background:#fff!important;
  color:#333!important;
  font:400 13px/1 inherit!important;
}
.bioa-chat__send{
  flex:0 0 42px!important;
  width:42px!important;height:42px!important;
  padding:0!important;
  border:0!important;
  border-radius:50%!important;
  background:var(--bioa-primary)!important;
  color:#fff!important;
  display:flex!important;
  align-items:center!important;justify-content:center!important;
  cursor:pointer!important;
}
.bioa-chat__send svg{
  width:17px!important;height:17px!important;
  fill:none!important;stroke:currentColor!important;stroke-width:2.1!important;
}

.bioa-contact-fab__toggle{
  position:relative!important;
  width:68px!important;height:68px!important;
  border:0!important;border-radius:50%!important;
  display:flex!important;align-items:center!important;justify-content:center!important;
  background:var(--bioa-ivory)!important;
  box-shadow:0 10px 32px rgba(5,47,33,.28)!important;
  cursor:pointer!important;padding:11px!important;
}
.bioa-contact-fab__toggle img{width:100%!important;height:100%!important;object-fit:contain!important}
.bioa-contact-fab__toggle:after{
  content:""!important;
  position:absolute!important;
  width:12px!important;height:12px!important;
  border-radius:50%!important;
  background:#21A366!important;
  right:4px!important;bottom:6px!important;
  border:2px solid var(--bioa-ivory)!important;
}

@media(max-width:768px){
  .bioa-contact-fab{right:12px!important;bottom:12px!important}
  .bioa-contact-fab__panel{
    width:min(360px,calc(100vw - 24px))!important;
    height:min(590px,calc(100dvh - 88px))!important;
    border-radius:24px!important;
  }
  .bioa-chat__head{padding:16px 50px 13px!important}
  .bioa-chat__title{font-size:19px!important}
  .bioa-chat__actions{min-height:86px!important;padding:0 26px!important}
  .bioa-chat__channels{padding-bottom:10px!important}
  .bioa-contact-fab__toggle{width:58px!important;height:58px!important;padding:9px!important}
}
`;

const patchC3Css = `
/* PATCH C3 — compact Merywood-style chat cleanup.
   Scope is intentionally limited to the custom BIO-A chat widget. */

/* Single BIO-A avatar + source-like compact title treatment */
.bioa-chat__head{
  padding:18px 54px 15px!important;
}
.bioa-chat__avatars{
  height:48px!important;
  margin:0 0 8px!important;
}
.bioa-chat__avatar{
  width:48px!important;
  height:48px!important;
  margin-left:0!important;
}
.bioa-chat__avatar img{
  width:80%!important;
  height:80%!important;
}
.bioa-chat__title{
  font-size:20px!important;
  font-weight:600!important;
}
.bioa-chat__sub{
  margin-top:4px!important;
}

/* The primary Message/Zalo action row is removed in markup.
   Keep only the requested four contact icons inside the chat shell. */
.bioa-chat__channels-wrap{
  flex:0 0 auto!important;
  background:#fff!important;
  border-bottom:1px solid #e9e9e9!important;
}
.bioa-chat__channels{
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  gap:10px!important;
  min-height:64px!important;
  padding:11px 16px!important;
  box-sizing:border-box!important;
}
.bioa-chat__channel{
  width:42px!important;
  min-width:42px!important;
  height:42px!important;
  flex-basis:42px!important;
  border-radius:12px!important;
}

/* Conversation area: no History label/cards and no extra brand/provider line. */
.bioa-chat__history{
  padding:14px 14px 10px!important;
}
.bioa-chat__msg--intro{
  margin:0 0 10px!important;
}
.bioa-chat__msg--intro .bioa-chat__bubble{
  max-width:248px!important;
}

/* Merywood launcher behavior: the floating launcher is hidden while the panel is open. */
.bioa-contact-fab.is-open .bioa-contact-fab__toggle{
  display:none!important;
}

@media(max-width:768px){
  .bioa-chat__head{
    padding:16px 50px 14px!important;
  }
  .bioa-chat__channels{
    min-height:60px!important;
    padding:9px 14px!important;
    gap:9px!important;
  }
  .bioa-chat__channel{
    width:40px!important;
    min-width:40px!important;
    height:40px!important;
    flex-basis:40px!important;
  }
  .bioa-chat__history{
    padding:12px 12px 9px!important;
  }
}
`;


const patchC4AShellCss = `
/* CHAT-C4A — reduce only the outer chat shell radius. */
.bioa-contact-fab__panel{
  border-radius:18px!important;
}
@media(max-width:768px){
  .bioa-contact-fab__panel{
    border-radius:18px!important;
  }
}
`;


const patchC4BComposerCss = `
/* CHAT-C4B — one-piece composer matching the supplied input reference.
   Keep existing form markup; integrate the send control inside the same shell. */
.bioa-chat__composer{
  position:relative!important;
  display:flex!important;
  align-items:center!important;
  gap:0!important;
  height:44px!important;
  min-height:44px!important;
  margin:8px 10px 10px!important;
  padding:0!important;
  border:1px solid #dedede!important;
  border-radius:22px!important;
  background:#fff!important;
  overflow:hidden!important;
  box-sizing:border-box!important;
}
.bioa-chat__input{
  flex:1 1 auto!important;
  width:100%!important;
  min-width:0!important;
  height:42px!important;
  min-height:42px!important;
  padding:0 50px 0 14px!important;
  border:0!important;
  border-radius:0!important;
  outline:none!important;
  background:transparent!important;
  box-shadow:none!important;
}
.bioa-chat__input:focus{
  outline:none!important;
  box-shadow:none!important;
}
.bioa-chat__send{
  position:absolute!important;
  right:4px!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  width:34px!important;
  height:34px!important;
  min-width:34px!important;
  flex:0 0 34px!important;
  padding:0!important;
  border:0!important;
  border-radius:50%!important;
  background:var(--bioa-primary)!important;
  color:#fff!important;
  box-shadow:none!important;
}
.bioa-chat__send:hover{
  background:var(--bioa-dark)!important;
}
.bioa-chat__send svg{
  width:15px!important;
  height:15px!important;
  stroke-width:2.15!important;
}
@media(max-width:768px){
  .bioa-chat__composer{
    height:44px!important;
    min-height:44px!important;
    margin:8px 9px 9px!important;
    border-radius:22px!important;
  }
}
`;

function setLogo($){
  // Explicit brand slots only. Keep every non-brand image/icon untouched.
  $('.header__logo img,.menu__logo img')
    .attr('src','/assets/bioa-full.svg')
    .attr('alt','BIO-A Group')
    .removeAttr('srcset')
    .removeAttr('sizes');

  $('.footer-top__logo img,.footer__logo img')
    .attr('src','/assets/bioa-full-light.svg')
    .attr('alt','BIO-A Group')
    .removeAttr('srcset')
    .removeAttr('sizes');
}

function replaceBrandWatermarks($){
  const green='/assets/bioa-monogram.svg';
  const patterns=[
    /https:\/\/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/img\/logo-bg\.svg/gi,
    /(?:https?:\/\/[^"'() ]+\/)?[^"'() ]*merywood_[^"'() ]+\.svg/gi,
    /(?:https?:\/\/[^"'() ]+\/)?[^"'() ]*merywood-logo[^"'() ]+\.svg/gi
  ];
  const swap=(value)=>{
    let out=String(value||'');
    for(const re of patterns) out=out.replace(re,green);
    return out;
  };

  $('style').each((_,el)=>{
    const before=$(el).html()||'';
    const after=swap(before);
    if(after!==before) $(el).html(after);
  });
  $('[style]').each((_,el)=>{
    const before=$(el).attr('style')||'';
    const after=swap(before);
    if(after!==before) $(el).attr('style',after);
  });

  $('.formats__logo').attr('style',"--formats-logo:url('/assets/bioa-monogram.svg');");
}

function fixLang($,route,lang){
  const vi=route==='/'?'/':route;
  const en=route==='/'?'/en/':'/en'+route;
  const links=$('.bioa-lang a');
  links.eq(0).attr('href',vi).attr('hreflang','vi').toggleClass('is-active',lang==='vi');
  links.eq(1).attr('href',en).attr('hreflang','en').toggleClass('is-active',lang==='en');
}


function normalizeHeaderActions($){
  const contacts=$('.header__contacts').first();
  const lang=$('.header > .container .bioa-lang, .header__wrapper > .bioa-lang').first();
  const btn=$('.header__btn').first();
  if(!contacts.length || !lang.length || !btn.length) return;

  let group=$('.bioa-header-actions').first();
  if(!group.length){
    group=$('<div class="bioa-header-actions"></div>');
    contacts.before(group);
  }
  group.append(contacts,lang,btn);
}


function mobileLocalPath(route,lang){
  if(lang==='en') return route==='/'?'/en/':'/en'+route;
  return route;
}

function syncMobileHeader($,route,lang){
  $('.bioa-mobile-actions,.bioa-mobile-menu-controls,.bioa-mobile-nav,.bioa-mobile-menu-button-clean').remove();

  const header=$('.header').first();
  if(!header.length)return;

  let sourceBurger=header.find('button').filter((_,el)=>{
    const x=$(el);
    const sig=[x.attr('class'),x.attr('id'),x.attr('aria-label'),x.attr('data-target'),x.attr('data-menu')].filter(Boolean).join(' ').toLowerCase();
    return /menu|burger|navigation|nav/.test(sig);
  }).first();
  if(!sourceBurger.length)sourceBurger=header.find('button').last();

  const cleanBurger=$('<button type="button" id="bioaMobileMenuButton" class="bioa-mobile-menu-button-clean"></button>')
    .attr('aria-controls','bioaMobileNav')
    .attr('aria-expanded','false')
    .attr('aria-label',lang==='vi'?'Mở trình đơn':'Open menu')
    .html('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12M6 12h12M6 16h12" stroke-width="2" stroke-linecap="round"/></svg>');

  if(sourceBurger.length){
    sourceBurger.after(cleanBurger);
    sourceBurger.addClass('bioa-mobile-menu-button');
  }else{
    const actions=$('.bioa-header-actions').first();
    if(actions.length)actions.after(cleanBurger); else header.find('.header__wrapper').first().append(cleanBurger);
  }

  $('.menu').first().addClass('bioa-old-mobile-menu');

  const nav=$('<div id="bioaMobileNav" class="bioa-mobile-nav" role="region"></div>')
    .attr('aria-label',lang==='vi'?'Điều hướng trên điện thoại':'Mobile navigation')
    .attr('aria-hidden','true');
  const drop=$('<div class="bioa-mobile-nav-drop"></div>');
  const links=$('<nav class="bioa-mobile-nav-links"></nav>');

  $('.header__nav a').each((_,el)=>{
    const a=$(el);
    links.append($('<a></a>').attr('href',a.attr('href')||'#').text(a.text().trim()));
  });

  const meta=$('<div class="bioa-mobile-nav-meta"></div>');
  meta.append($('<a class="bioa-mobile-menu-email"></a>').attr('href','mailto:'+company.email).text(company.email));

  const row=$('<div class="bioa-mobile-contact-row"></div>');
  row.append(
    $('<a class="bioa-mobile-social" aria-label="WhatsApp"></a>').attr('href',company.whatsapp).attr('target','_blank').attr('rel','noopener noreferrer').html(icons.whatsapp),
    $('<a class="bioa-mobile-social" aria-label="Telegram"></a>').attr('href',company.telegram).attr('target','_blank').attr('rel','noopener noreferrer').html(icons.telegram),
    $('<a class="bioa-mobile-social" aria-label="Facebook"></a>').attr('href',company.facebook).attr('target','_blank').attr('rel','noopener noreferrer').html(icons.facebook),
    $('<a class="bioa-mobile-social" aria-label="Zalo"></a>').attr('href',company.zalo).attr('target','_blank').attr('rel','noopener noreferrer').text('Zalo')
  );

  const langSwitch=$('<div class="bioa-mobile-menu-lang"></div>');
  langSwitch.append(
    $('<a>VI</a>').attr('href',mobileLocalPath(route,'vi')).toggleClass('is-active',lang==='vi'),
    $('<a>EN</a>').attr('href',mobileLocalPath(route,'en')).toggleClass('is-active',lang==='en')
  );
  row.append(langSwitch);
  meta.append(row);

  drop.append(links,meta);
  nav.append(drop);
  $('body').append(nav);

  const js="(function(){var b=document.getElementById('bioaMobileMenuButton'),n=document.getElementById('bioaMobileNav');if(!b||!n)return;function set(o){n.classList.toggle('open',o);n.setAttribute('aria-hidden',o?'false':'true');b.setAttribute('aria-expanded',o?'true':'false');document.documentElement.classList.toggle('bioa-mobile-nav-open',o);document.body.classList.toggle('bioa-mobile-nav-open',o);b.setAttribute('aria-label',o?((document.documentElement.lang||'').toLowerCase().startsWith('vi')?'Đóng trình đơn':'Close menu'):((document.documentElement.lang||'').toLowerCase().startsWith('vi')?'Mở trình đơn':'Open menu'));}b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();set(!n.classList.contains('open'));});n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});})();";
  $('body').append($('<script id="bioa-mobile-nav-js"></script>').html(js));
}

function refineMobileProduce($,lang){
  const vi=lang==='vi';
  const data=[
    {
      alt:'produce-1_mobile',
      title:vi?'Thực phẩm bổ sung':'Supplements',
      text:vi
        ?'Danh mục thực phẩm bổ sung có thể phát triển theo công thức có sẵn hoặc công thức riêng, phù hợp định hướng thương hiệu.'
        :'Supplement formats can be developed from ready formulas or custom formulas to match your brand direction.'
    },
    {
      alt:'produce-2_mobile',
      title:vi?'Mỹ phẩm':'Cosmetics',
      text:vi
        ?'Phát triển các dòng mỹ phẩm từ nghiên cứu công thức, lựa chọn nguyên liệu đến bao bì và hoàn thiện sản phẩm.'
        :'Cosmetic products can be developed from formula research and ingredient selection through packaging and finished production.'
    }
  ];

  data.forEach(d=>{
    const img=$('img[alt*="'+d.alt+'"]').first();
    if(!img.length)return;

    let card=null;
    img.parents().each((_,el)=>{
      if(card)return;
      const cls=$(el).attr('class')||'';
      if(/item|card|produce/i.test(cls))card=$(el);
    });
    if(!card||!card.length)card=img.parent().parent();

    card.addClass('bioa-produce-mobile-card');
    card.find('.bioa-produce-mobile-title,.bioa-produce-mobile-copy').remove();

    let media=img.parent();
    if(media.is('picture'))media=media.parent();
    media.addClass('bioa-produce-mobile-media');

    card.append(
      $('<h3 class="bioa-produce-mobile-title"></h3>').text(d.title),
      $('<div class="bioa-produce-mobile-copy"></div>').text(d.text)
    );
  });
}

function buildMobileFooterContact($){
  $('.bioa-footer-mobile-head').remove();

  const footer=$('.footer-top').first();
  if(!footer.length)return;
  const host=footer.find('.footer-top__inner').first().length
    ? footer.find('.footer-top__inner').first()
    : footer.find('.container').first().length
      ? footer.find('.container').first()
      : footer;

  const head=$('<div class="bioa-footer-mobile-head"></div>');
  const logo=$('<div class="bioa-footer-mobile-logo"><img src="/assets/bioa-full-light.svg" alt="BIO-A Group"></div>');
  const contact=$('<div class="bioa-footer-mobile-contact"></div>');
  const email=$('<a class="bioa-footer-mobile-email"></a>').attr('href','mailto:'+company.email).text(company.email);
  const social=$('<div class="bioa-footer-mobile-socials"></div>');

  [
    [company.whatsapp,'WhatsApp',icons.whatsapp],
    [company.facebook,'Facebook',icons.facebook],
    [company.telegram,'Telegram',icons.telegram],
    [company.zalo,'Zalo',icons.zalo]
  ].forEach(([href,label,svg])=>{
    social.append(
      $('<a></a>').attr('href',href).attr('target','_blank').attr('rel','noopener noreferrer').attr('aria-label',label).html(svg)
    );
  });

  contact.append(email,social);
  head.append(logo,contact);
  host.prepend(head);
}

function replaceMobileProduceSection($,lang){
  $('.bioa-produce-mobile-clean').remove();
  $('.bioa-produce-mobile-source-safe').removeClass('bioa-produce-mobile-source-safe');

  // Find Merywood's dedicated mobile Produce artwork robustly by alt/src/srcset.
  const mobileAsset=$('img,source').filter((_,el)=>{
    const x=$(el);
    const sig=[x.attr('alt'),x.attr('src'),x.attr('srcset'),x.attr('data-src'),x.attr('data-srcset')]
      .filter(Boolean).join(' ').toLowerCase();
    return sig.includes('produce-1_mobile');
  }).first();
  if(!mobileAsset.length)return;

  let sourceSection=mobileAsset.closest('section');
  if(!sourceSection.length){
    sourceSection=mobileAsset.parents().filter((_,el)=>{
      const x=$(el);
      const sig=x.html()||'';
      return /produce-1_mobile/i.test(sig) && /produce-2_mobile/i.test(sig);
    }).first();
  }
  if(!sourceSection.length)return;

  // Safety: never rewrite the source section; just hide it on mobile and add a clean sibling.
  sourceSection.addClass('bioa-produce-mobile-source-safe');

  const vi=lang==='vi';
  const clean=$('<section class="bioa-produce-mobile-clean"></section>');
  const inner=$('<div class="bioa-produce-mobile-clean__inner"></div>');
  inner.append(
    $('<h2 class="bioa-produce-mobile-clean__title"></h2>').text(vi?'Danh mục gia công':'We Produce')
  );

  const cards=[
    {
      title:vi?'Thực phẩm bổ sung':'Supplements',
      copy:vi
        ?'Danh mục thực phẩm bổ sung có thể phát triển theo công thức có sẵn hoặc công thức riêng, phù hợp định hướng thương hiệu.'
        :'We offer a wide range of supplement formats that can be developed from ready formulas or custom formulas for your brand.',
      src:'https://merywood.com/wp-content/uploads/2026/04/produce-1.webp',
      alt:vi?'Thực phẩm bổ sung':'Supplements'
    },
    {
      title:vi?'Mỹ phẩm':'Cosmetics',
      copy:vi
        ?'Phát triển mỹ phẩm từ nghiên cứu công thức, lựa chọn nguyên liệu đến bao bì và hoàn thiện sản phẩm.'
        :'Cosmetic products can be developed from formula research and ingredient selection through packaging and finished production.',
      src:'https://merywood.com/wp-content/uploads/2026/04/produce-2.webp',
      alt:vi?'Mỹ phẩm':'Cosmetics'
    }
  ];

  cards.forEach(c=>{
    const card=$('<article class="bioa-produce-mobile-clean__card"></article>');
    const media=$('<div class="bioa-produce-mobile-clean__media"></div>');
    media.append($('<img loading="lazy" decoding="async">').attr('src',c.src).attr('alt',c.alt));
    card.append(
      media,
      $('<h3 class="bioa-produce-mobile-clean__name"></h3>').text(c.title),
      $('<div class="bioa-produce-mobile-clean__copy"></div>').text(c.copy)
    );
    inner.append(card);
  });

  clean.append(inner);
  sourceSection.after(clean);
}

function buildMobileFooterV2($){
  $('.bioa-footer-mobile-v2').remove();
  const footer=$('.footer-top').first();
  if(!footer.length)return;

  const originals=footer.find('.footer-top__logo,.footer__logo,.footer-top__email,.footer-top__socials');
  originals.addClass('bioa-footer-original-contact');

  const host=footer.find('.footer-top__inner').first().length
    ? footer.find('.footer-top__inner').first()
    : footer.find('.container').first().length
      ? footer.find('.container').first()
      : footer;

  const row=$('<div class="bioa-footer-mobile-v2"></div>');
  const logo=$('<div class="bioa-footer-mobile-v2__logo"><img src="/assets/bioa-full-light.svg" alt="BIO-A Group"></div>');
  const contact=$('<div class="bioa-footer-mobile-v2__contact"></div>');
  const email=$('<a class="bioa-footer-mobile-v2__email"></a>').attr('href','mailto:'+company.email).text(company.email);
  const social=$('<div class="bioa-footer-mobile-v2__socials"></div>');

  [
    [company.whatsapp,'WhatsApp',icons.whatsapp],
    [company.facebook,'Facebook',icons.facebook],
    [company.telegram,'Telegram',icons.telegram],
    [company.zalo,'Zalo','Zalo']
  ].forEach(([href,label,visual])=>{
    const a=$('<a></a>').attr('href',href).attr('target','_blank').attr('rel','noopener noreferrer').attr('aria-label',label);
    if(label==='Zalo')a.text('Zalo'); else a.html(visual);
    social.append(a);
  });

  contact.append(email,social);
  row.append(logo,contact);
  host.prepend(row);
}

function footerSocials($){
  const wrap=$('.footer-top__socials').first();
  if(!wrap.length)return;
  const defs=[
    [company.whatsapp,'WhatsApp',icons.whatsapp],
    [company.facebook,'Facebook',icons.facebook],
    [company.telegram,'Telegram',icons.telegram],
    [company.zalo,'Zalo','Zalo']
  ];
  let anchors=wrap.find('a');
  while(anchors.length<defs.length){
    wrap.append('<a href="#"></a>');
    anchors=wrap.find('a');
  }
  anchors.each((i,el)=>{
    if(!defs[i]){$(el).remove();return;}
    const [href,label,visual]=defs[i];
    const a=$(el).attr('href',href).attr('target','_blank').attr('rel','noopener noreferrer').attr('aria-label',label);
    if(label==='Zalo')a.text('Zalo'); else a.html(visual);
  });
}

function addContactLauncher($,lang){
  $('.bioa-contact-fab').remove();
  $('#bioa-contact-fab-js').remove();
  const vi=lang==='vi';
  const intro=vi
    ?'Xin chào! Tôi là trợ lý BIO-A. Bạn đang quan tâm gia công sản phẩm nào?'
    :'Hi! I’m the BIO-A assistant. Which product are you interested in manufacturing?';
  const previewReply=vi
    ?'BIO-A đã nhận nội dung. Chatbot sẽ được kết nối ở bước sau; hiện bạn có thể tiếp tục qua Zalo hoặc Email.'
    :'BIO-A received your message. The chatbot will be connected in a later step; for now you can continue via Zalo or Email.';

  $('body').append(`<div class="bioa-contact-fab" id="bioa-contact-fab">
    <div class="bioa-contact-fab__panel" role="dialog" aria-modal="false" aria-label="BIO-A Group">
      <div class="bioa-chat__head">
        <button class="bioa-chat__collapse" type="button" aria-label="${vi?'Thu gọn':'Collapse'}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5"/></svg>
        </button>
        <div class="bioa-chat__avatars" aria-hidden="true">
          <div class="bioa-chat__avatar"><img src="/assets/bioa-monogram.svg" alt=""></div>
        </div>
        <div class="bioa-chat__title">BIO-A Group</div>
        <div class="bioa-chat__sub">${vi?'Chúng tôi sẵn sàng hỗ trợ bạn':'We are here and ready to help'}</div>
      </div>

      <div class="bioa-chat__channels-wrap">
        <div class="bioa-chat__channels" aria-label="${vi?'Kênh liên hệ BIO-A':'BIO-A contact channels'}">
          <a class="bioa-chat__channel" href="${company.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">${icons.whatsapp}</a>
          <a class="bioa-chat__channel" href="${company.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">${icons.facebook}</a>
          <a class="bioa-chat__channel" href="${company.telegram}" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram">${icons.telegram}</a>
          <a class="bioa-chat__channel bioa-chat__channel--zalo" href="${company.zalo}" target="_blank" rel="noopener noreferrer" aria-label="Zalo" title="Zalo">${icons.zalo}</a>
        </div>
      </div>

      <div class="bioa-chat__history">
        <div class="bioa-chat__msg bioa-chat__msg--intro">
          <div class="bioa-chat__msg-avatar"><img src="/assets/bioa-monogram.svg" alt=""></div>
          <div class="bioa-chat__bubble"><strong>BIO-A Group</strong>${intro}</div>
        </div>
        <div class="bioa-chat__messages" aria-live="polite"></div>
      </div>

      <form class="bioa-chat__composer">
        <input class="bioa-chat__input" type="text" autocomplete="off" placeholder="${vi?'Nhập tin nhắn...':'Type your message...'}">
        <button class="bioa-chat__send" type="submit" aria-label="${vi?'Gửi':'Send'}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
        </button>
      </form>
    </div>

    <button class="bioa-contact-fab__toggle" type="button" aria-expanded="false" aria-label="${vi?'Mở tư vấn':'Open support'}">
      <img src="/assets/bioa-monogram.svg" alt="">
    </button>
  </div>`);

  const script=`(function(){
    var root=document.getElementById('bioa-contact-fab');if(!root)return;
    var toggle=root.querySelector('.bioa-contact-fab__toggle');
    var collapse=root.querySelector('.bioa-chat__collapse');
    var form=root.querySelector('.bioa-chat__composer');
    var input=root.querySelector('.bioa-chat__input');
    var history=root.querySelector('.bioa-chat__history');
    var messages=root.querySelector('.bioa-chat__messages');
    var previewReply=${JSON.stringify(previewReply)};

    function open(){
      root.classList.add('is-open');
      if(toggle)toggle.setAttribute('aria-expanded','true');
    }
    function close(){
      root.classList.remove('is-open');
      if(toggle)toggle.setAttribute('aria-expanded','false');
    }

    toggle.addEventListener('click',function(e){
      e.stopPropagation();
      root.classList.contains('is-open')?close():open();
    });
    if(collapse)collapse.addEventListener('click',close);

    if(form)form.addEventListener('submit',function(e){
      e.preventDefault();
      var v=(input&&input.value||'').trim();
      if(!v)return;

      var user=document.createElement('div');
      user.className='bioa-chat__msg bioa-chat__msg--user';
      user.innerHTML='<div class="bioa-chat__bubble"><strong>${vi?'Bạn':'You'}</strong></div>';
      user.querySelector('.bioa-chat__bubble').appendChild(document.createTextNode(v));
      messages.appendChild(user);
      input.value='';

      setTimeout(function(){
        var reply=document.createElement('div');
        reply.className='bioa-chat__msg';
        reply.innerHTML='<div class="bioa-chat__msg-avatar"><img src="/assets/bioa-monogram.svg" alt=""></div><div class="bioa-chat__bubble"><strong>BIO-A Group</strong></div>';
        reply.querySelector('.bioa-chat__bubble').appendChild(document.createTextNode(previewReply));
        messages.appendChild(reply);
        history.scrollTop=history.scrollHeight;
      },320);

      history.scrollTop=history.scrollHeight;
    });

    document.addEventListener('click',function(e){
      if(root.classList.contains('is-open')&&!root.contains(e.target))close();
    });

    function purge(){
      document.querySelectorAll('[id*="dashly" i],[class*="dashly" i],[id*="carrot" i],[class*="carrot" i],iframe[src*="dashly" i],iframe[src*="carrot" i]').forEach(function(n){
        if(!n.closest('#bioa-contact-fab'))n.remove();
      });
    }
    purge();
    new MutationObserver(purge).observe(document.documentElement,{childList:true,subtree:true});
  })();`;

  $('body').append($('<script id="bioa-contact-fab-js"></script>').html(script));
}

export function applyHomeRefinement($,route,lang){
  $('head').append('<style id="bioa-home-refine">'+css+patchACss+patchA7Css+patchA8Css+patchBCss+patchB2Css+patchMobileMenuCss+patchB4Css+patchB6Css+patchB7Css+patchB8Css+patchB9Css+patchB12Css+patchB13Css+patchB14Css+patchHeroStatsSourceCss+patchHeroStatsOriginalTypeCss+patchC2Css+patchC3Css+patchC4AShellCss+patchC4BComposerCss+patchHeroStatsFinalSourceCss+'</style>');
  setLogo($);
  replaceBrandWatermarks($);
  fixLang($,route,lang);
  normalizeHeaderActions($);
  syncMobileHeader($,route,lang);
  replaceMobileProduceSection($,lang);
  footerSocials($);
  buildMobileFooterV2($);
  addContactLauncher($,lang);
}
