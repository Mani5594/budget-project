FROM node:lts-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3100

RUN npm run build

CMD ["node", "dist/main.js"]