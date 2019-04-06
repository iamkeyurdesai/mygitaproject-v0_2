<template>
  <div v-scroll="onScroll"
    :style="cssProps">

      <div
      class="mx-0 background lighten-1"
      max-width="500"
      :dark="GET_dark"
      >
      <v-card flat dark>
        <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        >
        <!-- <v-btn icon fab top left fixed large class="mt-4" @click="decrementChapter()"> <v-icon large> keyboard_arrow_left  </v-icon> </v-btn>
        <v-btn icon fab top right fixed large class="mt-4" @click="incrementChapter()"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn> -->
        <v-container fill-height align-center>
          <v-layout column>
            <v-layout row>
                  <v-icon class="mt-4" @click="decrementChapter" large> keyboard_arrow_left  </v-icon>
                  <!-- <v-progress-linear v-if="readProgress" :indeterminate="true"></v-progress-linear> -->
                  <v-spacer></v-spacer>
                  <v-icon  class="mt-4" @click="incrementChapter" large> keyboard_arrow_right </v-icon>
                  </v-layout>
<v-layout align-end>
            <span v-show="this.script==='tamil'" class="font-weight-light pl-1" :style="'border-left: solid #FFFF009F'">
              {{ convert(preview[chapter-1].title1) }}
            </span>
            <span v-show="this.script!=='tamil'" class="title font-weight-light pl-1" :style="'border-left: solid #FFFF009F'">
              {{ convert(preview[chapter-1].title1) }}
            </span>

            </v-layout>
            <v-layout row align-start  class="mt-0 pt-0">
              <span class="display-3 font-weight-light mr-1 mt-0">
            {{chapter}}</span>
              <span class="font-weight-light mt-3">{{(this.preview[this.chapter-1].titleEnglish)}}</span>
          </v-layout>
            </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <readNavigation> </readNavigation>
    <!-- <v-btn @click="$vuetify.goTo('#read20', { duration: 300, offset: 0, easing: 'easeInOutCubic'})">
    <v-icon>arrow_left</v-icon>
  </v-btn> -->
  <v-card-text class="pa-0">
    <v-container grid-list-md text-xs-left class="pa-0">
      <v-layout row wrap class="ma-0" justify-center>
        <v-flex class="pa-2 xs12 text-xs-center">
        <button :style="cssProps">{{GET_salutation}}</button>
        </v-flex>
        <v-flex xs12 lg6 class="ma-0">
          <readSummary> </readSummary>
          </v-flex>
          <v-flex xs12 lg6 class="ma-0">
          <readOutline> </readOutline>
          </v-flex>
      </v-layout>
    </v-container>
        <v-container grid-list-md text-xs-left class="pa-1">
          <v-layout row wrap>
            <v-flex  xs12 lg6 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0"   :id="`read${i}`">
              <v-card class="background ma-2" :dark="GET_dark">
                <div v-if="i < 4 || loadTheRestOfVerses">
                    <v-layout row align-top>
                      <!-- verse id -->
                      <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
                    </v-layout>


                    <sambandhCard :verse_id="item.verse_id" v-if="showLink"> </sambandhCard>
                    <!-- <v-divider :dark="GET_dark" v-show="showLink"></v-divider> -->

                    <uvachCard :verse_id="item.verse_id" v-if="showVerse"> </uvachCard>
                    <shloakCard :verse_id="item.verse_id"  v-if="showVerse"></shloakCard>
                    <!-- <v-divider :dark="GET_dark" v-show="showVerse"></v-divider> -->

                    <uvachCard :verse_id="item.verse_id" v-if="showTranslation & !showVerse"> </uvachCard>
                    <bhavarthCard :verse_id="item.verse_id"  v-if="showTranslation"> </bhavarthCard>
                    <!-- <v-divider :dark="GET_dark" v-show="showTranslation"></v-divider> -->

                    <anvayaCard :verse_id="item.verse_id"  v-if="showAnvaya"></anvayaCard>
                </div>


              </v-card>
            </v-flex>
          </v-layout>
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
import Sanscript from 'Sanscript';
export default {
  data: function() {
    return {
    }
  },
  mounted() {
    //do something after mounting vue instance
    self = this
    this.$nextTick(function () {
      // this.$vuetify.goTo('#read' + this.verse, { duration: 300, offset: 0, easing: 'easeInOutCubic'})
    })
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
    'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter']),
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
  }
},
methods: {
  ...mapMutations('parameters', ['incrementChapter', 'decrementChapter',
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
    console.log(scrollTemp)
  },
},
beforeRouteEnter(to, from, next) {
  next();
},
beforeRouteUpdate(to, from, next) {
  next();
},
watch: {
  verse: function(val){
    if (!this.loadTheRestOfVerses) {
    this.SET_loadTheRestOfVerses(true)
    setTimeout(() => {this.$vuetify.goTo('#read' + (this.verse - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})}, 500)
  } else {
    this.$vuetify.goTo('#read' + (this.verse - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})
  }
  }
},
updated: function () {
  this.$nextTick(function () {
  })
},
components: {
  shloakCard,
  anvayaCard,
  sambandhCard,
  bhavarthCard,
  readheaderCard,
  uvachCard,
  readNavigation,
  readOutline,
  readSummary
}
}
</script>

<style lang="scss">
</style>
