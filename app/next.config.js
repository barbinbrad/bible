import {getStore} from '../data/database'

const store = getStore();

module.exports = {
    assetPrefix: './'

    exportPathMap: async function() {
        const paths = {
            '/': { page: '/' }
        };
        return paths; 
    }
}