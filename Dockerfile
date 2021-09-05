FROM node:16-alpine

RUN mkdir service
WORKDIR /service

COPY /api /service

RUN npm install

CMD ["node", "index.js"]

