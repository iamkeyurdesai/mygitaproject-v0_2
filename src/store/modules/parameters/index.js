import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  chapter: 1,
  verse: 1,
  verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78, 23, 1, 2, 1, 9] ,
  authenticated: false,
  photoURL: 'not singed in',
  path: '/recite/api=1&chapter=1&verse=1',
  showNav: true,
  breakSandhi: false,
  showLink: false,
  showTranslation: false,
  showVerse: true,
  showAnvaya: false,
  columnCount: 2,
  mainItem: 'recite',
  theme: 'dark',
  language: 'english',
  script: 'iast',
  fsize: 'medium',
  fweight: '300',
  offsetTop: 0,
  fabShow: true,
  loadTheRestOfVerses: false,
  activeReciteTab: "chant",
  reciteChantFontSize: 3
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
