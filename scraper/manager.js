const scraper = require('./worker');

async function manage(browserPromise){
    let browser = await browserPromise;
    try{      
        
        // Load a list of books
        let books = await scraper.getBooks(browser);
        let i = 0;
        
        // Skip the preface
        if(books[i].includes('preface')){
            i++; 
        }

        // Set the starting state
        let url = `${books[i]}/1`;
        let scraping = true;
        // let html = htmlHeader;
        // let chapterCount = 

        while(scraping){
            
            if(url){
                // Scrape the next chapter link from the page
                feedback = await scraper.getChapter(browser, url);
                url = feedback.url;
            } 
            else{

                // html += htmlFooter;


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

module.exports = (promise) => manage(promise)