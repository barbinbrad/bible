class HTML {
    strip(input){
        return input.replaceAll(/<.*>/gi, '');
    }
}   


module.export = HTML;