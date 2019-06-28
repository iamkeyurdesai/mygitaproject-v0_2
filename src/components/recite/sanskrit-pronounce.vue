<template>
<v-layout justify-center column text-xs-center :style="cssProps">

  <!-- <div class="font-weight-light mt-2 pa-1 subheading"> Learn Sanskrit</div>
  <v-divider :dark="GET_dark"></v-divider>
   -->
   <v-subheader :dark="GET_dark"> Learn Sanskrit Alphabet </v-subheader>

  <fullscreen ref="fullscreen" @change="fullscreenChange" class="background">

    <!-- <v-btn @click="toggle" color="accentmain"  dark fab bottom right fixed class="mb-5 shiftRight">
    <v-icon v-if="fullscreen">fullscreen_exit</v-icon>
    <v-icon v-else>fullscreen</v-icon>
    </v-btn>

    <v-btn @click="oneScript=!oneScript" color="accentinfo"  dark fab bottom right fixed class="shiftUp shiftRight">
      <v-icon v-if="oneScript">add_circle_outline</v-icon>
      <v-icon v-else>remove_circle_outline</v-icon>
    </v-btn> -->

    <div class="grid-container">
      <div class="grid-item0 background darken-1">
        <v-layout column class="ma-0 pa-0">
        <v-layout row class="ma-0 pa-0">
          <v-btn @click="toggle" dark icon small>
          <v-icon v-if="fullscreen">fullscreen_exit</v-icon>
          <v-icon v-else>fullscreen</v-icon>
          </v-btn>
          <v-btn @click="oneScript=!oneScript" dark icon small>
            <span v-if="oneScript" class="shrinkHeight  caption text-none">आ<br>ā</span>
            <v-icon v-else>ā</v-icon>
          </v-btn>
      </v-layout>
      <v-layout row class="ma-0 pa-0">
        <v-btn @click="toggle" dark icon small>
        <v-icon v-if="fullscreen" class="subheading" dark>
          settings_backup_restore
        </v-icon>
        <v-icon v-else> &#9775</v-icon>
        </v-btn>
        <v-btn @click="oneScript=!oneScript" dark icon small>
          <span v-if="oneScript" class="shrinkHeight  caption text-none">ी े<br>ि  ु</span>
          <v-icon v-else>ā</v-icon>
        </v-btn>
    </v-layout>
      </v-layout>
      </div>
      <div class="grid-item1 secondary">
        <v-layout column justify-space-between fill-height>
          <v-flex v-for="myType in Object.keys(alphabetSelect.row)" :key="myType" class="ma-0 pa-0"  shrink>
            <v-btn  small class="rowButton ma-1 pa-0 text-none makeLabelSize white"
            :class="{disabled: !alphabetSelect['row'][myType]}" @click="SET_alphabetSelect(['row', myType])">
              {{myType}}
            </v-btn>
          </v-flex>
        </v-layout>
      </div>


