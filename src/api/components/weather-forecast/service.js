const getData = async (lat, lon) => {
    const WeatherForecast = require('./model');
    return new Promise((resolve, reject) => {
        WeatherForecast.find({ Longitude: lon, Latitude: lat }, { forecastTime: 1, Temperature: 1, Precipitation: 1 }, (err, item) => {
            if (err) reject(err);
            resolve(item);
        })
    })
}

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

const addWeatherForecasts = async (weatherForecastsArray) => {
    const WeatherForecast = require('./model');
    return new Promise((resolve, reject) => {
        WeatherForecast.insertMany(weatherForecastsArray, { ordered: false, rawResult: true }, (err, docs) => {
            console.log('Inserting to db, it can take a while..');
            if (err) reject(err);
            resolve(docs);
        })
    });
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecasts
}