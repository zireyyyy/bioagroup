# R28 — Sanity → CMS Preview: nguyên nhân gốc

**Owner báo:** đã sửa H1 Trang chủ thành "Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group 123" nhưng Preview vẫn hiện H1 cũ.

**Kết luận:** hệ thống đồng bộ **không có lỗi**.
- Preview hiển thị đúng nội dung **đã Publish** tại thời điểm Owner xem.
- Ngày 17/11, giá trị "123" chỉ ở trạng thái Publish trong **73 giây**. Sau đó một lần Publish khác (cùng tài khoản Owner) đã đưa H1 về bản gốc, và Preview cập nhật theo.
- Ngày 19/11 lúc 06:43 UTC, "123" được Publish lại. Preview hiện đang hiển thị "…Bio-A Group 123" (đã kiểm tra).

R28 **không** sửa, hủy hay ghi đè giá trị "123" của Owner.

Điều cần cải thiện là **khả năng nhận biết**: trước R28 không có cách nhanh để biết Preview đang chứa bản Publish nào. R28 bổ sung dấu nhận biết và công cụ kiểm tra (mục 4).

## 1. Đường đi của nội dung

```
Studio (Draft) ──Publish──> Sanity dataset "production" (published)
     │                                │  webhook "BIO-A Preview rebuild" (chỉ bản published, includeDrafts = false)
     │                                ▼
     │                     Cloudflare deploy hook nhánh cms-preview ──> build (tools/fetch-cms.mjs đọc bản published)
     │                                                                       ▼
     └── Draft chưa Publish: KHÔNG bao giờ lên Preview          https://cms-preview.bioagroup.pages.dev/
```

Production (`bioagroup.vn`) **không** đọc Sanity (không có release pin). R28 không thay đổi nguyên tắc này.

## 2. Bằng chứng (chỉ đọc, không ghi)

| Thời điểm (UTC) | Revision `page-home` | Sự kiện | Kết quả |
|---|---|---|---|
| 16/11 06:31–06:36 | `xhJZ…`, `alt5…`, `ycvO…` | Kiểm thử webhook R27 của developer ("– CMS TEST" rồi khôi phục) | Preview cập nhật, sau đó khôi phục |
| **17/11 10:19:32** | `J2VA8zgFjfP00BfnWhEUk2` | Publish: H1 VI (`t_f10d1d2f`) = "…Bio-A Group **123**" | build `a531ff7d` |
| **17/11 10:20:45** | `J2VA8zgFjfP00BfnWhEXLo` | Publish lần 2, sau 73 giây, cùng tài khoản: **chỉ** trường `t_f10d1d2f` được đổi **về bản gốc** | build `699f7edf`: Preview hiện H1 gốc, **đúng với dữ liệu đã Publish** |
| 19/11 04:38 | `IsTO…`, `WIhn…aoqQ` | Đồng bộ R27b của developer (thêm/bớt slot, không đụng H1) | H1 vẫn là bản gốc |
| **19/11 06:43:08** | `WIhnXGDtfVOQnknZsffvKY` | Publish: H1 VI = "…Bio-A Group **123**" | webhook 06:43:09 **HTTP 200**; build `a8993081` (06:43:11). Preview hiện "…123" |

**Chi tiết kiểm tra:**
- Developer không làm việc với Sanity ngày 17/11. R27: 16/11; R27b: 19/11 04:36–04:40, có backup kèm thời điểm.
- Lịch sử giao dịch không phân biệt được ai bấm, vì developer dùng phiên đăng nhập của Owner. Chỉ ghi nhận "cùng tài khoản".
- Draft: **không có** `drafts.page-home`; toàn dataset 0 draft lúc kiểm tra.
- Webhook `BIO-A Preview rebuild`:
  - đang bật;
  - `includeDrafts: false`;
  - bộ lọc khớp `page_*`, `blogPost`, `seoPage`, `imageSlot`, `career`, `legalPage`;
  - không in URL đích.
- Các lần webhook "FAILURE other" mã **304** lúc 19/11 04:39 thuộc loạt sự kiện của đồng bộ R27b. Đây là **Cloudflare gộp build** (đã có build chờ cho nhánh). Lần gọi kế tiếp trả 200, nên không mất cập nhật nào.
- Bộ nhớ đệm: HTML Preview gửi `Cache-Control: public, max-age=0, must-revalidate`, nên CDN/trình duyệt không giữ bản cũ.

Bằng chứng gốc trong ZIP (`evidence/r28/`):
- `sanity-page-home-inspect.txt`: lịch sử revision, giá trị H1 từng revision, diff giữa các revision.
- `sanity-webhook-attempts.txt`: 40 lần gọi webhook gần nhất.

## 3. Vì sao Owner thấy "H1 cũ"

Ngày 17/11 sau 10:20:45, bản **đã Publish** chính là H1 gốc, và Preview hiển thị đúng bản đó. Các khả năng dẫn tới lần Publish thứ hai:
- bấm Undo/Restore trong Studio rồi Publish;
- sửa lại ô H1 rồi Publish;
- một tab Studio khác còn giữ giá trị cũ rồi Publish.

Từ dữ liệu không xác định được cụ thể khả năng nào, nhưng **đó là một lần Publish thật**, không phải lỗi đồng bộ.

Ngoài ra, sau mỗi lần Publish, Preview cần khoảng 1–2 phút để build xong. Mở Preview ngay trong khoảng đó sẽ thấy bản trước.

## 4. Thay đổi R28: phát hiện Preview cũ

| Thành phần | Nội dung |
|---|---|
| `build.mjs` → `/_bioa-cms.json` | Mỗi bản build ghi dấu nội dung:<br>• Preview: `mode: "live"`, `snapshotSha`, `fetchedAt` (thời điểm đọc Sanity), `commit`.<br>• Không có Sanity (Production, build nội bộ): `{"mode":"off"}` cố định, giữ tính tất định của build. |
| `tools/cms-preview-status.mjs` | So sánh thay đổi **đã Publish** mới nhất (đúng các loại tài liệu webhook theo dõi) với dấu của Preview:<br>• **UP TO DATE**;<br>• **REBUILDING** (Publish < 10 phút);<br>• **STALE** (kèm hướng dẫn kiểm tra webhook / deployment).<br>Liệt kê **Draft chưa Publish** (Preview không bao giờ hiển thị Draft). Chỉ đọc; không in nội dung hay token. |
| `docs/r28/OWNER_UAT.md` | Hướng dẫn Owner: Publish → chờ 1–2 phút → tải lại; nếu nghi ngờ, mở `/_bioa-cms.json` xem `fetchedAt` |

Kiểm thử Publish → Preview đầu cuối: xem `CMS_PUBLISH_E2E.md`.
