const router = require("express").Router();
// const { getEWA } = require("./manager");

const awaitHandlerFactory = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get(
  "/data",
  awaitHandlerFactory(async (req, res) => {
    // let params = req.body;
    let {lat, lon} = req.query;

    const data = await getData(lat, lon);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    return res.status(200).json(data);
  })
);

router.get(
  "/summarize",
  awaitHandlerFactory(async (req, res) => {
    // let params = req.body;
    let {lat, lon} = req.query;

    const summary = await getSummary(lat, lon);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    return res.status(200).json(summary);
  })
);

module.exports = router;
