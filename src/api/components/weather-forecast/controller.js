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
    try {
        const data = await require('../../../utilities/csv_handler').readCSV('file2.csv');
        let weatherForecastArray = [];
        let summary;
        let inserted = 0;
        
        for ( const wf of data ){
            let { error, value } = validateWeatherForecast(wf);
            if (error){
                console.log(error);
            } else {
                let WeatherForecast = new weatherForecastModel({
                    Latitude: wf['Latitude'],
                    Longitude: wf['Longitude'],
                    forecastTime: wf['forecast_time'],
                    Temperature: wf['Temperature Celsius'],
                    Precipitation: wf['Precipitation Rate mm/hr']
                });
                
                // summary = await db.addWeatherForecasts(WeatherForecast);
                if (await db.addWeatherForecasts(WeatherForecast)){
                   console.log(inserted++);
                }
            }
        }

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(inserted);
    } catch (err) {
        
    }
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecastsFromCSV
};