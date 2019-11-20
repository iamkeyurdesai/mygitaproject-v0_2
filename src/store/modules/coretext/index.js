import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  preview: [ ],
  summary: [ ],
  main: [ ],
  gitapress: [ ],
  sivananda: [ ],
  sanskritLabels: { },
  salutation: 'oṃ śrī paramātmane namaḥ',
  indexWord: null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
