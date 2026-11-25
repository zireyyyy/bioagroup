# BIO-A — R28d (form chat · nội dung VI/EN · chatbot AI Free): START HERE (23/11/2026)

| Mục | Giá trị |
|---|---|
| Repository / nhánh | `zireyyyy/bioagroup`, nhánh **`r28/blog-icon-cms`**. HEAD = SHA trong tên ZIP |
| PR nháp | `zireyyyy/bioagroup#14`: chỉ CI, **không merge** |
| CMS Preview | https://cms-preview.bioagroup.pages.dev/ = HEAD. Dist giống hệt từng byte bản R28d `6889ec9` |
| Sanity | **0 lần ghi** trong R28d. Snapshot đã xuất bản `97d6dcb9621d54a1` (393 ô chữ trang = repo) |
| Production | `main` `9d044a7`, bảo trì. **Không đổi** |

## Trạng thái theo checkpoint (quyết định Owner 23/11/2026)

| Checkpoint | Trạng thái |
|---|---|
| **A** form chat CHAT-C4B/C7 | **OWNER PASS 5/5, LOCKED.** Không mở lại |
| **B** VI-first tự động | **AUTO VI-FIRST DEFERRED — MANUAL VI/EN.** Worker dịch, token Editor, webhook, backfill: tắt, không triển khai |
| **D0** kiểm nội dung thật + VI/EN | **XONG** (chỉ đọc). 24 mục (7 H). Phiếu xác nhận cho Owner |
| **D1** EN theo VI hiện tại | **Owner đã duyệt (25/11), đã lên CMS Preview, đã ghi Sanity (3 tài liệu).** Chờ Owner UAT. Xem `docs/r28d/d1/START_HERE.md` |
| **C0** chatbot offline | **PASS.** Tri thức `2026-11-23.1`, giữ lại 2 thông tin chưa xác nhận, Free model đã kiểm |
| **C1** chatbot thật trên Preview | **AI LIVE BLOCKED**: cần Owner cho phép đường test Owner trên Preview, tạo D1/binding, duyệt bổ sung Chính sách bảo mật |

## Đọc theo thứ tự

1. `OWNER_FACTORY_FACT_CHECK.md`: **phiếu Owner cần trả lời** (B1–B8, C, E).
2. `VI_EN_PARITY_AUDIT.md`: 24 mục, mỗi mục một dòng, kèm câu VI/EN đề xuất.
3. `CONTENT_TRUTH_INVENTORY.md`:
   - chữ nằm ở đâu (repo / Sanity);
   - Studio đang deploy là bản nào;
   - quy trình sửa VI/EN thủ công.
4. `CHAT_FAQ_REVIEW.md`, `CHAT_ACTIVATION.md`, `PRIVACY_AI_ADDITION.md`: chatbot.
5. `OWNER_UAT.md`: **BẠN CẦN TEST GÌ**.
6. `QA_MATRIX.md` §5, `DEPLOY_ROLLBACK.md`, `COST_AND_SECURITY.md`.

## Commit tiếp nối (sau `6889ec9`)

| SHA | Nội dung |
|---|---|
| `46a71dd` | C0: `lib/chat/knowledge.js` `2026-11-23.1` (giữ lại mẹ & bé / đăng ký thương hiệu; FAQ "manufacture"); test 27–28 |
| `6e9affa` | D: chặn VI-sửa-mà-EN-cũ (`tools/cms-snapshot.mjs`, `cms-release.mjs`, `cms-preview-status.mjs`); `tests/r28d-content-guard.mjs` + baseline trong CI |
| `835654f` | Tài liệu D0 / C0 |
| docs | START_HERE, kết quả, UAT, QA, handoff |
