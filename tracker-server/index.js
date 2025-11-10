const path = require('path');
const fs = require('fs');
const tracker = require('./tracker/tracker');
const mangaData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log(parseInt(process.env.interval));

/* 
- memulai tracking tiap x menit
- kyk dcbot python
- if tracker != 0, announce bot + write file
*/

// setInterval(
// }, 1000); // convert minutes to milliseconds
async function update(title) {
      const x = await tracker(title);
      return x;
}
for (let manga of mangaData) {
    const title = Object.keys(manga);
    update(title).then(x => {
        console.log(x);
    });
};