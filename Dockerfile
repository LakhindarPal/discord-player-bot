# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies with verbose output
RUN npm ci --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Install FFmpeg using apk (for Alpine Linux)
RUN apk update && apk add --no-cache ffmpeg

# Cleanup unnecessary cache to minimize image size
RUN rm -rf /var/cache/apk/* /tmp/*

# Command to run the application
CMD ["npm", "start"]