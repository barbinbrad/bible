const puppeteer = require('puppeteer');
const { expect }  = require('chai');
//const html = require('../common/html.js').default;

describe('Bible Scraping Page Layout Test', () => {

    let browser;
    let page;

    beforeEach(async () => { 
        browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        });
        page = await browser.newPage();
        await page.goto('https://bible.usccb.org/bible/genesis/1', {waitUntil: 'load', timeout: 5000});
    });

    afterEach(async () => { 
        await browser.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Genesis');
    });

    it('should have a list containers with the txt class', async () => {
        const verses = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.txt'));
        });
        expect(verses.length).to.be.greaterThan(20);
    });

    it('should have "In the beginning" in the first', async () => {

        const verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('.txt');
            list = ['']
            for(element of elements){
                for(child of element.childNodes){
                    if(!child.firstChild && child.textContent.trim().length > 0){
                        list.push(child.textContent.trim());
                    }                       
                }
            }
            return list;
        });
        
        expect(verses[1]).to.contain('In the beginning');
    });

});

