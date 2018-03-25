FROM node:9.5.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN quasar buid
RUN rm -rf ./src && rm -rf ./build

ENV PORT=8080
EXPOSE 8080

CMD [ "quasar" ]
