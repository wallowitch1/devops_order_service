const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');


const fs = require('fs');

const db = require('./models');
const orderRouter = require('./routes/orders');

const app = express();

// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(path.join('/var/log/app/access.log'), { flags: 'a' });

// morgan을 사용하여 액세스 로그 설정
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.redirect("http://www.devops.com");
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
