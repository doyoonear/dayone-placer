FROM node:16-alpine

RUN mkdir service
WORKDIR /service

COPY . /service

RUN npm install
RUN cd app && npm run build

EXPOSE 3000

CMD ["node", "api/index.js"]
