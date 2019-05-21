FROM node:8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3003

CMD ["node", "./server/index.js"]