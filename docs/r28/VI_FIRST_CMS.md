# R28 — CMS VI-first: tiếng Việt là nguồn, tiếng Anh tự động dịch

**Trạng thái thật (không phóng đại):**

| Phần | Trạng thái |
|---|---|
| Kiến trúc, bộ máy dịch, cơ chế đồng bộ, chống vòng lặp, khóa EN, trạng thái, build an toàn | **Xong, có kiểm thử tự động** (`tests/cms-i18n.test.mjs`: 19/19, trong `npm run test:cms` và CI) |
| Giao diện Studio (trạng thái EN, Đồng bộ lại EN, Khóa EN, Xem EN, trường EN thu gọn và không bắt buộc) | **Code xong, build PASS. CHƯA deploy** lên https://bioagroup.sanity.studio/: lệnh deploy bị cơ chế phân quyền của phiên làm việc chặn, cần Owner cho phép |
| Ghi dữ liệu nền `i18n` cho 97 tài liệu | **Chưa ghi.** Chạy thử: 96 SYNCED, 1 OUTDATED (`page-home`: H1 "…123" chỉ sửa VI). Chờ Studio mới được deploy, để Owner không thấy "trường lạ" |
| **Dịch tự động thật khi Owner Publish** | **BLOCKED**: chưa có dịch vụ dịch được duyệt chi phí, chưa có token ghi Sanity cho máy chủ dịch, Worker chưa deploy |

**Kết luận:** điều kiện hoàn thành "Owner chỉ sửa VI, EN tự cập nhật trên website" **chưa được chứng minh end-to-end với dịch vụ dịch thật**, nên **chưa báo hoàn thành**. Các bước kích hoạt ở mục 6.

> **Cập nhật R28d (21/11/2026): dịch vụ dịch đã chọn là Cloudflare Workers AI, chi phí mục tiêu $0.**
>
> **Đã làm (mã nguồn):**
> - Provider `workers-ai` dừng an toàn (fail closed) nếu thiếu `I18N_COST_GATE=verified` hoặc bộ giới hạn chi phí D1 (`lib/chat/budget.js`, luồng `i18n` ≤ 6.000 Neuron/ngày).
> - Dịch theo từng đoạn ≤ 2.500 ký tự; trước mỗi đoạn, giữ chỗ chi phí xấu nhất.
> - Model mặc định `@cf/google/gemma-4-26b-a4b-it`.
> - Bài tuyển dụng luôn ở trạng thái REVIEW_REQUIRED sau khi dịch máy.
> - Test: `tests/r28d-i18n.test.mjs`.
>
> **Chạy chỉ đọc ngày 21/11:** 97 tài liệu SYNCED, chưa có baseline; backfill dry run sẽ ghi 97 baseline. **Chưa ghi.**
>
> **Kích hoạt thật vẫn BLOCKED** (xem `docs/r28d/COST_AND_SECURITY.md` §5):
> - xác minh gói Workers;
> - token Sanity Editor mới;
> - deploy Studio và Worker;
> - chuyển webhook;
> - E2E có bản sao lưu.

## 1. Kiểm tra hạ tầng hiện có (chỉ đọc, `evidence/r28/i18n-infra-audit.txt`)

- **Schema:** VI/EN theo từng trường:
  - Blog: `titleVi`/`titleEn`, các mục `headingVi`/`headingEn`…;
  - trang: mỗi đoạn `{vi, en}`;
  - SEO: `vi{}`/`en{}`;
  - Tuyển dụng: `titleVI`/`titleEN`;
  - ảnh: `altVi`/`altEn`.
  Trước R28, Studio **bắt buộc** nhập EN.
