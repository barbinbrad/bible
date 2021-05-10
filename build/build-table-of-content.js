const fs = require('fs');
const utils = require('./utils');
const config = require('../config');

(async function() { 
    const start = new Date().getTime();

    const books = require('../output/books.json');

    let html = '<!DOCTYPE HTML>';
    html += '<html lang="en">';
    html += '<head>';
    html +=     '<meta charset="UTF-8">';
    html +=     `<title>Minimal Bible</title>`;
    html +=     '<meta name="viewport" content="width=device-width">';
    html +=     '<link rel="stylesheet" href="./assets/css/styles.css">';
    html +=     '<link rel="stylesheet" href="./assets/css/print.css" media="print">';
    html +=     '<meta name="theme-color" content="#FFFFFF"></meta>';        
    html += '</head>';
    html += '<body>';
    html += '<h1>Bible</h1>';
    html += '<ul>';
    for(book of books){
        html += '<li>';
        html += `<a href="${book.name}+1">${book.name}</a>`;
        html += '</li>';
    }
    html += '</ul>';
    html += '</body>';
    html += '</html>';

    let folder = `./output/`;
    let file = `${folder}/index.html`;

    fs.mkdirSync(folder, {recursive: true});
    fs.writeFileSync(file, html);
               

    const end = new Date().getTime();
    const time = end - start;

    console.log(`Build took ${time}ms`);
})();