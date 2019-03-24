import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  chapter: 1,
  verse: 1,
  verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78] ,
  authenticated: false,
  photoURL: 'not singed in',
  path: '/reflect/primary',
  breakSandhi: false,
  mainItem: 'read',
  theme: 'kali',
  language: 'hindi',
  script: 'devanagari',
  fsize: 'medium',
  fweight: '300',
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
