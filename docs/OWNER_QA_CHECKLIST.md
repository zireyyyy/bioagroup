# BIO-A — CHECKLIST KIỂM TRA CỦA OWNER (FINAL COMPLETION, 2026-11-10)

**Bản cần kiểm:** nhánh local `recovery/baseline-d59f50d-20261108` tại `D:\BIOA_WORKSPACE\bioagroup-recovery` (HEAD xem `FULL_HANDOFF.md`). Chưa push, chưa có Preview trên mạng (lý do: mục D bên dưới).

## Mở website trên máy (PowerShell)
```
cd D:\BIOA_WORKSPACE\bioagroup-recovery
. D:\BIOA_WORKSPACE\bioa-env.ps1
npm run build
npm run serve
```
Mở `http://127.0.0.1:4173/` bằng Chrome và để cửa sổ PowerShell mở trong suốt lúc xem.

Đổi kích thước: F12 → Ctrl+Shift+M.
- Viewport chính: **390** (Mobile), **834** và **1024** (Tablet), **1440** (Desktop).
- Kiểm thêm nếu có thời gian: 375, 768/769, 1200/1201, 1920 và zoom 125%.

**Không nhập thông tin thật và không bấm Gửi trong form.**

Ảnh chụp tham chiếu của bản cuối: `D:\BIOA_WORKSPACE\_reports\completion\smoke-s1..4\shots\`. Tên file gồm route và độ rộng, ví dụ `_-1440.png` là Trang chủ ở 1440.

Mỗi dòng ghi **PASS**, **FAIL** hoặc để trống. Khi FAIL, gửi ảnh/video, route, VI/EN, viewport và một câu mô tả (dùng mẫu ở cuối file).

## A00. Bàn giao cuối 2026-11-11 (R24CL) — kiểm tra trước tiên
| # | Mục | Trang | Màn hình | Kỳ vọng | Kết quả |
|---|---|---|---|---|---|
| D-1 | Email pill Header `contact@bioagroup.vn` | mọi trang VI/EN, cuộn qua ảnh hero và các khối màu | 1440, 1024, 834 | Không còn khung vuông mờ quanh viên thuốc; viên thuốc vẫn cùng kích thước, màu, vị trí và có nền kính mờ bo tròn | ☐ |
| D-2 | Chính Sách Bảo Mật / Cookie | `/privacy-policy/`, `/cookie-policy/`, `/en/...` | 1440, 390 | Không còn "OÜ", "16386898", Tallinn, Estonia; trang VI bằng tiếng Việt; thông tin Bio-A Group (MST 0318126597, địa chỉ, email, hotline). **Cần bạn/luật sư duyệt câu chữ trước Production** | ☐ |
| D-3 | Popup «Nhận tư vấn» | `/`, `/en/`, `/contacts/` | 1440, 834, 390 | Mở/đóng, nhập, tick đồng ý như cũ; bố cục popup không đổi (đã bỏ JS CF7 từ merywood.com, giữ CSS). Không gửi form thật | ☐ |
| D-4 | Không còn chữ Nga | Xem nguồn trang (Ctrl+U) bất kỳ trang | — | Không còn comment tiếng Nga; form có nhãn trợ năng «Biểu mẫu liên hệ» / «Contact form» | ☐ |

## A0. R24 — sửa lỗi Home OWNER FAIL 2026-11-10 (kiểm tra trước tiên)
| # | Mục | Trang | Màn hình | Kỳ vọng | Kết quả |
|---|---|---|---|---|---|
| R24-1 | Roadmap "Từ Ý Tưởng Đến Thành Phẩm" sau khi đổi kích thước cửa sổ | `/`, `/en/`, `/contract-manufacturing-cosmetics/` | Desktop 1440/1920 | Mở Chrome cửa sổ thường, cuộn tới Roadmap, rồi phóng to/thu nhỏ cửa sổ, Ctrl +/Ctrl −/Ctrl 0, F12 mở/đóng. Sau ~1 giây: nút "Nhận tư vấn" nằm dưới thẻ với khoảng cách bình thường; Footer không chạm thẻ; bấm → ← qua 5 bước, ảnh và chữ luôn cạnh nhau | ☐ |
| R24-2 | Roadmap Tablet/Mobile (không đổi) | `/`, `/en/` | 834, 390 | Như bản đã PASS: Tablet 2 cột ảnh-chữ; Mobile ảnh trên, chữ dưới, nút ← → bên dưới | ☐ |
| R24-3 | **Tablet toàn site (R24g)** — Home, About, Gia Công Mỹ Phẩm, Dịch Vụ Khác, Blog, bài Blog, Liên Hệ | VI/EN | 769, 834, 1024, 1200 | So với merywood.com cùng độ rộng: cùng bố cục desktop-fluid (thẻ, ảnh, khoảng cách). Chữ thân đọc được (≥9px) và đủ câu; tiêu đề thẻ "Vì Sao Chọn" không còn nhỏ hơn chữ; "Quy Trình Hợp Tác" ảnh cao bằng cột chữ, Dịch Vụ Khác thẻ bằng Merywood. Bấm → ← các slider. Bản VI ở 769/834 cao hơn Merywood vì nội dung dài hơn (OD-11b) | ☐ |
| R24-4 | Footer | mọi trang VI/EN | 1440/834/390 | Cột "Bio-A Group": Năng Lực Sản Xuất, Liên Hệ. Cột "Chính Sách": Bảo Mật, Cookie. Không còn Tuyển dụng, Vận chuyển. Bố cục như cũ | ☐ |
| R24-5 | About / Careers | `/about/`, `/careers/` | 1440/390 | Nút ở khối đội ngũ ghi "Liên Hệ Bio-A Group" và mở trang Liên Hệ; gõ `/careers/` thì chuyển sang Liên Hệ | ☐ |

## A. Thay đổi mới trong đợt này (cần owner duyệt)
| # | Khu vực | Route | Viewport | Kỳ vọng | Kết quả |
|---|---|---|---|---|---|
| N1 | Slider Đánh giá + Sản phẩm (thư viện nay tự host, không phụ thuộc merywood.com) | `/`, Cosmetics, Dịch Vụ Khác, VI/EN | 390/834/1440 | Bấm mũi tên trượt được; Đánh giá có 6 gạch; giao diện y như cũ | ☐ |
| N2 | Nút "+N mục khác" trong "Kết cấu sản phẩm" | `/`, Cosmetics, **VI** | 390/834/1440 | VI hiện "+11 mục khác"; bấm thì danh sách mở ra và nút đổi thành "Thu gọn"; bấm lại thì thu gọn; trang không nhảy sang trang khác. EN vẫn là "+11 more / Show fewer" | ☐ |
| N3 | Thẻ bao bì (Vỉ định hình, Hũ, Túi doypack…) | `/` VI, Cosmetics VI | 390/834/1440 + bấm "Xem thêm" | Không còn câu tiếng Anh (ví dụ "Travel-size products", "Easy to distribute and ship.") | ☐ |
| N4 | Popup "Nhận tư vấn" | mọi trang VI | 375/390/769 | Ô chọn ghi "Sản phẩm / dịch vụ (tùy chọn)" và không bị cắt chữ (không gửi form) | ☐ |
| N5 | Nút chia sẻ ở bài Blog | 1 bài Blog VI + EN | 390/1440 | Facebook / e-mail chia sẻ đúng link của chính bài đó trên bioagroup.vn, không còn bài Merywood | ☐ |
| N6 | E-mail trên Chính sách | `/privacy-policy/`, `/cookie-policy/` (Careers đã ẩn, R24-5) | 1440 | E-mail hiển thị là contact@bioagroup.vn, không còn @merywood. Phần nội dung pháp lý khác **vẫn chưa đúng** (mục C) | ☐ |
| N7 | Chat | mọi trang VI/EN | 390/834/1440 | Mở, gõ, gửi và đóng như trước. Câu trả lời vẫn là câu mẫu (chưa có AI thật) | ☐ |

## A'. Hạng mục từ đợt recovery vẫn chờ owner
| # | Khu vực | Viewport | Kỳ vọng | Kết quả |
|---|---|---|---|---|
| A0 | Header (lỗi OI-1) trên `/`, `/en/` | 1440/390 | Logo, menu ngang (Desktop) hoặc nút menu (Mobile), không có dấu chấm đầu dòng, không lặp, avatar hiện đủ | ☐ |
| A3 | Icon 04 "Vì Sao Chọn" `/` | 390/1440 | Cùng cỡ với icon ở Dịch Vụ Khác | ☐ |
| A4 | **Chọn:** màu icon 01/02 Tablet `/` | 834/1024 | Kem (như Production) hay trắng (như PR #10). Hiện giữ nguyên bản đang có | ☐ |
| A5/T6 | → thay bằng R24-3 (HOWWORKS-T1) | — | — | — |
| A6/A7 | Chữ mô tả "Kết cấu" 12px; popup đọc được | 834/1024 | Đọc dễ | ☐ |
| A8 | Link Footer (link cũ) | 1440/390 | Liên Hệ, Dịch Vụ, Gia Công mở đúng trang; Footer trông như cũ (Tuyển Dụng/Vận chuyển đã bỏ, R24-4) | ☐ |
| A9 | Tiêu đề Blog (h1) | 390/834/1440 | Trông như cũ | ☐ |

## B. Hồi quy vùng OWNER PASS (kỳ vọng KHÔNG ĐỔI)
B1 Header, menu Mobile, VI/EN · B2 Footer v2 · B3 Cookie (Từ chối / Đồng ý / Tùy chỉnh, thử trong cửa sổ ẩn danh) · B4 Chat, Zalo, WhatsApp · B5 Hero, số liệu, Home Mobile "Danh mục gia công" · B6 About, Cosmetics, Dịch Vụ Khác · B7 Blog listing, phân trang, Blog detail + TOC · B8 Liên hệ + FAQ · B9 404 (`/khong-co-trang-nay/`, `/en/khong-co/`) · B10 biên 768/769 và 1200/1201. Mỗi mục ☐.

## C. Quyết định owner (chặn phát hành) — chi tiết `docs/LEGAL_CONTENT_BLOCKERS.md`, `docs/BUSINESS_IDENTITY.md`
- **L1/L2** Chính sách Bảo mật / Cookie: vẫn là văn bản Estonia của Merywood ("Bio-A Group OÜ, Reg no. 16386898…"). Cần pháp nhân BIO-A và văn bản đã duyệt.
- **L3** Careers: vẫn ghi "European manufacturer of dietary supplements". Chọn: nội dung thật / ẩn trang (đề xuất) / xóa.
- **L4** Link "Chính Sách Vận Chuyển": tạo trang / đổi link / bỏ link (đề xuất bỏ).
- **L5** Tài nguyên Merywood còn tải trực tiếp (modal.js, input.js, CF7, ảnh): xác nhận quyền dùng hay thay bằng tài nguyên BIO-A.
- **BI-4** Biểu tượng app BIO-A PNG 180×180 và ảnh chia sẻ mặc định (hiện để trống, không dùng logo Merywood).
- **AI Chat:** nhà cung cấp, credentials, chính sách lưu hội thoại (`docs/CHAT_AI_INTEGRATION.md`).

## D. GitHub / Cloudflare (owner action để mở Preview)
Build trên Cloudflare cần bộ nguồn Merywood riêng (`BIOA_SOURCE_DIR`), nhưng hiện chưa có nơi lưu, chưa có token và chưa có quyết định quyền dùng (D1/D2/D6/D7). Vì vậy nếu push lúc này, Preview sẽ build lỗi (fail-closed) và đó là chủ đích. Quyết định xong các mục này thì mới push nhánh candidate và tạo Draft PR.

## Mẫu báo lỗi
```
Route: /dich-vu-khac/      Ngôn ngữ: VI      Viewport: 834 (zoom 100%)
Cách mở: npm run serve
Thấy gì: ...
Mong muốn: ...
Kèm: ảnh / video
```
