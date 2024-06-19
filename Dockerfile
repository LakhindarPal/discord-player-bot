# Use the Bookworm Node.js image as the base image
FROM node:20-bookworm-slim

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install necessary dependencies only
RUN npm ci --omit=dev --no-optional \
  && npm cache clean --force

# Install mediaplex
RUN npm install mediaplex

# Install FFmpeg using apt-get
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Cleanup unnecessary packages to minimize image size
RUN apt-get autoremove -y

# Copy the rest of the application code
COPY src/ ./src/

# Command to run the application
CMD ["npm", "start"]