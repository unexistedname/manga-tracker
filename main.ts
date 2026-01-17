// run interval
// get scraped data (var1)
// get base data (var2)

import { resolve, basename } from "path";
import axios from "axios";
import { readFileSync, access, existsSync, writeFileSync } from "fs";
import * as Scraper from "./tracker/scraper";
import "dotenv/config";

// data: For storing updated data
// baseData: For storing list of manga to be updated
// Change the content in baseData if you want to add/remove manga(s)
function createNewFile(path: string, fileName: string): string {
  writeFileSync(path, "{}", "utf-8");
  console.log(`No ${fileName} file detected, creating a new one...`);
  return "{}";
}
const baseDataPath = resolve("./data/baselink.json");
const dataPath = resolve("./data/data.json");
const chapterPath = resolve("./data/chapter.json");
const baseData = JSON.parse(readFileSync(baseDataPath, "utf-8"));
const dataStored = existsSync(dataPath)
  ? JSON.parse(readFileSync(dataPath, "utf-8") || "{}")
  : createNewFile(dataPath, "data");
const chapterStored = existsSync(chapterPath)
  ? JSON.parse(readFileSync(chapterPath, "utf-8") || "{}")
  : createNewFile(chapterPath, "chapter");
let interval: number = parseInt(process.env.INTERVAL as string);

interface Chapter {
  chapter: number[];
  newChapter: number[];
  lastUpdate: string;
}
type Metadata = {
  [key: string]: Scraper.metadata;
};

if (isNaN(interval)) {
  console.log(
    "Cannot get the INTERVAL value from env. Using the default value (30) instead.",
  );
  interval = 30;
}
// console.log(dataStored["Drawing"]);

for (let key in baseData) {
  if (baseData.hasOwnProperty(key)) {
    // key is title, baseData[key] is link
  }
}
// const res = axios.get(baseData["Drawing"]).then((x) => Scraper.chapter(x.data).then((x) => console.log(x)));

// setInterval(async () => {
//   for (let key in baseData) {
//     if (baseData.hasOwnProperty(key)) {
//       const id = key.toLowerCase().replace(/\s+/g, "");
//       const res = await axios.get(baseData[key]);
//       const dataScrape = Scraper.metadataRK(res.data);
//       const chapterScrape = await Scraper.chapter(res.data);

//       const oldChapter: number[] = chapterStored[id]["chapter"];
//       const newChapter = chapterScrape.filter((x) => !oldChapter.includes(x));
//       dataStored[id] = dataScrape;
//       chapterStored[id] = {
//         chapter: [...oldChapter, ...newChapter],
//         newChapter: newChapter,
//         lastUpdate: new Date().toISOString(),
//       };
//     }
//   }
// }, 30 * interval);

// For debugging
// (async () => {
//   for (let key in baseData) {
//     if (baseData.hasOwnProperty(key)) {
//       const id = key.toLowerCase().replace(/\s+/g, "");
//       const res = await axios.get(baseData[key]);
//       const dataScrape = Scraper.metadataRK(res.data);
//       const chapterScrape = await Scraper.chapter(res.data);

//       const oldChapter: number[] = chapterStored[id]?.chapter ?? [];
//       const newChapter = chapterScrape.filter((x) => !oldChapter.includes(x));

//       dataStored[id] = dataScrape;
//       chapterStored[id] = {
//         chapter: [...oldChapter, ...newChapter],
//         newChapter: newChapter,
//         lastUpdate: new Date().toISOString(),
//       };
//     }
//   }
//   writeFileSync(chapterPath, JSON.stringify(chapterStored, null, 2), "utf-8");
//   writeFileSync(dataPath, JSON.stringify(dataStored, null, 2), "utf-8");
//   console.log("Done");
// })();
(async () => {
  const key = "Drawing";
  const id = key.toLowerCase().replace(/\s+/g, "");
  const res = await axios.get(baseData[key]);
  const dataScrape = Scraper.metadataRK(res.data);
  const chapterScrape = await Scraper.chapter(res.data);

  const oldChapter: number[] = chapterStored[id]?.chapter ?? [];
  const newChapter = chapterScrape.filter((x) => !oldChapter.includes(x));

  dataStored[id] = dataScrape;
  chapterStored[id] = {
    chapter: [...oldChapter, ...newChapter],
    newChapter: newChapter,
    lastUpdate: new Date().toISOString(),
  };
  writeFileSync(chapterPath, JSON.stringify(chapterStored, null, 2), "utf-8");
  writeFileSync(dataPath, JSON.stringify(dataStored, null, 2), "utf-8");
  console.log("Done");
})();