<div class="grid-item2 secondary" v-if="true">
  <!-- vowel header -->
        <div class="columnHeaderItem1" :style="{width: computeMyWidth*3 + 'px'}">
          <v-layout column fill-height>
            <v-flex light class="elevation-10 white black--text makeLabelSize ma-1" grow
            :class="{disabled: !alphabetSelect['column']['vowel']}" @click="SET_alphabetSelect(['column','vowel'])">
              vowel
              </v-flex>
            <v-layout row fill-height>
                <v-flex grow class="elevation-10 mb-1 mx-1 deep-orange darken-4 white--text makeLabelSize"
                :class="{disabled: !alphabetSelect['column']['short']}" @click="SET_alphabetSelect(['column','short'])"
                :style="{maxWidth: computeMyWidth*0.9 + 'px'}">
                short
              </v-flex>
                <v-flex grow class="elevation-10 mb-1 mr-1 blue-grey darken-4 white--text makeLabelSize"
                :class="{disabled: !alphabetSelect['column']['long']}" @click="SET_alphabetSelect(['column','long'])"
                :style="{maxWidth: computeMyWidth*1.85 + 'px'}">
                long
              </v-flex>
            </v-layout>
          </v-layout>
      </div>

      <!-- consonant header -->
        <div class="columnHeaderItem2" :style="{width: computeMyWidth*8 + 'px'}">
          <v-layout column fill-height>
            <v-flex  class="white black--text makeLabelSize  ma-1" grow
            :class="{disabled: !alphabetSelect['column']['consonant']}" @click="SET_alphabetSelect(['column','consonant'])">
              consonant
              </v-flex>

            <!-- row 1   -->
            <v-layout row>
                <v-flex grow class="elevation-10 mb-1 mx-1 green darken-1 white--text makeLabelSize"
                :class="{disabled: !alphabetSelect['column']['stop']}" @click="SET_alphabetSelect(['column','stop'])"
                :style="{width: computeMyWidth*0.9*4 + 'px'}">
                stop
              </v-flex>
              <v-flex grow class="elevation-10 mb-1 mr-1 blue darken-1 white--text makeLabelSize"
              :class="{disabled: !alphabetSelect['column']['nasal']}" @click="SET_alphabetSelect(['column','nasal'])"
              :style="{width: computeMyWidth*0.8 + 'px'}">
              nasal
            </v-flex>
            <v-flex grow class="elevation-10 mb-1 green darken-4 white--text makeLabelSize"
            :class="{disabled: !alphabetSelect['column']['semivowel']}" @click="SET_alphabetSelect(['column','semivowel'])"
            :style="{width: computeMyWidth*0.8 + 'px'}">
            semiv
          </v-flex>
          <v-flex grow class="elevation-10 mb-1 mx-1 blue darken-4 white--text makeLabelSize"
          :class="{disabled: !alphabetSelect['column']['sibilant']}" @click="SET_alphabetSelect(['column','sibilant'])"
          :style="{width: computeMyWidth*0.9*2 + 'px'}">
          sibilant
        </v-flex>
            </v-layout>

            <!-- row 2   -->
            <v-layout row>
                <v-flex grow class="elevation-10 mb-1 mx-1 pink darken-1 white--text makeLabelSize"
                :class="{disabled: !alphabetSelect['column']['unvoiced']}" @click="SET_alphabetSelect(['column','unvoiced'])"
                :style="{width: computeMyWidth*0.9*2 + 'px'}">
                unvoiced
              </v-flex>
              <v-flex grow class="elevation-10 mb-1 orange darken-1 white--text makeLabelSize"
              :class="{disabled: !alphabetSelect['column']['voiced']}" @click="SET_alphabetSelect(['column','voiced'])"
              :style="{width: computeMyWidth*0.9*4 + 'px'}">
              voiced
            </v-flex>
            <v-flex grow class="elevation-10 mb-1 ml-1 pink darken-1 white--text makeLabelSize"
            :class="{disabled: !alphabetSelect['column']['unvoiced']}" @click="SET_alphabetSelect(['column','unvoiced'])"
            :style="{width: computeMyWidth*0.8 + 'px'}">
            <br>
          </v-flex>
          <v-flex grow class="elevation-10 mb-1 mx-1 orange darken-1 white--text makeLabelSize"
          :class="{disabled: !alphabetSelect['column']['voiced']}" @click="SET_alphabetSelect(['column','voiced'])"
          :style="{width: computeMyWidth*0.8 + 'px'}">
            <br>
        </v-flex>

            </v-layout>

            <!-- row 3   -->
            <v-layout row>
                <v-flex grow class="elevation-10 mb-1 mx-1 lime darken-4 white--text makeLabelSize"
                :class="{disabled: !alphabetSelect['column']['unaspirated']}" @click="SET_alphabetSelect(['column','unaspirated'])"
                :style="{width: computeMyWidth*0.8 + 'px'}">
                <br>
              </v-flex>
              <v-flex grow class="elevation-10 mb-1 mr-1 indigo darken-1 white--text makeLabelSize"
              :class="{disabled: !alphabetSelect['column']['aspirated']}" @click="SET_alphabetSelect(['column','aspirated'])"
              :style="{width: computeMyWidth*0.8 + 'px'}">
              <br>
            </v-flex>
            <v-flex grow class="elevation-10 mb-1 mr-1 lime darken-4 white--text makeLabelSize"
            :class="{disabled: !alphabetSelect['column']['unaspirated']}" @click="SET_alphabetSelect(['column','unaspirated'])"
            :style="{width: computeMyWidth*0.8 + 'px'}">
            <br>
          </v-flex>
          <v-flex grow class="elevation-10 mb-1 mr-1 indigo darken-1 white--text makeLabelSize"
          :class="{disabled: !alphabetSelect['column']['aspirated']}" @click="SET_alphabetSelect(['column','aspirated'])"
          :style="{width: computeMyWidth*0.8 + 'px'}">
            <br>
        </v-flex>
            <v-flex grow class="elevation-10 mb-1 mr-1 lime darken-4 white--text makeLabelSize"
            :class="{disabled: !alphabetSelect['column']['unaspirated']}" @click="SET_alphabetSelect(['column','unaspirated'])"
            :style="{width: computeMyWidth*0.9*2 + 'px'}">
            unaspirated
            </v-flex>
            <v-flex grow class="elevation-10 mb-1 mr-1 indigo darken-1 white--text makeLabelSize"
            :class="{disabled: !alphabetSelect['column']['aspirated']}" @click="SET_alphabetSelect(['column','aspirated'])"
            :style="{width: computeMyWidth*0.9*2 + 'px'}">
            aspirated
            </v-flex>
