# Multi-stage Dockerfile for Cobra Security CLI
# Base image (pinned Node.js 20 LTS Alpine for security and minimal footprint)
FROM node:20.18.1-alpine3.20 AS base

# Install security updates, pnpm, and create non-root user
# Use --no-cache and remove cache in same layer to minimize image size
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache dumb-init curl && \
    corepack enable && \
    corepack prepare pnpm@9.15.0 --activate && \
    addgroup -g 1000 -S cobra 2>/dev/null || \
      (GROUP_NAME=$(getent group 1000 | cut -d: -f1) && \
       [ -n "$GROUP_NAME" ] && addgroup -S cobra 2>/dev/null || true) && \
    adduser -D -u 1000 -S -G cobra cobra 2>/dev/null || \
      (EXISTING_USER=$(getent passwd 1000 | cut -d: -f1) && \
       [ -n "$EXISTING_USER" ] && \
       adduser -D -u 1001 -S -G cobra cobra 2>/dev/null || \
       adduser -D -S -G cobra cobra 2>/dev/null || true) && \
    rm -rf /var/cache/apk/* && \
    apk del curl

# Dependencies stage - production dependencies only
FROM base AS deps
WORKDIR /app

# Copy only package files for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Install production dependencies with strict security
RUN pnpm install --frozen-lockfile --prod && \
    pnpm store prune && \
    rm -rf ~/.pnpm-store

# Build stage (for future TypeScript compilation)
FROM base AS build
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Add build commands here when TypeScript is added
# RUN pnpm run build

# Runtime stage - minimal production image
FROM base AS runtime
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps --chown=cobra:cobra /app/node_modules ./node_modules

# Copy application code from build stage
COPY --from=build --chown=cobra:cobra /app/package.json ./
COPY --from=build --chown=cobra:cobra /app/src ./src

# Security: Remove any potential sensitive files and set proper permissions
RUN find /app -type f -perm /u+x,g+x,o+x -exec chmod 755 {} \; && \
    find /app -type f ! -perm /u+x,g+x,o+x -exec chmod 644 {} \; && \
    find /app -type d -exec chmod 755 {} \;

# Security: Switch to non-root user before running
# Use numeric UID to avoid issues if username doesn't match
USER 1000

# Use dumb-init as PID 1 for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Default command
CMD ["node", "src/cli.js"]
