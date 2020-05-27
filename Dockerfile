FROM node:latest
COPY package.json package.json
COPY dist/ dist/
COPY node_modules/ node_modules/
RUN npm install -g ionic
CMD ionic serve --port $PORT --nobrowser --nolivereload --noopen
