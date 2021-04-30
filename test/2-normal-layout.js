const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const browser = require('../scraper/browser');

describe('Bible Scraping Page Layout Test', () => {

    let chrome;
    let page;

    beforeEach(async () => { 
        chrome = await browser.startBrowser();
        page = await chrome.newPage();
        await page.goto('https://bible.usccb.org/bible/genesis/1');
    });

    afterEach(async () => { 
        await chrome.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Genesis');
    });

    it('should have a list containers with the txt class', async () => {
        await page.waitForSelector('.contentarea');
        const verses = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.txt'));
        });
        expect(verses.length).to.be.greaterThan(20);
    });

    it('should have "In the beginning" in the first', async () => {
        await page.waitForSelector('.contentarea');
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

    it('should have the title of the book', async () => {
        await page.waitForSelector('.title-page');
        const book = await page.evaluate(() => {
            return document.querySelector('.title-page').textContent.trim();
        });

        expect(book).to.contain('Genesis');
    });

    it('should have a link to the next chapter', async () => {
        await page.waitForSelector('.pager__item.pager__item--next');
        const link = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.pager__item.pager__item--next a'));
        });
        
        expect(link.length).to.be.greaterThan(0);
    });

});

