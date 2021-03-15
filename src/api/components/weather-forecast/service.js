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

const addWeatherForecasts = async (weatherForecastsArray) => {
    const WeatherForecast = require('./model');
    return new Promise((resolve, reject) => {
        WeatherForecast.insertMany(weatherForecastsArray, { ordered: false, rawResult: true } ,(err, docs) => {
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