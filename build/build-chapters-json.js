const fs = require('fs');
const config = require('../config');
const utils = require('./utils');
const Database = require('../database/database');
const ChaptersTable = require('../database/chapters');

(async function() { 
    console.log('Building chapters.json...');
    // TODO: the amount of information could be drastically reduced
    const start = new Date().getTime();

    const db = new Database(config.databaseLocation);
    const chaptersTable = new ChaptersTable(db);

    const results = await chaptersTable.getAll();
    results.forEach(result => {
        result.link = utils.addPlusSignToNormalLink(result.name + ' ' + result.number);
    });

    const folder = './output/read';
    const file = `${folder}/chapters.json`

    fs.mkdirSync(folder, {recursive: true});
    fs.writeFileSync(file, JSON.stringify(results));

    const end = new Date().getTime();
    const time = end - start;

    console.log(`Build took ${time}ms`);
})();