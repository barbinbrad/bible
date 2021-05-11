document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

let chapters;
let books;

fetch('../../read/chapters.json').then(
    function(data){ return data.json();}
).then(
    function(json){
        chapters = json;
    }
);

fetch('../../read/books.json').then(
  function(data){ return data.json();}
).then(
  function(json){
      books = json;
  }
);

const bookSearch = function(q){
  return books.filter(function(book){
      return book.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
  }).map(function(book) {
    return book['name'];
  });
};

const firstChapterLink = function(book){
    return `../${book}+1`;
};

const state = {
  autocompleteList : [],
  chapterList: [],
  inputData : '',
  focusIndex : '',
  inputFocus : false
};

const mutations = {
  UPDATE_AUTOCOMPLETE_LIST(state, newList){
    state.autocompleteList = newList
  },
  RESET_AUTOCOMPLETE(state){
    state.autocompleteList = []
  },
  UPDATE_AUTOCOMPLETE_INPUT(state, text){
    state.inputData = text;
  },
  SET_AUTOCOMPLETE_FOCUS(state, val){
    state.focusIndex = val;
  },
  ADJUST_AUTOCOMPLETE_FOCUS(state, val){
    if(state.focusIndex === ''){
      state.focusIndex = 0
    }else{
      state.focusIndex += val
      if(state.focusIndex<0){
        state.focusIndex = 0
      }else if(state.focusIndex>0 && state.focusIndex>state.autocompleteList.length-1){
        state.focusIndex = state.autocompleteList.length-1
      }      
    }

  },
  RESET_AUTOCOMPLETE_FOCUS(state){
    state.focusIndex = ''
  },
  UPDATE_AUTOCOMPLETE_FOCUS(state,val){
    state.inputFocus = val
  }

};

const actions = {
  searchData({commit}, q){
    var searchResult = bookSearch(q)  
    commit('UPDATE_AUTOCOMPLETE_LIST', searchResult);
    commit('ADJUST_AUTOCOMPLETE_FOCUS', 0);    
  },
  optionPicked({commit}, selectedText){;
    commit('UPDATE_AUTOCOMPLETE_INPUT',selectedText);    
    commit('RESET_AUTOCOMPLETE');
    window.location.href = firstChapterLink(selectedText);
  },
  resetData({commit}){
    commit('RESET_AUTOCOMPLETE');
  },
  changeInput({commit},text){
    commit('UPDATE_AUTOCOMPLETE_INPUT',text);
  },
  focusChange({commit}, val){
    commit('ADJUST_AUTOCOMPLETE_FOCUS',val);
  },
  setFocus({commit}, val){
    commit('SET_AUTOCOMPLETE_FOCUS',val);
  },
  inputFocus({commit}, val){
    commit('UPDATE_AUTOCOMPLETE_FOCUS',val);
  }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

Vue.component('autocomplete',{
	template: '#autocomplete',
  created : function(){
  },
  data: function(){
    return {}
  },
  computed : {
    autocompleteList () {
      if(this.isFocus){
        return this.$store.state.autocompleteList        
      }else{
        return []
      }
    },
    inputtext : {
      get () {
        return this.$store.state.inputData
      },
      set (value) {
        this.$store.dispatch('changeInput', value);      
      }
    },
    isFocus () {
      return this.$store.state.inputFocus
    }

  },
	methods: {
    fetchData: function(e){
      if(this.inputtext.length>=1 && this.isFocus){
        this.$store.dispatch('searchData', this.inputtext)
      }else{
        this.$store.dispatch('resetData')
      }
    },
    setFocus : function(e){
      var keycode = e.keyCode;
      var listLn = this.autocompleteList.length;
      
      if(listLn == 0)
        return;
      switch (keycode) {
          case 40: 
            this.$store.dispatch('focusChange',1);
            break;
          case 38: 
            this.$store.dispatch('focusChange',-1);
            break;
          case 13: 
            this.$store.dispatch('optionPicked', this.autocompleteList[this.$store.state.focusIndex]);
            e.target.blur();
            //this.$store.dispatch('inputFocus',false);
            break;
          case 27: 
            e.target.blur();
            this.$store.dispatch('resetData');
            break;
        }
    },
    inputFocus : function(val){
      this.$store.dispatch('inputFocus',val);
    }
  },

});


Vue.component('list',{
	template: '#results-list',
  created : function(){
  },
  props : ['fetchedData'],
  methods: {
    selectMe : function(idx){
  this.$store.dispatch('optionPicked',this.fetchedData[idx]);
    },
    checkSelected : function(idx){
      return {
        'selected' : idx == this.$store.state.focusIndex
      }
    },
    mouseHover : function(idx){
      this.$store.dispatch('setFocus',idx);
    }
  },
});


new Vue({
	el: '#search',
  store
});