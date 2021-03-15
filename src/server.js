const routes = require("./routes");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { readCSV } = require("./utilities/csv_handler");
const { getData, insertWeatherForecasts } = require("./../src/api/components/weather-forecast/service");

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

weather_forecasts = [
  {
    Longitude: '-132.0',
    Latitude: '-90.0',
    forecast_time: '2021-04-02T13:00:00',
    'Temperature Celsius': '16.6',
    'Precipitation Rate mm/hr': '0.4'
  },
  {
    Longitude: '-131.5',
    Latitude: '-90.0',
    forecast_time: '2021-04-02T13:00:00',
    'Temperature Celsius': '4.3',
    'Precipitation Rate mm/hr': '18.3'
  },
  {
    Longitude: '-131.0',
    Latitude: '-90.0',
    forecast_time: '2021-04-02T13:00:00',
    'Temperature Celsius': '18.2',
    'Precipitation Rate mm/hr': '15.4'
  },
  {
    Longitude: '-130.5',
    Latitude: '-90.0',
    forecast_time: '2021-04-02T13:00:00',
    'Temperature Celsius': '47.0',
    'Precipitation Rate mm/hr': '16.0'
  }
];

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

// module.exports = app;