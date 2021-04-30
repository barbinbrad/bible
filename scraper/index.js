const browser = require('./browser');
const manager = require('./manager');

let chrome = browser.startBrowser();
manager(chrome);
