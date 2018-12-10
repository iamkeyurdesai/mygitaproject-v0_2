// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './components/root/App'
import router from './router'
import {store} from './store/index.js'
// import Vuetify from 'vuetify'
// import VueTippy from 'vue-tippy'

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
// import * as directives from 'vuetify/es5/directives'
import Touch from 'vuetify/es5/directives/touch'

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
  },
  directives: {
    Touch
  }
})
Vue.use(Vuetify)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let mypath = to.path.split("/");
  if (mypath[1] != null) store.state.parameters.subItem = mypath[1];
  if (mypath[2] != null) store.state.parameters.navItem = mypath[2];
  if (to.params.data != null) {
      if(to.params.data.includes("api=1")) {
        let myquery = to.params.data.split("&");
        let i;
        for (i = 1; i < myquery.length; i++) {
        let temp = myquery[i].split("=")
        store.commit('parameters/SET_value', {list: temp[1], id: temp[0]})
        }
      } else {
        console.log("api=1 not found")
      }
    }    
  next()
})

import firebase from 'firebase'
import {config} from './helpers/firebaseConfig'

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  created() {
     firebase.initializeApp(config)
     // this.$store.dispatch('settings/loadText')
     this.$store.dispatch('coretext/loadText')
  },
  components: { App },
  template: '<App/>'
})
