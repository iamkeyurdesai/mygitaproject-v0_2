<template>
<div :style="cssProps" id="beginReadSlides" v-if="isDeveloper">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">

      <div class="font-weight-light pa-1 subheading background"> Run a slide show</div>




<fullscreen ref="fullscreen" @change="fullscreenChange" class="background">
<v-layout row justify-content-center v-if="$vuetify.breakpoint.width > $vuetify.breakpoint.height">
<v-flex grow xs8 >
        <div class="mx-0 background lighten-1 something" :dark="GET_dark" align="center">
          <v-img :src="imagePath" :lazy-src="imagePath" gradient="to top,
          rgba(0,0,0,.44), rgba(0,0,0,.44)" :style="cssImage" transition>
          </v-img>
</div>
</v-flex>
<v-layout column class="background" :dark="GET_dark">
  <v-flex shrink>
    <v-layout row>
    <v-spacer></v-spacer>
             <uvachCard :verse_id="ixImage+1"> </uvachCard>
             <v-btn @click="toggle" icon :dark="GET_dark" small><v-icon>fullscreen</v-icon></v-btn>
             </v-layout>
             </v-flex>
             <v-flex shrink>
               <v-layout justify-space-between column fill-height>
             <bhavarthCard :verse_id="ixImage+1" headingHide showVerseIndex></bhavarthCard>
             <v-spacer></v-spacer>
             <v-layout row align-end justify-end>
               <v-btn fab small light  @click="ixImage-=1" icon :dark="GET_dark"> <v-icon large> keyboard_arrow_left  </v-icon> </v-btn>
               <v-spacer></v-spacer>
               <v-btn fab small light @click="ixImage+=1" icon :dark="GET_dark"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn>
             </v-layout>
             </v-layout>
</v-flex>
</v-layout>
</v-layout>
<v-layout column justify-content-center v-else>
  <v-layout column class="background" :dark="GET_dark">
    <v-layout row align-end justify-end>
      <v-btn fab small light  @click="ixImage-=1" icon :dark="GET_dark"> <v-icon large> keyboard_arrow_left  </v-icon> </v-btn>
      <v-spacer></v-spacer>
      <v-btn fab small light @click="ixImage+=1" icon :dark="GET_dark"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn>
    </v-layout>
      <v-layout row>
      <v-spacer></v-spacer>
               <uvachCard :verse_id="ixImage+1"> </uvachCard>
               <v-spacer></v-spacer>
               <v-btn @click="toggle" icon :dark="GET_dark" small><v-icon>fullscreen</v-icon></v-btn>
               </v-layout>
               <bhavarthCard :verse_id="ixImage+1" headingHide showVerseIndex></bhavarthCard>
               </v-layout>
        <div class="mx-0 mb-5 background lighten-1 something" :dark="GET_dark" align="center" >
          <v-img :src="imagePath" :lazy-src="imagePath" gradient="to top,
          rgba(0,0,0,.44), rgba(0,0,0,.44)" :style="cssImage" transition >
          </v-img>
</div>
             </v-layout>
</fullscreen>
</div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';
import {
  mapMutations
} from 'vuex';
import bhavarthCard from '../read/subcomponents/bhavarth-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import readNavigation from './subcomponents/read-navigation.vue'
import Sanscript from 'Sanscript';

export default {
  data: function() {
    return {
      ixImage: 0,
      fullscreen: false
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall', 'isDeveloper'
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter', 'GET_sivananda_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {
        'color': this.options[this.theme].emphasis.high
      }
    },
    cssImage() {
      return {
            animation: 'move 20s ease infinite'
      }
    },
    imageCaptions() {
      return this.GET_sivananda_chapter.map(a => a.translation)

    },
    imagePath() {
      return "/static/img/chapter_" + this.chapter + "_500px/"+ (this.ixImage + 1) + ".jpeg"
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter',
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    visibilityChanged(isVisible, entry, i) {
      console.log(isVisible, i, entry.time)
    },
    toggle () {
       this.$refs['fullscreen'].toggle() // recommended
       // this.fullscreen = !this.fullscreen // deprecated
     },
     fullscreenChange (fullscreen) {
       this.fullscreen = fullscreen
     }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
  },
  updated: function() {
    this.$nextTick(function() {})
  },
  components: {
    bhavarthCard,
    readheaderCard,
    uvachCard,
    readOutline,
    readStart,
    readEnd,
    readSalutation,
    readNavigation
  }
}
</script>

<style lang="scss">
@keyframes move {
  from {
  	transform: scale(1.0);
  }
  to {
  	transform: scale(1.5);
  }
}
.something{
  overflow: hidden;
}
.captionDiv{
}
</style>
