const fs = require('fs');
const utils = require('./utils');
const config = require('../config');
const Database = require('../database/database');
const VersesTable = require('../database/verses');

(async function() { 
    var start = new Date().getTime();

    const chapters = require('../output/chapters.json');
    const db = new Database(config.databaseLocation);
    const versesTable = new VersesTable(db);
        

    for(chapter of chapters){      
        console.log(`Building ${chapter.link}`);
        if(chapter.name == 'Exodus'){
            break;
        }

        let html = '<!DOCTYPE HTML>';
        html += '<html lang="en">';
        html += '<head>';
        html +=     '<meta charset="UTF-8">';
        html +=     `<title>${chapter.name} ${chapter.number}</title>`;
        html +=     '<meta name="viewport" content="width=device-width">';
        html +=     '<link rel="stylesheet" href="../assets/css/styles.css">';
        html +=     '<link rel="stylesheet" href="../assets/css/print.css" media="print">';
        html +=     '<meta name="theme-color" content="#FFFFFF"></meta>';        
        html += '</head>';
        html += '<body>';
        html +=     `<h2>${chapter.name} ${chapter.number}</h2>`
        html +=     '<p>';
        
        const verses = await versesTable.getAll(chapter.name, chapter.number);

        for(verse of verses){
            html +=     `<span id="${verse.slug}-${verse.chapter}-${verse.verse}">${verse.text}&nbsp;</span>`;
        }

        html +=     '</p>';

        if(chapter.previous){
            html += `<a class="next" href="../${utils.addPlusSignToNormalLink(chapter.previous)}">${getLeftArrow()}</a>`;
        }
        if(chapter.next){
            html += `<a class="prev" href="../${utils.addPlusSignToNormalLink(chapter.next)}">${getRightArrow()}</a>` 
        }
        
        html += '</body>'
        html += '</html>';
        
        let folder = `./output/${chapter.link}`;
        let file = `${folder}/index.html`;

        fs.mkdirSync(folder, {recursive: true});
        fs.writeFileSync(file, html);
            
    }

    var end = new Date().getTime();
    var time = end - start;

    console.log(`Build took ${time}ms`);
})();

function getLeftArrow(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Previous</title><path d="M10.75 0a.74.74 0 0 1 .53.22.75.75 0 0 1 0 1.06l-9.47 9.47 9.47 9.47a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06l10-10a.73.73 0 0 1 .53-.22z"></path></svg>';
}

function getRightArrow(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Next</title><path d="M.75 21.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l9.47-9.47L.22 1.28A.75.75 0 0 1 1.28.22l10 10a.75.75 0 0 1 0 1.06l-10 10a.74.74 0 0 1-.53.22z"></path></svg>';
}