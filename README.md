# ClimaCell

## Installation

Clone the project and install with NPM

```bash
git clone https://github.com/MatiKohan/ClimaCell.git
cd ClimaCell
npm i
```

## Run locally

Run the server from the terminal using nodejs

```bash
node src/server.js
```

## Usage

API endpoint:

```bash
GET  https://climacell-matias.herokuapp.com/weather/data?lat=<lat>&lon=<lon>
GET  https://climacell-matias.herokuapp.com/weather/summarize?lat=<lat>&lon=<lon>
```

## Technical decisions

1. I chose to insert the data in bulks of 1000 document to balance between memory and network.
2. I chose mongoDB over sql because of it faster.
3. I assumed the csv files are correct and safe to use.

## Production missings
1. The credentials are stored hardcoded. It is a big no-no but, in a real service they should be stored as env variables and never be uploaded to git.
2. CI/CD pipelines.
3. Backups (Version control and database)

## Optimize / pitfalls
1. The insertion of the data into the DB can be optimized. Maybe using some kind of queue service.

## Owner

Matias Ricardo Kohan
