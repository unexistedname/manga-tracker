import { resolve, basename } from 'path';
import { readFileSync } from 'fs';
import tracker from './tracker/tracker.js';
import updater from './tracker/updater.js';
import "dotenv/config";
const dataPath = resolve('./data/data.json');
const updateLogPath = resolve('./data/updateLog.json');
const mangaData = JSON.parse(readFileSync(dataPath, 'utf8'));

// Nampilin file asal log
const trackerLog = console.log;
console.log = (...args) => {
    const stackLine = new Error().stack.split("\n")[2].trim();
    const match = stackLine.match(/\((.*):\d+:\d+\)$/);
    const filePath = match ? match[1] : stackLine;
    trackerLog(`[${basename(filePath)}]`, ...args);
};

/* 
- memulai tracking tiap x menit \\ done
- if tracker != 0, announce bot + write file
*/

// Tracking manga tiap 30 mnt (edit intervalny di .env)
setInterval(
    async () => {
        for (let manga of mangaData) {
            const title = [...Object.keys(manga)];
            const results = await tracker(...title, dataPath, updateLogPath);
        };
        await updater(dataPath, updateLogPath);
        
    }, parseInt(process.env.interval) * 60000);