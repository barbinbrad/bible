const fs = require('fs');
const config = require('../config');
const utils = require('./utils');
const Database = require('../database/database');
const BooksTable = require('../database/books');

(async function() { 
    const db = new Database(config.databaseLocation);
    const booksTable = new BooksTable(db);
    const results = await booksTable.getAll();

    fs.writeFile('./output/books.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('Books written to file');
    });
})();