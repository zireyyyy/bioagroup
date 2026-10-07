import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { applyFinalFixes, withExtraRoutes, localPath } from "./bioa-transform.mjs";
import { applyHomeRefinement, applySharedShell } from "./bioa-home-refine.mjs";
import { applyAboutRefinement } from "./bioa-about-refine.mjs";
import { applyCosmeticsHubRefinement } from "./bioa-cosmetics-refine.mjs";
import { applyOtherServicesRefinement } from "./bioa-services-refine.mjs";
import { applyBlogRefinement, blogRouteDefs } from "./bioa-blog-refine.mjs";
import { applyContactsRefinement } from "./bioa-contacts-refine.mjs";

const BASE = "https://merywood.com";
const OUT = "dist";

const routes = [
  "/",
  "/about/",
  "/contacts/",
  "/careers/",
  "/cookie-policy/",
  "/privacy-policy/",
  "/contract-manufacturing-cosmetics/",
  "/blog/"
];

const routeDefs = [...withExtraRoutes(routes), ...blogRouteDefs];

const pageTitles = {
  "/": "Gia công mỹ phẩm & phát triển thương hiệu",
  "/about/": "Về Bio-A Group",
  "/contacts/": "Liên hệ Bio-A Group",
  "/careers/": "Tuyển dụng Bio-A Group",
  "/contract-manufacturing-cosmetics/": "Gia công mỹ phẩm trọn gói",
  "/white-label-cosmetics/": "Gia công mỹ phẩm công thức có sẵn",
  "/private-label-cosmetics/": "Gia công mỹ phẩm công thức độc quyền",
  "/hotel-spa-cosmetics/": "Gia công mỹ phẩm Spa & khách sạn",
  "/contract-manufacturing-supplements/": "Gia công sản phẩm chăm sóc sức khỏe",
  "/white-label-supplements/": "Sản phẩm công thức có sẵn",
  "/private-label-supplements/": "Sản phẩm công thức độc quyền",
  "/sports-nutrition/": "Dinh dưỡng & vận động",
  "/pet-supplement-manufacturer/": "Sản phẩm chăm sóc thú cưng",
  "/weight-loss/": "Sản phẩm chăm sóc vóc dáng",
  "/male-enhancement/": "Sản phẩm chăm sóc nam giới",
  "/diabet/": "Sản phẩm chăm sóc chuyên biệt",
  "/blog/": "Blog Bio-A Group",
  "/privacy-policy/": "Chính sách bảo mật",
  "/cookie-policy/": "Chính sách cookie"
};

