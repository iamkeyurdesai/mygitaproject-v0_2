<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <v-card class="mt-3 mx-auto background" :dark="GET_dark">
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
    <!-- <vue-c3 :handler="handler"></vue-c3> -->
    <!-- <div id="chart"></div> -->
  </v-card>
  <!-- <manageGroup></manageGroup>
  <manageSession></manageSession> -->
  <v-subheader :dark="GET_dark"> Chant in a group </v-subheader>
  <!-- <joinGroup :myGroupSelectData="myGroupSelectData" :myGroupSelectDataAdded="myGroupSelectDataAdded"></joinGroup>
  <chatGroup></chatGroup> -->

  <v-subheader :dark="GET_dark"> Begin chanting </v-subheader>
  <div class="mx-0 background lighten-1" max-width="500" :dark="GET_dark">
    <chantNavigation> </chantNavigation>
    <v-card-text class="pa-0">

      <v-container grid-list-md text-xs-left class="pa-1" :class="options.fsizeAvailable[reciteChantFontSize]">
        <v-layout row wrap>
          <v-flex xs12 class="ma-0">
            <v-card class="background ma-2" :dark="GET_dark" :ripple="currentVerse==-1">
              <div :class="{'addActiveBorder': currentVerse==-1}" class="pa-2">
                <div>
                  <readSalutation> </readSalutation>
                </div>
                <div class="fixButtonPosition" v-if="currentVerse==-1">
                  <v-btn icon large @click="currentVerse+=1">
                    <v-icon large color="activity">&#128293;</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs12 class="ma-0">
            <v-card class="background ma-2" :dark="GET_dark" :ripple="currentVerse==0">
              <div :class="{'addActiveBorder': currentVerse==0}" class="pa-2">
                <div>
                  <readStart> </readStart>
                </div>
                <div class="fixButtonPosition" v-if="currentVerse==0">
                  <v-btn icon large @click="currentVerse+=1">
                    <v-icon large color="activity">&#128293;</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs12 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`chant${i}`" v-observe-visibility="{
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

                  <v-btn icon large @click="proceedChant(1)">
                    <v-icon large color="activity">&#128293;</v-icon>
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
                <v-btn icon large @click="proceedChant(-1)">
                  <v-icon large color="activity">&#128293;</v-icon>
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
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import joinGroup from './join-group.vue'
import manageGroup from './manage-group.vue'
import manageSession from './manage-session.vue'
import chatGroup from './chat-group.vue'
import shloakCard from '../read/subcomponents/shloak-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import chantNavigation from '../recite/subcomponents/chant-navigation.vue'
import Sanscript from 'Sanscript'
import {db} from '@/main.js'
// import VueC3 from 'vue-c3'
import c3 from 'c3'
import Vue from 'vue'
export default {
  data: function() {
    return {
      searchGroup: '',
      myGroupSelectData: {},
      myGroupSelectDataAdded: false,
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
      currentVerse: -1,
      myAnn: {
        time: [0],
        verse: [],
        label: []
      }
    }
  },
    mounted () {
    var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ],
      axes: {
        data2: 'y2'
      },
      types: {
        data2: 'bar' // ADD
      }
    },
    axis: {
      y: {
        label: {
          text: 'Y Label',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Y2 Label',
          position: 'outer-middle'
        }
      }
    }
});
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
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall',
      'currentChantGroup'
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
        '--chantBorderColor': this.$vuetify.theme.activity,
        '--mainColor': this.options[this.theme].emphasis.high
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
    this.currentVerse = -1
  for(var i = this.myTime2.length - 1;i>0;i--) {
  this.myTime2[i] = (Math.ceil((this.myTime2[i] - this.myTime2[i-1])*1000))
}
this.myTime2[0] = this.myTime2[1]
this.myTime2[this.myTime2.length-1] = this.myTime2[this.myTime2.length-2]
// this.myTime2.unshift("data1")
//console.log(this.myTime2)
//console.log(this.myOptions)
console.log(FastIntegerCompression.compress(this.myTime1))
//console.log(sizeof(FastIntegerCompression.compress(this.myTime2)))
console.log(this.myTime1.map(a => a.toString(36)))
console.log(sizeof(this.myTime1.map(a => a.toString(36))))
console.log(sizeof(this.myTime1))
//console.log(this.myTime2.map(a => a.toString(36)))
this.myTime2.map(a => {console.log(a)})
for(var i = 1;i<=this.myTrue.length;i++) {
this.myTime[i] = this.myTime2[i-1]
}
  this.handler.$emit('init', this.myOptions)
  let dt = new Date()
  let dataSend = {
    chapter_id: this.chapter,
    group: 'none',
    start_time: dt.getTime(),
    score: 100,
    time: this.myTime
  }
  console.log(dataSend)
  this.addChantLog(dataSend)
  }
},
addChantLog(val) {
  var db = firebase.firestore();
  db.collection("logs").doc(firebase.auth().currentUser.uid).collection("chant").doc('t'+val.start_time).set(val)
}
},
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    currentChantGroup: {
     // don't call it upon creation
     immediate: false,
     handler(currentChantGroup) {
       this.$bind('myGroupSelectData',
       db.collection("recite").doc("chant").collection("groups").doc(this.currentChantGroup).collection('admin').doc('status'))
       .then(myGroupSelectData => {
         this.myGroupSelectDataAdded = true
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
    chantNavigation,
    joinGroup,
    manageGroup,
    chatGroup,
    manageSession
  }
}
</script>

<style lang="scss">
path.domain { fill: var(--mainColor); }
.tick text { fill: var(--mainColor); }
.c3-legend-item text { fill: var(--mainColor); }
.fixButtonPosition{
  position: absolute;
  bottom: 0;
  right: 0;
}
.addActiveBorder{
  border: 1px solid var(--chantBorderColor);
}
.c3-chart-arcs-background{
  fill:#e0e0e0;
  stroke:none
}
.c3-shape {
    fill: none;
}

</style>
