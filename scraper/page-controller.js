const scraper = require('./page-scraper');

async function scrapePagesUsing(browserInstance){
    let browser;
    
    try{
        
        browser = await browserInstance;        
        
        // Load a list of books
        let books = await scraper.getBooks(browser);
        let i = 0;
        
        // Skip the preface
        if(books[i].includes('preface')){
            i++; 
        }

        // Set the starting point
        let url = `${books[i]}/1`;
        let scraping = true;

        while(true){
            
            if(url){
                // Scrape the next chapter link from the page
                url = await scraper.scrapePage(browser, url);
            } 
            else{
                // If there is no next chapter link, go to the next book
                if(i < books.length - 1){
                    i++;
                    url = `${books[i]}/1`
                }
                else{
                    // If there is no next book, stop scraping
                    scraping = false;
                }               
            }           
        }
        // Tidy up
        browser.close();

    }
    catch(err){
        // Tidy up on error
        if(browser){
            browser.close();
        }
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapePagesUsing(browserInstance)