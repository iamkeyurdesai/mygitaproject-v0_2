<template>
<v-app>


  <v-toolbar app fixed class="primary secondary--text" :manual-scorr="showNav">

    <v-toolbar-title>
      <v-avatar size="28px" tile>
        <img
          :src="'/static/img/icons/icon-72x72.png'"
          alt="Error Loading"
        >
      </v-avatar> Power Gita
  </v-toolbar-title>

    <v-spacer></v-spacer>
        <v-btn icon  class="primary secondary--text ma-0">
      <v-icon>group</v-icon>
    </v-btn>
    <v-btn icon  class="primary secondary--text ma-0">
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon small class="primary secondary--text ma-0">
      <v-icon>search</v-icon>
    </v-btn>
    <!-- <settings-popup></settings-popup> -->
    <!-- if not authenticated then show the Sing In button
    if authenticated then render user-profile component -->
    <div v-if="!this.authenticated">
      <v-btn small flat class="activity white--text ma-0 pa-0" @click.native.stop="dialog = true">Sing In</v-btn>
      <v-dialog v-model="dialog">
        <firebase-auth></firebase-auth>
      </v-dialog>
    </div>
    <div v-else>
      <user-profile></user-profile>
    </div>
  </v-toolbar>


      <v-content class="background" :class="options.fsizeInternal[fsize]" :style="'color:' + this.options[this.theme].emphasis.high"
      v-touch="{
            up: () => setNav(true),
            down: () => setNav(true)
          }">
      <router-view></router-view>
  </v-content>

  <!-- dynamic bottom navigation -->
    <v-bottom-nav :value="showNav" :active.sync="mainItem" app height="56">
<v-btn v-for="(zz, k) in menu.mainItems" :key="zz" :value='zz' color="primary--text">
  <span class="caption">{{zz}}</span>
  <v-icon>{{menu.mainIcons[k]}}</v-icon>
</v-btn>
  </v-bottom-nav>

</v-app>
</template>

<script>
import firebaseAuth from './firebase-auth.vue'
import userProfile from './user-profile.vue'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import settingspopup from '@/components/settings/settings-popup.vue'


export default {
  data() {
    return {
      dialog: false // open authentication dialog
    }
  },
  name: 'App',
  components: {
    'firebase-auth': firebaseAuth,
    'user-profile': userProfile,
    'settings-popup': settingspopup
  },
  computed: {
    ...mapState('settings', ['options', 'menu']),
    ...mapState('parameters', ['authenticated', 'photoURL',  'chapter', 'verse',
                'theme', 'language', 'script', 'breakSandhi', 'fsize', 'fweight']),
    mainItem: {get(){return this.$store.state.parameters.mainItem}, set(value){this.SET_mainItem(value)}},
    showNav: {get(){return this.$store.state.parameters.showNav}, set(value){this.SET_showNav(value)}},
    compoundWatch() {return this.mainItem, this.chapter, this.verse, this.theme, this.language, this.script, Date.now();}
  },
  methods: {
    setNav(myval){
      this.showNav = myval
    },
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_mainItem',
    'SET_subItem', 'SET_navItem', 'SET_showNav', 'SET_loadTheRestOfVerses'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_authenticated(true)
        this.SET_photoURL(user.photoURL)
      } else {
        this.SET_authenticated(false)
        this.SET_photoURL('not signed in')
      }
    });
    this.$vuetify.theme = Object.assign({}, this.options[this.theme].theme)

  },
  watch: {
       compoundWatch: function(val) {
         this.$router.push('/' + this.mainItem + '/' + 'api=1' +
         '&chapter=' + this.chapter + '&verse=' + this.verse + '&theme=' + this.theme + '&language=' + this.language +
         '&script=' + this.script + '&breakSandhi=' + this.breakSandhi);
       },
       theme: function(val){
         this.$vuetify.theme = Object.assign({}, this.options[this.theme].theme)
       },
       mainItem: function(val) {
         if(this.mainItem!=='read') {
           this.SET_loadTheRestOfVerses(false)
         }
         //fetch the latest version of the service worker
         //if not change on the server then nothing happens
         window.navigator.serviceWorker.ready.then(registration => { registration.update(); })
       }
  }
}
</script>

<style lang="scss">
</style>
