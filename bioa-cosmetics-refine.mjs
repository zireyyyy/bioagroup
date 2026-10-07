function norm(value){
  return String(value||"").replace(/\s+/g," ").trim();
}

function replaceRules(root,rules){
  root.find("*").addBack().contents().each((_,node)=>{
    if(node.type!=="text")return;
    const raw=String(node.data||"");
    const key=norm(raw);
    if(!key)return;
    for(const [pattern,replacement] of rules){
      if(!pattern.test(key))continue;
      const lead=(raw.match(/^\s*/)||[""])[0];
      const trail=(raw.match(/\s*$/)||[""])[0];
      node.data=lead+replacement+trail;
      break;
    }
  });
}

function setInner(root,selector,value){
  const el=root.find(selector).first();
  if(!el.length)return;
  const p=el.find("p").first();
  (p.length?p:el).text(value);
}

const content={
  vi:{
    heroTitle:"Gia Công Mỹ Phẩm Trọn Gói",
    heroLead:"Bio-A Group là nhà máy sản xuất dược mỹ phẩm OEM/ODM tại Việt Nam, đạt chuẩn GMP Bộ Y Tế; đồng hành trọn gói từ ý tưởng, R&D công thức, lựa chọn nguyên liệu đến bao bì và thành phẩm.",
    categoryTitle:"Tại Sao Nên Chọn Bio-A Group?",
    categories:[
      ["Năng Lực OEM/ODM Trọn Gói","Năng lực nhà máy hỗ trợ sản xuất, sang chiết, đóng gói và hoàn thiện thành phẩm theo định hướng riêng của từng thương hiệu."],
      ["Hỗ Trợ Toàn Diện","Bio-A Group phối hợp xuyên suốt từ tư vấn ý tưởng, lựa chọn hướng triển khai đến R&D, bao bì, hồ sơ và kế hoạch sản xuất."],
      ["R&D Công Thức & Làm Mẫu","Đội ngũ R&D phát triển nền công thức, lựa chọn nguyên liệu, thực hiện mẫu thử và tinh chỉnh cảm quan theo phản hồi dự án."],
      ["Danh Mục Sản Phẩm Đa Dạng","Có thể phát triển nhiều nhóm sản phẩm từ chăm sóc da, tóc, body, trang điểm đến cá nhân và mẹ & bé."],
      ["Bao Bì & Hoàn Thiện Đồng Bộ","Phối hợp lựa chọn chai lọ, quy cách đóng gói, nhãn và các hạng mục hoàn thiện phù hợp đặc tính sản phẩm và nhận diện thương hiệu."],
      ["Linh Hoạt Theo Dự Án","Giải pháp được điều chỉnh theo định hướng công thức, quy mô, số lượng dự kiến và tiến độ của từng dự án thay vì áp dụng một lộ trình cố định."],
      ["Hồ Sơ Trọn Gói & Minh Bạch","Thông tin sản phẩm, nhãn, hồ sơ cần thiết và các mốc duyệt được phối hợp rõ ràng để thương hiệu dễ theo dõi xuyên suốt dự án."]
    ],
    scenarios:[
      ["Thương hiệu skincare mới cần phát triển một dòng sản phẩm nhỏ từ công thức, mẫu thử đến bao bì. Bio-A Group phối hợp từng giai đoạn để dự án có lộ trình rõ và dễ kiểm soát tiến độ.","Tình Huống 01","Thương hiệu skincare • Nội dung mẫu"],
      ["Thương hiệu đang có sản phẩm bán tốt muốn mở rộng thêm nhóm chăm sóc tóc. Quy trình tập trung vào R&D mẫu, đồng bộ bao bì và chuẩn bị kế hoạch sản xuất cho SKU mới.","Tình Huống 02","Thương hiệu hair care • Nội dung mẫu"],
      ["Dự án cần công thức riêng và nhiều vòng tinh chỉnh cảm quan trước khi chốt. Bio-A Group hỗ trợ ghi nhận thay đổi, hoàn thiện mẫu và chuyển tiếp sang sản xuất theo từng mốc.","Tình Huống 03","Phát triển công thức riêng • Nội dung mẫu"]
    ],
    roadmapTitle:"Đồng Hành Trọn Chu Kỳ",
    roadmap:[
      ["Tư Vấn & Hỗ Trợ Toàn Diện",["Làm rõ ý tưởng, nhóm sản phẩm và khách hàng mục tiêu,","xác định quy mô, tiến độ và hướng triển khai,","kết nối R&D, bao bì, hồ sơ và kế hoạch sản xuất."]],
      ["R&D & Hoàn Thiện Công Thức",["Lựa chọn hướng công thức và nguyên liệu phù hợp,","làm mẫu thử, tinh chỉnh cảm quan theo phản hồi","trước khi chốt mẫu chuyển sang sản xuất."]],
      ["Bao Bì & Hoàn Thiện Đồng Bộ",["Phối hợp lựa chọn chai lọ và quy cách đóng gói,","hoàn thiện nhãn cùng các hạng mục nhận diện","phù hợp với đặc tính của từng sản phẩm."]],
      ["Hồ Sơ, Sản Xuất & Bàn Giao",["Rà soát thông tin, nhãn và hồ sơ cần thiết,","thống nhất các mốc duyệt trước khi sản xuất,","hoàn thiện thành phẩm và bàn giao theo kế hoạch."]]
    ],
    cta:"Trao Đổi Dự Án Cùng Bio-A Group"
  },
  en:{
    heroTitle:"Full-Service Cosmetic Manufacturing",
    heroLead:"Bio-A Group is a cosmetic and cosmeceutical OEM/ODM manufacturer in Vietnam, supporting brands from product concept and formula R&D through packaging and finished-product production.",
    categoryTitle:"Why Choose Bio-A Group?",
    categories:[
      ["Full-Service OEM/ODM Manufacturing","Factory capability covers manufacturing, filling, packing and finished-product completion around each brand direction."],
      ["Comprehensive Project Support","Bio-A Group coordinates the project from consultation and direction-setting through R&D, packaging, documentation and production planning."],
      ["Formula R&D & Sampling","The R&D team develops formula bases, selects ingredients, prepares samples and refines sensory details through project feedback."],
      ["Diverse Product Portfolio","Multiple categories can be developed across skin care, hair care, body care, makeup, personal care and mother & baby."],
      ["Packaging & Finishing Support","Containers, packing specifications, labels and finishing details are coordinated around product characteristics and brand identity."],
      ["Flexible Project Solutions","Formula direction, project scale, expected quantity and timing can be adjusted instead of forcing every project into one fixed route."],
      ["Complete & Transparent Documentation","Product information, labels, required documentation and approval milestones are coordinated clearly so the brand can follow project progress."]
    ],
    scenarios:[
      ["A new skincare brand needs a focused first line covering formula, sampling and packaging. Bio-A Group coordinates each stage so the project has a clear, manageable development path.","Scenario 01","Skincare brand • Sample scenario"],
      ["An established brand wants to add a hair-care category. The project focuses on sample R&D, packaging alignment and a production plan for the new SKU range.","Scenario 02","Hair-care brand • Sample scenario"],
      ["A custom-formula project needs several sensory-refinement rounds before approval. Bio-A Group tracks revisions, finalizes samples and moves the project into production by agreed milestones.","Scenario 03","Custom formula • Sample scenario"]
    ],
    roadmapTitle:"Full-Cycle Support",
    roadmap:[
      ["Consultation & Comprehensive Support",["Align the product idea, category and target customer,","define scale, timing and project direction,","then connect R&D, packaging, documentation and production planning."]],
      ["R&D & Formula Refinement",["Select suitable formula directions and ingredients,","prepare samples and refine sensory details","before the production sample is approved."]],
      ["Packaging & Coordinated Finishing",["Coordinate bottles and filling specifications,","finalize labels and brand presentation assets","to fit the product characteristics."]],
      ["Documentation, Production & Delivery",["Review product information, labels and required documentation,","confirm approval milestones before manufacturing,","then finish and deliver goods according to the agreed plan."]]
    ],
    cta:"Discuss Your Project with Bio-A Group"
  }
};

