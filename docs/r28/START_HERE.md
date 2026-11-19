# BIO-A — R28 (Blog 29 bài, icon Mobile, CMS Sync, VI-first): START HERE (19/11/2026)

| Mục | Giá trị |
|---|---|
| Repository / nhánh | `zireyyyy/bioagroup`, nhánh **`r28/blog-icon-cms`** (từ R27b `52c25ac`). HEAD = SHA trong tên ZIP |
| PR nháp | `zireyyyy/bioagroup#14`: chỉ CI, **không merge trước OWNER PASS**. PR R27 `#13` vẫn mở |
| CMS Preview | https://cms-preview.bioagroup.pages.dev/ (`cms-preview` = HEAD R28). `/_bioa-cms.json` cho biết Preview đọc Sanity lúc nào |
| Production | `main` `9d044a7`, deployment `d187b3a4`, **maintenance ON**, CMS off. **R27 + R28 chưa lên Production** |
| Sanity | 29 bài Blog đã đồng bộ (giao dịch `Vf5xODbUk3KT15bFnu12bg`). Studio **chưa** deploy bản R28 (BLOCKED) |

## Đọc theo thứ tự

1. `R28_RESULT.md`: tóm tắt, BLOCKED, **BẠN CẦN TEST GÌ**.
2. `VI_FIRST_CMS.md`: kiến trúc VI-first, chi phí, các bước kích hoạt (cần Owner).
3. `BLOG_29_REWRITE_REPORT.md`, `BLOG_SEO_AUDIT.md`: từng bài, nhóm A/B/C, đề xuất slug.
4. `MOBILE_ICON_FIX.md`, `SANITY_SYNC_ROOT_CAUSE.md`, `CMS_PUBLISH_E2E.md`.
5. `QA_MATRIX.md`, `DEPLOY_ROLLBACK.md`, `OWNER_UAT.md`.

## Quy tắc vẫn áp dụng

- Tiếng Việt là nguồn nội dung duy nhất. Không bắt Owner nhập EN song song.
- Văn bản pháp lý không dịch máy.
- `BIOA_SITE_MODE` giữ `maintenance`.
- Production không đọc Sanity nếu chưa có release pin do Owner duyệt.
- Không tự bật `rewriteApproved` / index.
- Không thay ảnh Merywood hay thông tin doanh nghiệp.
- Không tự kích hoạt dịch vụ dịch trả phí.
- Chỉ Owner cho **OWNER PASS** và **PUBLIC LAUNCH**.
