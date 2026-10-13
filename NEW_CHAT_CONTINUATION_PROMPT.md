# BIO-A NEW CHAT CONTINUATION — 2026-10-13 OWNER DIRECTED PRODUCTION SOURCE

Repository: https://github.com/zireyyyy/bioagroup
Read `START_HERE.md`, `FULL_HANDOFF.md`, `AGENTS.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md`, `docs/DEPLOYMENT_BRANCH_ACCESS_GUIDE.md` before edits.

Owner explicit request: current candidate UI patches may be pushed to `main` so site can be QA'd on existing host; **do not imply Cloudflare deployed when automatic production deployments are disabled**. Source release combines tested Footer Tablet Zalo square fix (PR #4/`6ec1ee2`) and source-first paint and scrollbar stability (PR #5/`7a5f44e`), plus host-scoped middleware gate.

New private/public contract: exact `bioagroup.vn`, `www.bioagroup.vn`, `bioagroup.pages.dev` remain 14-day owner-session private unless explicit BIOA_SITE_MODE=public in Production. Every one-label hash/branch `*.bioagroup.pages.dev` is publicly viewable for static GET/HEAD with noindex, robots Disallow; Preview `/api/*`, lead config/submit, owner session routes and unsafe methods blocked. Environment protection and Access Policy changes may need Cloudflare dashboard action. Fail closed mandatory. No test leads on public previews.

Current confidence: GitHub code CI separately green for both UI candidates; owner visual approval **NOT** granted; Tablet remains PENDING and Desktop/Mobile prior PASS frozen. Source rollback `c320f2868a46aafd141a7178c03337a1d07b3a82` (note rollback restores globally locked Previews). QA Desktop/Tablet/Mobile VI/EN plus production/Preview host privacy matrix after Cloudflare deployment.

GitHub Actions validates, Cloudflare Pages deploys with its own Git integration. Owner can enable automatic Production `main` and Preview `All non-Production branches` in Cloudflare Branch control; do not claim toggled by GitHub code.
