<template>
<v-layout justify-center column :style="cssProps">

<v-subheader :dark="GET_dark"> Play audio </v-subheader>
<div class="center">
  <youtube :video-id="videoId" width="360" height="200" ref="youtube" :player-vars="playerVars"
  @playing="playing" @paused="paused()" @ended="verse_local=1" fitParent @ready="videoId=youtubeIDs['c'+chapter]"> </youtube>
<div class="makeBox" v-if="hideYoutubeBar"> </div>


</div>


  <v-subheader :dark="GET_dark"> Scroll to verse </v-subheader>

  <v-layout justify-space-between class="my-2 px-3" style="height: 36px">
    <v-slider v-model="verse_local" thumb-color="accentinfo" thumb-label="always" :thumb-size="18" :min="1"
    :max="verseall[chapter-1]" :step="1" :dark="GET_dark"></v-slider>
  </v-layout>


<v-subheader :dark="GET_dark"> You are listening to </v-subheader>



<div class="black pb-5">
      <v-card class="black" :dark="GET_dark" :min-height="Math.min($vuetify.breakpoint.height, Math.min($vuetify.breakpoint.width, 500))" id="listenCard">


<v-flex>
        <div class="overflowHidden">
          <v-img :src="imagePath(verse-1)" lazy-src="/static/img/chapter_preview/previewchapter6.jpeg" gradient="to top,
          rgba(0,0,0,.44), rgba(0,0,0,.44)" :max-height="$vuetify.breakpoint.height" id="myImageContainer" v-if="imageON">
          </v-img>
          <!-- :style="cssImage" -->
          </div>
          <!-- <v-layout justify-center row class="mt-4" :class="myTextSize"> -->
            <v-layout justify-center row  :class="myTextSize">
            <v-flex v-if="classObject!=='end'" id="verseBlock" class="tieWithImage mt-3">
<div align="center" v-if="verse===1">
              <div align="center" class="mytext myspan mb-2" :class="{active: this.classObject==='start'}"> {{convert_dev(preview[parseInt(chapter)-1].start)}} </div>
              <v-btn v-if="isLabeling" v-on:click="saveSoundPos('start')"> Start</v-btn>
              </div>
            <div align="center">
              <!-- <span class="px-3" :class="{active: ${this.classObject==-1}}"> {{convert(GET_main.speaker)}} </span> -->
              <v-btn v-if="isLabeling" v-on:click="saveSoundPos('speaker')"> Uvach</v-btn>
              <div align="left" class="px-3 pb-1 ml-3 mytext myspan" :class="{active: this.classObject==='speaker'}">  {{convert(GET_main.speaker)}} </div>
            </div>

              <div align="left">
                <span align="left" class="px-3 py-1 ml-2 mytext myspan" v-for="(item,i) in GET_main.foot" :class="[{active: classObject===`foot${i+1}`}, `accent${i+1}--text`]">
        <span class="bigger">{{convert(item.foot)}}</span>
                  {{footBreaks[i]}}
                <v-btn v-if="i===activeFoot & isLabeling" v-on:click="saveSoundPos(`foot${i+1}`)" :class="`accent${i+1}`"> foot{{i+1}}</v-btn>
        </br>
      </span>
            </div>
          </v-flex>
          <v-flex class="shiftUp" v-if="classObject!=='end'" :class="myTextSizeTranslation" id="translationBlock">
            <bhavarthCard class="myspanAlways" :verse_id="verse" headingHide showVerseIndex :noLineHeightAdjust="$vuetify.breakpoint.width < 450 ? true : false"></bhavarthCard>
          </v-flex>
          <!-- <v-layout justify-center class="py-2 mytext ml-1 subheading" v-if="parseInt(verse)===verseall[parseInt(chapter)-1]"> -->
          <v-layout justify-center class="pa-5 mytext myspanAlways tieWithImage" v-if="classObject==='end'">
          <span class="px-3 mytext" :class="{active: this.classObject==='end'}"> {{convert_dev(preview[chapter-1].end)}} </span>
          <v-btn v-if="isLabeling & !isLabelingFinished" v-on:click="saveSoundPos('end')"> End</v-btn>
        </v-layout>
          </v-layout>
        <!-- </div> -->
      </v-flex>

      <v-layout row justify-space-between class="shiftMiddle" v-if="!playON">
        <v-btn fab small light  @click="decrement()" class="ma-0 pa-0"> <v-icon  large> keyboard_arrow_left  </v-icon> </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab small light @click="increment()" class="ma-0 pa-0"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn>
      </v-layout>

      <v-fab-transition>
        <v-layout shiftTop v-if="!playON">
          <v-switch v-model="imageON"></v-switch>
        </v-layout>
      </v-fab-transition>
      </v-card>
      <!-- <br><br><br><br> -->
    </div>
    <v-fab-transition>
              <v-btn color="rgba(192,192,192, 0.7)" dark fab left bottom fixed :class="{'mb-5':showNav}"
              v-on:click.stop="$refs.youtube.player.playVideo()" small v-if="!playON">
              <v-icon > play_arrow</v-icon>
          </v-btn>
          <v-btn color="rgba(192,192,192, 0.7)" dark fab left bottom fixed :class="{'mb-5':showNav}"
          v-on:click.stop="$refs.youtube.player.pauseVideo()" small v-else>
          <v-progress-circular :value="playONLoaderValue">
          <v-icon > pause</v-icon>
        </v-progress-circular>
      </v-btn>
    </v-fab-transition>
