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
    heroLead:"Bio-A Group đồng hành từ ý tưởng, R&D công thức, lựa chọn nguyên liệu, sản xuất OEM/ODM đến bao bì và hoàn thiện sản phẩm theo định hướng thương hiệu.",
    categoryTitle:"Danh Mục Gia Công Mỹ Phẩm",
    categories:[
      ["Sản Phẩm Trang Điểm","Các dòng trang điểm được phát triển theo màu sắc, kết cấu, định vị và nhu cầu riêng của thương hiệu."],
      ["Sản Phẩm Chăm Sóc Tóc","Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc được phát triển theo yêu cầu dự án."],
      ["Sản Phẩm Chăm Sóc Body","Sữa tắm, lotion, tẩy tế bào chết và các dòng chăm sóc cơ thể theo định hướng thương hiệu."],
      ["Sản Phẩm Chăm Sóc Da Mặt","Kem, serum, gel, mặt nạ và các dòng chăm sóc da mặt với nhiều hướng công thức và kết cấu."],
      ["Sản Phẩm Cá Nhân","Các dòng chăm sóc cá nhân được phát triển theo nhu cầu sử dụng, phân khúc và kênh bán."],
      ["Sản Phẩm Mẹ & Bé","Nhóm sản phẩm chăm sóc mẹ và bé với định hướng công thức phù hợp từng dự án và đối tượng sử dụng."],
      ["R&D & Phát Triển Công Thức","Hỗ trợ lựa chọn nền công thức, nguyên liệu, làm mẫu, tinh chỉnh cảm quan và hoàn thiện công thức trước sản xuất."]
    ],
    scenarios:[
      ["Thương hiệu skincare mới cần phát triển một dòng sản phẩm nhỏ từ công thức, mẫu thử đến bao bì. Bio-A Group phối hợp từng giai đoạn để dự án có lộ trình rõ và dễ kiểm soát tiến độ.","Tình Huống 01","Thương hiệu skincare • Nội dung mẫu"],
      ["Thương hiệu đang có sản phẩm bán tốt muốn mở rộng thêm nhóm chăm sóc tóc. Quy trình tập trung vào R&D mẫu, đồng bộ bao bì và chuẩn bị kế hoạch sản xuất cho SKU mới.","Tình Huống 02","Thương hiệu hair care • Nội dung mẫu"],
      ["Dự án cần công thức riêng và nhiều vòng tinh chỉnh cảm quan trước khi chốt. Bio-A Group hỗ trợ ghi nhận thay đổi, hoàn thiện mẫu và chuyển tiếp sang sản xuất theo từng mốc.","Tình Huống 03","Phát triển công thức riêng • Nội dung mẫu"]
    ],
    roadmapTitle:"Đồng Hành Trọn Chu Kỳ",
    roadmap:[
      ["Tư Vấn & Lập Kế Hoạch",["Làm rõ ý tưởng, nhóm sản phẩm và khách hàng mục tiêu,","xác định ngân sách, tiến độ và hướng triển khai","cho R&D, bao bì và kế hoạch sản xuất."]],
      ["R&D & Hoàn Thiện Công Thức",["Lựa chọn hướng công thức và nguyên liệu phù hợp,","làm mẫu thử, tinh chỉnh cảm quan theo phản hồi","trước khi chốt mẫu chuyển sang sản xuất."]],
      ["Bao Bì & Nhận Diện",["Phối hợp lựa chọn chai lọ và quy cách đóng gói,","hoàn thiện nhãn cùng các hạng mục nhận diện","phù hợp với đặc tính của từng sản phẩm."]],
      ["Hồ Sơ, Sản Xuất & Bàn Giao",["Rà soát thông tin cần thiết trước sản xuất,","triển khai sản xuất, sang chiết và đóng gói,","kiểm soát thành phẩm theo kế hoạch đã thống nhất."]]
    ],
    cta:"Trao Đổi Dự Án Cùng Bio-A Group"
  },
  en:{
    heroTitle:"Full-Service Cosmetic Manufacturing",
    heroLead:"Bio-A Group supports brands from product concept and formula R&D to OEM/ODM manufacturing, packaging and finished-product development.",
    categoryTitle:"Cosmetic Manufacturing Categories",
    categories:[
      ["Makeup Products","Makeup products developed around color, texture, positioning and each brand's product direction."],
      ["Hair Care Products","Shampoo, conditioner, treatments and hair-care solutions developed to the project brief."],
      ["Body Care Products","Body wash, lotions, scrubs and other body-care formats aligned with the brand direction."],
      ["Facial Skin Care","Creams, serums, gels, masks and facial-care products across multiple formula and texture directions."],
      ["Personal Care Products","Personal-care lines developed for specific usage needs, market segments and sales channels."],
      ["Mother & Baby Products","Mother-and-baby care products with formulation directions tailored to each project and user group."],
      ["R&D & Formula Development","Support with formula direction, ingredients, sampling, sensory refinement and finalization before production."]
    ],
    scenarios:[
      ["A new skincare brand needs a focused first line covering formula, sampling and packaging. Bio-A Group coordinates each stage so the project has a clear, manageable development path.","Scenario 01","Skincare brand • Sample scenario"],
      ["An established brand wants to add a hair-care category. The project focuses on sample R&D, packaging alignment and a production plan for the new SKU range.","Scenario 02","Hair-care brand • Sample scenario"],
      ["A custom-formula project needs several sensory-refinement rounds before approval. Bio-A Group tracks revisions, finalizes samples and moves the project into production by agreed milestones.","Scenario 03","Custom formula • Sample scenario"]
    ],
    roadmapTitle:"Full-Cycle Support",
    roadmap:[
      ["Consultation & Planning",["Align the product idea, category and target customer,","define budget, timing and project direction","for R&D, packaging and production planning."]],
      ["R&D & Formula Refinement",["Select suitable formula directions and ingredients,","prepare samples and refine sensory details","before the production sample is approved."]],
      ["Packaging & Brand Presentation",["Coordinate bottles and filling specifications,","finalize labels and brand presentation assets","to fit the product characteristics."]],
      ["Documentation, Production & Delivery",["Review required information before manufacturing,","produce, fill and pack according to the plan,","then inspect finished goods before delivery."]]
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
  [/^Why Choose Merywood$/i,"Cosmetic Manufacturing Categories"],
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

  root.find("h1").first().text(data.heroTitle);
  root.find(".text-large").first().text(data.heroLead);

  replaceRules(root,key==="vi"?viRules:enRules);
  applyCategories($,key);
  applyCategoryArtwork($);
  applyScenarios($,key);
  applyRoadmap($,key);

  $(".whatsapp__title").text(data.cta);
  root.attr("data-bioa-page","cosmetics-hub");
}
