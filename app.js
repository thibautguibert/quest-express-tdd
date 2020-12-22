// app.js
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./routes");
app.use("/", router);


module.exports = app;
