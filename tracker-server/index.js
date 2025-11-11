const path = require('path');
const fs = require('fs');
const tracker = require('./tracker/tracker');
const mangaData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const trackerLog = console.log;

console.log = (...args) => {
      const stackLine = new Error().stack.split("\n")[2].trim();
  
  // Contoh isi stackLine:
  // "at Object.<anonymous> (/Users/you/project/test.js:10:5)"

  // Ambil hanya path di dalam tanda kurung ()
  const match = stackLine.match(/\((.*):\d+:\d+\)$/);
  const filePath = match ? match[1] : stackLine;
  trackerLog(`[${path.basename(filePath)}]`, ...args);
};

/* 
- memulai tracking tiap x menit
- kyk dcbot python
- if tracker != 0, announce bot + write file
*/

// setInterval(
// }, 1000); // convert minutes to milliseconds)
(async () => {
    for (let manga of mangaData) {
        const title = Object.keys(manga);
        const x = await tracker(title);
        console.log(x);

    };
})();