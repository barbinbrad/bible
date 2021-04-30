const scraper = require('./page-scraper');
const books = require('../common/books');

async function scrapePagesUsing(browserInstance){
    let browser;
    let book = 0;

    let url = `https://bible.usccb.org/bible/${books[book]}/1`
    try{
        
        browser = await browserInstance;
        scraping = true;
        
        while(true){
            
            if(url){
                url = await scraper.scrapePage(browser, url);
            } 
            else{
                if(book < books.length - 1){
                    book++;
                    url = `https://bible.usccb.org/bible/${books[book]}/1`
                }
                else{
                    scraping = false;
                }
                
            }
            
        }

        browser.close();

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapePagesUsing(browserInstance)