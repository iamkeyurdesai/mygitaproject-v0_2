<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <v-card class="mt-3 mx-auto background" :dark="GET_dark">
    <mediaRecorder></mediaRecorder>
  </v-card>
  <manageGroup></manageGroup>
  <manageSession></manageSession>
  <v-subheader :dark="GET_dark"> Chant in a group </v-subheader>
  <joinGroup :myGroupSelectData="myGroupSelectData" :myGroupSelectDataAdded="myGroupSelectDataAdded"></joinGroup>
  <chatGroup></chatGroup>

  <v-subheader :dark="GET_dark"> Begin chanting
    <!-- <v-spacer> </v-spacer>
    <v-expand-transition>
    <div v-if="!chantAddColumn">
    <v-btn @click="addPressed()" fab color="accentmain" small>
      <v-icon dark large>add</v-icon>
    </v-btn>
  </div>

  <div v-else>
    <v-btn icon  color="accentmain" v-if="!breakSandhi1" v-on:click.stop="breakSandhi1=true">
      <v-icon> gavel</v-icon>
    </v-btn>
    <v-btn icon  color="activity" v-else v-on:click.stop="breakSandhi1=false">
      <v-icon small> gavel</v-icon>
    </v-btn>
    <v-btn icon  color="accentmain" v-if="!breakSandhi2" v-on:click.stop="breakSandhi2=true">
      <v-icon> gavel</v-icon>
    </v-btn>
    <v-btn icon  color="activity" v-else v-on:click.stop="breakSandhi2=false">
      <v-icon small> gavel</v-icon>
    </v-btn>
    <v-btn @click="removePressed()" fab color="accentinfo" small>
      <v-icon dark large>clear</v-icon>
    </v-btn>
    </div>
    </v-expand-transition>
     -->
  </v-subheader>


    <div class="mx-0 background lighten-1" :dark="GET_dark">
    <chantNavigation :showZoom="currentI > 0" :scrollLock="scrollLock"
      v-on:unLock="scrollLock=false, showLock=true" :showLock="showLock"> </chantNavigation>
    <v-card-text class="pa-0">

      <v-container grid-list-md text-xs-left class="pa-1" :class="options.fsizeAvailable[reciteChantFontSize]">
        <v-layout row wrap>
          <v-flex xs12 class="ma-0">
            <v-card class="background ma-2" :dark="GET_dark" :ripple="currentVerse==-1" :min-height="minHeight">
              <div :class="{'addActiveBorder1': currentVerse==-1}" class="pa-2">
                <div v-if="chantAddColumn">
                  <v-layout row align-start>
                    <v-flex xs5>
                  <readSalutation> </readSalutation>
                  </v-flex>
                  <v-flex xs5>
                  <readSalutation whatScript="iast"> </readSalutation>
                  </v-flex>
                  </v-layout>
                </div>
                <div v-else>
                  <readSalutation> </readSalutation>
                </div>
                <div class="fixButtonPosition" v-if="currentVerse==-1">
                  <v-btn icon large @click="currentVerse+=1">
                    <!-- <v-icon large color="activity">&#128293;</v-icon> -->
                    <v-img src="/static/img/gif/hawan2_small.gif"></v-img>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs12 class="ma-0">
            <v-card class="background ma-2" :dark="GET_dark" id="chant0" :min-height="minHeight"
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityChanged(isVisible, entry),
              throttle: 300
              }">
              <div :class="{'addActiveBorder1': currentVerse==0}" class="pa-2">
                <div v-if="chantAddColumn">
                  <v-layout row align-start>
                    <v-flex xs5>
                  <readStart> </readStart>
                  </v-flex>
                  <v-flex xs5>
                  <readStart whatScript="iast"> </readStart>
                  </v-flex>
                  </v-layout>
                </div>
                <div v-else>
                  <readStart> </readStart>
                  </div>
                <div class="fixButtonPosition makeBigger" v-if="currentVerse==0">
                  <v-btn icon large @click="currentVerse+=1">
                    <!-- <v-icon large color="activity">&#128293;</v-icon> -->
                    <v-img src="/static/img/gif/hawan2_small.gif"></v-img>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs12 v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`chant${i+1}`">
            <!-- <v-card class="background ma-2" :dark="GET_dark" :ripple="{value:currentVerse==(i+1)}"> -->
              <v-card class="background ma-2" :dark="GET_dark" :min-height="minHeight">
              <div :class="{'addActiveBorder': currentVerse==(i+1)}" class="pa-2">
                    <span class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{chapter}}|{{item.verse_id}}</span>
                    <v-layout row>
                      <v-flex :xs5="chantAddColumn">
                    <uvachCard :verse_id="item.verse_id" :whatScript="script"
                    :speakerCurrent="GET_main_chapter[item.verse_id-1].speaker"
                    :speakerPrevious="item.verse_id-1 > 0? GET_main_chapter[item.verse_id-2].speaker : ''"> </uvachCard>
                    <shloakCard :verse_id="item.verse_id" :chapter="chapter" :whatScript="script"
                    :options="options" :theme="theme"
                    :GET_main_local="GET_main_chapter[item.verse_id-1]"></shloakCard>
                  </v-flex>
                  <v-flex xs5 v-if="chantAddColumn">
                    <uvachCard :verse_id="item.verse_id" :whatScript="script"
                    :speakerCurrent="GET_main_chapter[item.verse_id-1].speaker"
                    :speakerPrevious="item.verse_id-1 > 0? GET_main_chapter[item.verse_id-2].speaker : ''"> </uvachCard>
                    <shloakCard :verse_id="item.verse_id" :chapter="chapter" :whatScript="script"
                    :options="options" :theme="theme"
                    :GET_main_local="GET_main_chapter[item.verse_id-1]"></shloakCard>
                  </v-flex>
                  <div class="fixButtonPosition" v-if="currentVerse==(i+1)" transition="scale-transition">
                    <v-btn icon large @click="proceedChant(1)">
                      <v-img src="/static/img/gif/hawan2_small.gif"></v-img>
                    </v-btn>
                  </div>
                    </v-layout>

              </div>
            </v-card>
          </v-flex>

        </v-layout>
        <v-flex class="ma-0 pa-0">
          <v-card class="background ma-2" :dark="GET_dark" :ripple="{value:currentVerse==(verseall[chapter-1] + 1)}"
          :id="`chant${verseall[chapter-1] + 1}`" :min-height="minHeight">
            <div :class="{'addActiveBorder': currentVerse==(verseall[chapter-1] + 1)}" class="pa-2">
              <readEnd> </readEnd>
              <div class="fixButtonPosition" v-if="currentVerse==(verseall[chapter-1] + 1)">
                <v-btn icon large @click="proceedChant(-1)">
                  <!-- <v-icon large color="activity">&#128293;</v-icon> -->
                  <v-img src="/static/img/gif/hawan2_small.gif"></v-img>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="background ma-0 pa-0" flat :dark="GET_dark" min-height="300px" id="chantEnd"> <br> </v-card>
        </v-flex>
      </v-container>

      <v-snackbar v-model="snackbar1" color="success" multi-line :timeout="0">
        <span class="subheading"> {{this.myScore[1] > 80 ? 'Excellent! ' : 'Done.'}} You scored {{this.myScore[1]}}! </span>
        <v-btn dark large @click="snackbar1 = false, snackbar2 = true" color="error">
          Close
        </v-btn>
      </v-snackbar>

      <!-- <v-snackbar v-model="snackbar1" color="success" multi-line :timeout="0">
        <span class="subheading"> Good job! You finished chanting this chapter. </span>
        <v-btn dark large @click="snackbar1 = false, snackbar2 = true, isChantOn = true" color="error">
          Close
        </v-btn>
      </v-snackbar> -->
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


