const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const browser = require('../scraper/browser');

describe('Bible Scraping Page Layout Test', () => {

    let chrome;
    let page;

    before(async () => { 
        chrome = await browser.startBrowser();
        page = await chrome.newPage();
        await page.goto('https://www.biblegateway.com/passage/?search=Genesis 1&version=NRSVCE');
    });

    after(async () => { 
        await chrome.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Genesis');
    });

    it('should have a list containers with the text class', async () => {
        await page.waitForSelector('p .text');
        const verses = await page.evaluate(() => {
            return [...document.querySelectorAll('p .text')];
        });
        expect(verses.length).to.be.greaterThan(20);
    });

    it('should have "In the beginning" in the first', async () => {
        await page.waitForSelector('p .text');
        const verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('p .text');
                      
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
        await page.waitForSelector('.dropdown-display-text');
        let book = await page.evaluate(() => {
            let tokens = document.querySelector('.dropdown-display-text').textContent.trim().split(' ');
            return tokens.slice(0, tokens.length-1);
        });

        expect(book).to.contain('Genesis');
    });

    it('should have a link to the next chapter', async () => {
        await page.waitForSelector('.next-chapter');
        const links = await page.evaluate(() => {
            return [...document.querySelectorAll('.next-chapter')];
        });
        
        expect(links.length).to.be.greaterThan(0);
    });

});

