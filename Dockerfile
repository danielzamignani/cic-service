FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

CMD ["./wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start:prod"]
