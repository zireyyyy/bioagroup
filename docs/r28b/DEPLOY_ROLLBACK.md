# R28b — Deploy và rollback

## 1. Mỗi phần đang chạy ở đâu (20/11/2026)

| Bề mặt | Commit | Trạng thái |
|---|---|---|
| **CMS Preview** https://cms-preview.bioagroup.pages.dev/ | `cms-preview` fast-forward `4205597..f8dcd24`, sau đó tới HEAD docs cuối (SHA trong tên ZIP) | Deployment code R28b: **`f91508c0-7bd9-453b-b66e-2acad7695cbf`** (`f8dcd24`). `/_bioa-cms.json`: `mode: live`, `commit: f8dcd243b26e`, `blogPosts: 38` |
| Preview nhánh `r28/blog-icon-cms` | `f8dcd24` | Deployment `45359c82`. Không bật danh sách bài chờ duyệt (không phải nhánh `cms-preview`) |
| **Production** `bioagroup.vn` | `main` = `9d044a7` (**không đổi**) | 503 + `noindex`; `/api` 503; `www` 301 về apex (`evidence/r28b/prod-check.txt`) |
| Sanity | **Không ghi gì trong R28b** | `rewriteApproved` của 29 bài vẫn tắt |

## 2. Rollback

| Muốn | Cách |
|---|---|
| Bỏ toàn bộ R28b trên Preview | Trên nhánh R28b: `git revert --no-edit 4205597..HEAD`, rồi fast-forward `cms-preview` tới commit revert (không force push) |
| Chỉ bỏ danh sách 29 bài trên Preview | `git revert 644c2a4` (+ bỏ dòng phê duyệt `644c2a4` trong `tests/p0a-module-isolation.test.mjs`) |
| Chỉ bỏ sửa icon / popup | `git revert f8dcd24 2c29e08` (+ bỏ dòng phê duyệt `2c29e08`) |
| Xem lại Preview R28 | Deployment `5aa347da` / `32170ae6` (`4205597`) trong danh sách deployment của Pages |
