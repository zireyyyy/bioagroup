const C={email:"contact@bioagroup.vn"};
const lp=(p,l)=>l==="en"?(p==="/"?"/en/":"/en"+p):p;
const css=`
:root{--bioa:#116F47;--bioa-dark:#073D29;--bioa-deep:#052F21;--bioa-sage:#A8C8AE;--bioa-mint:#E7F0E8;--bioa-cream:#F3F0E4;--bioa-ivory:#FCFEF1}
.header{background:rgba(252,254,241,.42)!important;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 1px 0 rgba(5,47,33,.05)!important}
.header__logo{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 58px!important;width:58px!important;height:58px!important;overflow:visible!important}
.header__logo img{width:48px!important;max-width:48px!important;height:54px!important;max-height:54px!important;object-fit:contain!important;object-position:center!important}
.menu__logo img{width:58px!important;height:70px!important;object-fit:contain!important}
.footer-top__logo img,.footer__logo img{width:112px!important;max-width:112px!important;height:132px!important;object-fit:contain!important}
.whatsapp__logo{background:var(--bioa)!important;opacity:.075!important;-webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important}
.formats__logo{--formats-logo:url("/assets/bioa-monogram.svg")!important;opacity:.055!important}
.footer-top{background:var(--bioa-deep)!important}.footer-bottom{background:#03271B!important}
.footer-top__email a{color:var(--bioa-cream)!important;background:rgba(243,240,228,.16)!important;border-color:rgba(243,240,228,.20)!important}
.footer-top__nav li:first-child>a{font-weight:600!important;color:var(--bioa-cream)!important}
.footer-top__nav li:not(:first-child)>a{font-weight:400!important;color:rgba(243,240,228,.88)!important}
.footer-top__nav a:hover{color:#fff!important}.footer-bottom,.footer-bottom a{color:rgba(243,240,228,.72)!important}
.block-title .info .list,.block-title-continue .info .list{gap:14px!important}
.block-title .info .item,.block-title-continue .info .item{min-height:118px!important;padding:22px 28px!important;display:grid!important;grid-template-columns:minmax(0,1.25fr) minmax(130px,.75fr)!important;column-gap:24px!important;align-items:center!important;overflow:visible!important}
.block-title .info .item__number,.block-title-continue .info .item__number{min-width:0!important;font-size:clamp(38px,3.1vw,62px)!important;line-height:.96!important;letter-spacing:-.035em!important;white-space:nowrap!important;overflow:visible!important}
.block-title .info .item__text,.block-title-continue .info .item__text{min-width:0!important;font-size:clamp(16px,1.15vw,23px)!important;line-height:1.22!important;white-space:normal!important;overflow:visible!important}
.block-title .info .item:nth-child(3) .item__number,.block-title .info .item:nth-child(5) .item__number{font-size:clamp(32px,2.55vw,50px)!important}
@media(max-width:1200px){.header__logo{flex-basis:52px!important;width:52px!important;height:52px!important}.header__logo img{width:44px!important;height:48px!important}.footer-top__email{min-width:0!important}.footer-top__email a{min-width:0!important;width:100%!important}.block-title .info .item{padding:18px 22px!important;grid-template-columns:minmax(0,1.25fr) minmax(112px,.75fr)!important}}
@media(max-width:768px){.block-title-continue .info .item{min-height:104px!important;padding:18px 20px!important;grid-template-columns:minmax(0,1.1fr) minmax(105px,.9fr)!important}.block-title-continue .info .item__number{font-size:40px!important}.block-title-continue .info .item__text{font-size:16px!important}}
`;
function assets($){
  $("head").append('<style id="bioa-brand-v4">'+css+'</style><link rel="icon" href="/assets/bioa-monogram.svg">');
  $("style").each((_,el)=>{let s=$(el).html()||"";s=s.replace(/https:\/\/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/img\/logo-bg\.svg/gi,"/assets/bioa-monogram.svg");$(el).html(s)});
  $("[style]").each((_,el)=>{let s=$(el).attr("style")||"";if(/logo-bg\.svg|merrywood_/i.test(s))$(el).attr("style",s.replace(/https:\/\/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/img\/logo-bg\.svg/gi,"/assets/bioa-monogram.svg").replace(/merrywood_[^'\")]+\.svg/gi,"bioa-monogram.svg"))});
  // Chỉ thay đúng các vị trí logo thương hiệu; không đụng ảnh/icon nội dung.
  $(".header__logo img,.menu__logo img").attr("src","/assets/bioa-full.svg");
  $(".footer-top__logo img,.footer__logo img").attr("src","/assets/bioa-full-light.svg");
  $(".formats__logo").attr("style","--formats-logo:url('/assets/bioa-monogram.svg');");
}
function footer($,lang){
  const vi=lang==="vi";
  const groups=vi?[
    ["Gia công mỹ phẩm",[["Gia công trọn gói","/contract-manufacturing-cosmetics/"],["Công thức có sẵn","/white-label-cosmetics/"],["Công thức độc quyền","/private-label-cosmetics/"],["Spa & khách sạn","/hotel-spa-cosmetics/"]]],
    ["Danh mục sản xuất",[["Chăm sóc da","/contract-manufacturing-cosmetics/#cham-soc-da"],["Làm sạch","/contract-manufacturing-cosmetics/#lam-sach"],["Chăm sóc cơ thể","/contract-manufacturing-cosmetics/#cham-soc-co-the"],["Tóc & da đầu","/contract-manufacturing-cosmetics/#cham-soc-toc"],["Serum & tinh chất","/contract-manufacturing-cosmetics/#serum"]]],
    ["Dịch vụ khác",[["R&D công thức","/dich-vu-khac/"],["Bao bì & nhãn","/dich-vu-khac/"],["Hồ sơ công bố","/dich-vu-khac/"],["Phát triển thương hiệu","/dich-vu-khac/"]]],
    ["Kiến thức",[["Bài viết chuyên ngành","/blog/"],["Xu hướng mỹ phẩm","/blog/"],["Nguyên liệu & công thức","/blog/"]]],
    ["Công ty",[["Về BIO-A Group","/about/"],["Liên hệ","/contacts/"],["Tuyển dụng","/careers/"],["Chính sách bảo mật","/privacy-policy/"],["Cookie","/cookie-policy/"]]]
  ]:[
    ["Cosmetic Manufacturing",[["Full-service OEM/ODM","/contract-manufacturing-cosmetics/"],["Ready formulas","/white-label-cosmetics/"],["Custom formulas","/private-label-cosmetics/"],["Spa & Hotel","/hotel-spa-cosmetics/"]]],
    ["Product Categories",[["Skincare","/contract-manufacturing-cosmetics/#cham-soc-da"],["Cleansing","/contract-manufacturing-cosmetics/#lam-sach"],["Body care","/contract-manufacturing-cosmetics/#cham-soc-co-the"],["Hair & scalp","/contract-manufacturing-cosmetics/#cham-soc-toc"],["Serums","/contract-manufacturing-cosmetics/#serum"]]],
    ["Other Services",[["Formula R&D","/dich-vu-khac/"],["Packaging & labels","/dich-vu-khac/"],["Product dossiers","/dich-vu-khac/"],["Brand development","/dich-vu-khac/"]]],
    ["Insights",[["Industry articles","/blog/"],["Cosmetic trends","/blog/"],["Ingredients & formulas","/blog/"]]],
    ["Company",[["About BIO-A Group","/about/"],["Contact","/contacts/"],["Careers","/careers/"],["Privacy Policy","/privacy-policy/"],["Cookie Policy","/cookie-policy/"]]]
  ];
  $(".footer-top__menu").html(groups.map(g=>'<div class="footer-top__nav"><ul><li><a>'+g[0]+'</a></li>'+g[1].map(i=>'<li><a href="'+lp(i[1],lang)+'">'+i[0]+'</a></li>').join("")+'</ul></div>').join(""));
  $(".footer-top__email").html('<a href="mailto:'+C.email+'">'+C.email+'</a>');
  $(".footer-bottom__copyright").text(vi?"© 2026 BIO-A Group. Bảo lưu mọi quyền.":"© 2026 BIO-A Group. All rights reserved.");
  $(".footer-bottom__links").html('<p><a href="'+lp("/privacy-policy/",lang)+'">'+(vi?"Chính sách bảo mật":"Privacy Policy")+' • </a><a href="'+lp("/cookie-policy/",lang)+'">'+(vi?"Chính sách Cookie":"Cookie Policy")+'</a></p>');
}
export function applyBrandV4($,route,lang){assets($);footer($,lang)}