const routes = require("./routes");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const { readCSV } = require("./utilities/csv_handler");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static("."));

app.use(cors());

app.options("*", cors());

// const dbUrl = 'mongodb://localhost:3001/mydb';
// const dbClient = new MongoClient(dbUrl, { useUnifiedTopology: true });

// dbClient.connect((err, db) => {
//   if (err) throw err;
//   console.log('Database created!');
//   db.close();
// })

// const weather_forecasts = readCSV('/csv_data/file1.csv');

app.use("/", routes);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// module.exports = app;