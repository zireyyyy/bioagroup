# BIO-A — R28b (sửa theo phản hồi Owner + Blog trên Preview): START HERE (20/11/2026)

| Mục | Giá trị |
|---|---|
| Repository / nhánh | `zireyyyy/bioagroup`, nhánh **`r28/blog-icon-cms`** (tiếp nối R28 `4205597`). HEAD = SHA trong tên ZIP |
| PR nháp | `zireyyyy/bioagroup#14`: chỉ CI, **không merge trước OWNER PASS** |
| CMS Preview | https://cms-preview.bioagroup.pages.dev/ = HEAD R28b. Deployment code `f91508c0` |
| Production | `main` `9d044a7`, maintenance ON. **R27 / R28 / R28b chưa lên Production** |

## Đọc theo thứ tự

1. `R28B_RESULT.md`: kết quả, commit, phần cần Owner duyệt, **BẠN CẦN TEST GÌ**.
2. `ROOT_CAUSE.md`: nguyên nhân gốc lỗi icon thẻ dịch vụ và popup tư vấn.
3. `BLOG_29_PREVIEW_URLS.md`: 29 URL VI/EN, nhóm A/B/C, trang danh sách chứa bài.
4. `QA_MATRIX.md`, `DEPLOY_ROLLBACK.md`.
5. Tài liệu R28 vẫn hiệu lực: `docs/r28/` (VI-first còn BLOCKED, báo cáo 29 bài, đề xuất slug).

## Ảnh trước / sau

Trong ZIP: `evidence/r28b-screens/`, 102 ảnh ở 390px và 1440px. Bộ đầy đủ 132 ảnh (thêm 320, 375, 428) nằm ở `D:\BIOA_WORKSPACE\_reports\r28b\shots\`.

**Thẻ dịch vụ** (`<before|after>-card[-icon]-<vi|en>-s<1..5>[-webkit]-390.png`):
- `card-icon`: phóng to ô logo + ô số;
- `card`: cả thẻ, để thấy khoảng trắng;
- đủ 5 slide, Chrome và WebKit.

**Popup** (`<mw-popup-approved|before-popup|after-popup>[-webkit]-<390|1440>.png`):
- `mw-popup-approved` = bản Owner đã duyệt `9d044a7`.

**Blog** (`after-blog-<vi|en>[-page-N]-<390|1440>.png`): danh sách trên bản Preview.
