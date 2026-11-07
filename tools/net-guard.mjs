// P0A — preload for the build process: any network access is a hard failure.
// Usage: node --import ./tools/net-guard.mjs build.mjs
import http from "node:http";
import https from "node:https";
import net from "node:net";

const deny = what => () => { throw new Error("NET GUARD: network access is blocked during build (" + what + ")"); };
globalThis.fetch = async u => { throw new Error("NET GUARD: fetch blocked: " + String(u)); };
for (const mod of [http, https]){ mod.request = deny("http.request"); mod.get = deny("http.get"); }
net.connect = deny("net.connect");
net.createConnection = deny("net.createConnection");
