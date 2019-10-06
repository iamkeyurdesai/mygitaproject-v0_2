import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  chapter: 1,
  verse: 1,
  verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78, 23, 1, 2, 1, 9] ,
  authenticated: false,
  photoURL: 'not singed in',
  userName: '',
  path: '/recite/api=1&chapter=1&verse=1',
  showNav: true,
  breakSandhi: false,
  showLink: false,
  showTranslation: false,
  showVerse: true,
  showAnvaya: false,
  currentChantGroup: 'Myself',
  userClaims: {},
  currentChantGroupURL: '',
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
  activeTab: "chant",
  reciteChantFontSize: 3,
  activeTabTrack: {
    read: "full",
    recite: "chant",
    reflect: "word",
    meditate: "unique"
  },
  isDeveloper: false,
  alphabetSelect: {
    column: {
      vowel: true,
      short: true,
      long: false,
      consonant: true,
      stop: true,
      nasal: true,
      semivowel: true,
      sibilant: true,
      unvoiced: true,
      voiced: true,
      unaspirated: true,
      aspirated: true
    },
    row: {
      velar: false,
      palatal: false,
      retroflex: false,
      dental: true,
      labial: true,
      palatovelar: true,
      labiovelar: true,
      nasalization: true,
      discharge: true
    }
  }

};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
