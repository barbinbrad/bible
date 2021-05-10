const fs = require('fs');
const config = require('../config');
const utils = require('./utils');
const Database = require('../database/database');
const ChaptersTable = require('../database/chapters');

(async function() { 
    const db = new Database(config.databaseLocation);
    const chaptersTable = new ChaptersTable(db);
    const results = await chaptersTable.getAll();
    results.forEach(result => {
        result.link = utils.addPlusSignToNormalLink(result.name + ' ' + result.number);
    });

    fs.writeFile('./output/chapters.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('Chapters written to file');
    });
})();