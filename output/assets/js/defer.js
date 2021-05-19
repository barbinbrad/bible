window.addEventListener('load', (event) => {
    const y = new URL(location).searchParams.get('y');
    window.scroll(0, y);

    // TODO: understand lifecycle hooks
    setTimeout(() => { 
        // get all outbound links in the DOM
        let links = [...document.querySelectorAll('a')];
        let urls = new Set();

        if (links.length == 0) {
            return;
        }
        
        caches.open(`minimal-bible-${serviceWorkerVersion}`).then(function(cache) {
            // iterate over the links in the DOM
            for (link of links) {
                // get the relative URL
                let url = new URL(link.href)
                urls.add(url.pathname);
            }
            // cache all outbound links
            cache.addAll([...urls]);
        });
     }, 1000);
});