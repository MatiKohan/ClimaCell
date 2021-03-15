const Joi = require('joi');
const weatherForecastSchema = Joi.object({
  Longitude: Joi.number().required(),
  Latitude: Joi.number().required(),
  forecast_time: Joi.string().pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$')).required(),
  'Temperature Celsius': Joi.number().required(),
  'Precipitation Rate mm/hr': Joi.number().required(),
})

module.exports = weatherForecastSchema;