/*
    Icons
*/

const LeftArrow  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Previous</title><path d="M10.75 0a.74.74 0 0 1 .53.22.75.75 0 0 1 0 1.06l-9.47 9.47 9.47 9.47a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06l10-10a.73.73 0 0 1 .53-.22z"></path></svg>';
const RightArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 21.5" width="11.5" height="21.5"><title>Next</title><path d="M.75 21.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l9.47-9.47L.22 1.28A.75.75 0 0 1 1.28.22l10 10a.75.75 0 0 1 0 1.06l-10 10a.74.74 0 0 1-.53.22z"></path></svg>';
const SearchIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>';
const MenuIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
const ExitIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

/*
    Vue Components
*/

const AutoComplete = autocompleteTemplate(); 
const AutoCompleteResults = autocompleteResultsTemplate();
const ChapterDrawer = chapterDrawerTemplate();

function autocompleteTemplate(){
    html = '<script type="text/x-template" id="autocomplete">';
    html +=     '<div>';
    html +=         '<input type="text" placeholder="Search" @keyup="fetchData()" @keydown="setFocus" @focus="inputFocus(true)" @blur="inputFocus(false)" v-model="inputtext" :class="{ isFocused  : isFocus }" class="form-control"/>';
    html +=         '<list :results="autocompleteList"></list>'  
    html +=     '</div>';
    html += '</script>';

    return html;
}

function autocompleteResultsTemplate(){
    html = '<script type="text/x-template" id="results-list">';
    html +=     '<div class="results">';
    html +=         '<div class="autolist" v-if="results.length>0">';
    html +=             '<ul class="list-group">';
    html +=                 '<li class="list-group-item" :class="checkSelected(index)" v-for="(result, index) in results" @mousemove="mouseHover(index)" @mousedown="selectResult(index)">{{result}}</li>';
    html +=             '</ul>';
    html +=         '</div>';
    html +=     '</div>';
    html += '</script>';
    
    return html;
}

function chapterDrawerTemplate(){
    html = '<script id="chapter-slideout" type="text/x-template">';
    html +=     '<div class="chapter-drawer" :class="{ isOpen: isOpen }" @focusout="close">';
    html +=         '<div class="chapter-drawer-opener" v-if="!isOpen" @click="open">';
    html +=             MenuIcon;
    html +=         '</div>';
    html +=         '<div class="chapter-drawer-background" @click="close">';
    html +=             '<div class="chapter-drawer-closer" @click="close">';
    html +=                 ExitIcon;
    html +=             '</div>';
    html +=             '<ul class="chapter-drawer-menu">';
    html +=                 '<li class="chapter-drawer-menu-item" v-for="book in bookChapters">';
    html +=                     '<a :class="{ active  : book.active }" :href="book.link">{{book.name}} {{book.number}}</a>';
    html +=                 '</li>';
    html +=             '</ul>';
    html +=         '</div>';
    html +=     '</div>';
    html += '</script>';

    return html;
}

module.exports = {LeftArrow, RightArrow, SearchIcon, AutoComplete, AutoCompleteResults, ChapterDrawer};