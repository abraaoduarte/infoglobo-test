FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
