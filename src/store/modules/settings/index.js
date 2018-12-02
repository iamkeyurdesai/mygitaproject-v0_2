import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { options } from '../../../helpers/settingsOptions'

const state = {
  options: options,
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
