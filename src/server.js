const routes = require("./routes");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const { Console } = require("console");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static("."));

app.use(cors());

app.options("*", cors());

const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://matias:matias@climacellcluster.aj159.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Could not connect to database" + err));

mongoose.connection.on("connected", () => {
  const csvFilesPath = path.join(__dirname, '..', 'csv_data');
  const fileNames = fs.readdirSync(csvFilesPath);
  const { addWeatherForecastsFromCSV } = require('./api/components/weather-forecast/controller');

  console.log('Starting to insert CSV Files');
  fileNames.forEach((file => {
    addWeatherForecastsFromCSV(file);
  }))

  app.use("/", routes);
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
})