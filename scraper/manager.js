const Worker = require('./worker');
const Database = require('../database/database');
const BooksTable = require('../database/books');
const ChaptersTable = require('../database/chapters');
const VersesTable = require('../database/verses');

let debug = false;

async function manage(browserPromise){
    const browser = await browserPromise;
    const worker = new Worker(browser);
    const db = debug ? undefined : new Database('./output/bible.db');
    const booksTable = debug ? undefined : new BooksTable(db);
    const chaptersTable = debug ? undefined : new ChaptersTable(db);
    const versesTable = debug ? undefined : new VersesTable(db);

    if(!debug){
        booksTable.createTable();
        chaptersTable.createTable();
        versesTable.createTable();
        
        booksTable.clearTable(); 
        chaptersTable.clearTable();       
        versesTable.clearTable();
    }
    

    try{      
        let pageToScrape = 'https://www.biblegateway.com/passage/?search=Genesis 1&version=NRSVCE';
        let previous = null;
        let scraping = true;
        let number = 0;

        while(scraping){            
            if(pageToScrape != null){
                // Scrape the next chapter link from the page
                result = await worker.processChapter(pageToScrape, previous);
                previous = pageToScrape;
                pageToScrape = result.next;

                if(result.chapter == 1 && !debug){
                    // Insert the book into the database
                    number++;
                    booksTable.create(number, result.book, result.slug);
                }               

                if(debug){
                    console.log(result);
                }
                else{
                    let prev = worker.getBookFromLink(result.previous);
                    let next = worker.getBookFromLink(result.next)
                    
                    // Insert the chapter into the database
                    chaptersTable.create(result.book, result.chapter, next, prev)
                    
                    // Insert each verse into the database
                    for(let v=0; v<result.verses.length; v++){
                        versesTable.create(result.book, result.slug, result.chapter, v+1, result.verses[v]);
                    }  
                }
                                        
            } 
            else{              
                // If there is no next chapter, stop scraping
                scraping = false;              
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