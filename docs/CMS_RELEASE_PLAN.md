# BIO-A — Phương án phát hành nội dung CMS lên Production (CMS-R25b) — CHỜ OWNER DUYỆT

**Trạng thái:** đã cài đặt trong code trên nhánh `cms/sanity-r25` và đã kiểm thử cục bộ (mô phỏng Production). **Chưa bật cho Production.**
- Không đổi cấu hình Production (biến môi trường, bindings, lệnh build, deploy hook).
- Không đẩy lên `main`. Chế độ bảo trì giữ nguyên.

## 1. Vấn đề cần giải

Nếu Production build đọc thẳng Sanity, thì bất kỳ lần build Production nào cũng kéo theo nội dung **mới nhất đã xuất bản** trong Sanity. Các nguồn build gồm: push code lên `main`, Retry, Rebuild trong dashboard, deploy hook. Nội dung đó có thể chỉ mới được duyệt trên Preview, chưa được OWNER duyệt phát hành.

## 2. Giải pháp: gói nội dung đã ghim theo commit (pinned content release)

| | Preview (nhánh khác `main`) | Production (`main`) |
|---|---|---|
| Nguồn nội dung | Sanity, nội dung **đã xuất bản** (live) | **Chỉ** gói nội dung đã ghim trong commit: `cms/release/current.json` → `cms/release/<id>.json.gz` (sha256) |
| Mạng khi build | Có (đọc Sanity) | **Không** truy cập Sanity |
| Khi nào nội dung đổi | Mỗi lần bấm Publish (webhook → build Preview) | Chỉ khi có **commit phát hành** do OWNER duyệt |
| Chưa có gói ghim | — | Website dùng nội dung trong repo, giống từng byte bản R24RC2 |

Bước `tools/fetch-cms.mjs` chạy trước mỗi lần build:

- Cloudflare đặt `CF_PAGES_BRANCH` theo nhánh build. Nếu nhánh là `main`, chế độ live **bị cấm** (kể cả khi Production có biến `SANITY_*`), và build chỉ giải nén gói đã ghim sau khi kiểm sha256.
- Gói thiếu hoặc sai sha256 thì build dừng (fail closed); Cloudflare giữ deployment cũ.
- Retry, Rebuild, deploy hook và push đều build lại **cùng commit**, nên cho **cùng nội dung**. Production chỉ đổi nội dung khi có commit mới sửa `cms/release/current.json`.

## 3. Quy trình phát hành (khi OWNER đã duyệt)

1. Biên tập viên bấm **Publish** trong Studio, rồi kiểm tra trên Preview `https://cms-sanity-r25.bioagroup.pages.dev` (sau khi hợp nhất: nhánh Preview cố định).
2. OWNER duyệt nội dung trên Preview và ra lệnh "phát hành".
3. Kỹ thuật chạy (cần token đọc, không ghi):
   ```
   node tools/cms-release.mjs create --approved-by "<tên OWNER>" --note "<nội dung đợt phát hành>"
   ```
   Lệnh tải đúng nội dung đã xuất bản, kiểm tra hợp lệ, cắt ảnh, đóng gói và ghi `cms/release/<id>.json.gz` cùng `cms/release/current.json` (sha256, người duyệt, thời điểm, gói trước đó).
4. Commit hai file đó lên `main` (đây là thao tác push Production, cần OWNER cho phép). Cloudflare build Production từ gói vừa ghim.
5. **Hoàn tác:** chạy `node tools/cms-release.mjs pin cms/release/<id-cũ>.json.gz --approved-by "<tên OWNER>"` rồi commit, hoặc `git revert` commit phát hành. Cả hai đều cho lại đúng nội dung cũ, giống từng byte.

Lưu ý:
- Gói nằm trong repo công khai. Nội dung trong đó chính là nội dung sẽ hiển thị công khai trên website, nên không chứa token hay bản nháp. Văn bản pháp lý chỉ có trong gói khi đã duyệt hợp lệ.
- Mỗi gói khoảng 75–150 KB (chữ) cộng ảnh đã cắt. Có thể chuyển nơi lưu gói sang kho riêng (Workers KV, như private source bundle) nếu repo lớn dần; khi đó cần thêm một secret và đây là thay đổi hạ tầng cần OWNER duyệt.

## 4. Bằng chứng (`D:\BIOA_WORKSPACE\_reports\cms-r25b\qa\release-isolation.txt`)

Mô phỏng build Production: `CF_PAGES_BRANCH=main`, có cả biến `SANITY_*`, bước tải CMS chạy với **chặn mạng** (net-guard).

| Bước | Kết quả |
|---|---|
| Gói A (nội dung thử đã xuất bản) được ghim → build `main` | Giống từng byte bản Preview của nội dung đó |
| Sửa Sanity sau khi phát hành → build lại `main` (tương đương Retry, Rebuild hay push) | **Không đổi**: vẫn là gói A, nội dung Preview không lọt sang Production |
| Gói B (nội dung gốc) → build `main` | Giống từng byte bản R24RC2 PASS |
| Hoàn tác: ghim lại gói A | Giống từng byte gói A |
| Gói A bị sửa 1 byte | Build dừng (sha256 không khớp) |
| Yêu cầu chế độ live trên `main` | Build dừng |
| Kiểm thử offline `tests/cms-r25.test.mjs` | Có các ca chọn chế độ, giải nén theo sha256, phát hiện gói bị sửa, ghim lại |

Các file phát hành thử đã xóa; **không có gói nào được commit**.

## 5. Nguồn kích hoạt build đã kiểm tra (Cloudflare + Sanity, 2026-11-13, chỉ đọc)

- `production_branch = main`; Production build tự động khi push GitHub (bật).
- Deploy hook: **chỉ** `sanity-preview-rebuild` cho nhánh `cms/sanity-r25`. Không có hook cho `main`.
- Webhook Sanity: **chỉ** "BIO-A Preview rebuild", gọi hook Preview, bỏ qua bản nháp.
- Biến Production: **không có** `SANITY_*`; `BIOA_SITE_MODE=maintenance`.
- Kết luận: hiện không có đường nào để nội dung CMS vào Production. Sau khi hợp nhất code, đường duy nhất là commit phát hành.

## 6. Việc OWNER cần quyết định trước khi bật CMS cho Production

1. Duyệt phương án này: gói ghim trong repo, phát hành bằng commit.
2. Khi hợp nhất `cms/sanity-r25` vào `main`: chưa có `cms/release/current.json` thì Production vẫn giống từng byte bản R24RC2.
3. Lần phát hành đầu tiên: OWNER duyệt nội dung trên Preview → `cms-release create` → commit → push `main`.
4. Sau khi hợp nhất, đổi deploy hook Preview sang một nhánh Preview cố định (ví dụ `cms-preview` bám theo `main`). Đây là thay đổi cấu hình Preview, không phải Production.
