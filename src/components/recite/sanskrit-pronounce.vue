<template>
<v-layout justify-center column text-xs-center :style="cssProps">

  <!-- <div class="font-weight-light mt-2 pa-1 subheading"> Learn Sanskrit</div>
  <v-divider :dark="GET_dark"></v-divider>
   -->
   <v-subheader :dark="GET_dark"> Learn Sanskrit Alphabet </v-subheader>
  <fullscreen ref="fullscreen" @change="fullscreenChange" class="background">

    <div class="grid-container">
      <!-- <div class="grid-item0"> -->
        <!-- <v-layout column class="ma-0 pa-0"> -->
        <v-btn @click="toggle" color="accentmain"  dark fab bottom right fixed class="mb-5 shiftRight">
        <v-icon v-if="fullscreen">fullscreen_exit</v-icon>
        <v-icon v-else>fullscreen</v-icon>
        </v-btn>

        <v-btn @click="oneScript=!oneScript" color="accentinfo"  dark fab bottom right fixed class="shiftUp shiftRight">
          <v-icon v-if="oneScript">add_circle_outline</v-icon>
          <v-icon v-else>remove_circle_outline</v-icon>
        </v-btn>
      <!-- </v-layout> -->
      <!-- </div> -->
      <div class="grid-item1">
        <v-layout column justify-space-between fill-height>
          <v-flex v-for="myType in myTypes" :key="myType" class="ma-0 pa-0">
            <v-btn round icon :dark="GET_dark" class="mr-3 ma-0 pa-0 text-none makeLabelSize">
              {{myType}}
            </v-btn>
          </v-flex>
        </v-layout>
      </div>



      <div class="grid-item2 secondary">
        <v-layout row >
          <v-flex grow xs3>
            <v-layout column fill-height>
              <v-flex>
                <v-card dark class="ma-1 accentmain disabled" flat tile> Vowels </v-card>
              </v-flex>
              <v-layout row fill-height>
                <v-flex  xs5 class="ma-1 success">
                  Short
                </v-flex>
                <v-flex xs8 class="ma-1 error">
                  Long
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-flex grow xs9 >
            <v-layout column>
              <v-flex  v-ripple>
                <v-card  dark class="ma-1  accentmain" raised> Consonants </v-card>
              </v-flex>

              <v-layout row>
                <v-flex  xs8 class="ma-1 success">
                  Stop
                </v-flex>
                <v-flex xs2 class="ma-1 error">
                  Nasal
                </v-flex>
                <!-- <v-flex xs2 class="warning" v-html="'Semi<br>vowel'"> -->
                <v-flex xs2 class="warning">
                  Semi-vowel
                </v-flex>
                <v-flex xs4 class="ma-1 info">
                  Sibilant
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex  xs4 class="ma-1 success">
                  Unvoiced
                </v-flex>
                <v-flex xs8 class="ma-1 error">
                  Voiced
                </v-flex>
                <!-- <v-flex xs2 class="warning" v-html="'Semi<br>vowel'"> -->
                <v-flex xs2 class=" ma-1 warning tinyFont">
<br>
                </v-flex>
                <v-flex xs2 class="ma-1 info tinyFont">
<br>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex  xs2 class="ma-1 success tinyFont">
<br>
                </v-flex>
                <v-flex xs2 class="ma-1 error tinyFont">
<br>
                </v-flex>
                <!-- <v-flex xs2 class="warning" v-html="'Semi<br>vowel'"> -->
                <v-flex xs2 class=" ma-1 warning tinyFont">
<br>
                </v-flex>
                <v-flex xs2 class="ma-1 info tinyFont">
<br>
                </v-flex>
                <v-flex xs4 class="ma-1 warning">
                  Unaspirated
                </v-flex>
                <v-flex xs4 class="ma-1 info">
                  Aspirated
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>

        </v-layout>
      </div>

<div class="grid-item3 background lighten-2">
    <v-layout column class="addBorder ma-0 pa-0">
        <v-layout row v-for="myType in myTypes" :key="myType">
        <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item[myType]" shrink class="ma-0 pa-0" :class="{fadeLetter:!hideLetter[i]}">
          <v-btn round icon :dark="GET_dark" class="ma-0 pa-0 title" :class="myFontSize" @click="playSound(item.letter)" v-if="oneScript">
            <span class="pa-0 ma-0" :ref="item.letter" :id="'alphabet_'+item.letter">{{item.letter}}</span>
          </v-btn>
      <v-btn round icon :dark="GET_dark" class="ma-0 pa-0" @click="playSound(item.letter)" :class="myFontSize" v-else>
        <span class="pa-0 ma-0 shrinkHeight">{{item.letter}} <br>
        <span class="pa-0 ma-0 text-none"  :class="myFontSizeSecond">{{convert_dev(item.letter)}}</span></span>
      </v-btn>
        </v-flex>
        </v-layout>
    </v-layout>
