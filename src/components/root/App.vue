<template>
<v-app>


  <v-toolbar app fixed class="primary secondary--text" v-show="showNav">


    <v-toolbar-title @click="$router.push('/')">

      <v-avatar size="28px" tile>
        <img
          :src="'/static/img/icons/icon-72x72.png'"
          alt="Error Loading"
        >
      </v-avatar>   <v-btn flat class="ma-0 pa-0 secondary--text title text-none">  Power Gita
    </v-btn>
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
          }" v-scroll="onScroll">
          <v-container class="pa-0">
            <!-- header containing chapter, verse and salutation -->
              <v-layout justify-space-between row wrap>
                <v-flex> <chapterMenu></chapterMenu> </v-flex>
                <v-flex class="pa-2 text-xs-center body-2"><button>{{GET_salutation}}</button></v-flex>
                <v-flex><verseMenu></verseMenu></v-flex>
              </v-layout>
              <v-divider :dark="GET_dark"></v-divider>
            <chapterCarousel></chapterCarousel>
            <v-divider :dark="GET_dark"></v-divider>
            <v-fade-transition>
      <router-view></router-view>
    </v-fade-transition>
    </v-container>
  </v-content>

  <!-- dynamic bottom navigation -->
    <v-bottom-nav :value="showNav" :active.sync="mainItem" app height="56">
<v-btn v-for="(zz, k) in menu.mainItems" :key="zz" :value='zz' color="primary--text">
  <span class="caption" :id="`main_${zz}`">{{zz}}</span>
  <v-icon>{{menu.mainIcons[k]}}</v-icon>
</v-btn>
  </v-bottom-nav>

</v-app>
</template>

<script>
import firebaseAuth from './firebase-auth.vue'
import userProfile from './user-profile.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import settingspopup from '@/components/settings/settings-popup.vue'
import chapterMenu from '@/components/reflect/chapter-menu.vue'
import verseMenu from '@/components/reflect/verse-menu.vue'
import chapterCarousel from '@/components/reflect/chapter-carousel.vue'

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
    'settings-popup': settingspopup,
    chapterMenu,
    verseMenu,
    chapterCarousel
  },
  computed: {
    ...mapState('settings', ['options', 'menu']),
    ...mapState('parameters', ['authenticated', 'photoURL',  'chapter', 'verse',
                'theme', 'language', 'script', 'breakSandhi', 'fsize', 'fweight', 'activeTab', 'isDeveloper', 'path']),
    ...mapGetters('coretext', ['GET_salutation']),
    ...mapGetters('settings', ['GET_dark']),
    mainItem: {get(){return this.$store.state.parameters.mainItem}, set(value){this.SET_mainItem(value)}},
    showNav: {get(){return this.$store.state.parameters.showNav}, set(value){this.SET_showNav(value)}},
    compoundWatch() {
      if(this.$vuetify.breakpoint.width < 950 &
        this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) {
        this.SET_showNav(false)
      } else {
        this.SET_showNav(true)
      }
      return this.mainItem, this.chapter, this.verse, this.theme, this.language,
      this.script, this.fsize, this.activeTab, Date.now();
    }
  },
  methods: {
    setNav(myval){
      this.showNav = myval
    },
    onScroll (e) {
      this.SET_offsetTop(window.pageYOffset || document.documentElement.scrollTop)
    },
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_mainItem',
    'SET_subItem', 'SET_navItem', 'SET_showNav', 'SET_loadTheRestOfVerses', 'SET_path', 'SET_isDeveloper', 'SET_userName', 'SET_offsetTop']),
    ...mapGetters('settings', ['GET_dark']),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_authenticated(true)
        this.SET_photoURL(user.photoURL)
        this.SET_userName(user.displayName)
        if(user.photoURL ===
        "https://lh3.googleusercontent.com/-MwCzZcUXDmg/AAAAAAAAAAI/AAAAAAAAAGA/aF3pVI8DYsE/photo.jpg") {
          this.SET_isDeveloper(true)
        }
        console.log(this.isDeveloper)
        // console.log(user)

        function rtdb_presence() {
            // [START rtdb_presence]
            // Fetch the current user's ID from Firebase Authentication.
            var uid = firebase.auth().currentUser.uid;

            // Create a reference to this user's specific status node.
            // This is where we will store data about being online/offline.
            var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

            // We'll create two constants which we will write to
            // the Realtime database when this device is offline
            // or online.
            var isOfflineForDatabase = {
                state: 'offline',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
            };

            var isOnlineForDatabase = {
                state: 'online',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
            };

            // Create a reference to the special '.info/connected' path in
            // Realtime Database. This path returns `true` when connected
            // and `false` when disconnected.
            firebase.database().ref('.info/connected').on('value', function(snapshot) {
                // If we're not currently connected, don't do anything.
                if (snapshot.val() == false) {
                    return;
                };

                // If we are currently connected, then use the 'onDisconnect()'
                // method to add a set which will only trigger once this
                // client has disconnected by closing the app,
                // losing internet, or any other means.
                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect()
                    // request, NOT once we've actually disconnected:
                    // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                });
            });
            // [END rtdb_presence]
        }

        //rtdb_presence()
      } else {
        this.SET_authenticated(false)
        this.SET_photoURL('not signed in')
        this.SET_isDeveloper(false)
      }



    });
    this.$vuetify.theme = Object.assign({}, this.options[this.theme].theme)

  },
  watch: {
       compoundWatch: function(val) {
         let myTempPath = '/' + this.mainItem + '/' + 'api=1' + '&activeTab=' + this.activeTab +
         '&chapter=' + this.chapter + '&verse=' + this.verse + '&theme=' + this.theme + '&language=' + this.language +
         '&script=' + this.script + '&fsize=' + this.fsize
         if(this.path !== myTempPath) {
         this.$router.push(myTempPath)
         console.log(myTempPath)
         if(myTempPath !== "/") this.SET_path(myTempPath)
       }
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
.container{
  max-width: 960px;
}
</style>
