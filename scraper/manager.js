const config = require('../config');
const Worker = require('./worker');
const Database = require('../database/database');
const BooksTable = require('../database/books');
const ChaptersTable = require('../database/chapters');
const VersesTable = require('../database/verses');

let debug = false;

const db = debug ? undefined : new Database(config.databaseLocation);
const booksTable = debug ? undefined : new BooksTable(db);
const chaptersTable = debug ? undefined : new ChaptersTable(db);
const versesTable = debug ? undefined : new VersesTable(db);

async function manage(chromePromise){
    const chrome = await chromePromise;
    const worker = new Worker(chrome);
    

    if(!debug){
        booksTable.createTable();
        chaptersTable.createTable();
        versesTable.createTable();

        // Clear database, start from scratch 
        booksTable.clearTable(); 
        chaptersTable.clearTable();       
        versesTable.clearTable();
    }
    
    try{      
        let pageToScrape = `https://www.biblegateway.com/passage/?search=Genesis 1&version=${config.bibleVersion}`;
        let previous = null;
        let scraping = true;
        let number = 0;

        while(scraping){            
            if(pageToScrape != null){
                
                result = await worker.processChapter(pageToScrape, previous);
                previous = pageToScrape;
                pageToScrape = result.next;

                if(result.chapter == 1 && !debug){
                    // TODO: figure out a cleaner way to do this:
                    number++; 
                    // Insert the book into the database
                    if(result.book.length > 0){
                        booksTable.create(number, result.book, result.slug);
                    }
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
                        if(result.book.length > 0){
                            versesTable.create(result.book, result.slug, result.chapter, v+1, result.verses[v]);
                        }
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
        console.log("Could not resolve the chrome instance => ", err);
    }
}

module.exports = (promise) => manage(promise)