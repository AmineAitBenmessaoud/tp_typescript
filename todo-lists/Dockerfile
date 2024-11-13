FROM node:23.1
# Create app directory in container
WORKDIR /app
COPY . .

RUN npm install -g fastify-cli

RUN npm install

RUN npm run build:ts

CMD ["node","dist/index.js"]

EXPOSE 3000