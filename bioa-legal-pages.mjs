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
const br = items => items.map(i => "<br>– " + i).join("");

const T = {
  privacy: {
    vi: { title: "Chính sách bảo mật", lead: `Cập nhật lần cuối: ${UPDATED.vi}.`, sections: [
      ["1. Thông tin chung", [
        `1.1. Chính sách này giải thích cách ${B.brand} (${B.tradeNameVi}, mã số thuế ${B.taxId}, địa chỉ: ${B.addressVi}; sau đây gọi là «${B.brand}» hoặc «chúng tôi») thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân khi bạn sử dụng website ${site}.`,
        `1.2. Chính sách được xây dựng căn cứ ${L}, ${D} ngày 31/12/2025 của Chính phủ và các quy định pháp luật có liên quan.`,
        `1.3. Đối với dữ liệu thu thập qua website, ${B.brand} là bên kiểm soát và xử lý dữ liệu cá nhân: chúng tôi quyết định mục đích, phương tiện và trực tiếp xử lý dữ liệu, có sử dụng các nhà cung cấp dịch vụ nêu tại Mục 5.`]],
      ["2. Dữ liệu chúng tôi thu thập", [
        "2.1. Khi bạn gửi biểu mẫu «Nhận tư vấn»: họ tên; số điện thoại hoặc email; sản phẩm, dịch vụ bạn quan tâm; ngôn ngữ và trang bạn gửi biểu mẫu; thời điểm bạn đồng ý.",
        "2.2. Để chống thư rác và gửi tự động: một mã băm không thể đảo ngược của địa chỉ IP (chúng tôi không lưu địa chỉ IP gốc) và kết quả kiểm tra bảo mật Cloudflare Turnstile. Khi kiểm tra, Cloudflare xử lý một số thông tin kỹ thuật của trình duyệt và thiết bị.",
        "2.3. Khi bạn liên hệ qua email, điện thoại, Zalo, WhatsApp, Telegram hoặc Facebook: thông tin bạn chủ động cung cấp trong nội dung trao đổi.",
        "2.4. Website không yêu cầu dữ liệu cá nhân nhạy cảm (ví dụ: sức khỏe, tài chính, giấy tờ tùy thân). Vui lòng không gửi các thông tin này qua biểu mẫu hoặc khung chat.",
        "2.5. Khung chat trên website hiện chưa kết nối tư vấn viên: tin nhắn bạn nhập không được gửi đi và không được lưu trên máy chủ."]],
      ["3. Mục đích xử lý", [
        "3.1. Chúng tôi xử lý dữ liệu để:" + br([
          "liên hệ lại, tư vấn, báo giá và trao đổi về nhu cầu gia công của bạn;",
          "quản lý và theo dõi các yêu cầu đã nhận;",
          "bảo vệ website và biểu mẫu khỏi thư rác, gửi tự động và truy cập trái phép;",
          "thực hiện nghĩa vụ theo quy định của pháp luật."]),
        "3.2. Chúng tôi không dùng dữ liệu cho mục đích khác khi chưa có sự đồng ý của bạn, không mua bán dữ liệu cá nhân và không dùng dữ liệu cho dịch vụ quảng cáo."]],
      ["4. Sự đồng ý", [
        "4.1. Dữ liệu tại Mục 2.1 và 2.2 chỉ được thu thập khi bạn chủ động đánh dấu ô đồng ý và gửi biểu mẫu. Sự im lặng hoặc không phản hồi không được coi là đồng ý.",
        "4.2. Sự đồng ý có hiệu lực cho đến khi bạn rút lại hoặc theo quy định của pháp luật. Việc rút lại không ảnh hưởng đến hoạt động xử lý đã thực hiện trước thời điểm bạn yêu cầu.",
        `4.3. Trong các trường hợp pháp luật quy định (Điều 19 ${L}), dữ liệu có thể được xử lý mà không cần sự đồng ý, ví dụ theo yêu cầu của cơ quan nhà nước có thẩm quyền.`]],
      ["5. Nhà cung cấp dịch vụ và chuyển dữ liệu", [
        "5.1. Chúng tôi sử dụng các nhà cung cấp sau để vận hành website và xử lý yêu cầu:" + br([
          "Cloudflare: lưu trữ website và dữ liệu yêu cầu tư vấn, kiểm tra bảo mật biểu mẫu (Turnstile), phân phối thư viện mã nguồn mở (cdnjs);",
          "Google: phông chữ (Google Fonts), bản đồ tại trang Liên hệ (Google Maps), bảng tính nội bộ để theo dõi yêu cầu (Google Sheets);",
          "Resend: gửi email thông báo nội bộ khi có yêu cầu mới;",
          "GeoJS: xác định quốc gia từ địa chỉ IP để gợi ý mã vùng trong ô số điện thoại;",
          "một máy chủ bên ngoài đang lưu một số hình ảnh và biểu tượng của website."]),
        "5.2. Mỗi nhà cung cấp chỉ nhận dữ liệu cần cho dịch vụ của mình: các dịch vụ phông chữ, bản đồ, thư viện, GeoJS và máy chủ hình ảnh nhận địa chỉ IP và thông tin kỹ thuật của trình duyệt khi trang được tải; dữ liệu biểu mẫu được lưu tại Cloudflare và chỉ chuyển sang Google Sheets, Resend để phục vụ việc theo dõi nội bộ.",
        `5.3. Hạ tầng của các nhà cung cấp trên có thể đặt ngoài lãnh thổ Việt Nam; vì vậy dữ liệu có thể được lưu trữ, xử lý ở nước ngoài (chuyển dữ liệu cá nhân xuyên biên giới theo Điều 20 ${L}).`,
        "5.4. Dữ liệu có thể được cung cấp cho cơ quan nhà nước có thẩm quyền khi pháp luật yêu cầu."]],
      ["6. Thời gian lưu trữ", [
        "6.1. Dữ liệu được lưu trong khoảng thời gian phù hợp với mục đích xử lý: trong thời gian trao đổi, tư vấn và hợp tác với bạn, hoặc lâu hơn khi pháp luật yêu cầu.",
        "6.2. Khi đã hoàn thành mục đích, khi bạn yêu cầu xóa hợp lệ hoặc khi hết thời hạn lưu trữ, dữ liệu được xóa, hủy hoặc khử nhận dạng bằng biện pháp an toàn, trừ trường hợp pháp luật có quy định khác."]],
      ["7. Quyền của bạn", [
        `7.1. Theo Điều 4 ${L}, bạn có quyền:` + br([
          "được biết về hoạt động xử lý dữ liệu cá nhân của mình;",
          "đồng ý hoặc không đồng ý, yêu cầu rút lại sự đồng ý;",
          "xem, chỉnh sửa hoặc yêu cầu chỉnh sửa dữ liệu;",
          "yêu cầu cung cấp, xóa, hạn chế xử lý dữ liệu; phản đối việc xử lý dữ liệu;",
          "khiếu nại, tố cáo, khởi kiện, yêu cầu bồi thường thiệt hại theo quy định của pháp luật;",
          "yêu cầu cơ quan có thẩm quyền hoặc tổ chức, cá nhân liên quan thực hiện biện pháp bảo vệ dữ liệu cá nhân của mình."]),
        `7.2. Cách gửi yêu cầu: gửi email tới ${mail} với tiêu đề «Yêu cầu về dữ liệu cá nhân», nêu rõ nội dung yêu cầu và thông tin liên hệ bạn đã dùng khi gửi biểu mẫu để chúng tôi xác định đúng dữ liệu. Bạn cũng có thể gọi ${tel} để được hướng dẫn. Yêu cầu rút lại sự đồng ý hoặc hạn chế xử lý cần được thể hiện bằng văn bản, bao gồm cả dạng điện tử.`,
        `7.3. Chúng tôi phản hồi trong 02 ngày làm việc và thực hiện yêu cầu trong thời hạn quy định tại Điều 5 ${D}. Nếu không thể thực hiện, chẳng hạn khi pháp luật yêu cầu tiếp tục lưu trữ, chúng tôi sẽ thông báo lý do cho bạn.`]],
      ["8. Bảo vệ dữ liệu", [
        "8.1. Chúng tôi áp dụng các biện pháp quản lý và kỹ thuật phù hợp, gồm: kết nối mã hóa HTTPS, giới hạn quyền truy cập dữ liệu, không lưu địa chỉ IP gốc và kiểm tra chống gửi tự động.",
        `8.2. Không có phương thức truyền tải hay lưu trữ nào an toàn tuyệt đối. Khi xảy ra vi phạm quy định về bảo vệ dữ liệu cá nhân, chúng tôi sẽ thông báo theo Điều 23 ${L}.`]],
      ["9. Tuyển dụng và trẻ em", [
        `9.1. ${B.brand} chưa nhận hồ sơ ứng tuyển trực tuyến qua website. Nếu bạn chủ động gửi thông tin ứng tuyển qua email, thông tin chỉ được dùng cho mục đích tuyển dụng và được xóa, hủy nếu không tuyển dụng, trừ khi có thỏa thuận khác với bạn.`,
        "9.2. Website dành cho khách hàng là tổ chức, doanh nghiệp và không chủ đích thu thập dữ liệu cá nhân của trẻ em."]],
      ["10. Cập nhật và liên hệ", [
        `10.1. Chính sách có thể được cập nhật khi hoạt động xử lý dữ liệu hoặc quy định pháp luật thay đổi; ngày cập nhật được ghi ở đầu trang. Thông tin về cookie xem tại <a href="/cookie-policy/">Chính sách cookie</a>.`,
        `10.2. Liên hệ: ${B.tradeNameVi} · ${B.addressVi} · Email: ${mail} · Hotline: ${tel}.`]]
    ]},
    en: { title: "Privacy Policy", lead: `Last updated: ${UPDATED.en}.`, sections: [
      ["1. GENERAL INFORMATION", [
        `1.1. This policy explains how ${B.brand} (${B.tradeNameEn}, tax code ${B.taxId}, address: ${B.addressEn}; "${B.brand}" or "we") collects, uses, stores and protects personal data when you use ${site}.`,
        `1.2. It is based on Vietnam's ${LE}, Government ${DE} of 31 December 2025 and other applicable regulations.`,
        `1.3. For data collected through the website, ${B.brand} is the personal data controller and processor: we decide the purposes and means of processing and process the data ourselves, using the service providers listed in Section 5.`]],
      ["2. DATA WE COLLECT", [
        "2.1. When you submit the «Get a quote» form: your name; phone number or e-mail address; the products or services you are interested in; the language and page you sent the form from; the time you gave your consent.",
        "2.2. To prevent spam and automated submissions: an irreversible hash of your IP address (we do not store the IP address itself) and the result of the Cloudflare Turnstile security check. During the check, Cloudflare processes some technical information about your browser and device.",
        "2.3. When you contact us by e-mail, phone, Zalo, WhatsApp, Telegram or Facebook: the information you choose to share in that conversation.",
        "2.4. The website does not ask for sensitive personal data (for example health, financial or identity-document data). Please do not send such information through the form or the chat window.",
        "2.5. The chat window is not yet connected to an advisor: messages you type are not sent anywhere or stored on a server."]],
      ["3. PURPOSES OF PROCESSING", [
        "3.1. We process data to:" + br([
          "contact you, give advice and quotes and discuss your manufacturing needs;",
          "manage and follow up the enquiries we receive;",
          "protect the website and the form against spam, automated submissions and unauthorised access;",
          "meet our legal obligations."]),
        "3.2. We do not use your data for other purposes without your consent, we do not buy or sell personal data and we do not use it for advertising services."]],
      ["4. CONSENT", [
        "4.1. The data in Sections 2.1 and 2.2 is collected only when you tick the consent box and submit the form. Silence or no response is not consent.",
        "4.2. Your consent remains valid until you withdraw it or as provided by law. Withdrawal does not affect processing carried out before your request.",
        `4.3. In the cases provided by law (Article 19 of the ${LE}), data may be processed without consent, for example at the request of a competent state authority.`]],
      ["5. SERVICE PROVIDERS AND DATA TRANSFERS", [
        "5.1. We use the following providers to run the website and handle enquiries:" + br([
          "Cloudflare: website and enquiry data hosting, the form security check (Turnstile) and open-source library delivery (cdnjs);",
          "Google: fonts (Google Fonts), the map on the Contacts page (Google Maps) and an internal spreadsheet for enquiry follow-up (Google Sheets);",
          "Resend: internal e-mail notifications about new enquiries;",
          "GeoJS: detecting the country from the IP address to suggest the dialling code in the phone field;",
          "an external server that currently hosts some of the website's images and icons."]),
        "5.2. Each provider receives only the data needed for its service: the font, map, library, GeoJS and image services receive your IP address and technical browser information when a page loads; form data is stored at Cloudflare and passed only to Google Sheets and Resend for internal follow-up.",
        `5.3. These providers may operate infrastructure outside Vietnam, so data may be stored or processed abroad (cross-border transfer of personal data under Article 20 of the ${LE}).`,
        "5.4. Data may be provided to competent state authorities when required by law."]],
      ["6. RETENTION", [
        "6.1. Data is kept for a period that fits the purpose of processing: while we discuss, advise and work with you, or longer where the law requires.",
        "6.2. When the purpose has been met, after a valid deletion request or when the retention period ends, the data is deleted, destroyed or de-identified using secure measures, unless the law provides otherwise."]],
      ["7. YOUR RIGHTS", [
        `7.1. Under Article 4 of the ${LE}, you have the right to:` + br([
          "be informed about the processing of your personal data;",
          "give or refuse consent, and withdraw your consent;",
          "access and correct your data or ask us to correct it;",
          "ask us to provide, delete or restrict the processing of your data, and object to processing;",
          "complain, denounce, sue and claim compensation as provided by law;",
          "ask competent authorities or the organisations involved to take measures to protect your personal data."]),
        `7.2. How to make a request: e-mail ${mail} with the subject "Personal data request", describe your request and include the contact details you used in the form so we can identify your data. You can also call ${tel} for help. Requests to withdraw consent or restrict processing must be made in writing, including in electronic form.`,
        `7.3. We reply within 2 working days and carry out the request within the time limits set by Article 5 of ${DE}. If we cannot carry it out, for example because the law requires us to keep the data, we will tell you why.`]],
      ["8. DATA SECURITY", [
        "8.1. We apply appropriate organisational and technical measures, including encrypted HTTPS connections, restricted access to data, not storing raw IP addresses and automated-submission checks.",
        `8.2. No method of transmission or storage is completely secure. If a breach of personal data protection rules occurs, we will notify it as required by Article 23 of the ${LE}.`]],
      ["9. RECRUITMENT AND CHILDREN", [
        `9.1. ${B.brand} does not accept online job applications through the website. If you choose to send application details by e-mail, they are used only for recruitment and are deleted if you are not hired, unless agreed otherwise with you.`,
        "9.2. The website is intended for business customers and does not knowingly collect personal data from children."]],
      ["10. UPDATES AND CONTACT", [
        `10.1. This policy may be updated when our processing or the law changes; the date at the top of the page shows the latest version. For cookies, see the <a href="/en/cookie-policy/">Cookie Policy</a>.`,
        `10.2. Contact: ${B.tradeNameEn} · ${B.addressEn} · E-mail: ${mail} · Hotline: ${tel}.`]]
    ]}
  },
  cookie: {
    vi: { title: "Chính sách cookie", lead: `Cập nhật lần cuối: ${UPDATED.vi}.`, sections: [
      ["1. Cookie là gì", [
        `1.1. Cookie và các công nghệ lưu trữ tương tự là dữ liệu nhỏ được lưu trên trình duyệt của bạn. Chính sách này cho biết website ${site} lưu những gì và các dịch vụ bên thứ ba nào được tải khi bạn xem website.`,
        `1.2. Cách chúng tôi xử lý dữ liệu cá nhân được trình bày tại <a href="/privacy-policy/">Chính sách bảo mật</a>.`]],
      ["2. Dữ liệu website lưu trên trình duyệt", [
        "2.1. Website không tự đặt cookie. Chúng tôi chỉ lưu trên trình duyệt của bạn những thông tin cần thiết để duy trì trải nghiệm:" + br([
          "<strong>Lựa chọn cookie của bạn</strong>: để website không hỏi lại mỗi lần bạn truy cập; được lưu cho đến khi bạn xóa dữ liệu trình duyệt;",
          "<strong>Thông tin phiên truy cập</strong>: trang đầu tiên bạn mở và nguồn đưa bạn đến website (ví dụ công cụ tìm kiếm); chỉ nằm trên trình duyệt, không được gửi tới máy chủ của chúng tôi và tự xóa khi bạn đóng tab."])]],
      ["3. Cookie thống kê và quảng cáo", [
        "3.1. Hiện website không sử dụng cookie thống kê, cookie quảng cáo hay công cụ theo dõi hành vi. Các lựa chọn «Thống kê» và «Tiếp thị» trong hộp «Quản lý cookie» chưa kích hoạt dịch vụ nào.",
        "3.2. Nếu sau này sử dụng các công cụ này, chúng tôi sẽ cập nhật chính sách trước và chỉ kích hoạt khi bạn đồng ý."]],
      ["4. Dịch vụ bên thứ ba", [
        "4.1. Khi bạn xem website, trình duyệt kết nối tới các dịch vụ sau:" + br([
          "Google Fonts: phông chữ;",
          "Cloudflare Turnstile: kiểm tra chống thư rác cho biểu mẫu;",
          "cdnjs (Cloudflare): thư viện ô nhập số điện thoại;",
          "GeoJS: gợi ý mã quốc gia cho số điện thoại;",
          "Google Maps: bản đồ tại trang Liên hệ;",
          "một máy chủ bên ngoài đang lưu một số hình ảnh và biểu tượng của website."]),
        "4.2. Các dịch vụ này nhận địa chỉ IP và thông tin kỹ thuật của trình duyệt, và có thể dùng cookie hoặc công nghệ tương tự theo chính sách riêng của họ (ví dụ: bản đồ Google tại trang Liên hệ)."]],
      ["5. Thay đổi lựa chọn", [
        "5.1. Bạn có thể thay đổi lựa chọn bất cứ lúc nào bằng biểu tượng cookie trên website để mở lại hộp «Quản lý cookie», hoặc xóa dữ liệu của website trong cài đặt trình duyệt.",
        "5.2. Nếu trình duyệt chặn toàn bộ bộ nhớ, hộp «Quản lý cookie» có thể hiển thị lại ở mỗi lần truy cập."]],
      ["6. Cập nhật và liên hệ", [
        "6.1. Chính sách có thể được cập nhật khi website thay đổi; ngày cập nhật được ghi ở đầu trang.",
        `6.2. Mọi câu hỏi về cookie và dữ liệu cá nhân: ${mail} · ${tel}.`]]
    ]},
    en: { title: "Cookie Policy", lead: `Last updated: ${UPDATED.en}.`, sections: [
      ["1. WHAT COOKIES ARE", [
        `1.1. Cookies and similar storage technologies are small pieces of data kept in your browser. This policy explains what ${site} stores and which third-party services load while you browse.`,
        `1.2. How we handle personal data is explained in the <a href="/en/privacy-policy/">Privacy Policy</a>.`]],
      ["2. WHAT THE WEBSITE STORES IN YOUR BROWSER", [
        "2.1. The website does not set cookies itself. It only keeps in your browser the information needed to keep your experience consistent:" + br([
          "<strong>Your cookie choice</strong>: so the website does not ask again on every visit; kept until you clear your browser data;",
          "<strong>Visit information</strong>: the first page you opened and what brought you to the website (for example a search engine); stays in your browser, is not sent to our server and is cleared when you close the tab."])]],
      ["3. ANALYTICS AND ADVERTISING COOKIES", [
        "3.1. The website does not currently use analytics cookies, advertising cookies or behavioural tracking. The «Statistics» and «Marketing» options in «Cookie settings» do not switch on any service.",
        "3.2. If we start using such tools, we will update this policy first and enable them only with your consent."]],
      ["4. THIRD-PARTY SERVICES", [
        "4.1. While you browse, your browser connects to these services:" + br([
          "Google Fonts: fonts;",
          "Cloudflare Turnstile: spam protection for the form;",
          "cdnjs (Cloudflare): the phone-number input library;",
          "GeoJS: country code suggestion for phone numbers;",
          "Google Maps: the map on the Contacts page;",
          "an external server that currently hosts some of the website's images and icons."]),
        "4.2. These services receive your IP address and technical browser information and may use cookies or similar technologies under their own policies (for example the Google map on the Contacts page)."]],
      ["5. CHANGING YOUR CHOICE", [
        "5.1. You can change your choice at any time with the cookie icon on the website, which reopens «Cookie settings», or by clearing this website's data in your browser settings.",
        "5.2. If your browser blocks all storage, «Cookie settings» may appear again on every visit."]],
      ["6. UPDATES AND CONTACT", [
        "6.1. This policy may be updated when the website changes; the date at the top of the page shows the latest version.",
        `6.2. Questions about cookies or personal data: ${mail} · ${tel}.`]]
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
