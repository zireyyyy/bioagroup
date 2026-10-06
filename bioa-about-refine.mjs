import { localPath } from "./bioa-transform.mjs";

/*
 * ABOUT-A1 — Bio-A Group About page content owner.
 *
 * Visual/runtime authority:
 *   owner-supplied Merywood pages/about/index.html
 *
 * Content authority:
 *   owner-supplied BIOA-Website.zip -> cms/pages/about.php
 *   plus owner-confirmed Home/company facts for stats and service taxonomy.
 *
 * This module intentionally edits copy, links and accessibility text only.
 * It does not rebuild Merywood About section geometry or slider mechanics.
 */

function text(root, selector, value){
  const node=root.find(selector).first();
  if(node.length)node.text(value);
}

function setDirectParagraphs(root, selector, values){
  root.find(selector).each((i,el)=>{
    if(values[i]!=null)root(el).text(values[i]);
  });
}

function setAboutHero($,lang){
  const vi=lang==="vi";
  const hero=$(".mwa-hero").first();
  if(!hero.length)return;

  text(hero,".mwa-hero__title",vi?"Về Bio-A Group":"About Bio-A Group");
  text(hero,".mwa-hero__lead",vi
    ?"Bio-A Group là nhà máy sản xuất dược mỹ phẩm OEM/ODM tại Việt Nam, đồng hành cùng thương hiệu từ nghiên cứu công thức, lựa chọn nguyên liệu đến sản xuất, bao bì và hoàn thiện sản phẩm."
    :"Bio-A Group is a cosmetic and cosmeceutical OEM/ODM manufacturer in Vietnam, supporting brands from formula research and ingredient selection through production, packaging and finished products.");
  text(hero,".btn__text",vi?"Nhận Tư Vấn":"Get a Quote");

  const stats=vi?[
    ["2.000+","Mẫu R&D"],
    ["5+","Năm kinh nghiệm"],
    ["10.000.000","Sản phẩm / năm"],
    ["1.000 m²","Quy mô nhà máy"],
    ["OEM/ODM","Gia công trọn gói"]
  ]:[
    ["2,000+","R&D samples"],
    ["5+","Years of experience"],
    ["10,000,000","Products / year"],
    ["1,000 m²","Factory scale"],
    ["OEM/ODM","Full-service manufacturing"]
  ];

  hero.find(".mwa-stat").each((i,el)=>{
    const d=stats[i];
    if(!d)return;
    const card=$(el);
    card.find(".mwa-stat__n").first().text(d[0]);
    card.find(".mwa-stat__l").first().text(d[1]);
  });
  hero.find("img").first().attr("alt",vi?"Nhà máy và năng lực Bio-A Group":"Bio-A Group manufacturing capabilities");
}

function setAboutStory($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-story").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Câu Chuyện Bio-A":"The Bio-A Story");
  text(sec,".mwa-sec__sub",vi?"Đồng Hành Từ Ý Tưởng Đến Thành Phẩm":"From Idea to Finished Product");

  const paragraphs=vi?[
    "Bio-A Group phát triển với định hướng trở thành đối tác sản xuất dược mỹ phẩm OEM/ODM đồng hành lâu dài cùng các thương hiệu. Quy trình tập trung vào R&D công thức, lựa chọn nguyên liệu, kiểm soát sản xuất và khả năng triển khai thực tế của từng dự án.",
    "Tầm nhìn của Bio-A Group là trở thành nhà sản xuất dược mỹ phẩm OEM/ODM hàng đầu khu vực Đông Nam Á, đồng hành cùng các thương hiệu Việt xây dựng sản phẩm chất lượng và mở rộng thị trường.",
    "Sứ mệnh của chúng tôi là nâng tầm thương hiệu Việt bằng các sản phẩm dược mỹ phẩm chất lượng, phương án sản xuất phù hợp và sự hỗ trợ xuyên suốt từ ý tưởng đến thành phẩm."
  ]:[
    "Bio-A Group is built around long-term OEM/ODM partnerships with cosmetic and cosmeceutical brands. Our process connects formulation R&D, ingredient selection, production control and the practical requirements of bringing each project into manufacturing.",
    "Our vision is to become a leading cosmetic and cosmeceutical OEM/ODM manufacturer in Southeast Asia, helping Vietnamese brands build quality products and expand into new markets.",
    "Our mission is to strengthen Vietnamese brands through quality products, practical manufacturing solutions and end-to-end support from the first idea to the finished product."
  ];

  const plain=sec.find(".mwa-story__text > p").not(".mwa-sec__sub");
  plain.each((i,el)=>{ if(paragraphs[i]!=null)$(el).text(paragraphs[i]); });

  text(sec,".mwa-note p",vi
    ?"Bio-A Group đặt mục tiêu xây dựng quan hệ hợp tác minh bạch, bảo vệ định hướng sản phẩm của khách hàng và cùng tối ưu dự án theo từng giai đoạn."
    :"Bio-A Group aims to build transparent partnerships, protect each client's product direction and optimize the project together at every stage.");
}