- **Plugin / dịch vụ dịch:** không có. Studio chỉ dùng `structureTool` và `@sanity/vision`. Không có khóa API dịch trong code hay trong biến môi trường Cloudflare (đã liệt kê **tên** biến, không đọc giá trị).
- **Sanity AI Assist:** dự án có cờ tính năng `editorialAiFieldActions`, nhưng plugin chưa cài. AI Assist là thao tác **người dùng bấm trong Studio**, không tự chạy sau Publish, và hạn mức/chi phí theo gói chưa xác minh được. Vì vậy không chọn làm cơ chế tự động.
- **Token Sanity:** chỉ có `bioa-build-read` (**viewer**, chỉ đọc). Máy chủ dịch cần một token **Editor** mới, tức là thay đổi quyền, cần Owner duyệt.
- **Cloudflare:**
  - Workers AI hiển thị trên tài khoản, nhưng không có binding nào;
  - không đọc được gói cước (API trả 403);
  - Preview có `SANITY_*` (chỉ đọc), Production không có `SANITY_*` (giữ nguyên).
- **Quy trình hiện tại:** Draft → Publish → webhook "BIO-A Preview rebuild" (chỉ bản published) → deploy hook `cms-preview` → build đọc Sanity → HTML tĩnh VI và EN theo URL riêng. Không có dịch bằng JavaScript phía trình duyệt. **Giữ nguyên.**

## 2. Kiến trúc chọn

**Nguyên tắc:** ít thay đổi nhất, tái dùng schema và build hiện có.

```
Owner sửa VI → Publish
   └─ webhook (sau khi kích hoạt: trỏ tới Worker "bioa-cms-i18n" thay vì thẳng deploy hook)
        Worker: kiểm chữ ký → đọc bản published → so hash từng đoạn VI
          ├─ không có đoạn VI nào đổi → gọi deploy hook (1 build)
          └─ có đoạn đổi → dịch CHỈ các đoạn đó → kiểm tra cấu trúc → ghi EN + trạng thái
               vào ĐÚNG các trường EN hiện có, khóa theo revision đã đọc (ifRevisionID)
               └─ chính lần ghi này tạo sự kiện mới → không còn gì để dịch → 1 build (đã có EN mới)
Build: đọc bản published (VI + EN đã lưu) → HTML tĩnh VI/EN như hiện nay
```

| Yêu cầu | Cách đáp ứng |
|---|---|
| Lưu EN vào dữ liệu, build dùng lại | EN ghi vào đúng trường EN đang có; build không đổi cách đọc |
| Không dịch lại phần không đổi | Hash từng đoạn VI (`i18n.units[].viHash`) |
| Không ghi đè EN Owner sửa | EN khác hash đã ghi → đoạn "sửa tay", được giữ. **Khóa bản EN** giữ cả tài liệu |
| Dịch lại thủ công | Nút **Đồng bộ lại EN** → Publish |
| Không vòng lặp | Lần ghi của Worker làm hash khớp → sự kiện sau chỉ build. Lỗi dịch ghi `failedHash` → không thử lại cùng bản VI |
| Không build trước khi EN được lưu | Khi có đoạn cần dịch, Worker không build; chỉ build ở sự kiện sau lần ghi EN |
| Không build thừa | Một Publish = một build. Cloudflare còn tự gộp các build đang chờ |
| Hai lần Publish liên tiếp | Lần ghi của bản dịch cũ bị từ chối (revision đã đổi). Bản mới được dịch ở sự kiện của nó |
| Dịch lỗi | EN cũ giữ nguyên, trạng thái FAILED kèm lý do tiếng Việt, website vẫn build với VI mới + EN cũ hợp lệ |
| Không tạo trang EN rỗng | Build giữ lại bài Blog / tin Tuyển dụng chưa đủ EN (`waitingEn`); bản repo cùng slug vẫn chạy. Ảnh mới chưa có alt EN → alt EN rỗng (không dùng chữ Việt hay alt ảnh cũ) |
| Văn bản pháp lý | **Không dịch máy**. Vẫn qua quy trình "Duyệt & xuất bản" hiện có |
| Thông tin chính thức Tuyển dụng (quyền lợi, địa điểm, cách ứng tuyển) | Được dịch nhưng luôn ở trạng thái **REVIEW_REQUIRED** |
| Tên riêng, mã, liên kết | Thay bằng ký hiệu giữ chỗ trước khi gửi đi dịch, khôi phục và kiểm tra sau: BIO-A Group, OEM/ODM, R&D, ISO …, URL, email, đường dẫn nội bộ |
| Bảng thuật ngữ | `cms/i18n/glossary.mjs`. Thuật ngữ "strict" bị thiếu → REVIEW_REQUIRED |
| Dữ liệu gửi đi | Chỉ văn bản hiển thị công khai; không token, không dữ liệu khách hàng |

