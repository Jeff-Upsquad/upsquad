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

### 1. Clone the repo to `/opt/upsquad`

```bash
ssh root@72.61.245.97
mkdir -p /opt/upsquad && cd /opt/upsquad
git clone https://github.com/Jeff-Upsquad/upsquad.git .
git checkout main
```

### 2. Create `server/.env.production`

On the VPS:

```bash
cd /opt/upsquad
cp server/.env.production.example server/.env.production
```

Fill in the three secrets. You can generate them right on the VPS:

```bash
# Generate a bcrypt hash of the desired admin password
docker run --rm node:20-alpine sh -c "npm i -s bcryptjs >/dev/null && node -e 'console.log(require(\"bcryptjs\").hashSync(\"PASTE_REAL_PASSWORD_HERE\", 10))'"

# Generate the session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the outputs into `server/.env.production` as `ADMIN_PASSWORD_HASH=` and `SESSION_SECRET=`. Set `ADMIN_EMAIL=jeff@upsquadconnect.com`, `PUBLIC_BASE_URL=https://www.upsquadconnect.com`, and leave `CORS_ORIGINS=` empty.

### 3. Start the container

```bash
cd /opt/upsquad
docker compose up -d --build
docker compose ps
curl -s http://localhost:3100/api/health
```

You should see `{"status":"ok","service":"UpSquad"}`.

### 4. Point squadhub's Caddy at this container

squadhub's Caddyfile (`/opt/squadhub/Caddyfile`) currently has an `upsquadconnect.com, www.upsquadconnect.com` block serving the old static Profiles site from `/srv/profiles/*`. Replace that whole block with:

```caddy
upsquadconnect.com, www.upsquadconnect.com {
	reverse_proxy host.docker.internal:3100
}
```

Commit that change to the squadhub repo on `main`, then on the VPS:

```bash
cd /opt/squadhub
git pull origin main
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

Note: the old `/srv/profiles/*` directories are left untouched — if you later decide you don't need the Profiles static site at all, you can delete those separately.

### 5. Verify

```bash
curl -I https://www.upsquadconnect.com
curl -I https://www.upsquadconnect.com/admin/login
curl https://www.upsquadconnect.com/api/v1/landing-pages/get-started
```

Then in a browser:
1. https://www.upsquadconnect.com/admin/login — sign in, rotate the password if it's the same as dev.
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
