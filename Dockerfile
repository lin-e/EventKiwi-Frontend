FROM node:latest
COPY package.json package.json
RUN npm install
RUN ionic init
CMD ionic serve --port $PORT --nobrowser --nolivereload --noopen

