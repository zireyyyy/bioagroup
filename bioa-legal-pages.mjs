// LEGAL-B2 (owner 2026-11-11, "FINAL DELIVERY + CONTENT COMPLETION"): Privacy / Cookie rewritten for a
// Vietnamese controller under Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (in force 01/01/2026) and Nghị định
// 356/2025/NĐ-CP of 31/12/2025, read from the official Công báo texts. Presentation follows the Merywood
// policy article (h1.policy-title, h2.policy-subtitle, numbered p.policy-text clauses with <br> lists; the
// source CSS is unchanged). Facts verified in this repository and in a browser inventory on 2026-11-11:
//   - the quote form sends name, phone/e-mail, selected products/services, language, page, consent time;
//     functions/api/lead.js keeps an HMAC hash of the IP (never the raw IP), Turnstile verifies the form;
//     deliveries: Cloudflare D1 (source of truth), optional Google Sheets copy, optional Resend e-mail;
//   - browser storage (described in plain words on the page, R24OX COOKIE-WORDING-1): localStorage
//     mw_consent_v2 / bioa_cookie_decided_v1 (after a cookie choice),
//     sessionStorage is_first_visit / initial_referrer / landing_page (never sent to the server); no HTTP
//     cookies are set by the site itself; no analytics/advertising script is loaded;
//   - third parties contacted: Google Fonts, Cloudflare (hosting, Turnstile, cdnjs), get.geojs.io, Google Maps
//     (Contacts), an external image host (described generically until those images are replaced);
//   - the chat window is a local preview; Careers has no online application.
// Identity comes from bioa-business.mjs. Not invented: registered legal name, retention periods, DPO. Those
// and the provider list at go-live are owner decisions (docs/LEGAL_POLICY_APPROVAL.md) before Production.
import { BUSINESS as B } from "./bioa-business.mjs";

const UPDATED = { vi: "12/11/2026", en: "12 November 2026" };
const mail = `<a href="mailto:${B.email}">${B.email}</a>`;
const tel = `<a href="${B.phoneHref}">${B.phone}</a>`;
const site = B.domain.replace("https://", "");
const L = "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15";
const D = "Nghị định số 356/2025/NĐ-CP";
const LE = "Personal Data Protection Law No. 91/2025/QH15";
const DE = "Decree No. 356/2025/ND-CP";

