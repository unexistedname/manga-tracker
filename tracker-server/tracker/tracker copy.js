const fs = require('fs');
const {chapterScraper, initBrowser, closeBrowser} = require('./scraper');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

async function tracker(title) {
    await initBrowser();
    // Locate the correct entry in the data array that contains this title
    const entry = data.find(item => Object.prototype.hasOwnProperty.call(item, title));
    if (!entry) {
        console.error('Title not found in data:', title);
        await closeBrowser();
        return 0;
    }

    const manga = entry[title];
    manga["Chapter List"] = manga["Chapter List"] || []; // create if missing
    const oldList = manga["Chapter List"];
    const newList = await chapterScraper(manga["Link"]) || [];

    // Defensive: ensure newList is an array before filtering
    const update = Array.isArray(newList) ? newList.filter(x => !oldList.includes(x)) : [];

    await closeBrowser();
    if (update.length == 0) {
        return 0;
    } else {
        manga["Chapter List"].push(...update);
        return update;
    }
    

}

module.exports = tracker;