function setAboutValues($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-values").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Giá Trị Cốt Lõi":"Our Core Values");
  text(sec,".mwa-sec__sub",vi?"Những Nguyên Tắc Chúng Tôi Theo Đuổi":"The Principles We Work By");

  const values=vi?[
    ["Chất Lượng Là Nền Tảng","Mỗi dự án được theo dõi từ mẫu thử đến thành phẩm với mục tiêu duy trì chất lượng ổn định và phù hợp định hướng thương hiệu."],
    ["An Toàn & Tuân Thủ","Bio-A Group chú trọng quy trình sản xuất, hồ sơ và các tiêu chuẩn liên quan; nội dung nguồn Bio-A ghi nhận năng lực GMP và HACCP."],
    ["Minh Bạch & Đồng Hành","Thông tin dự án, tiến độ và các bước cần hoàn thiện được trao đổi rõ ràng để khách hàng chủ động trong suốt quá trình triển khai."],
    ["Linh Hoạt Theo Dự Án","Giải pháp được điều chỉnh theo nhóm sản phẩm, định vị thương hiệu, quy mô và yêu cầu phát triển riêng của từng khách hàng."],
    ["Am Hiểu Thị Trường","Đội ngũ phối hợp giữa R&D, sản xuất và tư vấn để cân bằng ý tưởng sản phẩm với tính khả thi khi đưa vào sản xuất thực tế."],
    ["Đổi Mới & R&D","Bio-A Group liên tục phát triển công thức, thử nghiệm mẫu và cập nhật giải pháp nhằm hỗ trợ thương hiệu tạo sản phẩm khác biệt."]
  ]:[
    ["Quality First","Each project is followed from samples to finished goods with the goal of maintaining consistent quality and alignment with the brand direction."],
    ["Safety & Compliance","Bio-A Group focuses on manufacturing processes, documentation and relevant standards; the legacy Bio-A source records GMP and HACCP capabilities."],
    ["Transparency & Partnership","Project information, timelines and required steps are communicated clearly so clients stay informed throughout development."],
    ["Project Flexibility","Solutions are adapted to product category, brand positioning, scale and the specific development requirements of each client."],
    ["Market Understanding","R&D, manufacturing and consulting teams work together to balance product ideas with practical production feasibility."],
    ["Innovation & R&D","Bio-A Group continuously develops formulas, samples and solutions to help brands create differentiated products."]
  ];

  sec.find(".mwa-vcard").each((i,el)=>{
    const d=values[i];
    if(!d)return;
    const card=$(el);
    card.find(".mwa-vcard__title").first().text(d[0]);
    card.children("p").first().text(d[1]);
  });
}

