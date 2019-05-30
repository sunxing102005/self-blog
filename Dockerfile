FROM node:alpine
RUN mkdir -p /opt/data/
WORKDIR /opt/data
COPY . /opt/data
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN npm run compile
EXPOSE 8362
CMD DEBUG=* node production.js