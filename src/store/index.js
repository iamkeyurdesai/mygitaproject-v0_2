import Vue from 'vue';
import Vuex from 'vuex';
import coretextModule from './modules/coretext';
import parametersModule from './modules/parameters';
import settingsModule from './modules/settings';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    coretext: coretextModule,
    parameters: parametersModule,
    settings: settingsModule
  },
});
