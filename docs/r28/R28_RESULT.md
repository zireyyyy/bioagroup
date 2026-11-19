# R28 — Kết quả (Blog 29 bài, icon Mobile, CMS Sync, VI-first)

**Ngày:** 19/11/2026.

**Nhánh / PR:**
- Nhánh `r28/blog-icon-cms`, tách từ R27b `52c25ac`.
- PR nháp `zireyyyy/bioagroup#14`, chỉ để chạy CI, **không merge**.

**Môi trường:**
- CMS Preview: https://cms-preview.bioagroup.pages.dev/
- Production: **không đổi** (maintenance).

**Không tuyên bố OWNER PASS hay PUBLIC LAUNCH READY.**

## 1. Tóm tắt

| Hạng mục | Kết quả | Trạng thái |
|---|---|---|
| Viết lại 29 bài Blog VI/EN | Xong. Nội dung riêng từng bài, SEO riêng, module Blog đã khóa giữ nguyên. Đã đồng bộ lên Sanity và hiển thị trên Preview. **Vẫn noindex** cho tới khi Owner duyệt từng bài | Code + kiểm thử PASS. **Chờ Owner đọc duyệt** |
| Icon BIO-A Mobile `/dich-vu-khac/` | Ô monogram trong danh sách quy trình cùng cỡ với 5 icon bên cạnh (khung 30, hình 16), Chrome + WebKit/iPhone | PASS tự động. Chờ Owner kiểm trên iPhone thật |
| Bong bóng chat che nội dung trên Mobile | Xác nhận lỗi. Bong bóng tự ẩn sau 8 giây hoặc khi cuộn | PASS tự động |
| CMS Sync "H1 …123" | Không có lỗi hệ thống: "123" chỉ ở trạng thái Publish 73 giây ngày 17/11, tới 19/11 mới được Publish lại và đang hiển thị. Thêm dấu `/_bioa-cms.json` + `tools/cms-preview-status.mjs` để phát hiện Preview cũ | PASS (E2E thật ≈ 53 giây) |
| **VI-first: EN tự dịch** | Kiến trúc, bộ máy dịch, đồng bộ, khóa, trạng thái, build an toàn, giao diện Studio: **xong + 19 kiểm thử**. **Dịch thật khi Publish: BLOCKED** (cần Owner chọn dịch vụ/chi phí, cho deploy Studio + Worker, tạo token ghi) | **CHƯA hoàn thành toàn bộ**: điều kiện E2E với dịch vụ thật chưa chứng minh được |
| Tiêu đề viết tắt (phát sinh) | "Spf/Uva/Tp.hcm" → "SPF/UVA/TP.HCM" ở H1–H3 tiếng Việt (gồm 2 bài đã duyệt) | PASS |

## 2. Kiến trúc VI-first thực tế

Xem `VI_FIRST_CMS.md`:
- §1: kiểm tra hạ tầng;
- §2: kiến trúc và thứ tự xử lý chống vòng lặp;
- §4: chi phí;
- §6: các bước kích hoạt;
- §7: hướng dẫn Owner.

## 3. Commit (nhánh `r28/blog-icon-cms`)

| Commit | Nội dung |
|---|---|
| `410a4ad` | Icon danh sách Mobile, bong bóng chat Mobile, chữ viết tắt trong tiêu đề VI (+ test) |
| `81f0042` | 29 bài Blog + `tests/r28-blog-rewrite-audit.mjs` + bước CI + `tools/cms-sync-blog.mjs` |
| `4db7c17` | `/_bioa-cms.json` + `tools/cms-preview-status.mjs` |
| `8f4bcf8` | Phạm vi R28 trong cổng phase-diff / final gate |
| `a5cd9d2` | Phê duyệt module-isolation cho `410a4ad`, `81f0042` |
| `6d185bc` | Hợp đồng P1/P2: ô danh sách Mobile 16×16 |
| `ecfdd37` | Build giữ lại nội dung chưa đủ EN; alt EN rỗng; `waitingEn` |
| `bb7a26f` | Lớp dịch VI→EN: core, providers, orchestrator, Worker (chưa deploy), runner, 18 test |
| `ef5f7b6` | Studio: trạng thái EN, Đồng bộ lại / Khóa / Xem EN, EN thu gọn và không bắt buộc |
| `57dc1e7` | Sửa tên trường Tuyển dụng (`titleVI`) + test (19) |
| *(docs)* | `docs/r28/*` + bàn giao. HEAD cuối = SHA trong tên ZIP |

**Tệp code đã sửa:**
- `bioa-home-refine.mjs`, `bioa-blog-refine.mjs`, `bioa-cms.mjs`, `build.mjs`;
- `tools/cms-snapshot.mjs`, `package.json`, `.github/workflows/validate-source-component-rebuild.yml`;
- `tests/phase-diff-scope.mjs`, `tests/p0a-final-gate.mjs`, `tests/p0a-module-isolation.test.mjs`, `tests/p1p2-icon-tablet-type.mjs`;
- `studio/sanity.config.ts`, `studio/schemaTypes/{blogPost,career,imageSlot,pageContent,seoPage}`.

**Tệp code mới:**
- `cms/i18n/{core,orchestrate,providers,glossary}.mjs`;
- `workers/cms-i18n/*`;
- `tools/{cms-i18n,cms-sync-blog,cms-preview-status}.mjs`;
- `tests/{r28-blog-rewrite-audit,r28-mobile-icon-chat,cms-i18n.test}.mjs`;
- `studio/{components/I18nStatusInput.tsx,lib/i18nConfig.ts,schemaTypes/i18n.tsx}`.

