import * as Scraper from "./scraper";
import axios from "axios";

(async () => {
  const res = await axios.get("https://rawkuma.net/manga/isekai-walking/");
  console.log(await Scraper.chapter(res.data));
})();