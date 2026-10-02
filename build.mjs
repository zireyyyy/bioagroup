import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const BASE = "https://merywood.com";
const OUT = "dist";

const routes = [
  "/", "/about/", "/contacts/", "/careers/", "/careers/b2b-sales-manager/",
  "/careers/regulatory-affairs-specialist-eu/", "/cookie-policy/", "/privacy-policy/",
  "/contract-manufacturing-cosmetics/", "/white-label-cosmetics/", "/private-label-cosmetics/",
  "/hotel-spa-cosmetics/", "/contract-manufacturing-supplements/", "/white-label-supplements/",
  "/private-label-supplements/", "/sports-nutrition/", "/pet-supplement-manufacturer/",
  "/weight-loss/", "/male-enhancement/", "/diabet/", "/vitamin-d-private-label/",
  "/vitamin-b12-private-label/", "/vitamin-a-manufacturer/", "/vitamin-b2-production/",
  "/vitamin-c-manufacturer/", "/vitamin-k-manufacturer/", "/vitamin-e-manufacturer/",
  "/omega-3-private-label/", "/probiotics-private-label/", "/blog/",
  "/blog/ascorbic-acid-production/", "/blog/best-fulfillment-for-cosmetics-and-supplements/",
  "/blog/collagen-supplements-manufacturing/", "/blog/cosmetic-manufacturing-process/",
  "/blog/dog-supplement-formats/", "/blog/how-fish-oil-is-made/",
  "/blog/how-is-protein-powder-manufactured/", "/blog/how-peptides-are-made/",
  "/blog/how-sunscreen-is-made/", "/blog/how-to-choose-supplement-fulfillment-provider/",
  "/blog/how-to-start-supplement-company-europe/", "/blog/how-to-start-your-own-skincare-line/",
  "/blog/sunscreen-business/", "/blog/supplement-trends-2026/",
  "/blog/trending-skincare-products-2026/", "/blog/vitamins-bones-joints/",
  "/blog/what-affects-moq-in-supplement-manufacturing/", "/blog/what-is-haccp/",
  "/blog/what-is-inci/", "/blog/what-is-microbiome-skincare/",
  "/blog/white-label-vs-private-label/", "/blog/page/2/", "/blog/page/3/", "/blog/page/4/"
];

const company = {
  name: "Bio-A Group",
  phone: "0779 399 379",
  phoneRaw: "0779399379",
  email: "bioagroupsale@gmail.com",
  address: "496/63/10H Đường Dương Quảng Hàm, P. An Nhơn, TP. Hồ Chí Minh"
};

const profiles = {
  "/": ["Nhà máy sản xuất & gia công dược mỹ phẩm Bio-A Group", "Đồng hành xây dựng thương hiệu mỹ phẩm riêng từ nghiên cứu công thức, sản xuất OEM/ODM, thiết kế bao bì đến hồ sơ công bố."],
  "/about/": ["Về Bio-A Group", "Bio-A Group là đơn vị sản xuất, gia công, nghiên cứu và phát triển mỹ phẩm theo mô hình OEM/ODM tại Việt Nam."],
  "/contacts/": ["Liên hệ Bio-A Group", "Tư vấn gia công mỹ phẩm và phát triển thương hiệu. Hotline 0779 399 379."],
  "/careers/": ["Tuyển dụng Bio-A Group", "Cơ hội nghề nghiệp trong môi trường sản xuất, R&D và kinh doanh dược mỹ phẩm chuyên nghiệp."],
  "/contract-manufacturing-cosmetics/": ["Sản xuất & gia công dược mỹ phẩm OEM/ODM", "Giải pháp gia công trọn gói từ ý tưởng, công thức, mẫu thử, sản xuất đến đóng gói thành phẩm."],
  "/white-label-cosmetics/": ["Gia công mỹ phẩm công thức có sẵn", "Rút ngắn thời gian ra mắt với hệ công thức nền đã được nghiên cứu và tối ưu tại Bio-A Group."],
  "/private-label-cosmetics/": ["Gia công mỹ phẩm độc quyền", "Phát triển công thức riêng, nhận diện riêng và lộ trình sản xuất phù hợp định vị thương hiệu."],
  "/hotel-spa-cosmetics/": ["Gia công mỹ phẩm cho Spa & khách sạn", "Phát triển bộ sản phẩm chăm sóc da, body và amenities theo nhu cầu vận hành thực tế."],
  "/contract-manufacturing-supplements/": ["Gia công sản phẩm chăm sóc sức khỏe", "Tư vấn phát triển sản phẩm theo định hướng thương hiệu và quy trình kiểm soát chất lượng."],
  "/sports-nutrition/": ["Gia công sản phẩm dinh dưỡng & vận động", "Giải pháp sản phẩm cho nhóm khách hàng năng động với định hướng công thức và bao bì riêng."],
  "/pet-supplement-manufacturer/": ["Gia công sản phẩm chăm sóc thú cưng", "Phát triển sản phẩm chăm sóc thú cưng theo yêu cầu thương hiệu và quy mô kinh doanh."],
  "/blog/": ["Kiến thức & xu hướng ngành mỹ phẩm", "Chia sẻ kiến thức gia công, công thức, bao bì, pháp lý và kinh nghiệm phát triển thương hiệu mỹ phẩm."],
  "/privacy-policy/": ["Chính sách bảo mật", "Bio-A Group tôn trọng quyền riêng tư và bảo vệ thông tin khách hàng theo quy định hiện hành."],
  "/cookie-policy/": ["Chính sách cookie", "Thông tin về cách website sử dụng cookie để cải thiện trải nghiệm người dùng."]
};

