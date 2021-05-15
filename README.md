# The "Perfect" Website
This imperfect repo creates a "perfect" webite&ndash;a minimal, static, progressive Bible hosted [here](https://minimalbible.com/read/Matthew+5). It doesn't use any fancy frameworks. Just some crappy JavaScript.

To create the "perfect" website using the imperfect repo, run `npm run scrape && npm run build`. The static site is generated in the `output` folder. To run the site locally run `cd ./output && python -m http.server`.


What makes a "perfect" website?
------
1. :fire: Content: does the site provide something worthwhile? 
2. :mechanical_arm: Performance: does the page load fast and without jank?
4. :convenience_store: Accessibility: is it friendly to humans and machines alike?
5. :hear_no_evil: Privacy: does it demand anything in return?


:fire: Content 
------
Without trying to convince you, *dear reader*, that the Bible is worthwhile, there still exists the issue of copyright. As surprising as it may sound, the Bible can be copyrighted. The good news is that after 70 years, copyrights on Bibles like the [American Standard Version](https://www.biblegateway.com/versions/American-Standard-Version-ASV-Bible/#copy) expire, and the translation becomes public domain. So in the spirit of obedience, there we scrape.


:mechanical_arm: Performance 
------
Performance evaluation metrics are defined by Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse) tool. According to these metrics, the "perfect" website scores perfectly across all categories. If you've ever spent an afternoon trying to get Lighthouse to do its all-100's-confetti-animation, then I recommend find something better to do with your time. 

To optimize performance, the following strategy was used:

- Pre-render everything besides search components to static html
- Pre-cache pages from all outbound links with service worker
- Minimize and cache all assets with Cloudflare DNS
- Minimize the amount of external dependencies (like custom fonts and JS).

Aside from `output/assets/js/vue.js (121KB)` and `output/assets/read/chapter.json (122KB)`, all files are under 10KB.


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
The goal of the "perfect" website is to encourage more frequent reading of the Bible in any enviroment with any technology. Since no tracking analytics is used, it is impossible to say whether the goal is being accomplished. But that's OK. Because God sees what is done in secret.


:microscope: Technology
------
The scraping and the building are decoupled through a SQLite database `./database/bible.db`. [Puppeteer](https://github.com/checkly/puppeteer-examples) is used for scraping. Node is used to limit the languages. Vue is used for autocomplete. And a fairly complex string builder is used to generate the html. 


:brain: Inspiration
-------
Manuel Matuzo: [My current HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/)
Barry Smith: [motherf***ingwebsite.com](http://motherfuckingwebsite.com/)