</v-layout>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  mapMutations
} from 'vuex';
import {
  mapGetters
} from 'vuex';
import {
  mapState
} from 'vuex';
import Sanscript from 'Sanscript';
import anime from 'animejs';
import settingspopup from '../settings/settings-popup.vue'
import bhavarthCard from '../read/subcomponents/bhavarth-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
export default {
  data: () => ({
    footBreaks: ["", "|", "", "||", "", "|"],
    imageON: true,
    chapterDone: [1, 12],
    isLabeling: false,
    isLabelingFinished: false,
    myTracker: null,
    myTrackerValue: null,
    myTrackerValueOld: null,
    activeFoot: 0,
    myIndex: 0,
    myYoutubeTracker: null,
    hideYoutubeBar: false,
    myAnn: {
      time: [0],
      verse: [],
      label: []
    },
    videoId: "VrGkaCEJ2qk",
    myTrackerON: 0,
    playerVars: {
        autoplay: 0,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1
      },
      playONLoaderValue: 0,
      playON: false
  }),
  watch: {
    chapter: function() {
       clearInterval(this.myYoutubeTracker)
       this.myTrackerON = 0
       this.videoId = this.youtubeIDs['c'+this.chapter]
    },
    activeTab: function(){
      if(!(this.activeTab==='chant' | this.activeTab==="listen")) {
        console.log(this.activeTab)
        this.$refs.youtube.player.pauseVideo()
        this.paused()
      }
      if(this.activeTab==="listen") {
        this.SET_theme('dark')
      }
    },
    verse_local: function(){
  //     anime({
  //   targets: '#myImageContainer',
  //   scale: [1, 1.1],
  //   easing: 'easeInOutSine',
  //   direction: 'alternative',
  //   loop: 2,
  //   delay: 1000,
  //   duration: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*1000
  // })
},
classObject: function(){
  if(this.classObject==="foot4") {
    this.playONLoaderValue += 25
    anime({
  targets: '#listenCard',
  // rotateY: [0, 45],
  direction: 'normal',
  opacity: [1, 0],
  scale: [1, 0],
  easing: 'linear',
  delay: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*800,
  duration: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*200
})
// anime({
// targets: '#myImageContainer',
// scale: [1.2, 1],
// easing: 'easeInOutSine',
// direction: 'normal',
// loop: 1,
// delay: 0,
// duration: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*1000
// })
  }
  if(this.classObject==="foot1") {
    this.playONLoaderValue = 25
    anime({
  targets: '#listenCard',
  // rotateY: [0, 45],
  direction: 'normal',
  opacity: [0, 1],
  scale: [0, 1],
  easing: 'linear',
  delay: 0,
  duration: (this.myAnn.time[this.myIndex] - this.myAnn.time[this.myIndex - 1])*200
})
// anime({
// targets: '#myImageContainer',
// translateX: -30,
// easing: 'linear',
// direction: 'alternate',
// loop: 2,
// delay: 0,
// duration: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*500
// })
  }
  if(this.classObject==="foot3") {
    this.playONLoaderValue += 25
    // anime({
    // targets: '#myImageContainer',
    // translateX: 30,
    // easing: 'easeInOutSine',
    // direction: 'alternate',
    // loop: 2,
    // delay: 0,
    // duration: (this.myAnn.time[this.myIndex + 1] - this.myAnn.time[this.myIndex])*500
    // })
  }
  if(this.classObject==="end") {
    anime({
  targets: '#listenCard',
  opacity: [0, 1],
  scale: [0, 1],
  easing: 'easeInQuart',
  duration: 1000
})
  }
if(this.classObject==="foot2") {
  this.playONLoaderValue += 25
  anime({
targets: '#myImageContainer',
scale: [1, 1.08],
easing: 'easeInOutSine',
direction: 'alternate',
loop: 2,
delay: 0,
duration: (this.myAnn.time[this.myIndex + 2] - this.myAnn.time[this.myIndex])*500
})
}
}
  },
  mounted() {
    //do something after mounting vue instance
    // Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
// Checks if should display install popup notification:
if (isIos() && isInStandaloneMode()) {
  this.hideYoutubeBar = true;
}

},
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['main', 'preview', 'youtubeIDs']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall', 'verse', 'activeTab', 'mainItem', 'showNav']),
    ...mapGetters('coretext', ['GET_main']),
    ...mapGetters('settings', ['GET_dark']),
    verse_local: {
      get() {
        return this.$store.state.parameters.verse
      },
      set(value) {
        this.SET_verse(value)
        this.myIndex = this.myAnn.verse.findIndex(v => v===this.verse_local)
        this.myTrackerValue = this.myAnn.time[this.myIndex]
        this.advance()
      }
    },
    cssImage() {
      return {
            animation: 'move 20s ease infinite'
      }
    },
    cssProps() {
      return {
        '--mytranslationWidth': this.$vuetify.breakpoint.width < 700 ? '90%' : '60%',
        '--mylineHeight': this.$vuetify.breakpoint.width < 450 ? '0.8em' : '1.3em',
        '--myWidth': Math.min(this.$vuetify.breakpoint.width, 900) + 'px'
      }
    },
    myTextSize(){
      let mysize = "body-1"
      if(this.$vuetify.breakpoint.width > 635) {
        mysize = "title"
      }
      if(this.$vuetify.breakpoint.width > 900) {
        mysize = "headline"
      }
      return mysize
    },
    myTextSizeTranslation(){
      let mysize = "body-1"
      if(this.$vuetify.breakpoint.width > 635) {
        mysize = "title"
      }
      if(this.$vuetify.breakpoint.width > 900) {
        mysize = "headline"
      }
      return mysize
    },
    classObject: function() {
      if (!this.isLabeling) {
        if (this.myTrackerValue > this.myAnn.time[this.myIndex + 1]) {
          this.myIndex = this.myIndex + 1
          this.SET_verse(this.myAnn.verse[this.myIndex])
          this.myTrackerValueOld = this.myTrackerValue
        } else {
          if(this.myTrackerValue < this.myTrackerValueOld){
          this.myIndex = this.myAnn.time.findIndex(v => v===this.myTrackerValue)
          this.SET_verse(this.myAnn.verse[this.myIndex])
        }
        }
        return this.myAnn.label[this.myIndex]
      } else {
        return "start"
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement', 'SET_chapter', 'SET_verse', 'SET_theme']),
    ...mapMutations('coretext', ['SET_main_foot']),
    imagePath(myix) {
      return "/static/img/chapter_" + this.chapter + "_500px/"+ (myix+1) + ".jpeg"
    },
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    convert_dev(myinput) {
      return Sanscript.t(myinput, 'devanagari', this.script);
    },
    range(start, end) {
      var foo = [];
      for (var i = start; i <= end; i++) {
        foo.push(i);
      }
      return foo;
    },
    saveSoundPos: function(myval) {
      console.log(myval)
      this.myAnn.time.push(this.mySound.seek())
      this.myAnn.verse.push(this.verse)
      this.myAnn.label.push(myval)
      if (myval.includes("foot")) {
        this.activeFoot = this.activeFoot + 1
      }
      if (this.chapter === 1) {
        if (this.verse === 20 | this.verse == 26) {
          if (myval === "foot6") {
            this.activeFoot = 0
            this.myAdd()
          }
        } else if (this.verse === 21 | this.verse == 28) {
          if (myval === "foot2") {
            this.activeFoot = 0
            this.myAdd()
          }
        } else {
          if (myval === "foot4") {
            console.log('i m in foot4')
            this.activeFoot = 0
            this.myAdd()
          }
        }
      } else {
        if (myval === "foot4") {
          console.log('i m in foot4')
          this.activeFoot = 0
          this.myAdd()
        }
      }
      if (myval.includes("end")) {
        this.myAnn.time.push(this.mySound.duration() - 20)
        this.myAnn.verse.push(this.verse)
        this.myAnn.label.push("finished")
        this.myAnn.time.push(this.mySound.duration())
        this.myAnn.verse.push(this.verse)
        this.myAnn.label.push("finished")
        this.addLabels()
        this.isLabelingFinished = true
      }
    },
    addLabels() {
      var db = firebase.firestore();
      db.collection("mylabels").doc("c" + this.chapter).set(this.myAnn)
    },
    myAdd(i) {
      if (this.verse < this.verseall[this.chapter - 1]) {
        this.verse_local = this.verse_local + 1
        this.addLabels()
      }
    },
    playing() {
      console.log("in playing")
      this.playON = true
      if(this.myTrackerON===0) {
      if (this.sanskritLabels['c' + this.chapter]) {
        this.myAnn = Object.assign({}, this.sanskritLabels['c' + this.chapter])
      }
      this.myYoutubeTracker = setInterval(this.myYoutubeTime, 50);
      this.myTrackerON = 1
      this.verse_local = this.verse
      this.$refs.youtube.player.unMute()
      this.advance()
    } else {
      this.myYoutubeTracker = setInterval(this.myYoutubeTime, 50);
    }
    },
    paused() {
      // this.myTrackerON = 0
      clearInterval(this.myYoutubeTracker)
      this.playON = false
    },
    advance() {
      this.$refs.youtube.player.seekTo(this.myTrackerValue, true);
      // console.log("in advance")
    },
    myYoutubeTime() {
      self = this
      if(this.$refs.youtube){
      this.$refs.youtube.player.getCurrentTime().then(
        function(result) {
          self.myTrackerValue = result
          // console.log('inMyYT')
        }, function(err) {
        }
      )
    } else {
      this.paused()
    }
    }
  },
  components: {
    'settings-popup': settingspopup,
    bhavarthCard,
    uvachCard
  }
}
</script>

<style scoped>
.myspan {
  line-height: var(--mylineHeight);
}
.myspanAlways {
  line-height: 1.5em;
}
.mytext {
  /* transition: font-size 0.3s ease-in-out; */
}

.bigger {
  font-size: 100%;
  opacity: 1;
}
.active {
  font-size: 1em;
  border-left: 2.5px solid rgba(256, 10, 10, 0.7);
  transition: border-left .5s ease-in-out;
}
.makeBox{
  position: absolute;
  background-color: black;
  width: 100%;
  height: 50px;
  top: 75px;
  left: 0;
}
div.v-input__control {
  height: 0px;
}
@keyframes move {
  from {
    transform: scale(1.0);
  }
  to {
    transform: scale(1.2);
  }
}
.overflowHidden{
  overflow: hidden;
}
.shiftRight{
  margin-right: -5px;
}
.shiftUp{
  position: absolute;
  max-width: var(--mytranslationWidth);
  bottom: 0;
  right: 0;
}
.shiftMiddle{
  position: absolute;
  width: var(--myWidth);
  top: 50%;
  left: 0;
}
.shiftTop{
  position: absolute;
  top: 0;
  right: 0;
}
.tieWithImage{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
