const { getData, getSummary, addWeatherForecasts } = require("./controller");

const router = require("express").Router();

const awaitHandlerFactory = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get('/data', awaitHandlerFactory(getData));
router.get('/summarize', awaitHandlerFactory(getSummary));
router.post('/add_weather_forecasts', awaitHandlerFactory(addWeatherForecasts));

module.exports = router;