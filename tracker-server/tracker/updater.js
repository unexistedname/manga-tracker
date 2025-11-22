import { readFileSync, writeFileSync } from 'fs';

async function updater(dir, logDir) {
    try {
        console.log("Updating data...");
        const log = JSON.parse(readFileSync(logDir, 'utf-8'));
        const data = JSON.parse(readFileSync(dir, 'utf-8'));

        for (const update of Object.keys(log)) {
            const entry = await data.find(item => Object.prototype.hasOwnProperty.call(item, update)); //chatgpt ass shit idk
            const manga = entry[update];
            manga["Chapter List"].push(...log[update]);
            // Sorting chapter biar berurutan
            manga["Chapter List"].sort((a, b) => a - b);
        }
        writeFileSync(dir, JSON.stringify(data, null, 2), 'utf-8');
        console.log("Update data success!");
    } catch (error) {
        console.error(error);
    }
}

export default updater;
