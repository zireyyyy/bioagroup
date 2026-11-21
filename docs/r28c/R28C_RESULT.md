# R28c — Đăng 29 bài Blog, đổi slug kèm 301 (theo quyết định của Owner)

**Ngày:** 20/11/2026.

**Nhánh:** `r28/blog-icon-cms`, tiếp nối R28b.
- PR nháp `zireyyyy/bioagroup#14` chỉ để chạy CI, **không merge**.
- `cms-preview` = HEAD R28c.
- Production `main` `9d044a7` **không đổi** (vẫn bảo trì).

**Không tuyên bố OWNER PASS hay PUBLIC LAUNCH READY.**

## 1. Quyết định của Owner (20/11/2026)

1. Xem lại nội dung và duyệt đăng **tất cả 29 bài**.
2. Đổi slug kèm 301 theo đề xuất R28.
3. **Giữ** bài nước hoa ô tô.
4. Pháp lý (Chính sách bảo mật + Chính sách cookie): **PASS**.

## 2. Duyệt lại nội dung

**Phạm vi đọc:**
- đọc toàn bộ bản VI của 29 bài (tiêu đề, mô tả, mở bài, các mục, ghi chú);
- đọc mẫu bản EN.

**Kết luận: không cần sửa nội dung.**
- Không có thông tin sai đã biết.
- Không có tuyên bố điều trị: các bài da liễu / sức khỏe đều có mục "khi nào cần gặp bác sĩ" và ghi chú không thay thế tư vấn y khoa.
- Không có "top / số 1 / cam kết 100%".
- Không nói quá về năng lực BIO-A: phạm vi dịch vụ ghi "xác nhận theo từng dự án".
- Bài nước hoa ô tô ghi rõ đây không phải mỹ phẩm.

Kiểm thử tự động (`r28-blog-rewrite-audit`):
- 58 trang PASS;
- độ trùng tối đa giữa các bài 0,099;
- cấu trúc VI/EN khớp nhau;
- 1 H1, TOC = H2, JSON-LD BlogPosting.

## 3. Đổi slug + 301 (13 bài)

Mỗi URL cũ, cả VI và `/en/`, trả về **HTTP 301** tới URL mới (`_bioa-redirects.json` + middleware). Canonical, hreflang, JSON-LD và sitemap dùng URL mới.

16 bài còn lại giữ nguyên slug, vì slug cũ không gây hiểu nhầm.

| # | Bài | URL cũ (301) | URL mới |
|---|---|---|---|
| 1 | Gia Công Kem Dưỡng Vùng Nhạy Cảm: Yêu Cầu An Toàn Và Công Dụng Phù Hợp | `/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/` | `/blog/gia-cong-kem-duong-vung-nhay-cam/` |
| 2 | Gia Công Mỹ Phẩm Trọn Gói: 7 Tiêu Chí Đánh Giá Dịch Vụ | `/blog/7-ly-do-ban-nen-lua-chon-gia-cong-my-pham-tron-goi-tai-bio-a-group/` | `/blog/gia-cong-my-pham-tron-goi-7-tieu-chi-danh-gia/` |
| 3 | Sản Phẩm Tẩy Tế Bào Chết: Hướng Phát Triển Cho Thương Hiệu Mỹ Phẩm Mới | `/blog/xu-huong-thi-truong-tay-te-bao-chet-2026-co-hoi-cho-thuong-hieu-my-pham-moi/` | `/blog/phat-trien-san-pham-tay-te-bao-chet-cho-thuong-hieu-moi/` |
| 4 | Sữa Tắm Trắng Tự Làm Tại Nhà: Những Rủi Ro Cần Biết Trước Khi Thử | `/blog/tong-hop-15-cach-lam-sua-tam-trang-tai-nha-don-gian/` | `/blog/sua-tam-trang-tu-lam-tai-nha-rui-ro-can-biet/` |
| 5 | Tinh Dầu Tràm Trà Cho Da Mụn Và Da Đầu: Cách Pha Loãng Và Lưu Ý | `/blog/huong-dan-cach-dung-tinh-dau-tram-tra-tri-mun-va-cham-soc-toc/` | `/blog/tinh-dau-tram-tra-cho-da-mun-va-da-dau/` |
| 6 | Kiểm Chứng Thông Tin Công Ty Gia Công Mỹ Phẩm Tại TP.HCM Trước Khi Chọn | `/blog/top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm/` | `/blog/kiem-chung-cong-ty-gia-cong-my-pham-tai-tphcm/` |
| 7 | Gia Công Son Môi Trọn Gói: Màu, Kết Cấu, Bao Bì Và An Toàn | `/blog/gia-cong-son-moi-tron-goi-doc-quyen-bio-a-group/` | `/blog/gia-cong-son-moi-tron-goi/` |
| 8 | Chọn Kem Tẩy Tế Bào Chết Cho Da Khô: Tiêu Chí Thay Vì Bảng Xếp Hạng | `/blog/top-10-kem-tay-te-bao-chet-cho-da-kho-duoc-ua-chuong-nhat-hien-nay/` | `/blog/chon-kem-tay-te-bao-chet-cho-da-kho/` |
| 9 | Mụn Trứng Cá Là Gì? Nguyên Nhân, Chăm Sóc Da Và Khi Nào Cần Gặp Bác Sĩ | `/blog/mun-trung-ca-la-gi-nguyen-nhan-va-phuong-phap-dieu-tri-hieu-qua/` | `/blog/mun-trung-ca-la-gi-nguyen-nhan-va-cham-soc-da/` |
| 10 | So Sánh Báo Giá Gia Công Mỹ Phẩm Tại TP.HCM: Đọc Đúng Từng Khoản | `/blog/top-20-cong-ty-gia-cong-my-pham-tp-hcm-uy-tin/` | `/blog/so-sanh-bao-gia-gia-cong-my-pham-tai-tphcm/` |
| 11 | Gel Lột Mụn Tự Làm Tại Nhà: Rủi Ro Và Cách Làm Sạch Lỗ Chân Lông An Toàn Hơn | `/blog/nhung-cach-lam-gel-lot-mun-handmade-de-dang/` | `/blog/gel-lot-mun-tu-lam-rui-ro-va-cach-an-toan/` |
| 12 | Bã Cà Phê Trong Làm Đẹp Và Đời Sống: Cách Dùng An Toàn | `/blog/10-cong-dung-bat-ngo-cua-ba-ca-phe-trong-lam-dep-va-doi-song/` | `/blog/ba-ca-phe-trong-lam-dep-va-doi-song/` |
| 13 | Thương Hiệu Ở Hà Nội Chọn Xưởng Gia Công Mỹ Phẩm: Gần Hay Xa Đều Cần Kiểm Tra Gì? | `/blog/top-10-xuong-gia-cong-tai-ha-noi-uy-tin/` | `/blog/thuong-hieu-ha-noi-chon-xuong-gia-cong-my-pham/` |

