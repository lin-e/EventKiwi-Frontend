FROM node:latest
COPY package.json package.json
RUN npm install --dev
RUN npm install -g ionic
RUN npm install -g react-scripts
CMD ionic serve --port $PORT --nobrowser --nolivereload --noopen
