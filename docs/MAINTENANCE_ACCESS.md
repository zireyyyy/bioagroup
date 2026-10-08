# Bio-A Site Maintenance / Private Preview

**Candidate: MAINTENANCE-PRIVATE1 — owner runtime test pending.** This is server-side private preview for Cloudflare Pages; no Home or shared component changed.

## Cloudflare Settings, BEFORE relying on privacy
1. Pages project bioagroup → Settings → Runtime → **Fail open/closed: Fail closed** (mandatory; Fail open leaks static assets if Functions allowance is exhausted).
2. Pages project bioagroup → Settings → Production → Variables and secrets → Add **Secret** `BIOA_PREVIEW_SECRET`. Generate 48 random hex characters privately. Windows PowerShell: `$b=New-Object byte[] 24; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); ($b | ForEach-Object { $_.ToString('x2') }) -join ''`. Never send token to chat/GitHub.
3. Optional Text `BIOA_SITE_MODE` = `maintenance`. Missing value defaults to maintenance and missing secret also fails closed. **Do not set public.**
4. Redeploy new main (env secret changes need deployment). Confirm deployed SHA.
5. Owner's private link, constructed locally: `https://bioagroup.vn/_bioa-access?key=YOUR_SECRET` (replace only YOUR_SECRET with privately generated value). Valid key signs 8h HttpOnly/Secure host-only cookie, HTTP 303 removes key from URL. Never share link or post it in public tools.
6. Each distinct hostname/device/browser has separate cookie. Use same access link on bioagroup.pages.dev if testing there. Preview environment must also set Secret or is locked.
7. Sign out `https://bioagroup.vn/_bioa-access/exit` or clear browser cookies. Rotate secret and redeploy to invalidate all sessions.

## Required checks
- Guest incognito visits domain /, /blog/, /en/: maintenance 503; /api/lead/config and /assets/*: 503; /robots.txt: Disallow.
- Guest pages.dev and preview hashes: same gate; all routing intercepted through build output `dist/_routes.json` include /* and exclude [].
- Valid private link redirects and shows real site; navigation/JS/assets/API work; owner tests VI/EN and Desktop/Tablet/Mobile. Wrong key, expired or modified cookie fails.
- Production Fail closed verified (otherwise site is not private).
- D1 and Google Sheets receive a single owner test lead. Turnstile live challenge negative test remains pending. Resend email remains pending.

## Publish only after owner approval
Set Production Text `BIOA_SITE_MODE=public`, redeploy. Middleware passes website/API normally and default build robots rules apply. Do not delete gate as workaround.

## Rollback warning
Before patch: 0446f80cbf008370fe5a677909cce8e951719ae9. Rolling back removes maintenance protection, exposing site unless separate Cloudflare Access is active.
