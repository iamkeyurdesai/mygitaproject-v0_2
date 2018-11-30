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
const setChapter = (state, input) => {
  state.chapter = input
};
const setVerse = (state, input) => {
  state.verse = input
};
export default {
  increment,
  decrement,
  setChapter,
  setVerse
};
