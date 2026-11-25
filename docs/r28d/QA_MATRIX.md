# R28d — Ma trận kiểm thử

**Bằng chứng:** `D:\BIOA_WORKSPACE\_reports\r28d\` (trong ZIP: `evidence/`).

## 1. Bộ cổng đầy đủ trên dist cục bộ

**Bản build:** HEAD `d1c2eab`, dist 223 tệp, sha `ad7a31d7…`.
- Đóng băng tại `QA_EVIDENCE/dist-final-r28d`.
- Dist không đổi sau toàn bộ QA.
- Các commit sau đó (`c62889f`, `cce5b6d`, docs) chỉ sửa test và tài liệu, không đổi dist.

| Cổng | Kết quả |
|---|---|
| `test:candidate` (danh tính doanh nghiệp, 176 trang) | PASS |
| `test:p0a` (determinism, module isolation có mục duyệt `6ef278f`) | PASS |
| `test:responsive`, 404, Turnstile | PASS |
| `test:chat` (gateway cũ 8 + R28d 18) | 26/26 PASS (xem ghi chú 2) |
| Middleware: host gate, hash gate, www → apex, 301 | PASS |
| Phase-diff scope R28d / R28c+ / R28b+ / R28+ / R27+ / R26+ | PASS (chỉ selector chat thay đổi) |
| `test:cms` (cms-i18n 19 + R28d 7 + các suite cũ) | 41/41 PASS |
| SEO R26, R28 Blog rewrite | PASS |
| R27 content audit | 1 lỗi test → sửa → **PASS** (xem ghi chú 1) |
| `r28c-blog-published` (38 bài, index, sitemap, 301) | 402/402 PASS |
| P0B1 runtime, D11, Careers | 24/24, 14/14, 186/186 PASS |
| R27 browser defects | 72/72 PASS |
| R28 icon + teaser chat | PASS |
| **`r28b-owner-fix`** (so với bản tham chiếu, và chat so với bản chat đã duyệt `9d044a7`) | **1090/1090 PASS** |
| **`r28d-chat-restore` Chrome** | **469/469 PASS** |
| **`r28d-chat-restore` WebKit** | **469/469 PASS** |
| P1/P2, Roadmap Home / Cosmetics, How It Works, Home sections | PASS (36/36, 36/36, 28/28, 20/20) |
| Route smoke, Chat UI probe, Lead form | PASS (60/60, 36/36) |
| Tablet: smoke, Swiper, TOC, Contacts/404, full route audit | PASS |

**Ghi chú 1: R27 content audit.**
- Kiểm tra "trả lời cục bộ phải nói rõ tin chưa được gửi" mà tôi thêm ở R28d chạy **sau** lệnh xóa thẻ `<script>`, nên luôn báo lỗi (110 trang).
- Đã sửa trong `c62889f`: đọc script chat trước khi xóa.
- Chạy lại: 0 lỗi.
- Kiểm tra này không rỗng, vì khi không đọc được script nó báo lỗi ở toàn bộ 110 trang.

**Ghi chú 2: CI.**
- Lần push đầu (`57b37b4`), CI dùng Node 22 và hủy 10 test trong `r28d-chat-ai.test.mjs`.
- Nguyên nhân: test timeout dùng `AbortSignal.timeout()`, có timer không giữ event loop. Mô hình giả không bao giờ trả lời, nên event loop kết thúc trước.
- Máy cục bộ chạy Node 26 nên không gặp.
- Đã sửa trong `cce5b6d`, chỉ sửa test, không đổi mã chạy thật.

**`r28d-chat-restore` kiểm tra gì:**
- 4 trang (`/`, `/en/`, `/dich-vu-khac/`, `/en/blog/`) × 7 độ rộng (320, 390, 768, 834, 1024, 1440, 1920).
- Form có ô nhập và nút gửi; ô nhập được focus khi mở popup.
- Gửi ô trống: không có gì xảy ra.
- Chuỗi XSS hiện ra dưới dạng chữ, không chạy.
- Nút gửi bị khóa khi đang chờ.
- Trả lời trung thực, có đúng 1 nút chuyển kênh: Zalo ở VI, Telegram ở EN, `_blank`, `noopener`.
- Không chuyển trang, không hộp thoại, **không có request `/api/` hay `tel:`**, không tràn khung, Esc đóng popup.
- Chế độ API (giả lập): đúng hợp đồng request, trả lời hiện dưới dạng chữ; lỗi 503 / 429 / dữ liệu sai → câu xin lỗi kèm nút chuyển kênh.

## 2. CMS Preview thật

**Trạng thái Preview:**
- `cms-preview` = `57b37b4`, rồi `cce5b6d` (chỉ đổi test, dist giống nhau);
- Sanity snapshot `97d6dcb9621d54a1`, `blogPosts: 38`;
- host vẫn `x-robots-tag: noindex, nofollow, noarchive`.

| Kiểm tra | Kết quả |
|---|---|
| Popup `/`, `/en/`: có form, **không** có `data-chat-api`, không có dòng thông báo AI, không có `tel:` | Đúng: cờ API **OFF** |
| **`r28d-chat-restore` Chrome trên Preview thật** | **469/469 PASS** |
| **`r28d-chat-restore` WebKit trên Preview thật** | **469/469 PASS** |
| Danh sách `/blog/` trang 1–6 | 7+7+7+7+7+3 = **38 bài** |
| 13 slug cũ × VI/EN | **26/26** trả 301 → slug mới |
| Ảnh `evidence/screens/after-*`, `after-sent-*` (390 / 834 / 1440, VI/EN) | Form C4B/C7; trả lời trung thực kèm 1 nút Zalo (VI) / Telegram (EN) |
| CI `candidate-validation` trên PR #14 (`cce5b6d`) | PASS (lần trước trên `57b37b4` FAIL, xem ghi chú 2) |

## 3. Production (chỉ đọc)

| Mục | Kết quả |
|---|---|
| `main` | `9d044a7`, không đổi trước/sau |
| `https://bioagroup.vn/` | 503 bảo trì, `X-Robots-Tag: noindex, nofollow, noarchive` |
| `https://www.bioagroup.vn/` | 301 → `https://bioagroup.vn/` |

