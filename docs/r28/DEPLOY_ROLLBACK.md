# R28 — Deploy và rollback

Giờ UTC, ngày 19/11/2026.

## 1. Mỗi phần đang chạy ở đâu

| Bề mặt | Commit | Trạng thái |
|---|---|---|
| **CMS Preview** https://cms-preview.bioagroup.pages.dev/ | `cms-preview` fast-forward `fb8edd8..ef5f7b6`, rồi tới HEAD cuối của nhánh R28 (xem `R28_RESULT.md`) | Deployment code R28: `d478ffe7-0ae2-4192-8b01-684273e30eaf`; build lại tự động sau Publish 29 bài (08:13). `/_bioa-cms.json`: `mode: live` |
| Preview nhánh https://r28-blog-icon-cms.bioagroup.pages.dev/ | nhánh `r28/blog-icon-cms` | Tự tạo khi push; nội dung repo, `/api` khóa |
| **Production** `bioagroup.vn` | `main` = `9d044a7` (**không đổi**) | Deployment `d187b3a4`: maintenance ON, `CMS mode: off`, `/api/*` 503, noindex. **R27 và R28 KHÔNG có trên Production** |
| GitHub | Nhánh `r28/blog-icon-cms`; PR nháp `zireyyyy/bioagroup#14` (chỉ CI, **không merge**) | — |
| Sanity Studio https://bioagroup.sanity.studio/ | **Chưa deploy bản R28** (lệnh deploy bị chặn, cần Owner cho phép) | Vẫn là bản R27 |
| Worker `bioa-cms-i18n` | Chưa deploy | BLOCKED (`VI_FIRST_CMS.md` §6) |

## 2. Ghi vào Sanity trong R28

**Sao lưu** (riêng tư, không có trong ZIP):
- `D:\BIOA_WORKSPACE\_private\sanity\backups\r28-before-2026-11-19T074508167Z.json`
- `…\r28-blogsync-before-2026-11-19T081314357Z.json`

Mỗi bản: 99 tài liệu, 0 Draft.

**Duy nhất một lần ghi:**
- `tools/cms-sync-blog.mjs --from 52c25ac --apply`;
- 29 tài liệu `blog-<slug>`, giao dịch `Vf5xODbUk3KT15bFnu12bg`;
- chỉ trường nội dung: tiêu đề, SEO, tóm tắt, thời gian đọc, mở bài, các mục, ghi chú;
- mỗi bài chỉ ghi khi Sanity còn đúng văn bản repo cũ (`52c25ac`), ghim `ifRevisionID`.

**Không ghi:** `page-home` ("123" của Owner), trường `i18n` (backfill chờ Studio), `rewriteApproved`, ảnh, SEO trang, Tuyển dụng, pháp lý.

## 3. Rollback

| Muốn | Cách |
|---|---|
| Đưa 29 bài trong Sanity về bản R27 | Khôi phục 29 tài liệu `blog-*` từ `r28-blogsync-before-…json` (Studio → History → Restore, hoặc mutate API với nội dung sao lưu) |
| CMS Preview chạy lại code R27b | Trên một nhánh từ HEAD R28: `git revert --no-edit 52c25ac..HEAD`, rồi fast-forward `cms-preview` tới commit revert (không force push). Nếu chỉ revert code mà không khôi phục Sanity, Preview vẫn hiện bài R28 (nội dung lấy từ Sanity) |
| Chỉ bỏ sửa icon / bong bóng chat | `git revert 6d185bc 410a4ad` (+ bỏ dòng phê duyệt trong `a5cd9d2`) |
| Chỉ bỏ lớp VI-first | `git revert 57dc1e7 ef5f7b6 bb7a26f ecfdd37`. Dữ liệu Sanity không cần đổi (chưa ghi `i18n`) |
| Xem Preview R27b trước đó | Deployment `490ee5cf` / `a8993081` trong danh sách deployment của Pages |
| Production | Không bị ảnh hưởng. Rollback Production giữ nguyên như R26 (`docs/r26/DEPLOY_AND_ROLLBACK.md`) |

## 4. Đưa lên Production sau OWNER PASS (chưa làm)

1. Owner duyệt R27 + R28.
2. Fast-forward `main` → HEAD R28.
3. Kiểm tra:
   - `CMS mode: off`;
   - maintenance;
   - 503;
   - `www` 301;
   - `/_bioa-cms.json` = `{"mode":"off"}` (sau cổng maintenance).
4. Lớp VI-first chỉ hoạt động trên CMS Preview. Production không đọc Sanity cho đến khi có release pin do Owner duyệt.
