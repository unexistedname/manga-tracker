const fs = require('fs');
const {chapterScraper, initBrowser, closeBrowser} = require('./scraper');
const tracker = require('./tracker');
const path = require('path');
// const data = JSON.parse(fs.readFileSync('./data/datatest.json', 'utf8'));

const mangaData = ["Drawing", "Bijo to Kenja"];
const link = "https://rawkuma.net/manga/drawing-saikyou-mangaka-wa-oekaki-skill-de-isekai-musou-suru/";

(async () => {
    for (let title of mangaData) {
        console.log("wwdwdwdwdwdwdd");
        
        const x = await tracker(title);
        console.log(`${title}: ${x.length}`);
    }
})();
// async function update(title) {
//       const x = await tracker(title);
//       return x;
// }
// for (let manga of mangaData) {
//     update(manga).then(x => {
//         console.log(x);
//     });
// };

// process.stdout.write("Loading... 0%");
