const { route } = require("../../../routes");
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

// router.get(
//   "/data",
//   awaitHandlerFactory(async (req, res) => {
//     // let params = req.body;
//     const {lat, lon} = req.query;

//     const data = await getData(lat, lon);
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Accept", "application/json");
//     return res.status(200).json(data);
//   })
// );

// router.get(
//   "/summarize",
//   awaitHandlerFactory(async (req, res) => {
//     // let params = req.body;
//     const {lat, lon} = req.query;

//     try {
//       const summary = await getSummary(lat, lon);
      
//       res.setHeader("Content-Type", "application/json");
//       res.setHeader("Accept", "application/json");
//       return res.status(200).json(summary);
//     } catch (err){

//     }
//   })
// );

router.get('/data', awaitHandlerFactory(getData));
router.get('/summarize', awaitHandlerFactory(getSummary));
router.post('/add_weather_forecasts', awaitHandlerFactory(addWeatherForecasts));

module.exports = router;