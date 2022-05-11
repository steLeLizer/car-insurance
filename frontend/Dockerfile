FROM node:16
WORKDIR /stefan/frontend/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./tailwind*.js ./
RUN npm install -g npm
RUN npm install
COPY ./public ./public
COPY ./src ./src
