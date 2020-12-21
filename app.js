// app.js
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/main");
app.use("/", router);


module.exports = app;
