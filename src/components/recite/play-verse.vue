<template>
<v-layout justify-center column>

<v-subheader :dark="GET_dark"> Play audio </v-subheader>
<div class="center">
  <youtube :video-id="videoId" width="360" height="200" ref="youtube" :player-vars="playerVars"
  @playing="playing" @ended="verse_local=1" fitParent> </youtube>
<div class="makeBox" v-if="hideYoutubeBar"> </div>
  <!-- <youtube :video-id="videoId" :player-width="$vuetify.breakpoint.width" :player-height="360"></youtube> -->

</div>


  <v-subheader :dark="GET_dark"> Scroll to verse </v-subheader>

  <v-layout justify-space-between class="my-2 px-3" style="height: 36px">
    <v-slider v-model="verse_local" thumb-color="accentinfo" thumb-label="always" :thumb-size="18" :min="1"
    :max="verseall[chapter-1]" :step="1" :dark="GET_dark"></v-slider>
  </v-layout>


<v-subheader :dark="GET_dark"> You are listening to </v-subheader>

  <v-layout justify-center column class="mt-4">
    <v-layout justify-center v-if="verse===1">
      <span class="px-3 mytext" :class="{active: this.classObject==='start'}"> {{convert_dev(preview[parseInt(chapter)-1].start)}} </span>
      <v-btn v-if="isLabeling" v-on:click="saveSoundPos('start')"> Start</v-btn>
    </v-layout>
    <v-layout justify-center>
      <!-- <span class="px-3" :class="{active: ${this.classObject==-1}}"> {{convert(GET_main.speaker)}} </span> -->
      <v-btn v-if="isLabeling" v-on:click="saveSoundPos('speaker')"> Uvach</v-btn>
      <span class="px-3 mytext" :class="{active: this.classObject==='speaker'}"> {{convert(GET_main.speaker)}} </span>

    </v-layout>

      <div align="center">
        <div align="left" class="px-3 py-1 ml-4 mytext" v-for="(item,i) in GET_main.foot" :class="[{active: classObject===`foot${i+1}`}, `accent${i+1}--text`]">
<span class="bigger">{{convert(item.foot)}}</span>
          {{footBreaks[i]}}
          <!-- <br/> -->
          <!-- <span v-for="(item1,i1) in GET_main.word_info.filter(a => a.foot == (i + 1))" v-on:click="playSound(item.sanskrit)">
            {{convert(item1.sanskrit)}}
            </span>
        {{footBreaks[i]}}
        <span v-if="i==6" :style="options[theme].emphasis.medium" class="caption">
        {{chapter}}|{{verse}}
        </span> -->
        <v-btn v-if="i===activeFoot & isLabeling" v-on:click="saveSoundPos(`foot${i+1}`)" :class="`accent${i+1}`"> foot{{i+1}}</v-btn>
</br>
      </div>
    </div>

    <v-layout justify-center class="py-2 mytext ml-1" v-if="parseInt(verse)===verseall[parseInt(chapter)-1]">
      <span class="px-3 mytext" :class="{active: this.classObject==='end'}"> {{convert_dev(preview[chapter-1].end)}} </span>
      <v-btn v-if="isLabeling & !isLabelingFinished" v-on:click="saveSoundPos('end')"> End</v-btn>
    </v-layout>
  </v-layout>
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
import settingspopup from '../settings/settings-popup.vue'
// import {
//   Howl,
//   Howler
// } from 'howler';
export default {
  data: () => ({
    footBreaks: ["", "|", "", "||", "", "|"],
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
    videoId: "vBEGfWWWXPQ",
    myTrackerON: 0,
    playerVars: {
        autoplay: 0,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1
      }
  }),
  watch: {
    chapter: function() {
      if(this.chapter == 2) this.videoId = "vBEGfWWWXPQ"
      if(this.chapter == 3) this.videoId = "vBEGfWWWXPQ"
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
    ...mapState('coretext', ['main', 'preview']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall', 'verse']),
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
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement', 'SET_chapter', 'SET_verse']),
    ...mapMutations('coretext', ['SET_main_foot']),
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
      if(this.myTrackerON===0) {
      if (this.sanskritLabels['c' + this.chapter]) {
        this.myAnn = Object.assign({}, this.sanskritLabels['c' + this.chapter])
      }
      this.myYoutubeTracker = setInterval(this.myYoutubeTime, 50);
      this.myTrackerON = 1
      this.verse_local = this.verse
      this.advance()
    }
    },
    paused() {
      clearInterval(this.myYoutubeTracker)
      this.myTrackerON = 0
    },
    advance() {
      this.$refs.youtube.player.seekTo(this.myTrackerValue, true);
      console.log("in advance")
    },
    myYoutubeTime() {
      self = this
      this.$refs.youtube.player.getCurrentTime().then(
        function(result) {
          self.myTrackerValue = result
        }, function(err) {
        }
      )
    }
  },
  components: {
    'settings-popup': settingspopup
  }
}
</script>

<style scoped>
.myspan {
  line-height: 1.5em;
}

.mytext {
  transition: font-size 0.3s ease-in-out;
}

.bigger {
  font-size: 110%;
  opacity: 0.6;
}
.active {
  font-size: 1em;
  border-left: 2px solid rgba(256, 10, 10, 0.7);
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
</style>
