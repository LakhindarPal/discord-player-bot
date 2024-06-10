# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Command to run the application
CMD ["npm", "start"]