function setAboutTeam($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-team").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Đội Ngũ Đồng Hành Cùng Sản Phẩm":"The Team Behind Your Product");
  text(sec,".mwa-team__title",vi?"Phối Hợp Từ R&D Đến Sản Xuất":"Working Together From R&D to Production");

  const paragraphs=vi?[
    "Đằng sau mỗi công thức là sự phối hợp giữa R&D, sản xuất, kiểm soát chất lượng và đội ngũ tư vấn. Mục tiêu là giúp dự án đi từ yêu cầu ban đầu đến mẫu thử, bao bì và kế hoạch sản xuất với thông tin rõ ràng ở từng bước.",
    "Bio-A Group tiếp tục phát triển đội ngũ và chào đón những ứng viên muốn đồng hành trong lĩnh vực dược mỹ phẩm và sản xuất thương hiệu riêng."
  ]:[
    "Behind every formula is collaboration across R&D, manufacturing, quality control and client consulting. The goal is to move each project from the initial brief through samples, packaging and production planning with clear information at every step.",
    "Bio-A Group continues to grow its team and welcomes people who want to build their careers in cosmetic, cosmeceutical and private-label manufacturing."
  ];

  sec.find(".mwa-team__card > p").each((i,el)=>{if(paragraphs[i]!=null)$(el).text(paragraphs[i]);});
  const btn=sec.find(".mwa-team__btn").first();
  if(btn.length){
    btn.attr("href",localPath("/careers/",lang));
    btn.find(".btn__text").text(vi?"Xem Cơ Hội Tuyển Dụng":"See Open Roles");
  }
  sec.find(".mwa-team__media img").attr("alt",vi?"Đội ngũ Bio-A Group":"Bio-A Group team");
}

function setAboutActivity($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-expo").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Hoạt Động & Kết Nối":"Industry Activity & Connections");
  text(sec,".mwa-sec__sub",vi?"Cập Nhật Xu Hướng Ngành":"Staying Close to Industry Trends");
  text(sec,".mwa-lede",vi
    ?"Bio-A Group chủ động cập nhật xu hướng dược mỹ phẩm, công nghệ sản xuất, nguyên liệu và nhu cầu thị trường để hỗ trợ khách hàng phát triển sản phẩm phù hợp hơn."
    :"Bio-A Group follows cosmetic and cosmeceutical trends, manufacturing technologies, ingredients and market needs to support more relevant product development.");

  const tabs=vi?["Nghiên Cứu & Phát Triển","Sản Xuất","Thị Trường"]:["Research & Development","Manufacturing","Market Insights"];
  sec.find(".mwa-evt").each((i,el)=>{if(tabs[i])$(el).text(tabs[i]);});
  sec.find('[aria-label="Previous"]').attr("aria-label",vi?"Trước":"Previous");
  sec.find('[aria-label="Next"]').attr("aria-label",vi?"Tiếp":"Next");
}

const aboutProductIcons = [
  /* 01 Makeup — lipstick tube, adapted to the reference beauty/cosmetics outline language */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M9.2 11.2h5.6v8.3H9.2z"/><path d="M10.1 11.2V7.1l3.8-2.4v6.5"/><path d="M10.1 7.1h3.8"/><path d="M9.2 15.6h5.6"/></g></svg>',
  /* 02 Hair care — conditioner bottle */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M10.1 3.6h3.8"/><path d="M10.6 3.6v2.6h2.8V3.6"/><path d="M9 8.3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/><path d="M10.4 11.5c1.1-.8 2.1-.8 3.2 0"/><path d="M10.5 14.2h3"/></g></svg>',
  /* 03 Body care — body lotion pump bottle */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.2V3h3.6"/><path d="M14.6 3H17v1.8"/><path d="M10 7.4h5"/><path d="M9 9.3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v8.8a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z"/><path d="M12.5 11.3c-1.2 1.4-1.7 2.2-1.7 3a1.7 1.7 0 0 0 3.4 0c0-.8-.5-1.6-1.7-3z"/></g></svg>',
  /* 04 Facial skin care — face serum/dropper bottle */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M10.2 3.2h3.6"/><path d="M10.7 3.2v3.3h2.6V3.2"/><path d="M9.5 8.5h5"/><path d="M8.8 10.4a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v7.4a2 2 0 0 1-2 2h-2.4a2 2 0 0 1-2-2z"/><path d="M12 12.6c1 1 1.6 1.9 1.6 2.7a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.7 1.6-2.7z"/></g></svg>',
  /* 05 Personal care — hand cream tube */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M9.3 5.6h5.4l1 10.7a2 2 0 0 1-2 2.2h-3.4a2 2 0 0 1-2-2.2z"/><path d="M9.9 5.6 9.4 3.5h5.2l-.5 2.1"/><path d="M10.6 10.6h2.8"/><path d="M12 9.2V12"/></g></svg>',
  /* 06 Mother & baby — baby bottle */
  '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M10.2 5V4.2a1.8 1.8 0 0 1 3.6 0V5"/><path d="M10 5h4"/><path d="M10.2 7.3c-.9.8-1.4 1.9-1.4 3.1v7.4a2 2 0 0 0 2 2h2.4a2 2 0 0 0 2-2v-7.4c0-1.2-.5-2.3-1.4-3.1"/><path d="M10.7 11h2.6"/><path d="M10.7 14h2.6"/></g></svg>'
];


