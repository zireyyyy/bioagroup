# R28d — Kết quả

## Tiếp nối 23/11/2026: nội dung thật VI/EN + chatbot Workers Free

**Quyết định Owner (không hỏi lại):**

| Mục | Quyết định |
|---|---|
| A | OWNER PASS 5/5 |
| B | DEFERRED: sửa VI/EN thủ công |
| C | Chỉ Workers Free; VI → Zalo, EN → Telegram; đồng ý về nguyên tắc 8 nhóm FAQ + câu thông báo AI, với điều kiện đồng bộ thông tin nhà máy |
| D (mới) | Kiểm nội dung thật + VI/EN |
| Gói Workers | Free, đã xác nhận |

**D0: đã kiểm (chỉ đọc).**
- 13 cặp trang VI/EN: 3.056 mục hiển thị.
- 38 bài Blog: 995 cặp trường.
- 393 ô chữ CMS (Sanity = repo).
- 9 + 38 phần SEO.
- Kết quả: **24 mục** (7 mức H). Chi tiết `VI_EN_PARITY_AUDIT.md`.
- Phát hiện chính:
  - **Trang chủ EN là bản tóm tắt cũ**: Why choose (4 thẻ), We Produce (2), How we work (5), mô tả đầu trang, đoạn dòng sản phẩm. VI đã được viết dài ra nhưng EN chưa cập nhật. Nguyên nhân: Studio đang chạy cho phép sửa VI mà không cảnh báo EN.
  - **Lỗi ở bản VI:**
    - "Phù Hợp Với": ý của "Thương Hiệu Mới" và "Đơn Vị Phân Phối" bị đảo;
    - "Danh Mục Sản Xuất" trên điện thoại khác máy tính, thẻ "Bao Bì & Hoàn Thiện" mang nội dung khác.
  - **Thông tin nhà máy chưa có giấy tờ:**
    - "đạt chuẩn GMP Bộ Y Tế" (VI có, EN không);
    - HACCP mô tả là an toàn **thực phẩm**;
    - 4 con số 2.000+ / 5+ năm / 10.000.000 / 1.000 m²;
    - mẹ & bé, kiểm nghiệm, đăng ký thương hiệu, các dạng bao bì / sản phẩm.
  - **Câu ghi chú kỹ thuật lọt ra website:** "nội dung nguồn Bio-A ghi nhận…" / "legacy Bio-A source".
  - **Tên tiếng Anh chính thức có 3 cách viết** ("Pharmaceutical & Cosmetic" cả trong Chính sách bảo mật).
  - **Không cần sửa:** Blog 38 bài, Liên hệ, Tuyển dụng, Dịch vụ Khác (trừ 2 điểm nhỏ), Pháp lý.

**D1: OWNER CONTENT APPROVAL PENDING.**
- **Chưa sửa** một chữ nào trên website và **chưa ghi Sanity**.
- Lý do:
  - các câu sai nằm trong ô chữ CMS, nên muốn sửa phải ghi Sanity đã xuất bản, cần Owner duyệt riêng từng đợt;
  - phần VI còn chứa thông tin nhà máy đang chờ xác nhận.
- Đã chuẩn bị sẵn câu VI/EN đề xuất.

**Bảo vệ mới (không đổi website):**
- **VI sửa mà EN cũ**: hiện trong `/_bioa-cms.json` `waitingEn` và log build; **không cho tạo bản phát hành Production**.
- `npm run test:content` (CI) chặn:
  - thiếu / thừa EN;
  - chữ Việt trên trang EN;
  - **thêm** chứng nhận / số liệu nhà máy mới;
  - lệch số VI/EN mới.

**C0:**
- `lib/chat/knowledge.js` `2026-11-23.1`:
  - mẹ & bé và đăng ký thương hiệu **không đưa cho AI**; khách hỏi thì chuyển Zalo / Telegram;
  - FAQ dịch vụ nhận cả "manufacture".
