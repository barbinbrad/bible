const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('Bible Scraping Last Chapter Layout Test', () => {

    let browser;
    let page;

    beforeEach(async () => { 
        browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        });
        page = await browser.newPage();
        await page.goto('https://bible.usccb.org/bible/genesis/50', {waitUntil: 'load', timeout: 5000});
    });

    afterEach(async () => { 
        await browser.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Genesis');
    });

    it('should have the next page link disabled', async () => {
        await page.waitForSelector('.pager__item.pager__item--next');
        const link = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.pager__item.pager__item--next a'));
        });
        expect(link.length).to.eql(0);
    });

    

});

