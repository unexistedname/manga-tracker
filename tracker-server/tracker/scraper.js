const { chromium } = require('playwright');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

let browser, page;
async function initBrowser() {
    // Reuse browser/page if already initialized to avoid concurrent launches
    if (browser && page) {
        console.log("Browser already initialized");
        return;
    }
    try {
        browser = await chromium.launch({ headless: true });
        console.log("Browser opened");
        page = await browser.newPage();
        console.log("New tab opened");
    } catch (error) {
        console.error("Error opening browser or new tab: " + error, "\n");
        // ensure clean state
        browser = null;
        page = null;
        throw error;
    }
}
async function closeBrowser() {
    if (!browser) {
        console.log("No browser to close");
        return;
    }
    try {
        await browser.close();
        console.log("Browser closed");
    } catch (error) {
        console.error("Error closing browser: " + error, "\n");
    }
    // Kosongin variabel
    browser = null;
    page = null;
}
async function chapterScraper(url) {
    try {
        await page.goto(url);
        console.log("Going to url...");

        await page.waitForSelector('button[data-key="chapters"]')
        await page.click('button[data-key="chapters"]')
        await page.waitForTimeout(3000);

        const list = await page.$$eval('#chapter-list > div', x =>
            x.map(y => y.getAttribute('data-chapter-number')) //ngambil chapternya pke atribut
                .filter(Boolean));
        console.log(`Scraped ${list.length} chapters`);
        return list;
    } catch (error) {
        console.error("Error while scraping chapter: ", error, "\n");
    }
}
async function titleScraper(url) {
    try {
        await page.goto(url);
        await page.waitForSelector('h1[itemprop="name"]');
        console.log(`Title scraped`)
        return page.textContent('h1[itemprop="name"]');
    } catch (error) {
        console.error("Error while scraping title: ", error, "\n");
    }
}
async function descScraper(url) {
    try {
        await page.goto(url);
        await page.waitForSelector('#tabpanel-description');
        console.log(`Description scraped`)
        return page.textContent('#tabpanel-description div[itemprop="description"]:nth-child(2)');
    } catch (error) {
        console.error("Error while scraping description: ", error, "\n");
    }
}
async function coverScraper(url, title) { //Cmn ngambil url gambarnya doang, ngesavenya pake fungsi lain
    try {
        await page.goto(url);
        await page.waitForSelector('div[itemprop="image"]');
        const img = await page.$('div[itemprop="image"] img');
        const imgUrl = await img.getAttribute('src');
        console.log(`Image URL scraped`)

        const dirPath = path.join(__dirname, '..', '..', 'data', 'media');
        const fileName = `${title.replaceAll(' ', '').toLowerCase()}.png`;
        const filePath = path.join(dirPath, fileName);
        await saveCover(imgUrl, dirPath, filePath);
        return filePath;
    } catch (error) {
        console.error("Error while scraping cover: ", error, "\n");
    }
}
async function saveCover(url, dir, full) { //Jgn diapus fullnya wkwkwkw
    const res = await axios({
        method: "get",
        url: url,
        responseType: 'stream'
    });
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`No directory, created one`);
    };
    if (!fs.existsSync(full)) {
        const write = fs.createWriteStream(full);
        await res.data.pipe(write);
        write.on('finish', () => {
            console.log("Image saved in", dir);
        });
    };
}
module.exports = {
    initBrowser,
    closeBrowser,
    chapterScraper,
    titleScraper,
    descScraper,
    coverScraper
}