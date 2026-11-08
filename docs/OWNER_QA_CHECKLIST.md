# BIO-A — CHECKLIST KIỂM TRA CỦA OWNER (bản recovery từ `d59f50d`)

**Bản cần kiểm:** nhánh local `recovery/baseline-d59f50d-20261108` tại `D:\BIOA_WORKSPACE\bioagroup-recovery` (HEAD ghi trong `FULL_HANDOFF.md`). Chưa có Preview trên mạng, chưa push.

## Mở website trên máy (PowerShell)
```
cd D:\BIOA_WORKSPACE\bioagroup-recovery
. D:\BIOA_WORKSPACE\bioa-env.ps1
npm run build
npm run serve
```
Mở `http://127.0.0.1:4173/` bằng Chrome. Cửa sổ PowerShell phải để mở trong lúc xem (đóng = tắt server). Server mới không còn bị sập khi gặp file chỉ có trên Cloudflare (`/cdn-cgi/...`), nên không thể tái diễn lỗi menu dạng bullet do server chết.

Đổi kích thước bằng DevTools (F12 → Ctrl+Shift+M): **390** (Mobile), **834** và **1024** (Tablet), **1440** (Desktop). Kiểm thêm có chọn lọc: 375, 768/769, 1200/1201, 1920, zoom 125% (Ctrl + `+` ở cửa sổ 1440).

**Không nhập thông tin thật và không bấm Gửi trong form.** Server local không có backend.

## Ghi kết quả
Mỗi dòng đánh **PASS** / **FAIL** / để trống. Khi FAIL gửi: ảnh/video, route, VI/EN, viewport, một câu mô tả (mẫu cuối file).

## A. Thay đổi cần owner duyệt
| # | Khu vực | Route | Viewport | Kỳ vọng | Kết quả |
|---|---|---|---|---|---|
| A0 | **Header (lỗi OI-1)** | `/`, `/en/` và vài route khác | 1440, 390 | Header đúng như bản đã duyệt: logo, 5 mục menu ngang (Desktop), nút menu (Mobile), không có bullet, không lặp menu, avatar chat và logo hiện đủ | ☐ |
| A1 | Slider Đánh giá | `/`, Cosmetics, Dịch Vụ Khác (VI/EN) | 390/834/1440 | Bấm mũi tên trượt được; 6 gạch phân trang; có thẻ hai bên | ☐ |
| A2 | Slider Sản phẩm | `/`, Cosmetics | 834/1440 | Trượt được | ☐ |
| A3 | Icon 04 "Vì Sao Chọn" | `/` VI/EN | 390, 1440 | Monogram cùng cỡ với Dịch Vụ Khác | ☐ |
| A4 | Màu icon 01/02 Tablet | `/` | 834/1024 | **Chọn:** kem (như Production) hay trắng (như PR #10) | ☐ |
| A5 | "Quy Trình Hợp Tác" | `/` VI | 834/1024 | Đọc đủ chữ; khối cao hơn PR #10 | ☐ |
| A6 | Formats mô tả | `/`, Cosmetics | 834/1024 | Chữ 12px đọc được | ☐ |
| A7 | Popup "Nhận tư vấn" | mọi trang | 834/1024 | Dòng đồng ý, +84, dropdown đọc được (không gửi) | ☐ |
| A8 | Link Footer (D11) | Footer mọi trang | 1440/390 | "Liên Hệ" → Liên hệ; 5 mục Dịch Vụ → Dịch Vụ Khác; 6 mục Gia Công + "Năng Lực Sản Xuất" → Gia Công Mỹ Phẩm; 2 mục Tuyển Dụng → Careers. Footer trông y như cũ | ☐ |
| A9 | Tiêu đề Blog (D12) | `/blog/`, `/blog/page/2/`, `/en/blog/` | 390/834/1440 | Trông y như cũ (chỉ đổi thẻ HTML sang h1) | ☐ |

## B. Hồi quy vùng OWNER PASS (kỳ vọng KHÔNG ĐỔI)
| # | Khu vực | Route | Viewport | Kết quả |
|---|---|---|---|---|
| B1 | Header, menu Mobile mở/đóng, nút VI/EN đúng trang | các route chính | 390/834/1440 | ☐ |
| B2 | Footer v2 (gồm EN xuống dòng Desktop) | mọi route | 390/834/1440 | ☐ |
| B3 | Cookie: Từ chối / Đồng ý / Tùy chỉnh | lần đầu vào (cửa sổ ẩn danh) | mọi viewport | ☐ |
| B4 | Chat, Zalo, WhatsApp hiện đúng (không cần bấm link ngoài) | mọi route | 390/1440 | ☐ |
| B5 | Hero + số liệu; Home Mobile "Danh mục gia công" | `/` | 390/1440 | ☐ |
| B6 | About, Cosmetics, Dịch Vụ Khác | VI/EN | 390/834/1440 | ☐ |
| B7 | Blog listing, phân trang, Blog detail + TOC | `/blog/`, `/blog/page/2/`, 1 bài | 390/834/1440 | ☐ |
| B8 | Liên hệ + FAQ mở/đóng | `/contacts/` | 390/834/1440 | ☐ |
| B9 | 404 Bio-A | `/khong-co-trang-nay/`, `/en/khong-co/` | 390/1440 | ☐ |
| B10 | Biên breakpoint | `/` | 768/769, 1200/1201 | ☐ |

## C. Nội dung cần owner cung cấp hoặc quyết định (chặn release)
- **LEGAL-1:** Chính sách Bảo mật và Cookie đang ghi "Bio-A Group OÜ, Reg no. 16386898, Narva mnt 7-557…" (thông tin công ty Estonia của Merywood). Cần thông tin pháp nhân BIO-A thật.
- **CAREERS-1:** `/careers/` hiển thị "We are a European manufacturer of dietary supplements…" và 2 vị trí của Merywood. Cần nội dung tuyển dụng BIO-A, hoặc ẩn trang.
- **D11 còn lại:** "Chính Sách Vận Chuyển" ở Footer chưa có trang; 2 thẻ việc làm ở Careers. Chọn: tạo trang, đổi link hay bỏ mục.

## Mẫu báo lỗi
```
Route: /dich-vu-khac/      Ngôn ngữ: VI      Viewport: 834 (zoom 100%)
Cách mở: npm run serve  (hoặc link Preview)
Thấy gì: ...
Mong muốn: ...
Kèm: ảnh / video
```
