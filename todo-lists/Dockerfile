FROM node:23.1
# Create app directory in container
WORKDIR /app
COPY package.json package-lock.json ./
# Install app dependencies  


RUN npm install

COPY . .

CMD ["node", "index.js"]

EXPOSE 3000