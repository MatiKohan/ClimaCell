const mongoose = require("mongoose");

const weatherForecastSchema = new mongoose.Schema({
  longtitude: Number,
  latitude: Number,
  forecastTime: String,
  temperature: Number,
  precipitation: Number,
});

weatherForecastSchema.index({longtitude: 1, latitude: 1, forecastTime: 1 }, {unique: true});

module.exports = mongoose.model("weather_forecast", weatherForecastSchema);