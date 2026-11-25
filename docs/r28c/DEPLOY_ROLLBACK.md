# R28c — Triển khai & khôi phục

## Đã triển khai

| Nơi | Trạng thái |
|---|---|
| `r28/blog-icon-cms` + `cms-preview` | HEAD R28c (code `ddcbb9c`, cổng `a9c14f1`, test map + công cụ Sanity `56777e7`, tài liệu sau đó) |
| Sanity `hfmu7ifg/production` | giao dịch `r22appgvF9LfESp2TYLVwG`: 29 tài liệu `blogPost`, chỉ `rewriteApproved=true` và `slug.current` (13 bài) |
| Production `main` | **`9d044a7`, không đổi**, vẫn bảo trì (503 + noindex) |

**Sao lưu Sanity trước khi ghi:**
- tệp `r28c-before-2026-11-20T053505051Z.json` (99 tài liệu, 0 Draft), lưu riêng trong `_private/sanity/backups`;
- **không** nằm trong repo hay ZIP.

**So sánh trước / sau:**
- 29 tài liệu đổi, không có thay đổi ngoài dự kiến;
- 38 slug duy nhất;
- `page-home` không bị chạm.

## Khôi phục

**Thứ tự bắt buộc: Sanity trước, code sau.**
- Code R28c tự đổi slug cũ trong Sanity sang slug mới, nên chạy với Sanity cũ vẫn đúng.
- Ngược lại, code R28b chạy với slug mới trong Sanity sẽ hiện **trùng bài**.

**1. Sanity:**
- Mở Studio → từng bài → *History* → khôi phục bản trước giao dịch `r22appgvF9LfESp2TYLVwG`.
- Hoặc chạy patch ngược từ bản sao lưu: đặt lại `slug.current` cũ và bỏ `rewriteApproved`.

**2. Code Preview:** đẩy lại commit R28b lên `cms-preview`.
```
git push --force-with-lease origin 1b696a8:cms-preview
```
- Chỉ làm khi Owner yêu cầu. Lệnh này cần force, vì vậy phải hỏi trước.

**3. Production:** không có gì cần khôi phục.
