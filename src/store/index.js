import Vue from 'vue';
import Vuex from 'vuex';
import audiolabelsModule from './modules/audiolabels';
import coretextModule from './modules/coretext';
import parametersModule from './modules/parameters';
import settingsModule from './modules/settings';
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    audiolabels: audiolabelsModule,
    coretext: coretextModule,
    parameters: parametersModule,
    settings: settingsModule
  },
  plugins: [createPersistedState({
    paths: ['parameters']
  })]
});
