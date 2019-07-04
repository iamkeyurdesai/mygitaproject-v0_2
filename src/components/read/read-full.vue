<template>
  <div v-scroll="onScroll"
  :style="cssProps">

<v-subheader :dark="GET_dark"> For comprehensively study </v-subheader>

<v-flex xs12 class="ma-0">
  <readStart> </readStart>
</v-flex>
  <div
  class="mx-0 background lighten-1"
  :dark="GET_dark"
  >
  <v-card flat dark class="mt-3">
    <v-img
    :src="this.chapterPreviewImage"
    gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
    >
    <!-- <v-btn icon fab top left fixed large class="mt-4" @click="decrementChapter()"> <v-icon large> keyboard_arrow_left  </v-icon> </v-btn>
    <v-btn icon fab top right fixed large class="mt-4" @click="incrementChapter()"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn> -->
    <v-container fill-height >
      <v-layout column>

          <v-layout class="mt-5 pt-5 mb-0">
            <span v-if="chapter < 19" class="display-2 font-weight-light mr-1 mt-0">{{chapter}}</span>
              <span class="title font-weight-light">
                {{ convert(this.GET_preview_chapter.title1) }} </br>
                <span class="caption font-weight-light">  {{this.GET_preview_chapter.titleEnglish}} </span>
              </span>
            </v-layout>
            </v-layout>

      </v-container>
    </v-img>
  </v-card>
  <readNavigation lrArrowShow> </readNavigation>
  <!-- <v-btn @click="$vuetify.goTo('#read20', { duration: 300, offset: 0, easing: 'easeInOutCubic'})">
  <v-icon>arrow_left</v-icon>
</v-btn> -->
<v-card-text class="pa-0">
  <v-container grid-list-md text-xs-left class="pa-0" v-touch="{
        left: () => increment(),
        right: () => decrement()}">
    <v-layout column wrap class="ma-0" justify-center>
      <v-flex xs12 class="ma-0" v-if="chapter < 19">
        <readSummary> </readSummary>
      </v-flex>
        
        <v-subheader :dark="GET_dark" class="background" v-if="chapter < 19"> Click to verse </v-subheader>

      <v-flex xs12 lg6 class="ma-0" v-if="chapter < 19" justify-center>
        <readOutline> </readOutline>
      </v-flex>
    </v-layout>
  </v-container>

<v-subheader :dark="GET_dark" class="background"> Read chapter {{chapter}} verse {{verse}} </v-subheader>

  <v-container grid-list-md text-xs-left class="pa-1">
    <v-layout row wrap justify-center>


        <v-card class="background ma-2 pa-1" :dark="GET_dark">
            <v-layout row align-top>
              <!-- verse id -->
              <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{verse}}</span>
            </v-layout>
            <v-divider :dark="GET_dark"></v-divider>

            <sambandhCard :verse_id="verse" v-if="chapter < 19"> </sambandhCard>
            <v-divider :dark="GET_dark"></v-divider>

<span align="left" class="info--text subheading ma-2" v-if="!(chapter < 19)">Original verse</span>
<v-layout row wrap v-else>
<span align="left" class="info--text subheading ma-2">Original verse</span>
<v-spacer></v-spacer>
<!-- breakSandhi -->
<v-btn icon  color="accentmain" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi), snackbarWordAudioDecide()">
  <v-icon> gavel</v-icon>
</v-btn>
<v-btn icon  color="activity" v-else v-on:click.stop="SET_breakSandhi(!breakSandhi)">
  <v-icon small> gavel</v-icon>
</v-btn>
<v-snackbar v-model="snackbarWordAudio" :timeout="0" color="primary lighten-2" @click="snackbarWordAudio = false">
  <span class="subheading"> <v-icon dark> touch_app</v-icon>
    <span class="accent1--text"> {{convert(GET_main.word_info[snackbarWordAudioCount % 2].sanskrit)}} </span> to hear its pronunciation.</span>
  <v-btn color="error" flat @click="snackbarWordAudio = false"> Close </v-btn>
</v-snackbar>
</v-layout>

            <uvachCard :verse_id="verse"> </uvachCard>

            <shloakCard :verse_id="verse" verseNumber wordByWord v-if="chapter < 19"></shloakCard>
            <shloakCard :verse_id="verse" verseNumber v-else></shloakCard>
            <v-divider :dark="GET_dark"></v-divider>

            <!-- <uvachCard :verse_id="verse" v-if="showTranslation & !showVerse"> </uvachCard> -->
            <bhavarthCard :verse_id="verse"> </bhavarthCard>
            <v-divider :dark="GET_dark"></v-divider>
