const mongoose = require("mongoose");

const weatherForecastSchema = new mongoose.Schema({
  Longitude: Number,
  Latitude: Number,
  forecastTime: String,
  Temperature: Number,
  Precipitation: Number,
});

weatherForecastSchema.index({Longitude: 1, Latitude: 1, forecastTime: 1 }, {unique: true});

module.exports = mongoose.model("WeatherForecast", weatherForecastSchema);