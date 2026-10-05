export const company = {
  name: 'Bio-A Group', domain: 'https://bioagroup.vn', email: 'contact@bioagroup.vn',
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

function replaceBrandText(s){
  return String(s||'')
    .replace(/Merywood/gi,company.name)
    .replace(/\bBIOA\s+Group\b/gi,company.name)
    .replace(/\bBIO-A\s+Group\b/gi,company.name)
    .replace(/\bBIO-A\b/g,'Bio-A')
    .replace(/info@merywood\.com/gi,company.email)
    .replace(/\[email protected\]/gi,company.email);
}
function setText($,sel,text){const e=$(sel).first();if(e.length)e.text(text)}
function menuHtml(lang){const items=lang==='vi'?[['Về Bio-A Group','/about/'],['Gia Công Mỹ Phẩm','/contract-manufacturing-cosmetics/'],['Dịch Vụ Khác','/dich-vu-khac/'],['Kiến Thức','/blog/'],['Liên Hệ','/contacts/']]:[['About Bio-A Group','/about/'],['Cosmetic Manufacturing','/contract-manufacturing-cosmetics/'],['Other Services','/dich-vu-khac/'],['Insights','/blog/'],['Contact','/contacts/']];return '<ul>'+items.map(x=>'<li class="menu-item"><a href="'+localPath(x[1],lang)+'">'+x[0]+'</a></li>').join('')+'</ul>'}
function titleFor(route,lang){
  if(lang==='en'){
    const map={
      '/':'Bio-A Group Cosmetic & Cosmeceutical Manufacturing Factory',
      '/about/':'About Bio-A Group',
      '/contacts/':'Contact Bio-A Group',
      '/dich-vu-khac/':'Other Services',
      '/contract-manufacturing-cosmetics/':'Cosmetic Manufacturing',
      '/blog/':'Insights',
      '/careers/':'Careers at Bio-A Group'
    };
    return map[route]||(route.startsWith('/blog/')?'Industry Insights':'Bio-A Group Solutions');
  }
  const map={
    '/':'Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group',
    '/about/':'Về Bio-A Group',
    '/contacts/':'Liên Hệ Bio-A Group',
    '/dich-vu-khac/':'Dịch Vụ Khác',
    '/contract-manufacturing-cosmetics/':'Gia Công Mỹ Phẩm Trọn Gói',
    '/white-label-cosmetics/':'Gia Công Mỹ Phẩm Công Thức Có Sẵn',
    '/private-label-cosmetics/':'Gia Công Mỹ Phẩm Công Thức Độc Quyền',
    '/hotel-spa-cosmetics/':'Gia Công Mỹ Phẩm Spa & Khách Sạn',
    '/blog/':'Kiến Thức & Xu Hướng Ngành',
    '/careers/':'Tuyển Dụng Bio-A Group'
  };
  return map[route]||(route.startsWith('/blog/')?'Kiến Thức Chuyên Ngành':'Giải Pháp Bio-A Group');
}

function applyBrandHead($,route,lang){
  const title=titleFor(route,lang);
  const fullTitle=route==='/'?title:(/Bio-A Group/i.test(title)?title:title+' | Bio-A Group');
  $('title').text(fullTitle);
  $('meta[property="og:site_name"]').attr('content',company.name);
  $('meta[property="og:title"],meta[name="twitter:title"]').attr('content',fullTitle);
  $('meta[name="author"]').attr('content',company.name);
  $('meta[name="copyright"]').attr('content',company.name+' - ['+company.email+']');
  $('link[rel="icon"],link[rel="shortcut icon"]').remove();
  $('head').append('<link rel="icon" type="image/svg+xml" href="/assets/bioa-monogram.svg">');
  $('link[rel="canonical"]').attr('href',company.domain+localPath(route,lang));
}


function headerAndLinks($,route,lang){
  const nav=menuHtml(lang);$('.header__nav').html(nav);$('.menu__nav').html(nav);$('.menu-services').remove();
  $('.header__email,.menu__email,.footer-top__email').html('<a class="color-main" href="mailto:'+company.email+'">'+company.email+'</a>');
  $('.header__socials a,.menu__socials a').attr('href',company.whatsapp).attr('aria-label','WhatsApp Bio-A Group').attr('target','_blank');
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

function setPackagingCopy($,lang){
  const vi=lang==='vi';
  const data=vi?[
    ['Tuýp & chai chân không',['Kem','Gel','Lotion'],['Thiết kế gọn, phù hợp mỹ phẩm chăm sóc da.','Hạn chế công thức tiếp xúc trực tiếp với không khí.','Thuận tiện sử dụng và tạo cảm giác cao cấp.','Phù hợp nhiều dòng kem, gel và lotion.','Dễ tùy chỉnh dung tích và nhận diện thương hiệu.']],
    ['Hũ mỹ phẩm',['Kem đặc','Mặt nạ','Tẩy tế bào chết'],['Có thể lựa chọn nhựa hoặc thủy tinh.','Phù hợp sản phẩm có kết cấu đặc.','Dễ đồng bộ nắp, màu và nhãn thương hiệu.']],
    ['Vỉ định hình',['Viên nang','Viên nén'],['Đóng gói từng đơn vị sản phẩm rõ ràng.','Thuận tiện kiểm soát liều dùng.','Hỗ trợ bảo quản và vận chuyển gọn gàng.']],
    ['Gói sachet',['Mẫu dùng thử','Liều dùng một lần','Sản phẩm cỡ du lịch'],['Phù hợp thử mẫu và chương trình marketing.','Nhẹ, dễ phân phối và vận chuyển.','Có thể dùng cho nhiều kết cấu mỹ phẩm.']],
    ['Túi doypack',['Bột đóng gói','Sản phẩm refill','Hỗn hợp pha'],['Nhẹ và tiết kiệm không gian đóng gói.','Thuận tiện cho sản phẩm refill.','Phù hợp bán hàng trực tuyến và vận chuyển.']]
  ]:[
    ['Tubes & airless containers',['Creams','Gels','Lotions'],['Compact packaging for skincare products.','Helps reduce direct formula exposure to air.','Convenient use with a premium presentation.','Suitable for creams, gels and lotions.','Flexible sizes and brand customization.']],
    ['Cosmetic jars',['Rich creams','Masks','Body scrubs'],['Available in plastic or glass.','Suitable for thicker product textures.','Flexible lid, color and label customization.']],
    ['Blister packs',['Capsules','Tablets'],['Clear single-unit packaging.','Convenient dose control.','Compact for storage and shipping.']],
    ['Sachets',['Samples','Single use','Travel size'],['Ideal for samples and promotions.','Lightweight and easy to distribute.','Suitable for multiple cosmetic textures.']],
    ['Doypacks',['Bulk powders','Refill products','Drink mixes'],['Lightweight and space-efficient.','Convenient for refill products.','Well suited to ecommerce shipping.']]
  ];
  $('.block-products-desctop .swiper-slide .product,.block-products-mobile .swiper-slide .product').each((i,el)=>{
    const d=data[i%data.length],root=$(el);
    root.find('.product__title .title,.product__title').first().text(d[0]);
    root.find('.product__ideal-for .label').text(vi?'Phù hợp với':'Ideal for');
    root.find('.product__ideal-for .labels__item').each((j,e)=>{if(d[1][j])$(e).find('p').first().text(d[1][j])});
    root.find('.product__key-advantages .label').text(vi?'Ưu điểm nổi bật':'Key advantages');
    root.find('.product__key-advantages .list__item').each((j,e)=>{
      if(!d[2][j])return;
      const t=$(e).find('.list__item-text').first();
      if(t.length)t.text(d[2][j]);else $(e).find('p').first().text(d[2][j]);
    });
    root.find('.product__open-text').text(vi?'Xem thêm':'Show more');
  });
  $('.block-products-mobile .title-wrapper .title').text(vi?'Giải pháp bao bì phù hợp sản phẩm':'Packaging solutions for your product');
}

function setRightChoiceCopy($,lang){
  const vi=lang==='vi';
  const names=vi?['Thương hiệu mới','Doanh nghiệp mỹ phẩm','Đơn vị phân phối']:['New brands','Cosmetic businesses','Distributors'];
  const copy=vi?[
    ['Bắt đầu với lộ trình phát triển sản phẩm rõ ràng.','Tối ưu ngân sách theo từng giai đoạn.','Đồng hành từ mẫu thử đến sản xuất.'],
    ['Mở rộng danh mục bằng công thức và bao bì mới.','Linh hoạt phát triển OEM/ODM theo định vị.','Đồng bộ R&D, hồ sơ và kế hoạch sản xuất.'],
    ['Phát triển sản phẩm mang thương hiệu riêng.','Chủ động lựa chọn quy cách và phân khúc.','Dễ mở rộng thêm SKU khi thị trường phù hợp.']
  ]:[
    ['Start with a clear product-development roadmap.','Optimize budget by development stage.','Get support from sampling through production.'],
    ['Expand your range with new formulas and packaging.','Flexible OEM/ODM development for your positioning.','Align R&D, documentation and production planning.'],
    ['Develop products under your own brand.','Choose formats and positioning independently.','Scale with additional SKUs as demand grows.']
  ];
  $('.block-right-choice').each((_,block)=>{
    const root=$(block);root.find('.title').first().text(vi?'Phù hợp với':'Built for');
    root.find('.client').each((i,client)=>{
      $(client).find('.client__name .h3').first().text(names[i]||names[2]);
      $(client).find('.client__description li').each((j,li)=>{if(copy[i]?.[j])$(li).text(copy[i][j])});
    });
  });
}

function setProduceCopy($,lang){
  const vi=lang==='vi';
  const data=vi?[
    ['Gia công dược mỹ phẩm','R&D công thức và sản xuất OEM/ODM theo định hướng thương hiệu.'],
    ['Bao bì & hoàn thiện','Chai lọ, sang chiết, đóng gói và hoàn thiện sản phẩm.']
  ]:[
    ['Cosmetic manufacturing','Formula R&D and OEM/ODM production for your brand direction.'],
    ['Packaging & finishing','Bottles, filling, packing and finished-product preparation.']
  ];
  $('.block-we-produce .title-wrapper .title').first().text(vi?'Danh mục sản xuất':'What we manufacture');
  $('.block-we-produce .item').each((i,e)=>{
    const d=data[i%2], root=$(e);
    const title=root.find('.item__title').first();
    const titleP=title.find('p').first();
    (titleP.length?titleP:title).text(d[0]);
    const body=root.find('.item__text').first();
    const bodyP=body.find('p').first();
    (bodyP.length?bodyP:body).text(d[1]);
  });
}

function setFormatsCopy($,lang){
  const vi=lang==='vi';
  const tabs=vi?['Chăm sóc da','Chăm sóc tóc','Chăm sóc body','Trang điểm']:['Skin care','Hair care','Body care','Makeup'];
  const formats=vi?[
    ['Kem','Serum','Gel','Dạng xịt','Lotion','Mặt nạ','Tẩy tế bào chết','Dạng sáp'],
    ['Dầu gội','Dầu xả','Tinh chất tóc','Xịt dưỡng','Mặt nạ tóc','Gel tạo kiểu'],
    ['Sữa tắm','Lotion body','Body mist','Tẩy tế bào chết','Kem body','Gel body'],
    ['Son','Kem nền','Phấn','Mascara','Kẻ mắt','Má hồng']
  ]:[
    ['Creams','Serums','Gels','Sprays','Lotions','Masks','Scrubs','Balms'],
    ['Shampoo','Conditioner','Hair serum','Hair mist','Hair mask','Styling gel'],
    ['Body wash','Body lotion','Body mist','Body scrub','Body cream','Body gel'],
    ['Lip products','Foundation','Powder','Mascara','Eyeliner','Blush']
  ];
  $('.block-product-formats .title').text(vi?'Các dòng sản phẩm Bio-A Group có thể gia công':'Product lines Bio-A Group can manufacture');
  $('.block-product-formats .formats__lede').text(vi?'Có thể phát triển theo công thức có sẵn hoặc công thức riêng; số lượng tối thiểu tùy từng sản phẩm.':'Available as ready-formula or custom-formula projects; minimum quantities vary by product.');
  $('.block-product-formats .formats__tab').each((i,e)=>$(e).text(tabs[i]||$(e).text()));
  $('.block-product-formats .formats__panel').each((i,p)=>$(p).find('.formats__item-title').each((j,e)=>$(e).text(formats[i%4][j%formats[i%4].length])));
  $('.block-product-formats .formats__cta-title').text(vi?'Chưa thấy sản phẩm bạn cần?':'Do not see your product?');
  $('.block-product-formats .formats__cta-description').text(vi?'Gửi ý tưởng, đội ngũ Bio-A Group sẽ tư vấn phương án phù hợp.':'Share your idea and Bio-A Group will recommend a suitable approach.');
  $('.block-product-formats .formats__cta-btn .btn__text').text(vi?'Chia sẻ ý tưởng':'Tell us your idea');
  $('.block-product-formats .formats__note').text(vi?'Có thể tùy chỉnh kết cấu, nguyên liệu, màu sắc, mùi hương và quy cách theo định hướng thương hiệu.':'Texture, ingredients, color, fragrance and format can be customized for your brand.');
}

function finalizeHomeCopy($,lang){
  const vi=lang==='vi';
  setProduceCopy($,lang);setPackagingCopy($,lang);setFormatsCopy($,lang);setRightChoiceCopy($,lang);
  $('.block-products-desctop .big-labels').each((_,list)=>{
    $(list).find('.big-labels__item-text-1').each((i,e)=>{
      $(e).text(i%2===0?(vi?'2500 sản phẩm':'2500 units'):(vi?'5000 sản phẩm':'5000 units'));
    });
    $(list).find('.big-labels__item-text-2').each((i,e)=>{
      const p=$(e).find('p').first();
      if(!p.length)return;
      p.html(i%2===0
        ?(vi?'<b>Công thức có sẵn</b> — số lượng tối thiểu từ':'<b>Ready formula</b> — minimum order quantity from')
        :(vi?'<b>Công thức độc quyền</b> — số lượng tối thiểu từ':'<b>Custom formula</b> — minimum order quantity from'));
    });
  });
  $('.block-products-mobile .info').each((_,list)=>{
    $(list).find('.info__item-text-1').each((i,e)=>{
      $(e).text(i%2===0?(vi?'2500 sản phẩm':'2500 units'):(vi?'5000 sản phẩm':'5000 units'));
    });
    $(list).find('.info__item-text-2').each((i,e)=>{
      const p=$(e).find('p').first();
      if(!p.length)return;
      p.html(i%2===0
        ?(vi?'<b>Công thức có sẵn</b> — số lượng tối thiểu từ':'<b>Ready formula</b> — minimum order quantity from')
        :(vi?'<b>Công thức độc quyền</b> — số lượng tối thiểu từ':'<b>Custom formula</b> — minimum order quantity from'));
    });
  });
  $('.block-title h1').first().text(vi?'Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group':'Bio-A Group Cosmetic & Cosmeceutical Manufacturing Factory');
  $('.block-title .text-large').first().text(vi?'Đồng hành từ R&D công thức, sản xuất OEM/ODM đến bao bì và hoàn thiện sản phẩm.':'From formula R&D and OEM/ODM manufacturing to packaging and finished products.');
  $('.whatsapp__title').text(vi?'Trao đổi ý tưởng cùng Bio-A Group':'Discuss your idea with Bio-A Group');
  $('.whatsapp__description').text(vi?'Liên hệ Zalo 0779 399 379 để được tư vấn về công thức, số lượng và tiến độ.':'Contact Bio-A Group on Zalo for formula, quantity and production-timeline advice.');
  $('.page-main *').contents().each((_,n)=>{
    if(n.type!=='text')return;
    const p=$(n).parent();if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;
    let raw=n.data,key=raw.replace(/\s+/g,' ').trim();if(!key)return;
    if(/Merywood/i.test(raw))n.data=replaceBrandText(raw);
  });
}

function resetHomeVI($){
  const stats=[['2.000+','Mẫu R&D'],['5+','Năm kinh nghiệm'],['10.000.000','Sản phẩm / năm'],['1.000 m²','Quy mô nhà máy'],['OEM/ODM','Gia công trọn gói']];setHomeStats($,stats);
  $('#why-choose-us .title').first().text('Vì sao chọn Bio-A Group');
  const why=[['Giải pháp theo yêu cầu','Tư vấn theo mục tiêu sản phẩm, khách hàng và định vị thương hiệu.'],['R&D & công thức','Phát triển công thức, mẫu thử và điều chỉnh theo nhu cầu dự án.'],['Hỗ trợ hồ sơ','Đồng hành hồ sơ, công bố và thông tin nhãn trước khi ra thị trường.'],['Kiểm soát chất lượng','Theo dõi chất lượng ở từng giai đoạn để ổn định thành phẩm.']];
  $('#why-choose-us .grid .item,#why-choose-us .mobile .item').each((i,e)=>{
    const d=why[i%why.length],root=$(e);
    const title=root.find('.item__title').first(),titleP=title.find('p').first();
    (titleP.length?titleP:title).text(d[0]);
    const body=root.find('.item__body').first(),bodyP=body.find('p').first();
    (bodyP.length?bodyP:body).text(d[1]);
  });
  const steps=[['Tư vấn & lập kế hoạch','Thống nhất mục tiêu, sản phẩm, ngân sách và tiến độ triển khai.'],['Nghiên cứu & phát triển','R&D công thức, nguyên liệu và mẫu thử theo định hướng thương hiệu.'],['Bao bì & nhận diện','Lựa chọn bao bì, nhãn và hạng mục nhận diện trước sản xuất.'],['Hồ sơ sản phẩm','Tư vấn hồ sơ và thông tin cần chuẩn bị theo từng nhóm sản phẩm.'],['Sản xuất & bàn giao','Sản xuất, đóng gói và bàn giao theo kế hoạch đã thống nhất.']];
  $('.block-how-works .title').text('Quy trình hợp tác');$('.block-how-works .step').each((i,e)=>{const x=steps[i%5];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  $('.block-reviews .title').html('Khách hàng nhận được gì<br>khi đồng hành cùng Bio-A Group');
  const rev=['Quy trình rõ ràng, đội ngũ hỗ trợ nhanh và bám sát yêu cầu sản phẩm.','Mẫu thử được điều chỉnh linh hoạt, giúp rút ngắn thời gian hoàn thiện.','Bio-A Group hỗ trợ đồng bộ từ công thức, bao bì đến kế hoạch sản xuất.','Tiến độ ổn định, trao đổi minh bạch khi cần phát triển thêm SKU.'];
  $('.block-reviews .review').each((i,e)=>{$(e).find('.review__text').text(rev[i%4]);$(e).find('.review__author-name').text('Khách hàng Bio-A Group');$(e).find('.review__author-info').text('Nội dung đánh giá mẫu – sẽ cập nhật')});
  $('.block-roadmap .title').html('Từ ý tưởng đến thành phẩm —<br>quy trình đồng hành trọn gói');$('.block-roadmap .step').each((i,e)=>{const x=steps[i%5];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  finalizeHomeCopy($,'vi');
}

function resetHomeEN($){
  const stats=[['2,000+','R&D samples'],['5+','Years of experience'],['10,000,000','Products / year'],['1,000 m²','Factory scale'],['OEM/ODM','Full-service manufacturing']];setHomeStats($,stats);
  $('#why-choose-us .title').first().text('Why choose Bio-A Group');
  const why=[['Tailored solutions','Consulting around product goals, customers and brand positioning.'],['R&D & formulation','Formula development, sampling and refinement for each project.'],['Documentation support','Support for dossiers, notifications and label information.'],['Quality control','Quality monitoring throughout development and production.']];
  $('#why-choose-us .grid .item,#why-choose-us .mobile .item').each((i,e)=>{
    const d=why[i%why.length],root=$(e);
    const title=root.find('.item__title').first(),titleP=title.find('p').first();
    (titleP.length?titleP:title).text(d[0]);
    const body=root.find('.item__body').first(),bodyP=body.find('p').first();
    (bodyP.length?bodyP:body).text(d[1]);
  });
  const steps=[['Consultation & planning','Align product goals, budget and timeline.'],['Research & development','Develop formulas, ingredients and samples for your brand direction.'],['Packaging & branding','Select packaging, labels and required brand assets.'],['Product documentation','Prepare the documentation and product information required.'],['Production & delivery','Manufacture, pack and deliver to the agreed plan.']];
  $('.block-how-works .title').text('How we work');$('.block-how-works .step').each((i,e)=>{const x=steps[i%5];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  $('.block-reviews .title').html('What clients receive<br>when working with Bio-A Group');
  const rev=['A clear process, responsive support and close follow-up on product requirements.','Flexible sample refinement helps shorten development time.','Bio-A Group supports formulation, packaging and production planning.','Stable timelines make it easier to expand additional SKUs.'];
  $('.block-reviews .review').each((i,e)=>{$(e).find('.review__text').text(rev[i%4]);$(e).find('.review__author-name').text('Bio-A Group client');$(e).find('.review__author-info').text('Sample testimonial — to be updated')});
  $('.block-roadmap .title').html('From idea to finished product —<br>a full-cycle partnership');$('.block-roadmap .step').each((i,e)=>{const x=steps[i%5];$(e).find('.step__title').text(x[0]);$(e).find('.step__text').text(x[1])});
  finalizeHomeCopy($,'en');
}

function viCleanup($){
  const map={
    'Manage Consent':'Quản lý cookie',
    'Accept all':'Đồng ý tất cả',
    'Reject all':'Từ chối tất cả',
    'View preferences':'Tùy chọn',
    'Preferences':'Tùy chọn cookie',
    'Functional':'Cookie chức năng',
    'Always active':'Luôn hoạt động',
    'Statistics (Analytics)':'Thống kê (Analytics)',
    'Marketing':'Tiếp thị',
    'Ads/Remarketing':'Quảng cáo/Tiếp thị lại',
    'Save preferences':'Lưu tùy chọn',
    '← Back':'← Quay lại',
    'Product Type':'Loại sản phẩm',
    'Food Supplements':'Dược mỹ phẩm',
    'Pet Supplements':'Sản phẩm chăm sóc thú cưng',
    'Sport nutrition':'Dinh dưỡng thể thao',
    'No idea now':'Cần Bio-A Group tư vấn',
    'Product Quantity':'Số lượng dự kiến',
    'Privacy Policy':'Chính sách bảo mật',
    'Cookie Policy':'Chính sách cookie',
    'Customers Achieve':'Khách hàng nhận được gì',
    'Product formats we produce':'Các dòng sản phẩm Bio-A Group có thể gia công',
    'Sports nutrition':'Dinh dưỡng thể thao',
    'Pet supplements':'Sản phẩm thú cưng',
    'Supplements':'Dược mỹ phẩm',
    'Cosmetics':'Mỹ phẩm',
    'Ideal for':'Phù hợp với',
    'Key Advantages:':'Ưu điểm nổi bật',
    'Key Advantages':'Ưu điểm nổi bật',
    'White Label':'Công thức có sẵn',
    'Private Label':'Công thức độc quyền',
    'Contract Manufacturing':'Gia công trọn gói',
    'Read more':'Xem thêm',
    'Show more':'Xem thêm',
    'Contact Us':'Liên hệ tư vấn',
    'Packaging':'Bao bì',
    'Solutions Tailored':'Giải pháp phù hợp',
    'to Your Needs':'theo nhu cầu',
    'Retailers':'Đơn vị phân phối',
    'Entrepreneurs':'Thương hiệu mới',
    'Creams':'Kem',
    'Gels':'Gel',
    'Lotions':'Lotion',
    'Jars':'Hũ mỹ phẩm',
    'Blister Packs':'Vỉ định hình',
    'Sachets':'Gói sachet',
    'Doypacks':'Túi doypack',
    'Get started':'Nhận tư vấn',
    'Chat on WhatsApp':'Liên hệ với chúng tôi'
  };
  $('body *').contents().each((_,n)=>{
    if(n.type!=='text')return;
    const p=$(n).parent();
    if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;
    let t=n.data;
    if(/Merywood/i.test(t))t=replaceBrandText(t);
    const k=t.replace(/\s+/g,' ').trim();
    if(map[k])t=t.replace(k,map[k]);
    else if(/^To provide the best experiences/i.test(k))t='Website sử dụng cookie cần thiết và công cụ thống kê để cải thiện trải nghiệm. Bạn có thể đồng ý, từ chối hoặc tùy chỉnh.';
    else if(/^It takes 30 seconds/i.test(k))t='Chỉ mất khoảng 30 giây để gửi yêu cầu tư vấn.';
    else if(/^I agree to the processing/i.test(k))t='Tôi đồng ý để Bio-A Group sử dụng thông tin đã cung cấp nhằm mục đích tư vấn và liên hệ.';
    n.data=t;
  });
  $('[placeholder]').each((_,el)=>{
    const e=$(el),v=e.attr('placeholder')||'';
    if(/email/i.test(v))e.attr('placeholder','Nhập email');
    else if(/name/i.test(v))e.attr('placeholder','Nhập họ tên');
    else if(/message|comment/i.test(v))e.attr('placeholder','Nhập nội dung');
  });
  $('[aria-label]').each((_,el)=>{
    const e=$(el),v=e.attr('aria-label')||'';
    if(/previous slide/i.test(v))e.attr('aria-label','Xem mục trước');
    else if(/next slide/i.test(v))e.attr('aria-label','Xem mục tiếp theo');
    else if(/close/i.test(v))e.attr('aria-label','Đóng');
  });
}

function tabsScript($){$('body').append(`<script id="bioa-tabs-fix">(function(){document.querySelectorAll('.block-product-formats').forEach(function(root){var tabs=[].slice.call(root.querySelectorAll('.formats__tab')),panels=[].slice.call(root.querySelectorAll('.formats__panel'));function go(i){tabs.forEach(function(t,n){t.setAttribute('aria-selected',n===i?'true':'false')});panels.forEach(function(p,n){p.classList.toggle('is-active',n===i);p.style.display=n===i?'block':'none'})}if(tabs.length&&panels.length){go(Math.max(0,tabs.findIndex(function(t){return t.getAttribute('aria-selected')==='true'})));tabs.forEach(function(t,i){t.addEventListener('click',function(){go(i)})})}})})();</script>`)}

export function applyFinalFixes($, route, lang){
  cleanupExternal($);$('html').attr('lang',lang==='vi'?'vi':'en');applyBrandHead($,route,lang);
  if(lang==='en')$('body *').contents().each((_,n)=>{if(n.type!=='text')return;const p=$(n).parent();if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;n.data=replaceBrandText(n.data)});
  headerAndLinks($,route,lang);palette($);
  $('.header__email a,.menu__email a,.footer-top__email a').attr('href','mailto:'+company.email).text(company.email);$('.whatsapp__btn').attr('href',company.whatsapp).attr('target','_blank');
  if(lang==='vi'){viCleanup($);if(route==='/')resetHomeVI($);if(route==='/dich-vu-khac/'){$('h1').first().text('Dịch vụ khác của Bio-A Group');$('.text-large').first().text('Hỗ trợ R&D, phát triển công thức, lựa chọn bao bì, thiết kế nhãn, hồ sơ công bố và các hạng mục liên quan đến phát triển thương hiệu mỹ phẩm.')}}
  if(lang==='en'&&route==='/')resetHomeEN($);
  $('.footer-bottom__copyright').text(lang==='vi'?'© 2026 Bio-A Group. Bảo lưu mọi quyền.':'© 2026 Bio-A Group. All rights reserved.');$('.footer-top__socials a').each((i,e)=>{const a=$(e);if(i===0)a.attr('href',company.whatsapp).attr('aria-label','WhatsApp');if(i===1)a.attr('href',company.facebook).attr('aria-label','Facebook');if(i===2)a.attr('href',company.zalo).attr('aria-label','Zalo').html('<img src="/assets/zalo-bioa-circle-cream.svg" alt="" aria-hidden="true" style="display:block;width:30px;height:30px;object-fit:contain;margin:auto">');a.attr('target','_blank').attr('rel','noopener noreferrer')});
  $('body *').contents().each((_,n)=>{
    if(n.type!=='text')return;
    const p=$(n).parent();
    if(['SCRIPT','STYLE','NOSCRIPT','SVG','CODE','PRE'].includes(p[0]?.tagName||''))return;
    n.data=replaceBrandText(n.data);
  });
  $('[title],[aria-label],[alt]').each((_,el)=>{
    const e=$(el);
    ['title','aria-label','alt'].forEach(k=>{const v=e.attr(k);if(v)e.attr(k,replaceBrandText(v));});
  });
  tabsScript($);
}
