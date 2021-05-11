let chapters;

fetch('../../read/chapters.json').then(
    function(data){ return data.json();}
).then(
    function(json){
        chapters = json;
    }
);
const chapterSearch = function(q){
  return chapters.map(function(chapter){
      return {
          name: chapter.name + ' ' + chapter.number,
          link: chapter.link
      }
  }).filter(function(chapter){
      return chapter.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
  }).map(function(chapter) {
    return chapter['name'];
  });
};

const chapterLink = function(description){
    let tokens = description.split(' ');
    let chapter = tokens.pop();
    let book = tokens.join(' ');
    return `${book}+${chapter}`;
}

const state = {
  autocompleteList : [],
  inputData : '',
  focusIndex : '',
  inputFocus : false
};

const mutations = {
  UPDATE_LIST(state, newList){
    state.autocompleteList = newList
  },
  RESET_LIST(state){
    state.autocompleteList = []
  },
  UPDATE_INPUT(state, text){
    state.inputData = text;
  },
  SET_FOCUS(state, val){
    state.focusIndex = val;
  },
  INCREMENT_DECREMENT_FOCUS(state, val){
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
  RESET_FOCUS(state){
    state.focusIndex = ''
  },
  CHANGE_INPUT_FOCUS(state,val){
    state.inputFocus = val
  }

};

const actions = {
  searchData({commit}, searchText){
    //dummy pengganti http request
    var searchResult = chapterSearch(searchText)  
    commit('UPDATE_LIST', searchResult)
    commit('INCREMENT_DECREMENT_FOCUS', 0)    
  },
  optionPicked({commit}, selectedText){;
    commit('UPDATE_INPUT',selectedText)
;    commit('RESET_LIST')
    alert(chapterLink(selectedText));
  },
  resetData({commit}){
    commit('RESET_LIST')
  },
  changeInput({commit},text){
    commit('UPDATE_INPUT',text)
  },
  focusChange({commit}, val){
    commit('INCREMENT_DECREMENT_FOCUS',val)
  },
  setFocus({commit}, val){
    commit('SET_FOCUS',val)
  },
  inputFocus({commit}, val){
    commit('CHANGE_INPUT_FOCUS',val)
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
  props : ['minInput','urlDataSource'],
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
        this.$store.dispatch('changeInput', value)
      }
    },
    isFocus () {
      return this.$store.state.inputFocus
    }

  },
	data: function(){
    return {}
	},
  methods: {
    fetchData: function(e){
      if(this.inputtext.length>=this.minInput && this.isFocus){
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

// end autocomplete component
// data list component
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