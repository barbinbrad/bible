# King James
A minimal, statically-hosted bible, powered by a SQLite database, populated by a web-scraper.

## Downloading the Site
The whole site can be downloaded (and put on a flash drive).

## Recreating the Site
To run the scraper and generate the site, you need [Node.js](https://nodejs.org/en/) and [Chrome](https://www.google.es/chrome/index.html) installed. Once you have them:
```
git clone https://code.bradbarb.in/brad/king-james.git
cd king-james
npm install
```

### Running the Scraper
- In order to run the web scraper run `npm start`.\
- Before you run the scraper, it's useful to run `npm test`
- The scraping is saved to `./app/public/bible.db`

### Building the Site
- `cd app`
- `npm run build`
- The static site is published to `./app/out/`
