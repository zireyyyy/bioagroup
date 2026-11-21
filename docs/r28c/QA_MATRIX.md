# R28c — Ma trận kiểm thử

**Bằng chứng:** `D:\BIOA_WORKSPACE\_reports\r28c\` (trong ZIP: `evidence/`).

## 1. Bộ cổng đầy đủ trên dist cục bộ

**Bản build:** HEAD `a9c14f1`, dist 223 tệp, sha `048e098d…`.
- Đóng băng tại `QA_EVIDENCE/dist-final-r28c`.
- Dist không đổi sau toàn bộ QA.

| Cổng | Kết quả |
|---|---|
| `test:candidate` (danh tính doanh nghiệp 176 trang) | PASS |
| `test:p0a` (determinism, module isolation) | PASS |
| `test:responsive`, 404, Turnstile, chat (unit) | PASS |
| Middleware: host gate, hash gate, www → apex, 301 | 17/18 → test bản đồ 301 được cập nhật cho R28c (`56777e7`) → **18/18 PASS** |
| Phase-diff scope R28c / R28b+R28c / R28+ / R27+ / R26+ | PASS |
| `test:cms` | PASS |
| SEO / nội dung R26, R27, R28 Blog rewrite | PASS |
| **`r28c-blog-published`** (38 bài, index, sitemap, danh sách, 301) | **402/402 PASS** |
| P0B1 runtime, D11, Careers | 24/24, 14/14, 186/186 PASS |
| R27 browser defects | 72/72 PASS |
| R28 icon + teaser chat, R28b icon + popup (Chrome) | PASS, 1030/1030 PASS |
| P1/P2, Roadmap Home / Cosmetics, How It Works, Home sections | PASS (36/36, 36/36, 28/28, 20/20) |
| Route smoke, Chat UI, Lead form | PASS (60/60, 36/36) |
| Tablet: smoke, Swiper, TOC, Contacts/404, full route audit | PASS |

**Về test bản đồ 301 (`tests/r27-redirect-301.test.mjs`):**
- Test này từ R27b đòi `/blog/page/3-6/` phải 301 về `/blog/`.
- Khi đăng 38 bài, các trang này trở lại thành **trang danh sách thật**, nên điều kiện đó không còn đúng nữa.
- Test giờ kiểm tra:
  - trang danh sách có thật thì không bị chuyển hướng;
  - 13 slug cũ (VI/EN) → slug mới.

## 2. CMS Preview thật (sau khi ghi Sanity)

**Trạng thái Preview:**
- `cms-preview` = `56777e7`;
- Sanity snapshot `a4f9a041362a81da` (`fetchedAt` 05:36:46Z), `blogPosts: 38`.

| Kiểm tra | Kết quả |
|---|---|
| Bản sao Blog đang phục vụ: `/blog/`, `/blog/page/2-6/`, 38 bài VI/EN → `r28c-blog-published` | **376/376 PASS**. Kém 26 kiểm tra so với dist vì Preview trả 301 thật, không có trang stub |
| 26 URL cũ (13 VI + 13 EN) | **26/26: HTTP 301 → URL mới, URL mới 200** (`live-301.txt`) |
| `/blog/page/7/` | 404 (đúng, chỉ có 6 trang) |
| Bài mới: canonical `https://bioagroup.vn/...slug mới/`, robots `index, follow` | PASS |
| Host Preview có header `x-robots-tag: noindex` | Đúng: Google không index Preview |
| Ảnh: `screens/after-{blog,blog-page6,en-blog,renamed-article}-{390,1440}.png` | 8 ảnh |

## 3. Sanity

**Sao lưu trước khi ghi:** `r28c-before-2026-11-20T053505051Z.json`
- 99 tài liệu, 0 Draft;
- lưu riêng, không có trong ZIP.

**Chạy thử (dry run):** 29 tài liệu, tất cả ở rev `Vf5xODbUk3KT15bFnu12bg` (giao dịch đồng bộ R28), 0 Draft.

**Ghi thật:** giao dịch **`r22appgvF9LfESp2TYLVwG`**
- 29 patch, mỗi patch ghim `ifRevisionID`;
- `rewriteApproved=true` cho 29 bài;
- `slug.current` mới cho 13 bài.

**Trước / sau:**
- 29 tài liệu thay đổi; không trường nào ngoài `rewriteApproved` / `slug`;
- 38 `blogPost`, 38 slug duy nhất;
- chạy lại công cụ: 0 việc còn lại.

**`page-home`:**
- Giao dịch R28c không chạm vào (rev `WIhnXGDtfVOQnknZsgF6DG` trước và sau).
- Ghi chú: Owner đã tự Publish `page-home` từ Studio lúc 10:16Z ngày 19/11. Chữ "123" trong H1 VI đã được Owner bỏ.

## 4. Production (chỉ đọc)

| Kiểm tra | Kết quả |
|---|---|
| `https://bioagroup.vn/` | 503, `X-Robots-Tag: noindex, nofollow, noarchive` |
| `www` | 301 → apex |
| `main` | `9d044a7`, **không đổi** |

## 5. CI

PR nháp `zireyyyy/bioagroup#14`: xem `START_HERE.md` (trạng thái tại HEAD cuối).
