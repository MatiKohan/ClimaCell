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
    return new Promise((resolve, reject) => {
        WeatherForecast.aggregate([
            {
                $match: {
                    Longitude: lon,
                    Latitude: lat
                }
            }, {
                $group: {
                    _id: null,
                    max: {
                        $addToSet: {
                            Temperature: { $max: "$Temperature" },
                            Precipitation: { $max: "$Precipitation" }
                        }
                    },
                    min: {
                        $addToSet: {
                            Temperature: { $min: "$Temperature" },
                            Precipitation: { $min: "$Precipitation" }
                        }
                    },
                    avg: {
                        $addToSet: {
                            Temperature: { $avg: "$Temperature" },
                            Precipitation: { $avg: "$Precipitation" }
                        }
                    }
                }
            }
        ], (err, items) => {
            if (err) reject(err);
            resolve(items);
        }).exec();
    })
}

const addWeatherForecasts = async (WeatherForecast) => {
    return new Promise((resolve, reject) => {
        WeatherForecast.save((err, item) => {
            if (err && err.code !== 11000) reject(err);
            resolve(true);
        });
    });
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecasts
}