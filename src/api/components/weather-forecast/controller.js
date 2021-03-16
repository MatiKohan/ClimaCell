const db = require("./service");
const { validateWeatherForecast } = require('./validation');
const weatherForecastModel = require('./model');

async function getData(req, res) {
    const { lat, lon } = req.query;
    try {
        const data = await db.getData(lat, lon);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

async function getSummary(req, res) {
    const { lat, lon } = req.query;

    try {
        const summary = await db.getSummary(lat, lon);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(summary);
    } catch (err) {
        console.log(err);
    }
}

async function addWeatherForecastsFromCSV(req, res) {
    const name = req.body.file_name;

    try {
        const data = await require('../../../utilities/csv_handler').readCSV(name);
        const weatherForecastArray = [];
        // const errors = [];
        let inserted = 0;

        for (const wf of data) {
            let { error, value } = validateWeatherForecast(wf);
            if (error) {
                // errors.push(error);
            } else {
                let WeatherForecast = new weatherForecastModel({
                    Latitude: wf['Latitude'],
                    Longitude: wf['Longitude'],
                    forecastTime: wf['forecast_time'],
                    Temperature: wf['Temperature Celsius'],
                    Precipitation: wf['Precipitation Rate mm/hr']
                });
                weatherForecastArray.push(WeatherForecast);
                inserted++;
            }
        }
        let result = await db.addWeatherForecasts(weatherForecastArray)

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(`All ${result.insertedCount} were inserted.`);
    } catch (err) {
        if (err.code === 11000) {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Accept", "application/json");
            return res.status(200).json(`Only ${err.result.nInserted} out of ${err.result.result.insertedIds.length} were inserted duo to duplicates.`);
        }
    }
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecastsFromCSV
};