**Trạng thái:**
- Lưu trong tài liệu: SYNCED, REVIEW_REQUIRED, FAILED, MANUAL_LOCK, OUTDATED (ghi khi nạp dữ liệu nền).
- Studio tính trực tiếp từ nội dung đang sửa:
  - PENDING: VI đổi nhưng chưa Publish;
  - TRANSLATING: vừa Publish < 3 phút;
  - OUTDATED.

**SEO:** URL, canonical, hreflang, sitemap, robots, noindex, structured data **không đổi**. EN vẫn là HTML tĩnh tạo lúc build. GTranslate / dịch bằng JS **không** được dùng.

## 3. Tệp đã thêm / sửa

| Tệp | Vai trò |
|---|---|
| `cms/i18n/core.mjs` | Đơn vị dịch theo loại tài liệu, hash, kế hoạch, trạng thái, bảo vệ token, kiểm tra cấu trúc (dùng chung Studio / Worker / Node) |
| `cms/i18n/orchestrate.mjs` | Xử lý một lần Publish, kho Sanity HTTP, kiểm chữ ký webhook |
| `cms/i18n/providers.mjs` | `none` (mặc định), `test` (chỉ kiểm thử), `workers-ai`, `anthropic` (chưa kích hoạt). Timeout 25 giây, thử lại tối đa 2 lần, giới hạn 40.000 ký tự mỗi tài liệu |
| `cms/i18n/glossary.mjs` | Thuật ngữ VI–EN + quy tắc dịch B2B |
| `workers/cms-i18n/` | Worker dịch (**chưa deploy**; build thử `--dry-run` PASS, 25 KiB) |
| `tools/cms-i18n.mjs` | Cho developer: `status`, `backfill`, `run` |
| `tools/cms-snapshot.mjs`, `bioa-cms.mjs`, `build.mjs` | Giữ lại nội dung chưa đủ EN; alt EN rỗng; `waitingEn` trong `/_bioa-cms.json` |
| `studio/…` | Khung trạng thái EN, huy hiệu, trường EN thu gọn, EN không chặn Publish |
| `tests/cms-i18n.test.mjs` | 19 kịch bản |

## 4. Chi phí dự kiến (chưa phát sinh đồng nào)

**Khối lượng đo thật** (`evidence/r28/i18n-volume.txt`): **~110.000 ký tự VI** có thể dịch trên 97 tài liệu.

| Loại nội dung | Ký tự |
|---|---|
| Blog | 82.000 |
| Đoạn trang | 22.700 |
| Tuyển dụng | 3.400 |
| SEO | 1.500 |
| Alt ảnh | 116 |

Bài lớn nhất 7.565 ký tự. Một lần sửa thông thường (một tiêu đề, một đoạn) chỉ vài trăm ký tự, vì chỉ đoạn thay đổi được dịch.

| Phương án | Ước tính | Ghi chú |
|---|---|---|
| **Workers AI** (Cloudflare, tài khoản đang dùng) | Có hạn mức miễn phí hằng ngày theo bảng giá Cloudflare. Mức sửa nội dung bình thường dự kiến nằm trong hạn mức | Không cần khóa API riêng. Chất lượng dịch B2B của mô hình nhỏ **cần thử trên mẫu** trước khi duyệt. Phần vượt hạn mức chỉ tính phí nếu tài khoản ở gói trả phí |
| **Claude API** (Anthropic) | Dịch **toàn bộ** website một lần: cỡ vài chục nghìn token mỗi chiều, dự kiến **dưới 1 USD** với mô hình nhỏ. Mỗi lần sửa: không đáng kể | Cần tài khoản/khóa API trả phí của Owner. Chất lượng B2B tốt hơn |
| **Sanity AI Assist** | Theo gói Sanity (chưa xác minh) | Không tự chạy khi Publish; Owner vẫn phải bấm |

