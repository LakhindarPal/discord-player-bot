ARG NODE_VERSION=20-bookworm-slim

# Stage 1: Build Stage
FROM node:${NODE_VERSION} AS build

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install necessary dependencies only
RUN npm ci --omit=dev --omit=optional

# Install mediaplex
RUN npm install mediaplex

# Copy the rest of the application code
COPY src/ ./src/
COPY scripts/register.js ./scripts/register.js

# Stage 2: Runtime Stage
FROM node:${NODE_VERSION} AS runtime

# Set the working directory inside the container
WORKDIR /usr/app

# Copy from the build stage
COPY --from=build /usr/app ./

# Install FFmpeg using apt-get
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Cleanup unnecessary packages to minimize image size
RUN apt-get autoremove -y

# Command to run the application
CMD ["npm", "start"]