const exact = {
  "Supplements":"Dịch vụ","Cosmetics":"Sản phẩm","CPA Offers":"Năng lực","For Pets":"Danh mục","Blog":"Kiến thức",
  "Get started":"Nhận tư vấn","← Back":"← Quay lại","Weight loss":"Chăm sóc vóc dáng","Male Enhancement":"Chăm sóc nam giới",
  "Diabet":"Chăm sóc chuyên biệt","Contract Manufacturing":"Gia công trọn gói","Contract manufacturing":"Gia công trọn gói",
  "White Label":"Công thức có sẵn","White label":"Công thức có sẵn","Private Label":"Công thức độc quyền","Private label":"Công thức độc quyền",
  "Sports Nutrition":"Dinh dưỡng & vận động","Pet Supplements":"Chăm sóc thú cưng","Pet supplement":"Chăm sóc thú cưng",
  "Vitamins":"Dòng hoạt chất","For Hotels & SPA":"Spa & khách sạn","Company":"Công ty","Contacts":"Liên hệ","Careers":"Tuyển dụng",
  "About Merywood":"Về Bio-A Group","Cookie Policy":"Chính sách Cookie","Privacy Policy":"Chính sách bảo mật","Home":"Trang chủ",
  "Accept all":"Đồng ý tất cả","Reject all":"Từ chối tất cả","View preferences":"Tùy chọn","Manage Consent":"Quản lý cookie",
  "Preferences":"Tùy chọn cookie","Functional":"Cookie chức năng","Always active":"Luôn hoạt động","Statistics (Analytics)":"Thống kê (Analytics)",
  "Marketing":"Tiếp thị","Ads/Remarketing":"Quảng cáo/Tiếp thị lại","Save preferences":"Lưu tùy chọn",
  "Product Type":"Loại sản phẩm","Food Supplements":"Sản phẩm chăm sóc sức khỏe","Sport nutrition":"Dinh dưỡng & vận động","No idea now":"Cần Bio-A tư vấn",
  "Product Quantity":"Số lượng dự kiến","Get In Touch with Merywood":"Liên hệ Bio-A Group","Contact Us":"Liên hệ tư vấn",
  "Read more":"Xem thêm","Show more":"Xem thêm","FAQ":"Câu hỏi thường gặp","Features":"Đặc điểm nổi bật","Key Features":"Đặc điểm chính",
  "Manufacturing":"Sản xuất","Production":"Sản xuất","Custom Formulation":"Phát triển công thức","Packaging":"Bao bì",
  "Regulatory Support":"Hỗ trợ hồ sơ","Regulatory compliance":"Tuân thủ quy định","Quality management":"Quản lý chất lượng",
  "Our certificates":"Chứng nhận & năng lực","How It Works":"Quy trình hợp tác","How it works":"Quy trình hợp tác",
  "Consultation & Planning":"Tư vấn & lập kế hoạch","Research & Development":"Nghiên cứu & phát triển",
  "Label Printing & Branding Support":"Thiết kế nhãn & hỗ trợ thương hiệu","Production & Logistics":"Sản xuất & bàn giao",
  "Previous article":"Bài trước","Next article":"Bài tiếp theo","Share":"Chia sẻ","By":"Bởi",
  "What Our Clients Say":"Khách hàng nói gì","The Right Choice For":"Giải pháp phù hợp cho","Retailers":"Nhà phân phối & bán lẻ",
  "Entrepreneurs":"Chủ thương hiệu","Product formats":"Dạng sản phẩm","Formats & Packaging":"Dạng sản phẩm & bao bì",
  "Capsules":"Viên nang","Tablets":"Viên nén","Gummies":"Kẹo dẻo","Powders":"Dạng bột","Sprays":"Dạng xịt","Gels":"Dạng gel",
  "Serums":"Serum","Balms":"Dạng sáp","Drops":"Dạng nhỏ giọt","Softgels":"Viên nang mềm","Shots":"Dạng shot",
  "Why Choose Us":"Vì sao chọn Bio-A Group","We Produce":"Danh mục sản xuất","Customers Achieve with Merywood":"Giá trị khách hàng nhận được",
  "The Right Choice For":"Giải pháp phù hợp cho","From Idea to Launch — A Full-Cycle Partnership":"Từ ý tưởng đến sản phẩm hoàn thiện",
  "Collaborate & Plan":"Trao đổi & lập kế hoạch","Develop & Refine":"R&D & hoàn thiện công thức","Print & Brand":"Thiết kế & xây dựng thương hiệu",
  "Ensure Compliance":"Hoàn thiện hồ sơ","Produce & Deliver":"Sản xuất & bàn giao",
  "Tailored Solutions":"Giải pháp theo yêu cầu","Multi-Brand Labeling":"Phát triển thương hiệu riêng","EU Certification":"Kiểm soát tiêu chuẩn",
  "100% Quality":"Cam kết chất lượng","Let's discuss your idea":"Trao đổi ý tưởng cùng Bio-A Group","Chat on WhatsApp":"Liên hệ tư vấn",
  "Tell us your idea":"Chia sẻ ý tưởng","Conclusion":"Kết luận","Sources":"Nguồn tham khảo","On this page":"Nội dung bài viết"
};

