FROM node:23.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:ts

CMD ["node","dist/index.js"]

EXPOSE 8080