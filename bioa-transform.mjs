export const company = {
  name: 'BIO-A Group', domain: 'https://bioagroup.vn', email: 'contact@bioagroup.vn',
  phone: '0779 399 379', phoneRaw: '0779399379', whatsapp: 'https://wa.me/84779399379',
  zalo: 'https://zalo.me/84779399379', facebook: 'https://www.facebook.com/nhamaysanxuatduocmypham.BioA'
};

export const withExtraRoutes = routes => [...routes.map(r => [r,r]), ['/dich-vu-khac/','/hotel-spa-cosmetics/']];
export const localPath = (route, lang) => lang === 'en' ? (route === '/' ? '/en/' : '/en' + route) : route;

const css = `
:root{--bioa:#106E45;--bioa-dark:#0B4E31;--bioa-deep:#093D26;--bioa-soft:#99D29F;--bioa-cream:#F3F0E4;--bioa-ivory:#FCFEF1}
html,body{overflow-x:hidden}::selection{background:var(--bioa);color:#fff}
.btn,.formats__tab[aria-selected="true"]{background:var(--bioa)!important;border-color:var(--bioa)!important;color:#fff!important}.btn:hover{background:var(--bioa-dark)!important;border-color:var(--bioa-dark)!important}
.header__email a,.menu__email a,.footer-top__email a,.color-main{color:var(--bioa)!important}.footer-top{background:var(--bioa-deep)!important}.footer-bottom{background:#062c1c!important}.socials__link,.swiper-button{background-color:var(--bioa-dark)!important;color:#fff!important}
.review{background-color:var(--bioa-dark)!important}.review,.review *{color:#fff!important}
.bioa-lang{display:flex;align-items:center;gap:4px;margin-left:8px;white-space:nowrap}.bioa-lang a{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;padding:0 7px;border-radius:999px;font-size:12px;text-decoration:none;color:var(--bioa-deep);background:rgba(16,110,69,.08)}.bioa-lang a.is-active{background:var(--bioa);color:#fff}
.whatsapp-wrapper{margin-top:60px!important;padding:0 25px!important}.whatsapp{position:relative!important;width:100%!important;background:#fff!important;border-radius:60px!important;padding:40px 50px!important;overflow:hidden!important}.whatsapp__content{position:relative!important;z-index:2!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:40px!important}.whatsapp__title{font-weight:400!important;font-size:30px!important;line-height:1.2!important;color:#141B14!important;margin-bottom:6px!important}.whatsapp__description{line-height:1.5!important;color:#141B14!important;max-width:620px!important;opacity:.6!important}.whatsapp__btn{flex:0 0 auto!important;gap:12px!important;min-width:340px!important;height:66px!important;padding:0 40px!important;border-radius:18px!important}.whatsapp__decoration{position:absolute!important;top:-420px!important;right:-180px!important;width:1120px!important;height:1120px!important;border-radius:50%!important;background:var(--bioa)!important;opacity:.08!important;pointer-events:none!important}
.product,.product__content,.product__row,.product__col{min-width:0!important}.product__content,.product__content *{overflow-wrap:break-word!important;word-break:normal!important}.product__content .list__item-text{line-height:1.35!important}.product__content .h2,.product__content .h3{line-height:1.08!important}
.block-product-formats .formats{position:relative!important;width:100%!important;padding:45px 60px!important;background:linear-gradient(120deg,#fff 0%,#fff 35%,#F2F6F1 100%)!important;border-radius:45px!important;overflow:hidden!important}.block-product-formats .formats__tabs{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin-bottom:35px!important;padding-bottom:35px!important;border-bottom:1px solid rgba(9,61,38,.12)!important}.block-product-formats .formats__tab{display:inline-flex!important;align-items:center!important;height:47px!important;padding:0 22px!important;border:0!important;border-radius:16px!important;cursor:pointer!important;color:var(--bioa-dark)!important;background:rgba(16,110,69,.10)!important}.block-product-formats .formats__tab[aria-selected="true"]{background:var(--bioa)!important;color:#fff!important}.block-product-formats .formats__panels{position:relative!important;z-index:2!important;min-height:120px}.block-product-formats .formats__panel{display:none!important;position:relative!important;opacity:1!important;visibility:visible!important}.block-product-formats .formats__panel.is-active{display:block!important}.block-product-formats .formats__list{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:14px 32px!important;margin:0!important;padding:0!important;list-style:none!important}.block-product-formats .formats__item,.block-product-formats .formats__more{display:inline-flex!important;align-items:center!important;gap:10px!important}.block-product-formats .formats__item.is-hidden{display:none!important}.block-product-formats .formats__item::before{background:var(--bioa)!important}.block-product-formats .formats__more a{color:var(--bioa)!important}.block-product-formats .formats__cta{position:relative!important;z-index:2!important;margin-top:75px!important}.block-product-formats .formats__cta-content{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:40px!important}
.block-reviews{overflow:hidden!important}.block-reviews .review{min-width:0!important;overflow:hidden!important}.block-reviews .review__text{overflow:hidden!important;overflow-wrap:break-word!important}
@media(max-width:1200px){.header__nav ul{gap:14px!important}.header__nav a{font-size:12px!important}.header__email{display:none!important}.bioa-lang{margin-left:4px}}
@media(max-width:768px){.bioa-lang{margin:18px 0 0}.whatsapp-wrapper{margin-top:40px!important;padding:0!important}.whatsapp{text-align:center!important;border-radius:30px!important;padding:30px 20px!important}.whatsapp__content{flex-direction:column!important;gap:20px!important}.whatsapp__title{font-size:20px!important}.whatsapp__description{font-size:14px!important;max-width:100%!important}.whatsapp__btn{width:100%!important;min-width:0!important;height:54px!important;padding:0 20px!important;border-radius:16px!important}.block-product-formats .formats{padding:30px 20px!important;border-radius:24px!important}.block-product-formats .formats__tabs{flex-wrap:nowrap!important;overflow-x:auto!important;padding-bottom:24px!important;margin-bottom:24px!important}.block-product-formats .formats__tab{flex:0 0 auto!important;height:40px!important;padding:0 16px!important;white-space:nowrap!important}.block-product-formats .formats__cta{margin-top:45px!important}.block-product-formats .formats__cta-content{flex-direction:column!important;align-items:flex-start!important;gap:20px!important}}
`;

