const increment = (state) => {


if (state.verse < state.verseall[state.chapter-1])
{
  state.verse += 1
} else {
  state.chapter += 1
  if (state.chapter > 18) state.chapter = 1
  if (state.chapter === 13)  {
    state.verse = 0
  } else {
    state.verse = 1
  }
}

};
const decrement = (state) => {
if (state.chapter === 13)  {
  if (state.verse != 0)
  {
    state.verse -= 1
  } else {
    state.chapter -= 1
    if (state.chapter < 1) state.chapter = 18
    state.verse = state.verseall[state.chapter-1]
  }
} else {
  if (state.verse != 1)
  {
  state.verse -= 1
  } else {
  state.chapter -= 1
  if (state.chapter < 1) state.chapter = 18
  state.verse = state.verseall[state.chapter-1]
 }
}
};

const SET_chapter = (state, input) => {
  state.chapter = input
  if (state.chapter === 13)  {
    state.verse = 0
  } else {
    state.verse = 1
  }
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
};
const SET_audio = (state, input) => {
  state.audio = input
};
const SET_mainItem = (state, input) => {
  state.mainItem = input
};
const SET_subItem = (state, input) => {
  state.subItem = input
};
const SET_navItem = (state, input) => {
  state.navItem = input
};
const SET_theme = (state, input) => {
  state.theme = input
};
const SET_language = (state, input) => {
  state.language = input
};
const SET_script = (state, input) => {
  state.script = input
};
const SET_fsize = (state, input) => {
  state.fsize = input
};
const SET_fweight = (state, input) => {
  state.fweight = input
};
const SET_slines = (state, input) => {
  state.slines = input
};
const SET_value = (state, { list, id }) => {
if(id=='chapter' || id=='verse') {
  state[id] = parseInt(list);
} else if(id=='breakSandhi') {
state[id] = (list == 'true');
} else {
state[id] = list;
}
}
export default {
  increment,
  decrement,
  SET_chapter,
  SET_verse,
  SET_authenticated,
  SET_photoURL,
  SET_path,
  SET_breakSandhi,
  SET_audio,
  SET_mainItem,
  SET_subItem,
  SET_navItem,
  SET_theme,
  SET_language,
  SET_script,
  SET_value,
  SET_fsize,
  SET_fweight,
  SET_slines
};
