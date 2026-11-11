// R24FD CAREERS-1 (owner 2026-11-11): Careers restored on the Merywood Careers layout.
// VI /tuyen-dung/ + /tuyen-dung/<vi-slug>/, EN /en/careers/ + /en/careers/<en-slug>/.
// Source: Merywood /careers/ (list) and /careers/b2b-sales-manager/ (detail) from the pinned bundle;
// DOM, classes, inline .mwc CSS and responsive rules are kept. Only text, links, images with a
// Merywood brand trace, the people/e-mail blocks and the AJAX filter (WordPress admin-ajax) change.
// The three roles are SAMPLE content for owner approval, not confirmed openings: salary, benefits,
// location, work type and the application channel are NOT invented (data-owner-approval="required").
// This module must not import bioa-transform.mjs (bioa-transform imports CAREER_VI_PATHS from here).
import { BUSINESS } from "./bioa-business.mjs";

export const CAREER_JOBS = [
  {
    route: "/careers/b2b-sales-executive/", vi: "/tuyen-dung/nhan-vien-kinh-doanh-b2b/", cat: "sales",
    image: "https://merywood.com/wp-content/uploads/2026/07/vac1-1024x683.webp",
    t: {
      vi: {
        title: "Nhân viên Kinh doanh B2B",
        desc: "Tìm kiếm và chăm sóc khách hàng doanh nghiệp có nhu cầu gia công mỹ phẩm, phối hợp cùng R&D và sản xuất để triển khai từng dự án.",
        intro: [
          "Bio-A Group – Nhà Máy Sản Xuất Dược Mỹ Phẩm – đồng hành cùng các thương hiệu trong gia công mỹ phẩm OEM/ODM, từ công thức, bao bì đến thành phẩm.",
          "Nhân viên Kinh doanh B2B là đầu mối giữa khách hàng doanh nghiệp và các bộ phận của nhà máy: tìm hiểu nhu cầu, tư vấn giải pháp và theo dõi dự án đến khi hoàn thành."
        ],
        duties: [
          "Tìm kiếm, tiếp cận khách hàng doanh nghiệp, thương hiệu và nhà phân phối có nhu cầu gia công mỹ phẩm.",
          "Tư vấn quy trình gia công OEM/ODM, công thức, bao bì và các dịch vụ liên quan của Bio-A Group.",
          "Tiếp nhận yêu cầu, phối hợp với bộ phận R&D và sản xuất để chuẩn bị đề xuất, báo giá cho khách hàng.",
          "Theo dõi tiến độ đơn hàng và giữ liên lạc với khách hàng trong suốt quá trình triển khai.",
          "Chăm sóc khách hàng hiện có, ghi nhận phản hồi và cơ hội hợp tác mới.",
          "Cập nhật thông tin khách hàng, cơ hội kinh doanh và báo cáo kết quả công việc."
        ],
        reqs: [
          "Có kinh nghiệm kinh doanh B2B; ưu tiên lĩnh vực mỹ phẩm, gia công hoặc hàng tiêu dùng.",
          "Kỹ năng giao tiếp, đàm phán và trình bày tốt.",
          "Chủ động, có trách nhiệm và phối hợp tốt với nhiều bộ phận.",
          "Sử dụng thành thạo tin học văn phòng; biết dùng phần mềm quản lý khách hàng (CRM) là lợi thế.",
          "Giao tiếp được bằng tiếng Anh là lợi thế."
        ]
      },
      en: {
        title: "B2B Sales Executive",
        desc: "Find and look after business clients who need cosmetic manufacturing, and work with R&D and production to deliver each project.",
        intro: [
          "Bio-A Group – a cosmetic and cosmeceutical manufacturing factory – supports brands with OEM/ODM cosmetic manufacturing, from formulation and packaging to finished products.",
          "The B2B Sales Executive connects business clients with the teams in the factory: understanding their needs, recommending solutions and following each project through to completion."
        ],
        duties: [
          "Find and approach companies, brands and distributors that need cosmetic manufacturing.",
          "Explain Bio-A Group's OEM/ODM process, formulation, packaging and related services.",
          "Collect client requirements and work with R&D and production to prepare proposals and quotations.",
          "Follow order progress and keep in touch with clients throughout each project.",
          "Look after existing clients, record feedback and new opportunities.",
          "Keep client and opportunity records up to date and report on results."
        ],
        reqs: [
          "Experience in B2B sales, ideally in cosmetics, contract manufacturing or consumer goods.",
          "Strong communication, negotiation and presentation skills.",
          "Proactive, responsible and comfortable working with several teams.",
          "Good office software skills; experience with a CRM is an advantage.",
          "Working English is an advantage."
        ]
      }
    }
  },
  {
    route: "/careers/cosmetic-rd-specialist/", vi: "/tuyen-dung/nhan-vien-rd-my-pham/", cat: "rd",
    image: "/assets/blog/3591cb7df74b41c8d5f337bf831c5708-6251.webp",
    t: {
      vi: {
        title: "Nhân viên R&D Mỹ phẩm",
        desc: "Nghiên cứu, thử nghiệm và hoàn thiện công thức mỹ phẩm theo định hướng sản phẩm của từng thương hiệu.",
        intro: [
          "Bộ phận R&D của Bio-A Group nghiên cứu và phát triển công thức theo định hướng của từng thương hiệu khách hàng.",
          "Nhân viên R&D Mỹ phẩm tham gia xây dựng, thử nghiệm và hoàn thiện công thức, từ mẫu thử đến khi chuyển giao sang sản xuất."
        ],
        duties: [
          "Nghiên cứu, xây dựng và điều chỉnh công thức mỹ phẩm theo yêu cầu khách hàng và định hướng sản phẩm.",
          "Tìm hiểu, đánh giá nguyên liệu và đề xuất phương án phù hợp về tính năng, cảm quan và chi phí.",
          "Thực hiện mẫu thử, theo dõi độ ổn định và ghi nhận kết quả thử nghiệm.",
          "Phối hợp với bộ phận sản xuất khi chuyển giao công thức từ mẫu thử sang sản xuất.",
          "Chuẩn bị và lưu trữ hồ sơ kỹ thuật của sản phẩm theo quy trình của nhà máy.",
          "Cập nhật xu hướng nguyên liệu và sản phẩm mỹ phẩm."
        ],
        reqs: [
          "Tốt nghiệp chuyên ngành Hóa học, Hóa mỹ phẩm, Dược, Công nghệ sinh học hoặc ngành liên quan.",
          "Có kiến thức về nguyên liệu và công thức mỹ phẩm; có kinh nghiệm R&D là lợi thế.",
          "Cẩn thận, tỉ mỉ, ghi chép và phân tích kết quả tốt.",
          "Làm việc độc lập và phối hợp nhóm hiệu quả.",
          "Đọc hiểu tài liệu chuyên ngành bằng tiếng Anh là lợi thế."
        ]
      },
      en: {
        title: "Cosmetic R&D Specialist",
        desc: "Research, test and refine cosmetic formulas that match each brand's product direction.",
        intro: [
          "Bio-A Group's R&D team researches and develops formulas that follow each client brand's product direction.",
          "The Cosmetic R&D Specialist helps build, test and refine formulas, from the first samples to the hand-over to production."
        ],
        duties: [
          "Research, build and adjust cosmetic formulas for client requirements and product direction.",
          "Study and evaluate raw materials and suggest options for performance, sensory feel and cost.",
          "Make samples, follow stability and record test results.",
          "Work with production when a formula moves from sample to manufacturing.",
          "Prepare and keep product technical files according to the factory's procedures.",
          "Follow trends in cosmetic ingredients and products."
        ],
        reqs: [
          "Degree in Chemistry, Cosmetic Chemistry, Pharmacy, Biotechnology or a related field.",
          "Knowledge of cosmetic ingredients and formulation; R&D experience is an advantage.",
          "Careful and precise, good at recording and analysing results.",
          "Able to work independently and in a team.",
          "Reading technical documents in English is an advantage."
        ]
      }
    }
  },
  {
    route: "/careers/cosmetic-production-operator/", vi: "/tuyen-dung/nhan-vien-san-xuat-my-pham/", cat: "production",
    image: "/assets/blog/geminigeneratedimagec8pv19c8pv19c8pv-4025.webp",
    t: {
      vi: {
        title: "Nhân viên Sản xuất Mỹ phẩm",
        desc: "Tham gia các công đoạn pha chế, chiết rót, đóng gói và hoàn thiện sản phẩm theo quy trình của nhà máy.",
        intro: [
          "Nhà máy Bio-A Group sản xuất mỹ phẩm theo quy trình được kiểm soát ở từng công đoạn.",
          "Nhân viên Sản xuất Mỹ phẩm tham gia các công đoạn chuẩn bị, pha chế, chiết rót, đóng gói và hoàn thiện sản phẩm."
        ],
        duties: [
          "Thực hiện các công đoạn sản xuất được phân công: chuẩn bị nguyên liệu, pha chế, chiết rót, đóng gói.",
          "Vận hành máy móc, thiết bị theo hướng dẫn và quy trình của nhà máy.",
          "Tuân thủ quy định vệ sinh, an toàn lao động và yêu cầu chất lượng trong khu vực sản xuất.",
          "Ghi chép hồ sơ sản xuất theo biểu mẫu.",
          "Phối hợp với tổ trưởng và bộ phận kiểm soát chất lượng khi có vấn đề phát sinh.",
          "Vệ sinh, sắp xếp khu vực và dụng cụ làm việc sau khi hoàn thành công việc."
        ],
        reqs: [
          "Sức khỏe tốt, cẩn thận và có ý thức tuân thủ quy trình.",
          "Có kinh nghiệm sản xuất mỹ phẩm, dược phẩm hoặc thực phẩm là lợi thế.",
          "Chịu khó học hỏi và có tinh thần làm việc nhóm."
        ]
      },
      en: {
        title: "Cosmetic Production Operator",
        desc: "Take part in mixing, filling, packing and finishing products according to the factory's procedures.",
        intro: [
          "The Bio-A Group factory manufactures cosmetics with a process that is controlled at every stage.",
          "The Cosmetic Production Operator takes part in preparation, mixing, filling, packing and finishing."
        ],
        duties: [
          "Carry out the assigned production steps: preparing materials, mixing, filling and packing.",
          "Operate machines and equipment according to instructions and the factory's procedures.",
          "Follow hygiene, workplace-safety and quality requirements in the production area.",
          "Complete production records on the standard forms.",
          "Work with the team leader and quality control when an issue comes up.",
          "Clean and organise the work area and tools after the work is done."
        ],
        reqs: [
          "Good health, careful and committed to following procedures.",
          "Experience in cosmetic, pharmaceutical or food production is an advantage.",
          "Willing to learn and a good team player."
        ]
      }
    }
  }
];

