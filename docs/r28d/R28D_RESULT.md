# R28d — Kết quả (21/11/2026)

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
