FROM node:latest
WORKDIR /home/deejay-stereo
COPY . .
RUN npm install
CMD ["npm", "start"]