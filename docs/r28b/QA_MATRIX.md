# R28b — QA matrix

**Vị trí log:** `evidence/r28b/` trong ZIP (bản sao của `D:\BIOA_WORKSPACE\_reports\r28b\`).

**Code được kiểm thử:** `534dabd` + hợp đồng P1/P2 `f8dcd24`.

**Bản build đóng băng (CMS tắt, chế độ Production):**
- `QA_EVIDENCE\dist-final-r28b`: 197 tệp, tree sha256 `8c191417…dbbe`;
- không đổi sau toàn bộ QA.

## 1. Cổng repo (`run-gates.sh` → `gates/summary.txt`)

| Lệnh | Kết quả |
|---|---|
| `npm run test:candidate` | Lần đầu FAIL: hợp đồng P1/P2 cũ vẫn bắt ô thẻ dịch vụ Mobile phải 22×27. Đã cập nhật theo yêu cầu Owner R28b (`f8dcd24`) → chạy lại **PASS** (`gate-test-candidate-rerun.log`) |
| `npm run test:p0a` | PASS: isolation có phê duyệt R28b, final gate `…+R28+R28b`, determinism |
| `phase-diff-scope`: R28b (so R28), R28+R28b (so R27), R27+R28+R28b (so R26), R26…R28b (so rc2) | PASS cả 4. Bản Production chỉ đổi CSS dùng chung, script nội tuyến và khối popup; danh sách Blog, sitemap và bài viết **không đổi** |
| responsive 15 · 404 6 · Turnstile 7 · chat gateway 8 · middleware 18 · CMS 34 | PASS |
| SEO R26 · nội dung R27 · Blog R28 | PASS |
| **`r28b-blog-preview-list --mode production --compare R28`** | **210/210 PASS**: Production vẫn chỉ 9 bài; trang 3–6 vẫn chuyển hướng; head SEO của 38 bài giống hệt R28 |
| p0b1 24/24 · D11 · careers 186/186 · lead 36/36 · chat UI 60/60 · r27-browser 72/72 · r28-icon-chat | PASS |
| **`r28b-owner-fix`** (Chrome, so R28 và bản đã duyệt) | **1090/1090 PASS** |
| p1p2 · roadmap Home/Cosmetics 36/36 · how-works 28/28 · home sections 20/20 · route smoke · 5 bộ Tablet | PASS |

## 2. Kiểm thử mới bao phủ đúng phản ánh của Owner

### `tests/r28b-owner-fix.mjs`

**Phạm vi đo:**
- VI và EN;
- độ rộng 312 (390 @125%), 320, 375, 390, 428, 768, 834, 1024, 1152 (1440 @125%), 1440, 1920;
- **đi qua đủ 5 slide** bằng chính nút chuyển slide của trang.

**Mobile (≤768):**
- ô logo = ô số thứ tự = 37×37;
- logo ≤20×20, giữ tỷ lệ, nằm trong ô;
- khoảng cách 7px;
- không có vùng trống dưới mô tả;
- 5 thẻ cao bằng nhau;
- ảnh giữ tỷ lệ 295/315.

**Tablet / Desktop (≥769):** mọi số đo bằng bản R28 (không đổi).

**Popup:**
- Đo trên `/`, `/dich-vu-khac/`, `/en/dich-vu-khac/`, `/en/blog/` × 9 độ rộng.
- Bố cục:
  - ô cuối là liên kết `tel:`;
  - không có ô nhập tin nhắn;
  - Zalo chỉ xuất hiện 1 lần;
  - ô cao 44px, nút tròn nằm trong ô;
  - khung nằm gọn trong màn hình.
- Đóng / mở:
  - Esc đóng popup và trả focus về nút ảnh đại diện;
  - nút thu gọn và bấm ra ngoài đều đóng;
  - chạm (touch) mở được.
- Đối chiếu bản đã duyệt `9d044a7` ở 375 / 834 / 1440: header, hàng icon, vùng tin nhắn và khung sai khác 0px.

**Đối chứng:** chạy trên bản R28 cũ → **FAIL 392 lỗi** (`owner-fix-on-r28-expected-fail.txt`), gồm ô 42×42 ≠ ô số 37×37, logo 22×27, vùng trống, nút Zalo trùng, không đóng được bằng Esc.

### `tests/r28b-blog-preview-list.mjs --mode preview`

- 38 bài, mỗi bài đúng 1 lần, ở cả VI và EN.
- 9 bài đã duyệt đứng đầu, theo thứ tự cũ.
- Mỗi thẻ mở đúng trang chi tiết; H1 = tiêu đề thẻ.
- 29 bài và trang danh sách 2–6 có noindex và không vào sitemap; trang 1 vẫn index.
- Head SEO của bài giống bản Production.

## 3. CMS Preview thật (deployment `f91508c0`, `f8dcd24`)

| Kiểm tra | Kết quả |
|---|---|
| `/_bioa-cms.json` | `mode: live`, `commit: f8dcd243b26e`, `blogPosts: 38`, `fetchedAt 2026-11-20T03:50:48Z` |
| Blog: tải về 12 trang danh sách + 76 trang bài + sitemap (`preview-mirror/`) rồi chạy `r28b-blog-preview-list --mode preview` | **328/328 PASS** |
| `r28b-owner-fix`, **Chrome** | **1090/1090 PASS** |
| `r28b-owner-fix`, **WebKit** (engine Safari) | **1090/1090 PASS** |
| Ảnh trước/sau, Chrome + WebKit | 132 ảnh trong `_reports/r28b/shots/`; 102 ảnh tiêu biểu (390 / 1440) trong ZIP ở `evidence/r28b-screens/` |
| GitHub CI PR `zireyyyy/bioagroup#14` | Cloudflare Pages PASS; `candidate-validation` PASS ở `f8dcd24` (`ci-pr14.txt`) |

## 4. Production (chỉ đọc, `prod-check.txt`)

- `bioagroup.vn/`, `/en/blog/`, `/_bioa-cms.json`, `/api/lead`: **503** + `noindex`.
- `www` → 301 về apex.
- `main` = `9d044a7` (không đổi).

## 5. Không kiểm được

- iPhone / iPad thật: chỉ giả lập bằng Chrome và WebKit.
- Nghiệm thu hình ảnh của Owner.
