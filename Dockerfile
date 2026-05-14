FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Docker будет повторять этот процесс вечно благодаря циклу в index.js
CMD ["node", "index.js"]