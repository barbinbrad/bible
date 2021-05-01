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
        html =              `<footer>Generated with <a href="https://github.com/barbinbrad/king-james">king-james</a> at ${new Date().toLocaleString()}</footer>`;
        html +=              '</body>';
        html +=         '</html>'
        return html;
    },

    newDocument(title = ''){
        return this.header(title);
    }
    
}

const contentsTemplate = {
    header (title = '') {
        let html = '<!DOCTYPE html>';
        
        html +=     '<html lang="en">';
        html +=         '<head>';
        html +=             '<meta charset="UTF-8">';
        html +=             '<meta name="viewport" content="width=device-width">';       
        html +=             '<title>Books of the Bible</title>';
        html +=             '<link rel="stylesheet" href="../assets/css/styles.css">';
        html +=             '<link rel="stylesheet" href="../assets/css/print.css" media="print">';        
        html +=             '<meta name="theme-color" content="#FFFFFF">';
        html +=         '</head>';
        html +=         '<body>';
        html +=             '<h1>Bible</h1>'
        html +=             '<ul>';
        return html;
    },

    book(title, link){
        html =                  '<li>';
        html +=                     `<a href=${link}>${title}</a>`;
        html +=                 '</li>';
        return html;
    },

    footer () {
        let html;
        html =                  '<ul>';
        html +=                 `<footer>Generated with <a href="https://github.com/barbinbrad/king-james">king-james</a> at ${new Date().toLocaleString()}</footer>`;
        html +=              '</body>';
        html +=         '</html>'
        return html;
    },

    newDocument(){
        return this.header();
    }
}

module.exports = {bookTemplate, contentsTemplate};