</v-layout>

          </v-layout>
        </div>

</div>

<div class="grid-item3 background lighten-1">
    <v-layout column class="ma-0 pa-0" :class="{addBorder: !GET_dark}">
        <v-layout row v-for="myType in Object.keys(alphabetSelect.row)" :key="myType">
        <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.tag.split('_').includes(myType)" shrink class="ma-0 pa-0" :class="{fadeLetter: item.fadeON}">
          <v-btn round icon :dark="GET_dark" class="ma-0 pa-0 title alphaButton" :class="myFontSize" @click="playSound(item.letter)" v-if="oneScript">
            <span class="pa-0 ma-0  text-none  font-weight-light" :ref="item.letter" :id="'alphabet_'+item.letter">{{convert_dev(item.letter)}}</span>
          </v-btn>
      <v-btn round icon :dark="GET_dark" class="ma-0 pa-0 alphaButton" @click="playSound(item.letter)" :class="myFontSizeFirst" v-else>
        <span class="pa-0 ma-0 shrinkHeight  font-weight-light">{{item.letter}} <br>
        <span class="pa-0 ma-0 text-none  font-weight-light"  :class="myFontSizeSecond">{{convert_dev(item.letter)}}</span></span>
      </v-btn>
        </v-flex>
        </v-layout>
        <!-- <v-layout class="shiftUp grid-item4 background"> -->
        <v-flex xs6 class="grid-item4 shiftUp text-xs-left body-1 font-weight-regular accentinfo--text">
      something is going to be written here what will that be let's see.
      </v-flex>
          <!-- </v-layout> -->

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
    fullscreen: false,
    oneScript: true
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['main', 'preview', 'sanskritAlphabet']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script', 'slines', 'fsize', 'verseall', 'verse', 'alphabetSelect']),
    ...mapGetters('coretext', ['GET_main']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      // console.log(Object.keys(this.alphabetSelect.column).filter(key => this.alphabetSelect.column[key]))
      // console.log(Object.keys(this.alphabetSelect.row).filter(key => this.alphabetSelect.row[key]))
      console.log(this.alphabetSelect.column.long)
      var t0 = performance.now();
      this.sanskritAlphabet.forEach(item => {
        var myselection = Object.keys(this.alphabetSelect.column).filter(key => this.alphabetSelect.column[key]).concat(
          Object.keys(this.alphabetSelect.row).filter(key => this.alphabetSelect.row[key])
        )
        // console.log(myselection)
        // console.log(item.tag.split('_'))
        function doesItContain(currentTag) {
          return myselection.includes(currentTag)
        }
        // console.log(item.tag.split('_').every(doesItContain))
        item.fadeON = !item.tag.split('_').every(doesItContain)
      })
      var t1 = performance.now();
      console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

      return {
        '--myWidth':  this.computeMyWidth + 'px',
        '--myHeight': this.computeMyHeight + 'px',
        '--myHeightRowButton': this.computeMyHeight*0.7 + 'px',
        '--myLabelSize': this.computeMyLabelSize + 'px',
      }
    },
    computeMyWidth() {
      if(this.$vuetify.breakpoint.width < 850 &
        this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) {
        this.SET_showNav(false)
      } else {
        this.SET_showNav(true)
      }
      let mytemp = 25
      if(this.$vuetify.breakpoint.width > 500) mytemp = 36
      if(this.$vuetify.breakpoint.width > 850) mytemp = 54
      return  mytemp
    },
    computeMyHeight() {
      let mytemp = 32
      if(this.oneScript) mytemp = 25
      if(this.$vuetify.breakpoint.width > 500) mytemp = 32
      if(this.$vuetify.breakpoint.width > 850) mytemp = 52
      return  mytemp
    },
    computeMyLabelSize() {
      let mytemp = 8
      if(this.$vuetify.breakpoint.width > 500) mytemp = 11
      if(this.$vuetify.breakpoint.width > 850) mytemp = 14
      return  mytemp
    },
    myFontSize() {
      let mytemp = "body-1"
      if(this.$vuetify.breakpoint.width > 500) {
        if(this.oneScript) {
          mytemp = "subheading"
        } else mytemp = "body-1"
      }
      if(this.$vuetify.breakpoint.width > 850) {
        if(this.oneScript) {
          mytemp = "headline"
        } else mytemp = "subheading"
      }
      return mytemp
    },
    myFontSizeFirst() {
      let mytemp = "caption"
      if(this.$vuetify.breakpoint.width > 500) {
        mytemp = "caption"
      }
      if(this.$vuetify.breakpoint.width > 850) {
        mytemp = "subheading"
      }
      return mytemp
    },
    myFontSizeSecond() {
      let mytemp = "caption"
      if(this.$vuetify.breakpoint.width > 500) {
        mytemp = "body-2"
      }
      if(this.$vuetify.breakpoint.width > 850) {
        mytemp = "title"
      }
      return mytemp
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement', 'SET_chapter', 'SET_verse',
    'SET_alphabetSelect', 'SET_showNav']),
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
  opacity: 0.5;
  text-decoration: line-through;
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
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
  grid-template-areas:
    "buttonBar columnHeader columnHeader"
    "rowHeader mainContent mainContent";
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
.grid-item3 {
  grid-area: mainContent;
  position: relative;
}
.grid-item2 {
  display: grid;
  grid-area: columnHeader;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas:
  "vowel consonant"
}

.columnHeaderItem1 {
  grid-area: vowel;
  place-self: stretch;
}
.columnHeaderItem2 {
  grid-area: consonant;
  place-self: stretch;
}

.makeLabelSize {
  font-size: var(--myLabelSize);
}
.addBorder {
  border: 1px solid black;
  /* border-radius: 5px; */
}
.alphaButton.v-btn {
  width: var(--myWidth);
  height: var(--myHeight);
  /* width: 40px;
  height: 32px; */
  padding: 0;
}
.rowButton.v-btn {
  width: var(--myWidth);
  height: var(--myHeightRowButton);
  /* width: 40px;
  height: 32px; */
  padding: 0;
}
.grid-item1.btn__content {
  padding: 0;
  margin:0;
}

div.btn__content {
  padding: 0;
}
.shiftUp{
  position: absolute;
  width: 50%;
  bottom: 0;
  right: 0;
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
  opacity: 0.4;
  text-decoration: line-through;
}
</style>
