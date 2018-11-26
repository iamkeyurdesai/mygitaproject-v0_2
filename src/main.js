// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuetify from 'vuetify'
// import VueTippy from 'vue-tippy'
import App from './components/root/App'
import router from './router'
import {store} from './store/store.js'
// import Meta from 'vue-meta'


// import VueThreejs from '@/../package/lib/' // testing pack
// import VueThreejs from '@/../lib/' // testing build
import VueThreejs from 'vue-threejs'
Vue.use(VueThreejs)
// Vue.use(Meta)

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VSelect,
  VBottomSheet,
  VDialog,
  VAvatar,
  VMenu,
  VExpansionPanel,
  VSpeedDial,
  VDivider,
  VBottomNav,
  VRadioGroup,
  VSwitch
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VSelect,
    VBottomSheet,
    VDialog,
    VAvatar,
    VMenu,
    VExpansionPanel,
    VSpeedDial,
    VDivider,
    VBottomNav,
    VRadioGroup,
    VSwitch
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(Vuetify)
// Vue.use(VueTippy)
Vue.config.productionTip = false

// import firebase from 'firebase'
// import firebaseui from 'firebaseui';
// import {config} from './helpers/firebaseConfig'
// import VueFire from 'vuefire'
// Vue.use(VueFire)

/* eslint-disable no-new */
var vm = new Vue({
  router,
  // created() {
  //   firebase.initializeApp(config);
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if(user) {
  //       this.$store.state.authenticated = true
  //       // this.$router.push('/')
  //       this.$store.state.photoURL = user.photoURL
  //       console.log(user)
  //     } else {
  //       // this.$router.push('/')
  //       this.$store.state.authenticated = false
  //       this.$store.state.photoURL = 'not signed in'
  //     }
  //    });
  // },
  el: '#app',
  store,
  created: function () {
    this.$store.dispatch('loadText')
  },
  components: { App },
  template: '<App/>'
})
