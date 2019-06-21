<template>
<v-layout justify-center column text-xs-center>

<div class="font-weight-light mt-2 pa-1 subheading"> Learn Sanskrit</div>
  <v-divider :dark="GET_dark"></v-divider>

  <v-layout column align-center>
    <v-layout column>
<v-layout row>
    <v-flex xs3>
      <v-layout column>
<v-flex  class="info mx-1">
        Vowels
      </v-flex>
      <v-layout row>
      <v-flex  class="success mx-1">
              short
            </v-flex>
            <v-flex  class="success mx-1">
                    short
                  </v-flex>
                  </v-layout>
            </v-layout>
    </v-flex>
    <v-flex xs9 class="info mx-1">
      Consonants
    </v-flex>
    </v-layout>
    <v-layout row v-for="myType in myTypes">
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item[myType]" shrink>
  <v-btn round icon dark class="ma-0 pa-0 subheading">{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    </v-layout>
  </v-layout>

    <!-- <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.palatal">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.retroflex">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.dental">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.labial">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.palatovelar">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.labiovelar">
  <v-btn>{{item.letter}}</v-btn>
    </v-flex>
    </v-layout>
  </v-layout> -->

  <!-- <v-layout column>
  <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.dirgha">
  {{item.letter}}
  </v-flex>
  </v-layout>
    <v-layout row>
      <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.svara">
    {{item.letter}}
      </v-flex>
    </v-layout> -->


  </v-flex>
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
</style>
