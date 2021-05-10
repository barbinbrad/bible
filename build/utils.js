function addPlusSignToNormalLink(url){
    if(url == null) return null;
    let tokens = url.split(' ');
    if(tokens.length > 1){
        tokens[tokens.length - 2] += '+' + tokens[tokens.length - 1].trim();
        tokens.pop();
        return tokens.join(' ');
    }
    else{
        return url;
    }
}

const LeftArrow  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Previous</title><path d="M10.75 0a.74.74 0 0 1 .53.22.75.75 0 0 1 0 1.06l-9.47 9.47 9.47 9.47a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06l10-10a.73.73 0 0 1 .53-.22z"></path></svg>';
const RightArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Next</title><path d="M.75 21.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l9.47-9.47L.22 1.28A.75.75 0 0 1 1.28.22l10 10a.75.75 0 0 1 0 1.06l-10 10a.74.74 0 0 1-.53.22z"></path></svg>';

module.exports = {addPlusSignToNormalLink, LeftArrow, RightArrow};