const express = require("express");
const cors = require("cors");
const router = require("./router");
const bodyParser = require("body-parser");

const app = express();

// app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(router);
module.exports = app;