- 10 câu trong kịch bản test của Owner: 9 câu trả lời cố định ($0), 1 câu ("serum") cho AI.
- Model Free đã kiểm theo tài liệu Cloudflare 18/11/2026.
- Test chat 28/28.

**C1: AI LIVE BLOCKED.**
- Preview khóa `/api` với mọi người (theo thiết kế).
- Đường test riêng cho Owner đã được viết nhưng bị trình phân loại an toàn của phiên chặn khi sửa cổng bảo vệ, nên **chưa áp dụng**. Cần Owner cho phép rõ ràng (`CHAT_ACTIVATION.md` §2).
- Còn cần:
  - tạo D1, binding và biến môi trường trên Dashboard;
  - duyệt `PRIVACY_AI_ADDITION.md`.
- **0 lượt gọi AI, $0.**

---

## Lần đầu (21/11/2026)

**Trạng thái chung:**
- **A: OWNER QA READY** trên CMS Preview.
- **B, C: code và test PASS; kích hoạt thật BLOCKED** ở cổng quyền / chi phí / pháp lý.
- Không có mục nào được tuyên bố OWNER PASS. Production không đổi.

## Quyết định của Owner được áp dụng (không hỏi lại)

- R28b icon + popup Mobile: OWNER PASS. Chỉ ô nhập chat được mở lại.
- R28c Blog (38 bài, 13 slug, 26 × 301, Sanity): OWNER PASS 6/6. **Không đụng tới.**
- CHAT-RESTORE-2: OWNER FAIL. Phải khôi phục form CHAT-C4B/C7 (ô nhập + nút gửi), không phải đường dẫn `tel:`.
- VI-first và chatbot chỉ dùng Cloudflare Workers AI, $0. Chuyển kênh: VI → Zalo, EN → Telegram.

## Checkpoint A: khôi phục form chat

**Nguyên nhân:**
- R28b chỉ khôi phục **hình dáng** CHAT-C4B, nhưng phần tử bên trong là đường dẫn `tel:`.
- Bấm vào thì Chrome hiện hộp "Mở chọn ứng dụng?".

**Sửa** (`6ef278f`, trong `bioa-home-refine.mjs`, module chat chính):
- Khôi phục `<form class="bioa-chat__composer">` gồm ô nhập "Nhập tin nhắn..." / "Type your message..." và nút tròn gửi, đúng như bản đã duyệt `9d044a7`.
- CSS composer C4B giữ nguyên.
- Gửi tin: tin của khách hiện ra, khoảng 0,3 giây sau có trả lời trung thực:
  - VI: "…tin nhắn chưa được gửi tới Bio-A Group. Vui lòng nhắn Zalo hoặc gọi 0779 399 379…", kèm nút **"Nhắn Zalo cho Bio-A"**;
  - EN: "…has not been sent to Bio-A Group…", kèm nút **"Message Bio-A on Telegram"** (`https://t.me/bioagroup`);
  - dòng nhỏ "hoặc chọn kênh khác ở trên" nhắc khách có thể dùng kênh khác.
- Chỉ khi khách bấm nút thì app mới mở, ở tab mới.
- Mọi nội dung được dựng bằng `textContent`, nên không có nguy cơ XSS.
- **Khi cờ API tắt (mặc định, đang chạy trên Preview): không gọi mạng.**
- Giữ nguyên: header, avatar, teaser, hàng icon WhatsApp / Facebook / Telegram / Zalo, nút toggle, Esc, cảm ứng, kích thước.

**Đo đạc:**
- `r28b-owner-fix` so chat với bản đã duyệt `9d044a7`: chiều cao / rộng / vị trí ô nhập và nút gửi lệch ≤ 1px, 1090/1090 PASS.
- `r28d-chat-restore` (Chrome + WebKit, 28 tổ hợp trang × độ rộng): 469/469 mỗi trình duyệt, cả cục bộ lẫn trên Preview thật.