</div>
<!-- <v-btn @click="go()" color="accentmain"  dark> Go Anime </v-btn> -->
<!-- <input class="log update-log"> </input> -->

</div>
</fullscreen>

</v-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
import settingspopup from '../settings/settings-popup.vue'
import { translate, rotate, timelineTranslate } from './animate';

export default {
  data: () => ({
    myTypes: ["velar", "palatal", "retroflex", "dental", "labial", "palatovelar", "labiovelar", "nasalization", "discharge"],
    fullscreen: false,
    oneScript: true
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['main', 'preview', 'sanskritAlphabet']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall', 'verse', 'hideLetter']),
    ...mapGetters('coretext', ['GET_main']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      this.SET_hideLetter(0)
      return {
        '--myWidth':  this.computeMyWidth + 'px',
        '--myHeight': this.computeMyHeight + 'px',
        '--myLabelSize': this.computeMyLabelSize + 'px',
      }
    },
    computeMyWidth() {
      let mytemp = 28
      if(this.$vuetify.breakpoint.width > 500) mytemp = 40
      return  mytemp
    },
    computeMyHeight() {
      let mytemp = 28
      if(this.$vuetify.breakpoint.width > 500) mytemp = 38
      return  mytemp
    },
    computeMyLabelSize() {
      let mytemp = 8
      if(this.$vuetify.breakpoint.width > 500) mytemp = 12
      return  mytemp
    },
    myFontSize() {
      let mytemp = "caption"
      if(this.$vuetify.breakpoint.width > 500) {
        if(this.oneScript) {
          mytemp = "title"
        } else mytemp = "body-2"
      }
      return mytemp
    },
    myFontSizeSecond() {
      let mytemp = "caption"
      if(this.$vuetify.breakpoint.width > 500) {
        mytemp = "subheading"
      }
      return mytemp
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement', 'SET_chapter', 'SET_verse', 'SET_hideLetter']),
    ...mapMutations('coretext', ['SET_main_foot']),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    convert_dev(myinput) {
      return Sanscript.t(myinput, 'devanagari', this.script);
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
    playSound: function(melody) {
      var snd = new Audio();
      snd.src = '/static/assets/audio/mp3_alphabet/' + melody + '.mp3';
      snd.play()
    },
    toggle () {
       this.$refs['fullscreen'].toggle() // recommended
       // this.fullscreen = !this.fullscreen // deprecated
     },
     fullscreenChange (fullscreen) {
       this.fullscreen = fullscreen
     },
     go() {
      //console.log(this.$refs)
      //translate(this.$refs["अ"], this.computeMyWidth);
      //translate(this.$refs["आ"], -this.computeMyWidth);

      // rotate([this.$refs["अ"], this.$refs["आ"]]);
      timelineTranslate([this.$refs["अ"], this.$refs["आ"]]);
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
.tinyFont {
  font-size: 70%
}
.active {
  font-size: 1em;
  border-left: 2px solid rgba(256, 10, 10, 0.7);
}
.activated {
  opacity: 1;
}
.disabled {
  opacity: 0.6;
}
.shrinkHeight {
  line-height: 1.1em;
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
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas:
    " buttonBar columnHeader"
    "rowHeader mainContent";
}
.grid-item0 {
  grid-area: buttonBar;
}
.grid-item1 {
  grid-area: rowHeader;
  align-self: stretch;
  text-align: left;
  justify-self: start;
  font-size: var(--myLabelSize);
}
.grid-item2 {
  grid-area: columnHeader;
  font-size: var(--myLabelSize);
  align-self: stretch;
}
.grid-item3 {
  grid-area: mainContent;
}
.makeLabelSize {
  font-size: var(--myLabelSize);
}
.addBorder {
  border: 2px solid black;
  border-radius: 5px;
}
.v-btn {
  width: var(--myWidth);
  height: var(--myHeight);
  /* width: 40px;
  height: 32px; */
}
div.btn__content {
  padding: 0;
}
.shiftUp{
  margin-bottom: 100px;
}
.shiftUpUp{
  margin-bottom: 150px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}
.shiftMiddle{
  margin-left: var(--screenWidth);
  opacity: 0.67;
  }
.fadeLetter{
  opacity: 0.3;
}
</style>
