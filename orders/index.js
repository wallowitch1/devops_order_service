const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");



const db = require('./models');
const orderRouter = require('./routes/orders');

const app = express();
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
