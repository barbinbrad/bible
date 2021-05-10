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

module.exports = {addPlusSignToNormalLink};