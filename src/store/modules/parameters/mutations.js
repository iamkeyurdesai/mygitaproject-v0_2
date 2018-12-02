const increment = (state) => {
if (state.verse < state.verseall[state.chapter-1])
{
  state.verse += 1
} else {
  state.chapter += 1
  if (state.chapter > 18) state.chapter = 1
  state.verse = 1
}
};
const decrement = (state) => {
if (state.verse != 1)
{
  state.verse -= 1
} else {
  state.chapter -= 1
  if (state.chapter < 1) state.chapter = 18
  state.verse = state.verseall[state.chapter-1]
}
};
const SET_chapter = (state, input) => {
  state.chapter = input
};
const SET_verse = (state, input) => {
  state.verse = input
};
const SET_authenticated = (state, input) => {
  state.authenticated = input
};
const SET_photoURL = (state, input) => {
  state.photoURL = input
};
const SET_path = (state, input) => {
  state.path = input
};
const SET_breakSandhi = (state, input) => {
  state.breakSandhi = input
  console.log('here')
};
export default {
  increment,
  decrement,
  SET_chapter,
  SET_verse,
  SET_authenticated,
  SET_photoURL,
  SET_path,
  SET_breakSandhi
};
