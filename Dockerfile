FROM node:16.15.1-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

#Framework specific to NestJS
RUN npm i --location=global @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build

CMD [ "sh", "-c", "npm run start:prod"]
