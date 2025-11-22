import { resolve, basename } from 'path';
import { readFileSync } from 'fs';
import tracker from './tracker.js';
import updater from './updater.js';
const dataPath = resolve('./data/data.json');
const updateLogPath = resolve('./data/updateLog.json');
const mangaData = JSON.parse(readFileSync(dataPath, 'utf8'));


(async () => {
})();