const sections = ["Năng lực Bio-A Group","Giải pháp trọn gói","Quy trình phát triển sản phẩm","Kiểm soát chất lượng","Bao bì & nhận diện thương hiệu","Đồng hành cùng khách hàng","Câu hỏi thường gặp"];
const bodyCopy = [
  "Bio-A Group đồng hành cùng khách hàng từ giai đoạn lên ý tưởng, lựa chọn định hướng sản phẩm, nghiên cứu công thức đến sản xuất và hoàn thiện thành phẩm.",
  "Quy trình được xây dựng minh bạch, có kiểm soát ở từng công đoạn nhằm đảm bảo chất lượng ổn định và phù hợp kế hoạch phát triển thương hiệu.",
  "Đội ngũ R&D tư vấn công thức, nguyên liệu, dạng sản phẩm và mẫu thử dựa trên nhu cầu thị trường, phân khúc khách hàng và định vị thương hiệu.",
  "Bio-A Group hỗ trợ thiết kế bao bì, lựa chọn chai lọ, nhãn sản phẩm và các hạng mục nhận diện để sản phẩm sẵn sàng cho hoạt động kinh doanh.",
  "Khách hàng được tư vấn lộ trình hồ sơ, công bố và các yêu cầu liên quan trước khi triển khai sản xuất hàng loạt.",
  "Nhà máy hướng đến khả năng đáp ứng linh hoạt theo quy mô dự án, từ thương hiệu mới đến doanh nghiệp cần mở rộng danh mục sản phẩm."
];

