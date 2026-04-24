#!/usr/bin/env bash
set -euo pipefail

# Deploys the upsquad project to the Hostinger VPS.
# Mirrors the squadhub deploy pattern: SSH in, pull origin/main, detect
# what changed, rebuild only affected Docker services, reload Caddy if the
# reverse-proxy config (which lives in /opt/squadhub/Caddyfile) was touched.
#
# Concurrent-deploy safety is handled via a flock on the VPS. If another
# deploy of THIS project is in progress, this script waits up to 10 min.

VPS="${UPSQUAD_VPS:-root@72.61.245.97}"
DEPLOY_DIR="/opt/upsquad"
LOCK_FILE="/var/lock/upsquad-deploy.lock"
LOCK_TIMEOUT=600

echo "=== UpSquad Deploy ==="
echo ""

BEFORE_SHA=$(ssh "$VPS" "cd $DEPLOY_DIR && git rev-parse HEAD")
echo "Current VPS commit: ${BEFORE_SHA:0:7}"

if ! ssh "$VPS" "flock -n $LOCK_FILE true" 2>/dev/null; then
    echo "Another deploy is in progress on the VPS. Waiting up to ${LOCK_TIMEOUT}s..."
fi

set +e
ssh "$VPS" "flock -w $LOCK_TIMEOUT -E 78 $LOCK_FILE bash -s" <<'REMOTE'
set -euo pipefail
cd /opt/upsquad

BEFORE_SHA=$(git rev-parse HEAD)
echo ""
echo "Pulling latest from origin/main..."
git pull origin main
AFTER_SHA=$(git rev-parse HEAD)
echo "New VPS commit: ${AFTER_SHA:0:7}"

if [ "$BEFORE_SHA" = "$AFTER_SHA" ]; then
    echo ""
    echo "No new changes to deploy. VPS is already up to date."
    echo ""
    docker compose ps
    exit 0
fi

CHANGED_FILES=$(git diff --name-only "$BEFORE_SHA" "$AFTER_SHA")
echo ""
echo "Changed files:"
echo "$CHANGED_FILES"
echo ""

# Decide what to rebuild. The app is one service (upsquad), so any code /
# Dockerfile / compose / lockfile / client-side env change rebuilds it.
REBUILD=false
if echo "$CHANGED_FILES" | grep -qE '^(client/|server/|Dockerfile$|docker-compose\.yml$|package\.json$|package-lock\.json$)'; then
    REBUILD=true
fi

if [ "$REBUILD" = true ]; then
    echo "Rebuilding upsquad container..."
    docker compose build upsquad
    docker compose up -d upsquad
else
    echo "Changes detected but none require a rebuild (docs / workflows only)."
fi

# If Caddyfile changed IN THIS REPO we'd reload Caddy, but Caddy config for
# upsquadconnect.com lives in /opt/squadhub/Caddyfile and is managed by the
# squadhub deploy. Any route change there is a one-off task, not part of this
# routine deploy.

echo ""
docker compose ps
echo ""
echo "--- Recent logs (last 30 lines) ---"
docker compose logs --tail 30 upsquad
REMOTE
RC=$?
set -e

if [ "$RC" = "78" ]; then
    echo "Timed out after ${LOCK_TIMEOUT}s waiting for concurrent deploy to finish." >&2
    echo "Investigate the stuck deploy on the VPS before retrying." >&2
    exit 78
elif [ "$RC" != "0" ]; then
    exit "$RC"
fi

AFTER_SHA=$(ssh "$VPS" "cd $DEPLOY_DIR && git rev-parse HEAD")

if [ "$BEFORE_SHA" = "$AFTER_SHA" ]; then
    exit 0
fi

echo ""
echo "=== Deployed ${BEFORE_SHA:0:7} → ${AFTER_SHA:0:7} ==="
echo "Live at: https://www.upsquadconnect.com"
echo "Admin:   https://www.upsquadconnect.com/admin/login"
