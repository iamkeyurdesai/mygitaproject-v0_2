import axios from 'axios';

const loadText = function ({ commit }) {
  const ax = axios.create({
  // baseURL: 'https://gitawebapp.firebaseapp.com/static/'
  baseURL: '/static/'
  })
  ax.get('assets/text/json/mygitapress_preview.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "preview"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mygitapress_summary.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "summary"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mymain.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "main"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mygitapress.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "gitapress"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mygitapress_commentary.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "gitapress_commentary"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mysivananda_translation.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "sivananda"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/mysivananda_commentary.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "sivananda_commentary"})
  }, (err) => {
    console.log(err)
  });
  ax.get('assets/text/json/myLabels.json', { crossdomain: true}).then((response) => {
    commit('setText', { list: response.data,  id: "sanskritLabels"})
  }, (err) => {
    console.log(err)
  });
};

export default {
  loadText,
};
