FROM node

ENV NODE_PATH /usr/lib/node_modules

ENV PATH $PATH:./node_modules/.bin

WORKDIR /srv

VOLUME /srv

CMD npm start

COPY ./package.json /usr/lib/

RUN cd /usr/lib/ && npm i
