<template>
<v-layout justify-center column class="myspan">

  <v-divider :dark="GET_dark"></v-divider>
  <v-layout justify-space-between class="mt-2 px-3" style="height: 36px">
    <v-slider v-model="verse" thumb-color="accentinfo" thumb-label="always" :thumb-size="18" :min="1"
    :max="verseall[chapter-1]" :step="1" :dark="GET_dark"></v-slider>
  </v-layout>
  <v-layout justify-space-between class="ma-0 pa-0" style="height: 36px">
    <div class="ma-0 pa-0">
      <v-btn :style="options[theme].emphasis.high" flat icon @click="skipPrevious()">
        <v-icon> skip_previous </v-icon>
      </v-btn>
      <v-btn :style="options[theme].emphasis.high" flat icon @click="skipNext()">
        <v-icon> skip_next </v-icon>
      </v-btn>
      <v-btn :style="options[theme].emphasis.high" flat icon @click="volumeMute =!volumeMute">
        <v-icon> {{ volumeMute ? 'volume_off' : 'volume_mute' }} </v-icon>
      </v-btn>
      <v-btn :style="options[theme].emphasis.high" flat icon @click="playRateOn=!playRateOn">
        <v-icon>slow_motion_video</v-icon>
      </v-btn>
      <span :style="options[theme].emphasis.high" v-if="isPlaying" class="caption">
        <span> {{myTrackerValue_formatted}} </span> <span> / </span> <span> {{myDuration_formatted}} </span>
      </span>
      <v-btn v-if="true" flat icon @click="isLabeling ? isLabeling=!isLabeling : isLabeling=!isLabeling" :style="options[theme].emphasis.high">
        <v-icon>
          {{ isLabeling ? 'label' : 'label_off' }}
        </v-icon>
      </v-btn>

    </div>
    <v-btn color="button" fab small @click="isPlaying ? pauseSoundFull() : playSoundFull()">
      <v-icon>
        {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
      </v-icon>
    </v-btn>
  </v-layout>

  <v-divider :dark="GET_dark"></v-divider>
  <v-expand-transition>
    <div v-if="playRateOn" :dark="GET_dark" class="elevation-5">
      <v-radio-group v-model="playRate" row :dark="GET_dark">
        <strong>speed: </strong>
        <v-radio v-for="(item, i) in playRateLabels" v-bind:label="item" v-bind:value="item" :key="item + '_key'" class="caption"></v-radio>
      </v-radio-group>
    </div>
  </v-expand-transition>

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

    <v-layout row align-center justify-center>
      <div align="left">
        <span v-for="(item,i) in GET_main.foot" :class="`accent${i+1}--text`">
    <span class="px-3 mytext" :class="{active: classObject===`foot${i+1}`}"> {{convert(item.foot)}} {{footBreaks[i]}}
    <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption">
    {{chapter}}|{{verse}}
    </span>
        <v-btn v-if="i===activeFoot & isLabeling" v-on:click="saveSoundPos(`foot${i+1}`)" :class="`accent${i+1}`"> foot{{i+1}}</v-btn>
        <br/> </span>
        </span>
      </div>
    </v-layout>

    <v-layout justify-center v-if="parseInt(verse)===verseall[parseInt(chapter)-1]">
      <span class="px-3 mytext" :class="{active: this.classObject==='end'}"> {{convert_dev(preview[chapter-1].end)}} </span>
      <v-btn v-if="isLabeling & !isLabelingFinished" v-on:click="saveSoundPos('end')"> End</v-btn>
    </v-layout>
    <!-- loadedlabels: {{myAnn}} </br>
loadedlabels: {{sanskritLabels['c'+chapter]}} </br> -->
    <div v-if="isLabeling">

      labeling: {{isLabeling}} </br>
      time: {{myTrackerValue}} </br>
      index: {{myIndex}} </br>
      myTracker: {{myTracker}} </br>
      ann_time: {{myAnn.time}} </br>
      ann_labl: {{myAnn.label}} </br>
      ann_vers: {{myAnn.verse}} </br>
      verse: {{verse}} </br>
      rate: {{playRate}} </br>
      rate Num: {{playRateNum}}
    </div>
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
import settingspopup from '../../../settings/settings-popup.vue'
import {
  Howl,
  Howler
} from 'howler';
export default {
  data: () => ({
    footBreaks: ["", "|", "", "||", "", "|"],
    chapterDone: [1, 12],
    volumeMute: false,
    playRate: "normal",
    playRateValues: [0.9, 1, 1.1, 1.2],
    playRateLabels: ["slow", "normal", "fast", "blaze"],
    playRateOn: false,
    isPlaying: false,
    isLoaded: false,
    isLabeling: false,
    isLabelingFinished: false,
    mySound: null,
    myTracker: null,
    myTrackerValue: null,
    activeFoot: 0,
    myIndex: 0,
    myAnn: {
      time: [0],
      verse: [],
      label: []
    }
  }),
  watch: {
    playRateNum: function() {
      if (this.mySound) this.mySound.rate(this.playRateNum)
    },
    volumeMute: function() {
      if (this.mySound) this.mySound.mute(this.volumeMute)
    }
  },
  computed: {
    myTrackerValue_formatted()  {
    if(this.myTrackerValue>0) {
      var secs = this.myTrackerValue
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
      } else {
        return "0:00"
      }
    },
    myDuration_formatted()  {
    if(this.mySound.duration()>=0) {
      var secs = this.mySound.duration()
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
      } else {
        return "0:00"
      }
    },
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['main', 'preview']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall']),
    ...mapGetters('coretext', ['GET_main']),
    ...mapGetters('settings', ['GET_dark']),
    verse: {
      get() {
        return this.$store.state.parameters.verse
      },
      set(value) {
        this.SET_verse(value)
        this.myIndex = this.myAnn.verse.findIndex(v => v===this.verse)
        this.myTrackerValue = this.myAnn.time[this.myIndex]
        if(this.isLoaded) this.mySound.seek(this.myTrackerValue)
      }
    },
    playRateNum() {
      return this.playRateValues[this.playRateLabels.findIndex(a => a === this.playRate)]
    },
    classObject: function() {
      if (!this.isLabeling) {
        if (this.myTrackerValue > this.myAnn.time[this.myIndex + 1]) {
          this.myIndex = this.myIndex + 1
          this.SET_verse(this.myAnn.verse[this.myIndex])
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
    stopSoundFull: function() {
      if (this.mySound !== null) this.mySound.stop()
      clearInterval(this.myTracker)
      this.isPlaying = false
      this.myTrackerValue = 0
      this.myIndex = 0
    },
    pauseSoundFull: function() {
      this.mySound.pause()
      clearInterval(this.myTracker)
      this.isPlaying = false
    },
    playSoundFull: function() {
      if (this.sanskritLabels['c' + this.chapter]) {
        this.myAnn = Object.assign({}, this.sanskritLabels['c' + this.chapter])
      }
      self = this
      if (this.mySound == null) {
        let mylink = 'https://gitawebapp.firebaseapp.com/static/assets/audio/full/gita' + this.chapter + '.mp3';
        this.mySound = new Howl({
          src: [mylink],
          rate: this.playRateNum,
          onload: function() {
            self.myTracker = setInterval(myTimer, 1000)

            function myTimer() {
              self.myTrackerValue = self.mySound.seek()
            }
            self.isPlaying = true
            self.isLoaded = true
          },
          autoplay: true
        });
      } else {
        this.mySound.play()
        this.myTracker = setInterval(myTimer, 1000)

        function myTimer() {
          self.myTrackerValue = self.mySound.seek()
        }
        this.isPlaying = true
      }
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
        this.stopSoundFull()
      }
    },
    addLabels() {
      var db = firebase.firestore();
      // db.collection("wordIndex").add({
      //     chapter: this.chapter,
      //     verse: this.verse,
      //     i: val
      //   })
      db.collection("mylabels").doc("c" + this.chapter).set(this.myAnn)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch(function(error) {
      //     console.error("Error adding document: ", error);
      //   });
    },
    myAdd(i) {
      if (this.verse < this.verseall[this.chapter - 1]) {
        this.verse = this.verse + 1
        this.addLabels()
      }
    },
    skipPrevious() {
      if (this.verse > 1) {
        this.verse = 1
        this.stopSoundFull()
        this.playSoundFull()
      } else {
        this.decrement()
        this.verse = 1
        this.stopSoundFull()
        this.mySound.unload()
        this.mySound = null
        this.playSoundFull()
      }
    },
    skipNext() {
      if (this.chapter === this.verseall.length) {
        this.SET_chapter(1)
        this.stopSoundFull()
        this.mySound.unload()
        this.mySound = null
        this.playSoundFull()
      } else {
        this.SET_chapter(this.chapter + 1)
        this.stopSoundFull()
        this.mySound.unload()
        this.mySound = null
        this.playSoundFull()
      }
    }
  },
  components: {
    'settings-popup': settingspopup
  }
}
</script>

<style scoped>
.myspan {
  line-height: 2.5em;
}

.mytext {
  transition: font-size 0.3s ease-in-out;
}

.active {
  font-size: 1.5rem;
  border-left: 4px solid rgba(256, 10, 10, 0.7);
}

div.v-input__control {
  height: 0px;
}
</style>
