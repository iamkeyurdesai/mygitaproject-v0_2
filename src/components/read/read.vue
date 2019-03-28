<template>
  <div v-scroll="onScroll"
       v-touch="{
         left: () => increment(),
         right: () => decrement()
         }"
        :style="cssProps">

<v-responsive>
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
      <v-container fill-height>
        <v-layout align-center>
          <strong class="display-4 font-weight-regular mr-4">{{chapter}}</strong>
          <v-layout column justify-end>
            <div class="headline font-weight-light">{{ convert(preview[chapter-1].title1) }}</div>
            <div class="font-weight-light">{{(this.preview[this.chapter-1].titleEnglish)}}</div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
  <readNavigation> </readNavigation>
  <v-btn @click="$vuetify.goTo('#read20', { duration: 300, offset: 0, easing: 'easeInOutCubic'})">
    <v-icon>arrow_left</v-icon>
  </v-btn>
  <v-card-text class="pa-0">
<v-container grid-list-md text-xs-left class="pa-1">
<v-layout row wrap>
    <v-flex xs12 sm6 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0"   :id="'read'+i">
<v-card class="background ma-1" :dark="GET_dark">
      <v-hover>
        <div slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">

          <v-layout row align-top>
            <!-- verse id -->
            <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
          </v-layout>


          <sambandhCard :verse_id="item.verse_id" v-show="showLink"> </sambandhCard>
          <!-- <v-divider :dark="GET_dark" v-show="showLink"></v-divider> -->

          <uvachCard :verse_id="item.verse_id" v-show="showVerse"> </uvachCard>
          <shloakCard :verse_id="item.verse_id"  v-show="showVerse"></shloakCard>
          <!-- <v-divider :dark="GET_dark" v-show="showVerse"></v-divider> -->

          <uvachCard :verse_id="item.verse_id" v-show="showTranslation & !showVerse"> </uvachCard>
          <bhavarthCard :verse_id="item.verse_id"  v-show="showTranslation"> </bhavarthCard>
          <!-- <v-divider :dark="GET_dark" v-show="showTranslation"></v-divider> -->

          <anvayaCard :verse_id="item.verse_id"  v-show="showAnvaya"></anvayaCard>
        </div>
      </v-hover>

    </v-card>
  </v-flex>
    </v-layout>
</v-container>

  </v-card-text>
</div>
</v-responsive>
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
import Sanscript from 'Sanscript';
export default {
  data: function() {
    return {
    readLoaded: false
    }
  },
  mounted() {
    //do something after mounting vue instance
      self = this
      this.$nextTick(function () {
        console.log('mounted')
        console.log('#read' + this.verse)
        setTimeout(this.SET_offsetTop(this.offsetTop + 1), 100)
        console.log(this.$router.currentRoute)
        // this.$vuetify.goTo('#read' + this.verse, { duration: 300, offset: 0, easing: 'easeInOutCubic'})
      })
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
    'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_main_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    offsetTop: {get(){return this.$store.state.parameters.offsetTop}, set(value){this.SET_offsetTop(value)}},
    fabShow: {get(){return this.$store.state.parameters.fabShow}, set(value){this.SET_fabShow(value)}},
    cssProps() { return {
      '--bg-hover-color': this.$vuetify.theme.accent1,
      '--hover-content': JSON.stringify(this.hoverContent),
      '--mywidth': "75px",
      '--myfill': "25px"
    }
  }
},
methods: {
  ...mapMutations('parameters', ['increment', 'decrement', 'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse']),
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
  }
},
beforeRouteEnter(to, from, next) {
  next();
},
beforeRouteUpdate(to, from, next) {
  next();
},
watch: {
readLoaded: function(val){
  this.$vuetify.goTo('#read' + this.verse, { duration: 300, offset: 0, easing: 'easeInOutCubic'})
}
},
updated: function () {
this.$nextTick(function () {
  console.log('updated')
  console.log('#read' + this.verse)
  this.readLoaded = !this.readLoaded
})
},
components: {
  shloakCard,
  anvayaCard,
  sambandhCard,
  bhavarthCard,
  readheaderCard,
  uvachCard,
  readNavigation
}
}
</script>

<style lang="scss">
</style>
