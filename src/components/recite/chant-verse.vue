<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">


    <chantNavigation> </chantNavigation>
    <v-card-text class="pa-0">

      <v-layout column class="font-weight-light subheading background">
        <v-flex pa-1> Begin chanting </v-flex>
        <v-flex>
          <v-divider :dark="GET_dark"></v-divider>
        </v-flex>
      </v-layout>

      <v-container grid-list-md text-xs-left class="pa-1" :class="options.fsizeAvailable[reciteChantFontSize]">
        <v-layout row wrap>
          <v-flex xs12 class="ma-0">
            <readSalutation> </readSalutation>
          </v-flex>
          <v-flex xs12 class="ma-0">
            <readStart> </readStart>
          </v-flex>
          <v-flex xs12  v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`read${i}`" v-observe-visibility="{
            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, i),
            throttle: 300
            }">
            <v-card class="background ma-2" :dark="GET_dark">
              <div>
                <v-layout row align-top>
                  <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
                </v-layout>
                <uvachCard :verse_id="item.verse_id"> </uvachCard>
                <shloakCard :verse_id="item.verse_id"></shloakCard>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex xs12 class="ma-0">
          <readEnd> </readEnd>
        </v-flex>
        <v-flex v-observe-visibility="{
          callback: (isVisible, entry) => visibilityChangedEnd(isVisible, entry, verseall[chapter-1]),
          throttle: 300
          }">
          <v-card class="background ma-0 pa-0" flat :dark="GET_dark"> <br> </v-card>
        </v-flex>
      </v-container>

      <v-snackbar v-model="snackbar1" color="success" multi-line :timeout="0">
        <span class="subheading"> Good job! You finished chanting this chapter. </span>
        <v-btn dark large @click="snackbar1 = false, snackbar2 = true" color="error">
          Close
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbar2" color="info" multi-line :timeout="0" v-if="chapter<19">
        <span class="subheading"> Do you want to chant Gita Mahatmya next? </span>
        <v-btn large dark color="success" @click="SET_chapter(19), snackbar2 = false, SET_verse(1),
        $vuetify.goTo('#beginChanting', {
          duration: 300,
          offset: -300,
          easing: 'easeInOutCubic'
        })">
          YES
        </v-btn>
        <v-btn large dark @click="snackbar2 = false" color="error">
          NO
        </v-btn>
      </v-snackbar>

    </v-card-text>
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
import shloakCard from '../read/subcomponents/shloak-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import chantNavigation from '../recite/subcomponents/chant-navigation.vue'
import Sanscript from 'Sanscript';
export default {
  data: function() {
    return {
      snackbarReset: false,
      snackbar1: false,
      snackbar2: false
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall'
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter']),
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
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter',
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
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
    },
    visibilityChanged(isVisible, entry, i) {
      console.log(isVisible, i, entry.time)
      if (isVisible & i==0) {
        this.snackbarReset = true
        this.snackbar1 = false
        this.snackbar2 = false
        console.log(i, this.snackbarReset)
      }
    },
    visibilityChangedEnd(isVisible, entry, i) {
      console.log(isVisible, i, entry.time)
      if (isVisible & this.snackbarReset) {
        this.snackbarReset = false
        this.snackbar1 = true
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    verse: function(val) {
      if (!this.loadTheRestOfVerses) {
        this.SET_loadTheRestOfVerses(true)
        setTimeout(() => {
          this.$vuetify.goTo('#read' + (this.verse - 1), {
            duration: 300,
            offset: 0,
            easing: 'easeInOutCubic'
          })
        }, 400)
      } else {
        this.$vuetify.goTo('#read' + (this.verse - 1), {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      }
    }
  },
  updated: function() {
    this.$nextTick(function() {})
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
