# 1. Dependency installation stage
FROM oven/bun:alpine AS install
WORKDIR /temp

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# 2. Final runtime image
FROM oven/bun:alpine AS release
WORKDIR /usr/src/app

# Install runtime ffmpeg
RUN apk add --no-cache ffmpeg

ENV NODE_ENV=production

# Copy dependencies and source code
COPY --from=install /temp/node_modules ./node_modules
COPY package.json tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

USER bun

CMD ["bun", "run", "src/index.ts"]