## Checkpoint B: VI-first trên Workers AI

**Đã làm** (`9701b27`), dùng lại `cms/i18n`, `workers/cms-i18n`, `tools/cms-i18n.mjs`:
- Provider `workers-ai` mặc định là `@cf/google/gemma-4-26b-a4b-it` (dùng được ở gói Free).
- **Đóng khi chưa cấu hình** nếu thiếu một trong: binding AI, `I18N_COST_GATE=verified`, bộ đếm ngân sách D1, model có trong bảng giá.
- Dịch theo khối 2.500 ký tự. Trước mỗi khối, **giữ chỗ chi phí tệ nhất** trong D1.
  - Khi hết ngân sách: báo `QUOTA` → trạng thái FAILED, **bản EN cũ được giữ nguyên**.
- Tin tuyển dụng luôn ở trạng thái REVIEW_REQUIRED. Trang pháp lý không bao giờ dịch máy (giữ nguyên quy tắc R28).
- Giữ nguyên cơ chế cũ:
  - băm nội dung, chỉ dịch phần đổi;
  - `ifRevisionID`;
  - khóa EN / bảo vệ bản EN sửa tay;
  - các trạng thái SYNCED / REVIEW_REQUIRED / FAILED / MANUAL_LOCK / OUTDATED;
  - chống chạy lại, chống vòng lặp.

**Test:** `r28d-i18n.test.mjs` 7/7, `cms-i18n` 19/19.

**Sanity:**
- Chỉ chạy lệnh đọc: `status` (97 tài liệu, tất cả SYNCED) và backfill dry run.
- **Không ghi gì.**

**BLOCKED:** cần token Sanity Editor mới, deploy Studio, deploy Worker, chuyển webhook, xác minh gói (xem `COST_AND_SECURITY.md` §5).

## Checkpoint C: chatbot AI chuyển kênh

**Đã làm** (`1d47ff8`, dùng lại `/api/chat` → `lib/chat/gateway.js` / `adapters.js`):
- `lib/chat/knowledge.js`: FAQ có số phiên bản `2026-11-21.1`, chỉ chứa thông tin công khai đã xác nhận.
- **Chuyển kênh cố định, không qua AI**, cho: giá, MOQ, tiến độ, hợp đồng, chứng nhận (GMP / HACCP / pháp lý), y tế, liên hệ.
  - "gia công" không bị hiểu nhầm là "giá".
- Chống prompt injection: câu trả lời cố định, không gọi model.
- **Kiểm tra lại đầu ra của model trên máy chủ**:
  - xóa HTML / markdown;
  - từ chối link, email, số điện thoại lạ, giá, con số MOQ, cam kết chứng nhận / điều trị, câu nhắc tới prompt, và chữ tiếng Việt trong câu trả lời EN;
  - giới hạn 600 ký tự.
- Adapter `workers-ai` **đóng khi chưa cấu hình**: cần binding AI, `BIOA_AI_COST_GATE=verified`, D1 ngân sách, model có trong bảng giá.
  - Mỗi lần gọi giữ chỗ chi phí tệ nhất trong D1 trước; hết ngân sách → 503 `quota_exhausted` kèm kênh chuyển.
- Adapter `faq` không gọi AI ($0 chắc chắn).
- `handoff_channels` có thêm `telegram`, tương thích ngược.
- Gate `/api` của Preview **không nới**.

**Test:** `r28d-chat-ai.test.mjs` 18/18 test, bao phủ 26 tình huống VI/EN đánh số, gateway cũ 8/8.

**BLOCKED:** xác minh gói; duyệt câu thông báo AI (thay đổi pháp lý mới); D1 / binding / biến môi trường.

## Chi phí đã phát sinh

**$0.** Không gọi AI lần nào, không tạo tài nguyên Cloudflare, không đổi billing.

## BẠN CẦN TEST GÌ

Xem `OWNER_UAT.md`. Chỉ test được **A**; B và C đang BLOCKED.
