const fs = require('fs');
const utils = require('./utils');
const config = require('../config');
const Database = require('../database/database');
const VersesTable = require('../database/verses');

(async function() { 
    console.log('Building chapters...');
    const start = new Date().getTime();

    const chapters = require('../output/read/chapters.json');
    const db = new Database(config.databaseLocation);
    const versesTable = new VersesTable(db);
        

    for(chapter of chapters){      

        if(chapter.name == 'Exodus'){
            break;
        }

        let html = '<!DOCTYPE HTML>';
        html += '<html lang="en">';
        html += '<head>';
        html +=     '<meta charset="UTF-8">';
        html +=     `<title>${chapter.name} ${chapter.number}</title>`;
        html +=     '<meta name="viewport" content="width=device-width">';
        html +=     '<link rel="stylesheet" href="../../assets/css/styles.css">';
        html +=     '<link rel="stylesheet" href="../../assets/css/print.css" media="print">';
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
            html += `<a class="next" href="../${utils.addPlusSignToNormalLink(chapter.previous)}/">${utils.LeftArrow}</a>`;
        }
        if(chapter.next){
            html += `<a class="prev" href="../${utils.addPlusSignToNormalLink(chapter.next)}/">${utils.RightArrow}</a>` 
        }
        
        html += '</body>'
        html += '</html>';
        
        const folder = `./output/read/${chapter.link}`;
        const file = `${folder}/index.html`;

        fs.mkdirSync(folder, {recursive: true});
        fs.writeFileSync(file, html);
            
    }

    const end = new Date().getTime();
    const time = end - start;

    console.log(`Build took ${time}ms`);
})();

