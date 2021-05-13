# The "Perfect" Website
This imperfect repo creates a "perfect" webite&ndash;a minimal, static, progressive Bible hosted [here](https://minimalbible.com/read/Matthew+5).

>Let the one who boasts, boast in the Lord.
>&ndash;1 Corinthians 1:31

To create the "perfect" website using the imperfect repo, run `npm run scrape && npm run build`. The static site is generated in the `output` folder. To run the site locally run `cd ./output && python -m http.server`.


What makes a "perfect" website?
------
1. Content: does the site provide something worthwhile? 
2. Performance: how fast do pages load? 
4. Accessibility: is it friendly to humans and machines alike?
5. Privacy: does it know what you had for breakfast?


Content
------
Without trying to convince you, *dear reader*, that the Bible is worthwhile, there still exists the issue of copyright. As surprising as it may sound, the Bible can be copyrighted. The good news is that after 70 years, copyrights on Bibles like the [American Standard Version](https://www.biblegateway.com/versions/American-Standard-Version-ASV-Bible/#copy) expire, and the translation becomes public domain. So in the spirit of obedience, there we scrape.


Performance
------
Performance evaluation metrics are defined by Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse) tool. According to these metrics, the "perfect" website scores perfectly across all categories. If you've ever spent an afternoon trying to get Lighthouse to do its all-100's-confetti-animation, then I recommend find something better to do with your time. 

To optimize performance, the following strategy was used:

- Pre-render everything besides search components to static html
- Pre-cache pages from all outbound links with service worker
- Minimize and cache all assets with Cloudflare DNS
- Minimize the amount of external dependencies (like custom fonts and JS).

Aside from `output/assets/js/vue.js (121KB)` and `output/assets/read/chapter.json (122KB)`, all files are under 10KB.


Accessibility
------
To optimize accessibility for humans, the following strategy was used:

- Remove distractions (subscripts, cross-references and annotations)
- Allow cached pages to be read offline
- Use a decent `print.css`
- Implement some middleground between iPhone Reader View, and [tailwind UI](https://tailwindui.com/)

Privacy
------
The goal of the "perfect" website is to encourage more frequent reading of the Bible in a low-bandwith enviroment through text-to-speech technology or good old-fashion eye wiggling:eyes::eyes:. Since no tracking analytics is used, it is impossible to say whether the goal is being accomplished. But that's OK. Because God sees what is done in secret.


Technology
------
The scraping and the building are decoupled through a SQLite database `./database/bible.db`. [Puppeteer](https://github.com/checkly/puppeteer-examples) is used for scraping. Node is used to limit the languages. Vue is used for autocomplete. And a fairly complex string builder is used to generate the html. 