const viRules=[
  [/^Contract Manufacturing of Cosmetics, Skincare & Beauty Products$/i,"Gia Công Mỹ Phẩm Trọn Gói"],
  [/^Smart Packaging Solutions for Cosmetic Brands$/i,"Giải Pháp Bao Bì Cho Thương Hiệu Mỹ Phẩm"],
  [/^Smart Packaging$/i,"Bao Bì Thông Minh"],
  [/^Solutions for$/i,"Cho"],
  [/^Cosmetic Brands$/i,"Thương Hiệu Mỹ Phẩm"],
  [/^Tubes$/i,"Tuýp Mỹ Phẩm"],
  [/^Airless Dispensers$/i,"Chai Airless"],
  [/^Jars$/i,"Hũ Mỹ Phẩm"],
  [/^Bottles$/i,"Chai / Lọ"],
  [/^Used For$/i,"Phù Hợp Với"],
  [/^Key Features:?$/i,"Đặc Điểm Chính"],
  [/^Joint creams$/i,"Kem Chăm Sóc Body"],
  [/^Facial cleansers$/i,"Sữa Rửa Mặt"],
  [/^Gels$/i,"Gel Mỹ Phẩm"],
  [/^Daily skincare treatments$/i,"Sản Phẩm Chăm Sóc Hằng Ngày"],
  [/^Serums$/i,"Serum"],
  [/^Anti-aging creams$/i,"Kem Chăm Sóc Da"],
  [/^Anti-acne treatments$/i,"Sản Phẩm Chăm Sóc Da Mụn"],
  [/^Light creams$/i,"Kem Kết Cấu Nhẹ"],
  [/^Active ingredient-rich gels$/i,"Gel Chứa Hoạt Chất"],
  [/^Face and body masks$/i,"Mặt Nạ Da Mặt & Body"],
  [/^Body scrubs$/i,"Tẩy Tế Bào Chết Body"],
  [/^Shampoos$/i,"Dầu Gội"],
  [/^Toners$/i,"Toner"],
  [/^Haircare products$/i,"Sản Phẩm Chăm Sóc Tóc"],
  [/^How It Works$/i,"Quy Trình Gia Công"],
  [/^Ready-Made Formulas$/i,"Công Thức Có Sẵn"],
  [/^Individually-made Formulations$/i,"Công Thức Phát Triển Riêng"],
  [/^Define Your Product$/i,"Xác Định Sản Phẩm"],
  [/^Finalize the Specifications$/i,"Chọn Công Thức & Quy Cách"],
  [/^Ensure Regulatory Compliance$/i,"Duyệt Mẫu & Thông Tin Sản Phẩm"],
  [/^Streamlined Manufacturing$/i,"Chuẩn Bị Bao Bì & Sản Xuất"],
  [/^Delivery & Fulfillment$/i,"Sản Xuất & Bàn Giao"],
  [/^Understanding Your Vision$/i,"Làm Rõ Định Hướng Sản Phẩm"],
  [/^Research & Development$/i,"R&D & Làm Mẫu"],
  [/^Test Production & Evaluation$/i,"Duyệt Mẫu & Đánh Giá"],
  [/^Process Optimization$/i,"Hoàn Thiện Quy Trình Sản Xuất"],
  [/^What Our Clients Say$/i,"Kịch Bản Hợp Tác Tiêu Biểu"],
  [/^Certified EU Supplement Contract Manufacturing$/i,"Năng Lực Sản Xuất & Kiểm Soát Chất Lượng"],
  [/^ISO Certification$/i,"GMP"],
  [/^GMP \(Good Manufacturing Practice\)$/i,"HACCP"],
  [/^HACCP Certification$/i,"Kiểm Soát Chất Lượng"],
  [/^Comprehensive Laboratory Testing for Quality and Safety$/i,"Kiểm Nghiệm Chất Lượng Sản Phẩm"],
  [/^We conduct$/i,"Hạng Mục Kiểm Tra"],
  [/^Microbiological analysis$/i,"Kiểm Tra Vi Sinh"],
  [/^Heavy metals testing$/i,"Kiểm Tra Kim Loại Nặng"],
  [/^Pesticide screening$/i,"Chỉ Tiêu An Toàn Theo Sản Phẩm"],
  [/^Nutrient Breakdown$/i,"Độ Ổn Định & Cảm Quan"],
  [/^Our Quality Control Measures$/i,"Kiểm Soát Theo Từng Giai Đoạn"],
  [/^Raw Materials Testing$/i,"Kiểm Tra Nguyên Liệu"],
  [/^In-Process Control$/i,"Kiểm Soát Trong Sản Xuất"],
  [/^Final Inspection$/i,"Kiểm Tra Thành Phẩm"],
  [/^Full-Cycle Support$/i,"Đồng Hành Trọn Chu Kỳ"],
  [/^Plan & Strategize$/i,"Tư Vấn & Lập Kế Hoạch"],
  [/^Develop & Refine$/i,"R&D & Hoàn Thiện Công Thức"],
  [/^Design & Brand$/i,"Bao Bì & Nhận Diện"],
  [/^Ensure Compliance$/i,"Hồ Sơ, Sản Xuất & Bàn Giao"],
  [/^Only EU-based GMP, ISO, and HACCP-certified factories/i,"Bio-A Group tập trung kiểm soát nguyên liệu, mẫu duyệt, quá trình sản xuất, bao bì và thành phẩm theo yêu cầu của từng dự án."],
  [/^With these certifications/i,"Quy trình được theo dõi từ nguyên liệu đầu vào đến thành phẩm nhằm duy trì chất lượng ổn định theo mẫu và quy cách đã thống nhất."],
  [/^Our partnered laboratories across the EU/i,"Các chỉ tiêu kiểm nghiệm được xác định theo nhóm sản phẩm, công thức và yêu cầu hồ sơ của từng dự án."],
  [/^Throughout the manufacturing process/i,"Các thông số và đặc tính của sản phẩm được theo dõi trong quá trình sản xuất để hạn chế sai lệch so với mẫu đã duyệt."],
  [/^Before your supplements are delivered/i,"Thành phẩm được kiểm tra về cảm quan, quy cách đóng gói và các tiêu chí cần thiết trước khi bàn giao."]
];

