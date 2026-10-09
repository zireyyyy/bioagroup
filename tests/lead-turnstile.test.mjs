// Tests run with Node >=20 only. No Cloudflare or Google/Resend network calls.
// Keep production functions/api/lead.js unchanged while checking the enforcement gate.
import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { onRequestPost } from "../functions/api/lead.js";

if (!globalThis.crypto) globalThis.crypto = webcrypto;

function fakeDatabase() {
  const db = { reads: 0, inserts: 0, updates: 0 };
  db.prepare = (sql) => ({
    bind: (...values) => ({
      async first() {
        db.reads++;
        if (sql.startsWith("SELECT id")) return null;
        if (sql.startsWith("SELECT count(*)")) return { total: 0 };
        throw new Error("Unexpected SELECT: " + sql);
      },
      async run() {
        if (sql.startsWith("INSERT INTO bioa_leads")) db.inserts++;
        else if (sql.startsWith("UPDATE bioa_leads")) db.updates++;
        else throw new Error("Unexpected write: " + sql);
        return { success: true };
      }
    })
  });
  return db;
}

function makeContext(db, token, allowDelivery) {
  const payload = {
    submission_id: "bioa_QATEST2026A1",
    name: "Turnstile QA",
    contact: "0000000000",
    interest: "Security QA",
    consent: true,
    locale: "vi",
    page_path: "/contacts/",
    website: "",
    turnstile_token: token
  };
  return {
    request: new Request("https://bioagroup.vn/api/lead", {
      method: "POST",
      headers: { Origin: "https://bioagroup.vn", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),
    env: {
      BIOA_LEADS_DB: db,
      LEAD_RATE_SECRET: "mock_test_secret_not_for_production",
      TURNSTILE_SITE_KEY: "unit_test_site_key",
      TURNSTILE_SECRET_KEY: "unit_test_secret_key",
      ...(allowDelivery ? {
        GOOGLE_SERVICE_ACCOUNT_JSON: '{"test":true}',
        GOOGLE_SHEET_ID: "test_not_real",
        RESEND_API_KEY: "test_not_real",
        LEAD_NOTIFY_TO: "unused@example.test",
        LEAD_FROM: "unused@example.test"
      } : {})
    }
  };
}

// No live requests, DB writes, sheet operations, or actual email delivery.
const rejected = [
  ["missing token", undefined, null, 0],
  ["empty token", "", null, 0],
  ["siteverify failure", "invalid-token", { success: false }, 1],
  ["incorrect Turnstile action", "forged-token", { success: true, action: "other", hostname: "bioagroup.vn" }, 1],
  ["incorrect Turnstile hostname", "forged-token", { success: true, action: "bioa_lead", hostname: "example.invalid" }, 1]
];

for (const [label, token, verify, expectedCalls] of rejected) {
  test("rejects " + label + " without saving/notifying", async (t) => {
    const calls = [];
    t.mock.method(globalThis, "fetch", async (url) => {
      calls.push(String(url));
      assert.equal(String(url), "https://challenges.cloudflare.com/turnstile/v0/siteverify");
      return Response.json(verify);
    });
    const db = fakeDatabase();
    const response = await onRequestPost(makeContext(db, token, true));
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { ok: false, error: "turnstile_failed" });
    assert.equal(calls.length, expectedCalls);
    assert.equal(db.inserts, 0);
    assert.equal(db.updates, 0);
  });
}

test("valid Turnstile result may continue to durable D1 persistence", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url) => {
    calls.push(String(url));
    assert.equal(String(url), "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    return Response.json({ success: true, action: "bioa_lead", hostname: "bioagroup.vn" });
  });
  const db = fakeDatabase();
  const response = await onRequestPost(makeContext(db, "valid-test-token", false));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 1);
  assert.equal(db.inserts, 1);
  assert.equal(db.updates, 1);
});

test("incomplete Turnstile configuration fails closed", async (t) => {
  const db = fakeDatabase();
  const input = makeContext(db, "anything", true);
  delete input.env.TURNSTILE_SECRET_KEY;
  t.mock.method(globalThis, "fetch", async () => { throw new Error("no external calls expected"); });
  const response = await onRequestPost(input);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error, "turnstile_config");
  assert.equal(db.inserts, 0);
  assert.equal(db.updates, 0);
});
