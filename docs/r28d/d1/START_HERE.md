# BIO-A — R28d-D1 (EN theo đúng VI hiện tại + kiểm khung chữ toàn site): START HERE (23/11/2026)

**Trạng thái: APPROVAL PENDING.**
- Code và QA cục bộ xong. **Chưa ghi Sanity, chưa đưa lên CMS Preview.**
- Không có mục nào được tuyên bố OWNER PASS.

| Mục | Giá trị |
|---|---|
| Nhánh D1 | **`r28d/d1-en-parity`** (từ `bbf21b3`). HEAD = SHA trong tên ZIP |
| Bản xem thử D1 | https://r28d-d1-en-parity.bioagroup.pages.dev/en/ : bản riêng của nhánh, `noindex`, đọc Sanity đã xuất bản (chỉ đọc) |
| CMS Preview | `cms-preview` = `r28/blog-icon-cms` = **`bbf21b3`, KHÔNG đổi** |
| Sanity | **0 lần ghi.** Dry run 3 tài liệu, 0 xung đột (`CMS_DRY_RUN.md`) |
| Production | `main` `9d044a7`, bảo trì, **không đổi**. PR #14 vẫn Draft |

## Bảng trạng thái

| Câu hỏi | Trả lời |
|---|---|
| VI có thay đổi không? | **Không.** Cả 88 trang HTML VI giống hệt từng byte (85 / 88 trang EN cũng vậy). Chỉ 3 trang EN đổi: `/en/`, `/en/about/`, `/en/contract-manufacturing-cosmetics/` |
| EN đã khớp nghĩa VI chưa? | **Rồi**, ở 34 vị trí (49 chuỗi), theo đúng VI cùng vị trí, cùng thiết bị (`VI_EN_CHANGE_MATRIX.md`). Các mục chờ xác minh nhà máy **giữ nguyên** (`FACT_CHECK_PENDING.md`) |
| Khung chữ có an toàn không? | **0 lỗi** (Chrome 12 độ rộng, WebKit 5 độ rộng): không cắt chữ, không đè ảnh / nút, không cuộn ngang, slider chạy đủ |
| Có khung đổi kích thước không? | Có, đúng dự kiến (EN từ 1 dòng thành đoạn đầy đủ). Còn **2 chỗ cao hơn bản VI**, đều ở **320 px**: Why Choose +24 px, Cosmetics QC +21 px. Không cắt chữ (`LAYOUT_QA_MATRIX.md`) |
| Chỉ sửa nội dung hay có sửa giao diện? | **Chỉ nội dung.** 0 dòng CSS / JS giao diện; cổng phạm vi chứng minh chỉ chữ trong các phần đã sửa thay đổi |
| Build cục bộ? | PASS |
| CMS Preview? | **Chưa**, chờ duyệt |
| Sanity? | **Chưa ghi**, chờ duyệt |
| Cần Owner duyệt? | **Có**: mục "Xin duyệt" bên dưới |

## Xin duyệt (một lần, cho đúng các thay đổi này)

1. **Đưa code D1 lên CMS Preview:** fast-forward `r28/blog-icon-cms` và `cms-preview` tới HEAD của nhánh D1.
2. **Ghi Sanity đã xuất bản**, đúng như `CMS_DRY_RUN.md`:
   - 3 tài liệu: `page-home` +28 / −26, `page-about` +1 / −1, `page-cosmetics` +2 / −2;
   - ghim `_rev`, sao lưu mới ngay trước khi ghi;
   - 0 ô chữ nào bạn đã sửa trong Studio bị ghi đè.
3. Sau đó developer kiểm lại trên CMS Preview thật:
   - `/_bioa-cms.json`;
   - `waitingEn = []`;
   - đo lại khung chữ.

**Không nằm trong lần duyệt này:**
- deploy Studio (xem lỗ hổng Studio trong `CMS_DRY_RUN.md` §4);
- Production;
- merge PR;
- sửa VI;
- các mục xác minh nhà máy.

## Đọc thêm

- `VI_EN_CHANGE_MATRIX.md`: từng cặp VI → EN cũ → EN mới.
- `LAYOUT_QA_MATRIX.md`: đo đạc trước / sau.
- `CMS_DRY_RUN.md`: tài liệu, `_rev`, từng ô chữ, sao lưu, khôi phục.
- `FACT_CHECK_PENDING.md`, `ROLLBACK.md`.

## QA (cục bộ, một lần chạy sạch trên bản D1 cuối cùng)

**Bản build:**
- HEAD `d69e61e`, dist 223 tệp (`875525cb…`).
- Đóng băng tại `QA_EVIDENCE/dist-final-r28d1`; dist không đổi sau toàn bộ QA.

| Cổng | Kết quả |
|---|---|
| `test:candidate`, `test:p0a` (determinism, module isolation) | PASS |
| `test:responsive`, 404, Turnstile, `test:chat`, middleware | PASS |
| **Phạm vi phase** R28dD1 và chuỗi cộng dồn R26 → R28dD1 (7 cổng) | **PASS**: chỉ chữ trong các phần đã sửa của 3 trang EN thay đổi |
| `test:cms` (45), **`test:content`**, SEO R26, nội dung R27, Blog R28, `r28c-blog-published` 402/402 | PASS |
| P0B1 24/24, D11 14/14, Careers 186/186 | PASS |
| R27 browser 72/72, R28 icon + chat teaser | PASS |
| **R28b owner-fix** (so với bản tham chiếu đã duyệt) | **1090/1090 PASS** |
| **R28d-A chat form**: Chrome / WebKit | **469/469 / 469/469 PASS** |
| P1/P2, Roadmap Home 36/36, Roadmap Cosmetics 36/36, How It Works 28/28, Home sections 20/20 | PASS |
| Route smoke, Chat UI 60/60, Lead form 36/36 | PASS |
| Tablet: smoke, Swiper, TOC, Contacts/404, full route audit | PASS |
| **Layout QA D1** (Chrome 12 độ rộng + WebKit 5) | **FAIL 0**, FLAG để Owner xem (`LAYOUT_QA_MATRIX.md`) |
| Bản xem thử nhánh D1 (đã phục vụ thật) | Toàn bộ VI giống hệt CMS Preview; chỉ 3 trang EN khác; Sanity đọc trực tiếp, `waitingEn = []` |

**Không chạy:** CI GitHub (workflow chỉ chạy cho nhánh của PR #14; sẽ chạy khi D1 được fast-forward sau khi duyệt).