const enRules=[
  [/^Contract Manufacturing of Cosmetics, Skincare & Beauty Products$/i,"Full-Service Cosmetic Manufacturing"],
  [/^Why Choose Merywood$/i,"Why Choose Bio-A Group?"],
  [/^Smart Packaging Solutions for Cosmetic Brands$/i,"Packaging Solutions for Cosmetic Brands"],
  [/^How It Works$/i,"Manufacturing Process"],
  [/^Ready-Made Formulas$/i,"Ready Formula"],
  [/^Individually-made Formulations$/i,"Custom Formula Development"],
  [/^What Our Clients Say$/i,"Typical Collaboration Scenarios"],
  [/^Certified EU Supplement Contract Manufacturing$/i,"Manufacturing & Quality Control"],
  [/^ISO Certification$/i,"GMP"],
  [/^GMP \(Good Manufacturing Practice\)$/i,"HACCP"],
  [/^HACCP Certification$/i,"Quality Control Process"],
  [/^Comprehensive Laboratory Testing for Quality and Safety$/i,"Product Quality Testing"],
  [/^Our Quality Control Measures$/i,"Stage-by-Stage Quality Control"],
  [/^Raw Materials Testing$/i,"Incoming Material Review"],
  [/^Final Inspection$/i,"Finished-Goods Inspection"],
  [/^Only EU-based GMP, ISO, and HACCP-certified factories/i,"Bio-A Group focuses on process control from incoming materials and approved samples through finished goods to maintain project-specific quality."],
  [/^Our partnered laboratories across the EU/i,"Testing requirements are selected according to the product category, formula and documentation needs of each project."],
  [/^Before your supplements are delivered/i,"Finished goods are checked for sensory quality, packaging specifications and required project criteria before delivery."]
];


const categoryIconAssets=[
  "/assets/about-icon-01-trang-diem.png",
  "/assets/about-icon-02-cham-soc-toc.png",
  "/assets/about-icon-03-cham-soc-body.png",
  "/assets/about-icon-04-cham-soc-da-mat.png",
  "/assets/about-icon-05-ca-nhan.png",
  "/assets/about-icon-06-me-be.png"
];

