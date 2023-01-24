FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
COPY ./src/db/config.js ./dist/src/db/config.js
COPY ./src/.sequelizerc ./dist/src/.sequelizerc
RUN ls -la &\
  cd ./dist/src &\
  ls -la &\
  npx sequelize-cli db:migrate
CMD [ "npm", "start" ]
