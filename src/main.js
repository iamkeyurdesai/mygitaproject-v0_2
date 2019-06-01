// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './components/root/App'
import router from './router'
import {store} from './store/index.js'
// import Vuetify from 'vuetify'
// import VueTippy from 'vue-tippy'
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

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
  VSwitch,
  VTabs,
  VSystemBar,
  VSlider,
  VTextField,
  VTextarea,
  VProgressCircular,
  VProgressLinear,
  VTimeline,
  VImg,
  VHover,
  VResponsive
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'
// import * as directives from 'vuetify/es5/directives'
import Touch from 'vuetify/es5/directives/touch'
import Scroll from 'vuetify/es5/directives/scroll'

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
    VSwitch,
    VTabs,
    VSystemBar,
    VSlider,
    VTextField,
    VTextarea,
    VProgressCircular,
    VProgressLinear,
    VTimeline,
    VImg,
    VHover,
    VResponsive
  },
  theme: {
  primary: "#190933",
  secondary: "#D0E2F7",
  activity: "#FBAA06",
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  background: "#010429",
  button: "#D81B60",
  accentmain: "#EA80FC",
  accentinfo: '#82B1FF',
  accent1: "#00E5FF",
  accent2: "#FFC400",
  accent3: "#76FF03",
  accent4: "#F48FB1"
},
  directives: {
    Touch,
    Scroll
  },
  options: {
    customProperties: true
  }
})

Vue.use(require('vue-chartist'))

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let mypath = to.path.split("/");
  if (mypath[1] != null) store.state.parameters.mainItem = mypath[1];
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
     this.$store.dispatch('coretext/loadText');
     this.$store.dispatch('audiolabels/loadText');
  },
  mounted() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          // This fires when the service worker controlling this page
          // changes, eg a new worker has skipped waiting and become
          // the new active worker.          
          window.location.reload();
        });
      }
  },
  components: { App },
  template: '<App/>'
})