function setAboutProducts($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-produce").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Danh Mục Gia Công":"Manufacturing Categories");
  text(sec,".mwa-sec__sub",vi?"Một Đối Tác, Nhiều Dòng Sản Phẩm":"One Partner, Multiple Product Lines");
  text(sec,".mwa-lede",vi
    ?"Bio-A Group phát triển các nhóm sản phẩm dược mỹ phẩm theo công thức có sẵn hoặc định hướng riêng của thương hiệu."
    :"Bio-A Group develops cosmetic and cosmeceutical product lines using ready-formula or brand-specific development approaches.");

  const products=vi?[
    ["Sản Phẩm Trang Điểm","Các dòng trang điểm được phát triển theo màu sắc, kết cấu và định vị thương hiệu.",[["Xem Dòng Trang Điểm","/gia-cong-my-pham-trang-diem/"]]],
    ["Sản Phẩm Chăm Sóc Tóc","Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc theo yêu cầu.",[["Xem Dòng Chăm Sóc Tóc","/gia-cong-my-pham-toc/"]]],
    ["Sản Phẩm Chăm Sóc Body","Sữa tắm, lotion, tẩy tế bào chết và các dòng chăm sóc cơ thể.",[["Xem Dòng Chăm Sóc Body","/gia-cong-my-pham-cham-soc-body/"]]],
    ["Sản Phẩm Chăm Sóc Da Mặt","Kem, serum, gel, mặt nạ và các dòng chăm sóc da theo định hướng thương hiệu.",[["Xem Dòng Chăm Sóc Da","/gia-cong-my-cham-soc-da-mat/"]]],
    ["Sản Phẩm Cá Nhân","Các dòng chăm sóc cá nhân được phát triển theo nhu cầu sử dụng và kênh bán.",[["Xem Dòng Cá Nhân","/gia-cong-my-pham-ca-nhan/"]]],
    ["Sản Phẩm Mẹ & Bé","Nhóm sản phẩm chăm sóc mẹ và bé với định hướng công thức phù hợp từng dự án.",[["Xem Dòng Mẹ & Bé","/gia-cong-san-pham-me-be/"]]]
  ]:[
    ["Makeup Products","Makeup lines developed around color, texture and brand positioning.",[["Explore Makeup","/gia-cong-my-pham-trang-diem/"]]],
    ["Hair Care Products","Shampoo, conditioner, treatments and hair-care solutions developed to your brief.",[["Explore Hair Care","/gia-cong-my-pham-toc/"]]],
    ["Body Care Products","Body wash, lotions, scrubs and other body-care formats.",[["Explore Body Care","/gia-cong-my-pham-cham-soc-body/"]]],
    ["Facial Skin Care","Creams, serums, gels, masks and facial-care lines aligned with your brand direction.",[["Explore Skin Care","/gia-cong-my-cham-soc-da-mat/"]]],
    ["Personal Care Products","Personal-care lines developed for specific usage needs and sales channels.",[["Explore Personal Care","/gia-cong-my-pham-ca-nhan/"]]],
    ["Mother & Baby Products","Mother-and-baby care products with formulation direction tailored to each project.",[["Explore Mother & Baby","/gia-cong-san-pham-me-be/"]]]
  ];

  sec.find(".mwa-pcard").each((i,el)=>{
    const d=products[i];
    if(!d)return;
    const card=$(el);
    const icon=aboutProductIcons[i];
    if(icon)card.find(".mwa-isq").first().html(icon);
    card.find("h3").first().text(d[0]);
    card.children("p").first().text(d[1]);
    const links=card.find(".mwa-links").first();
    if(links.length){
      links.empty();
      d[2].forEach(([label,href])=>{
        links.append('<a class="mwa-pill" href="'+localPath(href,lang)+'">'+label+'</a>');
      });
    }
  });
}