function applyCategoryArtwork($){
  const root=$("#why-choose-us").first();
  if(!root.length)return;

  if(!$("#bioa-cosmetics-category-icon-style").length){
    $("head").append('<style id="bioa-cosmetics-category-icon-style">#why-choose-us .bioa-cosmetics-category-icon-box{display:grid!important;place-items:center!important}#why-choose-us .bioa-cosmetics-category-icon{display:block!important;width:36px!important;height:36px!important;max-width:none!important;object-fit:contain!important;object-position:center!important;pointer-events:none!important}#why-choose-us .bioa-cosmetics-category-icon--01{transform:translate(-4px,2px)}#why-choose-us .bioa-cosmetics-category-icon--02{width:38px!important;height:38px!important;transform:translate(0,-2px)}#why-choose-us .bioa-cosmetics-category-icon--03{transform:translate(2px,2px)}#why-choose-us .bioa-cosmetics-category-icon--04{transform:translate(-3px,0)}#why-choose-us .bioa-cosmetics-category-icon--05{width:34px!important;height:34px!important;transform:translate(3px,-1px)}#why-choose-us .bioa-cosmetics-category-icon--06{transform:translate(-4px,1px)}</style>');
  }

  [root.find(".grid .item"),root.find(".mobile .item")].forEach(list=>{
    list.each((i,el)=>{
      const src=categoryIconAssets[i];
      if(!src)return; /* card 07 R&D keeps its source artwork */
      const card=$(el);
      const img=card.find('img').first();
      if(!img.length)return;
      const iconNo=String(i+1).padStart(2,"0");
      img.parent().addClass("bioa-cosmetics-category-icon-box");
      img.attr("src",src)
        .attr("alt","")
        .attr("aria-hidden","true")
        .attr("width","36")
        .attr("height","36")
        .removeAttr("srcset")
        .removeAttr("sizes")
        .addClass("bioa-cosmetics-category-icon bioa-cosmetics-category-icon--"+iconNo);
    });
  });
}


const cosmeticsManufacturingCategories={
  vi:{
    eyebrow:"GIA CÔNG MỸ PHẨM",
    title:"Danh Mục Gia Công Mỹ Phẩm",
    intro:"Khám phá 6 nhóm sản phẩm Bio-A Group có thể phát triển và gia công theo định hướng riêng của thương hiệu.",
    items:[
      ["Sản Phẩm Trang Điểm","Các dòng trang điểm được phát triển theo màu sắc, kết cấu, định vị và nhu cầu riêng của thương hiệu."],
      ["Sản Phẩm Chăm Sóc Tóc","Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc được phát triển theo yêu cầu dự án."],
      ["Sản Phẩm Chăm Sóc Body","Sữa tắm, lotion, tẩy tế bào chết và các dòng chăm sóc cơ thể theo định hướng thương hiệu."],
      ["Sản Phẩm Chăm Sóc Da Mặt","Kem, serum, gel, mặt nạ và các dòng chăm sóc da mặt với nhiều hướng công thức và kết cấu."],
      ["Sản Phẩm Cá Nhân","Các dòng chăm sóc cá nhân được phát triển theo nhu cầu sử dụng, phân khúc và kênh bán."],
      ["Sản Phẩm Mẹ & Bé","Nhóm sản phẩm chăm sóc mẹ và bé với định hướng công thức phù hợp từng dự án và đối tượng sử dụng."]
    ]
  },
  en:{
    eyebrow:"COSMETIC MANUFACTURING",
    title:"Cosmetic Manufacturing Categories",
    intro:"Explore six product groups Bio-A Group can develop and manufacture around each brand's product direction.",
    items:[
      ["Makeup Products","Makeup products developed around color, texture, positioning and each brand's specific requirements."],
      ["Hair Care Products","Shampoo, conditioner, treatments and hair-care solutions developed to the project brief."],
      ["Body Care Products","Body wash, lotions, scrubs and other body-care formats aligned with the brand direction."],
      ["Facial Skin Care","Creams, serums, gels, masks and facial-care products across multiple formula and texture directions."],
      ["Personal Care Products","Personal-care lines developed for specific usage needs, market segments and sales channels."],
      ["Mother & Baby Products","Mother-and-baby care products with formulation directions tailored to each project and user group."]
    ]
  }
};

