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
        html += '<html lang="en" class="no-js">';
        html += '<head>';
        html +=     '<meta charset="UTF-8">';
        html +=     `<title>${chapter.name} ${chapter.number}</title>`;
        html +=     '<meta name="viewport" content="width=device-width">';
        html +=     `<meta name="description" content="${chapter.name} Chapter ${chapter.number}">`;
        html +=     '<link rel="stylesheet" href="../../assets/css/styles.css">';
        html +=     '<link rel="stylesheet" href="../../assets/css/print.css" media="print">';
        html +=     '<meta name="theme-color" content="#FFFFFF"></meta>';        
        html += '</head>';
        html += '<body>';
        html +=     '<div id="navigation">';
        html +=         '<div id="search">';
        html +=             '<div class="input">';
        html +=                '<div class="icon">';
        html +=                   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">';
        html +=                         '<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>';
        html +=                     '</svg>';
        html +=                 '</div>';
        html +=                 '<autocomplete></autocomplete>';
        html +=             '</div>';
        html +=         '</div>';
        html +=         '<chapter-slideout></chapter-slideout>';
        html +=     '</div>';
        html +=     '<div id="content">';
        html +=         `<h2>${chapter.name} ${chapter.number}</h2>`
        html +=         '<p>';
        
        const verses = await versesTable.getAll(chapter.name, chapter.number);

        for(verse of verses){
            html +=     `<span id="${verse.slug}-${verse.chapter}-${verse.verse}">${verse.text}&nbsp;</span>`;
        }

        html +=         '</p>';

        if(chapter.previous){
            html +=     `<a class="prev" href="../${utils.addPlusSignToNormalLink(chapter.previous)}/">${utils.LeftArrow}</a>`;
        }
        if(chapter.next){
            html +=     `<a class="next" href="../${utils.addPlusSignToNormalLink(chapter.next)}/">${utils.RightArrow}</a>` 
        }
        html +=     '</div>'

        html += '<script type="text/x-template" id="autocomplete">';
        html +=     '<div>';
        html +=         '<input type="text" placeholder="Books" id="acinput" name="acinput" @keyup="fetchData()" @keydown="setFocus" @focus="inputFocus(true)" @blur="inputFocus(false)" v-model="inputtext" class="form-control"/>';
        html +=         '<list :fetchedData="autocompleteList"></list>'  
        html +=     '</div>';
        html += '</script>';
    
        html += '<script type="text/x-template" id="results-list">';
        html +=     '<div class="results">';
        html +=         '<div class="autolist" v-if="fetchedData.length>0">';
        html +=             '<ul class="list-group">';
        html +=                 '<li class="list-group-item" :class="checkSelected(index)" v-for="(dt, index) in fetchedData" @mousemove="mouseHover(index)" @mousedown="selectMe(index)">{{dt}}</li>';
        html +=             '</ul>';
        html +=         '</div>';
        html +=     '</div>';
        html += '</script>';

        html += '<script id="chapter-slideout" type="text/x-template">';
        html +=     '<div class="zap-slideout" :class="{ isOpen: isOpen }">';
        html +=         '<div class="zap-slideout-opener" v-if="!isOpen" @click="open">';
        html +=             '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">';
        html +=                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        html +=             '</svg>';
        html +=         '</div>';
        html +=         '<ul class="zap-slideout-menu">';
        html +=             '<li class="zap-slideout-closer" @click="close">';
        html +=                 '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">';
        html +=                     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        html +=                 '</svg>';
        html +=             '</li>';
        html +=             '<li class="zap-slideout-menu-item" v-for="item in menu">{{item}}</li>';
        html +=             '<li class="zap-slideout-menu-item--small" v-for="item in smallMenu">{{item}}</li>';
        html +=         '</ul>';
        html +=     '</div>';
        html += '</script>';


        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.2/vue.js"></script>';
        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/vuex/2.0.0/vuex.js"></script>';
        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>';
        html += '<script src="../../assets/js/scripts.js"></script>'
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

