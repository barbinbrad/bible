# A Minimal Bible
![Lighthouse Score](https://raw.githubusercontent.com/barbinbrad/the-perfect-website/master/lighthouse.png?raw=true)

This repo creates a minimal, mostly-static, progressive Bible hosted at [minimalbible.com](https://minimalbible.com/read/Luke+6). The basic gist is that a puppeteer web-scraper saves the results to SQLite database, which is then used to statically render each chapter of the Bible, with some navigation in Vue.

To install the dependencies run `npm install`. To build the website, run `npm run build`. The static site is generated in the `output` folder. To run the site locally run `cd ./output && python -m http.server`.

To run the scraper, set the version in `config.js` and run `npm run scrape`.

:mechanical_arm: Performance 
------
The site is high performance. [Google's Lighthouse tool](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fminimalbible.com%2Fread%2FGenesis%2B1%2F) scores the website as 100 across all categories (as of 5/21). 


To optimize performance, the following strategy was used:

- [Pre-render everything](https://github.com/barbinbrad/the-perfect-website/blob/6537e1613d819dba253491a45fc18e05a668e838/build/build-pages.js#L10) besides search components to static html
- [Pre-cache pages](https://github.com/barbinbrad/the-perfect-website/blob/04c138499f02b33fe30869ad65c7034a77b06966/output/assets/js/scripts.js#L385) from all outbound links with service worker
- Minimize and cache all assets with Cloudflare DNS
- Minimize the amount of external dependencies (like custom fonts and JS).

All generated files are under 10KB except `output/assets/js/vue.js (101KB)` and `output/assets/read/chapter.json (122KB)`. These are both low-hanging fruit for performance enhacements.


:microscope: Technology
------
The scraping and the building are decoupled through a SQLite database located in `database/bible.db`. [Puppeteer](https://github.com/checkly/puppeteer-examples) is used for scraping. Node is used for building to limit the language, but it's just basic string concatenation. Vue is used for the navigation components because it feels good. 


:brain: Inspiration
-------
- Aaron Swartz [Who writes Wikipedia?](http://www.aaronsw.com/weblog/whowriteswikipedia)
- Manuel Matuzo: [My current HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/)
- Barry Smith: [motherf***ingwebsite.com](http://motherfuckingwebsite.com/)
- Jon Staab [ESV Bible](https://github.com/staab/esv)

