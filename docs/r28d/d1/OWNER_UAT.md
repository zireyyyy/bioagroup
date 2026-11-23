# R28d-D1 — BẠN CẦN TEST GÌ

**Loại thay đổi:** CONTENT (chỉ chữ tiếng Anh) trên 3 trang EN.
- Không đổi giao diện, chữ tiếng Việt, Blog, pháp lý, chat hay Production.

## Bước 1 (làm được ngay): xem bản thử của nhánh D1

**Địa chỉ:** https://r28d-d1-en-parity.bioagroup.pages.dev/
- Bản riêng, không lập chỉ mục, đọc dữ liệu Sanity hiện tại.
- **Không phải CMS Preview chính.**

Mở trên **điện thoại**, **máy tính bảng** (hoặc cửa sổ hẹp khoảng 800 px) và **máy tính**.

1. `/en/` (Trang chủ EN): so với `/` (VI) cùng phần.
   - **Mô tả đầu trang** dưới tiêu đề.
     - **PASS nếu:** cùng ý với câu VI, gồm cả "lựa chọn nguyên liệu" và "theo định hướng riêng".
   - **Why choose Bio-A Group:** 4 thẻ. Trên điện thoại, bấm mũi tên xem đủ 4.
     - **PASS nếu:** mỗi thẻ có đủ ý như thẻ VI tương ứng; chữ không bị cắt; các thẻ cao bằng nhau.
   - **We Produce:**
     - máy tính: 2 thẻ "Cosmeceuticals" / "Cosmetics";
     - điện thoại: 2 thẻ "Cosmeceutical manufacturing" / "Packaging & finishing".
     - **PASS nếu:** nội dung EN đúng nội dung VI đang hiện ở cùng vị trí.
   - **How we work:** 5 bước. Bấm mũi tên xem đủ.
     - **PASS nếu:** đủ ý; **không có dòng cuối bị mất** (kiểm kỹ trên điện thoại nhỏ).
   - **Built for:** 3 nhóm × 3 ý.
     - **PASS nếu:** mỗi ý EN đúng nghĩa ý VI **ở cùng vị trí**. Bản VI đang giữ nguyên thứ tự hiện tại, kể cả chỗ đã ghi nhận là có thể đảo nhóm.
   - **Đoạn dòng sản phẩm** và **From idea to finished product** (5 bước):
     - **PASS nếu:** cùng ý VI.
2. `/en/about/`, thẻ **Hair Care Products**:
   - **PASS nếu:** ghi "hair serums", không còn "treatments".
3. `/en/contract-manufacturing-cosmetics/`:
   - thẻ **Hair Care Products**: **PASS nếu** ghi "hair serums";
   - mục **In-Process Control**: **PASS nếu** có ý "to limit deviation from the approved sample".
4. **Toàn trang:**
   - **PASS nếu:** không thấy chữ tràn khung, chữ đè ảnh / nút, hay trang trượt ngang.
   - Header, nút chat, cookie, Footer, icon vẫn như cũ.

**Chỗ cần bạn để ý** (cao hơn bản VI, không bị cắt chữ):
- Why choose trên điện thoại rất nhỏ (320 px): thẻ cao thêm khoảng 1 dòng.
- Cosmetics "In-Process Control" ở 320 px: thêm 1 dòng.

**FAIL:** gửi ảnh chụp, ghi trang, thiết bị, trình duyệt, và câu chữ bị sai / bị cắt.

## Bước 2: trả lời một câu

> "Đồng ý đưa D1 lên CMS Preview và ghi Sanity theo `CMS_DRY_RUN.md`"

hoặc

> "Sửa lại câu … trước"

## Bước 3 (sau khi ghi): test lại trên CMS Preview chính

Developer sẽ báo khi CMS Preview đã cập nhật (`/_bioa-cms.json` có commit mới). Làm lại Bước 1 trên https://cms-preview.bioagroup.pages.dev/en/.
