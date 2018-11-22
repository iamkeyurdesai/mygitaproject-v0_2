<template>
<v-app>

  <v-navigation-drawer persistent :clipped="clipped" v-model="drawer" app dark class="purple darken-3" width="250">
    <v-flex xs12 class="purple darken-3">
      <v-card class="purple darken-3">
        <v-list class="purple darken-3">
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

  <v-toolbar absolute app :clipped-left="$vuetify.breakpoint.lgAndUp" color="deep-purple darken-4" dark scroll-off-screen scroll-target="#content" dense>

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
    <div v-if="!this.$store.state.authenticated">
    <v-btn small color="purple" dark @click.native.stop="dialog = true">Sing In</v-btn>
    <v-dialog v-model="dialog">
      <firebase-auth></firebase-auth>
    </v-dialog>
  </div>
  <div v-else>
          <user-profile></user-profile>
        </div>
  </v-toolbar>

  <v-content>
    <router-view></router-view>
  </v-content>
  <v-bottom-nav
       :value="true"
       :active.sync="e2"
       :color="color"
       shift
     >
       <v-btn dark>
         <span>Read</span>
         <v-icon>mdi-book-open-page-variant</v-icon>
       </v-btn>
       <v-btn dark>
         <span>Recite</span>
         <v-icon>mdi-speaker-wireless</v-icon>
       </v-btn>
       <v-btn dark>
         <span>Reflect</span>
         <v-icon>mdi-thought-bubble</v-icon>
       </v-btn>
       <v-btn dark>
         <span>Media</span>
         <v-icon >mdi-youtube-tv</v-icon>
       </v-btn>
       <v-btn dark>
         <span>Meditation</span>
         <v-icon >mdi-yin-yang</v-icon>
       </v-btn>
     </v-bottom-nav>

</v-app>
</template>

<script>
import firebaseAuth from './firebase-auth.vue'
import userProfile from './user-profile.vue'
import {items} from '../../helpers/menuItems'

export default {
  data() {
    return {
      dialog: false,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Power Gita',
      items: items,
      e2: 1,
      photo: ''
    }
  },
  name: 'App',
  components: {
    'firebase-auth': firebaseAuth,
    'user-profile': userProfile
  },
  computed: {
     color () {
       switch (this.e2) {
         case 0: return 'deep-purple darken-1'
         case 1: return 'deep-purple darken-2'
         case 2: return 'deep-purple darken-3'
         case 3: return 'deep-purple darken-4'
         case 4: return 'deep-purple darken-5'
       }
     }
 },
 methods: {
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
     if(user) {
       this.$store.state.authenticated = true
       // this.$router.push('/')
       this.$store.state.photoURL = user.photoURL
     } else {
       // this.$router.push('/')
       this.$store.state.authenticated = false
       this.$store.state.photoURL = 'not signed in'
     }
    });
}
  }
</script>
