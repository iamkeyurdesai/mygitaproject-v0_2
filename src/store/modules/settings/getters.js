const GET_dark = (state, getters, rootState) => {
  return state.options[rootState.parameters.theme].dark
}
export default {
  GET_dark
};