const exact = new Map(Object.entries({
  "Manage Consent":"Quản lý cookie",
  "Accept all":"Đồng ý tất cả",
  "Reject all":"Từ chối tất cả",
  "View preferences":"Tùy chọn",
  "Preferences":"Tùy chọn cookie",
  "Functional":"Cookie chức năng",
  "Always active":"Luôn hoạt động",
  "Statistics (Analytics)":"Thống kê (Analytics)",
  "Marketing":"Tiếp thị",
  "Ads/Remarketing":"Quảng cáo/Tiếp thị lại",
  "Save preferences":"Lưu tùy chọn",
  "Supplements":"Dịch vụ",
  "Cosmetics":"Sản phẩm",
  "CPA Offers":"Năng lực",
  "For Pets":"Danh mục",
  "Blog":"Kiến thức",
  "Get started":"Nhận tư vấn",
  "← Back":"← Quay lại",
  "Weight loss":"Chăm sóc vóc dáng",
  "Male Enhancement":"Chăm sóc nam giới",
  "Diabet":"Chăm sóc chuyên biệt",
  "Contract Manufacturing":"Gia công trọn gói",
  "Contract manufacturing":"Gia công trọn gói",
  "White Label":"Công thức có sẵn",
  "White label":"Công thức có sẵn",
  "Private Label":"Công thức độc quyền",
  "Private label":"Công thức độc quyền",
  "Sports Nutrition":"Dinh dưỡng & vận động",
  "Sport nutrition":"Dinh dưỡng & vận động",
  "Pet Supplements":"Chăm sóc thú cưng",
  "Pet supplement":"Chăm sóc thú cưng",
  "Vitamins":"Dòng hoạt chất",
  "For Hotels & SPA":"Spa & khách sạn",
  "Company":"Công ty",
  "Contacts":"Liên hệ",
  "Careers":"Tuyển dụng",
  "About Merywood":"Về Bio-A Group",
  "About":"Giới thiệu",
  "Cookie Policy":"Chính sách cookie",
  "Privacy Policy":"Chính sách bảo mật",
  "Home":"Trang chủ",
  "Contact Us":"Liên hệ tư vấn",
  "Read more":"Xem thêm",
  "Show more":"Xem thêm",
  "Learn more":"Tìm hiểu thêm",
  "FAQ":"Câu hỏi thường gặp",
  "Features":"Đặc điểm nổi bật",
  "Key Features":"Đặc điểm chính",
  "Manufacturing":"Sản xuất",
  "Production":"Sản xuất",
  "Custom Formulation":"Phát triển công thức",
  "Packaging":"Bao bì",
  "Regulatory Support":"Hỗ trợ hồ sơ",
  "Regulatory compliance":"Tuân thủ quy định",
  "Quality management":"Quản lý chất lượng",
  "Our certificates":"Chứng nhận & năng lực",
  "How It Works":"Quy trình hợp tác",
  "How it works":"Quy trình hợp tác",
  "Consultation & Planning":"Tư vấn & lập kế hoạch",
  "Research & Development":"Nghiên cứu & phát triển",
  "Label Printing & Branding Support":"Thiết kế nhãn & thương hiệu",
  "Production & Logistics":"Sản xuất & bàn giao",
  "Previous article":"Bài trước",
  "Next article":"Bài tiếp theo",
  "Share":"Chia sẻ",
  "By":"Bởi",
  "What Our Clients Say":"Khách hàng nói gì",
  "Customers Achieve with Merywood":"Khách hàng nhận được",
  "Customers Achieve with Bio-A Group":"Khách hàng nhận được",
  "The Right Choice For":"Phù hợp với",
  "Retailers":"Nhà phân phối & bán lẻ",
  "Entrepreneurs":"Chủ thương hiệu",
  "Product formats":"Dạng sản phẩm",
  "Formats & Packaging":"Dạng sản phẩm & bao bì",
  "Capsules":"Viên nang",
  "Tablets":"Viên nén",
  "Gummies":"Kẹo dẻo",
  "Powders":"Dạng bột",
  "Sprays":"Dạng xịt",
  "Gels":"Dạng gel",
  "Serums":"Serum",
  "Balms":"Dạng sáp",
  "Drops":"Dạng nhỏ giọt",
  "Softgels":"Viên nang mềm",
  "Shots":"Dạng shot",
  "Creams":"Kem",
  "Lotions":"Lotion",
  "Liquids":"Dạng lỏng",
  "Bars":"Dạng thanh",
  "Oral films":"Màng ngậm",
  "Lozenges":"Viên ngậm",
  "Lollipops":"Kẹo que",
  "Chewable tablets":"Viên nhai",
  "Tea bags":"Trà túi lọc",
  "Pastes":"Dạng sệt",
  "Toppings":"Dạng topping",
  "Oils":"Dạng dầu",
  "Jelly chews":"Kẹo dẻo jelly",
  "Effervescent tablets":"Viên sủi",
  "Why Choose Us":"Vì sao chọn Bio-A Group",
  "We Produce":"Danh mục sản xuất",
  "From Idea to Launch — A Full-Cycle Partnership":"Từ ý tưởng đến thành phẩm",
  "Collaborate & Plan":"Trao đổi & lập kế hoạch",
  "Develop & Refine":"R&D & hoàn thiện công thức",
  "Print & Brand":"Thiết kế & xây dựng thương hiệu",
  "Ensure Compliance":"Hoàn thiện hồ sơ",
  "Produce & Deliver":"Sản xuất & bàn giao",
  "Tailored Solutions":"Giải pháp theo yêu cầu",
  "Multi-Brand Labeling":"Phát triển thương hiệu riêng",
  "EU Certification":"Kiểm soát tiêu chuẩn",
  "100% Quality":"Cam kết chất lượng",
  "Let's discuss your idea":"Trao đổi ý tưởng cùng Bio-A Group",
  "Tell us your idea":"Chia sẻ ý tưởng",
  "Conclusion":"Kết luận",
  "Sources":"Nguồn tham khảo",
  "On this page":"Nội dung bài viết",
  "Ideal for":"Phù hợp với",
  "Key Advantages:":"Ưu điểm nổi bật:",
  "Product Type":"Loại sản phẩm",
  "Food Supplements":"Sản phẩm chăm sóc sức khỏe",
  "No idea now":"Cần Bio-A tư vấn",
  "Product Quantity":"Số lượng dự kiến",
  "Get In Touch with Merywood":"Liên hệ Bio-A Group",
  "Chat on WhatsApp":"Liên hệ tư vấn"
}));

