<template>
<v-layout justify-center column class="myspan">
<v-card class="my-4">
            <v-btn
              class="button"
              depressed
              fab
              @click="isPlaying ? pauseSoundFull() : playSoundFull()"
            >
              <v-icon large>
                {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
              </v-icon>
            </v-btn>

            <v-btn
              class="button"
              depressed
              fab
              @click="isLoaded ? stopSoundFull() : nothing()"
            >
              <v-icon large>
                {{ isLoaded ? 'mdi-stop' : 'mdi-stop' }}
              </v-icon>
            </v-btn>

            <v-btn
              class="button"
              depressed
              fab
              @click="isLabeling ? isLabeling=!isLabeling : isLabeling=!isLabeling"
            >
              <v-icon large>
                {{ isLabeling ? 'label' : 'label_off' }}
              </v-icon>
            </v-btn>
        </v-card>

<v-layout justify-center column>
<v-layout justify-center v-if="parseInt(verse)===1">
<span class="px-3" :class="{active: this.classObject==='start'}"> {{convert(preview[parseInt(chapter)-1].start)}} </span>
<v-btn v-on:click="saveSoundPos('start')"> Start</v-btn>
  </v-layout>
<v-layout justify-center>
  <settings-popup></settings-popup>
  <!-- <span class="px-3" :class="{active: ${this.classObject==-1}}"> {{convert(GET_main.speaker)}} </span> -->
  <span class="px-3" :class="{active: this.classObject==='speaker'}"> {{convert(GET_main.speaker)}} </span>
  <v-btn v-on:click="saveSoundPos('speaker')"> Uvach</v-btn>
</v-layout>

  <v-layout row align-center justify-center>
<div  align="left">
<span v-for="(item,i) in GET_main.foot" :class="`accent${i+1}--text`">
    <span :class="{active: classObject===`foot${i+1}`}"> {{convert(item.foot)}} {{footBreaks[i]}}
    <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption">
    {{chapter}}|{{verse}}
    </span>
    <v-btn v-on:click="saveSoundPos(`foot${i+1}`)" :class="`accent${i+1}`"> foot{{i+1}}</v-btn>
    <br/> </span>
</span>
</div>
</v-layout>

<v-layout justify-center v-if="parseInt(verse)===verseall[parseInt(chapter)-1]">
<span class="px-3" :class="{active: this.classObject==-1}"> {{convert(preview[chapter].end)}} </span>
<v-btn v-on:click="saveSoundPos('end')"> End</v-btn>
  </v-layout>
labeling: {{isLabeling}} </br>
time: {{myTrackerValue}} </br>
ann_time: {{myAnn.time}} </br>
ann_labl: {{myAnn.label}} </br>
ann_vers: {{myAnn.verse}}
</v-layout>
</v-layout>


</template>

<script>
import {mapActions} from 'vuex';
import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';
import {mapState} from 'vuex';
import Sanscript from 'Sanscript';
import settingspopup from '../../../settings/settings-popup.vue'
import {Howl, Howler} from 'howler';
export default {
  data: () => ({
    footBreaks: ["", "|", "", "||", "", "|"],
    isPlaying: false,
    isLoaded: false,
    isLabeling: true,
    mySound: null,
    myTracker: null,
    myTrackerValue: null,
    myIndex: 0,
    myAnn: {
    time: [0],
    verse: [],
    label: []
  }
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['main', 'preview']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall']),
    ...mapGetters('coretext', [ 'GET_main']),
    classObject:  function () {
        /**
* Returns the closest smallest number from a sorted array.
**/
// function closest(arr, target) {
//     if (!(arr) || arr.length == 0)
//         return null;
//     if (arr.length == 1)
//         // return arr[0];
//         return 0;
//     for (var i=1; i<arr.length; i++) {
//         // As soon as a number bigger than target is found, return the previous index
//         if (arr[i] > target) return i-1
//     }
//     // No number in array is bigger so return the last.
//     return arr.length-1;
// }
// if ( this.myAnn.mytime.length > 0) return this.myAnn.myfoot[closest(this.myAnn.mytime, this.myTrackerValue)]

if(!this.isLabeling) {
if (this.myTrackerValue > this.myAnn.time[this.myIndex + 1]) {
  this.myIndex  = this.myIndex + 1
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
    convert(myinput){
          return Sanscript.t(myinput, 'iast', this.script);
        },
    range(start, end) {
      var foo = [];
      for (var i = start; i <= end; i++) {
        foo.push(i);
      }
      return foo;
    },
    stopSoundFull: function () {
      this.mySound.stop()
      clearInterval(this.myTracker)
      this.isPlaying = false
      this.isLoaded = false
      this.myTrackerValue = 0
      this.myIndex = 0
    },
    pauseSoundFull: function () {
      this.mySound.pause()
      clearInterval(this.myTracker)
      this.isPlaying = false
    },
    playSoundFull: function () {
      self = this
      this.isLoaded = true
      if(this.mySound == null) {
         let mylink = 'https://gitawebapp.firebaseapp.com/static/assets/audio/full/gita' + this.chapter + '.mp3';
         this.mySound = new Howl({
  src: [mylink],
  onload: function()  {
    self.myTracker = setInterval(myTimer, 1000)
    function myTimer() {
      self.myTrackerValue = self.mySound.seek()
    }
    self.isPlaying = true
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
    saveSoundPos: function (myval) {
      this.myAnn.time.push(this.mySound.seek())
      this.myAnn.verse.push(this.verse)
      this.myAnn.label.push(myval)
      if(myval==="foot4") this.myAdd()
    },
    addLabels() {
      var db = firebase.firestore();
      // db.collection("wordIndex").add({
      //     chapter: this.chapter,
      //     verse: this.verse,
      //     i: val
      //   })
      db.collection("mylabels").doc("c"+this.chapter).set(this.myAnn)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch(function(error) {
      //     console.error("Error adding document: ", error);
      //   });
    },
    myAdd(i) {
      this.addLabels();
      this.increment()
    }
  },
  components: {
    'settings-popup': settingspopup
  }
}
</script>

<style scoped>
.myspan {
  line-height: 1.6em;
  /* font-family: "myfont"; */
}
.active {
  font-size: 1.3rem;
  border-left: 2px solid red;
}
</style>
