import { readFileSync, writeFileSync } from 'fs';

type logEntry = {
  "Latest": number[],
  "Time": string,
  "Status": string  
}
type log = Record<string, logEntry>

type dataEntry = {
  "Original Title": string,
  "Link": string,
  "Description": string,
  "Image Directory": string,
  "Chapter List": number[]
}
type data = Record<string, dataEntry>[]

async function updater(dir:string, logDir:string): Promise<void> {
    try {
        console.log("Updating data...");
        const log: log = await JSON.parse(readFileSync(logDir, 'utf-8'));
        const data: data = await JSON.parse(readFileSync(dir, 'utf-8'));

        for (const update of Object.keys(log)) {
            const entry:string = data.find(item => Object.prototype.hasOwnProperty.call(item, update)); //chatgpt ass shit idk
            const manga = entry[update];
            manga["Chapter List"].push(...log[update]["Latest"]);
            // Sorting chapter biar berurutan
            manga["Chapter List"].sort((a:number, b:number) => a - b);
        }
        writeFileSync(dir, JSON.stringify(data, null, 2), 'utf-8');
        console.log("\x1b[32mUpdate data success!\x1b[0m");
    } catch (error) {
        console.error(error);
    }
}

export default updater;
