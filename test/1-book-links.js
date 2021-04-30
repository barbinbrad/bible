const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('Bible Scraping Books List', () => {

    let browser;
    let page;

    beforeEach(async () => { 
        browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        });
        page = await browser.newPage();
        await page.goto('https://bible.usccb.org/bible');
    });

    afterEach(async () => { 
        await browser.close();
    });

    it('should have the correct page title', async () => {       
        expect(await page.title()).to.contain('Books');
    });

    it('should contain at least 73 books with properly formatted links', async () => {
        await page.waitForSelector('ul.content li');

        const books = await page.evaluate(() => {
            const elements = document.querySelectorAll('ul.content li a');                     
            list = [];
            for(element of elements){
                if(element.href){
                    let link = element.href;
                    link = link.substring(0, link.lastIndexOf('/'));
                    list.push(link);
                }
            }
            return list;
        });

        expect(books[0]).to.contain('bible');
        expect(books[0]).to.contain('http');
        expect(books.length).to.greaterThanOrEqual(73);
    });

    

});