const css = `
:root{--bioa:#106E45;--bioa-dark:#0B4E31;--bioa-deep:#093D26;--bioa-soft:#99D29F;--bioa-cream:#F3F0E4;--bioa-ivory:#FCFEF1}
body{color:var(--bioa-deep)!important}::selection{background:var(--bioa);color:#fff}
.btn,.button,button[type=submit],input[type=submit],.wpcf7-submit{background:var(--bioa)!important;border-color:var(--bioa)!important;color:#fff!important}
.btn:hover,.button:hover,button[type=submit]:hover{background:var(--bioa-dark)!important;border-color:var(--bioa-dark)!important}
.header__email a,.menu__email a,.footer-top__email a{color:var(--bioa)!important}
.footer-top{background:var(--bioa-deep)!important;color:var(--bioa-cream)!important}.footer-top a{color:var(--bioa-cream)!important}
.footer-bottom{background:#062c1c!important;color:#fff!important}.footer-bottom a{color:#fff!important}
.title,h1,h2,h3,.h1,.h2,.h3{color:var(--bioa-deep)}
.bioa-wordmark{font:800 20px/1 Manrope,Arial,sans-serif;color:var(--bioa)!important;letter-spacing:-.04em;text-decoration:none;white-space:nowrap}
.bioa-wordmark b{color:var(--bioa-deep)}.bioa-preview{position:fixed;z-index:999999;right:12px;bottom:12px;background:rgba(9,61,38,.94);color:#fff;padding:8px 12px;border-radius:999px;font:600 10px/1.2 Manrope,Arial,sans-serif;box-shadow:0 5px 18px rgba(0,0,0,.18);pointer-events:none}
`;

const english = /\b(the|and|with|for|your|our|we|you|from|to|of|in|is|are|this|that|product|manufactur|label|quality|support|choose|client|customer|privacy|cookie|read|contact|about|career|marketing|functional|statistics|preferences|accept|reject|manage|how|what|why|where|which|can|will|more|used|ideal|features|source|production|packaging|supplement|cosmetic)\b/i;
const clean = s => String(s||"").replace(/\s+/g," ").trim();

function profile(route){
  if (profiles[route]) return profiles[route];
  if (route.startsWith("/blog/")) return ["Kiến thức chuyên ngành mỹ phẩm","Chia sẻ kiến thức và kinh nghiệm phát triển sản phẩm, bao bì và thương hiệu từ Bio-A Group."];
  if (route.startsWith("/careers/")) return ["Cơ hội nghề nghiệp tại Bio-A Group","Tham gia đội ngũ Bio-A Group trong môi trường làm việc chuyên nghiệp và định hướng phát triển lâu dài."];
  if (route.includes("vitamin") || route.includes("omega") || route.includes("probiotics")) return ["Giải pháp phát triển sản phẩm theo yêu cầu","Tư vấn định hướng công thức, quy cách và thương hiệu phù hợp nhu cầu kinh doanh."];
  return ["Giải pháp gia công Bio-A Group","Bio-A Group tư vấn và phát triển sản phẩm theo yêu cầu thương hiệu, từ ý tưởng đến thành phẩm."];
}

