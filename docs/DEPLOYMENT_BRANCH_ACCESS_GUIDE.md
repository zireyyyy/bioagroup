# BIO-A — Production Private / Public Preview Deployment Contract (2026-10-13)

## Current owner requirement
- Production public hosts **remain in maintenance**: `bioagroup.vn`, `www.bioagroup.vn`, `bioagroup.pages.dev`. Guest receives the existing branded 503; authorized owner keeps the original 14-day HMAC cookie session. Main/Pages site itself MUST NOT be unprotected.
- Preview hosted UI **public for convenience** on one-label deployment/branch aliases `*.bioagroup.pages.dev`, e.g. `83ab482d.bioagroup.pages.dev`. PREVIEW ONLY, not the root `bioagroup.pages.dev`.
- Preview is **read-only** for site UX: `/api/*` (including lead POST and lead config), `/_bioa-access` and unsafe HTTP methods still return private 503. All Preview content returns `X-Robots-Tag: noindex,nofollow,noarchive`, `/robots.txt` Disallow. No backend configuration data or real leads should be publicly exposed.
- Unknown/unrecognized hosts stay fail-closed; no broad wildcard that affects custom domains.
- `BIOA_SITE_MODE=maintenance` MUST remain configured in Cloudflare Production. Explicit `public` setting still publishes production if OWNER chooses later. Keep `BIOA_PREVIEW_SECRET` private. Keep Functions **fail closed** and `dist/_routes.json` covering all URLs.
- Do not send owner access URL/token to chat or commits.

## Host-mode implementation
`functions/_middleware.js` branches on *verified URL hostname* before checking `BIOA_SITE_MODE`. Preview GET/HEAD static requests pass, APIs/access paths don't; exact production hosts follow existing 14-day signed-cookie implementation. `tests/maintenance-host-gate.test.mjs` covers the three production hosts, Preview hash & branch, APIs, unknown hosts, robots, owner session/host binding and explicit public mode.

## Cloudflare Dashboard — turn automatic Production/Preview deploy ON/OFF
Owner screenshot says **Automatic deployments disabled**. GitHub Actions CI **validates**; it does not deploy to Cloudflare.
1. Sign in Cloudflare → Workers & Pages → project `bioagroup` → **Settings → Builds & deployments → Branch control** (some screens say `Settings → Builds`).
2. Production branch = `main`. Enable **automatic production branch deployments**. Save.
3. Preview branches = **All non-Production branches** (or Custom include `candidate/*`, `audit/*` and any other desired branches). Save. `None` disables Preview updates.
4. In GitHub `zireyyyy/bioagroup`: PR `Checks` / `Deployments` shows Cloudflare status/Preview URL once Cloudflare Git Integration is connected. GitHub itself does **not** host Pages or toggle its project-level deployment settings. Changes to branch controls belong in Cloudflare; you can toggle them anytime without editing GitHub source.
5. If a Preview link shows a Cloudflare login instead of the branded Bio-A maintenance page, Cloudflare **Access Policy** is an additional protection layer. Cloudflare Pages → `Settings → General → Access policy`, disable **Preview Access** (or narrow any Zero Trust Access app matching `*.bioagroup.pages.dev`); keep exact production hosts protected by middleware. Do NOT indiscriminately delete other business Access rules. Middleware cannot bypass upstream Access.
6. Cloudflare Pages Production and Preview environment secrets/bindings must remain separate; previews do not require `BIOA_PREVIEW_SECRET` for static GET, but frontend APIs remain blocked. No real lead tests on public previews.
7. After enabling deploy, trigger a **new** Production deployment from latest `main` using Cloudflare `Deployments → Retry deployment`/redeploy latest commit, or a subsequent `main` push. Do not assume GitHub push while automatic deploy is disabled updates Cloudflare. Verify deployed commit matches GitHub SHA. To get a **new** Preview deployment, push a new commit to a candidate branch and check its hash URL; older hash URLs are immutable snapshots and keep their earlier middleware.
8. Browser check incognito `bioagroup.vn`, `bioagroup.pages.dev`: maintenance 503; generated NEW hash Preview `<hash>.bioagroup.pages.dev`: Home/About visible, `/api/lead/config` blocked, `/robots.txt` Disallow.

## Pending owner QA — two narrowly scoped patches now intended for Production deployment
- Footer Zalo square on Tablet 769–1200, from passing CI candidate `6ec1ee2` (former PR #4). Await owner visible PASS at 834/1024; other layout issues NOT claimed fixed.
- Early Merywood head normalize and 769+ root scrollbar-gutter stability from CI candidate `7a5f44e` (former PR #5). Trace proved first 8px BODY shift; later 15px shift is a plausible scrollbar hypothesis, not fully attributed. Await owner real-browser scroll and navigation QA.
- Desktop >=1201 / Mobile <=768 accepted visuals are FROZEN. Tablet continues PENDING. Cloudflare Production deploy is not automatically a website-wide owner PASS.

## Rollback
Previous accepted Git source `c320f2868a46aafd141a7178c03337a1d07b3a82`; note it contains global Preview maintenance behavior. If functionality fails, make a targeted revert of the suspect patch without bypassing maintenance or prematurely publishing the production hosts. Never expose secrets.
