FROM node:18

WORKDIR /usr/src/app

COPY orders/package*.json ./

RUN npm install

RUN npm install mysql cookie-parser body-parser express-session session-file-store method-override jsonwebtoken express ejs morgan

COPY orders/. .

EXPOSE 3003

CMD [ "node", "index.js" ]
