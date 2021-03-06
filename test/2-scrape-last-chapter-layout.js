const config = require('../config');
const { expect }  = require('chai');
const browser = require('../scraper/browser');

describe('Bible Scraping Last Chapter Layout Test', () => {

    let chrome;
    let page;

    before(async () => { 
        chrome = await browser.startBrowser();
        page = await chrome.newPage();
        await page.goto(`https://www.biblegateway.com/passage/?search=Revelation 22&version=${config.bibleVersion}`);
    });

    after(async () => { 
        await chrome.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Revelation 22');
    });

    it('should have the next page link disabled', async () => {
        await page.waitForSelector('.next-chapter');
        const links = await page.evaluate(() => {
            return [...document.querySelectorAll('.next-chapter')];
        });
        expect(links.length).to.eql(0);
    });

    

});

