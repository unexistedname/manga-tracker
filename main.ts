import { resolve, basename } from 'path';
import { readFileSync } from 'fs';
import * as Scraper from "./tracker/scraper";
import "dotenv/config";

const baseDataPath = resolve('./data/baselink.json');
const baseData = JSON.parse(readFileSync(baseDataPath, 'utf-8'));
let interval: number = parseInt(process.env.INTERVAL as string);
if (isNaN(interval)) {
  console.log("Cannot get the INTERVAL value from env. Using the default value (30) instead.");
  interval = 30;
}
// setInterval(
//   async () => {
    
//   }, 30 * interval);