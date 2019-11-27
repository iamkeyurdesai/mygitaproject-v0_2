<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting" v-if="true">
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">
    <!-- <readNavigation> </readNavigation> -->

      <div class="font-weight-light pa-1 subheading background"> For questions</div>

      <v-container grid-list-md text-xs-left class="pa-1">
        <v-layout row wrap>
          <!-- <v-flex xs12 class="ma-0">
            <readSalutation> </readSalutation>
          </v-flex>
          <v-flex xs12 class="ma-0">
            <readStart> </readStart>
          </v-flex> -->
          <v-flex xs12  v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`questions${i}`" v-observe-visibility="{
            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, i),
            throttle: 300
            }">
            <v-card class="background ma-2" :dark="GET_dark">
              <div>
                <v-layout row align-top>
                  <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
                </v-layout>
                <uvachCard :verse_id="item.verse_id"> </uvachCard>
                <shloakCard :verse_id="item.verse_id"> </shloakCard>
                <questionCard :verse_id="item.verse_id" headingHide
                :myQuestions="chapterQuestions['v'+item.verse_id]!==undefined?chapterQuestions['v'+item.verse_id]:[]"
                :myWords="GET_main_chapter[item.verse_id-1].word_info"
                :myQuestion="' '">
                </questionCard>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex xs12 class="ma-0">
          <readEnd> </readEnd>
        </v-flex>
      </v-container>

  </div>

</div>
<div v-else>
  coming soon...
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
import questionCard from '../reflect/subcomponents/question-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import readNavigation from './subcomponents/read-navigation.vue'
import Sanscript from 'Sanscript';
import {db} from '@/main.js'
export default {
  data: function() {
    return {
      chapterQuestions: null
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall', 'isDeveloper'
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter', 'GET_main_chapter']),
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
      // console.log(isVisible, i, entry.time)
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    chapter: {
     // don't call it upon creation
     immediate: true,
     handler(chapter) {
       this.$bind('chapterQuestions',
       db.collection("reflect").doc("questions").collection("chapter").doc("chapter"+this.chapter))
       .then(data => {
         console.log(data)
       })
     }
  }
},
  updated: function() {
    this.$nextTick(function() {})
  },
  components: {
    shloakCard,
    questionCard,
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
</style>