function applyManufacturingCategorySection($,lang){
  $("#bioa-cosmetics-categories").remove();
  const data=cosmeticsManufacturingCategories[lang];
  const cards=data.items.map((item,i)=>{
    const no=String(i+1).padStart(2,"0");
    return '<article class="bioa-category-card"><span class="bioa-category-watermark" aria-hidden="true"></span><div class="bioa-category-meta"><span class="bioa-category-icon-box"><img class="bioa-category-icon bioa-category-icon--'+no+'" src="'+categoryIconAssets[i]+'" alt="" aria-hidden="true" width="36" height="36" decoding="async"></span><span class="bioa-category-number">'+no+'</span></div><h3 class="bioa-category-title">'+item[0]+'</h3><p class="bioa-category-body">'+item[1]+'</p></article>';
  }).join("");
  const html='<section class="block bioa-cosmetics-categories" id="bioa-cosmetics-categories"><div class="container"><div class="bioa-categories-head"><h2 class="title bioa-categories-title">'+data.title+'</h2><p class="bioa-categories-intro">'+data.intro+'</p></div><div class="bioa-category-grid">'+cards+'</div></div></section>';
  const anchor=$("#why-choose-us").first();
  if(anchor.length)anchor.after(html);
  else $(".block-products-desctop").first().before(html);

  if(!$("#bioa-cosmetics-categories-style").length){
    $("head").append('<style id="bioa-cosmetics-categories-style">#bioa-cosmetics-categories{padding:44px 0;background:#f4f0e3}#bioa-cosmetics-categories .bioa-categories-head{max-width:780px;margin-bottom:42px}#bioa-cosmetics-categories .bioa-categories-eyebrow{margin-bottom:10px;font-size:12px;line-height:1.2;letter-spacing:.02em;text-transform:uppercase;color:#116f47}#bioa-cosmetics-categories .bioa-categories-title{margin:0 0 14px;font-weight:400}#bioa-cosmetics-categories .bioa-categories-intro{max-width:690px;margin:0;color:rgba(20,39,31,.66);font-size:16px;line-height:1.55}#bioa-cosmetics-categories .bioa-category-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}#bioa-cosmetics-categories .bioa-category-card{position:relative;isolation:isolate;min-height:225px;padding:28px 30px 30px;overflow:hidden;border:1px solid rgba(17,111,71,.14);border-radius:30px;background:linear-gradient(135deg,rgba(239,248,242,.94) 0%,rgba(255,253,247,.96) 100%)}#bioa-cosmetics-categories .bioa-category-watermark{position:absolute;z-index:-1;right:-16px;bottom:-22px;width:178px;height:178px;background:#116f47;opacity:.075;pointer-events:none;transform:scale(1);transform-origin:center;transition:transform .35s ease,opacity .35s ease;-webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain;mask:url("/assets/bioa-monogram.svg") no-repeat center/contain}@media(hover:hover){#bioa-cosmetics-categories .bioa-category-card:hover .bioa-category-watermark{transform:scale(1.07);opacity:.105}}#bioa-cosmetics-categories .bioa-category-meta{display:flex;align-items:center;gap:10px;margin-bottom:30px}#bioa-cosmetics-categories .bioa-category-icon-box{display:grid;place-items:center;width:44px;height:44px;overflow:hidden;border-radius:12px;background:#116f47}#bioa-cosmetics-categories .bioa-category-number{display:grid;place-items:center;min-width:40px;height:36px;padding:0 10px;border-radius:10px;background:rgba(17,111,71,.07);color:rgba(20,39,31,.55);font-size:13px}#bioa-cosmetics-categories .bioa-category-icon{display:block;width:36px;height:36px;max-width:none;object-fit:contain;object-position:center;pointer-events:none}#bioa-cosmetics-categories .bioa-category-icon--01{transform:translate(-4px,2px)}#bioa-cosmetics-categories .bioa-category-icon--02{width:38px;height:38px;transform:translate(0,-2px)}#bioa-cosmetics-categories .bioa-category-icon--03{transform:translate(2px,2px)}#bioa-cosmetics-categories .bioa-category-icon--04{transform:translate(-3px,0)}#bioa-cosmetics-categories .bioa-category-icon--05{width:34px;height:34px;transform:translate(3px,-1px)}#bioa-cosmetics-categories .bioa-category-icon--06{transform:translate(-4px,1px)}#bioa-cosmetics-categories .bioa-category-title{max-width:78%;margin:0 0 13px;font-size:26px;line-height:1.14;font-weight:400;color:#14271f}#bioa-cosmetics-categories .bioa-category-body{position:relative;z-index:1;max-width:78%;margin:0;color:rgba(20,39,31,.68);font-size:15px;line-height:1.5}@media(max-width:1023px){#bioa-cosmetics-categories{padding:36px 0}#bioa-cosmetics-categories .bioa-category-card{min-height:215px;padding:25px}#bioa-cosmetics-categories .bioa-category-title,#bioa-cosmetics-categories .bioa-category-body{max-width:84%}}@media(max-width:767px){#bioa-cosmetics-categories{padding:30px 0}#bioa-cosmetics-categories .bioa-categories-head{margin-bottom:30px}#bioa-cosmetics-categories .bioa-category-grid{grid-template-columns:1fr;gap:14px}#bioa-cosmetics-categories .bioa-category-card{min-height:190px;padding:22px;border-radius:24px}#bioa-cosmetics-categories .bioa-category-meta{margin-bottom:24px}#bioa-cosmetics-categories .bioa-category-title{max-width:82%;font-size:22px}#bioa-cosmetics-categories .bioa-category-body{max-width:88%;font-size:14px}#bioa-cosmetics-categories .bioa-category-watermark{right:-22px;bottom:-28px;width:150px;height:150px}}</style>');
  }
}

function applyCategories($,lang){
  const data=content[lang];
  const root=$("#why-choose-us").first();
  if(!root.length)return;
  root.find(".title").each((_,el)=>$(el).text(data.categoryTitle));
  [root.find(".grid .item"),root.find(".mobile .item")].forEach(list=>{
    list.each((i,el)=>{
      const d=data.categories[i%data.categories.length];
      const card=$(el);
      setInner(card,".item__title",d[0]);
      setInner(card,".item__body,.item__text",d[1]);
    });
  });
}


