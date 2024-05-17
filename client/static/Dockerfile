# ./client/static/Dockerfile
FROM node:16-alpine

WORKDIR /static

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "build"]
