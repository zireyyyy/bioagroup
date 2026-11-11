// Fetch step for Cloudflare Preview/CI: pack the local private bundle (outside the repo), serve it from a local
// token-protected server, and check that tools/fetch-source-bundle.mjs succeeds only with the right token and
// an untampered archive, refuses non-https URLs, and never falls back. Needs BIOA_SOURCE_DIR (skipped otherwise).
import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawnSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { gzipSync, gunzipSync } from "node:zlib";
import { join } from "node:path";
import { tmpdir } from "node:os";

const have = !!process.env.BIOA_SOURCE_DIR;
const node = (args, env) => spawnSync(process.execPath, args, { encoding: "utf8", env: { ...process.env, ...env } });
// async variant: the local archive server lives in this process, so the child must not block the event loop
const nodeAsync = (args, env) => new Promise(r => { const c = spawn(process.execPath, args, { env: { ...process.env, ...env } }); let stdout = "", stderr = "";
  c.stdout.on("data", d => stdout += d); c.stderr.on("data", d => stderr += d); c.on("close", status => r({ status, stdout, stderr })); });

test("fetch-source-bundle: token, integrity, https and no-fallback contract", { skip: !have && "BIOA_SOURCE_DIR not set" }, async () => {
  const tmp = mkdtempSync(join(tmpdir(), "bioa-fetch-"));
  try {
    const archive = join(tmp, "bundle.json.gz");
    const p = node(["tools/pack-source-bundle.mjs", "--out", archive]);
    assert.equal(p.status, 0, p.stderr);
    const good = readFileSync(archive);
    const data = JSON.parse(gunzipSync(good).toString("utf8"));
    const k = Object.keys(data.files).find(f => f.endsWith(".html"));
    const tamperedFiles = { ...data.files, [k]: Buffer.from(Buffer.from(data.files[k], "base64").toString("utf8").replace("<html", "<html data-x")).toString("base64") };
    const bad = gzipSync(Buffer.from(JSON.stringify({ ...data, files: tamperedFiles })));
    const server = createServer((req, res) => {
      if (req.headers.authorization !== "Bearer right-token"){ res.writeHead(403).end(); return; }
      res.writeHead(200, { "content-type": "application/octet-stream" }).end(req.url === "/bad" ? bad : good);
    });
    await new Promise(r => server.listen(0, "127.0.0.1", r));
    const base = "http://127.0.0.1:" + server.address().port;
    const run = (url, token) => nodeAsync(["tools/fetch-source-bundle.mjs"], { BIOA_SOURCE_DIR: "", BIOA_SOURCE_URL: url, BIOA_SOURCE_TOKEN: token, BIOA_SOURCE_ALLOW_LOCAL: "1", BIOA_SOURCE_FETCH_DIR: join(tmp, "out") });
    const ok = await run(base + "/good", "right-token");
    assert.equal(ok.status, 0, ok.stderr + ok.stdout);
    assert.match(ok.stdout, /verified files/);
    assert.equal((await run(base + "/good", "wrong")).status, 1, "wrong token must fail");
    assert.equal((await run(base + "/bad", "right-token")).status, 1, "tampered archive must fail closed");
    assert.equal(node(["tools/fetch-source-bundle.mjs"], { BIOA_SOURCE_DIR: "", BIOA_SOURCE_URL: "http://example.com/x", BIOA_SOURCE_TOKEN: "t" }).status, 1, "non-https must fail");
    assert.equal(node(["tools/fetch-source-bundle.mjs"], { BIOA_SOURCE_DIR: "", BIOA_SOURCE_URL: "", BIOA_SOURCE_TOKEN: "" }).status, 1, "missing config must fail");
    server.close();
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});
