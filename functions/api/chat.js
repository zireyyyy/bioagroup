// BIO-A Pages Function: chat API gateway (AI-READY, feature flag OFF by default).
// Contract and owner configuration: docs/CHAT_AI_INTEGRATION.md. Independent of /api/lead,
// D1, Google Sheets and Resend. Previews keep /api private (functions/_middleware.js).
import { handleChat } from "../../lib/chat/gateway.js";

export const onRequest = ({ request, env }) => handleChat(request, env);
