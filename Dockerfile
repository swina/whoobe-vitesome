FROM node:16.10.0

RUN npm install -g npm@8.1.3

RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app

COPY . .