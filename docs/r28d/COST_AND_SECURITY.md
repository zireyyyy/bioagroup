# R28d — Chi phí, bảo mật, quyền riêng tư (VI-first + chatbot AI)

**Trạng thái:** mã nguồn xong, **chưa gọi AI thật lần nào** (0 Neuron, $0). Kích hoạt thật = **BLOCKED** cho tới khi Owner hoàn thành các mục ở §5.

## 1. Chính sách giá Cloudflare Workers AI

Nguồn: developers.cloudflare.com, đọc ngày 21/11/2026 (`workers-ai/platform/pricing`, `workers-ai/platform/limits`, changelog 2026-07-28).

**Hạn mức miễn phí:**
- **10.000 Neuron/ngày**, áp dụng cho cả gói Workers Free và Workers Paid.
- Đặt lại lúc **00:00 UTC** (07:00 giờ Việt Nam).

**Khi vượt hạn mức:**

| Gói | Điều xảy ra khi vượt | Chi phí |
|---|---|---|
| **Workers Free** | lệnh AI tiếp theo **báo lỗi** (nhà cung cấp tự chặn) | **$0** |
| **Workers Paid** | **bị tính tiền** $0,011 / 1.000 Neuron | tài liệu **không nêu** mức trần chi tiêu nào |

**Model dùng:**
- `@cf/google/gemma-4-26b-a4b-it` (mặc định):
  - vẫn dùng được trên gói Free (changelog 2026-07-28);
  - 9.091 Neuron / 1 triệu token vào, 27.273 Neuron / 1 triệu token ra.
- Đối chứng: `@cf/zai-org/glm-4.7-flash` (dùng được trên gói Free).
- Model không có trong bảng giá ở `lib/chat/budget.js` sẽ **bị từ chối**.
- Giới hạn tốc độ: 300 request/phút.

## 2. Gói Workers của tài khoản: CHƯA XÁC MINH

**Tôi không tự kiểm tra được gói của tài khoản:**
- Phiên đăng nhập wrangler trên máy đã hết hạn ngày 20/11/2026.
- Quyền của phiên đó không có mục đọc thông tin thanh toán.
- Tôi **không** tự làm mới đăng nhập của Owner.

**Owner kiểm tra:** Cloudflare Dashboard → *Workers & Pages* → *Plans*. Xem gói là Free hay Paid.

**Nếu là Free:**
- Nhà cung cấp tự chặn ở 10.000 Neuron/ngày, nên chi phí **$0 được bảo đảm**.
- Bộ giới hạn của chúng ta là lớp bảo vệ thứ hai.

**Nếu là Paid:**
- Chỉ còn bộ giới hạn của chúng ta chặn chi phí (§3).
- Rủi ro còn lại: nếu tài khoản có ứng dụng **khác** cũng dùng Workers AI, hạn mức 10.000 bị dùng chung.
- Phần vượt sẽ bị tính tiền, kể cả khi chatbot / VI-first nằm trong trần của chúng.
- Owner cần xác nhận **không có ứng dụng Workers AI nào khác**, hoặc chấp nhận rủi ro này bằng văn bản.

## 3. Bộ giới hạn chi phí (fail closed)

Mã nguồn: `lib/chat/budget.js`.

**Cách hoạt động:**
- Trước **mỗi** lệnh gọi model, hệ thống giữ chỗ số Neuron **xấu nhất** cho lệnh đó:
  - token vào ước tính 1 token / 2 ký tự (tiếng Việt có dấu, ước tính rộng tay);
  - cộng toàn bộ `max_tokens` đầu ra.
- Việc giữ chỗ là **một câu lệnh D1 nguyên tử**: upsert có điều kiện trên tổng đang chạy.
  - Hai request cùng lúc không thể làm tổng vượt trần (đã có test 200 request đồng thời).
- Bảng `bioa_ai_budget(day, flow, neurons, calls)` dùng chung cho chatbot và VI-first.

**Trần theo luồng** (được khóa cứng trong mã):

| Luồng | Trần cứng | Mặc định |
|---|---|---|
| chat | 3.000 | 1.500 |
| i18n | 6.000 | 3.000 |

Tổng tối đa **9.000 < 10.000** Neuron/ngày.

**Ước tính chi phí:**
- 1 câu hỏi chatbot ≈ 14–19 Neuron (xấu nhất). Mặc định 1.500 → khoảng 78–107 câu trả lời AI/ngày.
- Các câu về giá, MOQ, thời gian, hợp đồng, chứng nhận, y tế, liên hệ, cùng các câu FAQ có sẵn, **không gọi AI** (0 Neuron).
- 1 đoạn dịch (≤ 2.500 ký tự) ≈ 129 Neuron (xấu nhất).
- Nếu dịch **toàn bộ** 97 tài liệu (~110.000 ký tự) thì tốn ~5.700 Neuron, gần hết hạn mức một ngày.
  - Vì vậy **không chạy dịch hàng loạt**. Lệnh backfill chỉ ghi baseline, không gọi AI.

**Khi chặn:**
- Chatbot: trả `503 quota_exhausted`; giao diện vẫn hiện nút chuyển sang Zalo / Telegram.
- VI-first: bài được đánh dấu `FAILED`, giữ nguyên bản EN cũ, báo lỗi rõ ràng.

