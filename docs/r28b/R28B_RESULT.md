# R28b — Sửa theo phản hồi Owner và đưa Blog lên Preview

**Ngày:** 20/11/2026.

**Nhánh:** `r28/blog-icon-cms`, tiếp nối R28 `4205597`.
- PR nháp `zireyyyy/bioagroup#14` chỉ để chạy CI, **không merge**.
- `cms-preview` được fast-forward tới HEAD R28b.
- Production `main` `9d044a7` **không đổi** (vẫn bảo trì).

**Không tuyên bố OWNER PASS.**

## 1. Kết quả

| # | Hạng mục | Kết quả | Trạng thái |
|---|---|---|---|
| 1 | Icon thẻ "Dịch Vụ Bio-A Group" (Mobile) | Ô logo **37×37 = ô số thứ tự** (đúng Merywood), logo 20×20 giữ tỷ lệ. Hết khoảng trắng ≈140px dưới mô tả. 5 slide bằng nhau, ảnh giữ tỷ lệ 295/315. Tablet / Desktop không đổi | PASS tự động (Chrome + WebKit). Chờ Owner kiểm trên iPhone |
| 2 | Popup tư vấn | Khôi phục ô một khối đã duyệt (CHAT-C4B), bỏ nút Zalo trùng. Ô này gọi hotline. Header, hàng icon và vùng tin nhắn **giống hệt bản đã duyệt** (đo 0px sai khác). Thêm Esc để đóng | PASS tự động. Chờ Owner xác nhận bố cục |
| 3 | CMS Sync | Owner đã xác nhận PASS. **Đóng**, không chạy lại quy trình sửa | Owner PASS (giữ nguyên) |
| 4 | 29 bài Blog trên CMS Preview | `/blog/` và `/en/blog/` liệt kê đủ 38 bài: 9 bài đã duyệt đứng đầu, rồi 29 bài chờ duyệt. Chỉ bật trên CMS Preview; Production không đổi. Vẫn noindex, không vào sitemap, `rewriteApproved` không đổi | PASS tự động. Chờ Owner đọc duyệt |

Nguyên nhân gốc và cách sửa: `ROOT_CAUSE.md`. Danh sách đủ 29 URL VI/EN: `BLOG_29_PREVIEW_URLS.md`.

## 2. Commit (nhánh `r28/blog-icon-cms`)

| Commit | Nội dung | Tệp |
|---|---|---|
| `2c29e08` | Icon và khoảng trắng thẻ dịch vụ Mobile; ô liên hệ một khối của popup; Esc | `bioa-home-refine.mjs`, `tests/r28b-owner-fix.mjs` (mới), `tests/r27-content-audit.mjs`, `tests/r27-browser-defects.mjs`, `tests/chat-ui-probe.mjs` |
| `644c2a4` | Danh sách Blog có 29 bài chờ duyệt, **chỉ trên CMS Preview** | `bioa-blog-refine.mjs`, `tests/r28b-blog-preview-list.mjs` (mới) |
| `534dabd` | Cổng kiểm thử: phạm vi R28b, final gate, phê duyệt module, bước CI | `tests/phase-diff-scope.mjs`, `tests/p0a-final-gate.mjs`, `tests/p0a-module-isolation.test.mjs`, workflow CI |
| `f8dcd24` | Hợp đồng P1/P2: logo thẻ dịch vụ Mobile 20×20 trong ô 37px | `tests/p1p2-icon-tablet-type.mjs` |
| *(docs)* | `docs/r28b/*` + bàn giao | HEAD cuối = SHA trong tên ZIP |

## 3. Cách bật danh sách bài chờ duyệt

`bioa-blog-refine.mjs` → `BLOG_PREVIEW_LIST_PENDING`.

**Bật khi:**
- Cloudflare build nhánh `cms-preview` (`CF_PAGES_BRANCH=cms-preview`), hoặc
- đặt `BIOA_BLOG_PREVIEW_PENDING=1` để kiểm thử cục bộ.

**Production:**
- nhánh `main` → **tắt**;
- không cần đổi biến môi trường hay cấu hình Cloudflare nào.

**Khi bật:**
- Bài chờ duyệt vẫn `noindex, follow`.
- Trang danh sách 2–6 (có bài chờ duyệt) cũng `noindex, follow`, nên không vào sitemap.
- Trang 1 (chỉ bài đã duyệt) vẫn index như cũ.
- Bài trước/bài tiếp theo đi theo danh sách.

## 4. Kiểm thử

Chi tiết trong `QA_MATRIX.md`.

## 5. Cần Owner phê duyệt

1. **iPhone:** icon thẻ dịch vụ và khoảng cách thẻ trên `/dich-vu-khac/` + `/en/dich-vu-khac/`.
2. **Popup:**
   - xác nhận bố cục đã khôi phục (giống bản đã duyệt, chỉ khác ô cuối gọi hotline thay ô nhập tin);
   - nếu vẫn muốn header / hàng icon / khoảng trắng gọn hơn **bản đã duyệt**, cần chỉ rõ để làm thiết kế mới (xem `ROOT_CAUSE.md` §2).
3. **29 bài:**
   - đọc trên Preview;
   - bật `rewriteApproved` từng bài đồng ý;
   - quyết định đổi slug kèm 301 (đề xuất trong `docs/r28/BLOG_29_REWRITE_REPORT.md`);
   - quyết định giữ hay gỡ bài nước hoa ô tô (nhóm C).
4. **Còn từ R28** (không đổi trong R28b):
   - VI-first tự dịch: chọn dịch vụ, cho deploy Studio / Worker, tạo token ghi;
   - các mục pháp lý / doanh nghiệp R26–R27.

## BẠN CẦN TEST GÌ

**Phân loại:** UI-RESPONSIVE + CONTENT (chỉ CMS Preview). Production không đổi.

1. **iPhone** → https://cms-preview.bioagroup.pages.dev/dich-vu-khac/ và `/en/dich-vu-khac/` → khối "Dịch Vụ Bio-A Group":
   - lướt đủ 5 thẻ;
   - ô logo BIO-A **cùng cỡ** ô số "01…05";
   - không còn khoảng trắng lớn dưới đoạn mô tả;
   - **PASS** nếu đúng ở cả 5 thẻ. **FAIL:** gửi ảnh chụp + model iPhone.
2. **Máy tính 1440 và iPad:** cùng khối → **không đổi** so với trước.
3. **Popup** (bấm ảnh đại diện góc phải dưới, trên điện thoại và máy tính):
   - hàng biểu tượng WhatsApp / Facebook / Telegram / Zalo;
   - ô cuối "Gọi hotline 0779 399 379" có nút tròn xanh, **không còn nút "Nhắn Zalo" trùng**;
   - bấm ngoài, nút thu gọn hoặc phím Esc đều đóng được;
   - **PASS** nếu đúng bố cục bạn đã duyệt.
4. **Blog** → https://cms-preview.bioagroup.pages.dev/blog/ và `/en/blog/`:
   - 6 trang danh sách, tổng 38 bài;
   - bấm vài thẻ ở trang 2–6 → mở đúng bài.
5. **Production** `bioagroup.vn`: vẫn trang bảo trì (không cần test thêm).

**Trạng thái:**

| Loại kiểm tra | Trạng thái |
|---|---|
| CODE / BUILD | PASS |
| Kiểm thử tự động | PASS |
| CMS Preview (Chrome + WebKit, Blog 38 bài) | PASS |
| OWNER RUNTIME | **PENDING** |
