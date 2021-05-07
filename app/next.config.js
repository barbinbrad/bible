

module.exports = {
    assetPrefix: '/',

    exportPathMap: async function() {
        const paths = {
            '/': { page: '/' }
        };
        return paths; 
    }
}