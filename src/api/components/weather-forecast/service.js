/**
 * Gets the temperature and precipitation for the give latitude and longitude
 * @param {Number} lat 
 * @param {Number} lon 
 * @returns Promise
 */
const getData = async (lat, lon) => {
    const WeatherForecast = require('./model');
    return new Promise((resolve, reject) => {
        WeatherForecast.find({ Longitude: lon, Latitude: lat }, { _id: 0, forecastTime: 1, Temperature: 1, Precipitation: 1 }, (err, item) => {
            if (err) reject(err);
            resolve(item);
        })
    })
}

/**
 * Gets the max/min/avg temperature and precipitation for the give latitude and longitude
 * @param {Number} lat 
 * @param {Number} lon 
 * @returns 
 */
const getSummary = async (lat, lon) => {
    const WeatherForecast = require('./model');

    lon = parseInt(lon);
    lat = parseInt(lat)
    return new Promise((resolve, reject) => {
        WeatherForecast.aggregate([
            {
                $match: {
                    Longitude: lon,
                    Latitude: lat,
                }
            }, {
                $group: {
                    _id: null,
                    max_temp: { $max: "$Temperature" },
                    max_prec: { $max: "$Precipitation" },
                    min_temp: { $min: "$Temperature" },
                    min_prec: { $min: "$Precipitation" },
                    avg_temp: { $avg: "$Temperature" },
                    avg_prec: { $avg: "$Precipitation" }
                }
            }, {
                $project: {
                    _id: 0,
                    max: {
                        Temperature: "$max_temp",
                        Precipitation: "$max_prec"
                    },
                    min: {
                        Temperature: "$min_temp",
                        Precipitation: "$min_prec"
                    },
                    avg: {
                        Temperature: "$avg_temp",
                        Precipitation: "$avg_prec"
                    }
                }
            }

        ], (err, items) => {
            if (err) reject(err);
            resolve(items);
        }).exec();
    })
}

/**
 * Inserts a Weather Forecasts array into weatherforecasts collection
 * @param {Array} weatherForecastsArray 
 * @returns Promise
 */
const addWeatherForecasts = async (weatherForecastsArray) => {
    const duplicateErrorCode = 11000;
    const WeatherForecast = require('./model');
    return new Promise((resolve, reject) => {
        WeatherForecast.insertMany(weatherForecastsArray, { ordered: false, rawResult: true }, (err, docs) => {
            if (err && err.code !== duplicateErrorCode) reject(err);
            resolve(true);
        })
    });
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecasts
}