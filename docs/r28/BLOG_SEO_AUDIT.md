# R28 — Kiểm tra SEO 29 bài Blog

**Bài test:** `tests/r28-blog-rewrite-audit.mjs` (có trong CI).
- Kết quả: **58 trang (29 × VI/EN), 0 lỗi**. Báo cáo máy: `evidence/r28/gates/r28-blog.json`.
- Chạy trên bản R27: FAIL hàng loạt (tiêu đề/mô tả cũ, độ trùng 0,81).

## Bài test kiểm tra gì (mỗi trang)

| Kiểm tra | Yêu cầu |
|---|---|
| `<title>` | bắt đầu bằng tiêu đề SEO riêng của bài; không trùng với trang nào |
| meta description | đúng mô tả của bài; 90–210 ký tự; không trùng |
| Tiêu đề SEO | ≤ 66 ký tự |
| H1 | đúng tiêu đề bài. Template Blog đã khóa có 2 thẻ H1 (bản desktop `.block-title-post__title` + bản mobile `.block-title-post-mobile__title`, mỗi kích thước màn hình chỉ hiện 1), giống mọi bài đã duyệt. Không có H1 nào khác |
| H2 / TOC | số mục TOC = số H2 = số mục dữ liệu; anchor khớp |
| canonical, hreflang | canonical tự trỏ; hreflang vi, en, x-default đúng |
| BlogPosting JSON-LD | hợp lệ; có headline, datePublished, image |
| Link nội bộ | có link tới Gia Công Mỹ Phẩm, Dịch Vụ Khác, Liên Hệ |
| Ảnh nội dung | có alt |
| Module đã khóa | đủ 7 module |
| Noindex / sitemap | bài vẫn noindex; không có trong sitemap |
| Từ ngữ tuyên bố | không "top N", "số 1", "tốt nhất", "best", "cam kết 100%", "guarantee", "trị dứt điểm", "đặc trị", "cures", "FDA", "công suất …", "… khách hàng". Ví dụ phản biện trong ngoặc kép được bỏ qua |
| Cặp VI/EN | cùng cấu trúc |
| Độ trùng | ≤ 0,25 |

## Sửa phát sinh trong lúc kiểm tra

- **TITLECASE-ACRONYM:** bộ chuẩn hóa tiêu đề tiếng Việt viết "Spf", "Uva", "Tp.hcm", "Pet, Pp Và Pe" ở H1/H2/H3. Lỗi này có sẵn, ảnh hưởng cả 2 bài đã duyệt: `10-tieu-chi-…-kem-chong-nang`, `dia-chi-…-tai-tphcm`.
  - Sửa: thêm SPF, UV, UVA, UVB, TP.HCM, PET, PP, PE vào danh sách giữ nguyên của chính hàm đó.
  - Hai bài đã duyệt chỉ đổi chữ hoa ở H1/H2/H3/TOC (cổng phạm vi R28 giới hạn đúng các phần tử này).
- **Từ ngữ ngoài lĩnh vực (quy tắc R27):** "vitamin C/E", "thực phẩm chức năng", "supplements" được thay bằng cách diễn đạt khác.
- **Ngôn từ tuyệt đối:** "tốt nhất", "best", "guarantee", "đặc trị" (dù ở câu phủ định) được viết lại.

## Tiêu đề trước / sau

