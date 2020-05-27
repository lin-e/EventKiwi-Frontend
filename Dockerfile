FROM node:latest
COPY package.json package.json
RUN npm install --dev
RUN npm install -g ionic
CMD ionic serve --port $PORT --nobrowser --nolivereload --noopen
