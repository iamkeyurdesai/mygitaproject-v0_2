<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <v-card
      class="mt-3 mx-auto background"
      max-width="400"
      :dark="GET_dark"
    >
    <!-- <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 32px)"
        > -->
      <!-- :labels="[...Array(verseall[chapter-1]).keys()]" -->
        <!-- <v-sparkline
          :labels="myId"
          :value="myTime"
          line-width="2"
          padding="16"
          color="white"
        ></v-sparkline> -->
        <!-- </v-sheet> -->
    <vue-c3 :handler="handler"></vue-c3>
        </v-card>

<v-subheader :dark="GET_dark"> Begin chanting </v-subheader>
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">
    <chantNavigation> </chantNavigation>
    <v-card-text class="pa-0">

      <v-container grid-list-md text-xs-left class="pa-1" :class="options.fsizeAvailable[reciteChantFontSize]">
        <v-layout row wrap>
          <v-flex xs12 class="ma-0">
            <readSalutation> </readSalutation>
          </v-flex>
          <v-flex xs12 class="ma-0">
            <readStart> </readStart>
          </v-flex>
          <v-flex xs12  v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`chant${i}`" v-observe-visibility="{
            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, i),
            throttle: 1
            }">
            <v-card class="background ma-2" :dark="GET_dark" :ripple="currentVerse==(i+1)">
              <div :class="{'addActiveBorder': currentVerse==(i+1)}" class="pa-2">
              <div>
                <v-layout row align-top>
                  <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
                </v-layout>
                <uvachCard :verse_id="item.verse_id"> </uvachCard>
                <shloakCard :verse_id="item.verse_id"></shloakCard>
              </div>
             <div class="fixButtonPosition" v-if="currentVerse==(i+1)">

    <v-btn icon large
    @click="proceedChant(1)">
      <v-icon large color="activity">whatshot</v-icon>
    </v-btn>
                </div>
            </div>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex class="ma-0 pa-0">
          <v-card class="background ma-2" :dark="GET_dark" :ripple="currentVerse==(verseall[chapter-1] + 1)">
            <div :class="{'addActiveBorder': currentVerse==(verseall[chapter-1] + 1)}" class="pa-2">
          <readEnd> </readEnd>
          <div class="fixButtonPosition" v-if="currentVerse==(verseall[chapter-1] + 1)">
           <v-btn icon large
           @click="proceedChant(-1)">
             <v-icon large color="activity">whatshot</v-icon>
           </v-btn>
             </div>
             </div>
             </v-card>
        </v-flex>
        <v-flex v-observe-visibility="{
          callback: (isVisible, entry) => visibilityChangedEnd(isVisible, entry, verseall[chapter-1]),
          throttle: 10
          }">
          <v-card class="background ma-0 pa-0" flat :dark="GET_dark"> <br> </v-card>
        </v-flex>
      </v-container>

      <v-snackbar v-model="snackbar1" color="success" multi-line :timeout="0">
        <span class="subheading"> Good job! You finished chanting this chapter. </span>
        <v-btn dark large @click="snackbar1 = false, snackbar2 = true, isChantOn = true" color="error">
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
import VueC3 from 'vue-c3'
import Vue from 'vue'
export default {
  data: function() {
    return {
      snackbarReset: false,
      snackbar1: false,
      snackbar2: false,
      beginSeen: false,
      myTrue: [],
      myFalse:  [],
      myTime: [],
      myTime1: [],
      myTime2: [],
      myId: [],
      isChantOn: true,
      handler: new Vue(),
      myOptions: null,
      currentVerse: 1,
      myAnn: {
        time: [0],
        verse: [],
        label: []
      }
    }
  },
    mounted () {
      this.myOptions = {
        size: {
        width: 350
      },
        data: {
          columns: [
            // ['data1', 2, 4, 1, 5, 2, 1, 3, 1, 3, 5, 3, 2, 7, 8, 9, 7, 3, 1],
            this.myTime
            // ['data2', 7, 2, 4, 6, 10, 1, 4, 7, 8, 12, 14, 8, 5, 2, 5, 2, 2, 1]
          ],
          types: 'spline'
        },
        points: {
          show: false
        }
      }
      this.myOptions.data.columns[0].unshift('data1')
      // this.handler.$emit('init', this.myOptions)
      console.log(this.myOptions)
    },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
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
        'color': this.options[this.theme].emphasis.high,
        '--chantBorderColor': this.$vuetify.theme.activity
      }
    }
    // c3Options() {
    //     data: {
    //       columns: [
    //         ['data1', 2, 4, 1, 5, 2, 1]
    //       ]
    //     }
    //   }
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
      if(this.isChantOn) {
      if(isVisible) this.myTrue[i] = entry.time
      if(!isVisible) this.myFalse[i] = entry.time
    }
        if(isVisible & i==0){
        this.snackbarReset = true
        this.snackbar1 = false
        this.snackbar2 = false
      }
    },
    visibilityChangedEnd(isVisible, entry, i) {
      if (isVisible & this.snackbarReset & i > 3) {
        this.snackbarReset = false
        this.isChantOn = false
        this.snackbar1 = true
        for(var i = 0;i<=this.myTrue.length-1;i++) {
        this.myTime.push(Math.ceil(this.myFalse[i] - this.myTrue[i]))
        this.myId.push(i+1)
      }
        console.log(this.myTrue, this.myFalse, this.myTime)
        // for(var i = 0;i<=this.myOptions.data.columns[0].length-1;i++) {
        // this.myOptions.data.columns[0][i] = this.myTime[i]}
        // this.myOptions.data.columns[0].unshift('data1')
        console.log(this.myOptions)
        // this.handler.$emit('init', this.myOptions)

        // this.handler.$emit('init', this.c3Options)
      }
  },
  proceedChant(val){
    if(val===1) {
    if(this.currentVerse==1) {
      this.myTime1 = []
      this.myTime2 = []
      if (this.sanskritLabels['c' + this.chapter]) {
        this.myAnn = Object.assign({}, this.sanskritLabels['c' + this.chapter])
      }
      console.log(this.myAnn)
    }
    let dt = new Date()
    this.myTime1.push(Math.ceil(dt.getTime()))
    this.myTime2.push(Math.ceil(dt.getTime()))
    this.currentVerse += 1
  } else {
    for(var i = this.myTime1.length - 1;i>0;i--) {
    this.myTime1[i] = (Math.ceil(this.myTime1[i] - this.myTime1[i-1]))
    // this.myTime2[i] = this.myAnn.time[this.myAnn.verse.findIndex(a => a===(i+1))]
    this.myTime2[i] = this.myAnn.time[this.myAnn.verse.lastIndexOf((i+1))]
  }
  this.myTime1[0] = this.myTime1[1]
  this.myTime2[0] = this.myAnn.time[this.myAnn.verse.lastIndexOf(1)]
  console.log(this.myTime1)
    this.currentVerse = 1
  for(var i = this.myTime2.length - 1;i>0;i--) {
  this.myTime2[i] = (Math.ceil((this.myTime2[i] - this.myTime2[i-1])*1000))
}
this.myTime2[0] = this.myTime2[1]
this.myTime2[this.myTime2.length-1] = this.myTime2[this.myTime2.length-2]
// this.myTime2.unshift("data1")
console.log(this.myTime2)
console.log(this.myOptions)
for(var i = 1;i<=this.myTrue.length;i++) {
this.myTime[i] = this.myTime2[i-1]
}
  this.handler.$emit('init', this.myOptions)
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
    chantNavigation,
    VueC3
  }
}
</script>

<style lang="scss">
// path.domain { fill: white; }
// .tick text { fill: yellow; }
// .c3-legend-item text { fill: grey; }
.fixButtonPosition{
  position: absolute;
  bottom: 0;
  right: 0;
}
.addActiveBorder{
  border: 1px solid var(--chantBorderColor);
}
</style>
