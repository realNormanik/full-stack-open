FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install --save-dev nodemon

COPY . .

CMD ["npm", "run", "dev"]