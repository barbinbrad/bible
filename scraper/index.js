const browser = require('./browser');
const scraper = require('./manager');

let chrome = browser.startBrowser(); // a promise
scraper(chrome); 