FROM node

copy ./package.json /tmp/

RUN cd /tmp && npm i

RUN mv /tmp/node_modules /usr/lib/

ENV NODE_PATH /usr/lib/node_modules

WORKDIR /srv

VOLUME /srv

CMD npm start
