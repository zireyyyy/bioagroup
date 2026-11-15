# BIO-A — R26 end-to-end delivery: START HERE (2026-11-15)

## Where things stand

| Item | Value |
|---|---|
| Repository | `zireyyyy/bioagroup` |
| `main` (Production source) | the R26 head, fast-forwarded from the R24RC2 owner-PASS commit `a062d59`. The first R26 deploy was `36dfe57`. The docs commit that contains this file is the final `main` head; its SHA is in the ZIP name and in `FULL_HANDOFF.md` |
| Cloudflare Production | project `bioagroup`, deployment `77390256` (commit `36dfe57`), then the deployment of the final docs commit (same website output) |
| Site mode | **`BIOA_SITE_MODE=maintenance` (ON)**: `bioagroup.vn`, `bioagroup.pages.dev`, R26 Production hash URLs and `/api/*` all return 503 + `noindex` |
| CMS on Production | `CMS mode: off`: no pinned release, so Production serves repository content. **No CMS content has been released to Production** |
| CMS Preview for editors | https://cms-preview.bioagroup.pages.dev/: branch `cms-preview` = `main` (GitHub Action), live Sanity published content, rebuilt by the Sanity webhook |
| Studio | https://bioagroup.sanity.studio/ (project `hfmu7ifg`, dataset `production`) |
| PR | `zireyyyy/bioagroup#12`: merged by fast-forward |

## Read in this order

1. **`ROADMAP_FINAL_STATUS.md`**: every roadmap item with TECH PASS / CONTENT PENDING / OWNER PASS.
2. **`FINAL_QA.md`**: what was tested, the counts and the evidence paths.
3. **`DEPLOY_AND_ROLLBACK.md`**: the Production deploy, the rehearsed rollback and the CMS release/rollback.
4. **`CHANGELOG_AND_PARITY.md`**: what changed since R24RC2 and the proof that nothing visible changed.
5. Owner documents (Vietnamese):
   - `OWNER_FINAL_UAT.md`: a single 10–15 minute acceptance pass;
   - `OWNER_INPUTS_REQUIRED.md`: the 12 decisions only the owner can make;
   - `../CMS_OWNER_GUIDE_VI.md`: how to edit in Studio;
   - `MEDIA_REPLACEMENT_MAP.md`: the 41 image positions to replace later.

## Rules that still apply

- **Never** change `BIOA_SITE_MODE` without an explicit owner order.
- **Never** commit `cms/release/*` without an owner content approval (`docs/CMS_RELEASE_PLAN.md`).
- **Never** set `SANITY_*` variables on Production.
- No secret is stored in the repository, in this ZIP or in the logs. The build log was checked for the token: `secret in log: false`.
- An owner PASS is given only by the owner. R26 adds TECH PASS evidence; everything after R24RC2 waits for `OWNER_FINAL_UAT.md`.