**Không đổi:**
- ảnh Merywood, số liệu nhà máy, MOQ, chứng nhận, pháp lý, Tuyển dụng, tên nhân viên tư vấn;
- URL, canonical, hreflang, sitemap, quy tắc noindex;
- Production, `BIOA_SITE_MODE`, chatbot AI, `/api`.

## 4–5. Cơ chế dịch và chi phí

Xem `VI_FIRST_CMS.md` §2–§4:
- khuyến nghị thử **Workers AI** trước (không cần khóa mới, có hạn mức miễn phí hằng ngày), hoặc **Claude API** (chất lượng B2B tốt hơn, trả phí, toàn site một lần dự kiến < 1 USD);
- **chưa phát sinh chi phí**, chưa kích hoạt dịch vụ nào.

## 6. 29 bài Blog

Xem `BLOG_29_REWRITE_REPORT.md` (bảng từng bài) và `BLOG_SEO_AUDIT.md`.
- **Nhóm A (16 bài, B2B / kỹ thuật):** đủ điều kiện Owner duyệt (một số cần xác nhận phạm vi dịch vụ hoặc slug).
- **Nhóm B (12 bài, da liễu / sức khỏe / DIY):** nên có người có chuyên môn đọc lại.
- **Nhóm C (1 bài):** nước hoa ô tô, chờ Owner quyết định giữ hay gỡ.
- Không bài nào được bật index.
- Các slug gây hiểu nhầm ("top-10/20", "trị mụn", "điều trị hiệu quả", "độc quyền", "làm hồng chuyên sâu"…) chỉ **đề xuất** đổi kèm 301.

## 7. Icon Mobile

Xem `MOBILE_ICON_FIX.md`.

## 8. CMS Sync

Xem `SANITY_SYNC_ROOT_CAUSE.md` và `CMS_PUBLISH_E2E.md`.

## 9. Kiểm thử VI→EN

`CMS_PUBLISH_E2E.md` §2–§3:
- 19/19 offline;
- chạy thử không ghi trên dữ liệu thật: phát hiện đúng 1/119 đoạn cần dịch;
- **E2E với dịch vụ thật: BLOCKED**.

## 10. Hồi quy Desktop / Tablet / Mobile / SEO

Xem `QA_MATRIX.md`.

## 11. Danh sách BLOCKED (cần Owner)

1. Chọn dịch vụ dịch + duyệt chi phí.
2. Cho phép deploy Studio R28. Lệnh deploy bị cơ chế phân quyền của phiên làm việc chặn. Sau đó developer ghi dữ liệu nền `i18n` (97 tài liệu; chạy thử: 96 SYNCED, 1 OUTDATED = H1 "…123").
3. Cho phép tạo token Sanity Editor cho máy chủ dịch + deploy Worker `bioa-cms-i18n` + đổi URL webhook.
4. Sau 1–3: chạy E2E VI→EN thật (10 kịch bản), rồi mới báo VI-first hoàn thành.
5. Duyệt từng bài trong 29 bài (`rewriteApproved`), đổi slug + 301 (nếu đồng ý), quyết định bài nước hoa ô tô.
6. Các mục pháp lý / doanh nghiệp còn mở từ R26–R27 (`docs/r27/OWNER_CONTENT_INPUTS.md`).

## 12. Hướng dẫn Owner

Xem `OWNER_UAT.md` và `VI_FIRST_CMS.md` §7.

## 13. Rollback

Xem `DEPLOY_ROLLBACK.md`.

## 14. Git

**Cuối R28:**
- nhánh `r28/blog-icon-cms` đã push;
- `cms-preview` fast-forward tới HEAD R28;
- `main` không đổi (`9d044a7`);
- không force push, không reset/stash/clean;
- không có thay đổi chưa commit ngoài thư mục bị bỏ qua.

## BẠN CẦN TEST GÌ

**Phân loại:** UI-RESPONSIVE + CONTENT + CMS (CMS Preview). Production không đổi.

1. **iPhone** → `https://cms-preview.bioagroup.pages.dev/dich-vu-khac/` và `/en/dich-vu-khac/`:
   - ô logo BIO-A (bước 03) trong danh sách 6 bước **cùng cỡ** các icon khác → PASS;
   - bong bóng chat tự ẩn sau ~8 giây hoặc khi cuộn → PASS.
   - FAIL: gửi ảnh chụp + model iPhone.
2. **Máy tính 1440 và Tablet:**
   - Trang chủ, Dịch Vụ Khác: icon và bong bóng **không đổi** so với R27b → PASS.
3. **Blog:**
   - mở vài bài trong `BLOG_29_REWRITE_REPORT.md` (VI + EN);
   - nội dung đúng chủ đề, không có thông tin sai về BIO-A → PASS cho bài đó;
   - bật `rewriteApproved` trong Studio chỉ với bài bạn đồng ý.
4. **Tiêu đề viết tắt:**
   - `/blog/10-tieu-chi-quan-trong-cac-boss-can-luu-y-khi-gia-cong-kem-chong-nang/` hiển thị "SPF", "UV", "UVA" viết hoa → PASS.
5. **CMS:**
   - sửa một đoạn trong Studio → Publish → sau 1–2 phút Preview đổi;
   - kiểm tra `/_bioa-cms.json`: `fetchedAt` mới hơn lúc Publish → PASS.
6. **VI-first:** chưa thể nghiệm thu (BLOCKED, mục 11).

**Trạng thái:**

| Loại kiểm tra | Trạng thái |
|---|---|
| CODE / BUILD | PASS |
| Kiểm thử tự động | PASS |
| CMS Preview | PASS |
| OWNER RUNTIME | **PENDING** |
| VI-first với dịch vụ thật | **BLOCKED** |
