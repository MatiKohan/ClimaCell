const express = require("express");
const router = express.Router();

router.use("/weather", require("./weather_controller"));

module.exports = router;
