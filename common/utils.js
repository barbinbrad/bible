function makeListOfTextWithoutChildrenFromElements(input){
    list = [];

    for(element of input){
        for(child of element.childNodes){
            if(!child.firstChild && child.textContent.trim().length > 0){
                list.push(child.textContent.trim());
            }                       
        }
    }
    
    return list;
}


module.exports = {
    makeListOfTextWithoutChildrenFromElements
};