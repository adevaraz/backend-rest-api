# syntax=docker/dockerfile:1

FROM node:16.17.0
ENV NODE_ENV=production

WORKDIR /app
COPY ["/app/package.json", "/app/package-lock.json*", "./"]
RUN npm install --production

COPY /app .

CMD ["node", "index.js"]