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
            <div v-if="$router.currentRoute.name!=='welcome'">
              <v-layout justify-space-between row wrap>
                <v-flex> <chapterMenu></chapterMenu> </v-flex>
                <v-flex class="pa-2 text-xs-center body-2 my-3" ><button>{{GET_salutation}}</button></v-flex>
                <v-flex><verseMenu></verseMenu></v-flex>
              </v-layout>
              <v-divider :dark="GET_dark"></v-divider>
            <chapterCarousel></chapterCarousel>
            <v-divider :dark="GET_dark" id="carouselDivider"></v-divider>
          </div>
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
const FlexSearch = require("flexsearch")
import Sanscript from 'Sanscript'
import {db, rtdb, auth} from '@/main.js'

export default {
  data() {
    return {
      dialog: false, // open authentication dialog
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
    ...mapState('coretext', ['main', 'indexWord']),
    ...mapState('parameters', ['authenticated', 'photoURL',  'chapter', 'verse', 'verseall',
                'theme', 'language', 'script', 'breakSandhi', 'fsize', 'fweight', 'activeTab', 'isDeveloper', 'path', 'showImages']),
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
    convertItrans(myinput) {
      //console.log(Sanscript.t(myinput, 'iast', 'itrans'))
      return Sanscript.t(myinput, 'iast', 'itrans');
    },
    createSearch() {
      let temp = []
      // add id to every entry
      let ix = 0
      for (var j = 0; j < this.main.length; j++) {
        for (var k = 0; k < this.main[j].word_info.length; k++) {
        temp.push({
          id: ix,
          word: this.convertItrans(this.main[j].word_info[k].sanskrit),
          index_main: j,
          // chapter_id: this.main[j].chapter_id,
          // verse_id: this.main[j].verse_id,
          word_index: k,
          // english: this.main[j].word_info[k].english,
          // hindi: this.main[j].word_info[k].hindi,
        })
        ix = ix + 1
      }
    }
      // setup the index
      let temp1 = new FlexSearch({
      doc: {id: "id", field: ["word"]},
    //   encode: "advanced",
    // tokenize: "forward",
    // threshold: 5,
    // resolution: 9,
    // depth: 5
    // tokenize: "strict",
    // encode: "false",
    // limit: 5
    // resolution: 15
    })
      //create the actual index
      temp1.add(temp)
    this.SET_indexWord(temp1)

    },
    setNav(myval){
      this.showNav = myval
    },
    onScroll (e) {
      this.SET_offsetTop(window.pageYOffset || document.documentElement.scrollTop)
    },
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_mainItem',
    'SET_subItem', 'SET_navItem', 'SET_showNav', 'SET_loadTheRestOfVerses', 'SET_path', 'SET_isDeveloper', 'SET_userName', 'SET_offsetTop', 'SET_showImages']),
    ...mapMutations('coretext', ['SET_indexWord']),
    ...mapGetters('settings', ['GET_dark']),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.SET_authenticated(true)
        this.SET_photoURL(user.photoURL)
        this.SET_userName(user.displayName)
        if(user.photoURL ===
        "https://lh3.googleusercontent.com/a-/AAuE7mCMrcKk7upCKhXmYp5Sfu2wQ9-d9aAlquVlinjY") {
          this.SET_isDeveloper(true)
        }
        console.log(this.isDeveloper)
        console.log(user)
        console.log(user.photoURL)
      } else {
        this.SET_authenticated(false)
        this.SET_photoURL('not signed in')
        this.SET_isDeveloper(false)
      }



    });
    this.$vuetify.theme = Object.assign({}, this.options[this.theme].theme)
    if(this.showImages.length===0 | this.showImages[0]===null){
        this.$store.state.parameters.showImages = new Array(23)
        for (let i = 0; i < 23; i++) {
          this.$store.state.parameters.showImages[i] = Array(this.verseall[i]).fill(false)
          this.SET_showImages([i, 0])
        }
      }
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
         if(this.indexWord===null) {
           this.createSearch()
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
