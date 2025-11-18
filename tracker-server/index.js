const path = require('path');
const fs = require('fs');
const tracker = require('./tracker/tracker');
const { env } = require('process');
const mangaData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Nampilin file asal log
const trackerLog = console.log;
console.log = (...args) => {
    const stackLine = new Error().stack.split("\n")[2].trim();
    const match = stackLine.match(/\((.*):\d+:\d+\)$/);
    const filePath = match ? match[1] : stackLine;
    trackerLog(`[${path.basename(filePath)}]`, ...args);
};

/* 
- memulai tracking tiap x menit \\ done
- kyk dcbot python
- if tracker != 0, announce bot + write file
*/

// Tracking manga tiap 30 mnt (edit intervalny di .env)
setInterval(
    async () => {
        for (let manga of mangaData) {
            const title = Object.keys(manga);
            const x = await tracker(title);
            console.log(x);
        };
    }, parseInt(env.TRACKER_INTERVAL) * 60000);