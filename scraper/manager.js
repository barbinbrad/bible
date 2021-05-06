const Worker = require('./worker');
const Database = require('../database/database');
const BooksTable = require('../database/books');
const VersesTable = require('../database/verses');

let debug = true;
let bibleGateway = true;

async function manage(browserPromise){
    const browser = await browserPromise;
    const worker = new Worker(browser);
    const db = debug ? undefined : new Database('./database/bible.db');
    const booksTable = debug ? undefined : new BooksTable(db);
    const versesTable = debug ? undefined : new VersesTable(db);

    if(!debug){
        booksTable.createTable();
        booksTable.clearTable();        
        versesTable.createTable();
        versesTable.clearTable();
    }
    

    try{      
        let books;
        let url;
        let i;

        if(bibleGateway){
            url = 'https://www.biblegateway.com/passage/?search=Genesis+1&version=NRSVCE';
        }
        else{
            // Load a list of books
            books = await worker.getBooks();
            i = 0; // book index
            
            // Skip the preface
            if(books[i].includes('preface')){
                i++; 
            }

            // Set the starting state
            url = `${books[i]}/1`;
        }
        
        let scraping = true;
        while(scraping){
            
            if(url){
                // Scrape the next chapter link from the page
                result = await worker.processChapter(url, bibleGateway);
                url = result.url;

                if(result.chapter == 1 && !debug){
                    // Insert the book into the database
                    booksTable.create(result.slug, result.book);
                }
                

                if(debug){
                    console.log(result);
                }
                else{
                    // Insert each verse into the database
                    for(let v=0; v<result.verses.length; v++){
                        versesTable.create(result.slug, result.chapter, v+1, result.verses[v]);
                    }  
                }

                                        
            } 
            else{
                
                // If there is no next chapter link, go to the next book
                if(!bibleGateway && i < books.length - 1){
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