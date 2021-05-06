const fs = require('fs').promises
const mkdirp = require('mkdirp');

const {bookTemplate, contentsTemplate} = require('./output');

class Work {
    constructor(){
        this.book = '';
        this.slug = '';
        this.chapter = '';
        this.verses = [];
        this.url = null;
    }
}

class Worker {
    constructor(browser){
        this.browser = browser;
    }
    
    async getBooks(){
        let page = await this.browser.newPage();
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
    }

    getLastElementFromLink(link){
        return link.substring(link.lastIndexOf('/') + 1);
    }

    removeElementFromLink(link){
        return link.substring(0, link.lastIndexOf('/'));
    }
    
    async processChapter(url){
        // Navigate to the page
        let page = await this.browser.newPage();
        console.log(`Scraping contents from ${url}...`);
        await page.goto(url);

        let work = new Work();

        // Get the chapter
        work.chapter = url.substring(url.lastIndexOf('/') + 1);

        // Get chapter slug
        work.slug = this.getLastElementFromLink(this.removeElementFromLink(url));

        // Get the book name
        await page.waitForSelector('.title-page');
        work.book = await page.evaluate(() => {
            return document.querySelector('.title-page').textContent.trim();
        });

        // Load the verses into an array of strings
        await page.waitForSelector('.contentarea');
        work.verses = await page.evaluate(() => {
            const elements = document.querySelectorAll('.txt');                     
            list = []
            for(element of elements){
                let verse = '';
                for(child of element.childNodes){
                    // Hack to get rid of all the subscripts but keep the L<small>ORD</small>
                    if((!child.firstChild || child.outerText == 'ORD') && child.textContent.trim().length > 0){
                        verse += child.textContent.trim() + ' ';
                    }                       
                }
                list.push(verse.trim());
            }
            return list.map(verse => verse.replace(/L ORD/g, 'LORD'));
        });

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
        work.url = endOfChapter ? null : links[0];        

        // Close the page
        page.close();
        
        // If this is the end of a chapter, return a null url. 
        // This will let the controller know to go to the next book.
        return work;
    }

    close(){
        this.browser.close();
    }
    
}

module.exports = Worker;