## 4. Checkpoint B / C khi kích hoạt thật

**BLOCKED.** Không chạy E2E thật, không gọi AI lần nào, không ghi Sanity. Lý do ở `COST_AND_SECURITY.md` §5.

Đã chạy (chỉ đọc):
- `tools/cms-i18n.mjs status`: 97 tài liệu, tất cả SYNCED, chưa có baseline.
- Backfill dry run: sẽ ghi 97 baseline. **Chưa ghi.**

## 5. Tiếp nối 23/11/2026 (D0 / C0)

**Bản build:**
- Build lại tại commit tiếp nối: 223 tệp, **giống hệt từng byte** `QA_EVIDENCE/dist-final-r28d` (`6889ec9`).
- Vì vậy các cổng trình duyệt và hình ảnh của mục 1–2 (Chrome / WebKit 469/469, `r28b-owner-fix` 1090/1090, Tablet, Roadmap…) vẫn đúng cho bản này. Lần này chỉ chạy lại các cổng tĩnh / unit.

| Cổng | Kết quả |
|---|---|
| `test:candidate` | PASS (danh tính 176 trang) |
| `test:p0a` (determinism, module isolation) | PASS |
| `test:responsive` | PASS |
| `test:chat` (gateway 8 + R28d 20, gồm test 27–28 mới) | **28/28 PASS** |
| `test:cms` (gồm `r28d-content-parity` 4 test mới) | **45/45 PASS** |
| **`test:content`** (`r28d-content-guard`, 55 cặp VI/EN, baseline 23/11) | **PASS**; thử với lỗi cố ý chèn vào thì báo đúng 12 lỗi |
| Middleware (host gate, hash gate, www, 301) | PASS, không đổi |
| SEO R26, nội dung R27, Blog R28, `r28c-blog-published` | PASS, PASS, PASS, 402/402 |
| `liveSnapshot` trên dữ liệu Sanity thật (chỉ đọc) | `waitingEn: []`, snapshot `97d6dcb9621d54a1` không đổi |

**Bằng chứng:** `D:\BIOA_WORKSPACE\_reports\r28d-d0\gates\`.

**Không chạy:**
- E2E chatbot AI thật (C1 BLOCKED);
- ghi Sanity (D1 chờ Owner).
