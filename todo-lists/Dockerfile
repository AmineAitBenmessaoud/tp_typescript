FROM node:23.1

<<<<<<< HEAD
# Create app directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Install TypeScript globally, if needed
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.js"]
=======
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:ts

CMD ["node","dist/index.js"]

EXPOSE 8080
>>>>>>> origin/TP2_Gabriel
