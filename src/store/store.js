import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
import {obj} from './gitabyfootandwords_sanskrit';


export const store = new Vuex.Store({
  strict: false,
  state: {
    text: obj,
    preview: [ ],
    summary: [ ],
    params: [ ],
    main: [ ],
    chapter: 11,
    verse: 13
  },
  // getters: {
  //   getParams: (state) => {
  //           var params = state.params.map(
  //               return {
  //                   params: product.params,
  //           });
  //           return params;
  //       }
  // },
  mutations: {
      setText: (state, { list, id }) => {
      state[id] = list;
      console.log(state[id]);
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
      baseURL: 'https://gitawebapp.firebaseapp.com/'
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
      console.log('I am here')
    }
  }
});
