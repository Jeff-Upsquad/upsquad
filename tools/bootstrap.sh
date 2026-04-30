#!/usr/bin/env bash
set -euo pipefail

# One-time VPS bootstrap for the upsquad project. Idempotent — re-running
# detects an already-bootstrapped VPS and exits without changes.
#
# What it does on the VPS (root@72.61.245.97 by default):
#   1. Clones the repo to /opt/upsquad
#   2. Generates SESSION_SECRET + bcrypt(ADMIN_PASSWORD) and writes
#      server/.env.production (chmod 600)
#   3. Builds + starts the upsquad Docker container
#   4. Patches /opt/squadhub/Caddyfile to reverse-proxy upsquadconnect.com
#      to host.docker.internal:3100, then reloads Caddy
#   5. Smoke-tests the public URL
#
# Inputs (env vars, optional):
#   UPSQUAD_VPS              ssh target (default: root@72.61.245.97)
#   ADMIN_EMAIL              admin login email (default: jeff@upsquadconnect.com)
#   BOOTSTRAP_ADMIN_PASSWORD plaintext temp admin password.
#                            If unset, a random 16-char password is generated
#                            and printed at the end. Either way, rotate it
#                            via the admin UI immediately after first login.
#
# After bootstrap, routine deploys are: bash tools/deploy.sh

VPS="${UPSQUAD_VPS:-root@72.61.245.97}"
ADMIN_EMAIL="${ADMIN_EMAIL:-jeff@upsquadconnect.com}"

if [ -z "${BOOTSTRAP_ADMIN_PASSWORD:-}" ]; then
    BOOTSTRAP_ADMIN_PASSWORD="$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 16)"
    GENERATED_PASSWORD=true
else
    GENERATED_PASSWORD=false
fi

echo "=== UpSquad Bootstrap ==="
echo "VPS:        $VPS"
echo "Admin:      $ADMIN_EMAIL"
echo

# Bail early if already bootstrapped — this script is for first-time setup.
if ssh "$VPS" "[ -d /opt/upsquad/.git ] && [ -f /opt/upsquad/server/.env.production ]"; then
    echo "VPS already bootstrapped (/opt/upsquad/.git and server/.env.production both exist)."
    echo "Use 'bash tools/deploy.sh' for routine deploys."
    exit 0
fi

# Pass the password via base64 so special chars don't bite the SSH heredoc.
PASSWORD_B64=$(printf '%s' "$BOOTSTRAP_ADMIN_PASSWORD" | base64 | tr -d '\n')
ADMIN_EMAIL_B64=$(printf '%s' "$ADMIN_EMAIL" | base64 | tr -d '\n')

# shellcheck disable=SC2087
ssh "$VPS" "bash -s" <<REMOTE
set -euo pipefail

ADMIN_EMAIL=\$(echo '$ADMIN_EMAIL_B64' | base64 -d)
ADMIN_PASSWORD=\$(echo '$PASSWORD_B64' | base64 -d)

# 1. Clone repo
mkdir -p /opt/upsquad
cd /opt/upsquad
if [ ! -d .git ]; then
    git clone https://github.com/Jeff-Upsquad/upsquad.git .
fi
git checkout main
git pull origin main

# 2. Generate secrets (only if env file is missing — don't clobber existing creds)
if [ ! -f server/.env.production ]; then
    HASH=\$(docker run --rm node:20-alpine sh -c \\
        "npm i -s bcryptjs >/dev/null && node -e 'console.log(require(\"bcryptjs\").hashSync(process.argv[1], 10))' \"\$ADMIN_PASSWORD\"")
    SESSION_SECRET=\$(docker run --rm node:20-alpine \\
        node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))')

    # Compose v2 interpolates \$ in env_file values (so a bcrypt hash like
    # \$2b\$10\$abc... gets \$abc treated as a variable and erased). Escape \$ → \$\$
    # so the literal hash reaches the container intact.
    HASH_ESCAPED=\$(printf '%s' "\$HASH" | sed 's/\\\$/\\\$\\\$/g')

    # printf avoids any shell expansion of \$ inside the bcrypt hash
    printf 'ADMIN_EMAIL=%s\nADMIN_PASSWORD_HASH=%s\nSESSION_SECRET=%s\nPUBLIC_BASE_URL=https://www.upsquadconnect.com\nCORS_ORIGINS=\n' \\
        "\$ADMIN_EMAIL" "\$HASH_ESCAPED" "\$SESSION_SECRET" > server/.env.production
    chmod 600 server/.env.production
    echo "Wrote server/.env.production"
else
    echo "server/.env.production already exists — leaving it alone"
fi

# 3. Build + start
docker compose up -d --build

# 4. Local health check
sleep 5
echo "--- Health check (localhost:3100) ---"
curl -fsS http://localhost:3100/api/health && echo

# 5. Patch squadhub's Caddyfile (idempotent — replaces existing block if present)
CADDYFILE=/opt/squadhub/Caddyfile
if [ -f "\$CADDYFILE" ]; then
    cp "\$CADDYFILE" "\$CADDYFILE.bak.\$(date +%s)"
    python3 - <<'PYEOF'
import re, pathlib
p = pathlib.Path("/opt/squadhub/Caddyfile")
src = p.read_text()
new_block = "upsquadconnect.com, www.upsquadconnect.com {\n\treverse_proxy host.docker.internal:3100\n}"
pat = re.compile(r"^upsquadconnect\.com[^{]*\{[^}]*\}\s*", re.MULTILINE | re.DOTALL)
if pat.search(src):
    if new_block in src:
        print("Caddyfile already has the upsquadconnect.com block — no change.")
    else:
        src = pat.sub(new_block + "\n\n", src, count=1)
        p.write_text(src)
        print("Replaced existing upsquadconnect.com block in Caddyfile.")
else:
    src = src.rstrip() + "\n\n" + new_block + "\n"
    p.write_text(src)
    print("Appended upsquadconnect.com block to Caddyfile.")
PYEOF

    # 6. Reload Caddy
    cd /opt/squadhub
    docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
    cd /opt/upsquad
else
    echo "WARNING: /opt/squadhub/Caddyfile not found — skipping reverse-proxy setup."
fi

# 7. Public smoke
echo "--- Public smoke tests ---"
curl -sI https://www.upsquadconnect.com | head -1 || true
curl -sI https://www.upsquadconnect.com/admin/login | head -1 || true
echo "=== Bootstrap complete ==="
REMOTE

echo
echo "Bootstrap done. Sign in at https://www.upsquadconnect.com/admin/login"
echo "  Email:    $ADMIN_EMAIL"
if [ "$GENERATED_PASSWORD" = true ]; then
    echo "  Password: $BOOTSTRAP_ADMIN_PASSWORD   (generated — rotate immediately via admin UI)"
else
    echo "  Password: <the value you supplied via BOOTSTRAP_ADMIN_PASSWORD>"
fi
