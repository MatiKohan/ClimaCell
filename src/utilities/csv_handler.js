const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const readCSV = (fileName) => {
  const fileUrl = path.join(__dirname, '..', '..', 'csv_data', fileName);
  const results = [];
  
  fs.createReadStream(fileUrl)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      // return results;
      console.log('CSV file successfully processed');
      console.log(results);
    });
}

// readCSV('file1.csv');

module.exports = { readCSV };