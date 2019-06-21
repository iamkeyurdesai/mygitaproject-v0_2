<template>
<v-layout justify-center column text-xs-center>

<div class="font-weight-light mt-2 pa-1 subheading"> Learn Sanskrit</div>
  <v-divider :dark="GET_dark"></v-divider>

<div class="grid-container">

<div class="grid-item1">
  <v-layout column justify-space-between fill-height>
    <v-flex v-for="myType in myTypes" :key="myType" class="rotate1 ma-0 pa-0" shrink>
<v-btn round icon dark class="mr-2 ma-0 pa-0 text-none caption"><span class="pa-0 ma-0" align="left">{{myType}}</span></v-btn>
    </v-flex>
  </v-layout>
</div>



<div class="grid-item2 body-1">
<v-layout row >
    <v-flex grow>
      <v-layout column>
<v-flex  xs4 class="warning">
        Vowels
      </v-flex>
      <v-layout row>
      <v-flex  xs5 class="success caption">
                      short
                    </v-flex>
            <v-flex xs8 class="error">
                    long
                  </v-flex>
                  </v-layout>
            </v-layout>
    </v-flex>
    <v-flex xs9 class="info">
      Consonants
    </v-flex>
    </v-layout>
</div>

<div class="grid-item3 background lighten-2">
    <v-layout column>
        <v-layout row v-for="myType in myTypes" :key="myType">
        <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item[myType]" shrink class="ma-0 pa-0">
      <v-btn round icon dark class="ma-0 pa-0 body-2" @click="playSound(item.letter)"><span class="pa-0 ma-0">{{item.letter}}</span></v-btn>
        </v-flex>
        </v-layout>
    </v-layout>
</div>

</div>


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
    myTypes: ["velar", "palatal", "retroflex", "dental", "labial", "labiovelar", "palatovelar"],
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
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['main', 'preview', 'sanskritAlphabet']),
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
    },
    playSound: function(melody) {
      var snd = new Audio();
      snd.src = '/static/assets/audio/mp3_alphabet/' + melody + '.mp3';
      snd.play()
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

div.v-input__control {
  height: 0px;
}
.rotate {
  transform: rotate(-90deg);
}

.grid-container {
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: auto;
  grid-template-areas:
    " .        columnHeader"
    "rowHeader mainContent";
}

.grid-item1 {
  grid-area: rowHeader;
  align-self: stretch;
  text-align: left;
}
.grid-item2 {
  grid-area: columnHeader;
}
.grid-item3 {
  grid-area: mainContent;
}
.v-btn {
  width: 28px;
  height: 28px;
}
div.btn__content {
  padding: 0;
}
</style>
