FROM node:18

WORKDIR /usr/src/app

COPY order/package*.json ./

RUN npm install

RUN npm install mysql cookie-parser body-parser express-session session-file-store method-override jsonwebtoken express ejs

COPY order/. .

EXPOSE 3003

CMD [ "node", "index.js" ]