function replaceBrandText(s){return String(s||'').replace(/Merywood/gi,company.name).replace(/info@merywood\.com/gi,company.email).replace(/\[email protected\]/gi,company.email)}
function setText($,sel,text){const e=$(sel).first();if(e.length)e.text(text)}
function menuHtml(lang){const items=lang==='vi'?[['Về BIOA Group','/about/'],['Gia Công Mỹ Phẩm','/contract-manufacturing-cosmetics/'],['Dịch Vụ Khác','/dich-vu-khac/'],['Kiến Thức','/blog/'],['Liên Hệ','/contacts/']]:[['About BIOA Group','/about/'],['Cosmetic Manufacturing','/contract-manufacturing-cosmetics/'],['Other Services','/dich-vu-khac/'],['Insights','/blog/'],['Contact','/contacts/']];return '<ul>'+items.map(x=>'<li class="menu-item"><a href="'+localPath(x[1],lang)+'">'+x[0]+'</a></li>').join('')+'</ul>'}
function titleFor(route,lang){if(lang==='en')return route==='/'?'Cosmetic Manufacturing & Brand Development':route==='/dich-vu-khac/'?'Other Services':'BIO-A Group';const map={'/':'Nhà máy sản xuất & gia công mỹ phẩm BIO-A Group','/about/':'Về BIO-A Group','/contacts/':'Liên hệ BIO-A Group','/dich-vu-khac/':'Dịch vụ khác','/contract-manufacturing-cosmetics/':'Gia công mỹ phẩm trọn gói','/white-label-cosmetics/':'Gia công mỹ phẩm công thức có sẵn','/private-label-cosmetics/':'Gia công mỹ phẩm công thức độc quyền','/hotel-spa-cosmetics/':'Gia công mỹ phẩm Spa & khách sạn','/blog/':'Kiến thức & xu hướng ngành','/careers/':'Tuyển dụng BIO-A Group'};return map[route]||(route.startsWith('/blog/')?'Kiến thức chuyên ngành':'Giải pháp BIO-A Group')}

