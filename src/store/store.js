import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: false,
  state: {
    preview: [ ],
    summary: [ ],
    params: [ ],
    main: [ ],
    gitapress: [ ],
    chapter: 11,
    verse: 13,
    verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78] ,
    authenticated: false,
    photoURL: 'not singed in',
    lang: 'gujarati'
  },
  getters: {
    chapter: (state) => { return state.chapter },
    verse: (state) => { return state.verse },
    mymain: (state, getters) => {
      let mytemp =  state.main.filter(function(item) {
        return (item.chapter_id == getters.chapter &&  item.verse_id == getters.verse);
      });
      return mytemp[0];
    },
    mygitapress: (state, getters) => {
      let mytemp =  state.gitapress.filter(function(item) {
        return (item.chapter_id == getters.chapter &&  item.verse_id == getters.verse);
      });
      return mytemp[0];
    }
  },
  mutations: {
      setText: (state, { list, id }) => {
      state[id] = list;
      console.log(state[id]);
    },
      increment: (state) => {
      if (state.verse < state.verseall[state.chapter-1])
      {
        state.verse += 1
      } else {
        state.chapter += 1
        if (state.chapter > 18) state.chapter = 1
        state.verse = 1
      }
    },
      decrement: (state) => {
      if (state.verse != 1)
      {
        state.verse -= 1
      } else {
        state.chapter -= 1
        if (state.chapter < 1) state.chapter = 18
        state.verse = state.verseall[state.chapter-1]
      }
    }
  },
  actions: {
    // updateParams: (context, payload) => {
    //   function(){ // reach out for data
    //     context.commit('updateParams', payload);
    //   };
    // },
    loadText: function ({ commit }) {
      const ax = axios.create({
      baseURL: 'https://gitawebapp.firebaseapp.com/static/'
      })
      ax.get('assets/text/json/mygitapress_preview.json', { crossdomain: true}).then((response) => {
        commit('setText', { list: response.data,  id: "preview"})
      }, (err) => {
        console.log(err)
      });
      ax.get('assets/text/json/mygitapress_summary.json', { crossdomain: true}).then((response) => {
        commit('setText', { list: response.data,  id: "summary"})
      }, (err) => {
        console.log(err)
      });
      ax.get('assets/text/json/mymain.json', { crossdomain: true}).then((response) => {
        commit('setText', { list: response.data,  id: "main"})
      }, (err) => {
        console.log(err)
      });
      ax.get('assets/text/json/mygitapress.json', { crossdomain: true}).then((response) => {
        commit('setText', { list: response.data,  id: "gitapress"})
      }, (err) => {
        console.log(err)
      });
      console.log('I am here')
    }
  }
});
