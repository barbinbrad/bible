const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const browser = require('../scraper/browser');

describe('Bible Scraping Last Chapter Layout Test', () => {

    let chrome;
    let page;

    before(async () => { 
        chrome = await browser.startBrowser();
        page = await chrome.newPage();
        await page.goto('https://bible.usccb.org/bible/genesis/50');
    });

    after(async () => { 
        await chrome.close();
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

