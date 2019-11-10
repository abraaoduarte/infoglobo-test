FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python

RUN npm install

COPY . .

RUN echo "Based on commit:"

EXPOSE 3000

CMD ["npm", "start"]
