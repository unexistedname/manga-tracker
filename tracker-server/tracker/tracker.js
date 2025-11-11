const fs = require('fs');
const { chapterScraper, initBrowser, closeBrowser } = require('./scraper');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

async function tracker(title) {
    await initBrowser()

    try {
        console.log("Processing: ", title);
        
        const entry = await data.find(item => Object.prototype.hasOwnProperty.call(item, title));
        console.log(`${title} founded in data`);
        if (!entry) {
            console.log('Title not found in data:', ...title);
            await closeBrowser();
            return 0;
        }

        const manga = entry[title];
        manga["Chapter List"] ? manga["Chapter List"] : [].then(() => console.log("Entry empty, creating new one..."));

        const oldList = manga["Chapter List"];
        const newList = await chapterScraper(manga["Link"]) || [];
        const update = Array.isArray(newList) ? newList.filter(x => !oldList.includes(x)) : [];
        console.log(`Found ${update.length} new chapters.`)

        await closeBrowser();
        if (update.length == 0) {
            return 0;
        } else {
            manga["Chapter List"].push(...update);
            return update;
        }
    } catch (error) {
        console.error("Error in tracker function: ", error);
        await closeBrowser();
        return 0;
    }



}

module.exports = tracker;