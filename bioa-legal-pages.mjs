// LEGAL-B1 (owner directive 2026-11-11): Privacy / Cookie pages no longer publish Merywood's Estonian
// policy ("Bio-A Group OÜ, Reg no. 16386898, Tallinn", Estonian DPA). The text below describes ONLY what the
// BIO-A site actually does, verified in code on 2026-11-11:
//   - assets/js/bioa-leads.js sends {submission_id, name, contact, interest, consent, locale, page_path,
//     website (honeypot), turnstile_token} to /api/lead (no UTM, no free text);
//   - functions/api/lead.js stores it in Cloudflare D1 with an HMAC hash of the IP (never the raw IP), and
//     optionally copies it to Google Sheets and sends an internal Resend e-mail; Turnstile verifies the form;
//   - browser storage: localStorage mw_consent_v2 / bioa_cookie_decided_v1, sessionStorage is_first_visit,
//     initial_referrer, landing_page, utm_* (read by the form script, never sent to /api/lead);
//   - third parties loaded: Google Fonts, Cloudflare Turnstile, cdnjs (intl-tel-input), get.geojs.io, Google
//     Maps (Contacts), and an external host for some images/theme files (merywood.com, owner gate D2/D4/OD-5:
//     named generically on the public page; the line goes once those files are self-hosted or replaced);
//   - the chat window is a local preview: messages are not sent or stored.
// Identity comes from bioa-business.mjs. No legal entity type, registration number, law, authority or
// retention period has been invented. Wording still needs owner/legal approval before Production (OD-1/OD-2).
import { BUSINESS as B } from "./bioa-business.mjs";

const UPDATED = { vi: "11/11/2026", en: "11 November 2026" };
const mail = `<a href="mailto:${B.email}">${B.email}</a>`;
const tel = `<a href="${B.phoneHref}">${B.phone}</a>`;

