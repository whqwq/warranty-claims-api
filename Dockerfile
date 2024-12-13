FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# 安装依赖
RUN npm install

COPY . .

EXPOSE 8300

CMD ["npm", "run", "start"]
