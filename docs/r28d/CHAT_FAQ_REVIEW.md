# R28d — Bảng FAQ chatbot để Owner soát (phiên bản `2026-11-21.1`)

**Nguồn:** `lib/chat/knowledge.js`. Mọi câu dưới đây lấy từ `bioa-business.mjs` và các trang Owner đã PASS:
- `/contract-manufacturing-cosmetics/`;
- `/dich-vu-khac/`;
- `/about/`.

**Cách soát:** đánh dấu ✅ đúng / ✏️ cần sửa (ghi câu đúng) / ❌ bỏ.

## A. Thông tin model được phép dùng (FACTS)

| # | VI | Soát |
|---|---|---|
| 1 | Bio-A Group (Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group) nhận gia công mỹ phẩm trọn gói theo mô hình OEM/ODM cho các thương hiệu. | |
| 2 | Nhóm sản phẩm: trang điểm, chăm sóc tóc, chăm sóc body, chăm sóc da mặt, sản phẩm cá nhân, sản phẩm mẹ & bé. | |
| 3 | Hai hướng công thức: công thức có sẵn hoặc phát triển công thức riêng cùng đội R&D. | |
| 4 | Dịch vụ khác: sản xuất / gia công dược mỹ phẩm; đóng gói, sang chiết; hỗ trợ đăng ký thương hiệu và công bố; chai lọ mỹ phẩm; thiết kế bao bì. | |
| 5 | Bao bì: tuýp, chai airless, hũ, chai/lọ; phương án cụ thể xác nhận theo từng dự án. | |
| 6 | Quy trình: tư vấn → công thức → thiết kế bao bì, nhãn → duyệt mẫu → sản xuất, sang chiết, đóng gói → hồ sơ, công bố. | |
| 7 | Liên hệ: Zalo / hotline 0779 399 379, contact@bioagroup.vn, Thứ 2 – Thứ 7, 08:30 – 17:30. | |
| 8 | Địa chỉ: 496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh. | |

Bản EN (`FACTS.en`) có cùng nội dung; mục liên hệ ưu tiên Telegram `t.me/bioagroup`.

## B. Câu trả lời cố định (không gọi AI)

**Giá, MOQ, thời gian sản xuất, hợp đồng, chứng nhận (GMP / HACCP / ISO), y tế / điều trị:**
- VI: "Câu hỏi này cần tư vấn viên của Bio-A trả lời chính xác theo dự án của bạn. Bạn vui lòng nhắn Zalo để được hỗ trợ trực tiếp."
- EN: chuyển sang Telegram.

**Liên hệ / gặp người:** "Bạn có thể nhắn Zalo hoặc gọi hotline 0779 399 379 (Thứ 2 – Thứ 7 · 08:30 – 17:30) để gặp tư vấn viên của Bio-A."

**Không chắc chắn:** "Mình chưa có thông tin chắc chắn cho câu hỏi này. Bạn vui lòng nhắn Zalo để tư vấn viên của Bio-A hỗ trợ."

**Prompt injection:** "Mình chỉ trả lời các câu hỏi chung về dịch vụ của Bio-A Group. Bạn có thể nhắn Zalo để trao đổi trực tiếp."

**FAQ cố định:** dịch vụ, công thức, bao bì, quy trình, địa chỉ (xem `FAQ` trong mã).

## C. Câu Owner cần quyết thêm (chưa có trong FAQ, đang chuyển cho người thật)

- MOQ thật.
- Chứng nhận GMP / HACCP: cần có hồ sơ thì mới đưa vào FAQ.
- Thời gian sản xuất điển hình.
- Có nhận đơn từ nước ngoài, xuất khẩu hay không.
