const bookTemplate = {
    header (title = '') {
        let html = '<!DOCTYPE html>';
        
        html +=     '<html lang="en">';
        html +=         '<head>';
        html +=             '<meta charset="UTF-8">';
        html +=             '<meta name="viewport" content="width=device-width">';       
        html +=             `<title>${title}</title>`;
        html +=             '<link rel="stylesheet" href="../assets/css/styles.css">';
        html +=             '<link rel="stylesheet" href="../assets/css/print.css" media="print">';        
        html +=             '<meta name="theme-color" content="#FFFFFF">';
        html +=         '</head>';
        html +=         '<body>';
        html +=             '<script src="../assets/js/xy-polyfill.js" nomodule></script>'
    
        return html;
    },

    book(title){
        html =              '<div>';
        html +=                 `<h2>${title}</h2>`;
        html +=             '</div>';
        return html;
    },

    chapter(number){
        html =              `<h3>Chapter ${number}</h3>`;
        return html;
    },

    text(text){
        html =              `<p>${text}</p>`;
        return html;
    },

    separator(){
        html =              '<hr/>';
        return html;
    },

    footer () {
        let html;

        html =              '</body>';
        html +=         '</html>'
        return html;
    },

    newDocument(title = ''){
        return this.header(title);
    }
    
}

module.exports = {bookTemplate};