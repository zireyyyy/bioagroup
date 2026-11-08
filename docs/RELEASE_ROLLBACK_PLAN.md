# BIO-A — RELEASE & ROLLBACK PLAN (recovery branch)

**Status:** local only. Nothing pushed. Production `main` `cb4e92f` stays FROZEN (maintenance on). PR #10 `ed7324c` and PR #11 `d59f50d` untouched. The earlier P0–P7 branch `candidate/p0a-source-pin` (`54d78bf`, `D:\BIOA_WORKSPACE\bioagroup-p0a`) is kept unchanged as evidence; it is NOT a release candidate.

## Commit chain — branch `recovery/baseline-d59f50d-20261108`, base `d59f50d` (PR #11 head)
| Commit | Purpose | Visible change | Proof |
|---|---|---|---|
| `4ceb6cf` R0 | Crash-proof local QA server + browser load-integrity smoke | none on site | server test; negative control reproduces OI-1 |
| `2c71f52` P0A port of `4d510d4` | Build from pinned, hash-verified Merywood source (no live fetch) | none | fidelity 104/104 vs Preview `abdd7602` |
| `510ab9e` P0B1 port of `71db6c5` | Serve pinned `main.css`/`main.js` | sliders work again | dist == P0B1 snapshot; Swiper 24/24 |
| `e2c78c6` P1 port of `636e299` | Home icon 04 canonical CSS | icon 04 | dist == P1 snapshot; icon test |
| `22ccdf4` P2 port of `d9d8cc1` | Tablet readability (769–1200) | Tablet text/steps/modal | dist == P2 snapshot |
| `0d1fc5e` P4 port of `f0250be` | title/description/canonical/sitemap | none | dist == P4 snapshot |
| `a0636b3` R1 | D11 legacy-slug redirect pages | Footer links now reach pages | 32/32 browser |
| `bbc11df` R2 | D12 Blog h1 (tag only) | none | computed style identical |
| `929039c` R3 | Drop Merywood JSON-LD + WP beacon | none | scope gate |
| `1f1c8ee` R4 | Test entry points / guards | none | — |
| `e66bedd`…`c0443e2` R5–R7 | owner QA pack, ledger, guard classifier, QA evidence | none | — |
| `e7a5352` R8 | Header/asset lock, D11 full audit, runtime inventory tests | none | header lock 4/4, D11 30+22 |
| later | final docs + final QA evidence | none | see FULL_HANDOFF |

## Recommended technical step after owner approval (not implemented)
P0B2-A: self-host the byte-identical OSS libraries (jQuery 3.7.1, Swiper 11.1.4, smooth-scrollbar 8.8.4, WordPress 7.1 hooks/i18n) from upstream packages, removing the merywood.com single point of failure for sliders/scroll/forms. See `docs/RUNTIME_DEPENDENCIES.md`.

Ancestry: `cb4e92f (main) ← … ← ed7324c (PR #10) ← … ← d59f50d (PR #11) ← recovery`. Never merge PR #10/#11 separately in another order.

## Release blockers (all OWNER / hard gates)
1. **LEGAL-1** BIO-A legal entity data and approved VI/EN policy text for Privacy/Cookie (currently Merywood's Estonian policy incl. info@Merywood.ee) — `docs/LEGAL_CONTENT_BLOCKERS.md`.
2. **CAREERS-1** BIO-A careers content or hide `/careers/` (options in the same file).
3. D1 private storage for the source bundle; D2 written right to use/host Merywood HTML/CSS/JS; D6 read-only token as GitHub secret + Cloudflare **Preview-only** variable, CI fetch+verify step (without it a pushed build fails closed by design).
4. D7 Cloudflare Preview branch control (today every non-main branch auto-deploys) and a Preview env without Production bindings/secrets.
5. D10 one Node version (Production 20, CI 22, local 26).
6. P0B2 (D4/D9): remaining Merywood live runtime assets and CF7 CSS.
7. Pages Functions **Fail open** → owner decision in Cloudflare (not changed here).
8. OWNER VISUAL PASS on the exact Preview hash with `docs/OWNER_QA_CHECKLIST.md`; explicit `OWNER RELEASE APPROVED <sha>`.

## Release steps (only after the gates)
1. Push the recovery branch (new name, not PR #10/#11) → Cloudflare Preview build; confirm the bundle step and the Preview hash.
2. Owner QA on that hash; close BLOCKING ledger rows.
3. Production: separate decisions on maintenance mode, Fail open/closed, D1/Sheets/Resend/Turnstile bindings (untouched by this branch). Production build also needs the bundle + token.
4. Promote by PR into `main` in ancestry order; record the Production deployment hash.

## Rollback
- Local: each commit is one purpose → `git revert <sha>`; or check out `d59f50d`. Nothing remote affected.
- Preview: delete/ignore the branch; immutable Previews `abdd7602` (d59f50d), `618a8930` (ed7324c), `3d66a846` (cb4e92f) remain.
- Production: Cloudflare Pages "Rollback to this deployment" to the last good deployment, or revert the merge on `main`; revoke the bundle token at the storage provider.
