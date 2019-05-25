import axios from 'axios';

const loadText = function ({ commit }) {
  const ax = axios.create({
  baseURL: '/static/'
  })
  ax.get('assets/audio/full/myLabels.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "sanskritLabels"})
  }, (err) => {
    console.log(err)
  });
};

export default {
  loadText,
};