Giá chính xác phải lấy từ bảng giá hiện hành của nhà cung cấp lúc Owner duyệt.

**Giới hạn có sẵn trong code:**
- 40.000 ký tự mỗi tài liệu mỗi lần;
- `i18n.usage` đếm ký tự và số lần dịch mỗi tài liệu;
- không dịch lại phần không đổi.

## 5. 29 bài Blog

**Bản EN của 29 bài là bản dịch một lần khi phát triển.** Developer viết VI rồi dịch EN trong R28. Đây **không** phải bằng chứng cho cơ chế tự dịch.

Khi đồng bộ lên Sanity, 29 bài được ghi nhận là SYNCED (cặp VI/EN do developer viết).

## 6. BLOCKED: các bước kích hoạt (cần Owner)

1. **Chọn dịch vụ dịch và duyệt chi phí:** Workers AI (khuyến nghị thử trước vì không cần khóa mới) hoặc Claude API.
2. **Cho phép deploy Studio mới:** `cd studio && npx sanity deploy`. Sau đó developer ghi dữ liệu nền: `node tools/cms-i18n.mjs backfill --apply`.
3. **Cho phép tạo token Sanity Editor** cho máy chủ dịch (Sanity → API → Tokens), lưu làm secret của Worker. Không đưa vào repo.
4. **Deploy Worker `bioa-cms-i18n`:**
   - secrets: `SANITY_WRITE_TOKEN`, `SANITY_WEBHOOK_SECRET`, `PREVIEW_DEPLOY_HOOK_URL` (+ `ANTHROPIC_API_KEY` nếu chọn Claude);
   - var `I18N_PROVIDER`;
   - nếu chọn Workers AI: binding `[ai]`.
5. **Đổi URL webhook** "BIO-A Preview rebuild" sang Worker (kèm secret ký). Giữ nguyên bộ lọc và `includeDrafts: false`.
6. **Bật `I18N_AUTO_ACTIVE = true`** trong `studio/lib/i18nConfig.ts`, deploy Studio.
7. **Chạy E2E thật** (mục 9 của yêu cầu R28): sửa tiêu đề / mô tả SEO / một mục Blog bằng VI → kiểm tra EN tự cập nhật trên Preview; khóa EN; dịch lỗi; Đồng bộ lại. Khôi phục dữ liệu kiểm thử.

**Hoàn tác:**
- Trỏ webhook về deploy hook cũ: website quay về cách hoạt động trước R28. Trường `i18n` không ảnh hưởng build.
- Studio cũ: `git revert ef5f7b6` + deploy.

## 7. Hướng dẫn Owner sau khi kích hoạt

1. Mở tài liệu trong Studio, **chỉ sửa tiếng Việt**, bấm **Publish**.
2. Khung **"Bản tiếng Anh"** ở đầu tài liệu cho biết trạng thái:
   - *Đang dịch* → khoảng 1–3 phút sau là *Đã đồng bộ*;
   - Preview cập nhật cả VI và EN.
3. **Muốn tự viết EN cho một đoạn:** mở phần "Bản tiếng Anh (tự động dịch)" đang thu gọn và sửa. Hệ thống sẽ không ghi đè đoạn đó.
4. **Muốn giữ nguyên toàn bộ EN:** bấm **Khóa bản EN**.
5. **Khi báo *Dịch thất bại*:** website vẫn chạy với EN cũ. Bấm **Đồng bộ lại EN** → Publish.
6. **Không cần** chạy lệnh, sửa JSON hay nhập EN song song.
