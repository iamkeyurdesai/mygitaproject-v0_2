import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  preview: [ ],
  summary: [ ],
  main: [ ],
  gitapress: [ ],
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
