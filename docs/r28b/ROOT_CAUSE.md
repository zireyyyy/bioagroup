# R28b — Nguyên nhân gốc hai lỗi giao diện

Ảnh trước/sau nằm trong ZIP, thư mục `evidence/r28b/shots/`:
- `before` = bản R28 `4205597`;
- `after` = bản R28b;
- `approved` = bản Owner đã duyệt `9d044a7`.

## 1. Icon thẻ "Dịch Vụ Bio-A Group" trên Mobile (`/dich-vu-khac/`, `/en/dich-vu-khac/`)

| Mục | Nội dung |
|---|---|
| Component | `.block-how-works.mobile`: Swiper 5 thẻ dịch vụ. Mỗi thẻ có `.step__icons` (ô logo `.step__icon` + ô số `.step__number`), tiêu đề, mô tả, ảnh |
| Nơi điều khiển CSS | `bioa-home-refine.mjs` → `patchWhyChooseIconCss` (CSS dùng chung, nhúng vào `style#bioa-shared-shell`) |
| Nguồn Merywood (`main.css`, ≤768px) | `.step__icon` 37×37, `.step__icon .icon` 20×20, `.step__number` 37×37, khoảng cách 7px, `.step__info` `min-height:421px` |
| Hiện trạng R28 (đo trên Preview, 375px) | Ô logo **42×42**, ô số bên cạnh **37×37**. Logo 22×27 gần lấp đầy ô. Thẻ cao 786px, phần chữ chỉ cần 283px trong khung 421px → **khoảng trắng ≈140px** dưới mô tả. Cả 5 thẻ đều bị |
| Nguyên nhân | **Icon:** commit `bb5d29c` (16/10) áp khung 42px và logo 22×27 của Trang chủ (Why Choose) cho ô logo thẻ dịch vụ trên Mobile, lệch khỏi nguồn 37px. R28 chỉ sửa danh sách quy trình 6 bước (`.block-right-choice`), không sửa khối thẻ này. Bài test R28 chỉ so các thẻ với nhau, không so ô logo với ô số, nên không phát hiện.<br>**Khoảng trắng:** `min-height:421px` của Merywood được tính cho đoạn mô tả dài của Merywood; mô tả BIO-A chỉ 3–5 dòng |
| Cách sửa (chỉ Mobile ≤768, chỉ thẻ có logo BIO-A) | Ô logo về **37×37** (bằng ô số, đúng nguồn). Logo trong khung **20×20**, giữ tỷ lệ, không kéo giãn. `.step__info` bỏ `min-height`. Thẻ dùng hàng `1fr auto` để cả 5 slide cao bằng nhau theo nội dung dài nhất; ảnh giữ tỷ lệ nguồn 295/315 |
| Kết quả (375px) | Ô logo 37×37 = ô số; logo 20×20 (hình thực 16×20); thẻ cao 643px; không còn khoảng trắng; 5 slide bằng nhau |
| Không đổi | Tablet 769–1200 và Desktop (đo bằng nhau với R28 ở 834 / 1024 / 1152 / 1440 / 1920). `.block-how-works` của Trang chủ (không có logo BIO-A). Asset `bioa-monogram-cream.svg` không đổi, không vẽ icon mới |

## 2. Popup tư vấn "Khánh Như Bio-A"

| Mục | Nội dung |
|---|---|
| Bản Owner đã duyệt | CHAT-C4 / CHAT-C7: "PASS / LOCKED" (`FULL_HANDOFF.md`). Lần cuối trước khi đổi là `9d044a7`, cũng là `main` / Production hiện tại. Đã build lại bản này để đo và chụp ảnh |
| Commit gây thay đổi | `d93a0f0` (R27). Ô nhập một khối (viên thuốc 44px, nút tròn xanh bên phải) bị thay bằng **2 nút "Nhắn Zalo" + "Gọi 0779 399 379"**. Zalo đã có trong hàng biểu tượng nên bị **trùng**. Lời chào cũng dài thêm 2 dòng |
| Phần còn lại | Header, hàng biểu tượng mạng xã hội, vùng tin nhắn và kích thước khung **giống hệt** bản đã duyệt. Đo ở 375 / 834 / 1440, sai khác 0px (`tests/r28b-owner-fix.mjs --chat-ref`). Kể từ CHAT-C7 không có commit nào khác đổi bố cục popup; `d78f66a` chỉ thống nhất hình Zalo |
| Cách sửa | Khôi phục ô một khối đã duyệt (CSS CHAT-C4B giữ nguyên). Ô này là **một liên kết gọi hotline** (`tel:+84779399379`), không phải ô nhập tin nhắn: không gửi tin, không AI. Zalo còn một lần, ở hàng biểu tượng. Lời chào sửa 3 từ: "nhắn Zalo **ở trên** hoặc gọi hotline bên dưới". Thêm phím **Esc** để đóng popup (trả focus về nút ảnh đại diện) |
| Không đổi | Tên, ảnh đại diện, hotline, URL Zalo / WhatsApp / Facebook / Telegram, hiệu ứng mở/đóng, bong bóng gợi ý, AI vẫn OFF |
| Cần Owner xác nhận | Header, hàng biểu tượng và khoảng trắng vùng tin nhắn **đúng như bản đã duyệt**, nên tôi **không tự thu nhỏ** để không thay đổi thiết kế lớn khi chưa được phép. Ảnh so sánh: `popup-375/390/1440-{approved,before,after}.png`. Nếu Owner muốn gọn hơn bản đã duyệt, cần chỉ rõ (ví dụ: header thấp hơn, icon nhỏ hơn) để làm một bản sửa riêng |
