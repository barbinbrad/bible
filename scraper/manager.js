const Worker = require('./worker');
const Database = require('../database/database');
const BooksTable = require('../database/books');
const VersesTable = require('../database/verses');

async function manage(browserPromise){
    const browser = await browserPromise;
    const worker = new Worker(browser);
    const db = new Database('./database/bible.db');
    const booksTable = new BooksTable(db);
    const versesTable = new VersesTable(db);

    booksTable.createTable();
    booksTable.clearTable();
    
    versesTable.createTable();
    versesTable.clearTable();

    try{      
        
        // Load a list of books
        let books = await worker.getBooks();
        let i = 0; // book index
        
        // Skip the preface
        if(books[i].includes('preface')){
            i++; 
        }

        // Set the starting state
        let url = `${books[i]}/1`;
        let scraping = true;

        while(scraping){
            
            if(url){
                // Scrape the next chapter link from the page
                result = await worker.processChapter(url);
                url = result.url;

                if(result.chapter == 1){
                    // Insert the book into the database
                    booksTable.create(result.slug, result.book);
                }

                // Insert each verse into the database
                for(let v=0; v<result.verses.length; v++){
                    versesTable.create(result.slug, result.chapter, v+1, result.verses[v]);
                }                          
            } 
            else{
                
                // If there is no next chapter link, go to the next book
                if(i < books.length - 1){
                    i++;
                    url = `${books[i]}/1`;
                }
                else{
                    // If there is no next book, stop scraping
                    scraping = false;
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