class Work {
    constructor(){
        this.book = '';
        this.slug = '';
        this.chapter = '';
        this.verses = [];
        this.next = null;
        this.previous = null;
    }
}

class Worker {
    constructor(browser){
        this.browser = browser;
    }    
    
    async processChapter(url, previousUrl = null){
        // Navigate to the page
        let page = await this.browser.newPage();
        console.log(`Scraping contents from ${url}...`);
        await page.goto(url);

        let work = new Work();
        
        work.previous = previousUrl;
        // Get the chapter number
        await page.waitForSelector('p .text');
        work.chapter = await page.evaluate(() => {
            return document.querySelector('p .text').classList[1].split("-")[1]
        });

        // Get chapter slug
        work.slug = await page.evaluate(() => {
            return document.querySelector('p .text').classList[1].split('-')[0];
        })

        // Get the book name
        await page.waitForSelector('.dropdown-display-text');
        work.book = await page.evaluate(() => {
            let tokens = document.querySelector('.dropdown-display-text').textContent.trim().split(' ');
            return tokens.slice(0, tokens.length-1).join(' ');
        });

        // Load the verses into an array of strings
        await page.waitForSelector('p .text');
        work.verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('p .text');                     
            let verses = [];
            let lastKey = null;

            for(element of elements){
                let verse = '';
                for(child of element.childNodes){
                    // Remove the subscripts n'at
                    if((!child.firstChild || child.classList[0] == 'small-caps') && child.textContent.trim().length > 0){
                        verse += child.textContent;
                    }                       
                }
                // Nice of em' to put the verse number in each class
                let key = element.classList[1];
                
                if(key == lastKey){
                    verses[verses.length - 1] += ' ' +  verse;
                    verses[verses.length - 1].trim();
                }
                else{
                    verses.push(verse.trim());
                }
                
                lastKey = key;
                
            }
            return verses;
        });
        try{
            // Wait for the link to the next chapter
            await page.waitForSelector('.next-chapter');

            // Load the url from the link to the next chapter into an array of strings
            const links = await page.evaluate(() => {
                const elements = document.querySelectorAll('.next-chapter')
                list = [];
                for(element of elements){
                    if(element.href){
                        list.push(element.href);
                    }
                }
                return list;
            });

            // Decide whether this is the end the chapter based on whether a link is shown
            const endOfBible = links.length == 0;  
            work.next = endOfBible ? null : `${decodeURIComponent(links[0])}`;             
        }
        catch{
            work.next = null;
        }
        
        // Close the page
        page.close();
        
        return work;
    }

    getBookFromLink(url){
        if (url == null) {
            return null;
        }
            
        return url.substring(
            url.lastIndexOf("?search=") + 8, 
            url.lastIndexOf("&version=")
        );        
    }

    close(){
        this.browser.close();
    }
    
}

module.exports = Worker;