const sectionFallbacks = [
  "Năng lực Bio-A Group",
  "Giải pháp theo yêu cầu",
  "Quy trình phát triển sản phẩm",
  "Kiểm soát chất lượng",
  "Bao bì & nhận diện thương hiệu",
  "Đồng hành cùng khách hàng",
  "Câu hỏi thường gặp"
];

const reviewTexts = [
  "Quy trình làm việc rõ ràng, đội ngũ hỗ trợ nhanh và bám sát yêu cầu sản phẩm.",
  "Mẫu thử được điều chỉnh linh hoạt, giúp chúng tôi rút ngắn thời gian hoàn thiện sản phẩm.",
  "Bio-A Group hỗ trợ tốt từ công thức, bao bì đến kế hoạch sản xuất.",
  "Tiến độ ổn định, trao đổi minh bạch và thuận tiện khi cần phát triển thêm SKU.",
  "Đội ngũ tư vấn nắm yêu cầu nhanh và phối hợp tốt trong suốt quá trình triển khai.",
  "Chất lượng thành phẩm ổn định và phù hợp định hướng thương hiệu của chúng tôi."
];

const bodyFallbacks = [
  "Bio-A Group đồng hành từ ý tưởng, công thức đến sản phẩm hoàn thiện.",
  "Giải pháp được điều chỉnh theo định vị thương hiệu và nhu cầu kinh doanh.",
  "Quy trình được kiểm soát rõ ràng ở từng giai đoạn phát triển sản phẩm.",
  "Đội ngũ R&D hỗ trợ lựa chọn công thức, nguyên liệu và quy cách phù hợp.",
  "Hỗ trợ bao bì, nhãn sản phẩm và các hạng mục cần thiết trước khi sản xuất.",
  "Linh hoạt theo từng dự án, từ thương hiệu mới đến danh mục đang mở rộng."
];

const english = /\b(the|and|with|for|your|our|we|you|from|to|of|in|is|are|this|that|product|manufactur|label|quality|support|choose|client|customer|privacy|cookie|read|contact|about|career|marketing|functional|statistics|preferences|accept|reject|manage|how|what|why|where|which|can|will|more|used|ideal|features|source|production|packaging|supplement|cosmetic|brand|business|made|europe|trusted|unique|formulation|minimum|order|units|types|launch|certified)\b/i;
const clean = s => String(s || "").replace(/\s+/g, " ").trim();

function pageTitle(route){
  if (pageTitles[route]) return pageTitles[route];
  if (route.startsWith("/blog/")) return "Kiến thức chuyên ngành";
  if (route.startsWith("/careers/")) return "Cơ hội nghề nghiệp tại Bio-A Group";
  if (/vitamin|omega|probiotics/.test(route)) return "Giải pháp phát triển sản phẩm";
  return "Giải pháp Bio-A Group";
}

function translateText(t, tag, classes, route, counters){
  const text = clean(t);
  if (!text) return t;
  if (exact.has(text)) return exact.get(text);

  let v = text.replace(/Merywood/gi, "Bio-A Group")
              .replace(/\[email protected\]/gi, company.email)
              .replace(/info@merywood\.com/gi, company.email);

  if (/^To provide the best experiences/i.test(text)) return "Website sử dụng cookie cần thiết và công cụ thống kê để cải thiện trải nghiệm. Bạn có thể đồng ý, từ chối hoặc tùy chỉnh theo nhu cầu.";
  if (/^I agree to the processing/i.test(text)) return "Tôi đồng ý để Bio-A Group sử dụng thông tin đã cung cấp nhằm mục đích tư vấn và liên hệ.";
  if (/^It takes 30 seconds/i.test(text)) return "Chỉ mất khoảng 30 giây để gửi yêu cầu tư vấn.";
  if (/^© .*Merywood/i.test(text)) return "© 2026 Bio-A Group. Bảo lưu mọi quyền.";
  if (/^Launch your brand/i.test(text)) return "Phát triển thương hiệu từ công thức đến thành phẩm cùng Bio-A Group.";
  if (/Trusted in .*countries/i.test(text)) return "Đồng hành cùng nhiều thương hiệu và đối tác.";
  if (/Product types/i.test(text)) return "Danh mục sản phẩm";
  if (/Unique formulations/i.test(text)) return "Công thức R&D theo nhu cầu";
  if (/White label MOQ/i.test(text)) return "Số lượng tối thiểu công thức có sẵn";
  if (/Private label MOQ/i.test(text)) return "Số lượng tối thiểu công thức độc quyền";
  if (/Types of produce/i.test(text)) return "Dạng sản phẩm";
  if (/minimum order quantity/i.test(text)) return text.match(/^\d+/)?.[0] ? `${text.match(/^\d+/)[0]} sản phẩm` : "Số lượng tối thiểu theo từng sản phẩm";
  if (/Message us on WhatsApp/i.test(text)) return "Liên hệ Bio-A Group để được tư vấn về công thức, số lượng và tiến độ sản xuất.";

  if (!english.test(v)) return v;

  const cls = classes.toLowerCase();
  if (cls.includes("review")) return reviewTexts[counters.review++ % reviewTexts.length];
  if (/^H1$/.test(tag)) return pageTitle(route);
  if (/^H[234]$/.test(tag)) return sectionFallbacks[counters.heading++ % sectionFallbacks.length];
  if (/^(BUTTON|A)$/.test(tag)) {
    if (/contact|get started|discuss|message|submit|send|quote|offer/i.test(text)) return "Nhận tư vấn";
    if (/back/i.test(text)) return "Quay lại";
    if (/read|learn|view|show|more/i.test(text)) return "Xem thêm";
    return "Xem chi tiết";
  }
  if (/^(LABEL|OPTION)$/.test(tag)) return "Tùy chọn";
  if (/^LI$/.test(tag)) return text.length < 35 ? "Tư vấn theo nhu cầu" : "Giải pháp phù hợp với định hướng thương hiệu";
  if (/^(P|DIV|SPAN)$/.test(tag)) {
    if (text.length <= 28) return "Bio-A Group";
    if (text.length <= 70) return "Giải pháp theo nhu cầu thương hiệu";
    return bodyFallbacks[counters.body++ % bodyFallbacks.length];
  }
  return bodyFallbacks[counters.body++ % bodyFallbacks.length];
}