const cosmeticsDeepContent={
  vi:{
    packagingTitle:"Giải Pháp Bao Bì Cho Thương Hiệu Mỹ Phẩm",
    packaging:[
      {
        title:"Tuýp Mỹ Phẩm",
        ideal:["Kem Chăm Sóc Body","Sữa Rửa Mặt","Gel Mỹ Phẩm","Sản Phẩm Chăm Sóc Hằng Ngày"],
        features:["Dễ kiểm soát lượng sản phẩm khi sử dụng","Hạn chế tiếp xúc trực tiếp và lãng phí sản phẩm","Gọn nhẹ, thuận tiện mang theo","Phù hợp nhiều kết cấu gel và kem"]
      },
      {
        title:"Chai Airless",
        ideal:["Serum","Kem Chăm Sóc Da","Sản Phẩm Chăm Sóc Da Mụn","Kem Kết Cấu Nhẹ","Gel Chứa Hoạt Chất"],
        features:["Hạn chế công thức tiếp xúc với không khí","Hỗ trợ bảo vệ độ ổn định của công thức","Thiết kế vòi nhấn phù hợp dòng sản phẩm cao cấp","Phù hợp các dòng chăm sóc da cần trải nghiệm sạch và hiện đại"]
      },
      {
        title:"Hũ Mỹ Phẩm",
        ideal:["Mặt Nạ Da Mặt & Body","Tẩy Tế Bào Chết Body","Sáp / Balm Dạng Đặc","Kem Dưỡng Kết Cấu Đậm"],
        features:["Dễ lấy sản phẩm có kết cấu đặc","Có thể lựa chọn nhiều dung tích và vật liệu","Tạo cảm giác sử dụng chắc chắn, cao cấp","Phù hợp dòng chăm sóc tại nhà hoặc spa"]
      },
      {
        title:"Chai / Lọ",
        ideal:["Dầu Gội","Toner","Gel Chăm Sóc Cá Nhân","Sản Phẩm Dạng Lỏng","Sản Phẩm Chăm Sóc Tóc"],
        features:["Đa dạng vòi nhấn, xịt, nắp bật và nắp vặn","Thuận tiện khi sử dụng và định lượng","Linh hoạt từ phân khúc phổ thông đến cao cấp","Có thể điều chỉnh hình dáng, vật liệu theo nhận diện thương hiệu"]
      }
    ],
    formats:{
      title:"Dạng Sản Phẩm Gia Công Đa Dạng",
      lede:"Bio-A Group có thể phát triển nhiều nhóm và dạng sản phẩm với công thức, kết cấu và quy cách hoàn thiện theo định hướng thương hiệu.",
      tab:"Dạng Sản Phẩm",
      items:["Kem","Serum","Dạng Lỏng","Gel","Xịt","Balm / Sáp","Miếng Pad"],
      ctaTitle:"Chưa thấy dạng sản phẩm bạn cần?",
      ctaDescription:"Gửi ý tưởng sản phẩm, Bio-A Group sẽ kiểm tra công thức, quy cách và phương án sản xuất phù hợp.",
      button:"Chia Sẻ Ý Tưởng"
    },
    process:{
      title:"Quy Trình Gia Công Linh Hoạt",
      columns:[
        {
          title:"Công Thức Có Sẵn",
          subtitle:"Giải pháp rút ngắn thời gian phát triển cho thương hiệu cần triển khai sản phẩm nhanh và rõ quy cách.",
          steps:[
            ["Xác Định Sản Phẩm","Trao đổi nhóm sản phẩm, khách hàng mục tiêu, định vị, số lượng dự kiến và yêu cầu cảm quan."],
            ["Chọn Công Thức & Quy Cách","Lựa chọn nền công thức phù hợp, dung tích và phương án đóng gói theo định hướng thương hiệu."],
            ["Duyệt Mẫu & Thông Tin Sản Phẩm","Kiểm tra mẫu, thống nhất cảm quan, nội dung nhãn và các thông tin cần hoàn thiện trước sản xuất."],
            ["Chuẩn Bị Bao Bì & Sản Xuất","Chốt chai lọ, nhãn, quy cách đóng gói và kế hoạch đưa sản phẩm vào dây chuyền."],
            ["Sản Xuất & Bàn Giao","Nhà máy triển khai sản xuất, sang chiết, đóng gói và kiểm tra thành phẩm trước khi bàn giao."]
          ]
        },
        {
          title:"Công Thức Phát Triển Riêng",
          subtitle:"Dành cho thương hiệu muốn xây dựng sản phẩm theo định hướng riêng từ R&D mẫu đến thành phẩm.",
          steps:[
            ["Làm Rõ Định Hướng Sản Phẩm","Xác định công dụng, nhóm khách hàng, kết cấu, mùi hương, màu sắc và định hướng nguyên liệu."],
            ["R&D & Làm Mẫu","Đội ngũ R&D lựa chọn nguyên liệu, xây dựng công thức và thực hiện các vòng mẫu thử theo phản hồi."],
            ["Duyệt Mẫu & Đánh Giá","Tinh chỉnh cảm quan, độ ổn định và khả năng triển khai thực tế trước khi chốt mẫu sản xuất."],
            ["Hoàn Thiện Quy Trình Sản Xuất","Chuyển công thức đã duyệt sang quy trình sản xuất, đồng bộ bao bì, hồ sơ và kế hoạch bàn giao."]
          ]
        }
      ]
    },
    certification:{
      title:"Năng Lực Sản Xuất & Kiểm Soát Chất Lượng",
      cards:[
        ["GMP Bộ Y Tế Việt Nam","Bio-A Group đạt chuẩn GMP Bộ Y Tế, tập trung kiểm soát quy trình sản xuất dược mỹ phẩm theo yêu cầu chất lượng đã xác định."],
        ["HACCP","Hệ thống quản lý an toàn thực phẩm hỗ trợ nhận diện và kiểm soát các điểm cần theo dõi trong quá trình vận hành."],
        ["Kiểm Soát Chất Lượng","Nguyên liệu, mẫu duyệt, quá trình sản xuất, bao bì và thành phẩm được theo dõi theo từng giai đoạn của dự án."]
      ],
      footer:"Bio-A Group đồng hành trọn gói từ ý tưởng đến sản phẩm hoàn thiện, hướng tới sản phẩm chất lượng, phương án sản xuất phù hợp và tiến độ rõ ràng."
    },
    quality:{
      pretitle:"Kiểm Nghiệm Chất Lượng Sản Phẩm",
      subtitle:"Hạng mục kiểm tra được xác định theo nhóm sản phẩm, công thức và yêu cầu hồ sơ của từng dự án để các mốc kiểm soát luôn rõ ràng.",
      title:"Hạng Mục Kiểm Tra",
      checks:["Kiểm Tra Vi Sinh","Kiểm Tra Kim Loại Nặng","Chỉ Tiêu An Toàn Theo Sản Phẩm","Độ Ổn Định & Cảm Quan"],
      description:"Các chỉ tiêu được lựa chọn theo đặc tính công thức và định hướng sử dụng của sản phẩm.",
      highlight:"Kết quả kiểm tra được phối hợp cùng yêu cầu bao bì, mẫu duyệt và quy cách sản xuất để hỗ trợ sản phẩm ổn định khi chuyển sang thành phẩm.",
      qcTitle:"Kiểm Soát Theo Từng Giai Đoạn",
      qc:[
        ["Kiểm Tra Nguyên Liệu","Nguyên liệu đầu vào được rà soát theo tiêu chí phù hợp trước khi đưa vào quy trình sản xuất."],
        ["Kiểm Soát Trong Sản Xuất","Các thông số và đặc tính cảm quan được theo dõi trong quá trình sản xuất để hạn chế sai lệch so với mẫu đã duyệt."],
        ["Kiểm Tra Thành Phẩm","Thành phẩm được kiểm tra cảm quan, quy cách đóng gói và các tiêu chí cần thiết trước khi bàn giao."]
      ]
    }
  },
  en:{
    packagingTitle:"Packaging Solutions for Cosmetic Brands",
    packaging:[
      {title:"Cosmetic Tubes",ideal:["Body Care Creams","Facial Cleansers","Cosmetic Gels","Daily Care Products"],features:["Controlled, hygienic dispensing","Helps reduce direct contact and product waste","Compact and travel-friendly","Suitable for many gel and cream textures"]},
      {title:"Airless Dispensers",ideal:["Serums","Skin Care Creams","Blemish Care","Light Creams","Active Gels"],features:["Helps reduce formula exposure to air","Supports formula stability","Pump format suited to premium positioning","Clean, modern presentation for skin-care lines"]},
      {title:"Cosmetic Jars",ideal:["Face & Body Masks","Body Scrubs","Balms","Rich Moisturizers"],features:["Easy access for thicker textures","Multiple materials and capacities available","Premium tactile presentation","Suitable for home-care and spa ranges"]},
      {title:"Bottles",ideal:["Shampoos","Toners","Personal Care Gels","Liquid Skin Care","Hair Care Products"],features:["Pump, spray, flip-top and screw-cap options","Easy dispensing and everyday use","Flexible across value and premium ranges","Shapes and materials can align with brand identity"]}
    ],
    formats:{title:"Diverse Product Formats",lede:"Bio-A Group can develop multiple product categories and formats with formulas, textures and finishing specifications aligned to each brand direction.",tab:"Product Formats",items:["Creams","Serums","Liquids","Gels","Sprays","Balms","Pads"],ctaTitle:"Do not see your format on the list?",ctaDescription:"Share your product idea and Bio-A Group will review the formula, packaging format and suitable production approach.",button:"Tell Us Your Idea"},
    process:{
      title:"Flexible Manufacturing Process",
      columns:[
        {title:"Ready Formula",subtitle:"A faster route for brands that need a clear product specification and shorter development cycle.",steps:[["Define Your Product","Align product category, target customer, positioning, expected quantity and sensory requirements."],["Select Formula & Format","Choose a suitable formula base, capacity and packaging direction."],["Approve Sample & Product Information","Review the sample, sensory profile, label content and required information before production."],["Prepare Packaging & Production","Finalize containers, labels, packing specifications and production planning."],["Production & Delivery","Manufacture, fill, pack and inspect finished goods before delivery."]]},
        {title:"Custom Formula Development",subtitle:"For brands that want a differentiated product developed from R&D samples through finished production.",steps:[["Clarify Product Direction","Define benefits, target users, texture, fragrance, color and ingredient direction."],["R&D & Sampling","Develop formulas, select ingredients and refine samples through feedback rounds."],["Sample Approval & Evaluation","Refine sensory details, stability and production feasibility before approval."],["Finalize Production Process","Transfer the approved formula into manufacturing while coordinating packaging, documentation and delivery planning."]]}
      ]
    },
    certification:{title:"Manufacturing Capability & Quality Control",cards:[["GMP — Vietnam Ministry of Health","Bio-A Group operates to GMP requirements recorded in the legacy Bio-A source, with controlled cosmetic and cosmeceutical manufacturing processes."],["HACCP","A food-safety management system that supports identification and control of relevant operational risks."],["Quality Control","Materials, approved samples, production, packaging and finished goods are followed through project stages."]],footer:"Bio-A Group supports brands from the initial idea through finished products with practical manufacturing solutions, quality focus and clear project milestones."},
    quality:{pretitle:"Product Quality Testing",subtitle:"Testing scope is selected according to product category, formula and documentation requirements so quality-control milestones remain clear.",title:"Testing Scope",checks:["Microbiological Testing","Heavy-Metal Testing","Product-Specific Safety Parameters","Stability & Sensory Review"],description:"Testing parameters are selected according to formula characteristics and intended product use.",highlight:"Testing, packaging, approved samples and manufacturing specifications are coordinated to support stable finished-product quality.",qcTitle:"Stage-by-Stage Quality Control",qc:[["Incoming Material Review","Incoming materials are reviewed against relevant criteria before production."],["In-Process Control","Product parameters and sensory characteristics are monitored during manufacturing."],["Finished-Goods Inspection","Finished goods are checked for sensory quality, packaging specifications and required project criteria before delivery."]]}
  }
};

