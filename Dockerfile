
FROM node:21-alpine
RUN mkdir -p /next-app
WORKDIR /next-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY .next ./.next
CMD [ "npm","run","dev" ]