**Kích hoạt chỉ khi có đủ cả bốn điều kiện** (thiếu một là `503 misconfigured` / `NOT_CONFIGURED`):
1. binding `AI`;
2. binding D1 `BIOA_AI_BUDGET_DB`;
3. `BIOA_AI_COST_GATE=verified` (chat) hoặc `I18N_COST_GATE=verified` (dịch). Owner chỉ đặt giá trị này **sau khi xác minh §2**;
4. model có trong bảng giá.

## 4. Bảo mật và quyền riêng tư của chatbot

**Phạm vi trả lời:**
- Chỉ dùng các thông tin công khai đã duyệt, có phiên bản (`lib/chat/knowledge.js`, `KNOWLEDGE_VERSION`).
- Nguồn: `bioa-business.mjs` và các trang dịch vụ / giới thiệu đã Owner PASS.
- 38 bài Blog **không** được dùng làm nguồn khẳng định năng lực.

**Câu hỏi nhạy cảm:** các câu về giá, MOQ, thời gian sản xuất, hợp đồng, chứng nhận (GMP / HACCP / ISO), y tế, liên hệ được trả lời bằng **câu cố định** và chuyển sang người thật. Model không bao giờ thấy những câu này.

**Chống prompt injection:**
- Các câu kiểu "ignore instructions", "system prompt", "đổi hotline"… nhận câu trả lời cố định.
- Lời nhắn của khách được coi là dữ liệu, không phải lệnh.

**Hậu kiểm câu trả lời của model (phía máy chủ):** loại bỏ nếu có
- link, email, số điện thoại lạ;
- giá, con số MOQ;
- chứng nhận, cam kết, "điều trị";
- sai ngôn ngữ, hoặc nhắc tới system prompt.

HTML bị gỡ, độ dài tối đa 600 ký tự. Câu trả lời không đạt → "Mình chưa có thông tin chắc chắn…" kèm nút chuyển kênh.

**Hiển thị trên trang:**
- Chỉ dùng `textContent`, không chèn HTML. Đã test với payload XSS.
- Link chuyển kênh **chỉ** lấy từ `bioa-business.mjs` (Zalo `zalo.me/84779399379`, Telegram `t.me/bioagroup`).
- Mở tab mới, `rel=noopener`, chỉ khi khách bấm.

**Không lưu gì:**
- Không lưu hội thoại, IP gốc hay nội dung tin nhắn trong log.
- Không gửi email / Google Sheets, không tạo lead (`lead_created:false`).
- Mỗi request chỉ gửi **một** tin nhắn, không kèm lịch sử.

**Giới hạn tốc độ:** 10 request/phút/IP (băm SHA-256), 6 request/phút/phiên. Có thể thêm binding `BIOA_CHAT_RATE_LIMITER`.

**Kiểm soát request:** chỉ nhận request cùng nguồn (khác nguồn → 403); body tối đa 4 KB; tin nhắn tối đa 1.000 ký tự; có honeypot chống spam.

**Bảo vệ Preview:**
- Middleware vẫn chặn `/api` với khách trên Preview. Tôi **không** nới cổng này.
- Kiểm thử thật phải dùng phiên Owner.

**Dữ liệu tới Cloudflare:**
- Khi bật AI, nội dung tin nhắn được gửi tới model Workers AI của Cloudflare (xử lý, không lưu ở phía BIO-A).

## 5. BLOCKED: cần Owner trước khi bật thật

1. **Xác minh gói Workers** (§2). Nếu Paid: xác nhận không có ứng dụng Workers AI khác, hoặc chấp nhận rủi ro.
2. **Pháp lý (thay đổi mới):**
   - Duyệt câu thông báo hiển thị trên chatbot: *"Trợ lý tự động chỉ giải đáp thông tin chung về Bio-A Group. Vui lòng không gửi thông tin cá nhân hoặc nhạy cảm."* (VI/EN trong `bioa-home-refine.mjs`, chỉ hiện khi bật cờ API).
   - Quyết định có bổ sung vào Chính sách bảo mật một đoạn về việc xử lý tin nhắn chatbot bằng Cloudflare Workers AI hay không.
   - Chính sách bảo mật / cookie hiện tại đã OWNER PASS; tôi **không tự sửa**.
3. **Tạo tài nguyên Cloudflare** (thao tác của Owner, hoặc ủy quyền rõ ràng cho tôi):
   - D1 `bioa-ai-budget`;
   - binding `AI` và `BIOA_AI_BUDGET_DB` cho Pages (môi trường Preview);
   - biến `BIOA_CHAT_ENABLED=true`, `BIOA_CHAT_PROVIDER=workers-ai`, `BIOA_AI_COST_GATE=verified`, `BIOA_CHAT_UI_API=1` (biến build).
4. **VI-first** (thêm):
   - token Sanity **Editor mới**, chỉ lưu trong Worker secret;
   - deploy Studio;
   - deploy Worker `bioa-cms-i18n` có binding AI + D1 và `I18N_COST_GATE=verified`;
   - chuyển webhook Sanity sang Worker (có chữ ký);
   - chạy backfill `--apply` (chỉ ghi baseline);
   - kiểm thử E2E trên một tài liệu thử nghiệm có bản sao lưu.

**Phương án $0 chắc chắn, không cần §2:** đặt `BIOA_CHAT_PROVIDER=faq`.
- Chatbot trả lời FAQ cố định và chuyển sang Zalo / Telegram.
- Không gọi AI.
- Vẫn cần mục 2 (thông báo) và mục 3 (biến môi trường, không cần D1 / AI).
