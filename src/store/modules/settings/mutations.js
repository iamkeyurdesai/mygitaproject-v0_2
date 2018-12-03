const setText = (state, { list, id }) => {
state[id] = list;
}
const SET_theme = (state, input) => {
  state.theme = input
};
const SET_language = (state, input) => {
  state.language = input
};
export default {
  setText,
  SET_theme,
  SET_language
};