<v-fab-transition>
          <v-btn v-if="offsetTop >  2000 & !snackbar1 & !snackbar2 & (currentVerse < 1)" @click="$vuetify.goTo(0, { duration: 100, offset: 0, easing: 'easeInOutCubic'})"
            :dark="GET_dark" fab flat bottom small left fixed icon class="shiftMiddle mb-5">
          <v-icon>fa-angle-double-up</v-icon>
        </v-btn>
</v-fab-transition>

  <v-fab-transition>
  </v-fab-transition>
        <settingsPopup isScript isTheme></settingsPopup>

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
import mediaRecorder from '../recite/subcomponents/media-recorder.vue'
import Sanscript from 'Sanscript'
import settingsPopup from '@/components/settings/settings-popup.vue'

import {db, rtdb} from '@/main.js'
// import VueC3 from 'vue-c3'
import c3 from 'c3'
import Vue from 'vue'
export default {
  data: function() {
    return {
      searchGroup: '',
      myGroupSelectData: {},
      myGroupSelectDataAdded: false,
      breakSandhi1: false,
      breakSandhi2: false,
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
      myScore: [],
      isChantOn: true,
      handler: new Vue(),
      myOptions: null,
      currentVerse: -1,
      scrollLock: false,
      showLock: false,
      currentI: -1,
      myAnn: {
        time: [0],
        verse: [],
        label: []
      }
    }
  },
    mounted () {
    },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'reciteChantFontSize', 'verseall',
      'currentChantGroup', 'chantAddColumn', 'chantSecondScript', 'loadTheRestOfVerses'
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
        'color': this.options[this.theme].emphasis.high,
        '--chantBorderColor': this.$vuetify.theme.activity,
        '--mainColor': this.options[this.theme].emphasis.high,
        '--screenWidth': (this.$vuetify.breakpoint.width/2 - 40)+'px',
        '--buttonWidth': (Math.min((Math.min(this.$vuetify.breakpoint.width,960)*0.13-40) + 50, 85))+'px',
        '--bottomOffset': (Math.min((Math.min(this.$vuetify.breakpoint.width,960)*0.13-40) + 50, 85))*0.25+'px'
      }
    },
    minHeight() {
      return (Math.min((Math.min(this.$vuetify.breakpoint.width,960)*0.13-40) + 50, 80))+'px'
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_verse', 'SET_chapter', 'SET_chantAddColumn', 'SET_chantSecondScript',
      'SET_loadTheRestOfVerses'
    ]),
    addPressed() {
    this.SET_loadTheRestOfVerses(false)
    this.SET_chantAddColumn(true)
  },
  removePressed() {
  this.SET_loadTheRestOfVerses(false)
  this.SET_chantAddColumn(false)
  this.breakSandhi1=false
  this.breakSandhi2=false
},
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
      if(scrollTemp > 800) {
        this.SET_loadTheRestOfVerses(true)
      }
    },
    visibilityChanged(isVisible, entry) {
      if(entry.boundingClientRect.top<(500 + Math.max(0, this.$vuetify.breakpoint.height - 600))) {
        this.currentI = 1
      } else {
        this.currentI = 0
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
    this.currentVerse = -1
  for(var i = this.myTime2.length - 1;i>0;i--) {
  this.myTime2[i] = (Math.ceil((this.myTime2[i] - this.myTime2[i-1])*1000))
}
this.myTime2[0] = this.myTime2[1]
this.myTime2[this.myTime2.length-1] = this.myTime2[this.myTime2.length-2]
//console.log(this.myTime1.map(a => a.toString(36)))
//console.log(sizeof(this.myTime1.map(a => a.toString(36))))
//console.log(this.myTime2.map(a => a.toString(36)))
//this.myTime2.map(a => {console.log(a)})
for(var i = 1;i<=this.myTrue.length;i++) {
this.myTime[i] = this.myTime2[i-1]
}
  this.myScore = this.computeScore(this.myTime1)
  this.snackbar1 = true
  console.log(this.myScore)
  let dt = new Date()
  let dataSend = {
    chapter_id: this.chapter,
    group: this.currentChantGroup,
    start_time: dt.getTime(),
    speed: this.myScore[0],
    rythem: this.myScore[1],
    time: this.compressTimes(this.myTime1)
  }
  console.log(dataSend)
  this.addChantLog(dataSend)
  }
},
computeScore(tUser){
  // derive tExpert
  const slb = this.sanskritLabels['c' + this.chapter]
  const ix = slb['label'].lastIndexOf('end')
  const a = slb['time'].map(el=>el).slice(1,ix)
  const b = slb['verse'].map(el=>el).slice(1,ix)
  let i
  const t=[]
  for(i=1;i<=this.verseall[this.chapter-1];i++) {
    t.push(a[b.lastIndexOf(i)])
  }
  const tExpert1 = []
  for(i=1;i<=this.verseall[this.chapter-1];i++) {
    if(i==1) {
      tExpert1.push(t[i-1])
    } else {
      tExpert1.push(t[i-1] - t[i-2])
    }
  }
  tExpert1[0] = tExpert1[0] - slb['time'][1] + 3
  const tExpert = tExpert1.map(a => a*1000)
  console.log(tExpert)
  console.log(tUser)
  const scoreVerse = function(x,y,baseN) {
    console.log(Math.log(x/y)/Math.log(baseN))
   let ydiff = Math.abs(Math.log(x/y)/Math.log(baseN))
   return (1 - (ydiff>1? 1: ydiff) )*100
  }
  const rythemScore = []
  for(i=1;i<this.verseall[this.chapter-1];i++) {
    rythemScore.push(scoreVerse(tUser[i-1]/tUser[i], tExpert[i-1]/tExpert[i], 1.5))
  }
  console.log(tUser)
  console.log(tExpert)
  console.log(rythemScore)
  const ans = []
  ans[0] = tExpert.reduce((a, b) => a + b, 0)/tUser.reduce((a, b) => a + b, 0)
  rythemScore.shift()
  rythemScore.pop()
  ans[1] = (rythemScore.reduce((a, b) => a + b, 0)/rythemScore.length).toFixed(2)
  return ans
},
addChantLog(val) {
  rtdb.ref('recite/chant/groups/' + this.currentChantGroup + '/results/').push().set(val)
  //db.collection("logs").doc(firebase.auth().currentUser.uid).collection("chant").doc('t'+val.start_time).push().set(val)
},
compressTimes(val) {
  let mymin = Math.min(...val)
  val.map(a=>(a-mymin)).push(mymin)
  return val.map(a => a.toString(36)).join()
},
deCompressTimes(val) {
  let myval = val.split(",").map(a => parseInt(a, 36))
  let mymin = myval[myval.lengh-1]
  myval.map(a=>(a+mymin)).pop()
  return myval
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
   },
   currentVerse: function() {

        if((this.currentVerse >= 1)){
        this.scrollLock = true
        let addOffset = this.$vuetify.breakpoint.width > 900 ? 8 : 0
        this.myTop = window.pageYOffset
        let el = document.getElementById('chant'+this.currentVerse);
        let style = window.getComputedStyle(el);
        let height = ['height', 'padding-top', 'padding-bottom', 'margin-top']
               .map((key) => parseInt(style.getPropertyValue(key), 10))
               .reduce((prev, cur) => prev + cur);
             console.log(height)
             console.log(this.myTop+height)
           this.$vuetify.goTo(this.myTop+(height+56+addOffset), {
           duration: 10,
           offset: 0,
           easing: 'easeOutQuint'
         })} else {
       }
     },
     scrollLock: function() {
      if(this.scrollLock){
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
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
    manageSession,
    settingsPopup,
    mediaRecorder
  }
}
</script>

<style lang="scss">
path.domain { fill: var(--mainColor); }
.tick text { fill: var(--mainColor); }
.c3-legend-item text { fill: var(--mainColor); }
.fixButtonPosition{
  position: absolute;
  bottom: var(--bottomOffset);
  right: 0px;
  .v-btn{
    width: var(--buttonWidth);
  }
}
.addActiveBorder{
  border: 0.5px solid var(--chantBorderColor);
}
.c3-chart-arcs-background{
  fill:#e0e0e0;
  stroke:none
}
.c3-shape {
    fill: none;
}
.shiftMiddle{
  margin-left: var(--screenWidth);
  opacity: 0.67;
  }
html {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
