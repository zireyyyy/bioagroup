# R28d — Triển khai & khôi phục

## Đã thực hiện

| Mục | Trạng thái |
|---|---|
| Nhánh `r28/blog-icon-cms` + `cms-preview` | Push fast-forward tới HEAD R28d (SHA trong `START_HERE.md`). PR nháp `zireyyyy/bioagroup#14`, **không merge** |
| Checkpoint A (form chat) | **Đang chạy trên CMS Preview**: trả lời cục bộ trung thực, không gọi API |
| Checkpoint B (VI-first) | Chỉ có mã nguồn. Worker **chưa deploy**, webhook Sanity **không đổi**, Studio **chưa deploy**, **không ghi gì vào Sanity** (chỉ chạy `status` và backfill dry run) |
| Checkpoint C (chatbot AI) | Chỉ có mã nguồn. Cờ OFF: `BIOA_CHAT_ENABLED` chưa đặt, `BIOA_CHAT_UI_API` chưa đặt, không có binding AI / D1. **Không gọi AI lần nào** |
| Production `main` | **`9d044a7`, không đổi**, vẫn bảo trì |

## Khôi phục

**A — form chat:**
- revert commit `6ef278f` (cùng các commit test / cổng kiểm thử R28d), push fast-forward lên `cms-preview`;
- hoặc Owner yêu cầu đưa `cms-preview` về `ae733b1` (lệnh này cần force, phải hỏi trước).
- A không đụng tới dữ liệu Sanity.

**C — chatbot (sau khi đã bật):** tắt theo thứ tự.
1. Xóa `BIOA_CHAT_UI_API`, rồi build lại. Form quay về trả lời cục bộ.
2. Đặt `BIOA_CHAT_ENABLED=false`. API trả 503 `disabled`.
3. Gỡ binding AI / D1 nếu muốn.

Cả ba bước không ảnh hưởng `/api/lead`.

**B — VI-first (sau khi đã bật):** tắt theo thứ tự.
1. Trỏ webhook Sanity về deploy hook cũ của `cms-preview`.
2. Đặt `I18N_PROVIDER=none` hoặc xóa `I18N_COST_GATE` trên Worker.
3. Gỡ Worker nếu cần.
4. Dữ liệu: khôi phục từ bản sao lưu Sanity trước khi bật. Chỉ trường `i18n` và các trường EN bị ghi, mỗi lần ghi đều ghim `ifRevisionID`.

**Thứ tự khi khôi phục có dính slug R28c:** **Sanity trước, code sau**, theo `docs/r28c/DEPLOY_ROLLBACK.md`.

## Giới hạn quyền

Các việc sau tôi **không làm**, vì phải có Owner phê duyệt hoặc tự làm:
- tạo D1, binding;
- biến môi trường Pages;
- secret Worker;
- token Sanity Editor;
- deploy Studio / Worker;
- đổi webhook;
- mọi thay đổi Production.
