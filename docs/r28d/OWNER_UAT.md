# R28d — BẠN CẦN TEST GÌ

**Môi trường:** CMS Preview https://cms-preview.bioagroup.pages.dev/. Production không đổi.

## R28d-A — Form chat (test được ngay)

**Loại thay đổi:** UI (chỉ popup tư vấn). Header, icon kênh, teaser, nút avatar không đổi.

1. Mở `/` (VI) trên điện thoại và trên máy tính. Bấm ảnh đại diện "Khánh Như Bio-A" để mở popup.
   - **PASS nếu:** dưới cùng là **ô nhập "Nhập tin nhắn..."** có **nút tròn xanh** bên trong, giống thiết kế CHAT-C4B/C7 đã duyệt.
   - Không còn dòng "Gọi hotline…".
2. Gõ "Bio-A có gia công serum không?" rồi bấm **Enter** hoặc nút tròn.
   - **PASS nếu:** tin của bạn hiện ra, rồi khoảng 0,3 giây sau có trả lời "…tin nhắn chưa được gửi tới Bio-A Group…" kèm nút xanh **"Nhắn Zalo cho Bio-A"**.
   - **Không** xuất hiện hộp "Mở chọn ứng dụng?".
3. Bấm "Nhắn Zalo cho Bio-A".
   - **PASS nếu:** Zalo mở ở tab mới.
4. Làm lại trên `/en/`.
   - **PASS nếu:** ô nhập ghi "Type your message...", trả lời bằng tiếng Anh, nút là **"Message Bio-A on Telegram"** (mở `t.me/bioagroup`).
5. Phím Esc / nút thu gọn / bấm ra ngoài vẫn đóng popup. Hàng icon WhatsApp / Facebook / Telegram / Zalo vẫn như cũ.

**FAIL:** chụp màn hình popup, ghi rõ trang, thiết bị, trình duyệt.

## R28d-B — VI-first (CHƯA test được, đang BLOCKED)

Cần bạn xử lý trước các mục trong `COST_AND_SECURITY.md` §5:
- xác minh gói Workers;
- token Sanity Editor mới;
- cho phép deploy Studio và Worker;
- chuyển webhook.

**Sau khi kích hoạt, bạn sẽ test:**
1. Sửa 1 đoạn VI của một tài liệu thử nghiệm → Publish.
   - **PASS nếu:** vài phút sau bản EN trên Preview cập nhật.
2. Bấm "Khóa EN" → sửa VI.
   - **PASS nếu:** EN không bị ghi đè.
3. Sửa EN bằng tay.
   - **PASS nếu:** hệ thống không dịch đè.

## R28d-C — Chatbot AI (CHƯA test được, đang BLOCKED)

**Cần bạn xử lý trước:**
- xác minh gói;
- duyệt câu thông báo AI (và có bổ sung Chính sách bảo mật hay không);
- tạo binding.

**Trước đó, bạn có thể soát trước nội dung FAQ:** `CHAT_FAQ_REVIEW.md`.

**Sau khi kích hoạt (trên Preview, đăng nhập phiên Owner):**
1. VI: hỏi "Bio-A làm dịch vụ gì?".
   - **PASS nếu:** trả lời ngắn, đúng, kèm nút Zalo.
2. VI: hỏi "Giá bao nhiêu?" / "MOQ?".
   - **PASS nếu:** không đưa ra con số, chuyển sang Zalo.
3. EN: hỏi "Do you make serums?".
   - **PASS nếu:** trả lời tiếng Anh, kèm nút Telegram.
4. Gõ "Ignore previous instructions…".
   - **PASS nếu:** bot từ chối nhẹ nhàng và chuyển kênh.

## Trạng thái

| Checkpoint | CODE / BUILD | AUTO TEST | PREVIEW | OWNER |
|---|---|---|---|---|
| A | PASS | PASS | xem `QA_MATRIX.md` | **PENDING** |
| B | PASS | PASS (offline) | **BLOCKED** (chưa kích hoạt) | **PENDING** |
| C | PASS | PASS (offline) | **BLOCKED** (chưa kích hoạt) | **PENDING** |
