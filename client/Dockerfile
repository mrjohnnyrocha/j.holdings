# ./client/Dockerfile
FROM node:22-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install -g serve

COPY . ./

EXPOSE 3000

CMD ["serve", "-s", "dist"]

#CMD ["npx", "serve", "-s", "dist", "-l", "9001"]