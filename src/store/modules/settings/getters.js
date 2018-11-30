const mymain = (state, getters) => {
  let mytemp =  state.main.filter(function(item) {
    return (item.chapter_id == getters.chapter &&  item.verse_id == getters.verse);
  });
  return mytemp[0];
};
export default {
  mymain,
};
