# R28d-C — Proposed Privacy Policy addition for the chatbot (NOT APPLIED)

**Status: OWNER LEGAL APPROVAL PENDING.**
- The Privacy and Cookie policies are OWNER PASS. This file only shows the **exact** text proposed.
- Nothing is published until the Owner approves this addition separately. Then the developer adds it to `bioa-legal-pages.mjs` and the legal approval hash is refreshed.
- The Cookie Policy needs **no** change: the chat sets no cookie and stores nothing in the browser. The session id lives in page memory only.

**Facts the text relies on** (verified in code, `lib/chat/gateway.js`, `lib/chat/adapters.js`, `bioa-home-refine.mjs`):
- The message text is sent to Cloudflare Workers AI only when the chatbot is switched on (`BIOA_CHAT_UI_API=1` + `BIOA_CHAT_ENABLED=true`).
- Model: `@cf/google/gemma-4-26b-a4b-it`. Its Cloudflare model page shows the "Zero data retention" tag.
- Bio-A stores no chat message. Nothing is written to D1, Google Sheets or e-mail, and the logs record only an error code, never the text.
- `lead_created` is always `false`.
- Rate limiting uses a one-way SHA-256 hash of the IP, kept in memory for at most a minute.
- The daily cost counter stores only date, flow, number of calls and Neurons. There is no personal data in it.
- Questions about price, MOQ, timelines, contracts, certificates and health are never sent to the AI. They get a fixed reply with a Zalo (VI) or Telegram (EN) button, which opens only when the visitor clicks it.

## Diff: Vietnamese (`/privacy-policy/`)

After **2.4**, add:

> **2.5.** Khi bạn dùng khung chat "Khánh Như Bio-A", nội dung câu hỏi bạn gõ được gửi tới dịch vụ AI của Cloudflare (Cloudflare Workers AI) để tạo câu trả lời tự động. Bio-A Group không lưu nội dung trò chuyện và không dùng khung chat để thu thập họ tên, số điện thoại hay email. Vui lòng không nhập thông tin cá nhân hoặc thông tin nhạy cảm vào khung chat. Câu hỏi về giá, số lượng tối thiểu, tiến độ, hợp đồng, chứng nhận hoặc sức khỏe sẽ được chuyển sang tư vấn viên qua Zalo hoặc Telegram khi bạn bấm chọn.

After **4.3**, add:

> **4.4.** Nội dung câu hỏi gửi qua khung chat được xử lý bởi Cloudflare (Cloudflare, Inc.), đơn vị có máy chủ đặt ngoài Việt Nam, chỉ để tạo câu trả lời và không được Bio-A Group lưu lại.

## Diff: English (`/en/privacy-policy/`)

After **2.4**, add:

> **2.5.** When you use the "Khánh Như Bio-A" chat, the question you type is sent to Cloudflare's AI service (Cloudflare Workers AI) to generate an automatic reply. Bio-A Group does not store chat conversations and does not use the chat to collect your name, phone number or e-mail address. Please do not enter personal or sensitive information in the chat. Questions about prices, minimum order quantities, timelines, contracts, certificates or health are passed to an advisor on Zalo or Telegram when you choose to click.

After **4.3**, add:

> **4.4.** Chat questions are processed by Cloudflare (Cloudflare, Inc.), whose servers are located outside Vietnam, only to generate the reply; Bio-A Group does not keep them.

## Owner decision

- **"Đồng ý thêm 2.5 và 4.4"**: the developer applies the text exactly as above, updates "Cập nhật lần cuối" / "Last updated", refreshes the legal hash, and puts it on the Preview for your check.
- **"Chưa thêm"**: the chatbot can still run in **FAQ-only mode** (`BIOA_CHAT_PROVIDER=faq`, no AI, nothing sent to Cloudflare AI). In that mode only the on-chat notice applies.
- The AI mode should not go live for visitors before 2.5 / 4.4 are published.
