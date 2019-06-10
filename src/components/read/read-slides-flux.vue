<template>
<div :style="cssProps" id="beginReadSlides">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">

      <div class="font-weight-light pa-1 subheading background"> Run a slide show</div>

<!-- <flux-caption v-show="false" v-if="mounted" :slider="$refs.slider" class="ma-1"></flux-caption> -->

            <vue-flux class="something"
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   :transitionOptions="transitionOptions"
   :captions="fluxCaptions"
   ref="slider">
      <!-- <flux-pagination slot="pagination"></flux-pagination> -->
      <flux-controls slot="controls"></flux-controls>
      <!-- <flux-caption slot="caption"></flux-caption> -->
      <flux-index slot="index"></flux-index>
</vue-flux>
<!-- <v-btn @click="$refs.slider.showImage('next')">NEXT</v-btn>
<v-btn @click="$refs.slider.requestFullscreen()">FuLLscreen</v-btn>
<v-btn @click="$refs.slider.currentImage().setCss({
    animation: 'move 7s ease infinite'})"> tt </v-btn> -->
<v-expand-x-transition>
    <div class="captionDiv ma-2"> {{fluxCaptionsLocal}}</div>
</v-expand-x-transition>
  </div>

  <!-- animation: kenburns
  animationDuration: 4,
  animationIterationCount: infinite})"> tt </v-btn>
   -->
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
import { VueFlux, FluxPagination, Transitions, FluxCaption, FluxControls, FluxIndex } from 'vue-flux';

export default {
  data: function() {
    return {
        fluxOptions: {
           autoplay: false,
           width: "100%",
           height: "auto",
           delay: 20000
        },
        fluxImages: [
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter1.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter2.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter3.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter4.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter5.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter6.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter7.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter8.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter9.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter10.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter11.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter12.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter13.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter14.jpeg',
           'https://gitawebapp.firebaseapp.com/static/img/chapter_preview/previewchapter15.jpeg'
        ],
        fluxTransitions: {
           transitionBook: Transitions.transitionCube
        },
        transitionOptions: {
           transitionKenburn: {
              totalDuration: 10000
           }
        }
    }
  },
   mounted() {
      this.mounted = true;
      this.$refs.slider.currentImage().setCss({
          animation: 'move 10s ease infinite'})
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
    },
    fluxCaptions() {
      return this.GET_sivananda_chapter.map(a => a.translation)

    },
    fluxCaptionsLocal() {
      if(this.$refs.slider) {
        // console.log(this.$refs.slider.currentImage())
        console.log(this.$refs.slider.getIndex('next'))
        console.log(this.$refs.slider.properties)
        // this.fluxOptions.height = this.$refs.slider.properties[this.$refs.slider.getIndex('next') - 1].height + ""
        // this.$refs.slider.resize()
        return this.fluxCaptions[this.$refs.slider.getIndex('next') - 1]
      } else {
        return this.fluxCaptions[0]
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
    FluxControls,
    FluxIndex
  }
}
</script>

<style lang="scss">
@keyframes move {
  from {
  	transform: scale(1.0);
  }
  to {
  	transform: scale(1.2);
  }
}
.something{
  overflow: hidden;
}
.captionDiv{
}
</style>
