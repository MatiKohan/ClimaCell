const csv = require('csv-parser');
const fs = require('fs');
// const fileUrl = '../../csv_data/file1.csv';

const readCSV = (fileName) => {
  const results = [];
  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(results);
    });
}

// readCSV(fileUrl);
module.exports = { readCSV };