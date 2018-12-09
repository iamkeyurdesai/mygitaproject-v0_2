<template>
<v-app>
  <!--
  fetch menu items from menuItems.js
  fetch theme from store/settings
  render items as list of list-groups
  when clicked push router to the component the subitem refers
  use var drawer to open / close the navigation drawer   -->
  <v-navigation-drawer persistent :clipped="clipped" v-model="drawer" app :dark="options[theme].type=='dark'" :class="options[theme].drawer" width="250">
    <v-flex xs12>
      <v-card>
        <v-list :class="options[theme].drawer">
          <v-list-group v-model="menu.mainActive[i]" v-for="(xx, i) in menu.mainItems" :key="xx" :prepend-icon="menu.mainIcons[i]" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ xx }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(yy, j) in menu[xx].subItems" :key="yy" @click="SET_subItem(yy); SET_mainItem(xx); SET_navItem(menu[mainItem].navItems[subItem][0])">
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
  <v-toolbar absolute app :clipped-left="$vuetify.breakpoint.lgAndUp" :class="options[theme].toolbar" :dark="options[theme].type=='dark'" scroll-off-screen scroll-target="#content" dense>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">
      Power Gita
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>group</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <!-- if not authenticated then show the Sing In button
    if authenticated then render user-profile component -->
    <div v-if="!this.authenticated">
      <v-btn small :color="options[theme].toolbarAccent1" :dark="options[theme].type=='dark'" @click.native.stop="dialog = true">Sing In</v-btn>
      <v-dialog v-model="dialog">
        <firebase-auth></firebase-auth>
      </v-dialog>
    </div>
    <div v-else>
      <user-profile></user-profile>
    </div>
  </v-toolbar>


  <v-content v-touch="{
        up: () => setNav(false),
        down: () => setNav(true)
      }">
    <router-view></router-view>
  </v-content>

  <!-- dynamic bottom navigation -->
    <v-bottom-nav :value="showNav" :active.sync="navItem" app shift height="48">
<v-btn v-for="(zz, k) in menu[mainItem].navItems[subItem]" :key="zz" :value='zz'>
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
    'user-profile': userProfile
  },
  computed: {
    ...mapState('settings', ['options', 'theme']),
    ...mapState('parameters', ['authenticated', 'photoURL', 'menu', 'mainItem', 'subItem', 'chapter', 'verse']),
    navItem: {get(){return this.$store.state.parameters.navItem}, set(value){this.SET_navItem(value)}}
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
  },
  watch: {
    subItem: function(val) {
      this.$router.push('/' + this.subItem + '/' + this.navItem + '/' + this.chapter + '/' + this.verse)
    },
    navItem: function(val) {
      this.$router.push('/' + this.subItem + '/' + this.navItem + '/' + this.chapter + '/' + this.verse)
    },
    chapter: function(val) {
      this.$router.push('/' + this.subItem + '/' + this.navItem + '/' + this.chapter + '/' + this.verse)
    },
    verse: function(val) {
      this.$router.push('/' + this.subItem + '/' + this.navItem + '/' + this.chapter + '/' + this.verse)
    }
  }
}
</script>