function headerAndLinks($,route,lang){
  const nav=menuHtml(lang);$('.header__nav').html(nav);$('.menu__nav').html(nav);$('.menu-services').remove();
  $('.header__email,.menu__email,.footer-top__email').html('<a class="color-main" href="mailto:'+company.email+'">'+company.email+'</a>');
  $('.header__socials a,.menu__socials a').attr('href',company.whatsapp).attr('aria-label','WhatsApp BIO-A Group').attr('target','_blank');
  $('.header__btn .btn__text').text(lang==='vi'?'Nhận tư vấn':'Get a quote');
  const sw='<div class="bioa-lang"><a href="'+localPath(route,'vi')+'" class="'+(lang==='vi'?'is-active':'')+'">VI</a><a href="'+localPath(route,'en')+'" class="'+(lang==='en'?'is-active':'')+'">EN</a></div>';
  $('.bioa-lang').remove();$('.header__contacts').after(sw);$('.menu__contacts').append(sw);
  $('a').each((_,el)=>{const a=$(el);let h=a.attr('href')||'';if(/^https?:\/\/(www\.)?merywood\.com/i.test(h))h=h.replace(/^https?:\/\/(www\.)?merywood\.com/i,'')||'/';if(h.startsWith('/')&&!h.startsWith('/wp-')&&!h.startsWith('/cdn-cgi')&&!h.startsWith('/en/'))h=localPath(h,lang);a.attr('href',h);if(/mailto:/i.test(h)||/merywood\.com/i.test(a.text()))a.attr('href','mailto:'+company.email);if(/wa\.me|whatsapp/i.test(h)||/WhatsApp/i.test(a.attr('aria-label')||''))a.attr('href',company.whatsapp).attr('target','_blank')});
}

