# R27 — OWNER nghiệm thu một lượt (10–15 phút)

- **Xem ở đâu:** https://cms-preview.bioagroup.pages.dev/ (bản R27, nội dung CMS đã Publish).
- **Production:** `bioagroup.vn` vẫn ở chế độ bảo trì và vẫn chạy bản R26. R27 chỉ lên Production khi bạn duyệt.
- **Chuẩn bị:** dùng **1 điện thoại** và **1 máy tính**, đánh dấu ✅/❌ cho từng mục, rồi gửi lại một danh sách duy nhất (ghi số mục + ảnh chụp nếu ❌).

## A. Bốn lỗi đã sửa

1. **F01 — Footer trên điện thoại** (2 phút)
   - Điện thoại, trang tiếng Anh `/en/`: phóng to trình duyệt 125% (Chrome: ⋮ › Cỡ chữ / Zoom), kéo xuống Footer.
   - Đạt khi: cột "Services" và mọi chữ nằm gọn trong màn hình, không bị cắt; bấm thử 1–2 link Footer được.
2. **F02 — Đóng popup bằng phím Esc** (1 phút)
   - Máy tính, trang chủ: bấm **Nhận tư vấn** → popup mở → gõ thử vài chữ vào ô Họ tên → bấm **Esc**.
   - Đạt khi: popup đóng, trang không nhảy vị trí; mở lại thấy chữ vừa gõ vẫn còn. Nút ✕ vẫn đóng được.
   - **Không bấm Gửi.** API trên Preview bị khóa có chủ đích.
3. **F03 — Không còn đánh giá khách hàng mẫu** (1 phút)
   - Trang chủ VI và EN: kéo hết trang.
   - Đạt khi: không còn khối "Khách Hàng Nhận Được Gì…" / "What clients receive…" và không có khoảng trống lạ ở vị trí cũ (giữa "Các dòng sản phẩm…" và "Quy trình…").
4. **F04 — `www`** (1 phút)
   - Gõ `www.bioagroup.vn/blog/?thu=1` vào trình duyệt.
   - Đạt khi: tự chuyển sang `bioagroup.vn/blog/?thu=1` và thấy trang bảo trì "Website đang được hoàn thiện". Không còn lỗi 522, không cảnh báo chứng chỉ.

## B. Nội dung đã làm sạch (5 phút)

5. **Trang chủ › "Giải pháp bao bì phù hợp sản phẩm"** (máy tính: bấm mũi tên qua 3 slide; điện thoại: vuốt 4 thẻ):
   - chỉ còn **Tuýp & chai chân không**, **Hũ mỹ phẩm**, **Gói sachet**, **Túi doypack**;
   - **không còn** viên nang, viên nén, thực phẩm bổ sung, dinh dưỡng thể thao, đồ uống;
   - dòng MOQ ghi "**Theo dự án**";
   - trên điện thoại, tên mỗi thẻ khớp với ảnh của thẻ đó.
   - *Lưu ý:* ảnh slide "Hũ mỹ phẩm" (máy tính) vẫn có lọ và vỉ thuốc của Merywood. Đây là ảnh tạm, bạn sẽ thay sau (OWNER_CONTENT_INPUTS #7).
6. **Gia Công Mỹ Phẩm › "Lộ Trình Hợp Tác Theo Nhu Cầu":**
   - 3 thẻ mô tả dịch vụ ("Dành cho thương hiệu…") kèm các bước dịch vụ (R&D • Mẫu thử • …);
   - không còn chữ "Tình huống", không có dấu ngoặc kép kiểu lời chứng thực.
7. **Dịch Vụ Khác › "Giải Pháp Theo Từng Nhu Cầu":** dòng dưới tên thẻ là các dịch vụ liên quan (ví dụ "Chai lọ • Sang chiết • Đóng gói • Nhãn"), không còn "Gói dịch vụ gợi ý".
8. **Tuyển dụng (VI/EN):**
   - 3 thẻ ghi "**Chưa mở tuyển**" / "Not currently hiring".
   - Mở 1 vị trí: dòng in đậm đầu tiên nói rõ "Hiện chưa mở tuyển…"; không có nút ứng tuyển, không có lương giả.
9. **Khung chat** (góc phải): mở ra thấy lời chào nói rõ chưa nhận tin nhắn trực tuyến, và 2 nút **Nhắn Zalo** / **Gọi 0779 399 379**. Trên điện thoại, bấm Gọi thì mở trình quay số.
10. **Blog:** danh sách còn **9 bài** (2 trang).
    - Gõ link cũ `/blog/page/4/`: chuyển ngay về trang Blog đầu (chuyển hướng 301 thật).
    - Một bài "chờ viết lại" (ví dụ `/blog/an-gi-de-chong-lao-hoa-da/`) vẫn mở được, nhưng không có trong danh sách.
    - Muốn chọn bài viết lại trước: xem `BLOG_REWRITE_PRIORITY.md`.

## C. Không bị ảnh hưởng (3 phút)

11. Header, menu điện thoại, đổi VI/EN, slider, Footer ở 390px và màn hình rộng: giống bản trước.
12. **Studio:** https://bioagroup.sanity.studio/ › **Bài viết Blog** › mở một bài › tab **Quản trị**: có ô "Đã viết lại — hiển thị lại trên danh sách Blog".
    - **Không cần bật lúc này.**

**Đạt:** mọi mục đúng như mô tả → trả lời "R27 PASS" (hoặc PASS kèm ghi chú). Muốn đưa R27 lên Production (vẫn giữ bảo trì) thì ghi thêm "push main".

**Không đạt:** ghi số mục, thiết bị, ngôn ngữ và ảnh chụp.

Thông tin thật cần bạn cung cấp (không bắt buộc cho UAT này): `OWNER_CONTENT_INPUTS.md`.
