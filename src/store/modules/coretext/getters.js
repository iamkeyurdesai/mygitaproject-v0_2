import Sanscript from 'Sanscript';
const GET_main = (state, getters, rootState) => {
  let mytemp =  state.main.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter &&  item.verse_id == rootState.parameters.verse);
  });
  return mytemp[0];
};

const GET_main_chapter = (state, getters, rootState) => {
  let mytemp =  state.main.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter);
  }).sort((a, b) => a.verse_id - b.verse_id)
  return mytemp;
};

const GET_preview_chapter = (state, getters, rootState) => {
  let mytemp =  state.preview.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter);
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

const GET_gitapress_chapter = (state, getters, rootState) => {
  let mytemp =  state.gitapress.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter);
  });
  return mytemp;
};

const GET_sivananda_chapter = (state, getters, rootState) => {
  let mytemp =  state.sivananda.filter(function(item) {
    return (item.chapter_id == rootState.parameters.chapter);
  });
  return mytemp;
};

const GET_gitapress_method = (state, getters, rootState) => {
return (value) => {
  let mytemp =  state.gitapress.filter(function(item) {
    return (item.chapter_id == value[0] &&  item.verse_id == value[1]);
  });
  return mytemp[0];
}
};

const GET_sivananda_method = (state, getters, rootState) => {
return (value) => {
  let mytemp =  state.sivananda.filter(function(item) {
    return (item.chapter_id == value[0] &&  item.verse_id == value[1]);
  });
  return mytemp[0];
}
};
export default {
  GET_main,
  GET_main_chapter,
  GET_gitapress,
  GET_salutation,
  GET_sivananda,
  GET_gitapress_chapter,
  GET_preview_chapter,
  GET_sivananda_chapter,
  GET_sivananda_method,
  GET_gitapress_method
};