// Single path authority for Careers (used by bioa-transform localPath, Header lang links, redirects).
export const CAREER_VI_PATHS = Object.freeze(Object.fromEntries([
  ["/careers/", "/tuyen-dung/"],
  ...CAREER_JOBS.map(j => [j.route, j.vi])
]));
export const careerPath = (route, lang) => lang === "en" ? "/en" + route : (CAREER_VI_PATHS[route] || route);
export const careerRouteDefs = CAREER_JOBS.map(j => [j.route, "/careers/b2b-sales-manager/"]);
export const isCareerDetail = route => CAREER_JOBS.some(j => j.route === route);

const CATS = {
  vi: { "": "Tất cả", sales: "Kinh doanh", rd: "R&D", production: "Sản xuất" },
  en: { "": "All", sales: "Sales", rd: "R&D", production: "Production" }
};

const T = {
  vi: {
    heroTitle: "Tuyển dụng",
    heroText: "Bio-A Group là nhà máy sản xuất dược mỹ phẩm, đồng hành cùng các thương hiệu từ nghiên cứu công thức, sản xuất đến hoàn thiện sản phẩm. Trang này giới thiệu các nhóm vị trí công việc tại Bio-A Group.",
    follow: "Theo dõi trên Facebook",
    scroll: "Xem các vị trí ↓",
    eyebrow: "Vị trí công việc",
    rolesTitle: "Cùng Bio-A Group phát triển",
    rolesSub: "Thông tin tuyển dụng chính thức (thời gian, địa điểm, chế độ) sẽ được cập nhật khi vị trí được mở.",
    pending: "Chi tiết đang cập nhật",
    more: "Xem chi tiết",
    ctaTitle: "Đồng hành cùng Bio-A Group",
    ctaText: "Chưa thấy vị trí phù hợp? Hãy liên hệ Bio-A Group để được thông tin khi có đợt tuyển dụng chính thức.",
    copy: "Sao chép email", copied: "Đã sao chép!",
    back: "‹ Quay lại Tuyển dụng",
    introTitle: "Gia nhập Bio-A Group",
    duties: "Mô tả công việc", reqs: "Yêu cầu",
    benefitsTitle: "Quyền lợi",
    benefits: "Mức thu nhập, chế độ và phúc lợi của vị trí sẽ được Bio-A Group công bố cùng thông báo tuyển dụng chính thức.",
    placeTitle: "Địa điểm & hình thức làm việc",
    place: "Địa điểm, hình thức và thời gian làm việc sẽ được xác nhận khi vị trí mở tuyển chính thức.",
    applyTitle: "Cách ứng tuyển",
    apply: "Bio-A Group hiện chưa mở nhận hồ sơ trực tuyến cho vị trí này. Khi vị trí mở tuyển chính thức, cách thức ứng tuyển sẽ được cập nhật tại trang này. Bạn có thể liên hệ Bio-A Group để được thông tin thêm.",
    contact: "Liên hệ Bio-A Group",
    listTitle: "Tuyển dụng Bio-A Group",
    listDesc: "Các nhóm vị trí công việc tại Bio-A Group – Nhà Máy Sản Xuất Dược Mỹ Phẩm: kinh doanh B2B, R&D mỹ phẩm và sản xuất mỹ phẩm.",
    jobSuffix: "Tuyển dụng Bio-A Group"
  },
  en: {
    heroTitle: "Careers",
    heroText: "Bio-A Group is a cosmetic and cosmeceutical manufacturing factory that supports brands from formulation research and production to finished products. This page introduces the roles we work with at Bio-A Group.",
    follow: "Follow on Facebook",
    scroll: "See the roles ↓",
    eyebrow: "Roles",
    rolesTitle: "Grow with Bio-A Group",
    rolesSub: "Official hiring details (timing, location and terms) will be published when a role opens.",
    pending: "Details to be confirmed",
    more: "Read more",
    ctaTitle: "Work with Bio-A Group",
    ctaText: "Not seeing the right role? Contact Bio-A Group to hear about official hiring rounds.",
    copy: "Copy email", copied: "Copied!",
    back: "‹ Back to Careers",
    introTitle: "Join Bio-A Group",
    duties: "What you'll do", reqs: "What we're looking for",
    benefitsTitle: "What we offer",
    benefits: "Pay, terms and benefits for this role will be published by Bio-A Group with the official job announcement.",
    placeTitle: "Location & work type",
    place: "Location, work type and working hours will be confirmed when the role officially opens.",
    applyTitle: "How to apply",
    apply: "Bio-A Group is not accepting online applications for this role yet. When the role officially opens, the way to apply will be published on this page. You can contact Bio-A Group for more information.",
    contact: "Contact Bio-A Group",
    listTitle: "Careers at Bio-A Group",
    listDesc: "Roles at Bio-A Group, a cosmetic and cosmeceutical manufacturing factory: B2B sales, cosmetic R&D and cosmetic production.",
    jobSuffix: "Careers at Bio-A Group"
  }
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const contactsPath = lang => lang === "en" ? "/en/contacts/" : "/contacts/";

function setEmailRows($, t){
  $(".mwc-hrcard__email").attr("href", "mailto:" + BUSINESS.email).html(esc(BUSINESS.email));
  $(".mwc-copy").attr("data-copy", BUSINESS.email).attr("aria-label", t.copy);
  $(".mwc-copy__done").text(t.copied);
}

function setMeta($, title, desc){
  $("title").text(title);
  $('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr("content", desc);
  $('meta[property="og:title"],meta[name="twitter:title"]').attr("content", title);
}

// Merywood filtered through WordPress admin-ajax (merywood.com). BIO-A: the same pills filter the
// cards already on the page; the copy-email fallback below is the unchanged Merywood code.
const FILTER_JS = `(function(){
  document.addEventListener('DOMContentLoaded', function(){

    /* ----- BIO-A: local filter of the cards on this page ----- */
    var pills = document.querySelectorAll('.mwc-filter__pill');
    var grid  = document.getElementById('mwc-grid');
    if (pills.length && grid) {
      pills.forEach(function(pill){
        pill.addEventListener('click', function(){
          pills.forEach(function(p){ p.classList.remove('is-active'); p.setAttribute('aria-selected','false'); });
          pill.classList.add('is-active'); pill.setAttribute('aria-selected','true');
          var cat = pill.getAttribute('data-cat') || '';
          grid.querySelectorAll('.mwc-card').forEach(function(card){
            card.style.display = (!cat || card.getAttribute('data-cat') === cat) ? '' : 'none';
          });
        });
      });
    }

    /* ----- copy email fallback ----- */
    document.querySelectorAll('.mwc-copy').forEach(function(btn){
      btn.addEventListener('click', function(){
        var text = btn.getAttribute('data-copy') || '';
        function done(){
          var label = btn.parentNode.querySelector('.mwc-copy__done');
          if (!label) return;
          label.classList.add('is-on');
          clearTimeout(label._t);
          label._t = setTimeout(function(){ label.classList.remove('is-on'); }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function(){ legacy(); });
        } else { legacy(); }
        function legacy(){
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch(e){}
          document.body.removeChild(ta);
        }
      });
    });

  });
})();`;

function fixScripts($){
  if (!$("#mwc-script-js-after").length) throw new Error("CAREERS: Merywood #mwc-script-js-after missing");
  $("#mwc-script-js-extra").remove();           // MWC.ajax/nonce for merywood.com admin-ajax
  $("#mwc-script-js-after").html(FILTER_JS);
  $('script[src*="email-decode"]').remove();     // Cloudflare e-mail obfuscation of the Merywood mailbox
}

export function applyCareersList($, lang){
  const t = T[lang];
  if (!$(".mwc-hero3").length || !$("#mwc-grid .mwc-card").length) throw new Error("CAREERS: Merywood list DOM missing");
  $(".mwc-hero3__title").text(t.heroTitle);
  $(".mwc-hero3__text").html("<p>" + esc(t.heroText) + "</p>");
  $(".mwc-hero3__actions .btn").attr("href", BUSINESS.facebook).attr("target", "_blank").attr("rel", "noopener noreferrer")
    .find(".btn__text").text(t.follow);
  $(".mwc-hero3__scroll").text(t.scroll);
  $(".mwc-roles__eyebrow").text(t.eyebrow);
  $(".mwc-roles__title").text(t.rolesTitle);
  $(".mwc-roles__sub").text(t.rolesSub);

  const filter = $(".mwc-filter").attr("aria-label", lang === "en" ? "Filter roles" : "Lọc vị trí");
  const pillTpl = filter.find(".mwc-filter__pill").first().clone().removeClass("is-active");
  filter.empty();
  for (const cat of ["", "sales", "rd", "production"]){
    const pill = pillTpl.clone().attr("data-cat", cat).attr("type", "button").attr("role", "tab")
      .attr("aria-selected", cat ? "false" : "true").text(CATS[lang][cat]);
    if (!cat) pill.addClass("is-active");
    filter.append(pill);
  }

  const grid = $("#mwc-grid");
  const cardTpl = grid.find(".mwc-card").first().clone();
  grid.empty();
  for (const job of CAREER_JOBS){
    const j = job.t[lang];
    const card = cardTpl.clone().attr("href", careerPath(job.route, lang)).attr("data-cat", job.cat);
    card.find(".mwc-card__img").attr("style", "background-image:url('" + job.image + "');");
    card.find(".mwc-card__loc").text(t.pending).attr("data-owner-approval", "required");
    card.find(".mwc-card__tag").text(CATS[lang][job.cat]);
    card.find(".mwc-card__title").text(j.title);
    card.find(".mwc-card__desc").text(j.desc);
    card.find(".mwc-card__btn").contents().filter((_, n) => n.type === "text").first().replaceWith(t.more + " ");
    grid.append(card);
  }

  // CTA: the Merywood "M" logo artwork is a brand trace. CAREERS-CTA-LOGO (owner 2026-11-11): follow the
  // owner-approved About CTA logo (.mwa-cta__media: full BIO-A logo, contained, with breathing room) instead of
  // the source full-height edge bleed: light full logo (dark card), ~56% of the card height, inset from the right
  // edge. Mobile is unchanged: the source hides this background at <=768px with !important.
  $(".mwc-cta").attr("style", "background-image:url('/assets/bioa-full-light.svg');background-size:auto 56%;background-position:right clamp(32px,6%,88px) center;");
  $(".mwc-cta__title").text(t.ctaTitle);
  $(".mwc-cta__text").text(t.ctaText);
  setEmailRows($, t);
  fixScripts($);
  setMeta($, t.listTitle, t.listDesc);
}

export function applyCareersDetail($, route, lang){
  const job = CAREER_JOBS.find(x => x.route === route);
  if (!job) throw new Error("CAREERS: unknown job route " + route);
  const t = T[lang], j = job.t[lang];
  const single = $(".mwc-single");
  if (!single.length || single.find(".mwc-section").length < 3 || !single.find(".mwc-two__card").length)
    throw new Error("CAREERS: Merywood detail DOM missing");

  single.find(".mwc-back").attr("href", careerPath("/careers/", lang)).text(t.back);
  single.find(".mwc-single__title").text(j.title);
  single.find(".mwc-pill--outline").text(t.pending).attr("data-owner-approval", "required");
  single.find(".mwc-pill--solid").text(CATS[lang][job.cat]);

  const intro = single.find(".mwc-intro");
  intro.find("p").remove();
  intro.find(".mwc-intro__title").text(t.introTitle).after(j.intro.map(p => "<p>" + esc(p) + "</p>").join(""));

  const cards = single.find(".mwc-two__card");
  const fill = (card, title, items) => {
    $(card).find(".mwc-two__title").text(title);
    $(card).find(".mwc-list").html(items.map(li => "<li>" + esc(li) + "</li>").join(""));
  };
  fill(cards.eq(0), t.duties, j.duties);
  fill(cards.eq(1), t.reqs, j.reqs);

  // Merywood: "What we offer" (list) + "Why join" (text) + final. BIO-A: benefits + place are owner-gated text.
  const sections = single.find(".mwc-section:not(.mwc-final)");
  const setText = (sec, title, text) => {
    $(sec).attr("data-owner-approval", "required").find(".mwc-section__title").text(title);
    $(sec).children(":not(.mwc-section__title)").remove();
    $(sec).append("<p>" + esc(text) + "</p>");
  };
  setText(sections.eq(0), t.benefitsTitle, t.benefits);
  setText(sections.eq(1), t.placeTitle, t.place);
  sections.slice(2).remove();

  const fin = single.find(".mwc-final").attr("data-owner-approval", "required");
  fin.find(".mwc-section__title").text(t.applyTitle);
  fin.find("p").remove();
  fin.find(".mwc-final__emailrow").remove(); // the contact e-mail is already in the page head
  fin.find(".mwc-section__title").after("<p>" + esc(t.apply) + "</p>" +
    '<a class="btn mwc-final__btn" href="' + contactsPath(lang) + '"><span class="btn__text">' + esc(t.contact) +
    '</span><i class="icon btn__icon arrow"></i></a>');

  // Merywood people (names, photos, LinkedIn) and the "what to send" application box are removed:
  // they are another company's staff and BIO-A has no confirmed application channel.
  single.find(".mwc-talk").remove();
  setEmailRows($, t);
  fixScripts($);
  setMeta($, j.title + " | " + t.jobSuffix, j.desc);
}
