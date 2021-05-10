# King James
A minimal, static Bible. Generated from a SQLite database, populated by a web-scraper.

## Downloading the Site
The whole site is located in the `output` folder.

## Recreating the Site
To run the scraper and generate the site, you need [Node.js](https://nodejs.org/en/) and [Chrome](https://www.google.es/chrome/index.html) installed. Once you have them:
```
git clone https://code.bradbarb.in/brad/king-james.git
cd king-james
npm install
```

### Running the Scraper
- In order to run the web scraper run `npm run scrape`.\
- Before you run the scraper, it's useful to run `npm test`
- The scraping is saved to `./output/bible.db`

### Building the Site
- `npm run build`
- The static site is published to `./output/`
