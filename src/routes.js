const express = require("express");
const router = express.Router();

router.use("/weather", require("./api/components/weather-forecast/routes"));

module.exports = router;
