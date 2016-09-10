# source image from https://hub.docker.com/
FROM node

# set path used by nodejs to lookup node_modules
ENV NODE_PATH /app/node_modules

# extend default binary lookup files to allow usage of binary files without full path specified
ENV PATH $PATH:./node_modules/.bin:/app/node_modules/.bin

# directory where all commands are executed ENTRYPOINT, CMD, RUN
WORKDIR /app/dev

# add package.json during image build to be able to do npm install
COPY ./package.json /app/

# run npm install
RUN cd /app && npm i

# default command to be executed on 'docker run'/'soos' command
CMD [ "npm", "start" ]
 
