# Located in ./frontend/Dockerfile
FROM node:16-alpine

WORKDIR /static

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]
