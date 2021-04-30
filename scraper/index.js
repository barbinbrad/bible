const browser = require('./browser');
const scrapePagesUsing = require('./page-controller');

let chromeHeadless = browser.startBrowser();
scrapePagesUsing(chromeHeadless);
