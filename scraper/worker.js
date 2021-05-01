const fs = require('fs').promises
const mkdirp = require('mkdirp');

const {bookTemplate} = require("./output");

const worker = {
    async getBooks(browser){
        let page = await browser.newPage();
        let url = 'https://bible.usccb.org/bible'
        console.log(`Scraping links from ${url}...`);
        await page.goto(url);

        await page.waitForSelector('ul.content li');

        return await page.evaluate(() => {
            const elements = document.querySelectorAll('ul.content li a');                     
            list = [];
            for(element of elements){
                if(element.href){
                    let link = element.href;
                    // remove the /0 from the end of the link to avoid introductions
                    link = link.substring(0, link.lastIndexOf('/')); 
                    list.push(link);
                }
            }
            return list;
        });       
    },
    async getTitle(browser, url){
        // Navigate to the page
        let page = await browser.newPage();
        console.log(`Scraping title from ${url}...`);
        await page.goto(url);

        // Get the chapter
        const chapter = url.substring(url.lastIndexOf('/') + 1);

        // Get the book name
        await page.waitForSelector('.title-page');
        const book = await page.evaluate(() => {
            return document.querySelector('.title-page').textContent.trim();
        });

        return book;
    },
    async getChapter(browser, url){
        // Navigate to the page
        let page = await browser.newPage();
        console.log(`Scraping contents from ${url}...`);
        await page.goto(url);

        // Get the chapter
        const chapter = url.substring(url.lastIndexOf('/') + 1);

        // Get the book name
        await page.waitForSelector('.title-page');
        const book = await page.evaluate(() => {
            return document.querySelector('.title-page').textContent.trim();
        });

        // Load the verses into an array of strings
        await page.waitForSelector('.contentarea');
        const verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('.txt');                     
            list = ['']
            for(element of elements){
                for(child of element.childNodes){
                    // Hack to get rid of all the subscripts but keep the L<small>ORD</small>
                    if((!child.firstChild || child.outerText == 'ORD') && child.textContent.trim().length > 0){
                        list.push(child.textContent.trim());
                    }                       
                }
            }
            return list;
        });

        // Create the chapter as a string from the verses
        let text = verses.join(' ').trim();

        // Respect the name -- this is caused by the L<small>ORD</small> convention of site
        text = text.replace(/L ORD/g, 'LORD');

        // Wait for the link to the next chapter
        await page.waitForSelector('.pager__item.pager__item--next');

        // Load the url from the link to the next chapter into an array of strings
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll('.pager__item.pager__item--next a')
            list = [];
            for(element of elements){
                if(element.href){
                    list.push(element.href);
                }
            }
            return list;
        });

        // Decide whether this is the end the chapter based on whether a link is shown
        const endOfChapter = links.length == 0;  

        const result = {
            url:  endOfChapter ? null : links[0],
            book: book,
            chapter: chapter,
            text: text,
        };

        // Close the page
        page.close();
        
        // If this is the end of a chapter, return a null url. 
        // This will let the controller know to go to the next book.
        return result;
    },
    startNextBook(){
        return bookTemplate.newDocument();
    },
    buildBook(currentDocument, additions){
        if(parseInt(additions.chapter) == 1)
            currentDocument += bookTemplate.book(additions.book);
        
        currentDocument += bookTemplate.chapter(additions.chapter);
        currentDocument += bookTemplate.text(additions.text)
        
        if(additions.url)
            currentDocument += bookTemplate.separator();
        else{
            currentDocument += bookTemplate.footer();
        }

        return currentDocument;
    },
    async saveBookAsHTML(title, html){
        try{
            path = './output/generated';
            await mkdirp(path);
            await fs.writeFile(`${path}/${title}.html`, html, err => {
                if (err) {
                    console.error(err);    
                    return false;               
                }
                console.log(`Successfully created ${title}.html`);              
            });

            return true;
        }
        catch{
            return false;
        }
    },
    getFileNameFromLink(link){
        return link.substring(link.lastIndexOf('/') + 1);
    }
}

module.exports = worker;