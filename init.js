const fs = require("fs");
const scraper = require("./tracker-server/tracker/scraper");
const baseLink = JSON.parse(fs.readFileSync("./data/baseLink.json", "utf-8"));
const path = "./data/data.json";

if (!fs.existsSync(path)) {
  //bikin klo gaada
  const x = [];
  fs.writeFileSync(path, JSON.stringify(x, null, 2), "utf8");
  console.log("No data file detected, creating a new one...");
}

data = [];
(async () => {
  try {
    await scraper.initBrowser();
    for (let [a, b] of Object.entries(baseLink)) { //a: judul, b: link
      const chapter = await scraper.chapterScraper(b);
      const title = await scraper.titleScraper(b);
      const desc = await scraper.descScraper(b);
      const image = await scraper.coverScraper(b, a);
      
      const mangaData = {
        [a]: {
          "Original Title": title.trim(),
          "Link": b,
          "Description": desc,
          "Image Directory": image,
          "Chapter List": [...chapter],
        },
      };
      data.push(mangaData);
      console.log(`${a} loaded`);
    }
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.log(error);
  } finally {
    await scraper.closeBrowser();
  }
})();

// data = JSON.parse(fs.readFileSync(path, 'utf-8'));
// data.push(c)
// console.log(...data);
