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
  mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.4 5h19.2A2.4 2.4 0 0124 7.4v9.2a2.4 2.4 0 01-2.4 2.4H2.4A2.4 2.4 0 010 16.6V7.4A2.4 2.4 0 012.4 5zm9.6 7.2L3.1 7.1h17.8L12 12.2zm0 2.4L2 8.9v7.7c0 .2.2.4.4.4h19.2c.2 0 .4-.2.4-.4V8.9l-10 5.7z"/></svg>',
  telegram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
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

function setLogo($){
  const headerSel='.header__logo img,.menu__logo img';
  const footerSel='.footer-top__logo img,.footer__logo img';
  $(headerSel).attr('src','/assets/bioa-wordmark.svg').attr('alt','BIO-A Group').removeAttr('srcset').removeAttr('sizes');
  $(footerSel).attr('src','/assets/bioa-wordmark-light.svg').attr('alt','BIO-A Group').removeAttr('srcset').removeAttr('sizes');
  // Không quét toàn bộ ảnh có chữ Merywood: chỉ thay đúng slot logo để giữ ảnh/icon gốc.
}

function fixLang($,route,lang){
  const vi=route==='/'?'/':route;
  const en=route==='/'?'/en/':'/en'+route;
  const links=$('.bioa-lang a');
  links.eq(0).attr('href',vi).attr('hreflang','vi').toggleClass('is-active',lang==='vi');
  links.eq(1).attr('href',en).attr('hreflang','en').toggleClass('is-active',lang==='en');
}

function footerSocials($){
  const s=$('.footer-top__socials a');
  if(!s.length)return;
  const defs=[
    [company.zalo,'Zalo',icons.zalo],
    [company.facebook,'Facebook',icons.facebook],
    [company.telegram,'Telegram',icons.telegram]
  ];
  s.each((i,el)=>{
    if(!defs[i])return;
    const [href,label,svg]=defs[i];
    $(el).attr('href',href).attr('target','_blank').attr('rel','noopener noreferrer').attr('aria-label',label).html(svg);
  });
}

function addContactLauncher($,lang){
  $('.bioa-contact-fab').remove();
  const vi=lang==='vi';
  $('body').append(`<div class="bioa-contact-fab" id="bioa-contact-fab">
    <div class="bioa-contact-fab__panel">
      <div class="bioa-contact-fab__title">${vi?'Liên hệ BIO-A Group':'Contact BIO-A Group'}</div>
      <div class="bioa-contact-fab__sub">${vi?'Chọn kênh liên hệ thuận tiện cho bạn':'Choose your preferred contact channel'}</div>
      <div class="bioa-contact-fab__links">
        <a href="${company.zalo}" target="_blank" rel="noopener noreferrer">${icons.zalo}<span>Zalo</span></a>
        <a href="${company.facebook}" target="_blank" rel="noopener noreferrer">${icons.facebook}<span>Facebook</span></a>
        <a href="${company.whatsapp}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>WhatsApp</span></a>
        <a href="mailto:${company.email}">${icons.mail}<span>Email</span></a>
      </div>
    </div>
    <button class="bioa-contact-fab__toggle" type="button" aria-label="${vi?'Mở liên hệ':'Open contacts'}"><img src="/assets/bioa-monogram.svg" alt=""></button>
  </div>`);
  $('body').append(`<script id="bioa-contact-fab-js">(function(){var root=document.getElementById('bioa-contact-fab');if(!root)return;var btn=root.querySelector('.bioa-contact-fab__toggle');btn.addEventListener('click',function(){root.classList.toggle('is-open')});document.addEventListener('click',function(e){if(!root.contains(e.target))root.classList.remove('is-open')});function purge(){document.querySelectorAll('[id*="dashly" i],[class*="dashly" i],[id*="carrot" i],[class*="carrot" i],iframe[src*="dashly" i],iframe[src*="carrot" i]').forEach(function(n){if(!n.closest('#bioa-contact-fab'))n.remove()})}purge();new MutationObserver(purge).observe(document.documentElement,{childList:true,subtree:true})})();</script>`);
}

export function applyHomeRefinement($,route,lang){
  $('head').append('<style id="bioa-home-refine">'+css+'</style>');
  setLogo($);
  fixLang($,route,lang);
  footerSocials($);
  addContactLauncher($,lang);
}
