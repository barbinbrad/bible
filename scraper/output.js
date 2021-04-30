const output = {
    header () {
        let html;

        html =  '<html>'
        html +=     '<head>';
        html +=     '</head>';
        html +=     '<body>';

        return html;
    },

    book(title){
        return `<h2>${title}</h2>`;
    },

    chapter(number){
        return `<h3>Chapter ${number}</h3>`
    },

    text(text){
        return `<p>${text}</p>`;
    },

    separator(){
        return '<hr/>';
    },

    footer () {
        let html;

        html =     '</body>';
        html += '</html>'
        return html;
    },

    newDocument(){
        return this.header();
    }
    
}

module.exports = output;