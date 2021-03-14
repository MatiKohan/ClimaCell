const db = require("./service");

async function getData(req, res){
    console.log('marias');
    const {lat, lon} = req.query;

    try {
        const data = await db.getData( lat, lon );
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(data);
    } catch (err){
        console.log(err);
    }
}

async function getSummary(req, res){
    const {lat, lon} = req.query;

    try {
        const summary = await db.getSummary( lat, lon );
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(summary);
    } catch (err){

    }
}

async function addWeatherForecasts(req, res){
    // const {lat, lon} = req.query;

    try {
        const summary = await db.addWeatherForecasts(  );
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Accept", "application/json");
        return res.status(200).json(summary);
    } catch (err){

    }
}

module.exports = {
    getData,
    getSummary,
    addWeatherForecasts
};