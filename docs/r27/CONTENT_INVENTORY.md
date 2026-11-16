# R27 — Content inventory (rendered pages, VI/EN)

**How it was made:**
- Every built page (VI + EN, 112 before / 104 after, redirect stubs excluded) was parsed block by block.
- Each block was scanned for sample/placeholder words, Merywood/Estonia traces, number claims, certification claims, superlatives, medical wording and testimonial markup.
- Raw data: `evidence/r27/inventory-before.json`, `inventory-after.json` and their `-flagged.txt`.
- The keyword scan over-reports. In Vietnamese, *mẫu* usually means product samples (*mẫu thử*). "eston" matches "milestone". So every flag was read and decided by hand; the decisions are below.

**Sources (provenance):**
- **Repo**: the code owner module named in each row.
- **Sanity**: the published Sanity document. It is identical to the repo text: R25 seed + R27 sync, and no owner edits before R27 (backup `r27-before-2026-11-16T041505351Z.json`, `_updatedAt` checked).
- **Owner-verified**: commit `ffb4f7b` *"apply verified Bio-A Group company stats and contact details"* (2026-10-02), `docs/CONTENT_GUIDE.md` (legacy BIOA-Website `home.php` / `about.php`: OEM/ODM, GMP Bộ Y Tế, HACCP, vision/mission) and owner PASS records in `FULL_HANDOFF.md`.

**Decisions:**

| Decision | Meaning |
|---|---|
| **KEEP** | verified or honest; unchanged |
| **REWRITE** | wording changed so that it is true |
| **HIDE** | removed or hidden from the site |
| **PENDING** | needs real owner data or a rewrite; hidden or neutral until then (see `OWNER_CONTENT_INPUTS.md`) |

## 1. Pages and shared components

