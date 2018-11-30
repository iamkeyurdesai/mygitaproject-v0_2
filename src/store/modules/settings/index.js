import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  options: { },
  theme: 'lakshmi',
  language: 'devanagari'
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