function cleanupExternal($){
  $('script').each((_,el)=>{const src=($(el).attr('src')||'').toLowerCase(),body=($(el).html()||'').toLowerCase();if(/dashly\.app|yandex|mc\.yandex|googletagmanager\.com|google-analytics\.com/.test(src)||/dashly\.connect\(|gtm-ndkp5rxk|ym\(/.test(body))$(el).remove()});
  $('noscript').each((_,el)=>{if(/googletagmanager|yandex/i.test($.html(el)))$(el).remove()});
}
function palette($){$('style').each((_,el)=>{let s=$(el).html()||'';s=s.replace(/#546B51/gi,'#106E45').replace(/#556B51/gi,'#106E45').replace(/#587156/gi,'#106E45').replace(/rgba\(84\s*,\s*107\s*,\s*81/gi,'rgba(16,110,69');$(el).html(s)});$('head').append('<style id="bioa-v3">'+css+'</style>')}

function setHomeStats($,stats){
  $('.block-title .info .item').each((i,e)=>{
    if(!stats[i])return;
    $(e).find('.item__number').text(stats[i][0]);
    $(e).find('.item__text').text(stats[i][1]);
  });
  $('.block-title-continue .info .item,.block-title-mobile .info .item').each((i,e)=>{
    if(!stats[i%stats.length])return;
    const x=stats[i%stats.length];
    $(e).find('.item__number').text(x[0]);
    $(e).find('.item__text').text(x[1]);
  });
}

function resetHomeVI($){
  setText($,'.block-title h1','Nhà máy sản xuất & gia công mỹ phẩm BIO-A Group');$('.block-title .text-large').first().html('<p>Đồng hành xây dựng thương hiệu mỹ phẩm từ nghiên cứu công thức, sản xuất OEM/ODM đến bao bì và hoàn thiện sản phẩm.</p>');
  const stats=[['2.000+','Mẫu R&D'],['5+','Năm kinh nghiệm'],['10.000.000','Sản phẩm / năm'],['1.000 m²','Quy mô nhà máy'],['OEM/ODM','Gia công trọn gói']];setHomeStats($,stats);
  $('#why-choose-us .title').first().text('Vì sao chọn BIO-A Group');const why=[['Giải pháp theo yêu cầu','Tư vấn theo mục tiêu sản phẩm, phân khúc khách hàng và định vị thương hiệu.'],['R&D & công thức','Phát triển công thức, mẫu thử và điều chỉnh theo nhu cầu thực tế của dự án.'],['Hỗ trợ hồ sơ','Đồng hành các hạng mục hồ sơ, công bố và thông tin nhãn trước khi ra thị trường.'],['Kiểm soát chất lượng','Theo dõi chất lượng trong từng giai đoạn để đảm bảo tính ổn định của thành phẩm.']];$('#why-choose-us .grid .item').each((i,e)=>{if(why[i]){$(e).find('.item__title').text(why[i][0]);$(e).find('.item__body').text(why[i][1])}});
  const steps=[['Tư vấn & lập kế hoạch','Trao đổi mục tiêu, sản phẩm, ngân sách và tiến độ để thống nhất lộ trình triển khai.'],['Nghiên cứu & phát triển','Đội ngũ R&D lựa chọn công thức, nguyên liệu và thực hiện mẫu thử theo định hướng thương hiệu.'],['Bao bì & nhận diện','Hỗ trợ lựa chọn bao bì, nhãn và các hạng mục nhận diện cần thiết trước khi sản xuất.'],['Hồ sơ sản phẩm','Tư vấn các hạng mục hồ sơ và thông tin cần chuẩn bị theo từng loại sản phẩm.'],['Sản xuất & bàn giao','Triển khai sản xuất, đóng gói và bàn giao theo kế hoạch đã thống nhất.']];$('.block-how-works .title').text('Quy trình hợp tác');$('.block-how-works .step').each((i,e)=>{const x=steps[i%steps.length];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  $('.whatsapp__title').text('Trao đổi ý tưởng cùng BIO-A Group');$('.whatsapp__description').text('Nhắn WhatsApp 0779 399 379 để được tư vấn về công thức, số lượng và tiến độ sản xuất.');$('.whatsapp__btn').attr('href',company.whatsapp).attr('target','_blank').find('.btn__text').text('Chat WhatsApp');
  $('.block-product-formats .title').text('Các dạng sản phẩm BIO-A có thể gia công');$('.block-product-formats .formats__lede').text('Các dạng dưới đây có thể phát triển theo công thức có sẵn hoặc công thức riêng; số lượng tối thiểu tùy từng sản phẩm.');const tabs=['Thực phẩm bổ sung','Dinh dưỡng thể thao','Sản phẩm thú cưng','Mỹ phẩm'];$('.block-product-formats .formats__tab').each((i,e)=>$(e).text(tabs[i]||$(e).text()));$('.block-product-formats .formats__cta-title').text('Chưa thấy dạng sản phẩm bạn cần?');$('.block-product-formats .formats__cta-description').text('Gửi ý tưởng sản phẩm, đội ngũ BIO-A sẽ tư vấn phương án phù hợp.');$('.block-product-formats .formats__cta-btn .btn__text').text('Chia sẻ ý tưởng');
  const formats={'Powders and drink mixes':'Bột & hỗn hợp pha uống','Capsules':'Viên nang','Gummies':'Kẹo dẻo','Liquids and syrups':'Dung dịch & siro','Softgels':'Viên nang mềm','Tablets':'Viên nén','Effervescent tablets':'Viên sủi','Gels':'Dạng gel','Shots':'Dạng shot','Drops':'Dạng nhỏ giọt','Tea bags':'Trà túi lọc','Sprays':'Dạng xịt','Lozenges':'Viên ngậm','Lollipops':'Kẹo que','Chewable tablets':'Viên nhai','Bars':'Dạng thanh','Oral films':'Màng ngậm','Powders':'Dạng bột','Soft chews':'Viên nhai mềm','Treats':'Dạng thưởng','Pastes':'Dạng sệt','Creams':'Kem','Serums':'Serum','Liquids':'Dạng lỏng','Balms':'Dạng sáp'};$('.block-product-formats .formats__item-title').each((_,e)=>{const t=$(e).text().trim();if(formats[t])$(e).text(formats[t])});$('.block-product-formats .formats__note').text('Có thể tùy chỉnh dạng viên, nguyên liệu, màu sắc và cấu trúc sản phẩm theo định hướng thương hiệu.');
  $('.block-reviews .title').html('Khách hàng nhận được gì<br>khi đồng hành cùng BIO-A Group');const rev=['Quy trình rõ ràng, đội ngũ hỗ trợ nhanh và bám sát yêu cầu sản phẩm.','Mẫu thử được điều chỉnh linh hoạt, giúp rút ngắn thời gian hoàn thiện sản phẩm.','BIO-A Group hỗ trợ đồng bộ từ công thức, bao bì đến kế hoạch sản xuất.','Tiến độ ổn định, trao đổi minh bạch và thuận tiện khi cần phát triển thêm SKU.'];$('.block-reviews .review').each((i,e)=>{$(e).find('.review__text').text(rev[i%rev.length]);$(e).find('.review__author-name').text('Khách hàng BIO-A Group');$(e).find('.review__author-info').text('Nội dung đánh giá mẫu – sẽ cập nhật')});
  $('.block-roadmap .title').html('Từ ý tưởng đến thành phẩm —<br>quy trình đồng hành trọn gói');$('.block-roadmap .step').each((i,e)=>{const x=steps[i%steps.length];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  const benefits=['Thiết kế phù hợp định vị thương hiệu.','Linh hoạt lựa chọn quy cách và bao bì.','Hỗ trợ tối ưu theo kế hoạch sản xuất.','Tư vấn số lượng phù hợp từng dự án.','Dễ mở rộng danh mục sản phẩm.'];$('.product .list__item-text').each((i,e)=>$(e).text(benefits[i%benefits.length]));$('.product .product__ideal-for .label').text('Phù hợp với');$('.product .product__open-text').text('Xem thêm');
}

function resetHomeEN($){
  setText($,'.block-title h1','BIO-A Group Cosmetics Manufacturing & Private Label Partner');
  $('.block-title .text-large').first().html('<p>Build your cosmetics brand with BIO-A Group — from formula R&D and OEM/ODM manufacturing to packaging and finished products.</p>');
  const stats=[['2,000+','R&D samples'],['5+','Years of experience'],['10,000,000','Products / year'],['1,000 m²','Factory scale'],['OEM/ODM','Full-service manufacturing']];
  setHomeStats($,stats);

  $('#why-choose-us .title').first().text('Why choose BIO-A Group');
  const why=[
    ['Tailored solutions','Consulting based on product goals, target customers and brand positioning.'],
    ['R&D & formulation','Formula development, sampling and refinement based on each project.'],
    ['Regulatory support','Support for product dossiers, declarations and label information before launch.'],
    ['Quality control','Quality monitoring throughout development and production for stable finished products.']
  ];
  $('#why-choose-us .grid .item').each((i,e)=>{if(why[i]){$(e).find('.item__title').text(why[i][0]);$(e).find('.item__body').text(why[i][1])}});

  const steps=[
    ['Consultation & planning','Align product goals, budget and timeline to define the development roadmap.'],
    ['Research & development','Our R&D team selects formulas and ingredients and develops samples for your brand direction.'],
    ['Packaging & branding','Support with packaging, labels and brand assets required before production.'],
    ['Product documentation','Guidance on documentation and product information required for each category.'],
    ['Production & delivery','Manufacturing, packing and delivery according to the approved production plan.']
  ];
  $('.block-how-works .title').text('How we work');
  $('.block-how-works .step').each((i,e)=>{const x=steps[i%steps.length];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});

  $('.whatsapp__title').text('Discuss your idea with BIO-A Group');
  $('.whatsapp__description').text('Contact BIO-A Group for advice on formulas, quantities and production timelines.');
  $('.whatsapp__btn').attr('href',company.whatsapp).attr('target','_blank').find('.btn__text').text('Contact us');

  $('.block-product-formats .title').text('Product formats BIO-A can manufacture');
  $('.block-product-formats .formats__lede').text('Available formats can be developed from ready formulas or custom formulas; minimum quantities vary by product.');
  const tabs=['Supplements','Sports nutrition','Pet products','Cosmetics'];
  $('.block-product-formats .formats__tab').each((i,e)=>$(e).text(tabs[i]||$(e).text()));
  $('.block-product-formats .formats__cta-title').text('Do not see your product format?');
  $('.block-product-formats .formats__cta-description').text('Share your product idea and the BIO-A team will recommend a suitable solution.');
  $('.block-product-formats .formats__cta-btn .btn__text').text('Tell us your idea');

  $('.block-reviews .title').html('What clients receive<br>when working with BIO-A Group');
  const rev=[
    'A clear process, responsive support and close follow-up on product requirements.',
    'Flexible sample refinement helped shorten our product development timeline.',
    'BIO-A Group supports the full process from formulation and packaging to production planning.',
    'Stable timelines and transparent communication make it easier to expand additional SKUs.'
  ];
  $('.block-reviews .review').each((i,e)=>{$(e).find('.review__text').text(rev[i%rev.length]);$(e).find('.review__author-name').text('BIO-A Group client');$(e).find('.review__author-info').text('Sample testimonial — to be updated')});

  $('.block-roadmap .title').html('From idea to finished product —<br>a full-cycle partnership');
  $('.block-roadmap .step').each((i,e)=>{const x=steps[i%steps.length];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  const benefits=['Designed for your brand positioning.','Flexible product formats and packaging.','Optimized around your production plan.','Quantity guidance for each project.','Easy product-line expansion.'];
  $('.product .list__item-text').each((i,e)=>$(e).text(benefits[i%benefits.length]));
  $('.product .product__ideal-for .label').text('Ideal for');
  $('.product .product__open-text').text('Show more');
}

function viCleanup($){
  const map={'Customers Achieve':'Khách hàng nhận được gì','Product formats we produce':'Các dạng sản phẩm BIO-A có thể gia công','Sports nutrition':'Dinh dưỡng thể thao','Pet supplements':'Sản phẩm thú cưng','Supplements':'Thực phẩm bổ sung','Cosmetics':'Mỹ phẩm','Ideal for':'Phù hợp với','Key Advantages:':'Ưu điểm nổi bật:','White Label':'Công thức có sẵn','Private Label':'Công thức độc quyền','Contract Manufacturing':'Gia công trọn gói','Read more':'Xem thêm','Show more':'Xem thêm','Contact Us':'Liên hệ tư vấn'};
  $('body *').contents().each((_,n)=>{if(n.type!=='text')return;const p=$(n).parent();if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;let t=n.data;if(/Merywood/i.test(t))t=replaceBrandText(t);const k=t.trim();if(map[k])t=t.replace(k,map[k]);n.data=t});
}

function tabsScript($){$('body').append(`<script id="bioa-tabs-fix">(function(){document.querySelectorAll('.block-product-formats').forEach(function(root){var tabs=[].slice.call(root.querySelectorAll('.formats__tab')),panels=[].slice.call(root.querySelectorAll('.formats__panel'));function go(i){tabs.forEach(function(t,n){t.setAttribute('aria-selected',n===i?'true':'false')});panels.forEach(function(p,n){p.classList.toggle('is-active',n===i);p.style.display=n===i?'block':'none'})}if(tabs.length&&panels.length){go(Math.max(0,tabs.findIndex(function(t){return t.getAttribute('aria-selected')==='true'})));tabs.forEach(function(t,i){t.addEventListener('click',function(){go(i)})})}})})();</script>`)}

export function applyFinalFixes($, route, lang){
  cleanupExternal($);$('html').attr('lang',lang==='vi'?'vi':'en');const title=titleFor(route,lang);$('title').text(title+' | BIO-A Group');$('meta[property="og:site_name"]').attr('content','BIO-A Group');$('link[rel="canonical"]').attr('href',company.domain+localPath(route,lang));
  if(lang==='en')$('body *').contents().each((_,n)=>{if(n.type!=='text')return;const p=$(n).parent();if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;n.data=replaceBrandText(n.data)});
  headerAndLinks($,route,lang);palette($);
  $('.header__email a,.menu__email a,.footer-top__email a').attr('href','mailto:'+company.email).text(company.email);$('.whatsapp__btn').attr('href',company.whatsapp).attr('target','_blank');
  if(lang==='vi'){viCleanup($);if(route==='/')resetHomeVI($);if(route==='/dich-vu-khac/'){$('h1').first().text('Dịch vụ khác của BIO-A Group');$('.text-large').first().text('Hỗ trợ R&D, phát triển công thức, lựa chọn bao bì, thiết kế nhãn, hồ sơ công bố và các hạng mục liên quan đến phát triển thương hiệu mỹ phẩm.')}}
  if(lang==='en'&&route==='/')resetHomeEN($);
  $('.footer-bottom__copyright').text(lang==='vi'?'© 2026 BIO-A Group. Bảo lưu mọi quyền.':'© 2026 BIO-A Group. All rights reserved.');$('.footer-top__socials a').each((i,e)=>{const a=$(e);if(i===0)a.attr('href',company.whatsapp).attr('aria-label','WhatsApp');if(i===1)a.attr('href',company.facebook).attr('aria-label','Facebook');if(i===2)a.attr('href',company.zalo).attr('aria-label','Zalo').html('<img src="/assets/zalo-bioa-framed-cream.png" alt="" aria-hidden="true" style="display:block;width:31px;height:31px;object-fit:contain">');a.attr('target','_blank').attr('rel','noopener noreferrer')});
  tabsScript($);
}
