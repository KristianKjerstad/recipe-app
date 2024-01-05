FROM node:20.7.0-alpine

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

EXPOSE 5173
# USER 1000
CMD ["npm", "run", "dev"]
