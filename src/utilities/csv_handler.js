const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const readCSV = async (fileName) => {
  const fileUrl = path.join(__dirname, '..', '..', 'csv_data', fileName);
  const results = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileUrl)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      resolve(results);
    })
    .on('error', (err) => {
      console.log(err);
    });    
  })
}

// readCSV('file1.csv');

module.exports = { readCSV };