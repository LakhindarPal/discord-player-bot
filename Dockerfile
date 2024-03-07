FROM node:latest
WORKDIR /home/discord-player-bot
COPY . .
RUN npm install
CMD ["npm", "start"]