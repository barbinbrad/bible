# The "Perfect" Website
This imperfect repo creates a "perfect" website&ndash;a minimal, mostly-static, progressive Bible hosted [here](https://minimalbible.com/read/Luke+6). The code is fairly crappy, so if you can make an improvement, please feel welcome!

The basic gist is that a puppeteer web-scraper saves the results to SQLite database, which is then used to statically render each chapter of the Bible, with some navigation in Vue.

To build the "perfect" website using the imperfect repo, run `npm run build`. The static site is generated in the `output` folder. To run the site locally run `cd ./output && python -m http.server`.

To run the scraper, set the version in `config.js` and run `npm run scrape`.

What makes a "perfect" website?
------
1. :fire: Content: does the site provide something worthwhile? 
2. :mechanical_arm: Performance: does the page load fast and without jank?
4. :convenience_store: Accessibility: is it friendly to humans and machines alike?
5. :hear_no_evil: Privacy: does it demand anything in return?


:fire: Content 
------
Whether or not the bible is worthwhile is up to you to decide. From a content-perspective, the big problem is copyright. Bible translators do not share open-source values. To get around this problem, there’s two possibilities:
1. Use the ASV version that’s written in old-English.
2. Scrape a more readable, copyrighted version and accept the consequences. 

I choose to accept the consequences because I want you to enjoy reading the Bible.

:mechanical_arm: Performance 
------
Performance evaluation metrics are defined by [Google's Lighthouse tool](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fminimalbible.com%2Fread%2FGenesis%2B1%2F). According to these metrics, the "perfect" website scores 90+ across all categories. 

![Lighthouse Score](https://raw.githubusercontent.com/barbinbrad/the-perfect-website/master/lighthouse.png?raw=true)

To optimize performance, the following strategy was used:

- [Pre-render everything](https://github.com/barbinbrad/the-perfect-website/blob/6537e1613d819dba253491a45fc18e05a668e838/build/build-pages.js#L10) besides search components to static html
- [Pre-cache pages](https://github.com/barbinbrad/the-perfect-website/blob/6537e1613d819dba253491a45fc18e05a668e838/output/assets/js/scripts.js#L317) from all outbound links with service worker
- Minimize and cache all assets with Cloudflare DNS
- Minimize the amount of external dependencies (like custom fonts and JS).

All generated files are under 10KB except `output/assets/js/vue.js (101KB)` and `output/assets/read/chapter.json (122KB)`. These are both low-hanging fruit for performance enhacements.


:convenience_store: Accessibility 
------
To optimize accessibility for humans, the following strategy was used:

- Remove distractions (subscripts, cross-references and annotations)
- Allow cached pages to be read offline
- Support no JavaScript environments
- Implement some middleground between iPhone Reader View, and [tailwind UI](https://tailwindui.com/)
- Use a decent `print.css`


:hear_no_evil: Privacy 
------
The goal of the "perfect" website is to encourage more frequent reading of the Bible in any enviroment with any technology. Without tracking analytics, it is difficult to say whether the goal is being accomplished. But that's OK. Because God sees what is done in secret.


:microscope: Technology
------
The scraping and the building are decoupled through a SQLite database located in `database/bible.db`. [Puppeteer](https://github.com/checkly/puppeteer-examples) is used for scraping. Node is used for building to limit the language, but it's just basic string concatenation. Vue is used for the navigation components because it feels good. 


:brain: Inspiration
-------
- Aaron Swartz [Who writes Wikipedia?](http://www.aaronsw.com/weblog/whowriteswikipedia)
- Manuel Matuzo: [My current HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/)
- Barry Smith: [motherf***ingwebsite.com](http://motherfuckingwebsite.com/)
- Jon Staab [ESV Bible](https://github.com/staab/esv)

