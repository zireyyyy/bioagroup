// P0A final-candidate gate (replaces running the historical fidelity test against the final dist).
// tests/p0a-fidelity-allowlist.mjs compares HTML with the d59f50d Preview: it is valid only for the
// P0A/P0B1 build, because every later approved phase (P1, P2, P4, R1-R3, R12, R13, R15) intentionally
// changes HTML. The final candidate is therefore proven in two steps, both fail-closed:
//   1. historical: the frozen P0B1 snapshot still matches the Preview within the P0A allowlist (104/104);
//   2. final: current dist differs from that snapshot ONLY inside the declared phase scopes.
// Env: BIOA_P0B1_SNAPSHOT (default D:/BIOA_WORKSPACE/QA_EVIDENCE/dist-P0B1-71db6c5), BIOA_REFERENCE_DIR.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const SNAP = process.env.BIOA_P0B1_SNAPSHOT || "D:/BIOA_WORKSPACE/QA_EVIDENCE/dist-P0B1-71db6c5";
const PHASES = "P1+P2+P4+R1+R2+R3+R12+R13+R15+R21+R24+R24CL+R24FD+R24OX";
if (!existsSync(SNAP)){ console.error("P0A final gate: P0B1 snapshot missing at " + SNAP + " (fail closed)"); process.exit(1); }
const run = (args, env = {}) => spawnSync(process.execPath, args, { stdio: "inherit", env: { ...process.env, ...env } }).status;
const hist = run(["tests/p0a-fidelity-allowlist.mjs"], { FIDELITY_DIST: SNAP });
const scope = run(["tests/phase-diff-scope.mjs", SNAP, PHASES]);
console.log(`P0A final gate: historical fidelity ${hist === 0 ? "PASS" : "FAIL"} · cumulative scope ${PHASES} ${scope === 0 ? "PASS" : "FAIL"}`);
process.exit(hist === 0 && scope === 0 ? 0 : 1);
