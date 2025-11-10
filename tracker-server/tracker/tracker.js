const fs = require('fs');
const {chapterScraper, initBrowser, closeBrowser} = require('./scraper');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

async function tracker(title) {
    await initBrowser();

    data[0][title]["Chapter List"] = data[0][title]["Chapter List"] || []; //bikin klo blm ada
    const oldList = data[0][title]["Chapter List"];
    const newList = await chapterScraper(data[0][title]["Link"]);

    const update = newList.filter(x => !oldList.includes(x));

    await closeBrowser();
    if (update.length == 0) {
        return 0;
    } else {
        data[0][title]["Chapter List"].push(...update);
        return update;
    }
    

}

module.exports = tracker;