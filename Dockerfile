FROM node:8.11.4-slim
WORKDIR /usr/src/app
RUN npm install -g pm2
RUN npm install -g yarn
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build \
  && rm -rf node_modules \
  && yarn --production --frozen-lockfile
EXPOSE 3000
CMD pm2-runtime start pm2.json