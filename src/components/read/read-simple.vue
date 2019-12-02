<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <div class="mx-0" :class="{'background lighten-1': GET_dark, 'background darken-1': !GET_dark}" max-width="500" :dark="GET_dark">
    <readNavigation> </readNavigation>

    <v-fab-transition>
      <settingsPopup isScript isTheme isFsize isLanguage v-show="showNav"></settingsPopup>
    </v-fab-transition>

    <v-container grid-list-md text-xs-left class="pa-1">
      <v-layout row wrap>
        <v-flex xs12 class="ma-0">
          <readSalutation :whatLanguage="language"> </readSalutation>
        </v-flex>
        <v-flex xs12 class="ma-0">
          <readStart :whatLanguage="language"> </readStart>
        </v-flex>
        <v-flex xs12 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0">

          <v-card class="background mx-1 my-2" :dark="GET_dark" v-if="$vuetify.breakpoint.width < 600">
            <v-layout row wrap>
              <v-flex class="overflowHidden" xs4 align-self-center>
                <v-img width="125" v-if="!showImages[chapter-1][i]">
                  <div align="center">
                  <v-btn icon :dark="GET_dark" @click="setShowImage(chapter-1, i)" class="text-none font-weight-light">Reveal<br>Image</v-btn>
                </div>
                </v-img>
                <v-img :src="imagePath(i)" :lazy-src="imagePath(i)" width="125" v-else>
                </v-img>
              </v-flex>
              <v-flex xs8 align-self-center>
                <uvachCard :verse_id="item.verse_id" :whatScript="script" class="mt-2"
                :whatLanguage="language"
                :speakerCurrent="GET_main_chapter[item.verse_id-1].speaker"
                :speakerPrevious="item.verse_id-1 > 0? GET_main_chapter[item.verse_id-2].speaker : ''"> </uvachCard>
                <bhavarthCard :verse_id="item.verse_id" :chapter="chapter"
                :options="options" :theme="theme" :language="language"
                :GET_gitapress_chapter_local="GET_gitapress_chapter[item.verse_id-1]"
                :GET_sivananda_chapter_local="GET_sivananda_chapter[item.verse_id-1]"
                headingHide showVerseIndex
                ></bhavarthCard>
              </v-flex>
            </v-layout>
          </v-card>

          <v-card class="background mx-2 my-3" :dark="GET_dark" v-else>
            <v-layout row wrap>
              <v-flex class="overflowHidden" xs2 align-self-center>
                <v-img width="125" v-if="!showImages[chapter-1][i]">
                  <div align="center">
                  <v-btn icon :dark="GET_dark" @click="setShowImage(chapter-1, i)" class="text-none font-weight-light">Reveal<br>Image</v-btn>
                </div>
                </v-img>
                <v-img :src="imagePath(i)" :lazy-src="imagePath(i)" width="125" v-else>
                </v-img>
              </v-flex>
              <v-flex xs10 align-self-center>
                <uvachCard :verse_id="item.verse_id" :whatScript="script" class="mt-2"
                :whatLanguage="language"
                :speakerCurrent="GET_main_chapter[item.verse_id-1].speaker"
                :speakerPrevious="item.verse_id-1 > 0? GET_main_chapter[item.verse_id-2].speaker : ''"> </uvachCard>
                <bhavarthCard :verse_id="item.verse_id" :chapter="chapter"
                :options="options" :theme="theme" :language="language"
                :GET_gitapress_chapter_local="GET_gitapress_chapter[item.verse_id-1]"
                :GET_sivananda_chapter_local="GET_sivananda_chapter[item.verse_id-1]"
                headingHide showVerseIndex
                ></bhavarthCard>
              </v-flex>
            </v-layout>
          </v-card>

        </v-flex>
      </v-layout>
      <v-flex xs12 class="ma-0">
        <readEnd :language="language"> </readEnd>
      </v-flex>
    </v-container>

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
import settingsPopup from '@/components/settings/settings-popup.vue'
import Sanscript from 'Sanscript';
var FlexSearch = require("flexsearch")

export default {
  data: function() {
    return {
    }
  },
  mounted() {

  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview', 'sivananda', 'gitapress', 'gitapress_commentary', 'main']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'theme', 'language', 'showNav', 'verseall', 'showNav', 'showImages']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_sivananda_chapter', 'GET_main_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    offsetTop: {
      get() {
        return this.$store.state.parameters.offsetTop
      },
      set(value) {
        this.SET_offsetTop(value)
      }
    },
    fabShow: {
      get() {
        return this.$store.state.parameters.fabShow
      },
      set(value) {
        this.SET_fabShow(value)
      }
    },
    cssProps() {
      return {
        '--bg-hover-color': this.$vuetify.theme.accent1,
        '--hover-content': JSON.stringify(this.hoverContent),
        '--mywidth': "75px",
        '--myfill': "25px",
        'color': this.options[this.theme].emphasis.high
      }
    },
    cssProps_high() { return {
        'color': '#FFFFFFFF'
  }
}
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter', 'SET_showNav',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse',
      'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter', 'SET_showImages'
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    setShowImage(ix,iy){
      this.SET_showImages([ix, iy])
      let temp = this.chapter
      this.SET_chapter(15)
      this.SET_chapter(temp)
    },
    imagePath(myix) {
      return "/static/img/chapter_" + ('0' + this.chapter).slice(-2) + "_500px/"+ (myix+1) + ".jpeg"
    },
    onScroll(e) {
      let scrollTemp = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTemp < this.offsetTop) {
        this.fabShow = true
      } else {
        this.fabShow = false
      }
      this.offsetTop = scrollTemp
      if (scrollTemp > 300) {
        this.SET_loadTheRestOfVerses(true)
      }
    }
  },
  watch: {
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
    settingsPopup
  }
}
</script>

<style lang="scss">
.overflowHidden{
  overflow: hidden;
}
</style>