<div align="left" class="info--text subheading ma-2" v-if="chapter < 19">Original verse rearranged</div>
            <anvayaCard :verse_id="verse" v-if="chapter < 19"></anvayaCard>
        </v-card>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>
    <v-layout class="font-weight-light pa-1 body-2" justify-left> Colophon</v-layout>
    <v-flex xs12 class="ma-0">
      <readEnd> </readEnd>
    </v-flex>
  </v-container>

</v-card-text>
</div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import shloakCard from './subcomponents/shloak-card.vue'
import anvayaCard from './subcomponents/anvaya-card.vue'
import sambandhCard from './subcomponents/sambandh-card.vue'
import bhavarthCard from './subcomponents/bhavarth-card.vue'
import readheaderCard from './subcomponents/readheader-card.vue'
import uvachCard from './subcomponents/uvach-card.vue'
import readNavigation from './subcomponents/read-navigation.vue'
import readOutline from './subcomponents/read-outline.vue'
import readSummary from './subcomponents/read-summary.vue'
import readStart from './subcomponents/read-start.vue'
import readEnd from './subcomponents/read-end.vue'
import readSalutation from './subcomponents/read-salutation.vue'
import chaptermenu from '../reflect/chapter-menu.vue'
import versemenu from '../reflect/verse-menu.vue'
import chapterCarousel from './../reflect/chapter-carousel.vue'

import Sanscript from 'Sanscript';
export default {
  data: function() {
    return {
      snackbarWordAudio: false,
      snackbarWordAudioCount: 0
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
    'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter', 'GET_main']),
    ...mapGetters('settings', ['GET_dark']),
    offsetTop: {get(){return this.$store.state.parameters.offsetTop}, set(value){this.SET_offsetTop(value)}},
    fabShow: {get(){return this.$store.state.parameters.fabShow}, set(value){this.SET_fabShow(value)}},
    cssProps() { return {
      '--bg-hover-color': this.$vuetify.theme.accent1,
      '--hover-content': JSON.stringify(this.hoverContent),
      '--mywidth': "75px",
      '--myfill': "25px",
      'color': this.options[this.theme].emphasis.medium
    }
  },
  chapterPreviewImage() {
    let mylink = '/static/img/chapter_preview/previewchapter' + this.chapter + '.jpeg'
    return mylink
  }
},
methods: {
  ...mapMutations('parameters', ['incrementChapter', 'decrementChapter', 'increment', 'decrement',
  'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses']),
  convert(myinput){
    return Sanscript.t(myinput, 'iast', this.script);
  },
  onScroll (e) {
    let scrollTemp = window.pageYOffset || document.documentElement.scrollTop
    if(scrollTemp < this.offsetTop) {
      this.fabShow = true
    } else {
      this.fabShow = false
    }
    this.offsetTop = scrollTemp
    if(scrollTemp > 300) {
      this.SET_loadTheRestOfVerses(true)
    }
  },
  snackbarWordAudioDecide() {
    this.snackbarWordAudioCount +=1
    if(this.snackbarWordAudioCount < 4 | this.snackbarWordAudioCount % 20 === 0) this.snackbarWordAudio = true
  }
},
beforeRouteEnter(to, from, next) {
  next();
},
beforeRouteUpdate(to, from, next) {
  next();
},
// watch: {
//   verse: function(val){
//     if (!this.loadTheRestOfVerses) {
//       this.SET_loadTheRestOfVerses(true)
//       setTimeout(() => {this.$vuetify.goTo('#read' + (this.verse - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})}, 400)
//     } else {
//       this.$vuetify.goTo('#read' + (this.verse - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})
//     }
//   }
// },
// updated: function () {
//   this.$nextTick(function () {
//   })
// }
components: {
  shloakCard,
  anvayaCard,
  sambandhCard,
  bhavarthCard,
  readheaderCard,
  uvachCard,
  readNavigation,
  readOutline,
  readSummary,
  readStart,
  readEnd,
  readSalutation,
  'chapter-menu': chaptermenu,
  'verse-menu': versemenu,
  chapterCarousel
}
}
</script>

<style lang="scss">
</style>
