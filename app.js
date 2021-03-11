const routes = require("./routes");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static("."));

app.use(cors());

app.options("*", cors());

app.use("/", routes);

module.exports = app;
