# BIO-A — Nguồn ảnh trên website và người quản lý (CMS-R25b)

Tạo tự động bởi `node tools/cms-image-audit.mjs <dist>` trên bản build R24RC2 PASS. Mỗi dòng là một (nguồn, URL, người quản lý) duy nhất; cột Trang gộp các route.

| Nhóm | Số nguồn duy nhất |
|---|---|
| CHƯA QUẢN LÝ | 1 |
| KHÓA | 70 |
| CMS | 75 |

## CHƯA QUẢN LÝ (kèm lý do)

| Nguồn | URL | Lý do | Trang |
|---|---|---|---|
| <img> | bioa-404-original.png | trang ngoài phạm vi CMS (trang 404 owner-PASS) | /404.html, /en/404.html |

## KHÓA (không thuộc phạm vi thay ảnh)

| Nguồn | URL | Lý do | Số trang |
|---|---|---|---|
| favicon | bioa-monogram.svg | favicon thương hiệu BIO-A | 112 |
| <img> | about-icon-01-trang-diem.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| <img> | about-icon-02-cham-soc-toc.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| <img> | about-icon-03-cham-soc-body.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| <img> | about-icon-04-cham-soc-da-mat.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| <img> | about-icon-05-ca-nhan.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| <img> | about-icon-06-me-be.png | Biểu tượng nhỏ owner-PASS (khóa) | 4 |
| style inline (main) | bioa-full.svg | Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3) | 2 |
| khung dùng chung (ngoài <main>) | bioa-monogram.svg | Logo BIO-A / Zalo (bảo vệ) | 110 |
| khung dùng chung (ngoài <main>) | cookie.svg | Banner/biểu tượng cookie (owner-PASS, khóa) | 110 |
| khung dùng chung (ngoài <main>) | bioa-full.svg | Logo BIO-A / Zalo (bảo vệ) | 110 |
| khung dùng chung (ngoài <main>) | bioa-full-light.svg | Logo BIO-A / Zalo (bảo vệ) | 110 |
| khung dùng chung (ngoài <main>) | zalo-bioa-owner.png | Logo BIO-A / Zalo (bảo vệ) | 110 |
| khung dùng chung (ngoài <main>) | bioa-sales-avatar.webp | Khung chat (owner-PASS, khóa) | 110 |
| <style> CSS | bioa-monogram.svg | CSS của thành phần owner-PASS (trang trí/nền) — không phải nội dung | 110 |
| <img> | bioa-monogram.svg | logo/đồ họa BIO-A | 12 |
| <img> | zalo-bioa-owner.png | Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3) | 2 |
| <img> | Group-1-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325508-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 4 |
| <img> | Group-3.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325574.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-4.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-5.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| style inline (main) | bioa-monogram.svg | Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3) | 4 |
| <img> | Group-2087325510.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325514.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Depth-8-Frame-0.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325509.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Icon-4.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325508.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | a82f48d216f6a7d6388e0abf855e90795aeace16.png | Đồ họa cỡ biểu tượng (≤ 96 px, ví dụ dấu chứng nhận GMP/HACCP) — owner-PASS, khóa; mở khóa cần OWNER duyệt | 2 |
| <img> | d405a67134a7f63465941fb9658f009da81d9dc7.png | Đồ họa cỡ biểu tượng (≤ 96 px, ví dụ dấu chứng nhận GMP/HACCP) — owner-PASS, khóa; mở khóa cần OWNER duyệt | 2 |
| <img> | Vector.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325516.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Vector-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325513.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Icon-3.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Icon-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Icon-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | bioa-monogram-cream.svg | Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3) | 4 |
| <img> | Group-7.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-2087325508-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | Group-1-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-4-4.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <style> CSS | bioa-monogram.svg | CSS của thành phần owner-PASS (trang trí/nền) — không phải nội dung | 4 |
| style inline (main) | vac1-1024x683.webp | Ảnh thẻ việc làm — quản lý trong mục Tuyển dụng (từng vị trí) | 2 |
| style inline (main) | 3591cb7df74b41c8d5f337bf831c5708-6251.webp | Ảnh thẻ việc làm — quản lý trong mục Tuyển dụng (từng vị trí) | 2 |
| style inline (main) | geminigeneratedimagec8pv19c8pv19c8pv-4025.webp | Ảnh thẻ việc làm — quản lý trong mục Tuyển dụng (từng vị trí) | 2 |
| style inline (main) | bioa-full-light.svg | Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3) | 2 |
| <img> | icon-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-3.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-1-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-2-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-3-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-4-1.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-5.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-1-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-2-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| <img> | icon-3-2.svg | Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên) | 2 |
| CSS file | arrow-pagination.svg | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | arrow-pagination_white.svg | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | stone.webp | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | logo-bg.svg | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | shadow.webp | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | circle.svg | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | shadow_mobile.webp | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |
| CSS file | open-shadow.webp | CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung | 1 |

