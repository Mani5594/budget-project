#build stage
FROM node:lts-alpine3.18 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#run stage

FROM node:lts-alpine3.18

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json .

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3100

CMD [ "node", "dist/main.js" ]