const db = require("./service");

/**
 * Calls getData service
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Calls getSummary service
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Proccess CSV files and calls insertion service. 
 * @param {String} fileName 
 */
async function addWeatherForecastsFromCSV(fileName) {
    const { validateWeatherForecast } = require('./validation');
    const weatherForecastModel = require('./model');

    try {
        console.log(`Start processing file: ${fileName}`)
        const data = await require('../../../utilities/csv_handler').readCSV(fileName);
        let weatherForecastArray = [];
        let iterations = data.length;
        let result;
        let promiseCounter = 0;

        //loop through csv rows
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

                //Divide data to bulks of 1000 and manage insertion
                if (!--iterations || weatherForecastArray.length >= 1000 ){
                    promiseCounter.total++;
                    result = await db.addWeatherForecasts(weatherForecastArray,promiseCounter);

                    promiseCounter += weatherForecastArray.length;
                    console.log(`${fileName}: Inserted ${promiseCounter}/${data.length}`)
                    if (promiseCounter === data.length) console.log(`${fileName} fully inserted.`)
                    
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