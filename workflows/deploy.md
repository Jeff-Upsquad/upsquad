# UpSquad Deployment

## Overview
Deploy the UpSquad website (marketing pages + admin panel + public API) to the Hostinger VPS running Docker Compose. The app is a single Express container that serves:

- **`/`** — the static Next.js build (marketing site: home, /pricing, /lp/[slug], etc.)
- **`/admin/*`** — the admin panel (EJS-rendered; cookie auth)
- **`/api/v1/landing-pages/:slug`** — the public JSON API the landing page fetches
- **`/uploads/*`** — uploaded media

The VPS already runs `squadhub` with a Caddy reverse proxy listening on 80/443. That Caddy forwards `upsquadconnect.com` + `www.upsquadconnect.com` to this app via `host.docker.internal:3100`.

## Architecture Reference

| Detail | Value |
|---|---|
| VPS | Hostinger, Ubuntu 24.04, `72.61.245.97` |
| Deploy dir | `/opt/upsquad` |
| Git remote | `https://github.com/Jeff-Upsquad/upsquad.git` (branch `main`) |
| Docker service | `upsquad` — one Express container on host port `3100` |
| TLS + routing | Squadhub's Caddy (in `/opt/squadhub`) — listens on 80/443 |
| Public URL | https://www.upsquadconnect.com |
| Admin URL | https://www.upsquadconnect.com/admin/login |
| Persistent data | Docker volumes `upsquad_data` (SQLite DB) + `upsquad_uploads` (media) |
| Env file on VPS | `/opt/upsquad/server/.env.production` (NOT committed) |

## Pre-Deploy

1. Changes are committed and pushed to `origin/main`.
2. `npm run build --prefix client` succeeds locally (catches build breakage early — Docker will re-run it but local is faster to iterate).

## Routine Deploy

From your local repo root:

```bash
bash tools/deploy.sh
```

The script:
1. SSHes to the VPS and takes an exclusive deploy lock.
2. Pulls `origin/main` into `/opt/upsquad`.
3. If anything under `client/`, `server/`, `Dockerfile`, `docker-compose.yml`, or a lockfile changed, rebuilds the `upsquad` container and restarts it.
4. Prints container status + recent logs.

### Concurrent deploys

Only one deploy of this project can run at a time. If another one is mid-flight, this script waits (up to 10 min) and resumes automatically. If the stuck deploy never finishes, this one exits with code 78 — investigate the VPS before retrying.

## One-Time VPS Setup

This is the bootstrap you run **once**, not every deploy. The VPS already runs Docker and squadhub's Caddy.

### Quick path (recommended)

From your local repo root:

```bash
bash tools/bootstrap.sh
```

That script clones the repo, generates `SESSION_SECRET` + a bcrypt-hashed admin password, writes `server/.env.production`, builds and starts the Docker container, patches `/opt/squadhub/Caddyfile` to reverse-proxy `upsquadconnect.com` to `host.docker.internal:3100`, reloads Caddy, and runs a public smoke test. It is idempotent — re-running on an already-bootstrapped VPS is a no-op.

If you want to control the temp admin password (instead of letting the script generate one), set it as an env var:

```bash
BOOTSTRAP_ADMIN_PASSWORD='your-temp-password' bash tools/bootstrap.sh
```

Either way, **rotate the password via the admin UI immediately after first login**.

### Manual path (only if `bootstrap.sh` doesn't fit)

If you'd rather drive the bootstrap by hand — or `tools/bootstrap.sh` fails partway and you need to pick up mid-flight — the steps are:

1. Clone the repo to `/opt/upsquad`:

   ```bash
   ssh root@72.61.245.97
   mkdir -p /opt/upsquad && cd /opt/upsquad
   git clone https://github.com/Jeff-Upsquad/upsquad.git .
   git checkout main
   ```

2. Create `server/.env.production` (don't commit). Use the template:

   ```bash
   cp server/.env.production.example server/.env.production
   ```

   Generate the secrets on the VPS:

   ```bash
   # bcrypt hash of the desired admin password
   docker run --rm node:20-alpine sh -c "npm i -s bcryptjs >/dev/null && node -e 'console.log(require(\"bcryptjs\").hashSync(\"PASTE_REAL_PASSWORD_HERE\", 10))'"

   # session secret
   docker run --rm node:20-alpine node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Paste them in as `ADMIN_PASSWORD_HASH=` and `SESSION_SECRET=`. Set `ADMIN_EMAIL=jeff@upsquadconnect.com`, `PUBLIC_BASE_URL=https://www.upsquadconnect.com`, leave `CORS_ORIGINS=` empty.

3. Start the container:

   ```bash
   docker compose up -d --build
   curl -s http://localhost:3100/api/health   # → {"status":"ok","service":"UpSquad"}
   ```

4. Point squadhub's Caddy at the container. squadhub's Caddyfile (`/opt/squadhub/Caddyfile`) has an `upsquadconnect.com, www.upsquadconnect.com` block — replace it with:

   ```caddy
   upsquadconnect.com, www.upsquadconnect.com {
   	reverse_proxy host.docker.internal:3100
   }
   ```

   Then reload Caddy:

   ```bash
   cd /opt/squadhub
   docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
   ```

   (The old `/srv/profiles/*` directories are left untouched — clean up later if you don't need the old static Profiles site.)

### Verify

```bash
curl -I https://www.upsquadconnect.com
curl -I https://www.upsquadconnect.com/admin/login
curl https://www.upsquadconnect.com/api/v1/landing-pages/get-started
```

Then in a browser:
1. https://www.upsquadconnect.com/admin/login — sign in, **rotate the password** (especially if it was the auto-generated one printed by `bootstrap.sh`).
2. Edit the `get-started` landing page, paste real video/audio URLs or upload files, save.
3. https://www.upsquadconnect.com/lp/get-started/ — reload to see the content.
4. Open https://www.upsquadconnect.com/ (home) and https://www.upsquadconnect.com/pricing/ — should render as before.

## Known Gotchas

1. **`server/.env.production` must exist on the VPS before `docker compose up`**, or the container will crash on start (no `SESSION_SECRET` → JWT signing fails on login).
2. **Port 3100 must stay firewalled.** Hostinger's default firewall blocks it externally, but if you tighten rules, make sure 3100 is open only to `127.0.0.1` + the docker bridge interface so the outside world can't bypass Caddy.
3. **Squadhub's Caddy owns 80/443 on this VPS.** Don't try to add a second Caddy or expose upsquad's container directly on 80/443 — you'll fight for ports.
4. **Persistent data lives in Docker volumes, not the repo.** `docker compose down -v` will wipe the SQLite DB and all uploaded media. Use `docker compose down` (without `-v`) when restarting the stack.
5. **Caddyfile changes are a one-off task**, not part of routine deploy. The Caddyfile lives in the squadhub repo (`/opt/squadhub/Caddyfile`). Only squadhub's deploy reloads Caddy.
6. **Rotating secrets requires a container restart**: edit `server/.env.production`, then `docker compose up -d --force-recreate upsquad`.