function localize($, route){
  const [title, desc] = profile(route);
  $("html").attr("lang","vi");
  $("title").text(title + " | Bio-A Group");
  $('meta[name="description"]').attr("content",desc);
  $('meta[property="og:title"],meta[name="twitter:title"]').attr("content",title+" | Bio-A Group");
  $('meta[property="og:description"],meta[name="twitter:description"]').attr("content",desc);
  $('meta[property="og:site_name"]').attr("content","Bio-A Group");

  $("script").each((_,el)=>{const t=(($(el).html()||"")+" "+($(el).attr("src")||"")).toLowerCase();if(/googletagmanager|google-analytics|gtag\(|yandex|ym\(/.test(t)) $(el).remove();});
  $("noscript").each((_,el)=>{if(/googletagmanager|yandex/i.test($.html(el))) $(el).remove();});
  $('link[href*="merywood.com"]').each((_,el)=>{const h=$(el).attr("href")||"";if(!/main\.css|swiper-bundle|min\.css|styles\.css/.test(h)) $(el).remove();});

  $("head").append("<style>"+css+"</style>");
  $("form").attr("action","#").attr("method","post");

  $("a").each((_,el)=>{
    let href=$(el).attr("href")||"";
    if (/^https?:\/\/(www\.)?merywood\.com/i.test(href)) $(el).attr("href",href.replace(/^https?:\/\/(www\.)?merywood\.com/i,"")||"/");
    if (/mailto:/i.test(href) || /\[email protected\]/i.test($(el).text())) $(el).attr("href","mailto:"+company.email).text(company.email);
    if (/whatsapp|wa\.me/i.test(href)) $(el).attr("href","tel:"+company.phoneRaw);
  });

  $('img[alt*="Merywood" i], img[src*="logo.svg"], img[src*="logo_white"], img[src*="merrywood_"]').each((_,el)=>{
    const a=$(el).closest("a");
    const word='<span class="bioa-wordmark">BIO-A <b>GROUP</b></span>';
    if(a.length) a.html(word); else $(el).replaceWith(word);
  });

  let h1done=false, h=0, p=0;
  $("body *").contents().each((_,node)=>{
    if(node.type!=="text") return;
    const par=$(node).parent();
    if(["SCRIPT","STYLE","NOSCRIPT","SVG","CODE","PRE"].includes(par[0]?.tagName)) return;
    const t=clean(node.data);
    if(!t) return;
    if(exact[t]) { node.data=exact[t]; return; }
    if(/^To provide the best experiences/i.test(t)){node.data="Website sử dụng cookie cần thiết và công cụ thống kê để cải thiện trải nghiệm. Bạn có thể đồng ý, từ chối hoặc tùy chỉnh theo nhu cầu.";return;}
    if(/^I agree to the processing/i.test(t)){node.data="Tôi đồng ý để Bio-A Group xử lý thông tin đã cung cấp nhằm mục đích tư vấn và liên hệ.";return;}
    if(/^It takes 30 seconds/i.test(t)){node.data="Chỉ mất khoảng 30 giây để gửi yêu cầu tư vấn.";return;}
    if(!english.test(t)){
      if(/Merywood/i.test(t)) node.data=t.replace(/Merywood/gi,"Bio-A Group");
      return;
    }
    const tag=par[0]?.tagName||"";
    if(tag==="H1" && !h1done){node.data=title;h1done=true;return;}
    if(["H2","H3","H4"].includes(tag)){node.data=sections[h++%sections.length];return;}
    if(["BUTTON","A","LABEL","OPTION"].includes(tag) || t.length<55){
      node.data=/read|learn|view|show|more/i.test(t)?"Xem thêm":/contact|get started|discuss|message|submit|send/i.test(t)?"Nhận tư vấn":/back/i.test(t)?"Quay lại":"Bio-A Group";
      return;
    }
    node.data=bodyCopy[p++%bodyCopy.length];
  });

  $("body").append('<div class="bioa-preview">BIO-A GROUP • BẢN XEM THỬ</div>');
  $("body").append(`<script>document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();alert("Form đang ở chế độ xem thử. Vui lòng gọi 0779 399 379 hoặc email bioagroupsale@gmail.com để được tư vấn.")}));</script>`);
}

async function build(){
  await fs.rm(OUT,{recursive:true,force:true});
  await fs.mkdir(OUT,{recursive:true});
  for(const route of routes){
    const res=await fetch(BASE+route,{headers:{"user-agent":"BioAGroupPreviewBuilder/1.0"}});
    if(!res.ok) throw new Error(route+" -> HTTP "+res.status);
    const $=load(await res.text(),{decodeEntities:false});
    localize($,route);
    const target=route==="/"?path.join(OUT,"index.html"):path.join(OUT,route,"index.html");
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.writeFile(target,$.html());
    console.log("built",route);
  }
  await fs.writeFile(path.join(OUT,"_headers"),"/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n");
  await fs.writeFile(path.join(OUT,"robots.txt"),"User-agent: *\nAllow: /\n");
}
build().catch(e=>{console.error(e);process.exit(1)});
