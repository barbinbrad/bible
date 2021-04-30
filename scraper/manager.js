const worker = require('./worker');

async function manage(browserPromise){
    let browser = await browserPromise;
    try{      
        
        // Load a list of books
        let books = await worker.getBooks(browser);
        let i = 0;
        
        // Skip the preface
        if(books[i].includes('preface')){
            i++; 
        }

        // Set the starting state
        let url = `${books[i]}/1`;
        let scraping = true;
        let bookSaved = false;
        let result = {};
        let html = worker.startNextBook();

        while(scraping){
            
            if(url){
                // Scrape the next chapter link from the page
                result = await worker.getChapter(browser, url);
                url = result.url;
                html = worker.buildDocument(html, result);              
            } 
            else{
                bookSaved = worker.saveBookAsHTML(html);
                
                if(!bookSaved){
                    console.error('Failed to save book as HTML');
                    scraping = false;
                }

                html = worker.startNextBook();

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