## CMS quản lý

| Nguồn | URL | Tài liệu CMS | Số trang |
|---|---|---|---|
| <img> | hero2.webp | vị trí ảnh about_287785a6 | 2 |
| style inline (main) | title-1.webp | vị trí ảnh about_dee7c4c9 | 2 |
| <img> | IMG_6258-1.png | vị trí ảnh about_a7296226 | 2 |
| style inline (main) | Image-16-scaled.webp | vị trí ảnh about_5186cd63 | 2 |
| style inline (main) | armenia.webp | vị trí ảnh about_eca951bb | 2 |
| style inline (main) | budapest1.webp | vị trí ảnh about_1b4b492c | 2 |
| <img> | email.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| <img> | whatsapp.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| <img> | facebook.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| <img> | kem-duong-am-thumbnail-8169.webp | ảnh đại diện bài Blog (tài liệu Blog) | 28 |
| <img> | email.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| <img> | whatsapp.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| <img> | facebook.svg | ảnh đại diện bài Blog (tài liệu Blog) | 76 |
| og/twitter image | kem-duong-am-thumbnail-8169.webp | ảnh bài Blog | 16 |
| JSON-LD image | kem-duong-am-thumbnail-8169.webp | theo ảnh bài Blog (tự sinh) | 16 |
| <img> | 1e9cb779b927673fd2a83de4130f69da-1150.webp | ảnh đại diện bài Blog (tài liệu Blog) | 12 |
| og/twitter image | 1e9cb779b927673fd2a83de4130f69da-1150.webp | ảnh bài Blog | 6 |
| JSON-LD image | 1e9cb779b927673fd2a83de4130f69da-1150.webp | theo ảnh bài Blog (tự sinh) | 6 |
| <img> | mo-ta-cong-viec-sale-online-1-8042.webp | ảnh đại diện bài Blog (tài liệu Blog) | 22 |
| og/twitter image | mo-ta-cong-viec-sale-online-1-8042.webp | ảnh bài Blog | 12 |
| JSON-LD image | mo-ta-cong-viec-sale-online-1-8042.webp | theo ảnh bài Blog (tự sinh) | 12 |
| <img> | geminigeneratedimagec8pv19c8pv19c8pv-4025.webp | ảnh đại diện bài Blog (tài liệu Blog) | 26 |
| og/twitter image | geminigeneratedimagec8pv19c8pv19c8pv-4025.webp | ảnh bài Blog | 16 |
| JSON-LD image | geminigeneratedimagec8pv19c8pv19c8pv-4025.webp | theo ảnh bài Blog (tự sinh) | 16 |
| <img> | da997b9ffc85e19205399595afbb4ea5-1595.webp | ảnh đại diện bài Blog (tài liệu Blog) | 20 |
| og/twitter image | da997b9ffc85e19205399595afbb4ea5-1595.webp | ảnh bài Blog | 12 |
| JSON-LD image | da997b9ffc85e19205399595afbb4ea5-1595.webp | theo ảnh bài Blog (tự sinh) | 12 |
| <img> | 3591cb7df74b41c8d5f337bf831c5708-6251.webp | ảnh đại diện bài Blog (tài liệu Blog) | 16 |
| og/twitter image | 3591cb7df74b41c8d5f337bf831c5708-6251.webp | ảnh bài Blog | 8 |
| JSON-LD image | 3591cb7df74b41c8d5f337bf831c5708-6251.webp | theo ảnh bài Blog (tự sinh) | 8 |
| <img> | fa9a25c5c6111d27260aba7125496d39-9296.webp | ảnh đại diện bài Blog (tài liệu Blog) | 12 |
| og/twitter image | fa9a25c5c6111d27260aba7125496d39-9296.webp | ảnh bài Blog | 6 |
| JSON-LD image | fa9a25c5c6111d27260aba7125496d39-9296.webp | theo ảnh bài Blog (tự sinh) | 6 |
| style inline (main) | cosmetics-hero-bioa.webp | vị trí ảnh cosmetics_7e96a6d5 | 2 |
| <img> | Tubes.webp | vị trí ảnh cosmetics_a9a6a534 | 2 |
| <img> | Airless-Containers.webp | vị trí ảnh cosmetics_1cacd79e | 2 |
| <img> | Jars-and-bottles.webp | vị trí ảnh cosmetics_a316411e | 2 |
| <img> | Bottles.webp | vị trí ảnh cosmetics_25ac8d9a | 2 |
| <img> | image-1-9.webp | vị trí ảnh cosmetics_dce7b214 | 2 |
| <img> | image-2-9.webp | vị trí ảnh cosmetics_5a96d815 | 2 |
| <img> | image-3-10.webp | vị trí ảnh cosmetics_a94988bd | 2 |
| <img> | image-4-7.webp | vị trí ảnh cosmetics_32a257ae | 2 |
| style inline (main) | cosmetics-hero-bioa.webp | vị trí ảnh services_7e96a6d5 | 2 |
| <img> | Shower-Gel.webp | vị trí ảnh services_0d0a5639 | 2 |
| <img> | Shampoo.webp | vị trí ảnh services_60665b34 | 2 |
| <img> | Conditioner.webp | vị trí ảnh services_6fc5c2df | 2 |
| <img> | Soap.webp | vị trí ảnh services_4ca6814b | 2 |
| <img> | Body-Cream.webp | vị trí ảnh services_5578b764 | 2 |
| style inline (main) | career.webp | vị trí ảnh careers_279849c4 | 2 |
| <picture><source> | title_mobile.webp | vị trí ảnh home_01725156 | 2 |
| <img> | title-1.webp | vị trí ảnh home_01725156 | 2 |
| <picture><source> | produce-1_mobile.webp | vị trí ảnh home_e87f40eb | 2 |
| <img> | produce-1.webp | vị trí ảnh home_e87f40eb | 2 |
| <picture><source> | produce-2_mobile.webp | vị trí ảnh home_d3fee30c | 2 |
| <img> | produce-2.webp | vị trí ảnh home_d3fee30c | 2 |
| <img> | produce-2.webp | vị trí ảnh home_a60226ea | 2 |
| <img> | image-1.webp | vị trí ảnh home_a84c9735 | 2 |
| <img> | image-2.webp | vị trí ảnh home_b3abb914 | 2 |
| <img> | image-3.webp | vị trí ảnh home_8b335e30 | 2 |
| <img> | image-4.webp | vị trí ảnh home_d55c6a3c | 2 |
| <img> | image-5.webp | vị trí ảnh home_7807c0da | 2 |
| <img> | image-1-1.webp | vị trí ảnh home_a84c9735 | 2 |
| <img> | image-1_mobile.webp | vị trí ảnh home_a4a33ba7 | 2 |
| <img> | image-2-8.webp | vị trí ảnh home_4c49ce2c | 2 |
| <img> | image-3-9.webp | vị trí ảnh home_29d7b5a2 | 2 |
| <img> | image-1_mobile.webp | vị trí ảnh home_7fead799 | 2 |
| <img> | image-2_mobile.webp | vị trí ảnh home_ea701072 | 2 |
| <img> | image-3_mobile.webp | vị trí ảnh home_a4a33ba7 | 2 |
| <img> | image-4_mobile.webp | vị trí ảnh home_4c49ce2c | 2 |
| <img> | image-5_mobile.webp | vị trí ảnh home_29d7b5a2 | 2 |
| <img> | image-1-9.webp | vị trí ảnh home_dce7b214 | 2 |
| <img> | image-2-9.webp | vị trí ảnh home_5a96d815 | 2 |
| <img> | image-3-10.webp | vị trí ảnh home_a94988bd | 2 |
| <img> | image-4-7.webp | vị trí ảnh home_32a257ae | 2 |
| <img> | image-5-5.webp | vị trí ảnh home_2998d634 | 2 |
