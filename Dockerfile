FROM node:12
WORKDIR /usr/src/elciess-ms-auth-controll
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5050
CMD npm start