function setAboutProcess($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-how").first();
  if(!sec.length)return;

  text(sec,".mwa-sec__title",vi?"Quy Trình Hợp Tác":"How We Work");
  text(sec,".mwa-sec__sub",vi?"Từ Ý Tưởng Đến Thành Phẩm":"From Idea to Finished Product");

  const steps=vi?[
    ["Tư Vấn & Lập Kế Hoạch","Làm rõ ý tưởng, nhóm sản phẩm, khách hàng mục tiêu, ngân sách và tiến độ để xác định lộ trình phát triển phù hợp."],
    ["Nghiên Cứu & Phát Triển","Đội ngũ R&D lựa chọn hướng công thức, nguyên liệu, làm mẫu thử và tinh chỉnh theo phản hồi của dự án."],
    ["Bao Bì & Nhận Diện","Phối hợp lựa chọn chai lọ, quy cách đóng gói, nhãn và các yếu tố nhận diện phù hợp với đặc tính sản phẩm."],
    ["Hỗ Trợ Hồ Sơ","Rà soát thông tin sản phẩm, nội dung nhãn và các hạng mục hồ sơ cần thiết theo từng nhóm hàng."],
    ["Sản Xuất & Bàn Giao","Triển khai sản xuất, sang chiết, đóng gói, kiểm soát thành phẩm và bàn giao theo kế hoạch đã thống nhất."]
  ]:[
    ["Consultation & Planning","Clarify the product idea, target customer, budget and timeline to define a practical development roadmap."],
    ["Research & Development","Our R&D team selects formula directions and ingredients, prepares samples and refines them based on project feedback."],
    ["Packaging & Branding","Coordinate bottles, filling formats, labels and brand elements around the product's characteristics."],
    ["Documentation Support","Review product information, label content and the documentation required for each product category."],
    ["Production & Delivery","Manufacture, fill, pack, control finished goods and deliver according to the agreed production plan."]
  ];

  sec.find(".mwa-tl__row").each((i,el)=>{
    const d=steps[i];
    if(!d)return;
    const row=$(el);
    row.find(".mwa-tl__title").first().text(d[0]);
    row.find(".mwa-tl__body > p").first().text(d[1]);
  });
}

function setAboutCta($,lang){
  const vi=lang==="vi";
  const sec=$(".mwa-cta-wrap").first();
  if(!sec.length)return;

  text(sec,".mwa-cta__title",vi?"Sẵn Sàng Phát Triển Sản Phẩm Cùng Bio-A Group?":"Ready to Develop Your Product With Bio-A Group?");
  text(sec,".mwa-cta__text",vi
    ?"Chia sẻ ý tưởng, nhóm sản phẩm và mục tiêu dự án để đội ngũ Bio-A Group tư vấn lộ trình phù hợp."
    :"Share your product idea and project goals so the Bio-A Group team can recommend a suitable development path.");
  text(sec,".mwa-cta__btn .btn__text",vi?"Nhận Tư Vấn":"Get Started");
  text(sec,".mwa-cta__fine",vi
    ?"Trao đổi nhanh về công thức, MOQ, bao bì và tiến độ dự kiến."
    :"A quick discussion about formula, MOQ, packaging and expected timeline.");

  /* ABOUT-CTA-LOGO1 — replace Merywood decorative logo only; preserve CTA geometry. */
  sec.find(".mwa-cta__media")
    .css("background-image","url('/assets/bioa-full.svg')")
    .attr("role","img")
    .attr("aria-label",vi?"Logo Bio-A Group":"Bio-A Group logo");
}

export function applyAboutRefinement($,route,lang){
  if(route!=="/about/")return;

  setAboutHero($,lang);
  setAboutStory($,lang);
  setAboutValues($,lang);
  setAboutTeam($,lang);
  setAboutActivity($,lang);
  setAboutProducts($,lang);
  setAboutProcess($,lang);
  setAboutCta($,lang);

  const vi=lang==="vi";
  const description=vi
    ?"Tìm hiểu Bio-A Group, định hướng OEM/ODM dược mỹ phẩm, tầm nhìn, sứ mệnh, đội ngũ R&D, năng lực sản xuất và quy trình đồng hành cùng thương hiệu."
    :"Learn about Bio-A Group, our cosmetic and cosmeceutical OEM/ODM direction, vision, mission, R&D team, manufacturing capabilities and brand partnership process.";
  $("meta[name='description'],meta[property='og:description'],meta[name='twitter:description']").attr("content",description);
}
