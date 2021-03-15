const schema = require('./schema');

const validateWeatherForecast = ( weatherForecast ) => {
    return schema.validate( weatherForecast );
}

module.exports = { validateWeatherForecast }