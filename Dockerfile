FROM node:20-alpine AS builder
WORKDIR /app

# better-sqlite3 is a native module — needs these during npm install
RUN apk add --no-cache python3 make g++

# Install client deps
COPY client/package.json client/package-lock.json* ./client/
RUN npm install --prefix client --no-audit --no-fund

# Install server deps
COPY server/package.json server/package-lock.json* ./server/
RUN npm install --prefix server --no-audit --no-fund

# Copy source
COPY client/ ./client/
COPY server/ ./server/

# Build Next.js static export -> writes to ../server/public per next.config.mjs
ENV NODE_ENV=production
RUN npm run build --prefix client


# ---- Runtime image ----
FROM node:20-alpine
WORKDIR /app/server

ENV NODE_ENV=production

# Copy the built server (includes public/ which holds the static Next output)
COPY --from=builder /app/server/ ./

# Persistent dirs — mounted from volumes at runtime
RUN mkdir -p /app/server/data /app/server/uploads

EXPOSE 3100

CMD ["node", "index.js"]
