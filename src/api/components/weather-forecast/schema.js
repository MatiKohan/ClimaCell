const weatherForecastSchema = {
    id: "weatherForecastSchema",
    type: "object",
    properties: {
      longtitude: { type: "number" },
      latitude: { type: "number" },
      forecastTime: { type: "string", pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$" },
      temperature: { type: "number" },
      precipitation: { type: "number" },
    },
    required: [
      "longtitude",
      "latitude",
      "forecastTime",
      "temperature",
      "precipitation"
    ],
};

  module.exports = weatherForecastSchema;
  