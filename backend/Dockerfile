FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python

RUN npm install -g yarn

RUN yarn install --network-timeout 1000000

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
