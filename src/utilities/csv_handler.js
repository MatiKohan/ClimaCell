const csv = require('csv-parser');
const fs = require('fs');

const readCSV = (fileUrl) => {
  const results = [];
  fs.createReadStream(fileUrl)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(results);
    });
}

module.exports = { readCSV };