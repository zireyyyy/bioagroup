# R28 — Icon BIO-A trên Mobile `/dich-vu-khac/` + bong bóng gợi ý chat

**Commit:** `410a4ad` (code + test), phê duyệt module `a5cd9d2`. Owner của code: `bioa-home-refine.mjs`, nơi giữ CSS icon canonical và script chat dùng chung.

## 1. Icon có kích thước không đồng nhất

**Hiện trạng (đo trên bản R27, Chrome mobile + WebKit/iPhone 13 & SE, VI/EN):**
- Trang Dịch Vụ Khác có 2 nhóm icon:
  - **thẻ dịch vụ** (`.block-how-works .step__icon`);
  - **danh sách quy trình** (`.block-right-choice .client__icon`): 5 icon Merywood + 1 ô monogram BIO-A (bước 03).
- Trên Mobile (≤ 768px):
  - 5 icon Merywood: khung **30×30**, hình **16×16**;
  - ô BIO-A: khung **42×42**, hình **22×27**.
- Thẻ dịch vụ 01/02: đồng nhất với nhau (khung 42, hình 22×27), không lỗi.

**Nguyên nhân gốc:**
- Rule Mobile canonical `@media(max-width:768px)` dùng một selector chung cho cả `.block-how-works .step__icon` và `.block-right-choice .client__icon`.
- Kích thước 42px là của **ô thẻ dịch vụ**, nhưng bị áp cho ô BIO-A **trong danh sách**, nơi các icon bên cạnh dùng khung 30px của Merywood.

**Sửa (đúng chỗ sở hữu, không thêm lớp ghi đè mới):**
- Bỏ `.block-right-choice` khỏi selector ô 42px.
- Thêm một rule Mobile cho `img.bioa-why-icon-bioa` trong danh sách: hình 16×16, giống icon bên cạnh; monogram vẫn nằm gọn, không bị kéo méo.
- Khung giữ 30px theo nguồn Merywood.

**Sau sửa:** 320 / 375 / 390 / 428 / 768, VI/EN, Chrome + WebKit:
- ô BIO-A trong danh sách: **30×30, hình 16×16**, bằng các icon bên cạnh;
- thẻ dịch vụ không đổi.

| Bề mặt | Kết quả |
|---|---|
| Mobile | Sửa theo mô tả trên |
| Tablet 834 / 1024 | Không đổi (khung bằng nhau trong nhóm) |
| Desktop 1440 / 1920 | Không đổi (khung bằng nhau trong nhóm) |

**Ghi nhận, không sửa** (Desktop đã được Owner PASS và khóa):
- Ở 1440, monogram BIO-A trong danh sách cao 27px so với icon vuông 22,5px bên cạnh, do tỷ lệ dọc của logo.
- Khung vẫn bằng nhau.
- Nếu Owner muốn đồng nhất cả điểm này trên Desktop, cần yêu cầu riêng.

**Ảnh trước/sau** (`evidence/r28/`):
- `icon-before-list-iphone13.png` → `icon-after-list-iphone13.png`;
- `icon-before-card01/02-*.png` → `icon-after-card01/02-*.png`.

Trượt slide (swiper thẻ dịch vụ): kích thước khung giữ nguyên qua các slide (bài test đo mọi slide đang hiển thị).

## 2. Bong bóng gợi ý chat che nội dung trên Mobile

**Xác nhận lỗi:**
- Trên Mobile, bong bóng gợi ý (`.is-teaser`) xuất hiện sau ~4,2 giây và nằm đè lên phần văn bản đang đọc ở góc dưới phải cho tới khi người dùng bấm đóng.
- Tablet / Desktop không thuộc phạm vi báo lỗi và không được thay đổi.

**Sửa:**
- Chỉ trên Mobile (≤ 768px), bong bóng **tự ẩn sau 8 giây** hoặc khi người dùng **cuộn tiếp ~1/3 màn hình**.
- Nút liên hệ (avatar) vẫn giữ nguyên.
- Tablet / Desktop: không đổi.

## 3. Kiểm thử

**`tests/r28-mobile-icon-chat.mjs`: 74/74 PASS.**
- Phạm vi:
  - 4 trang: Dịch Vụ Khác VI/EN, Gia Công Mỹ Phẩm VI/EN;
  - 9 độ rộng: 320, 375, 390, 428, 768, 834, 1024, 1440, 1920.
- Nội dung kiểm:
  - khung icon bằng nhau trong mỗi nhóm;
  - hình BIO-A không lớn hơn icon bên cạnh trên Mobile;
  - bong bóng tự ẩn trên Mobile (cuộn / 8 giây), nút liên hệ còn;
  - không đổi hành vi ở 834 / 1440.
- **Chạy trên bản R27: FAIL đúng lỗi** (khung 42 giữa các khung 30, hình 22×27 so với 16; bong bóng không tự ẩn): `evidence/r28/icon-chat-on-r27-build.txt`.

**Thêm** (xem `QA_MATRIX.md`):
- WebKit (engine Safari) giả lập iPhone 13 / SE;
- zoom 125%;
- E2E trên CMS Preview.

**Chưa kiểm:** iPhone thật.
