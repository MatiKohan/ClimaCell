const routes = require("./routes");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static("."));

app.use(cors());

app.options("*", cors());

const dbUrl = 'mongodb://localhost:27017/mydb';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Could not connect to database"));

app.use("/", routes);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));