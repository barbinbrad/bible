const scraper = {
    async getBooks(browser){
        let page = await browser.newPage();
        let url = 'https://bible.usccb.org/bible'
        console.log(`Navigating to ${url}...`);
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

    async scrapePage(browser, url){
        // Navigate to the page
        let page = await browser.newPage();
        console.log(`Navigating to ${url}...`);
        await page.goto(url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.contentarea');

        // Load the verses into an array of strings
        const verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('.txt');                     
            list = ['']
            for(element of elements){
                for(child of element.childNodes){
                    if(!child.firstChild && child.textContent.trim().length > 0){
                        list.push(child.textContent.trim());
                    }                       
                }
            }
            return list;
        });

        // Create the chapter as a string from the verses
        const chapterText = verses.join(' ').trim();
        console.log(chapterText);

        this.saveChapter('Book', 'Chapter', chapterText);

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
        
        // Close the page
        page.close();
        
        // If this is the end of a chapter, return a null value. 
        // This will let the controller know to go to the next book.
        return endOfChapter ? null : links[0];
    },
    saveChapter(book, chapter, text){
        console.log(book);
        console.log(chapter);
        console.log(text);
    }
}

module.exports = scraper;