| Slug | Tiêu đề trước (VI) | Tiêu đề SEO VI (ký tự) | Tiêu đề SEO EN (ký tự) | Mô tả VI / EN (ký tự) |
|---|---|---|---|---|
| `gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau` | Gia Công Kem Làm Sáng Vùng Nhạy Cảm: Công Thức Và Tiêu Chí An Toàn | Gia Công Kem Dưỡng Vùng Nhạy Cảm: An Toàn Và Công Dụng (54) | Intimate-Area Care Cream Manufacturing: Safety and Claims (57) | 168 / 176 |
| `dia-chi-gia-cong-san-xuat-my-pham-uy-tin-chat-luong-tai-tphcm-1` | Gia Công Mỹ Phẩm TP.HCM: Checklist Chọn Nhà Máy Trước Khi Ký | Ký Hợp Đồng Gia Công Mỹ Phẩm Tại TP.HCM: Danh Sách Kiểm Tra (59) | Cosmetic Manufacturing Contract Checklist: Ho Chi Minh City (59) | 168 / 185 |
| `7-ly-do-ban-nen-lua-chon-gia-cong-my-pham-tron-goi-tai-bio-a-group` | Gia Công Mỹ Phẩm Trọn Gói: 7 Tiêu Chí Đánh Giá Dịch Vụ | Gia Công Mỹ Phẩm Trọn Gói: 7 Tiêu Chí Đánh Giá (46) | Turnkey Cosmetic Manufacturing: 7 Evaluation Criteria (53) | 154 / 168 |
| `xu-huong-thi-truong-tay-te-bao-chet-2026-co-hoi-cho-thuong-hieu-my-pham-moi` | Xu Hướng Tẩy Tế Bào Chết 2026: 5 Hướng Phát Triển Sản Phẩm | Phát Triển Sản Phẩm Tẩy Tế Bào Chết Cho Thương Hiệu Mới (55) | Developing Exfoliating Products for New Cosmetic Brands (55) | 172 / 163 |
| `nuoc-hoa-o-to-la-gi-vi-sao-hien-nay-rat-duoc-ua-chuong` | Nước Hoa Ô Tô Là Gì? Các Dạng Sản Phẩm Và Tiêu Chí Phát Triển | Nước Hoa Ô Tô Là Gì? Các Dạng Phổ Biến, Lưu Ý An Toàn (53) | Car Fragrance: Common Formats and Safety Notes (46) | 183 / 154 |
| `an-gi-de-chong-lao-hoa-da` | Ăn Gì Để Hỗ Trợ Da Khỏe? Dinh Dưỡng Và Lão Hóa Da | Ăn Gì Để Hỗ Trợ Làn Da Khỏe Khi Lão Hóa? (40) | Nutrition and Skin Ageing: Habits Worth Keeping (47) | 143 / 148 |
| `tong-hop-15-cach-lam-sua-tam-trang-tai-nha-don-gian` | Sữa Tắm Làm Sáng Da Tại Nhà: Điều Cần Biết Trước Khi Tự Pha | Sữa Tắm Trắng Tự Làm: Rủi Ro Cần Biết Trước Khi Thử (51) | Homemade Whitening Body Wash: Risks to Know (43) | 156 / 157 |
| `huong-dan-cach-dung-tinh-dau-tram-tra-tri-mun-va-cham-soc-toc` | Tinh Dầu Tràm Trà Cho Da Và Tóc: Cách Dùng An Toàn | Tinh Dầu Tràm Trà Cho Da Mụn Và Tóc: Pha Loãng, Lưu Ý (53) | Tea Tree Oil for Acne-Prone Skin and Scalp: Precautions (55) | 167 / 164 |
| `top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm` | Top Công Ty Gia Công Mỹ Phẩm TP.HCM: Cách Kiểm Chứng Trước Khi Chọn | Kiểm Chứng Công Ty Gia Công Mỹ Phẩm Tại TP.HCM Trước Khi Chọn (61) | Verify a Cosmetic Manufacturer in Ho Chi Minh City First (56) | 180 / 166 |
| `ban-co-biet-da-minh-thuoc-loai-da-nao-khong` | Cách Xác Định Loại Da: Da Thường, Dầu, Khô, Hỗn Hợp Và Nhạy Cảm | Cách Nhận Biết Loại Da Và Chọn Sản Phẩm Phù Hợp (47) | How to Identify Your Skin Type and Choose Products (50) | 154 / 139 |
| `gia-cong-son-moi-tron-goi-doc-quyen-bio-a-group` | Gia Công Son Môi Trọn Gói: Công Thức, Màu, Bao Bì Và Quy Trình | Gia Công Son Môi Trọn Gói: Màu, Kết Cấu, Bao Bì, An Toàn (56) | Turnkey Lipstick Manufacturing: Colour, Texture, Safety (55) | 156 / 153 |
| `5-dau-hieu-nhan-biet-mot-don-vi-gia-cong-my-pham-uy-tin` | 5 Dấu Hiệu Nhận Biết Một Đơn Vị Gia Công Mỹ Phẩm Uy Tín | 5 Dấu Hiệu Nhận Biết Đơn Vị Gia Công Mỹ Phẩm Uy Tín (51) | 5 Signs of a Reliable Cosmetic Manufacturer (43) | 177 / 181 |
| `cong-dung-cua-bo-hat-mo-trong-cham-soc-suc-khoe-da` | Bơ Hạt Mỡ Trong Mỹ Phẩm: Công Dụng Và Cách Xây Dựng Công Thức | Bơ Hạt Mỡ (Shea Butter) Trong Chăm Sóc Da: Công Dụng, Lưu Ý (59) | Shea Butter in Skincare: Uses and Considerations (48) | 181 / 165 |
| `gia-cong-kem-body-tron-goi-tai-nha-may-bio-a-group` | Gia Công Kem Body Trọn Gói: Từ Brief Đến Sản Xuất | Gia Công Kem Body Trọn Gói: Quy Trình Và Quyết Định Chính (57) | Turnkey Body Cream Manufacturing: Process and Decisions (55) | 154 / 167 |
| `top-10-kem-tay-te-bao-chet-cho-da-kho-duoc-ua-chuong-nhat-hien-nay` | Tẩy Tế Bào Chết Cho Da Khô: Cách Chọn Công Thức Phù Hợp | Chọn Kem Tẩy Tế Bào Chết Cho Da Khô: 6 Tiêu Chí (47) | Choosing an Exfoliator for Dry Skin: 6 Criteria (47) | 166 / 139 |
| `mun-trung-ca-la-gi-nguyen-nhan-va-phuong-phap-dieu-tri-hieu-qua` | Mụn Trứng Cá Là Gì? Cách Chăm Sóc Da Mụn An Toàn | Mụn Trứng Cá Là Gì? Nguyên Nhân Và Cách Chăm Sóc Da (51) | What Is Acne? Causes, Skincare and When to See a Doctor (55) | 165 / 169 |
| `boi-nghe-tuoi-truc-tiep-len-mat-co-that-su-hieu-qua` | Bôi Nghệ Tươi Lên Mặt Có Nên Không? Lợi Ích, Rủi Ro Và Cách Dùng | Bôi Nghệ Tươi Lên Mặt Có Nên Không? Lợi Ích Và Rủi Ro (53) | Fresh Turmeric on the Face: Benefits and Risks (46) | 169 / 171 |
| `cach-de-xit-body-mist-thom-lau` | Cách Xịt Body Mist Thơm Lâu: Vị Trí Xịt, Bảo Quản Và Công Thức | Cách Xịt Body Mist Thơm Lâu Hơn Và Điều Nên Tránh (49) | How to Make Body Mist Last Longer (33) | 146 / 155 |
| `top-20-cong-ty-gia-cong-my-pham-tp-hcm-uy-tin` | Công Ty Gia Công Mỹ Phẩm TP.HCM: Cách So Sánh Báo Giá Và Năng Lực | So Sánh Báo Giá Gia Công Mỹ Phẩm Tại TP.HCM: Đọc Từng Khoản (59) | Comparing Cosmetic Manufacturing Quotes in Ho Chi Minh City (59) | 178 / 182 |
| `bao-bi-tang-hieu-qua-ban-hang-khong-doanh-nghiep-kinh-doanh-my-pham-can-luu-y-gi` | Bao Bì Mỹ Phẩm Có Ảnh Hưởng Bán Hàng? 6 Tiêu Chí Cần Chốt | Bao Bì Mỹ Phẩm Và Hiệu Quả Bán Hàng: 6 Điểm Cần Lưu Ý (53) | Cosmetic Packaging and Sales: 6 Points to Consider (50) | 169 / 154 |
| `nhung-cach-lam-gel-lot-mun-handmade-de-dang` | Gel Lột Mụn Handmade Có Nên Dùng? Rủi Ro Và Lựa Chọn An Toàn | Gel Lột Mụn Tự Làm: Rủi Ro Và Cách An Toàn Hơn (46) | DIY Peel-Off Blackhead Gels: Risks and Safer Options (52) | 164 / 145 |
| `mun-viem-la-gi-cham-soc-da-co-mun-viem-nhu-the-nao` | Mụn Viêm Là Gì? Cách Chăm Sóc Và Khi Nào Nên Gặp Bác Sĩ | Mụn Viêm Là Gì? Cách Chăm Sóc Da Có Mụn Viêm (44) | Inflamed Acne: How to Care for Your Skin (40) | 158 / 176 |
| `kinh-nghiem-cho-nguoi-moi-gia-cong-my-pham` | Kinh Nghiệm Gia Công Mỹ Phẩm Cho Người Mới: 6 Việc Cần Chuẩn Bị | Gia Công Mỹ Phẩm Cho Người Mới: 6 Việc Cần Chuẩn Bị (51) | Cosmetic Manufacturing for Beginners: 6 Things to Prepare (57) | 160 / 172 |
| `vi-sao-can-kiem-nghiem-spf-kem-chong-nang-truoc-khi-dua-ra-thi-truong` | Kiểm Nghiệm SPF Kem Chống Nắng: Vì Sao Phải Làm Trước Khi Bán | Vì Sao Cần Kiểm Nghiệm SPF Kem Chống Nắng Trước Khi Bán? (56) | Why Sunscreen SPF Testing Is Needed Before Launch (49) | 153 / 133 |
| `tips-lua-chon-chat-lieu-bao-bi-my-pham-phu-hop-bio-a-group` | Chất Liệu Bao Bì Mỹ Phẩm: Nhựa, Thủy Tinh, Nhôm Và Cách Chọn | Chọn Chất Liệu Bao Bì Mỹ Phẩm: Nhựa, Thủy Tinh, Nhôm, Giấy (58) | Cosmetic Packaging Materials: Plastic, Glass, Aluminium, Paper (62) | 163 / 156 |
| `10-cong-dung-bat-ngo-cua-ba-ca-phe-trong-lam-dep-va-doi-song` | Bã Cà Phê Trong Làm Đẹp Và Đời Sống: 10 Cách Sử Dụng Hợp Lý | Bã Cà Phê Trong Làm Đẹp Và Đời Sống: Dùng Sao Cho An Toàn (57) | Coffee Grounds in Beauty and Daily Life: Safe Uses (50) | 154 / 170 |
| `san-pham-kem-chong-nang-bi-thu-hoi` | Kem Chống Nắng Bị Thu Hồi Vì SPF: Bài Học Cho Thương Hiệu | Vì Sao Kem Chống Nắng Bị Thu Hồi? Bài Học Chất Lượng (52) | Why Sunscreens Get Recalled: Quality Control Lessons (52) | 161 / 157 |
| `top-10-xuong-gia-cong-tai-ha-noi-uy-tin` | Xưởng Gia Công Mỹ Phẩm Hà Nội: Checklist Chọn Đối Tác Phù Hợp | Thương Hiệu Hà Nội Chọn Xưởng Gia Công Mỹ Phẩm: Cần Kiểm Tra Gì? (64) | Hanoi Brands Choosing a Cosmetic Manufacturer: What to Check (60) | 168 / 174 |
| `nguyen-lieu-san-xuat-my-pham-thien-nhien` | Nguyên Liệu Mỹ Phẩm Thiên Nhiên: Cách Chọn Và Kiểm Soát Chất Lượng | Nguyên Liệu Thiên Nhiên Trong Mỹ Phẩm: Ưu Điểm Và Giới Hạn (58) | Natural Cosmetic Ingredients: Advantages and Limits (51) | 177 / 156 |
