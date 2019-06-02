<template>
  <div :style="cssProps" v-scroll="onScroll">
  <div
  class="mx-0 background lighten-1"
  max-width="500"
  :dark="GET_dark"
  >
  <v-divider :dark="GET_dark"></v-divider>
  <v-layout class="font-weight-light pa-1 ml-1 body-2" justify-left v-if="chapter < 19"> Jump to verse</v-layout>
<chantNavigation> </chantNavigation>
<v-card-text class="pa-0">
  <v-container grid-list-md text-xs-left class="pa-0">
    <v-layout row wrap class="ma-0" justify-center>
      <v-flex xs12 lg6 class="ma-0" v-if="chapter < 19">
        <readOutline> </readOutline>
      </v-flex>
      <v-flex>
      <v-divider :dark="GET_dark"></v-divider>
      <v-layout class="font-weight-light pa-1 ml-1 body-2" justify-left v-if="chapter < 19"> Begin chanting</v-layout>
    </v-flex>
      <v-flex xs12 lg6 class="ma-0">
        <readSalutation> </readSalutation>
      </v-flex>
      <v-flex xs12 lg6 class="ma-0">
        <readStart> </readStart>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container grid-list-md text-xs-left class="pa-1">
    <v-layout row wrap>
      <v-flex  xs12 lg6 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0"   :id="`read${i}`">
        <v-card class="background ma-2" :dark="GET_dark">
          <div>
            <v-layout row align-top>
              <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
            </v-layout>
            <uvachCard :verse_id="item.verse_id" v-if="showVerse"> </uvachCard>
            <shloakCard :verse_id="item.verse_id"  v-if="showVerse"></shloakCard>
          </div>


        </v-card>
      </v-flex>
    </v-layout>
    <v-flex xs12 lg6 class="ma-0">
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
import shloakCard from '../read/subcomponents/shloak-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import chantNavigation from '../read/subcomponents/read-navigation.vue'
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
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter']),
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
      setTimeout(() => {this.$vuetify.goTo('#read' + (this.verse - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})}, 400)
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
  readheaderCard,
  uvachCard,
  readOutline,
  readStart,
  readEnd,
  readSalutation,
  chantNavigation
}
}
</script>

<style lang="scss">
</style>
