FROM node:10.15

RUN npm i -g webpack

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY package*.json ./

RUN npm i

EXPOSE 8080

CMD ["npm", "run", "dev"]