function applyHeroArtwork($){
  $("#bioa-cosmetics-hero-watermark-style").remove();
  $(".block-info .composition").each((_,el)=>{
    $(el).css("background-image","url('/assets/cosmetics-hero-bioa.webp')")
      .css("background-size","cover")
      .css("background-position","center");
  });
}

function applyPackaging($,lang){
  const data=cosmeticsDeepContent[lang];
  [$(".block-products-desctop"),$(".block-products-mobile")].forEach(block=>{
    if(!block.length)return;
    block.find(".title-wrapper .title").each((_,el)=>$(el).text(data.packagingTitle));
    block.find(".swiper-slide").each((i,el)=>{
      const d=data.packaging[i%data.packaging.length];
      const slide=$(el);
      slide.find(".product__title .title,.product__title").first().text(d.title);
      slide.find(".product__ideal-for .label").text(lang==="vi"?"Phù Hợp Với":"Used For");
      slide.find(".product__key-advantages .label").text(lang==="vi"?"Đặc Điểm Chính":"Key Features");
      slide.find(".product__ideal-for .labels__item").each((j,item)=>{
        if(d.ideal[j]!=null)$(item).text(d.ideal[j]);
      });
      const featureItems=slide.find(".product__key-advantages .list__item");
      featureItems.each((j,item)=>{
        if(d.features[j]==null)return;
        const row=$(item);
        const t=row.find(".list__item-text").first();
        if(t.length)t.text(d.features[j]);
        else row.text(d.features[j]);
      });
      slide.find(".product__open-text").text(lang==="vi"?"Xem Thêm":"Show More");
    });
  });
}