## 4. Đăng bài

**Repo** (`bioa-blog-refine.mjs`):
- `BLOG_PENDING_REWRITE` để trống;
- 38 bài VI/EN trong danh sách `/blog/` (6 trang), sắp theo ngày;
- tất cả đều `index, follow` và có trong `sitemap.xml`;
- bài trước / bài tiếp theo đi qua đủ 38 bài.

**Sanity:**
- `tools/cms-approve-blog.mjs --apply`: bật `rewriteApproved` cho 29 bài và đặt slug mới cho 13 bài;
- giao dịch **`r22appgvF9LfESp2TYLVwG`**: 29 tài liệu, ghim revision, 0 Draft;
- có sao lưu trước khi ghi; so sánh trước/sau sạch (chi tiết ở `QA_MATRIX.md` §3).

**Production:**
- chưa có gì thay đổi;
- bài chỉ lên `bioagroup.vn` khi Owner ra lệnh đưa `main` lên và mở website.

## 5. Pháp lý và thông tin doanh nghiệp

- **"Pháp lý"** trong danh sách R26/R27 đúng là **Chính sách bảo mật + Chính sách cookie** (VI/EN).
  - Đã ghi nhận **Owner PASS** với văn bản hiện tại (tên công ty, MST, địa chỉ, hotline, email, quyền của người dùng, thời gian lưu trữ "trong thời gian cần thiết").
  - Không sửa nội dung.
  - Hai trang vẫn để `noindex` như các website thông thường (trang chính sách không cần lên Google). Muốn index thì báo để đổi.
- **Thông tin doanh nghiệp còn mở** (không phải pháp lý, không chặn Blog):
  - lời chứng thực khách hàng thật;
  - MOQ thật;
  - hồ sơ GMP / HACCP;
  - tin tuyển dụng thật;
  - ảnh BIO-A thật;
  - case study;
  - dạng bao bì thực tế.

  Xem `docs/r27/OWNER_CONTENT_INPUTS.md`. Mục "nước hoa ô tô" đã đóng (giữ bài).

## BẠN CẦN TEST GÌ

**Phân loại:** CONTENT + SEO (CMS Preview). Production không đổi.

1. Mở https://cms-preview.bioagroup.pages.dev/blog/ và `/en/blog/`:
   - 6 trang, đủ 38 bài;
   - bấm vài thẻ → mở đúng bài.
2. Mở một URL cũ, ví dụ `https://cms-preview.bioagroup.pages.dev/blog/top-10-xuong-gia-cong-tai-ha-noi-uy-tin/`:
   - tự chuyển sang `/blog/thuong-hieu-ha-noi-chon-xuong-gia-cong-my-pham/`;
   - **PASS** nếu đúng.
3. Mở thêm 1–2 URL cũ bản `/en/` (xem bảng ở §3), cũng phải tự chuyển.
4. Trong Studio, 29 bài đã bật "Đã viết lại — hiển thị lại"; 13 bài mang slug mới.
5. Không cần test lại icon / popup (không đổi trong R28c).

**Trạng thái:**

| Loại kiểm tra | Trạng thái |
|---|---|
| CODE / BUILD | PASS |
| Kiểm thử tự động | PASS: toàn bộ cổng; `r28c-blog-published` 402/402 |
| CMS Preview | PASS: 376/376, 26/26 URL cũ trả 301 |
| OWNER RUNTIME | **PENDING** |
