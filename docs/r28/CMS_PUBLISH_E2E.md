# R28 — Kiểm thử Publish → CMS Preview (end-to-end, dữ liệu thật)

Tất cả giờ là UTC, ngày 19/11/2026. Bằng chứng nằm trong `evidence/r28/`.

## 1. Publish thật → webhook → build → Preview

| Bước | Kết quả |
|---|---|
| Sao lưu trước khi ghi | `r28-blogsync-before-2026-11-19T081314357Z.json`: 99 tài liệu, 0 Draft. `page-home` rev `WIhnXGDtfVOQnknZsffvKY` (giá trị "123" của Owner) |
| Code R28 trên Preview | `cms-preview` fast-forward `fb8edd8..ef5f7b6`, deployment **`d478ffe7-0ae2-4192-8b01-684273e30eaf`** (build + deploy success) |
| Ghi Sanity | `tools/cms-sync-blog.mjs --from 52c25ac --apply`: 29 bài, **1 giao dịch** `Vf5xODbUk3KT15bFnu12bg`, mỗi bài ghim revision đã đọc, **0 xung đột**. Không đụng `rewriteApproved`, ảnh, ngày, thứ tự |
| Publish | 08:13:34 |
| Preview đọc Sanity (`/_bioa-cms.json` → `fetchedAt`) | 08:13:48 |
| Preview phục vụ nội dung mới | 08:14:27, **≈ 53 giây** sau Publish |
| `tools/cms-preview-status.mjs` | **UP TO DATE**; Draft chưa Publish: 0 |
| Nội dung Preview đang phục vụ | 77 trang tải về (`preview-mirror`); `tests/r28-blog-rewrite-audit.mjs` trên chính các trang này: **58/58 trang PASS**, độ trùng tối đa 0,099, 29 bài vẫn noindex và không có trong sitemap |
| Giá trị "123" của Owner | Còn nguyên (đọc lại sau khi ghi) |

Kết luận cho yêu cầu R28 mục 3 và VI-first mục 9.10 ("Nội dung Published thực sự hiển thị trên CMS Preview"): **PASS** với dữ liệu thật.

## 2. Bộ dịch VI→EN trên dữ liệu thật — chạy thử KHÔNG GHI (`i18n-dry-page-home.txt`)

- **`page-home`:**
  - 119 đoạn, so với cặp VI/EN đã duyệt trong repo;
  - hệ thống phát hiện **đúng 1 đoạn** cần dịch: H1 "…Bio-A Group 123", 37 ký tự; 118 đoạn còn lại không gửi đi dịch;
  - lần ghi được ghim revision của Owner.
- **Provider kiểm thử** (`test`): sẽ ghi `t_f10d1d2f.en` + trạng thái SYNCED.
- **Provider hiện tại** (`none`): FAILED "Chưa kích hoạt dịch vụ dịch tự động…", EN giữ nguyên.
- Không có gì được ghi vào Sanity.

## 3. Kịch bản VI-first (mục 9 của yêu cầu)

`tests/cms-i18n.test.mjs` chạy offline (kho Sanity giả có ngữ nghĩa revision thật), provider `test`.

| # | Kịch bản | Kết quả |
|---|---|---|
| 1 | Sửa tiêu đề VI → EN tự cập nhật | PASS (offline) |
| 2 | Sửa mô tả SEO VI → EN tự cập nhật | PASS (offline) |
| 3 | Sửa Blog VI → EN cập nhật, giữ cấu trúc | PASS (offline) |
| 4 | Không sửa VI → không dịch lại | PASS (offline) |
| 5 | EN khóa / EN sửa tay → không bị ghi đè | PASS (offline) |
| 6 | Hai lần Publish liên tiếp → không ghi đè sai revision | PASS (offline) |
| 7 | Dịch thất bại → không mất dữ liệu, không lặp | PASS (offline) |
| 8 | Retry → đồng bộ thành công | PASS (offline) |
| 9 | Reload → trạng thái và dữ liệu giữ nguyên (lưu trong tài liệu) | PASS (offline) |
| 10 | Nội dung Published hiển thị trên Preview | **PASS (thật, mục 1)** |
| 1–9 với dịch vụ dịch thật trên Sanity + Preview | — | **BLOCKED**: chưa có dịch vụ dịch được duyệt, chưa deploy Studio/Worker (xem `VI_FIRST_CMS.md` §6) |