| Route (VI · EN) | Position | Source | Before | After | Decision · provenance |
|---|---|---|---|---|---|
| `/` · `/en/` | Hero stats: 2.000+ R&D samples · 5+ years · 10.000.000 products/year · 1.000 m² · OEM/ODM | `bioa-transform.mjs` setHomeStats; Sanity `page-home` | shown | unchanged | **KEEP**: owner-verified company stats (`ffb4f7b`); Hero Stats owner PASS. The proof documents are not in the repo, so they are listed as a document request in OWNER_CONTENT_INPUTS #4 |
| `/` · `/en/` | **Reviews block** "Khách Hàng Nhận Được Gì…" / "What clients receive…" (6 cards desktop + 6 mobile) | `bioa-transform.mjs` resetHomeVI/EN | invented client quotes; EN labelled "Sample testimonial — to be updated" | **removed** | **HIDE** (F03). No owner-confirmed testimonial exists. No Review/AggregateRating schema existed or exists |
| `/` · `/en/` | Packaging MOQ "2500 sản phẩm / 5000 sản phẩm" (desktop + mobile) | `bioa-transform.mjs` finalizeHomeCopy | numbers from the Merywood source (`2500 units / 5000 units` in the pinned Merywood HTML) | "Theo dự án / Per project" + "số lượng tối thiểu (MOQ)" | **PENDING**: no BIO-A MOQ data; ask the owner (OWNER_CONTENT_INPUTS #3) |
| `/` · `/en/` | Why choose, product formats, how it works, packaging solutions, roadmap | `bioa-transform.mjs` | service descriptions consistent with OEM/ODM and the legacy source | unchanged | **KEEP**: no client names, numbers or certificates invented |
| all pages | Chat widget "Khánh Như Bio-A" | `bioa-home-refine.mjs` addContactLauncher | message box that sent nothing; fixed local reply; "Tôi có thể hỗ trợ…" | intro states the chat takes no online messages; the composer row is two real channels: **Nhắn Zalo** / **Gọi 0779 399 379** | **REWRITE**: agent name and avatar are an owner decision (FULL_HANDOFF "Chat agent name should be Khánh Như Bio-A"). AI LIVE stays OFF, nothing stored |
| all pages | Quote modal (form) | Merywood `modal.js` + `bioa-home-refine.mjs` addModalKeyboard | no keyboard close | Esc / Tab / focus return; "Đóng/Close" label; dialog role | **REWRITE** (F02, UX only). Form fields and API unchanged; the Preview API stays locked |
| all pages | Footer | Merywood main.css + `bioa-home-refine.mjs` | EN columns overflowed below 375px | two shrinkable columns below 375px | **REWRITE** (F01, layout only). Footer copy unchanged (owner PASS) |
| `/about/` · `/en/about/` | Hero + stats | `bioa-about-refine.mjs` | same stats as Home | unchanged | **KEEP** (same provenance as Home) |
| `/about/` | Vision "trở thành nhà sản xuất … hàng đầu khu vực Đông Nam Á" | legacy `about.php` | vision statement | unchanged | **KEEP**: stated as an aim ("tầm nhìn … trở thành"), not as a current ranking |
| `/about/` | Values "nội dung nguồn Bio-A ghi nhận năng lực GMP và HACCP" | legacy source | GMP/HACCP | unchanged | **KEEP**: legacy BIO-A source (CONTENT_GUIDE). The certificate copy and scope are a document request (OWNER_CONTENT_INPUTS #4) |
| `/about/` | Hero image alt "Nhà máy và năng lực Bio-A Group", team alt "Đội ngũ Bio-A Group" | `bioa-about-refine.mjs` | alt claimed BIO-A factory/team photos | "Ảnh minh họa sản xuất mỹ phẩm" / "Ảnh minh họa làm việc nhóm" (EN equivalents) | **REWRITE**: the images are temporary Merywood photos (MEDIA_REPLACEMENT_MAP) |
| `/contract-manufacturing-cosmetics/` · EN | "đạt chuẩn GMP Bộ Y Tế", GMP/HACCP cards | `bioa-cosmetics-refine.mjs` | claims | unchanged | **KEEP**: confirmed in the legacy BIOA source (SOURCE_MAP *confirmed wording/claims include … GMP Bộ Y Tế Việt Nam, HACCP*). Document request #4 |
| `/contract-manufacturing-cosmetics/` · EN | "Kịch Bản Hợp Tác Tiêu Biểu" scenario cards | `bioa-cosmetics-refine.mjs` | tag "… • Nội dung mẫu" / "• Sample scenario" | "… • Tình huống minh họa" / "• Illustrative scenario" | **REWRITE**: these are service paths, not client cases; now labelled as illustrations instead of "sample content" |
| `/contract-manufacturing-cosmetics/` · EN | meta description | `bioa-cosmetics-refine.mjs` | Home's shared description | own description (formats, R&D, samples, production, packaging, documentation) | **REWRITE** (SEO) |
| `/dich-vu-khac/` · EN | "Giải Pháp Theo Từng Nhu Cầu" cards | `bioa-services-refine.mjs` | tag "Giải pháp mẫu" / "Sample solution" | "Gói dịch vụ gợi ý" / "Suggested service mix" | **REWRITE** |
| `/dich-vu-khac/` · EN | meta description | `bioa-services-refine.mjs` | Home's shared description | own description (the 5 services on the page) | **REWRITE** (SEO) |
| `/contacts/` · EN | FAQ (MOQ, timeline, samples, packaging/dossier, brief) | `bioa-contacts-refine.mjs` | no fixed MOQ or lead-time promise | unchanged | **KEEP** |
| `/tuyen-dung/` · `/en/careers/` | Role cards (3 SAMPLE roles), status pill, heading, subline | `bioa-careers.mjs`; Sanity `page-careers`, `career-*` | "Vị trí công việc", "Chi tiết đang cập nhật" | "Nhóm công việc", "Chưa mở tuyển" / "Teams", "Not currently hiring"; subline says no hiring round is open | **REWRITE**: no real opening. Detail pages say applications are not open; no apply button (owner input #5) |
| `/privacy-policy/`, `/cookie-policy/` (VI/EN) | Policy text | `bioa-legal-pages.mjs` | owner/counsel approval pending, noindex | unchanged | **PENDING** (legal; R26 policy kept: no legal entity, retention or transfer details invented) |
| 404 | Branded 404 | `bioa-404.mjs` | — | unchanged | **KEEP** |
| all pages | Decorative source icons with file-name alts ("icon", "talk", "hands", "blank", "cert", "whiteboxes") | `bioa-source-hygiene.mjs` | meaningless alt | `alt=""` (decorative) | **REWRITE** (a11y/SEO) |
| `/blog/page/2/` · EN | meta description | `bioa-blog-refine.mjs` | identical to `/blog/` | "… — Trang 2 / Page 2" | **REWRITE** (SEO) |
| `/blog/page/3…6/` · EN | Blog index pages | `bioa-blog-refine.mjs` | listed 38 posts | redirect page (noindex, canonical) to `/blog/` | **HIDE**: only 9 posts are listed now (2 pages) |

## 2. Blog (38 articles × VI/EN)

**How the duplicate content was found:** 8-word shingle Jaccard similarity of each article body against every other article (`evidence/r27/blog-similarity.txt`).
- 29 articles reuse one generated paragraph skeleton with only the topic swapped (max similarity 0.52–0.68). Example sentence pattern: "*{topic} có thể chịu ảnh hưởng của nhiều yếu tố…*".
- 9 articles are individually written (max ≤ 0.16).

**Wording check:** the medical words found in the articles are disclaimers ("không thay thế chẩn đoán hoặc điều trị từ bác sĩ", "tránh hứa hẹn điều trị"), not treatment claims. One title used "Đặc Trị".

**Nothing is deleted.** A pending article keeps its URL (200), carries `noindex, follow` and is left out of the list, pagination, previous/next and sitemap. It comes back when its Sanity document has **"Đã viết lại — hiển thị lại trên danh sách Blog"** switched on after a rewrite.

| Slug | VI title | Topic | Max similarity (closest peer) | Decision |
|---|---|---|---|---|
| `gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau` | Gia Công Kem Làm Sáng Vùng Nhạy Cảm: Công Thức Và Tiêu Chí An Toàn | B2B / sản xuất | 0.59 (vs `gia-cong-kem-body-tron-goi-tai-n…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `dia-chi-gia-cong-san-xuat-my-pham-uy-tin-chat-luong-tai-tphcm-1` | Gia Công Mỹ Phẩm TP.HCM: Checklist Chọn Nhà Máy Trước Khi Ký | B2B / sản xuất | 0.67 (vs `top-10-xuong-gia-cong-tai-ha-noi…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `7-ly-do-ban-nen-lua-chon-gia-cong-my-pham-tron-goi-tai-bio-a-group` | Gia Công Mỹ Phẩm Trọn Gói: 7 Tiêu Chí Đánh Giá Dịch Vụ | B2B / sản xuất | 0.63 (vs `gia-cong-kem-body-tron-goi-tai-n…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `xu-huong-thi-truong-tay-te-bao-chet-2026-co-hoi-cho-thuong-hieu-my-pham-moi` | Xu Hướng Tẩy Tế Bào Chết 2026: 5 Hướng Phát Triển Sản Phẩm | B2B / sản xuất | 0.55 (vs `top-10-kem-tay-te-bao-chet-cho-d…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `nuoc-hoa-o-to-la-gi-vi-sao-hien-nay-rat-duoc-ua-chuong` | Nước Hoa Ô Tô Là Gì? Các Dạng Sản Phẩm Và Tiêu Chí Phát Triển | Kiến thức da / người dùng | 0.62 (vs `cach-de-xit-body-mist-thom-lau…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `an-gi-de-chong-lao-hoa-da` | Ăn Gì Để Hỗ Trợ Da Khỏe? Dinh Dưỡng Và Lão Hóa Da | Kiến thức da / người dùng | 0.67 (vs `mun-trung-ca-la-gi-nguyen-nhan-v…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `tong-hop-15-cach-lam-sua-tam-trang-tai-nha-don-gian` | Sữa Tắm Làm Sáng Da Tại Nhà: Điều Cần Biết Trước Khi Tự Pha | Kiến thức da / người dùng | 0.53 (vs `ban-co-biet-da-minh-thuoc-loai-d…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `huong-dan-cach-dung-tinh-dau-tram-tra-tri-mun-va-cham-soc-toc` | Tinh Dầu Tràm Trà Cho Da Và Tóc: Cách Dùng An Toàn | Kiến thức da / người dùng | 0.55 (vs `nguyen-lieu-san-xuat-my-pham-thi…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm` | Top Công Ty Gia Công Mỹ Phẩm TP.HCM: Cách Kiểm Chứng Trước Khi Chọn | B2B / sản xuất | 0.68 (vs `top-20-cong-ty-gia-cong-my-pham-…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `ban-co-biet-da-minh-thuoc-loai-da-nao-khong` | Cách Xác Định Loại Da: Da Thường, Dầu, Khô, Hỗn Hợp Và Nhạy Cảm | Kiến thức da / người dùng | 0.53 (vs `boi-nghe-tuoi-truc-tiep-len-mat-…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `gia-cong-son-moi-tron-goi-doc-quyen-bio-a-group` | Gia Công Son Môi Trọn Gói: Công Thức, Màu, Bao Bì Và Quy Trình | B2B / sản xuất | 0.65 (vs `gia-cong-kem-body-tron-goi-tai-n…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `5-dau-hieu-nhan-biet-mot-don-vi-gia-cong-my-pham-uy-tin` | 5 Dấu Hiệu Nhận Biết Một Đơn Vị Gia Công Mỹ Phẩm Uy Tín | B2B / sản xuất | 0.63 (vs `top-10-xuong-gia-cong-tai-ha-noi…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `cong-dung-cua-bo-hat-mo-trong-cham-soc-suc-khoe-da` | Bơ Hạt Mỡ Trong Mỹ Phẩm: Công Dụng Và Cách Xây Dựng Công Thức | Kiến thức da / người dùng | 0.54 (vs `huong-dan-cach-dung-tinh-dau-tra…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `gia-cong-kem-body-tron-goi-tai-nha-may-bio-a-group` | Gia Công Kem Body Trọn Gói: Từ Brief Đến Sản Xuất | B2B / sản xuất | 0.65 (vs `gia-cong-son-moi-tron-goi-doc-qu…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `cong-dung-kem-tay-te-bao-chet-toan-than-top-10-san-pham-kem-hien-nay` | Tẩy Tế Bào Chết Toàn Thân: Công Dụng, Cách Dùng Và Cách Chọn | Kiến thức da / người dùng | 0.00 | **KEEP** (nội dung riêng) |
| `dap-mask-collagen-co-that-su-tot` | Mask Collagen Có Tốt Không? Cách Hiểu Đúng Và Chọn Sản Phẩm Phù Hợp | Kiến thức da / người dùng | 0.00 | **KEEP** (nội dung riêng) |
| `dia-chi-gia-cong-cac-loai-serum-dac-tri-dat-chuan` | Gia Công Serum Chuyên Biệt: Tiêu Chí Chọn Công Thức Và Đơn Vị Sản Xuất | B2B / sản xuất | 0.00 | **REWRITE** tiêu đề (bỏ “Đặc Trị”) · KEEP nội dung |
| `kem-duong-am-la-gi-huong-dan-chon-va-su-dung-dung-cach` | Kem Dưỡng Ẩm Là Gì? Cách Chọn Theo Loại Da Và Sử Dụng Đúng | Kiến thức da / người dùng | 0.00 | **KEEP** (nội dung riêng) |
| `10-tieu-chi-quan-trong-cac-boss-can-luu-y-khi-gia-cong-kem-chong-nang` | Gia Công Kem Chống Nắng: 10 Tiêu Chí Thương Hiệu Cần Lưu Ý | B2B / sản xuất | 0.00 | **KEEP** (nội dung riêng) |
| `dia-chi-gia-cong-san-xuat-my-pham-uy-tin-chat-luong-tai-tphcm` | Gia Công Mỹ Phẩm Tại TP.HCM: 7 Tiêu Chí Chọn Nhà Sản Xuất Uy Tín | B2B / sản xuất | 0.00 | **KEEP** (nội dung riêng) |
| `4-bi-quyet-tu-van-ban-hang-my-pham-tuyet-dinh` | 4 Bí Quyết Tư Vấn Bán Hàng Mỹ Phẩm Hiệu Quả Và Có Trách Nhiệm | B2B / sản xuất | 0.00 | **KEEP** (nội dung riêng) |
| `top-10-kem-tay-te-bao-chet-cho-da-kho-duoc-ua-chuong-nhat-hien-nay` | Tẩy Tế Bào Chết Cho Da Khô: Cách Chọn Công Thức Phù Hợp | Kiến thức da / người dùng | 0.55 (vs `xu-huong-thi-truong-tay-te-bao-c…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `mun-trung-ca-la-gi-nguyen-nhan-va-phuong-phap-dieu-tri-hieu-qua` | Mụn Trứng Cá Là Gì? Cách Chăm Sóc Da Mụn An Toàn | Kiến thức da / người dùng | 0.68 (vs `mun-viem-la-gi-cham-soc-da-co-mu…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `boi-nghe-tuoi-truc-tiep-len-mat-co-that-su-hieu-qua` | Bôi Nghệ Tươi Lên Mặt Có Nên Không? Lợi Ích, Rủi Ro Và Cách Dùng | Kiến thức da / người dùng | 0.53 (vs `ban-co-biet-da-minh-thuoc-loai-d…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `cach-de-xit-body-mist-thom-lau` | Cách Xịt Body Mist Thơm Lâu: Vị Trí Xịt, Bảo Quản Và Công Thức | Kiến thức da / người dùng | 0.62 (vs `nuoc-hoa-o-to-la-gi-vi-sao-hien-…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `top-20-cong-ty-gia-cong-my-pham-tp-hcm-uy-tin` | Công Ty Gia Công Mỹ Phẩm TP.HCM: Cách So Sánh Báo Giá Và Năng Lực | B2B / sản xuất | 0.68 (vs `top-20-cong-ty-gia-cong-my-pham-…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `bao-bi-tang-hieu-qua-ban-hang-khong-doanh-nghiep-kinh-doanh-my-pham-can-luu-y-gi` | Bao Bì Mỹ Phẩm Có Ảnh Hưởng Bán Hàng? 6 Tiêu Chí Cần Chốt | B2B / sản xuất | 0.68 (vs `tips-lua-chon-chat-lieu-bao-bi-m…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `nhung-cach-lam-gel-lot-mun-handmade-de-dang` | Gel Lột Mụn Handmade Có Nên Dùng? Rủi Ro Và Lựa Chọn An Toàn | Kiến thức da / người dùng | 0.67 (vs `mun-viem-la-gi-cham-soc-da-co-mu…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `huong-dan-cach-lam-mat-na-cam-gao-sua-chua-tai-nha` | Mặt Nạ Cám Gạo Sữa Chua: Cách Dùng Và Lưu Ý Cho Da | Kiến thức da / người dùng | 0.16 | **KEEP** (nội dung riêng) |
| `mun-viem-la-gi-cham-soc-da-co-mun-viem-nhu-the-nao` | Mụn Viêm Là Gì? Cách Chăm Sóc Và Khi Nào Nên Gặp Bác Sĩ | Kiến thức da / người dùng | 0.68 (vs `mun-trung-ca-la-gi-nguyen-nhan-v…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `kinh-nghiem-cho-nguoi-moi-gia-cong-my-pham` | Kinh Nghiệm Gia Công Mỹ Phẩm Cho Người Mới: 6 Việc Cần Chuẩn Bị | B2B / sản xuất | 0.59 (vs `gia-cong-kem-tri-tham-nhu-hoa-gi…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `gia-cong-tinh-chat-trang-rang-tai-bio-a-group` | Gia Công Tinh Chất Chăm Sóc Răng: Công Thức, Claim Và Bao Bì | B2B / sản xuất | 0.16 | **KEEP** (nội dung riêng) |
| `vi-sao-can-kiem-nghiem-spf-kem-chong-nang-truoc-khi-dua-ra-thi-truong` | Kiểm Nghiệm SPF Kem Chống Nắng: Vì Sao Phải Làm Trước Khi Bán | B2B / sản xuất | 0.68 (vs `san-pham-kem-chong-nang-bi-thu-h…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `tips-lua-chon-chat-lieu-bao-bi-my-pham-phu-hop-bio-a-group` | Chất Liệu Bao Bì Mỹ Phẩm: Nhựa, Thủy Tinh, Nhôm Và Cách Chọn | B2B / sản xuất | 0.68 (vs `bao-bi-tang-hieu-qua-ban-hang-kh…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `10-cong-dung-bat-ngo-cua-ba-ca-phe-trong-lam-dep-va-doi-song` | Bã Cà Phê Trong Làm Đẹp Và Đời Sống: 10 Cách Sử Dụng Hợp Lý | Kiến thức da / người dùng | 0.52 (vs `cong-dung-cua-bo-hat-mo-trong-ch…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `san-pham-kem-chong-nang-bi-thu-hoi` | Kem Chống Nắng Bị Thu Hồi Vì SPF: Bài Học Cho Thương Hiệu | B2B / sản xuất | 0.68 (vs `vi-sao-can-kiem-nghiem-spf-kem-c…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `top-10-xuong-gia-cong-tai-ha-noi-uy-tin` | Xưởng Gia Công Mỹ Phẩm Hà Nội: Checklist Chọn Đối Tác Phù Hợp | B2B / sản xuất | 0.67 (vs `dia-chi-gia-cong-san-xuat-my-pha…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
| `nguyen-lieu-san-xuat-my-pham-thien-nhien` | Nguyên Liệu Mỹ Phẩm Thiên Nhiên: Cách Chọn Và Kiểm Soát Chất Lượng | B2B / sản xuất | 0.55 (vs `huong-dan-cach-dung-tinh-dau-tra…`) | **PENDING — chờ viết lại** (URL giữ, noindex, follow; ngoài danh sách/sitemap) |