// R24OY LEGAL-B3 (owner 2026-11-12): only what a visitor in Vietnam needs — who we are, what we collect, why,
// sharing, retention, rights, contact; cookies in plain words. No provider-by-provider list, no storage keys, no
// infrastructure detail. Categories of recipients and possible processing abroad stay disclosed (Đ.9, Đ.20).
const T = {
  privacy: {
    vi: { title: "Chính sách bảo mật", lead: `Cập nhật lần cuối: ${UPDATED.vi}.`, sections: [
      ["1. Thông tin chung", [
        `1.1. Chính sách này cho biết cách ${B.brand} (${B.tradeNameVi}, mã số thuế ${B.taxId}, địa chỉ: ${B.addressVi}) thu thập và sử dụng dữ liệu cá nhân khi bạn sử dụng website ${site}.`,
        `1.2. Chính sách được xây dựng căn cứ ${L}, ${D} và các quy định pháp luật có liên quan.`]],
      ["2. Dữ liệu chúng tôi thu thập", [
        "2.1. Thông tin bạn gửi qua biểu mẫu tư vấn: họ tên, số điện thoại hoặc email, sản phẩm/dịch vụ bạn quan tâm.",
        "2.2. Thông tin kỹ thuật cần thiết để bảo vệ website khỏi thư rác (địa chỉ IP được mã hóa một chiều, không lưu ở dạng gốc).",
        "2.3. Thông tin bạn chủ động cung cấp khi liên hệ qua email, điện thoại hoặc các kênh nhắn tin.",
        "2.4. Chúng tôi không yêu cầu dữ liệu cá nhân nhạy cảm; vui lòng không gửi các thông tin này qua website."]],
      ["3. Mục đích sử dụng", [
        "3.1. Liên hệ, tư vấn và báo giá theo yêu cầu của bạn; quản lý các yêu cầu đã nhận; bảo vệ website; thực hiện nghĩa vụ theo quy định của pháp luật.",
        "3.2. Dữ liệu chỉ được thu thập khi bạn đánh dấu đồng ý và gửi biểu mẫu. Bạn có thể rút lại sự đồng ý bất cứ lúc nào; việc này không ảnh hưởng đến hoạt động xử lý đã thực hiện trước đó."]],
      ["4. Chia sẻ dữ liệu", [
        "4.1. Chúng tôi không mua bán dữ liệu cá nhân và không dùng dữ liệu cho quảng cáo.",
        "4.2. Dữ liệu chỉ được chia sẻ trong phạm vi cần thiết với các đơn vị cung cấp dịch vụ hỗ trợ vận hành website và xử lý yêu cầu (lưu trữ, bảo mật, gửi email, công cụ quản lý nội bộ). Một số đơn vị này có máy chủ đặt ngoài Việt Nam.",
        "4.3. Dữ liệu có thể được cung cấp cho cơ quan nhà nước có thẩm quyền khi pháp luật yêu cầu."]],
      ["5. Thời gian lưu trữ", [
        "5.1. Dữ liệu được lưu trong thời gian cần thiết để tư vấn và hợp tác với bạn, hoặc lâu hơn khi pháp luật yêu cầu; sau đó được xóa hoặc hủy an toàn."]],
      ["6. Quyền của bạn", [
        "6.1. Bạn có quyền được biết về việc xử lý dữ liệu; đồng ý hoặc rút lại sự đồng ý; xem, chỉnh sửa, yêu cầu xóa hoặc hạn chế xử lý dữ liệu; phản đối việc xử lý; khiếu nại theo quy định của pháp luật.",
        `6.2. Để thực hiện các quyền này, vui lòng gửi email tới ${mail} hoặc gọi ${tel}. Chúng tôi sẽ phản hồi trong 02 ngày làm việc và xử lý trong thời hạn pháp luật quy định.`]],
      ["7. Bảo mật", [
        "7.1. Chúng tôi áp dụng các biện pháp quản lý và kỹ thuật phù hợp để bảo vệ dữ liệu. Không có phương thức truyền tải hay lưu trữ nào an toàn tuyệt đối; khi có sự cố, chúng tôi sẽ thông báo theo quy định của pháp luật."]],
      ["8. Liên hệ", [
        `8.1. ${B.tradeNameVi} · ${B.addressVi} · Email: ${mail} · Hotline: ${tel}.`,
        `8.2. Thông tin về cookie: xem <a href="/cookie-policy/">Chính sách cookie</a>. Chính sách có thể được cập nhật; ngày cập nhật được ghi ở đầu trang.`]]
    ]},
    en: { title: "Privacy Policy", lead: `Last updated: ${UPDATED.en}.`, sections: [
      ["1. GENERAL INFORMATION", [
        `1.1. This policy explains how ${B.brand} (${B.tradeNameEn}, tax code ${B.taxId}, address: ${B.addressEn}) collects and uses personal data when you use ${site}.`,
        `1.2. It is based on Vietnam's ${LE}, ${DE} and other applicable regulations.`]],
      ["2. DATA WE COLLECT", [
        "2.1. What you send through the enquiry form: your name, phone number or e-mail address and the products/services you are interested in.",
        "2.2. Technical information needed to protect the website against spam (your IP address is stored only in a one-way encrypted form).",
        "2.3. Information you choose to share when you contact us by e-mail, phone or messaging channels.",
        "2.4. We do not ask for sensitive personal data; please do not send it through the website."]],
      ["3. HOW WE USE IT", [
        "3.1. To contact you, give advice and quotes; to manage the enquiries we receive; to protect the website; to meet our legal obligations.",
        "3.2. Data is collected only when you tick the consent box and submit the form. You can withdraw your consent at any time; this does not affect processing carried out before."]],
      ["4. SHARING", [
        "4.1. We do not sell personal data and do not use it for advertising.",
        "4.2. Data is shared only as needed with service providers that help us run the website and handle enquiries (hosting, security, e-mail, internal management tools). Some of them operate servers outside Vietnam.",
        "4.3. Data may be provided to competent state authorities when required by law."]],
      ["5. RETENTION", [
        "5.1. Data is kept for as long as needed to advise and work with you, or longer where the law requires; it is then securely deleted."]],
      ["6. YOUR RIGHTS", [
        "6.1. You have the right to be informed about the processing; to give or withdraw consent; to access, correct, request deletion of or restrict the processing of your data; to object; and to complain as provided by law.",
        `6.2. To exercise these rights, e-mail ${mail} or call ${tel}. We reply within 2 working days and handle the request within the time limits set by law.`]],
      ["7. SECURITY", [
        "7.1. We apply appropriate organisational and technical measures to protect your data. No method of transmission or storage is completely secure; if an incident occurs, we will notify it as required by law."]],
      ["8. CONTACT", [
        `8.1. ${B.tradeNameEn} · ${B.addressEn} · E-mail: ${mail} · Hotline: ${tel}.`,
        `8.2. For cookies, see the <a href="/en/cookie-policy/">Cookie Policy</a>. This policy may be updated; the date at the top of the page shows the latest version.`]]
    ]}
  },
  cookie: {
    vi: { title: "Chính sách cookie", lead: `Cập nhật lần cuối: ${UPDATED.vi}.`, sections: [
      ["1. Cookie là gì", [
        `1.1. Cookie và các công nghệ tương tự là dữ liệu nhỏ được lưu trên trình duyệt của bạn khi truy cập website ${site}.`]],
      ["2. Website sử dụng cookie như thế nào", [
        "2.1. Website chỉ lưu những thông tin cần thiết để hoạt động ổn định: lựa chọn cookie của bạn (để không hỏi lại mỗi lần truy cập) và một số thông tin về phiên truy cập hiện tại.",
        "2.2. Website hiện không sử dụng cookie thống kê hay quảng cáo. Nếu sau này sử dụng, chúng tôi sẽ cập nhật chính sách và chỉ kích hoạt khi bạn đồng ý."]],
      ["3. Dịch vụ bên thứ ba", [
        "3.1. Một số tính năng như phông chữ, bản đồ và kiểm tra chống thư rác do đối tác cung cấp (ví dụ Google, Cloudflare); các dịch vụ này có thể sử dụng cookie theo chính sách riêng của họ."]],
      ["4. Quản lý lựa chọn", [
        "4.1. Bạn có thể thay đổi lựa chọn bất cứ lúc nào qua biểu tượng cookie trên website, hoặc xóa dữ liệu website trong cài đặt trình duyệt.",
        `4.2. Mọi câu hỏi về cookie và dữ liệu cá nhân: ${mail} · ${tel}. Xem thêm <a href="/privacy-policy/">Chính sách bảo mật</a>.`]]
    ]},
    en: { title: "Cookie Policy", lead: `Last updated: ${UPDATED.en}.`, sections: [
      ["1. WHAT COOKIES ARE", [
        `1.1. Cookies and similar technologies are small pieces of data stored in your browser when you visit ${site}.`]],
      ["2. HOW THE WEBSITE USES THEM", [
        "2.1. The website only keeps what it needs to work smoothly: your cookie choice (so we do not ask again on every visit) and some information about your current visit.",
        "2.2. The website does not currently use analytics or advertising cookies. If we start using them, we will update this policy and enable them only with your consent."]],
      ["3. THIRD-PARTY SERVICES", [
        "3.1. Some features, such as fonts, maps and spam protection, are provided by partners (for example Google and Cloudflare); these services may use cookies under their own policies."]],
      ["4. MANAGING YOUR CHOICE", [
        "4.1. You can change your choice at any time with the cookie icon on the website, or clear this website's data in your browser settings.",
        `4.2. Questions about cookies or personal data: ${mail} · ${tel}. See also the <a href="/en/privacy-policy/">Privacy Policy</a>.`]]
    ]}
  }
};

export function applyLegalPages($, route, lang){
  const kind = route === "/privacy-policy/" ? "privacy" : route === "/cookie-policy/" ? "cookie" : null;
  if (!kind) return;
  const wrap = $(".wysiwyg-wrapper section.policy-wrapper").first();
  if (!wrap.length) throw new Error("LEGAL-B2: policy-wrapper not found on " + route);
  const t = T[kind][lang === "en" ? "en" : "vi"];
  // Same source classes and article pattern as the Merywood policy markup (numbered p.policy-text clauses).
  let html = `<h1 class="policy-title">${t.title}</h1><p class="policy-text">${t.lead}</p>`;
  for (const [h, ps] of t.sections){
    html += `<h2 class="policy-subtitle">${h}</h2>`;
    for (const p of ps) html += `<p class="policy-text">${p}</p>`;
  }
  wrap.html(html);
  // Fail closed: no Estonian/Merywood entity data or EU-law text may remain anywhere on the page.
  const text = $("body").text();
  if (/16386898|Tallinn|Estonia|Narva mnt|Kesklinna|Andmekaitse|\bOÜ\b|GDPR/i.test(text)) throw new Error("LEGAL-B2: Estonian/EU entity or law text still present on " + route);
}
