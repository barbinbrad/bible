const fs = require('fs');
const config = require('../config');
const utils = require('./utils');
const Database = require('../database/database');
const BooksTable = require('../database/books');

(async function() { 
    console.log('Building books.json...');
    const start = new Date().getTime();

    const db = new Database(config.databaseLocation);
    const booksTable = new BooksTable(db);
    const results = await booksTable.getAll();

    const folder = './output/read';
    const file = `${folder}/books.json`

    fs.mkdirSync(folder, {recursive: true});
    fs.writeFileSync(file, JSON.stringify(results));

    const end = new Date().getTime();
    const time = end - start;

    console.log(`Build took ${time}ms`);
})();