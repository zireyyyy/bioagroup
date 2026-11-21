# BIO-A — R28c (đăng 29 bài Blog, đổi slug kèm 301): START HERE (20/11/2026)

| Mục | Giá trị |
|---|---|
| Repository / nhánh | `zireyyyy/bioagroup`, nhánh **`r28/blog-icon-cms`** (tiếp nối R28b `1b696a8`). HEAD = SHA trong tên ZIP |
| PR nháp | `zireyyyy/bioagroup#14`: chỉ CI, **không merge trước OWNER PASS** |
| CMS Preview | https://cms-preview.bioagroup.pages.dev/ = HEAD R28c, Sanity snapshot có 38 bài |
| Sanity | giao dịch `r22appgvF9LfESp2TYLVwG` (29 bài: `rewriteApproved` + 13 slug mới) |
| Production | `main` `9d044a7`, maintenance ON. **R27 / R28 / R28b / R28c chưa lên Production** |

## Đọc theo thứ tự

1. `R28C_RESULT.md`:
   - quyết định của Owner, kết luận duyệt nội dung;
   - bảng 13 slug cũ → mới;
   - pháp lý;
   - **BẠN CẦN TEST GÌ**.
2. `QA_MATRIX.md`: cổng cục bộ, Preview thật, Sanity trước/sau, Production.
3. `DEPLOY_ROLLBACK.md`: khôi phục theo thứ tự **Sanity trước, code sau**.
4. Tài liệu vẫn còn hiệu lực:
   - `docs/r28b/`: icon thẻ dịch vụ và popup, chờ Owner UAT;
   - `docs/r28/`: VI-first vẫn **BLOCKED**.

## Thay đổi chính

**Code** (`ddcbb9c`, trong `bioa-blog-refine.mjs`, `bioa-cms.mjs`, `build.mjs`):
- `BLOG_PENDING_REWRITE` để trống;
- `BLOG_SLUG_RENAMES` có 13 cặp slug;
- `blogSlugRedirects` sinh 26 trang 301;
- `mergeCmsBlogPosts` đổi slug cũ của bài lấy từ CMS sang slug mới, nên không bao giờ trùng bài.

**Cổng kiểm thử:**
- `a9c14f1`, `56777e7`;
- `tests/r28-rewritten-slugs.mjs` là nguồn chung;
- test mới `tests/r28c-blog-published.mjs`.

**Công cụ:** `tools/cms-approve-blog.mjs`.
- Mặc định chạy thử (dry run).
- Chỉ đụng tài liệu đã Publish; bỏ qua bài có Draft.
- Ghim `ifRevisionID`.

## Ảnh

Trong ZIP, `evidence/screens/`: danh sách `/blog/`, trang 6, `/en/blog/` và một bài đổi slug, ở 390px và 1440px.
