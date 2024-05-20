# ./client/static/Dockerfile
FROM node:16-alpine

WORKDIR /static

COPY package*.json ./

RUN npm install -g serve

COPY . ./

EXPOSE 3000

CMD ["serve", "-s", "dist"]