# R28d — Bảng FAQ chatbot (phiên bản `2026-11-23.1`)

**Nguồn:** `lib/chat/knowledge.js`.
- Owner đã duyệt 8 nhóm thông tin (23/11/2026), **với điều kiện đồng bộ với thông tin nhà máy đã xác nhận** (R28d-D).
- Chatbot chỉ dùng thông tin **đã xác nhận**. Thông tin còn chờ ở `OWNER_FACTORY_FACT_CHECK.md` sẽ **không** đưa cho AI; khách hỏi tới thì được chuyển tư vấn viên.

## A. Thông tin model được phép dùng (FACTS)

| # | VI | Trạng thái |
|---|---|---|
| 1 | Bio-A Group (Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group) nhận gia công mỹ phẩm trọn gói theo mô hình OEM/ODM cho các thương hiệu. | Dùng |
| 2 | Nhóm sản phẩm: trang điểm, chăm sóc tóc, chăm sóc body, chăm sóc da mặt, sản phẩm cá nhân. | Dùng. **"Mẹ & bé" đang tạm giữ lại** (chờ phiếu B4) |
| 3 | Hai hướng công thức: công thức có sẵn hoặc phát triển công thức riêng cùng đội R&D. | Dùng |
| 4 | Dịch vụ khác: sản xuất / gia công dược mỹ phẩm; đóng gói, sang chiết; hỗ trợ hồ sơ công bố sản phẩm; chai lọ mỹ phẩm; thiết kế bao bì. | Dùng. **"Đăng ký thương hiệu" đang tạm giữ lại** (chờ phiếu B6) |
| 5 | Bao bì: tuýp, chai airless, hũ, chai/lọ; phương án cụ thể xác nhận theo từng dự án. | Dùng (chờ phiếu B8 nếu có dạng không làm được) |
| 6 | Quy trình: tư vấn → công thức → thiết kế bao bì, nhãn → duyệt mẫu → sản xuất, sang chiết, đóng gói → hồ sơ, công bố. | Dùng |
| 7 | Liên hệ: Zalo / hotline 0779 399 379, contact@bioagroup.vn, Thứ 2 – Thứ 7, 08:30 – 17:30. EN: Telegram `t.me/bioagroup`. | Dùng |
| 8 | Địa chỉ: 496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh. | Dùng |

**Không bao giờ có trong FACTS:**
- GMP, HACCP, ISO;
- 2.000+, 5+ năm, 10.000.000, 1.000 m²;
- giá, MOQ, thời gian;
- xuất khẩu.

## B. Câu trả lời cố định (không gọi AI, $0)

| Khách hỏi về | Trả lời | Nút |
|---|---|---|
| Giá, MOQ, thời gian, hợp đồng, chứng nhận (GMP / HACCP / ISO), y tế / điều trị | "Câu hỏi này cần tư vấn viên của Bio-A trả lời chính xác theo dự án của bạn…" | Zalo (VI) / Telegram (EN) |
| **Mẹ & bé, đăng ký thương hiệu / nhãn hiệu** (mới) | Như trên | Zalo / Telegram |
| Liên hệ, gặp người | "Bạn có thể nhắn Zalo hoặc gọi hotline 0779 399 379…" | Zalo / Telegram |
| Câu lừa AI (prompt injection) | "Mình chỉ trả lời các câu hỏi chung về dịch vụ…" | Zalo / Telegram |
| Dịch vụ (kể cả "Do you manufacture…", "private label"), công thức, bao bì, quy trình, địa chỉ | Câu FAQ cố định | Zalo / Telegram |

**Câu hỏi đơn giản khác** (ví dụ "Có gia công serum không?"):
- AI trả lời 1–3 câu, chỉ dựa trên FACTS.
- Máy chủ kiểm tra lại câu trả lời: không giá, không con số, không chứng nhận, không link.
- Câu trả lời sai quy tắc bị thay bằng "Mình chưa có thông tin chắc chắn…" kèm nút chuyển kênh.

## C. Khi Owner xác nhận một thông tin đang tạm giữ

Developer làm 3 việc trong cùng một commit:
1. Thêm mã vào `OWNER_CONFIRMED` (`motherBaby`, `trademark`).
2. Tăng `KNOWLEDGE_VERSION`.
3. Cập nhật bảng này.

Test `27` / `28` trong `tests/r28d-chat-ai.test.mjs` canh việc này.
