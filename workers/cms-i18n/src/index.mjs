// R28 VI-FIRST — translator Worker (NOT DEPLOYED in R28: provider choice, Sanity write token and webhook switch need
// owner approval; see docs/r28/VI_FIRST_CMS.md). Receives the Sanity "document published" webhook, translates the
// changed VI units, stores EN in Sanity, then triggers exactly one Cloudflare Pages build of cms-preview.
//
// Secrets (wrangler secret put, never in code): SANITY_WRITE_TOKEN (Editor robot token, dataset production),
// SANITY_WEBHOOK_SECRET, PREVIEW_DEPLOY_HOOK_URL, and ANTHROPIC_API_KEY only if I18N_PROVIDER = "anthropic".
// Vars: I18N_PROVIDER (none | workers-ai | anthropic), I18N_MODEL (optional).
import { handleDocumentEvent, sanityStore, verifySanitySignature } from "../../../cms/i18n/orchestrate.mjs";
import { createProvider } from "../../../cms/i18n/providers.mjs";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    const body = await request.text();
    if (!(await verifySanitySignature(request.headers.get("sanity-webhook-signature"), body, env.SANITY_WEBHOOK_SECRET)))
      return new Response("Unauthorized", { status: 401 });
    let id;
    try { id = JSON.parse(body)._id; } catch { return new Response("Bad request", { status: 400 }); }
    if (!id) return new Response("Bad request", { status: 400 });
    const store = sanityStore({ projectId: env.SANITY_PROJECT_ID || "hfmu7ifg", dataset: env.SANITY_DATASET || "production", token: env.SANITY_WRITE_TOKEN });
    let provider;
    try { provider = createProvider(env.I18N_PROVIDER || "none", { env }); } catch { provider = createProvider("none"); }
    const triggerBuild = async () => {
      const r = await fetch(env.PREVIEW_DEPLOY_HOOK_URL, { method: "POST" });
      // 304 = Cloudflare already has a queued build for the branch (deduplicated): not an error.
      if (!r.ok && r.status !== 304) throw new Error("deploy hook " + r.status);
    };
    // Answer Sanity at once; translation and the build continue in the background (Sanity retries on 5xx only).
    ctx.waitUntil(handleDocumentEvent({ id, store, provider, triggerBuild, log: (...a) => console.log(JSON.stringify(a)) })
      .catch((e) => console.log(JSON.stringify(["error", id, String(e.message || e).slice(0, 200)]))));
    return new Response("Accepted", { status: 202 });
  },
};
