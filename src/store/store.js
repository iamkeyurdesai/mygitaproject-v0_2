import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
import {obj} from './gitabyfootandwords_sanskrit';
export const store = new Vuex.Store({
  strict: false,
  state: {
    text: [ ],
    params: [ ]
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
    // updateParams: (state, payload) => {
    //   state.params = payload;
    // },
    setText: (state, { list }) => {
      console.log("I am here");
      state.text = list;
      console.log(state.text.chhandaH);
    }
  },
  actions: {
    // updateParams: (context, payload) => {
    //   function(){ // reach out for data
    //     context.commit('updateParams', payload);
    //   };
    // },
    loadText: function ({ commit }) {
      // axios.get('http://jsonplaceholder.typicode.com/posts').then((response) => {
  //     const ax = axios.create({
  // baseURL: 'http://localhost:8080/data'
  //  })
      // ax.get('gitabyfootandwords_sanskrit.json', { crossdomain: true }).then((response) => {
      //   commit('setText', { list: response.data })
      // }, (err) => {
      //   console.log(err)
      // });
      // obj = JSON.parse(data);
      console.log('I am here')
      commit('setText', { list: obj });

    }
  }
});
