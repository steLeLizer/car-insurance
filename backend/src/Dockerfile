FROM node:16
WORKDIR /stefan/src/app
COPY ../package*.json ./
COPY ../tsconfig*.json ./
COPY ../jest*.json ./
RUN npm install -g nestjs
RUN npm install
COPY . ./src
