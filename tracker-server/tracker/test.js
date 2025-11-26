import {resolve, join} from 'path';
import { readFileSync } from 'fs';
const img = resolve("./data/media");
import { format } from 'date-and-time';
const mangaData = JSON.parse(readFileSync('./../../data/data.json', 'utf8'));

// console.log('\x1b[31mIni teks merah\x1b[0m');
// console.log('\x1b[32mIni teks hijau\x1b[0m');
// console.log('\x1b[33mIni teks kuning\x1b[0m');
// console.log('\x1b[34mIni teks biru\x1b[0m');
// console.log(`\x1b[32mSuccessfully save s update log\x1b[0m`)
// process.stdout.write("Noise");


// setTimeout(() => console.log("\rHalo dunia"), 1000);
const a = {
  "Drawing": {
    "Latest": [1,2,3],
    "Time": "2025/11/26 20:53:09",
    "Status": "Active"
  },
  "Bijo to Kenja": {
    "Latest": [],
    "Time": "2025/11/26 20:53:18",
    "Status": "Active"
  }
}

for (let x of Object.keys(a)) {
        console.log(a[x]["Latest"]);
        
}
