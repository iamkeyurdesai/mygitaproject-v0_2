import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  chapter: 11,
  verse: 13,
  verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78] ,
  authenticated: false,
  photoURL: 'not singed in',
  path: '/reflect/1/1',
  breakSandhi: false,
  audio: true,
  mainItem: 'Text',
  subItem: 'read',
  navItem: 'Story',
  theme: 'kali',
  language: 'devanagari'
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
