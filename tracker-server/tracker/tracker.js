import { readFileSync, existsSync, writeFileSync } from 'fs';
import { chapterScraper, initBrowser, closeBrowser } from './scraper.js';

async function tracker(title, dir, saveDir) {
    const data = JSON.parse(readFileSync(dir, 'utf-8'));
    await initBrowser()
    try {
        console.log("Processing: ", title);

        const entry = await data.find(item => Object.prototype.hasOwnProperty.call(item, title)); //chatgpt ass shit idk
        if (!entry) {
            console.log('Title not found in data:', title);
            await closeBrowser();
            return 0;
        }
        const manga = entry[title];
        // Bikin baru klo gaada
        manga["Chapter List"] ? manga["Chapter List"] : [].then(() => console.log("Entry empty, creating new one..."));
        const oldList = manga["Chapter List"];
        console.log(`Found ${oldList.length} chapter(s) in ${title} from data.`);

        const newList = await chapterScraper(manga["Link"]) || [];
        const update = Array.isArray(newList) ? newList.filter(x => !oldList.includes(x)) : []; //Filter bedanya newList sama oldList. Klo ada, taro di update
        console.log(`Found ${update.length} new chapter(s).`)

        await closeBrowser();
        await updateLog(saveDir, title, update);
        return update;
    } catch (error) {
        console.error("Error in tracker function: ", error);
        await closeBrowser();
        return 0;
    }
}

async function updateLog(dir, title, update) {
    try {
        if (!existsSync(dir)) {
            //bikin klo gaada
            const x = {};
            writeFileSync(dir, JSON.stringify(x, null, 2), "utf8");
            console.log("No log file detected, creating a new one...");
        }
        let log = JSON.parse(readFileSync(dir, 'utf-8'));
        log[title] = update;
        writeFileSync(dir, JSON.stringify(log, null, 2))
        console.log(`Successfully save ${title}'s update log`)
    } catch (error) {
        console.error(error);   
    }
}

export default tracker;