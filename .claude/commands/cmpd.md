---
description: Commit, merge to main, push to origin, and deploy to the Hostinger VPS.
---

# CMPD — Commit · Merge · Push · Deploy

Full release workflow for the upsquad website. Invoked when the user says "CMPD" or `/cmpd`.

## Preconditions
- User has authorized the release.
- SSH to `root@72.61.245.97` is working.
- You are on a feature branch (the `block-edits-on-main.sh` hook blocks edits on `main` — create one first if needed).
- All intended code changes are in the working tree.

## 1. Commit

- Run `git status -s` and `git diff` to understand the changes.
- Scan for anything that looks like a secret (`.env`, `credentials.json`, `token.json`). Refuse to stage those.
- Stage files **by name** (`git add path/to/file`) — never `-A` or `.`.
- Draft a concise subject line focused on the *why*, optional body for context.
- Append the standard trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- Commit via a HEREDOC so the message format is preserved.

## 2. Merge

- `git checkout main`
- `git merge --ff-only <feature-branch>` — refuse to create merge commits. If fast-forward fails, stop and report.

## 3. Push

- `git push origin main`. Verify the before/after SHAs from the output.

## 4. Deploy (to the VPS)

Run `bash tools/deploy.sh` from the repo root. The script:

- SSHes to the VPS as `root@72.61.245.97`
- Holds a flock at `/var/lock/upsquad-deploy.lock` (10 min timeout) so two deploys can't race
- Pulls `origin/main` into `/opt/upsquad` (the live Docker working tree)
- Detects whether anything in `client/`, `server/`, `Dockerfile`, `docker-compose.yml`, `package.json`, or `package-lock.json` changed
- If yes: `docker compose build upsquad && docker compose up -d upsquad`
- If only docs / workflows changed: skips the rebuild
- Prints `docker compose ps` and the last 30 log lines

You don't need to SSH manually. Just:

```bash
bash tools/deploy.sh
```

A `bootstrap.sh` exists for first-time VPS setup (creates `/opt/upsquad`, seeds `server/.env.production`). That's a one-off — you should never need it on an existing host.

## 5. Verify

Hit the live URL for the specific thing that changed:

```bash
curl -sL https://upsquadconnect.com/<route> | grep -oE "<expected-string>"
```

If the change isn't there, check `pm2 logs upsquad --lines 30 --nostream` or re-inspect `server/public/<route>/index.html` on the VPS.

## Architecture Reference

| Piece | Value |
|---|---|
| VPS | `root@72.61.245.97` (shared with squadhub) |
| Deploy dir | `/opt/upsquad` (git clone of `origin/main`, managed by `tools/deploy.sh`) |
| Process | Docker container `upsquad`, image `upsquad-upsquad`, listening on `:3100` |
| TLS + routing | squadhub's Caddy → `host.docker.internal:3100` (Caddyfile lives in `/opt/squadhub`) |
| Live URL | https://upsquadconnect.com (also `www.upsquadconnect.com`) |
| Admin URL | https://upsquadconnect.com/admin/login |
| Static build output | baked into the container image at build time (Next.js `output: 'export'` + `distDir: '../server/public'`) |
| Env file | `/opt/upsquad/server/.env.production` (NOT committed) |

## Pitfalls

- **Main-branch hook** blocks edits on `main`. If you see it, `git checkout -b <name>` and retry.
- **Stale committed Caddyfile**: `/opt/squadhub/Caddyfile` as committed in the squadhub repo is out of date vs. what's actually running on the VPS. Don't trust it — read the live file on the VPS if routing questions come up.
- **Container-cached static files**: `server/public/` is baked into the image at build time. If you only change static assets and skip the rebuild step, the live site keeps serving the old assets. `tools/deploy.sh` rebuilds when anything in `client/` changes — don't bypass it.
- **`/root/upsquad` exists but is dead**: an old pm2-based deploy lives at `/root/upsquad`. Caddy does not route to it. Don't deploy there.
