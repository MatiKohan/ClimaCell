const Model = require("./model");

class WeatherForecastModel extends Model {
  constructor(trait = null) {
    super(trait);

    this._longtitude = 0;
    this._latitude = 0;
    this._forecastTime = '';
    this._temperature = 0;
    this._precipitation = 0;
  }
}

module.exports = WeatherForecastModel;
