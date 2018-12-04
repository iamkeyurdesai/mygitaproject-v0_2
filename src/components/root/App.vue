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
          <v-list-group v-model="item.active" v-for="item in items" :key="item.title" :prepend-icon="item.action" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="pushRouter(subItem.title)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
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
  <!-- <v-bottom-nav :value="true" :active.sync="e2" :color="color" shift app> -->
    <v-bottom-nav :value="showNav" :active.sync="e2" app shift height="48">
        <!-- <v-bottom-nav :value="showNav" :active.sync="e2" app shift height="48"> -->
    <v-btn>
      <span>Read</span>
      <v-icon>mdi-book-open-page-variant</v-icon>
    </v-btn>
    <v-btn >
      <span>Recite</span>
      <v-icon>mdi-speaker-wireless</v-icon>
    </v-btn>
    <v-btn >
      <span>Reflect</span>
      <v-icon>mdi-thought-bubble</v-icon>
    </v-btn>
    <v-btn >
      <span>Media</span>
      <v-icon>mdi-youtube-tv</v-icon>
    </v-btn>
    <!-- <v-btn >
      <span>Meditation</span>
      <v-icon>mdi-yin-yang</v-icon>
    </v-btn> -->
  </v-bottom-nav>

</v-app>
</template>

<script>
import firebaseAuth from './firebase-auth.vue'
import userProfile from './user-profile.vue'
import { items } from '../../helpers/menuItems'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: false,  // open the navigation drawer
      clipped: true, // keep the drawer below the toolbar
      dialog: false, // open authentication dialog
      items: items,
      e2: 1,
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
    ...mapState('parameters', ['authenticated', 'photoURL']),
    color() {
      switch (this.e2) {
        case 0:
          return 'deep-purple darken-1'
        case 1:
          return 'deep-purple darken-2'
        case 2:
          return 'deep-purple darken-3'
        case 3:
          return 'deep-purple darken-4'
        case 4:
          return 'deep-purple darken-5'
      }
    }
  },
  methods: {
    setNav(myval){
      this.showNav = myval
    },
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL']),
    pushRouter(path) {
      switch (path) {
        case 'reflect':
          this.$router.push('/' + path + '/1' + '/1')
          break;
        default:
          this.$router.push("/" + path)
      }
    }
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
  }
}
</script>
