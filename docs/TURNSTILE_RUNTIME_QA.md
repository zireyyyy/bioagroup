# TURNSTILE-RUNTIME-NEGATIVE-QA1 — BIO-A LEAD FORM

Status **LOCAL MOCK LOGIC PASS; PRODUCTION RUNTIME PENDING OWNER TEST** (2026-10-09). This is a controlled QA task at the end of Phase 1, NOT production anti-spam acceptance. Never change already PASS lead popup, CRM, D1, Resend or Cloudflare maintenance mode for this task.

## Target and security contract
- Component owner: \`functions/api/lead.js\`, source client \`assets/js/bioa-leads.js\`; global maintenance owner \`functions/_middleware.js\` stays FROZEN.
- Verify missing, empty, invalid, incorrect \`action\`, incorrect \`hostname\` Turnstile token fails with 403 \`turnstile_failed\` BEFORE a new D1 INSERT or any external Google Sheets/Resend call.
- Positive verification must allow a *new* lead to continue through normal D1 persistence. Already-confirmed customer form/D1/Sheets/Resend delivery is FROZEN.
- Duplicated \`submission_id\` is deliberately idempotent and returns \`ok:true\` on retry even if the resent token has expired; this does not create a new lead or secondary notification. Negative tests MUST use a fresh random ID to avoid that existing behavior.
- \`GET /api/lead/config\` reporting \`enabled:true\` and \`misconfigured:false\` proves configuration only. Both TURNSTILE env vars must remain set; code intentionally treats an environment with BOTH missing as Turnstile disabled, so deployment configuration is an important security dependency.

## 1. Repeatable offline test (no secrets, no real email)
\`npm run test:turnstile\`

Node >=20's built-in \`node:test\` runner directly imports the existing server handler and mocks siteverify, D1 and all outgoing delivery requests. No Google/Resend keys, no live API requests, no real D1 updates. PASS expected: 7 tests, 0 failures. Source code was not changed in this QA patch.

## 2. ONE controlled production negative test (owner-only)
Prerequisites:
- Cloudflare Production Turnstile site/secret configured, and authenticated owner preview (maintenance remains enabled).
- Visit the real website on \`https://bioagroup.vn\` using the existing private preview cookie, then open DevTools → Console.
- This script uses only a unique random \`submission_id\`, synthetic name/contact and deliberately INVALID token. It must NOT contain or expose any private preview secret or API key.

Paste/run ONCE in Console:

\`\`\`js
(async () => {
  const id = "bioa_" + btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(9))))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  const response = await fetch("/api/lead", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submission_id: id,
      name: "Turnstile QA",
      contact: "0000000000",
      interest: "Security QA",
      consent: true,
      locale: "vi",
      page_path: "/contacts/",
      website: "",
      turnstile_token: "invalid-turnstile-test-token"
    })
  });
  console.log("QA ID:", id, "HTTP:", response.status, "BODY:", await response.json());
})();
\`\`\`

Expected: \`HTTP: 403\` with \`{ok:false,error:"turnstile_failed"}\`. Status 429 means existing rate limit was reached, not Turnstile acceptance; test should be deferred, not repeated rapidly. Status 503 means configuration/maintenance issue; stop and inspect. 200/201 for a new ID indicates failed negative acceptance: stop, do not mark PASS, diagnose before any public launch.

Cloudflare D1 Console — inspect by the **QA ID printed in your local browser only**:

\`\`\`sql
SELECT id, created_at FROM bioa_leads
WHERE id = 'PASTE_QA_ID_HERE'
LIMIT 1;
\`\`\`

Expected: **no row**. Likewise Google Sheets must not add that ID, and Resend should show no corresponding notification. Do NOT share the private URL/secret.

## 3. Acceptance / rollback
- LOCAL MOCK LOGIC PASS does NOT mean production PASS. **Only the owner may promote runtime Turnstile to PASS** after 403 + no D1/Sheets/Resend write on new ID.
- No production handler/UI/CSS modifications in this QA candidate. An unexpected failure is handled as a new small patch, after root-cause investigation and source-owner mapping.
- Responsive surfaces Desktop / Tablet / Mobile remain in their existing independent states; FULL TABLET PASS is next phase only after finishing/locking small patches.
- **404 page PENDING OWNER ARTWORK**. Owner will supply new image. Do not create, render or deploy a substitute 404 page before artwork and exact requirements arrive. Sitemap/robots and general cleanup belong to Phase 3/4, not this security patch.
- Cloudflare Pages remains maintenance/private preview; BIOA_SITE_MODE must not be set to public. Rollback: owner-confirmed 74ac3533113db8b4d4a9a19ce677733afde16240 and current protected production release (no runtime code changes in this QA patch).
