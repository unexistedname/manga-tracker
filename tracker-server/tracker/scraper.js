const { chromium } = require('playwright');
const axios = require('axios'); 
const path = require('path');
const fs = require('fs');  

let browser,page;
async function initBrowser() {
    browser = await chromium.launch({headless: true});
    page = await browser.newPage();
}
async function closeBrowser() {
    await browser.close();
}

async function chapterScraper(url) {
    try {
        await page.goto(url);
        await page.waitForSelector('button[data-key="chapters"]');
        await page.click('button[data-key="chapters"]')
        await page.waitForTimeout(3000);
        const list = await page.$$eval('#chapter-list > div', x =>
                x.map(y => y.getAttribute('data-chapter-number')) //ngambil chapternya pke atribut
                .filter(Boolean)
            );
        return list;
    } catch (error) {
        console.error("Error while scraping chapter: ", error);
    }
};

async function titleScraper(url) {
    try {
        await page.goto(url);
        await page.waitForSelector('h1[itemprop="name"]');
        return page.textContent('h1[itemprop="name"]');
    } catch (error) {
        console.error("Error while scraping title: ", error);
    }
};

async function descScraper(url) {
    try {
        await page.goto(url);
        await page.waitForSelector('#tabpanel-description');
        return page.textContent('#tabpanel-description div[itemprop="description"]:nth-child(2)');
    } catch (error) {
        console.error("Error while scraping description: ", error);
    }
};

async function coverScraper(url, title) {
    try {
        await page.goto(url);
        await page.waitForSelector('div[itemprop="image"]');
        const img = await page.$('div[itemprop="image"] img');
        const imgUrl = await img.getAttribute('src');

        
        const dirPath = path.join(__dirname, '..', '..', 'data', 'media');
        const fileName = `${title.replaceAll(' ', '').toLowerCase()}.png`;
        const filePath = path.join(dirPath,fileName);
        await saveCover(imgUrl, dirPath, filePath);
        return filePath;
    } catch (error) {
        console.error("Error while scraping cover: ", error);
    }    
};

async function saveCover(url, dir, full){
        const res = await axios({
            method: "get",
            url: url,
            responseType: 'stream'
        });
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
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
};