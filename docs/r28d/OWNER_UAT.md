# R28d — BẠN CẦN TEST GÌ (cập nhật 23/11/2026)

**Phân loại lần này:** DOCS + công cụ kiểm tra (FUNCTION-BACKEND offline).
- **Website hiển thị không đổi**: bản build giống hệt từng byte bản bạn đã PASS hôm 21/11.
- **KHÔNG CẦN TEST RUNTIME CHO PATCH NÀY**, vì không có chữ, giao diện hay chatbot nào thay đổi trên Preview.

Việc cần làm là **trả lời phiếu** và **cho phép các bước tiếp theo**.

## 1. Trả lời phiếu thông tin nhà máy (quan trọng nhất)

Mở `OWNER_FACTORY_FACT_CHECK.md`. Trả lời theo số, có thể từng đợt:

| Mục | Hỏi gì |
|---|---|
| B1 | GMP: tên giấy, cơ quan cấp, số, ngày, phạm vi; hoặc "chưa có" |
| B2 | HACCP: có hay không, phạm vi |
| B3 | Bốn con số 2.000+ / 5+ năm / 10.000.000 / 1.000 m²: còn đúng không, "5+ năm" là của doanh nghiệp hay đội ngũ |
| B4 | Có sản xuất sản phẩm mẹ & bé không |
| B5 | Kiểm nghiệm tại nhà máy hay gửi phòng lab bên ngoài |
| B6 | Đăng ký nhãn hiệu: trực tiếp nộp hay chỉ hỗ trợ |
| B7 | Chọn **một** tên tiếng Anh chính thức (đề xuất "Cosmetic & Cosmeceutical") |
| B8 | Dạng bao bì / sản phẩm nào **không** làm được |
| C | Một câu: "Đồng ý sửa C1–C5 theo đề xuất" hoặc "trừ mục …" |
| E1–E5 | Không gấp |

## 2. Sau khi bạn trả lời mục C (đợt sửa D1, sẽ báo riêng)

Lúc đó bạn sẽ được hỏi duyệt **một lần ghi Sanity**, kèm danh sách từng ô chữ. Sau khi ghi, bạn test:

1. Trang chủ `/en/` trên điện thoại, máy tính bảng và máy tính, các phần **Why choose Bio-A Group**, **We Produce**, **How we work**:
   - **PASS nếu:** mỗi thẻ EN có cùng ý với thẻ VI tương ứng; không chữ tràn khung; không mất ảnh.
2. Trang chủ `/`, phần "Phù Hợp Với":
   - **PASS nếu:** "Thương Hiệu Mới" có các ý bắt đầu thương hiệu; "Đơn Vị Phân Phối" có các ý mở rộng danh mục.
3. Phần "Danh Mục Sản Xuất" trên điện thoại:
   - **PASS nếu:** tiêu đề và 2 thẻ giống bản máy tính.

## 3. Chatbot AI (C1): chỉ khi bạn muốn bật

Đọc `CHAT_ACTIVATION.md`, rồi trả lời **3 câu**:

1. "Cho phép thêm đường test riêng cho Owner trên Preview" (§2) hoặc "Không".
2. "Cho phép kích hoạt C1". Bạn tự làm các bước Dashboard ở §3 (không cần dòng lệnh, không gửi mã bí mật vào chat), **hoặc** chọn phương án FAQ-only ($0, không AI).
3. "Đồng ý thêm 2.5 và 4.4" vào Chính sách bảo mật (`PRIVACY_AI_ADDITION.md`) hoặc "Chưa thêm".

Sau khi bật, test theo bảng 10 câu ở `CHAT_ACTIVATION.md` §5.

## Trạng thái

| Mục | CODE / BUILD | AUTO TEST | PREVIEW | OWNER |
|---|---|---|---|---|
| A form chat | PASS | PASS | PASS | **OWNER PASS 5/5** |
| B VI-first tự động | giữ nguyên mã | PASS (offline) | không triển khai | **DEFERRED BY OWNER** |
| D0 kiểm nội dung | — | xong | — | **chờ trả lời phiếu** |
| D1 sửa nội dung | chưa làm | — | — | **CONTENT APPROVAL PENDING** |
| C0 chatbot offline | PASS | PASS (28/28) | không đổi (cờ tắt) | — |
| C1 chatbot thật | — | — | **BLOCKED** | chờ 3 câu ở §3 |
