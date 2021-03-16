const { getData, getSummary, addWeatherForecastsFromCSV } = require("./controller");

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
router.post('/add_data_from_csv', awaitHandlerFactory(addWeatherForecastsFromCSV));

module.exports = router;