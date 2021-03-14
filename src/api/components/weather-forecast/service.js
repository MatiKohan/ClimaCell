const WeatherForecast = require('./mongoose_schema');

const getData = async ( lat, lon ) => {
    try {
        const data = WeatherForecast.find({ Latitude: lat, Longitude: lon }, 'forecastTime Temperature Precipitation');
        console.log(data);
        return data;
    } catch (err) {
        console.log( e )
    }

    return data;
}

const getSummary = async ( db_client, lat, lon ) => {
    const collection = db_client.db('climacell').collection('weather_forecasts');
    
    try {
        // const summary = collection.find({ max: {$max: "Latitude"}, min: lon, avg: avg: });
        const summary = await collection.aggregate([
            {
                _id: null,
                max: {
                    Temperature: { $max: "$Temperature"},
                    Precipitation: { $max: "$Precipitation" }
                },
                min: {
                    Temperature: { $min: "$Temperature"},
                    Precipitation: { $min: "$Precipitation" }
                },
                avg: {
                    Temperature: { $avg: "$Temperature"},
                    Precipitation: { $avg: "$Precipitation" }
                }
            }
        ]).then(data => console.log('data' + data));
        return summary;
    } catch (err) {
        console.log( e );
        return false;
    }
}

const insertWeatherForecasts = async (db_client, weather_forecasts) => {
    try{
        const result = await db_client
        .db('climacell')
        .collection('weather_forecasts')
        .insertMany(weather_forecasts, { ordered: false });
    } catch (err){
        console.log( e );
    }
}

module.exports = {
    getData,
    getSummary,
    insertWeatherForecasts
}