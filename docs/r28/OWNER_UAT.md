# R28 — Hướng dẫn nghiệm thu cho Owner (khoảng 15–20 phút)

**Nơi kiểm tra:** CMS Preview https://cms-preview.bioagroup.pages.dev/

Production (`bioagroup.vn`) vẫn ở chế độ bảo trì, không có thay đổi R28.

**Không** cần gửi mật khẩu, token hay đường dẫn truy cập riêng. Khi báo lỗi, chỉ cần gửi ảnh chụp màn hình + tên thiết bị/trình duyệt.

## A. Icon BIO-A trên Mobile (iPhone thật) — 3 phút

1. Trên iPhone, mở `https://cms-preview.bioagroup.pages.dev/dich-vu-khac/`.
2. Cuộn tới danh sách quy trình có 6 icon tròn (bước 01–06).
3. **PASS** khi:
   - ô logo BIO-A (bước 03) **cùng kích thước** với 5 icon còn lại;
   - logo nằm gọn trong ô, không méo.
4. Làm lại với `/en/dich-vu-khac/`.
5. Lướt 2 thẻ dịch vụ phía trên (01, 02): icon của 2 thẻ bằng nhau.

**FAIL:** chụp màn hình, ghi model iPhone và phiên bản iOS.

## B. Bong bóng gợi ý chat trên Mobile — 2 phút

1. Trên iPhone, mở bất kỳ trang nào và chờ bong bóng gợi ý xuất hiện cạnh nút tư vấn (khoảng 4 giây).
2. **PASS** khi:
   - bong bóng **tự ẩn** sau khoảng 8 giây, hoặc ngay khi bạn cuộn tiếp khoảng 1/3 màn hình;
   - nút tư vấn tròn vẫn còn và bấm vẫn mở được bảng liên hệ.
3. Trên máy tính, bong bóng giữ nguyên như trước (không thay đổi).

## C. 29 bài Blog đã viết lại — đọc duyệt theo nhịp của bạn

- Danh sách bài, nhóm (A / B / C) và các điểm cần bạn quyết định: `BLOG_29_REWRITE_REPORT.md`.
- Mở từng bài:
  - `https://cms-preview.bioagroup.pages.dev/blog/<slug>/`
  - `https://cms-preview.bioagroup.pages.dev/en/blog/<slug>/`

**PASS cho một bài:** nội dung đúng chủ đề, chính xác, phù hợp BIO-A; không có thông tin sai về doanh nghiệp.

**Khi đồng ý cho một bài hiển thị:**
1. Studio → Blog → mở bài.
2. Bật **"Đã viết lại — hiển thị lại trên danh sách Blog"**.
3. Bấm **Publish**.
4. Chờ 1–2 phút. Bài sẽ hiện trên `/blog/` của Preview.

**Lưu ý:**
- Bài **nhóm B** (sức khỏe/da liễu/DIY): nên nhờ người có chuyên môn đọc lại trước khi bật.
- Bài **nhóm C** (nước hoa ô tô): chỉ giữ nếu BIO-A thật sự làm mặt hàng này.
- Đổi slug: đừng sửa trong Studio; báo developer để làm kèm redirect 301.

## D. Kiểm tra Publish → Preview (sau khi sửa trong Studio) — 3 phút

1. Sửa một nội dung trong Studio → bấm **Publish**. Lưu bản nháp (Draft) **không** hiện trên Preview.
2. Chờ 1–2 phút, rồi tải lại trang Preview (kéo xuống để làm mới trên điện thoại).
3. Nếu vẫn thấy bản cũ:
   - mở `https://cms-preview.bioagroup.pages.dev/_bioa-cms.json`;
   - `fetchedAt` là thời điểm Preview đọc dữ liệu Sanity lần cuối (giờ UTC = giờ Việt Nam − 7);
   - nếu `fetchedAt` **trước** lúc bạn Publish quá 10 phút: báo developer.
4. Developer kiểm tra bằng `node tools/cms-preview-status.mjs`. Công cụ báo UP TO DATE / REBUILDING / STALE và liệt kê Draft chưa Publish.

**Ghi chú về H1 "…Bio-A Group 123":**
- Nội dung này **đang hiển thị** trên Preview vì đã được Publish lúc 13:43 ngày 19/11 (giờ VN).
- Developer không sửa giá trị này.
- Khi muốn bỏ "123": sửa trong Studio → Publish.

## D2. CMS VI-first (tiếng Việt là nguồn, EN tự dịch)

**Hiện chưa thể nghiệm thu chức năng tự dịch:** dịch vụ dịch chưa được bạn chọn/duyệt chi phí, và Studio/Worker mới chưa được deploy.

Bạn cần quyết định 3 việc (chi tiết, chi phí và các bước: `VI_FIRST_CMS.md` §4 và §6):
1. **Dịch vụ dịch:** Workers AI hoặc Claude API.
2. **Cho phép deploy Studio mới** (khung trạng thái "Bản tiếng Anh", nút Đồng bộ lại EN / Khóa EN / Xem EN).
3. **Cho phép tạo token Sanity quyền ghi** cho máy chủ dịch, và trỏ webhook sang máy chủ dịch.

Sau khi kích hoạt, nghiệm thu như sau:
1. Sửa **chỉ tiếng Việt** một tiêu đề trang, một mô tả SEO và một mục Blog → Publish.
2. Sau khoảng 1–3 phút, trang EN tương ứng trên Preview đổi theo.
3. Bấm **Khóa bản EN**, sửa VI → Publish → EN **không** đổi.

## E. Trang khác (hồi quy nhanh) — 3 phút

Trên điện thoại và máy tính, mở: Trang chủ, Gia Công Mỹ Phẩm, Dịch Vụ Khác, Blog, Liên Hệ (VI/EN).

**PASS** khi không có gì khác so với R27b, ngoài:
- icon / bong bóng ở mục A–B;
- tiêu đề "SPF", "UV", "UVA", "TP.HCM" nay viết hoa đúng trong 2 bài đã duyệt:
  - `10-tieu-chi-…-kem-chong-nang`;
  - `dia-chi-…-tai-tphcm`.

## Trạng thái

| Hạng mục | Trạng thái |
|---|---|
| Code / build / kiểm thử tự động | Xem `R28_RESULT.md` |
| **OWNER PASS** | **Chờ Owner** |
| **PUBLIC LAUNCH** | **Chưa sẵn sàng**: còn các mục pháp lý/nội dung chờ Owner (R26–R27) và 29 bài chưa được duyệt |
