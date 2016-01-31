FROM node

ENV NODE_PATH /usr/lib/node_modules

ENV PATH $PATH:./node_modules/.bin:/usr/lib/node_modules/.bin

WORKDIR /srv

ENTRYPOINT /usr/local/bin/npm start

COPY ./package.json /usr/lib/

RUN cd /usr/lib/ && /usr/local/bin/npm i