function applyFormats($,lang){
  const d=cosmeticsDeepContent[lang].formats;
  const root=$(".block-product-formats").first();
  if(!root.length)return;
  root.find(".title-wrapper .title").text(d.title);
  root.find(".formats__lede").text(d.lede);
  root.find(".formats__tab").text(d.tab);
  root.find(".formats__panel-title").text(d.tab);
  root.find(".formats__item-title").each((i,el)=>{if(d.items[i]!=null)$(el).text(d.items[i]);});
  root.find(".formats__cta-title").text(d.ctaTitle);
  root.find(".formats__cta-description").text(d.ctaDescription);
  root.find(".formats__cta-btn .btn__text").text(d.button);
}

function applyProcess($,lang){
  const d=cosmeticsDeepContent[lang].process;
  const root=$(".block-two-columns").first();
  if(!root.length)return;
  root.find(".title-wrapper .title").text(d.title);
  root.find(".two-columns-column").each((i,el)=>{
    const col=d.columns[i];
    if(!col)return;
    const column=$(el);
    column.find(".two-columns-column-title").text(col.title);
    column.find(".two-columns-column-subtitle").text(col.subtitle);
    column.find(".two-columns-item").each((j,item)=>{
      const step=col.steps[j];
      if(!step)return;
      const node=$(item);
      node.find(".two-columns-item-title").text(step[0]);
      node.find(".two-columns-item-text").text(step[1]);
    });
  });
}

function applyCertification($,lang){
  const d=cosmeticsDeepContent[lang].certification;
  const root=$(".certifications").first();
  if(!root.length)return;
  root.find(".certifications-title").text(d.title);
  root.find(".cert-card").each((i,el)=>{
    const card=d.cards[i];
    if(!card)return;
    const node=$(el);
    node.find(".cert-card-title").text(card[0]);
    node.find(".cert-card-description").text(card[1]);
  });
  root.find(".certifications-footer-text").text(d.footer);
}

function applyQuality($,lang){
  const d=cosmeticsDeepContent[lang].quality;
  const root=$(".block-we-conduct").first();
  if(!root.length)return;
  root.find(".we-conduct-pretitle").text(d.pretitle);
  root.find(".we-conduct-subtitle").text(d.subtitle);
  root.find(".we-conduct-title").eq(0).text(d.title);
  root.find(".we-conduct-card-title").each((i,el)=>{if(d.checks[i]!=null)$(el).text(d.checks[i]);});
  root.find(".we-conduct-description").text(d.description);
  root.find(".we-conduct-highlight").text(d.highlight);
  root.find(".we-conduct-title").eq(1).text(d.qcTitle);
  root.find(".we-quality-card").each((i,el)=>{
    const q=d.qc[i];
    if(!q)return;
    const node=$(el);
    node.find(".we-quality-card-title").text(q[0]);
    node.find(".we-quality-card-text").text(q[1]);
  });
}

function applyHeroAndCtas($,lang){
  const data=content[lang];
  $(".block-info h1").each((_,el)=>$(el).text(data.heroTitle));
  $(".block-info .text").each((_,el)=>$(el).text(data.heroLead));
  $(".block-info .btn__text").text(lang==="vi"?"Nhận Tư Vấn":"Get a Quote");
  $(".block-roadmap .btn__text").text(lang==="vi"?"Nhận Tư Vấn":"Get a Quote");
}

function applyScenarios($,lang){
  const data=content[lang];
  $(".block-reviews .title").each((_,el)=>$(el).text(lang==="vi"?"Kịch Bản Hợp Tác Tiêu Biểu":"Typical Collaboration Scenarios"));
  $(".block-reviews .review").each((i,el)=>{
    const d=data.scenarios[i%data.scenarios.length];
    const root=$(el);
    root.find(".review__text").first().text(d[0]);
    root.find(".review__author-name").first().text(d[1]);
    root.find(".review__author-info").first().text(d[2]);
  });
}

function applyRoadmap($,lang){
  const data=content[lang];
  const root=$(".block-roadmap").first();
  if(!root.length)return;
  root.find(".title").each((_,el)=>$(el).text(data.roadmapTitle));
  root.find(".step").each((i,el)=>{
    const d=data.roadmap[i%data.roadmap.length];
    const step=$(el);
    step.find(".step__title").text(d[0]);
    const body=step.find(".step__text").first();
    const p=body.find("p").first();
    (p.length?p:body).html(d[1].join("<br>"));
  });
}

export function applyCosmeticsHubRefinement($,route,lang){
  if(route!=="/contract-manufacturing-cosmetics/")return;
  const root=$(".page-main").first();
  if(!root.length)return;
  const key=lang==="en"?"en":"vi";
  const data=content[key];

  root.attr("data-bioa-page","cosmetics-hub");
  applyHeroArtwork($);
  applyHeroAndCtas($,key);

  replaceRules(root,key==="vi"?viRules:enRules);
  applyCategories($,key);
  applyManufacturingCategorySection($,key);
  applyPackaging($,key);
  applyFormats($,key);
  applyProcess($,key);
  applyScenarios($,key);
  applyCertification($,key);
  applyQuality($,key);
  applyRoadmap($,key);

  $(".whatsapp__title").text(data.cta);
}