const T = {
  privacy: {
    vi: { title: "Chính Sách Bảo Mật", sections: [
      ["1. Phạm vi áp dụng", [`Chính sách này mô tả cách ${B.brand} (${B.tradeNameVi}, mã số thuế ${B.taxId}, địa chỉ ${B.addressVi}) thu thập và sử dụng thông tin cá nhân khi bạn truy cập website ${B.domain.replace("https://", "")} và gửi yêu cầu tư vấn.`]],
      ["2. Thông tin chúng tôi thu thập", [
        "Khi bạn gửi biểu mẫu «Nhận tư vấn», chúng tôi nhận: họ tên; số điện thoại hoặc email bạn cung cấp; các sản phẩm, dịch vụ bạn chọn; ngôn ngữ và đường dẫn trang bạn gửi; thời điểm bạn đồng ý gửi thông tin.",
        "Để chống gửi tự động, chúng tôi chỉ lưu một mã băm không thể đảo ngược của địa chỉ IP, không lưu địa chỉ IP gốc. Website không thu thập giấy tờ tùy thân hay thông tin thanh toán."]],
      ["3. Mục đích sử dụng", ["Liên hệ lại để tư vấn, báo giá và trao đổi về dự án gia công; quản lý các yêu cầu đã nhận; ngăn chặn thư rác và gửi biểu mẫu tự động."]],
      ["4. Nơi lưu trữ và đơn vị hỗ trợ", [
        "Thông tin được lưu trên Cloudflare (cơ sở dữ liệu D1). Biểu mẫu được bảo vệ bằng Cloudflare Turnstile. Bio-A Group có thể sao chép yêu cầu sang Google Sheets để theo dõi nội bộ và nhận email thông báo nội bộ qua dịch vụ Resend.",
        "Chúng tôi không bán và không chia sẻ thông tin của bạn cho bên khác vì mục đích quảng cáo."]],
      ["5. Thời gian lưu trữ", ["Thông tin được lưu trong thời gian cần thiết để xử lý yêu cầu và trao đổi với bạn, hoặc cho đến khi bạn yêu cầu xóa."]],
      ["6. Quyền của bạn", [`Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin đã gửi, hoặc rút lại sự đồng ý, bằng cách gửi email tới ${mail} hoặc gọi ${tel}.`]],
      ["7. Khung chat trên website", ["Khung chat hiện chưa kết nối tư vấn viên: tin nhắn bạn gõ không được gửi đi hoặc lưu trên máy chủ. Để được hỗ trợ, vui lòng dùng Zalo, hotline hoặc biểu mẫu."]],
      ["8. Cookie và dịch vụ bên thứ ba", [`Xem <a href="/cookie-policy/">Chính Sách Cookie</a>.`]],
      ["9. Liên hệ", [`${B.tradeNameVi} · ${B.addressVi} · Email: ${mail} · Hotline: ${tel}`, `Cập nhật: ${UPDATED.vi}.`]]
    ]},
    en: { title: "Privacy Policy", sections: [
      ["1. Scope", [`This policy explains how ${B.brand} (${B.tradeNameEn}, tax code ${B.taxId}, address ${B.addressEn}) collects and uses personal information when you visit ${B.domain.replace("https://", "")} and send an enquiry.`]],
      ["2. Information we collect", [
        "When you submit the «Get a quote» form we receive: your name; the phone number or e-mail address you provide; the products or services you select; the language and page from which you sent it; the time you gave your consent.",
        "To stop automated submissions we store only an irreversible hash of your IP address, never the IP address itself. The website does not collect identity documents or payment information."]],
      ["3. Why we use it", ["To contact you with advice, quotes and project discussions; to manage the enquiries we receive; to prevent spam and automated form submissions."]],
      ["4. Where it is stored and who helps us", [
        "Your enquiry is stored on Cloudflare (D1 database). The form is protected by Cloudflare Turnstile. Bio-A Group may copy enquiries to Google Sheets for internal follow-up and receive internal notification e-mails through Resend.",
        "We do not sell your information or share it with others for advertising."]],
      ["5. How long we keep it", ["For as long as needed to handle your enquiry and keep in touch with you, or until you ask us to delete it."]],
      ["6. Your rights", [`You can ask to see, correct or delete the information you sent, or withdraw your consent, by e-mailing ${mail} or calling ${tel}.`]],
      ["7. Website chat", ["The chat window is not yet connected to an advisor: messages you type are not sent or stored on a server. Please use Zalo, our hotline or the form for help."]],
      ["8. Cookies and third-party services", [`See the <a href="/en/cookie-policy/">Cookie Policy</a>.`]],
      ["9. Contact", [`${B.tradeNameEn} · ${B.addressEn} · E-mail: ${mail} · Hotline: ${tel}`, `Last updated: ${UPDATED.en}.`]]
    ]}
  },
  cookie: {
    vi: { title: "Chính Sách Cookie", sections: [
      ["1. Tóm tắt", [`Website ${B.domain.replace("https://", "")} không dùng cookie quảng cáo hoặc công cụ theo dõi hành vi. Chúng tôi chỉ lưu một số thông tin nhỏ trên trình duyệt của bạn để website hoạt động.`]],
      ["2. Thông tin lưu trên trình duyệt", [
        "<strong>Lựa chọn cookie</strong> (localStorage <code>mw_consent_v2</code>, <code>bioa_cookie_decided_v1</code>): ghi nhớ lựa chọn của bạn trong hộp «Quản Lý Cookie» để không hỏi lại.",
        "<strong>Thông tin phiên truy cập</strong> (sessionStorage <code>is_first_visit</code>, <code>initial_referrer</code>, <code>landing_page</code>, <code>utm_*</code>): trang bạn đến từ đâu trong phiên hiện tại; tự xóa khi đóng tab và không được gửi kèm biểu mẫu tư vấn."]],
      ["3. Dịch vụ bên thứ ba", [
        "Khi bạn xem website, trình duyệt có thể tải nội dung từ các dịch vụ sau. Các dịch vụ này nhận địa chỉ IP của bạn và có thể đặt cookie theo chính sách riêng của họ:",
        "Google Fonts (phông chữ); Cloudflare Turnstile (chống thư rác ở biểu mẫu); cdnjs (thư viện nhập số điện thoại); get.geojs.io (gợi ý mã quốc gia cho số điện thoại); Google Maps (bản đồ trên trang Liên hệ); một máy chủ bên ngoài lưu trữ một số hình ảnh và tệp giao diện của website."]],
      ["4. Quản lý lựa chọn", ["Bạn có thể thay đổi lựa chọn bất cứ lúc nào qua nút «Quản Lý Cookie», hoặc xóa dữ liệu website trong cài đặt trình duyệt."]],
      ["5. Liên hệ", [`Mọi câu hỏi về cookie và dữ liệu cá nhân: ${mail} · ${tel}. Xem thêm <a href="/privacy-policy/">Chính Sách Bảo Mật</a>.`, `Cập nhật: ${UPDATED.vi}.`]]
    ]},
    en: { title: "Cookie Policy", sections: [
      ["1. Summary", [`${B.domain.replace("https://", "")} does not use advertising cookies or behavioural tracking. We only keep a few small items in your browser so the website works.`]],
      ["2. What is stored in your browser", [
        "<strong>Cookie choice</strong> (localStorage <code>mw_consent_v2</code>, <code>bioa_cookie_decided_v1</code>): remembers your choice in «Cookie settings» so we do not ask again.",
        "<strong>Visit information</strong> (sessionStorage <code>is_first_visit</code>, <code>initial_referrer</code>, <code>landing_page</code>, <code>utm_*</code>): where you arrived from in the current visit; cleared when you close the tab and not sent with the enquiry form."]],
      ["3. Third-party services", [
        "While you browse, your browser may load content from the services below. They receive your IP address and may set cookies under their own policies:",
        "Google Fonts (fonts); Cloudflare Turnstile (form spam protection); cdnjs (phone-number input library); get.geojs.io (country code suggestion for phone numbers); Google Maps (map on the Contacts page); an external server that hosts some of the website's images and theme files."]],
      ["4. Managing your choice", ["You can change your choice at any time with «Cookie settings», or clear this website's data in your browser settings."]],
      ["5. Contact", [`Questions about cookies or personal data: ${mail} · ${tel}. See also the <a href="/en/privacy-policy/">Privacy Policy</a>.`, `Last updated: ${UPDATED.en}.`]]
    ]}
  }
};

export function applyLegalPages($, route, lang){
  const kind = route === "/privacy-policy/" ? "privacy" : route === "/cookie-policy/" ? "cookie" : null;
  if (!kind) return;
  const wrap = $(".wysiwyg-wrapper section.policy-wrapper").first();
  if (!wrap.length) throw new Error("LEGAL-B1: policy-wrapper not found on " + route);
  const t = T[kind][lang === "en" ? "en" : "vi"];
  // Same source classes as the Merywood policy markup, so the owner-approved page layout is unchanged.
  let html = `<h1 class="policy-title">${t.title}</h1>`;
  for (const [h, ps] of t.sections){
    html += `<h2 class="policy-subtitle">${h}</h2>`;
    for (const p of ps) html += `<p class="policy-text">${p}</p>`;
  }
  wrap.html(html);
  // Fail closed: no Estonian/Merywood entity data may remain anywhere on the page.
  const text = $("body").text();
  if (/16386898|Tallinn|Estonia|Narva mnt|Kesklinna|Andmekaitse|\bOÜ\b/i.test(text)) throw new Error("LEGAL-B1: Estonian entity data still present on " + route);
}
