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
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");

    try {
        const data = await require('../../../utilities/csv_handler').readCSV(name);
        let weatherForecastArray = [];
        // const errors = [];
        let iterations = data.length;
        let result;
        let promiseArray = [];

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
            }

            if (!--iterations || weatherForecastArray.length >= 100 ){
                result = db.addWeatherForecasts(weatherForecastArray);
                promiseArray.push(result); 
                weatherForecastArray = [];
            }
        }

        Promise.all(promiseArray).then((values) => {
            return res.status(200).json(`${values} were inserted.`);
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

async function addWeatherForecastsFromCSV(fileName) {
    try {
        console.log(`Start processing file: ${fileName}`)
        const data = await require('../../../utilities/csv_handler').readCSV(fileName);
        let weatherForecastArray = [];
        let iterations = data.length;
        let result;
        let promiseArray = [];
        const insertedCounter = 0;
        let promiseCounter = 0;

        for (const wf of data) {
            let { error } = validateWeatherForecast(wf);
            if (error) {
                console.log(error);
            } else {
                let WeatherForecast = new weatherForecastModel({
                    Latitude: wf['Latitude'],
                    Longitude: wf['Longitude'],
                    forecastTime: wf['forecast_time'],
                    Temperature: wf['Temperature Celsius'],
                    Precipitation: wf['Precipitation Rate mm/hr']
                });
                
                weatherForecastArray.push(WeatherForecast);
                if (!--iterations || weatherForecastArray.length >= 1000 ){
                    promiseCounter.total++;
                    result = await db.addWeatherForecasts(weatherForecastArray,promiseCounter);

                    promiseCounter += weatherForecastArray.length;
                    console.log(`${fileName}: Inserted ${promiseCounter}/${data.length}`)
                    
                    // Clearing array
                    weatherForecastArray = [];
                }
            }
        }


    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecastsFromCSV
};