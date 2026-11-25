# R28 — QA matrix

Log và báo cáo nằm trong ZIP ở `evidence/r28/` (bản sao của `D:\BIOA_WORKSPACE\_reports\r28\`).

| Mục | Giá trị |
|---|---|
| Code được kiểm thử | Cổng chính: `6d185bc`. Chạy lại `candidate` / `p0a` / `cms` trên `57dc1e7`. Các commit VI-first không đổi output khi CMS tắt: `dist` của HEAD = bản đóng băng |
| Bản build đóng băng | `QA_EVIDENCE\dist-final-r28`: 197 tệp, tree sha256 `0ad6afad…59afe0e1`. Không đổi sau toàn bộ QA; `dist` của HEAD `57dc1e7` giống hệt (`gates/rerun-summary.txt`) |

## 1. Cổng repo (cục bộ, CMS tắt; `_reports/r28/run-gates.sh` → `gates/summary.txt`)

| Lệnh | Kết quả |
|---|---|
| `npm run test:candidate` | Lần đầu FAIL: P1/P2 còn hợp đồng cũ (ô danh sách 22×27). Cập nhật hợp đồng theo yêu cầu Owner R28 (`6d185bc`) → **PASS** khi chạy lại trên `57dc1e7` |
| `npm run test:p0a` | PASS: isolation có phê duyệt R28 `a5cd9d2`; final gate `…+R27+R28`; determinism |
| `phase-diff-scope` R28 (so với R27), R27+R28 (so với R26), R26+R27+R28 (so với rc2) | PASS, cả 3 |
| responsive 15 · 404 6 · Turnstile 7 · chat 8 · middleware 18 | PASS |
| `npm run test:cms` | PASS. Chạy lại trên `57dc1e7`: R25 15/15 + **VI-first 19/19** |
| `r26-seo-content-audit` · `r27-content-audit` | PASS |
| **`r28-blog-rewrite-audit`** | **PASS**: 58 trang, 0 lỗi, trùng tối đa 0,099. Trên bản R27: FAIL (trùng 0,81, tiêu đề/mô tả cũ) |
| p0b1 24/24 · D11 · careers 186/186 | PASS |
| `r27-browser-defects` (Footer, modal, chat) | PASS |
| **`r28-mobile-icon-chat`** | **74/74 PASS**. Trên bản R27: FAIL đúng lỗi |
| `p1p2-icon-tablet-type` (hợp đồng R28) | PASS |
| roadmap Home / Cosmetics · how-works · home sections | PASS |
| route smoke · chat probe · lead probe · 5 bộ Tablet | PASS |
| GitHub CI `candidate-validation`, PR `zireyyyy/bioagroup#14` | PASS ở `6d185bc`; HEAD cuối: xem báo cáo cuối (`ci-pr14.txt`) |

## 2. CMS Preview thật (https://cms-preview.bioagroup.pages.dev/)

| Kiểm tra | Kết quả |
|---|---|
| Deployment code R28 | `d478ffe7` (`ef5f7b6`), sau đó rebuild do webhook |
| Publish 29 bài → Preview | ≈ 53 giây; `cms-preview-status`: UP TO DATE (`CMS_PUBLISH_E2E.md`) |
| `r28-blog-rewrite-audit` trên HTML Preview đang phục vụ | 58/58 PASS |
| **E2E** `r26-preview-e2e`:<br>• sitemap + chính sách;<br>• độ rộng 312, 320, 375, 390, 428, 768, 834, 1024, 1440, 1920;<br>• zoom 1440@125% và 390@125% | **408 lần tải, 0 lỗi; 11/11 luồng**: cookie VI/EN, menu mobile, modal (Esc đóng), slider, đổi ngôn ngữ, phím Tab |
| E2E thêm 58 trang bài viết lại (320 / 390 / 834 / 1440 + zoom) | **96 tuyến, 412 lần tải, 0 lỗi; 11/11 luồng** (`e2e-preview-blog/`) |
| `r28-mobile-icon-chat` trên Preview | **74/74 PASS** |
| WebKit (engine Safari), iPhone 13 / SE, Dịch Vụ Khác VI/EN | Ô danh sách: 6 icon đều **16×16 trong khung 30×30**; thẻ dịch vụ đều 22×27 trong 42×42 (`webkit-icon-preview.txt`) |
| Giá trị "123" của Owner | Vẫn trong Sanity (rev `WIhnXGDtfVOQnknZsffvKY`) và trên Preview |

**Cảnh báo giữ nguyên** (không phải R28): "clipped text" ở thẻ Dịch Vụ Khác / Chai lọ, đo lúc hiệu ứng hiện chữ. Giống R26/R27.

## 3. Production (chỉ đọc, không POST; `prod-check.txt`)

| URL | Kết quả |
|---|---|
| `bioagroup.vn/`, `/en/blog/`, `/_bioa-cms.json`, `/api/lead` | 503, noindex |
| `www.bioagroup.vn/en/about/?a=1` | 301 → `https://bioagroup.vn/en/about/?a=1` |

## 4. Không kiểm được

- iPhone / iPad thật (chỉ giả lập Chrome và WebKit).
- Dịch VI→EN với dịch vụ thật: **BLOCKED**.
- Studio mới trên https://bioagroup.sanity.studio/: chưa deploy. Chỉ build + typecheck PASS.
- Nghiệm thu hình ảnh của Owner.
