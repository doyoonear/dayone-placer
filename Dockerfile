FROM node:16-alpine

WORKDIR /service

COPY . /service

RUN npm install
RUN cd app && npm run build

RUN npm i pm2 -g
CMD cd ./api && pm2-runtime start ecosystem.config.js

EXPOSE 3000
