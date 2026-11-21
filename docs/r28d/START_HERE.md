# BIO-A — R28d (khôi phục form chat + VI-first + chatbot AI): START HERE (21/11/2026)

| Mục | Giá trị |
|---|---|
| Repository / nhánh | `zireyyyy/bioagroup`, nhánh **`r28/blog-icon-cms`** (tiếp nối R28c `ae733b1`). HEAD = SHA trong tên ZIP |
| PR nháp | `zireyyyy/bioagroup#14`: chỉ CI, **không merge trước OWNER PASS** |
| CMS Preview | https://cms-preview.bioagroup.pages.dev/ = HEAD R28d. Form chat đã khôi phục; cờ AI **OFF** |
| Sanity | **Không ghi gì trong R28d.** 38 bài R28c giữ nguyên |
| Production | `main` `9d044a7`, maintenance ON. **R27 → R28d chưa lên Production** |

## Trạng thái

| Checkpoint | Code / test | Preview | Owner |
|---|---|---|---|
| A: form chat CHAT-C4B/C7 | PASS | Đang chạy, đã kiểm thật | **Chờ test** |
| B: VI-first Workers AI | PASS (offline) | **BLOCKED** | — |
| C: chatbot AI chuyển kênh | PASS (offline) | **BLOCKED** | — |

## Đọc theo thứ tự

1. `R28D_RESULT.md`: nguyên nhân, cách sửa, những gì bị BLOCKED.
2. `OWNER_UAT.md`: **BẠN CẦN TEST GÌ**.
3. `COST_AND_SECURITY.md`:
   - bảng giá Workers AI;
   - gói tài khoản **chưa xác minh**;
   - bộ giới hạn chi phí;
   - quyền riêng tư;
   - §5: danh sách việc Owner cần làm để mở khóa B và C.
4. `CHAT_FAQ_REVIEW.md`: nội dung FAQ / chuyển kênh để Owner soát.
5. `QA_MATRIX.md`, `DEPLOY_ROLLBACK.md`.

## Commit

| SHA | Nội dung |
|---|---|
| `6ef278f` | A: form chat (`bioa-home-refine.mjs`) + cập nhật hợp đồng test R27 / R28b + test `r28d-chat-restore` |
| `1d47ff8` | C: `lib/chat/knowledge.js`, `budget.js`, adapter `workers-ai` / `faq`, Telegram |
| `9701b27` | B: provider `workers-ai` có ngân sách, chia khối, tin tuyển dụng REVIEW_REQUIRED |
| `7d02dd3`, `d1c2eab` | Cổng kiểm thử: phạm vi phase R28d, final gate, duyệt module, CI chạy `test:chat` |
| `c62889f`, `cce5b6d` | Sửa test (thứ tự đọc script ở R27 audit; timer timeout trên Node 22 CI) |

## Cờ chạy thật (đều đang tắt)

| Cờ | Nơi đặt | Tác dụng |
|---|---|---|
| `BIOA_CHAT_UI_API=1` | biến build Pages | Form gọi `/api/chat`, hiện câu thông báo AI |
| `BIOA_CHAT_ENABLED=true` + `BIOA_CHAT_PROVIDER=faq` hoặc `workers-ai` | Pages Functions | Bật API chat |
| `BIOA_AI_COST_GATE=verified` + binding `AI` + D1 `BIOA_AI_BUDGET_DB` | Pages Functions | Bắt buộc cho `workers-ai` |
| `I18N_COST_GATE=verified` + binding `AI` + D1 | Worker `bioa-cms-i18n` | Bắt buộc cho VI-first |
