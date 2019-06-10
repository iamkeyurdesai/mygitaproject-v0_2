<template>
<div :style="cssProps" id="beginReadSlides">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">

      <div class="font-weight-light pa-1 subheading background"> Run a slide show</div>


      <v-layout row align-start justify-start>
        <v-btn fab small light  @click="ixImage-=1"> <v-icon  large> keyboard_arrow_left  </v-icon> </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab small light @click="ixImage+=1"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn>
      </v-layout>
        <v-card class="background ma-1" :dark="GET_dark">
             <!-- <blockquote class="blockquote ma-0">
               {{imageCaptions[ixImage]}}
             </blockquote> -->
             <uvachCard :verse_id="ixImage+1"> </uvachCard>
             <bhavarthCard :verse_id="ixImage+1" headingHide showVerseIndex></bhavarthCard>
           </v-card>

        <div
        class="mx-0 background lighten-1 something"
        :dark="GET_dark"
        >
          <v-img
          :src="imagePath"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
          :style="cssImage"
          >
          </v-img>

  </div>

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
      ixImage: 0
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall'
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
            animation: 'move 10s ease infinite'
      }
    },
    imageCaptions() {
      return this.GET_sivananda_chapter.map(a => a.translation)

    },
    imagePath() {
      return "/static/img/chapter_preview/previewchapter"+ (this.ixImage + 1) + ".jpeg"
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
