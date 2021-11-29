# develop stage
FROM node:12.18-alpine as develop-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY quiniela-front/package.json ./

RUN yarn install

CMD ["yarn", "serve"]