function brandLogoSvg(){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="129" height="44" viewBox="0 0 129 44"><rect width="129" height="44" rx="3" fill="transparent"/><text x="0" y="28" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="700" fill="#0B4E31">BIO-A</text><text x="58" y="28" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="700" fill="#106E45">GROUP</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function localize($, route){
  const title = pageTitle(route);
  const counters = {heading:0, body:0, review:0};

  $("html").attr("lang", "vi");
  $("title").text(`${title} | Bio-A Group`);
  $('meta[name="description"]').attr("content", "Bio-A Group cung cấp giải pháp phát triển và gia công sản phẩm theo yêu cầu thương hiệu.");
  $('meta[property="og:title"],meta[name="twitter:title"]').attr("content", `${title} | Bio-A Group`);
  $('meta[property="og:description"],meta[name="twitter:description"]').attr("content", "Giải pháp phát triển sản phẩm và gia công theo yêu cầu thương hiệu.");
  $('meta[property="og:site_name"]').attr("content", "Bio-A Group");

  $("script").each((_, el) => {
    const src = ($(el).attr("src") || "").toLowerCase();
    const body = ($(el).html() || "").toLowerCase();
    if (/dashly\.app|yandex|mc\.yandex|googletagmanager\.com|google-analytics\.com/.test(src) ||
        /dashly\.connect\(|gtm-ndkp5rxk|ym\(/.test(body)) {
      $(el).remove();
    }
  });
  $("noscript").each((_,el)=>{
    if (/googletagmanager|yandex/i.test($.html(el))) $(el).remove();
  });

  $("head").append(`<style id="bioa-v2-safe">
    html{overflow-x:hidden}
    body{overflow-x:hidden}
    .review__text,.text-large,.text,.item__text{overflow-wrap:break-word;word-break:normal}
    .swiper,.swiper-wrapper,.swiper-slide{max-width:100%}
  </style>`);

  const logo = brandLogoSvg();
  $('img[alt*="Merywood" i], img[src*="logo.svg"], img[src*="logo_white"], img[src*="merrywood_"]').each((_,el)=>{
    $(el).attr("src", logo).attr("alt", "Bio-A Group");
    $(el).removeAttr("srcset");
  });

  $("a").each((_,el)=>{
    const a = $(el);
    let href = a.attr("href") || "";
    if (/^https?:\/\/(www\.)?merywood\.com/i.test(href)) {
      href = href.replace(/^https?:\/\/(www\.)?merywood\.com/i, "") || "/";
      a.attr("href", href);
    }
    if (/mailto:/i.test(href) || /info@merywood\.com|\[email protected\]/i.test(a.text())) {
      a.attr("href", `mailto:${company.email}`);
    }
    if (/whatsapp|wa\.me/i.test(href)) {
      a.attr("href", `mailto:${company.email}`).removeAttr("target");
    }
  });

  $("body *").contents().each((_,node)=>{
    if (node.type !== "text") return;
    const parent = $(node).parent();
    const tag = parent[0]?.tagName || "";
    if (["SCRIPT","STYLE","NOSCRIPT","SVG","CODE","PRE"].includes(tag)) return;
    const original = node.data;
    const text = clean(original);
    if (!text) return;
    const classes = [parent.attr("class") || "", parent.parent().attr("class") || ""].join(" ");
    const translated = translateText(text, tag, classes, route, counters);
    const lead = (original.match(/^\s*/) || [""])[0];
    const trail = (original.match(/\s*$/) || [""])[0];
    node.data = lead + translated + trail;
  });

  $("[placeholder]").each((_,el)=>{
    const x=$(el), t=x.attr("placeholder")||"";
    x.attr("placeholder", english.test(t) ? "Nhập thông tin" : t.replace(/Merywood/gi,"Bio-A Group"));
  });
  $("[aria-label]").each((_,el)=>{
    const x=$(el), t=x.attr("aria-label")||"";
    if (/cookie consent banner/i.test(t)) x.attr("aria-label","Thông báo cookie");
    else if (/cookie settings/i.test(t)) x.attr("aria-label","Cài đặt cookie");
    else if (/close preferences/i.test(t)) x.attr("aria-label","Đóng tùy chọn");
    else x.attr("aria-label", t.replace(/Merywood/gi,"Bio-A Group").replace(/WhatsApp/gi,"tư vấn"));
  });

  if(route === "/"){
    const stats = [
      ["2.000+", "Mẫu R&D"],
      ["5+", "Năm kinh nghiệm"],
      ["10.000.000", "Sản phẩm / năm"],
      ["1.000 m²", "Quy mô nhà máy"],
      ["OEM/ODM", "Gia công trọn gói"]
    ];
    $(".info .list").each((_,list)=>{
      $(list).find(".item").each((i,item)=>{
        if(!stats[i]) return;
        $(item).find(".item__number").text(stats[i][0]);
        $(item).find(".item__text").text(stats[i][1]);
      });
    });
  }

  $("form").attr("action", "#");
  $("body").append(`<script id="bioa-preview-form">document.querySelectorAll('form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();alert('Form đang ở chế độ xem thử. Vui lòng liên hệ Bio-A Group qua email ${company.email}.')})});</script>`);
}

async function buildOne(route,sourceRoute){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),20000);
  let raw;
  try{
    const res=await fetch(BASE+sourceRoute,{headers:{"user-agent":"BioAGroupPreviewBuilder/3.2"},signal:controller.signal});
    if(!res.ok)throw new Error(`${sourceRoute} -> HTTP ${res.status}`);
    raw=await res.text();
  }finally{
    clearTimeout(timer);
  }

  for(const lang of ["vi","en"]){
    const $=load(raw,{decodeEntities:false});
    applyFinalFixes($,route,lang);
    if(route==="/"){
      applyHomeRefinement($,route,lang);
    }else{
      if(route==="/about/")applyAboutRefinement($,route,lang);
      if(route==="/contract-manufacturing-cosmetics/")applyCosmeticsHubRefinement($,route,lang);
      if(route==="/dich-vu-khac/")applyOtherServicesRefinement($,route,lang);
      if(route==="/contacts/")applyContactsRefinement($,route,lang);
      if(route==="/blog/"||route.startsWith("/blog/"))applyBlogRefinement($,route,lang);
      applySharedShell($,route,lang);
    }

    const targetRoute=localPath(route,lang);
    const target=targetRoute==="/" ? path.join(OUT,"index.html") : path.join(OUT,targetRoute,"index.html");
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.writeFile(target,$.html());
    console.log("built",lang,targetRoute);
  }
}

async function build(){
  const started=Date.now();
  await fs.rm(OUT,{recursive:true,force:true});
  await fs.mkdir(OUT,{recursive:true});

  const batchSize=4;
  for(let i=0;i<routeDefs.length;i+=batchSize){
    const batch=routeDefs.slice(i,i+batchSize);
    await Promise.all(batch.map(([route,sourceRoute])=>buildOne(route,sourceRoute)));
  }

  await fs.cp("assets",path.join(OUT,"assets"),{recursive:true});
  await fs.writeFile(path.join(OUT,"_headers"),"/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n");
  await fs.writeFile(path.join(OUT,"robots.txt"),"User-agent: *\nAllow: /\nSitemap: https://bioagroup.vn/sitemap.xml\n");
  console.log("build complete in",Date.now()-started,"ms");
}
build().catch(e=>{console.error("BUILD FAILED:", e);process.exit(1)});