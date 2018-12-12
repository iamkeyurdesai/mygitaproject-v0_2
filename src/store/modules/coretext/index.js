import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  preview: [ ],
  summary: [ ],
  main: [ ],
  gitapress: [ ],
  sivananda: [ ],
  salutation: 'oṃ śrī paramātmane namaḥ'
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
