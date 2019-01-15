<template>
<v-app>
  <!--
  fetch menu items from menuItems.js
  fetch theme from store/settings
  render items as list of list-groups
  when clicked push router to the component the subitem refers
  use var drawer to open / close the navigation drawer   -->
    <v-navigation-drawer dark persistent :clipped="clipped" v-model="drawer" app class="primary secondary--text" width="300">
    <v-flex>
      <v-card class="primary secondary--text">
          <div class="pa-5 ma-5">
            advertise here
          </div>
          <v-list class="primary">
          <v-list-group v-model="menu.mainActive[i]" v-for="(xx, i) in menu.mainItems" :key="xx" :prepend-icon="menu.mainIcons[i]"
          no-action class="primary secondary--text" active-class="primary activity--text">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ xx }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="primary secondary--text" v-for="(yy, j) in menu[xx].subItems" :key="yy"
            @click="SET_subItem(yy); SET_mainItem(xx); SET_navItem(menu[mainItem].navItems[subItem][0])">
              <v-list-tile-content>
                <v-list-tile-title>{{ yy}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ menu[xx].subIcons[j] }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-navigation-drawer>

  <!-- fetch theme from store/settings
  hide or show burger icon using var drawer    -->

  <v-toolbar app fixed :clipped-left="$vuetify.breakpoint.lgAndUp" class="primary secondary--text"
  scroll-off-screen :scroll-threshold="1" dense>
    <v-toolbar-side-icon @click.stop="drawer = !drawer" class="primary secondary--text"></v-toolbar-side-icon>
    <v-toolbar-title dark>
      Gita
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="primary secondary--text">
      <v-icon>group</v-icon>
    </v-btn>
    <v-btn icon class="primary secondary--text">
      <v-icon>notifications</v-icon>
    </v-btn>
    <settings-popup></settings-popup>
    <!-- if not authenticated then show the Sing In button
    if authenticated then render user-profile component -->
    <div v-if="!this.authenticated">
      <v-btn small flat class="primary secondary--text" @click.native.stop="dialog = true">Sing In</v-btn>
      <v-dialog v-model="dialog">
        <firebase-auth></firebase-auth>
      </v-dialog>
    </div>
    <div v-else>
      <user-profile></user-profile>
    </div>
  </v-toolbar>


      <v-content class="background" :class="options.fsizeInternal[fsize]" :style="this.options[this.theme].emphasis.high" v-touch="{
            up: () => setNav(false),
            down: () => setNav(true)
          }">
      <router-view></router-view>
  </v-content>

  <!-- dynamic bottom navigation -->
    <v-bottom-nav :value="showNav" :active.sync="navItem" app shift height="48" class="secondary primary--text">
<v-btn v-for="(zz, k) in menu[mainItem].navItems[subItem]" :key="zz" :value='zz' class="secondary primary--text">
  <span>{{zz}}</span>
  <v-icon>{{menu[mainItem].navIcons[subItem][k]}}</v-icon>
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
      drawer: false,  // open the navigation drawer
      clipped: true, // keep the drawer below the toolbar
      dialog: false, // open authentication dialog
      showNav: true
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
    ...mapState('parameters', ['authenticated', 'photoURL',  'mainItem', 'subItem', 'chapter', 'verse',
                'theme', 'language', 'script', 'breakSandhi', 'fsize', 'fweight']),
    navItem: {get(){return this.$store.state.parameters.navItem}, set(value){this.SET_navItem(value)}},
    compoundWatch() {return this.subItem, this.navItem, this.chapter, this.verse, this.theme, this.language, this.script, Date.now();}
  },
  methods: {
    setNav(myval){
      this.showNav = myval
    },
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_mainItem', 'SET_subItem', 'SET_navItem'])
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
         this.$router.push('/' + this.subItem + '/' + this.navItem + '/' + 'api=1' +
         '&chapter=' + this.chapter + '&verse=' + this.verse + '&theme=' + this.theme + '&language=' + this.language +
         '&script=' + this.script + '&breakSandhi=' + this.breakSandhi);
       },
       theme: function(val){
         this.$vuetify.theme = Object.assign({}, this.options[this.theme].theme)
       }
  }
}
</script>

<style lang="scss">
</style>
