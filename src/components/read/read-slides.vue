<template>
<div :style="cssProps" id="beginReadSlides">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">

      <div class="font-weight-light pa-1 subheading background"> Run a slide show</div>


            <vue-flux
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   :transitionOptions="transitionOptions"
   :captions="fluxCaptions"
   ref="slider">
      <flux-pagination slot="pagination"></flux-pagination>
      <flux-controls slot="controls"></flux-controls>
      <flux-caption slot="caption"></flux-caption>
</vue-flux>
<v-btn @click="$refs.slider.showImage('next')">NEXT</v-btn>





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
import { VueFlux, FluxPagination, Transitions, FluxCaption, FluxControls } from 'vue-flux';

export default {
  data: function() {
    return {
        fluxOptions: {
           autoplay: true,
           width: "100%",
           height: "300px"
        },
        fluxCaptions: ['something', 'something', 'something'],
        fluxImages: [
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter1.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter2.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter3.jpeg'
        ],
        fluxTransitions: {
           transitionBook: Transitions.transitionKenburn
        },
        transitionOptions: {
           transitionKenburn: {
              totalDuration: 1000
           }
        }
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
        '--bg-hover-color': this.$vuetify.theme.accent1,
        '--hover-content': JSON.stringify(this.hoverContent),
        '--mywidth': "75px",
        '--myfill': "25px",
        'color': this.options[this.theme].emphasis.high
      }
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
    readNavigation,
    VueFlux,
    FluxPagination,
    FluxCaption,
    FluxControls
  }
}
</script>

<style lang="scss">
</style>
