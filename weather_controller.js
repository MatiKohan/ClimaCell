const router = require("express").Router();
const { getEWA } = require("./manager");

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
    let params = req.body;

    const ewa = await getEWA(params);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    return res.status(200).json(ewa);
  })
);

router.get(
  "/summarize",
  awaitHandlerFactory(async (req, res) => {
    let params = req.body;

    const ewa = await getEWA(params);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    return res.status(200).json(ewa);
  })
);

module.exports = router;
