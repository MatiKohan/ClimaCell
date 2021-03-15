# ClimaCell

## Requirements

MongoDB Community Server v4.4.4

## Installation

Clone the project and install with NPM

```bash
git clone https://github.com/MatiKohan/ClimaCell.git
cd ClimaCell
npm i
```

## Run

Run the server from the terminal using nodejs

```bash
node server.js
```

## Usage

API endpoint:

```bash
http://localhost:3000/weather/data?lat=<lat>&lon=<lon>
http://localhost:3000/weather/summarize?lat=<lat>&lon=<lon>

http://localhost:3000/weather/summarize
{
    file_name: <file name with .csv>
}

```

## Technical decisions

Few decisions I took:



## Comments

It was a really nice assignment. it was my first interaction with automated test in general and Jest specificly, i learned a lot.
I know there are a lot of more tests that can be done and also the code maybe can be more simple, those are part of the things that i want to learn.
I hope it's ok.
Thank you very much.

## Owner

Matias Ricardo Kohan
