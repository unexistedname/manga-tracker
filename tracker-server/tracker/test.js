const fs = require('fs');
const {chapterScraper, initBrowser, closeBrowser} = require('./scraper');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

const hehe = data.find(x => 
  x === "Drawing"
);