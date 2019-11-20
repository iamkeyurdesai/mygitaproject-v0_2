const setText = (state, { list, id }) => {
state[id] = list;
}
const SET_indexWord = (state, input) => {
  state.indexWord = input
}
export default {
  setText,
  SET_indexWord
}
