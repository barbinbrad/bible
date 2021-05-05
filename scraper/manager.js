const Worker = require('./worker');

async function manage(browserPromise){
    let browser = await browserPromise;
    let worker = new Worker(browser);

    try{      
        
        // Load a list of books
        let books = await worker.getBooks();
        let i = 0;
        
        // Skip the preface
        if(books[i].includes('preface')){
            i++; 
        }

        // Set the starting state
        let url = `${books[i]}/1`;
        let title = await worker.getTitle(url);
        let html = worker.startNextBook(title);
        let scraping = true;
        let bookSaved = false;
        let result = {};

        while(scraping){
            
            if(url){
                // Scrape the next chapter link from the page
                result = await worker.getChapter(url);
                url = result.url;
                html = worker.buildBook(html, result);              
            } 
            else{
                fileName = worker.getFileNameFromLink(books[i]);
                bookSaved = await worker.saveAsHTML(fileName, html);
                
                if(!bookSaved){
                    console.error('Failed to save book as HTML');
                    scraping = false;
                }              

                // If there is no next chapter link, go to the next book
                if(i < books.length - 1){
                    i++;
                    url = `${books[i]}/1`;
                    title = await worker.getTitle(url);
                    html = worker.startNextBook(title);
                }
                else{
                    // If there is no next book, stop scraping
                    scraping = false;

                    // Generate the table of contents
                    html = await worker.buildTableOfContents(books);
                    await worker.saveAsHTML('index', html);
                }               
            }           
        }
        // Tidy up
        worker.close();

    }
    catch(err){
        // Tidy up on error
        if(worker){
            worker.close();
        }
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (promise) => manage(promise)