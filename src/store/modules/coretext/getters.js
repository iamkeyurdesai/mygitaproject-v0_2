import Sanscript from 'Sanscript';
const GET_main = (state, getters, rootState) => {
  let mytemp =  state.main.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter &&  item.verse_id == rootState.parameters.verse);
  });
  return mytemp[0];
};

const GET_gitapress = (state, getters, rootState) => {
  let mytemp =  state.gitapress.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter &&  item.verse_id == rootState.parameters.verse);
  });
  return mytemp[0];
};

const GET_sivananda = (state, getters, rootState) => {
  let mytemp =  state.sivananda.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter &&  item.verse_id == rootState.parameters.verse);
  });
  return mytemp[0];
};

const GET_salutation = (state, getters, rootState) => {
  return Sanscript.t(state.salutation, 'iast', rootState.parameters.script);
};

export default {
  GET_main,
  GET_gitapress,
  GET_salutation,
  GET_sivananda
};
