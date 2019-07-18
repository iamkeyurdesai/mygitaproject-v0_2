<template>
<v-layout justify-center column text-xs-center :style="cssProps">

  <!-- <div class="font-weight-light mt-2 pa-1 subheading"> Learn Sanskrit</div>
  <v-divider :dark="GET_dark"></v-divider>
   -->
   <v-subheader :dark="GET_dark"> Learn Sanskrit Alphabet </v-subheader>

  <!-- <fullscreen ref="fullscreen" @change="fullscreenChange" class="background"> -->

    <!-- <v-btn @click="toggle" color="accentmain"  dark fab bottom right fixed class="mb-5 shiftRight">
    <v-icon v-if="fullscreen">fullscreen_exit</v-icon>
    <v-icon v-else>fullscreen</v-icon>
    </v-btn>

    <v-btn @click="oneScript=!oneScript" color="accentinfo"  dark fab bottom right fixed class="shiftUp shiftRight">
      <v-icon v-if="oneScript">add_circle_outline</v-icon>
      <v-icon v-else>remove_circle_outline</v-icon>
    </v-btn> -->

    <div class="grid-container">
      <v-card class="grid-item0 background" :dark="GET_dark">
        <v-layout column class="ma-0 pa-0">
        <v-layout row class="ma-0 pa-0">
          <v-btn @click="matrikaChakraOn=!matrikaChakraOn" :dark="GET_dark" icon small>
          <v-icon v-if="matrikaChakraOn">visibility</v-icon>
          <v-icon v-else>visibility_off</v-icon>
          </v-btn>
          <v-btn @click="oneScript=!oneScript" :dark="GET_dark" icon small>
            <v-icon :class="{stirkeThrough:oneScript}">translate</v-icon>
          </v-btn>
      </v-layout>
      <v-layout row class="ma-0 pa-0">
        <v-btn @click="playAllMatrikaChakra=!playAllMatrikaChakra" :dark="GET_dark" icon small>
        <v-icon v-if="!playAllMatrikaChakra" class="subheading" dark @click="goAllMatrikaChakra()">
          lock
        </v-icon>
        <v-icon v-else @click="pauseAllMatrikaChakra()"> lock_open</v-icon>
        </v-btn>
        <v-btn @click="selectConsonantAdd=!selectConsonantAdd" :dark="GET_dark" icon small v-if="!matrikaChakraOn">
          <span v-if="conjunctConsonant!==''" class="shrinkHeight body-1 text-none">{{convert(conjunctConsonant)}}<br>{{convert(inherentVowel)}}</span>
          <span v-else class="title text-none">{{convert(inherentVowel)}}</span>
        </v-btn>
        <v-btn @click="playMatrikaChakra=!playMatrikaChakra" v-else :dark="GET_dark" icon small>
          <v-icon v-if="!playMatrikaChakra" @click="goMatrikaChakra()">play_arrow</v-icon>
          <v-icon v-if="playMatrikaChakra" @click="pauseMatrikaChakra()">pause</v-icon>
        </v-btn>
    </v-layout>
      </v-layout>
    </v-card>

    <v-bottom-sheet v-model="selectConsonantAdd" inset>
      <v-card>
        <v-subheader class="ml-2 subheading info--text">
          Form a compound letter using {{convert(inherentVowel)}} <br> &nbsp For example, {{convert('k')}} + {{convert(inherentVowel)}} = {{convert('k'+inherentVowel)}}
        </v-subheader>
        <v-btn v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.tag.split('_').includes('vowel') & item.letter!==' ' & !item.letter.match(/(ṝ|ḷ|ḹ)/)"
          :class="{activeButton: inherentVowel===item.letter}"
          round fab small class="ma-1 pa-0 alphaButtonDialog"
          @click="inherentVowel=item.letter, clickTextShowVowel=item.approximation, conjunctConsonant='' ">
            <span :class="myFontSize" class="pa-0 ma-0  text-none body-2 "  :id="'alphabet1_'+item.letter">{{convert(item.letter)}}</span>
          </v-btn>
          <v-divider class="my-2"></v-divider>
          <v-subheader class="ml-2 subheading info--text" v-if="conjunctConsonant!==''">
            Form a conjunct consonant using {{convert(conjunctConsonant)}} <br> &nbsp For example, {{convert('k')}} + {{convert(conjunctConsonant)}} + {{convert(inherentVowel)}} = {{convert('k'+conjunctConsonant+inherentVowel)}}
          </v-subheader>
          <v-subheader class="ml-2 subheading info--text" v-else>
            Conjunct consonant none
          </v-subheader>
          <v-btn :class="{activeButton: conjunctConsonant===''}"
            round fab small class="ma-1 pa-0 alphaButtonDialog"
            @click="conjunctConsonant='', clickTextShowConjunct='' ">
            <span :class="myFontSize" class="pa-0 ma-0  body-2  text-none "></span>
          </v-btn>
          <v-btn v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.tag.split('_').includes('consonant') & item.letter!==' '"
            :class="{activeButton: conjunctConsonant===item.letter}"
            round fab small class="ma-1 pa-0 alphaButtonDialog"
            @click="conjunctConsonant=item.letter, clickTextShowConjunct=item.approximation ">
              <span :class="myFontSize" class="pa-0 ma-0  body-2  text-none  "  :id="'alphabet1_'+item.letter">{{convert(item.letter)}}</span>
            </v-btn>
            <v-divider class="my-2"></v-divider>
          <br><br>
    </v-card>
  </v-bottom-sheet>



        <v-card light class="grid-item1 secondary" v-if="!matrikaChakraOn">
        <v-layout column justify-space-between fill-height>
          <v-flex v-for="myType in Object.keys(alphabetSelect.row)" :key="myType" class="ma-0 pa-0"  shrink>
            <v-btn  small class="rowButton ma-1 pa-0 text-none makeLabelSize white"
            :class="{disabled: !alphabetSelect['row'][myType]}" @click="SET_alphabetSelect(['row', myType])">
              {{myType}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card light class="grid-item1 secondary" v-if="matrikaChakraOn">
        <v-layout column justify-space-between fill-height>
          <v-flex v-for="(myType, i) in matrikaCharkraRow.english" :key="myType+i" class="ma-0 pa-0"  shrink>
            <v-btn  small class="rowButton ma-1 pa-0 text-none makeLabelSize white"
            :class="{disabled_nothing: !alphabetSelect['row'][myType]}">
              {{myType}}
            </v-btn>
          </v-flex>
        </v-layout>
        </v-card>



<v-card class="grid-item2 secondary" v-if="!matrikaChakraOn">

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
</v-card>

<v-card class="grid-item2 secondary" v-if="matrikaChakraOn">

  <!-- vowel header -->
        <div class="columnHeaderItem1" :style="{width: computeMyWidth*3 + 'px'}">
          <v-layout column fill-height>
            <v-flex light class="elevation-10 white black--text makeLabelSize ma-1" grow>
              Shiva Tattva
              </v-flex>
              <v-flex light class="elevation-10 white black--text makeLabelSize ma-1" grow>
                Power and State
                </v-flex>
          </v-layout>
      </div>

      <!-- consonant header -->
        <div class="columnHeaderItem2" :style="{width: computeMyWidth*8 + 'px'}">
          <v-layout column fill-height>
            <v-flex  class="white black--text makeLabelSize  ma-1" grow>
              Shakti Tattva
              </v-flex>

            <!-- row 1   -->
            <v-layout row>
                <v-flex grow class="elevation-10 mb-1 mx-1 green darken-1 white--text makeLabelSize"
                :style="{width: computeMyWidth*0.9*5 + 'px'}">
                creative freedom
              </v-flex>
            <v-flex grow class="elevation-10 mb-1 green darken-4 white--text makeLabelSize"
            :style="{width: computeMyWidth*0.8 + 'px'}">
            limit
          </v-flex>
          <v-flex grow class="elevation-10 mb-1 mx-1 blue darken-4 white--text makeLabelSize"
          :style="{width: computeMyWidth*0.9*2 + 'px'}">
          expansion
        </v-flex>
            </v-layout>


          </v-layout>
        </div>
</v-card>

<!-- <div class="grid-item3 background"> -->
  <v-card :dark="GET_dark" class="grid-item3 background">
    <v-layout column class="ma-0 pa-0" :class="{addBorder: false}">
        <v-layout row v-for="myType in Object.keys(alphabetSelect.row)" :key="myType">
        <v-flex v-for="(item, i) in sanskritAlphabet" :key="i" v-if="item.tag.split('_').includes(myType)" shrink class="ma-0 pa-0" :class="{fadeLetter: item.fadeON}">
          <v-btn round icon :dark="GET_dark" class="ma-0 pa-0 title alphaButton"
          :class="myFontSize" @click="pressLetterAction(item)" v-if="oneScript">
            <span class="pa-0 ma-0  text-none  " :ref="item.letter" :id="'alphabet_'+item.letter">
            {{convert(item.letter + (item.tag.split('_').includes('consonant') & item.letter!==' ' ? conjunctConsonant+inherentVowel : ''))}}
            </span>
          </v-btn>
      <v-btn round icon :dark="GET_dark" class="ma-0 pa-0 alphaButton"
      @click="pressLetterAction(item)" :class="myFontSizeFirst" v-else>
        <span class="pa-0 ma-0 shrinkHeight text-none">
          {{convert_todev(item.letter + (item.tag.split('_').includes('consonant') & item.letter!==' ' ? conjunctConsonant+inherentVowel : ''))}}
          <br>
        <span class="pa-0 ma-0 text-none"  :class="myFontSizeSecond">
      {{convert(item.letter + (item.tag.split('_').includes('consonant') & item.letter!==' ' ? conjunctConsonant+inherentVowel : ''))}}
        </span>
      </span>
      </v-btn>
        </v-flex>
        </v-layout>
        <!-- <v-layout class="shiftUp grid-item4 background"> -->
        <v-flex xs6 class="grid-item4 shiftUp text-xs-left accentinfo--text">
          <v-card :dark="GET_dark" class="background accentinfo--text pa-1" v-html="clickTextShowFormat" :class="myFontSize" id="myTextPanel"></v-card>
      </v-flex>
          <!-- </v-layout> -->
    </v-layout>
    </v-card>
<!-- </div> -->
<!-- <v-btn @click="go()" color="accentmain"  dark> Go Anime </v-btn> -->
<!-- <input class="log update-log"> </input> -->

</div>

<br>
<br>

<!-- </fullscreen> -->

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
    oneScript: true,
    clickTextShow: '',
    clickTextShowConjunct: '',
    clickTextShowVowel: '',
    clickTextVowel: true,
    clickLetter: 'a',
    inherentVowel: 'a',
    conjunctConsonant: '',
    selectConsonantAdd: false,
    matrikaChakraOn: false,
    playMatrikaChakra: false,
    playAllMatrikaChakra: false,
    myAnimationArray: [],
    myAnimationNumber: 0,
    myAnimationPointer: null,
    myAnimationText: ["one", "two", "three", "four"],
    matrikaCharkraRow: {
      english: ['conscious-bliss', 'will', 'holdback', 'holdback', 'knowledge', 'action', 'action', 'involution', 'evolution'],
      sanskrit: [],
    }
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
      console.log(this.sanskritAlphabet)
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
      let mytemp = 25
      if(this.$vuetify.breakpoint.width > 500) mytemp = 49
      if(this.$vuetify.breakpoint.width > 850) mytemp = 62
      return  mytemp
    },
    computeMyHeight() {
      let mytemp = 32
      if(this.oneScript) mytemp = 25
      if(this.$vuetify.breakpoint.width > 500) mytemp = 34
      if(this.$vuetify.breakpoint.width > 850) mytemp = 55
      return  mytemp
    },
    computeMyLabelSize() {
      let mytemp = 8
      if(this.$vuetify.breakpoint.width > 500) mytemp = 11
      if(this.$vuetify.breakpoint.width > 850) mytemp = 14
      return  mytemp
    },
    myFontSize() {
      let mytemp = "caption"
      if(this.$vuetify.breakpoint.width > 500) {
        if(this.oneScript) {
          mytemp = "body-1"
        } else mytemp = "caption"
      }
      if(this.$vuetify.breakpoint.width > 850) {
        if(this.oneScript) {
          mytemp = "title"
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
        mytemp = "subheading"
      }
      return mytemp
    },
    clickTextShowFormat(){
      if(this.clickTextShow==="FALSE" | this.clickTextShow===null) {
      return null
    } else {
      if(this.clickTextVowel) {
      return this.convert(this.clickLetter) + ' in ' + this.clickTextShow.replace("*", "<strong><u>").replace("*","</u></strong>")
    } else {
      if(this.inherentVowel==="a") {
      if(this.conjunctConsonant===""){
      return this.convert(this.clickLetter+'a') + ' in ' + this.clickTextShow.replace("*", "<strong><u>").replace("*","</u></strong>")
    } else {
      return this.convert(this.clickLetter) + ' in ' + this.clickTextShow.replace("*", "<strong><u>").replace("*","</u></strong>") + ', ' +
      this.convert(this.conjunctConsonant+'a') + ' in ' + this.clickTextShowConjunct.replace("*", "<strong><u>").replace("*","</u></strong>")
    }
    } else {
      if(this.conjunctConsonant!==""){
      return (this.convert(this.clickLetter) + ' in ' + this.clickTextShow.replace("*", "<strong><u>").replace("*","</u></strong>") + ', ' +
              this.convert(this.conjunctConsonant) + ' in ' + this.clickTextShowConjunct.replace("*", "<strong><u>").replace("*","</u></strong>") + ', ' +
              this.convert(this.inherentVowel) + ' in ' + this.clickTextShowVowel.replace("*", "<strong><u>").replace("*","</u></strong>")
            )
          } else {
            return (this.convert(this.clickLetter) + ' in ' + this.clickTextShow.replace("*", "<strong><u>").replace("*","</u></strong>") + ', ' +
                    this.convert(this.inherentVowel) + ' in ' + this.clickTextShowVowel.replace("*", "<strong><u>").replace("*","</u></strong>")
                  )
          }
    }
    }
    }
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
      return Sanscript.t(myinput, 'iast', 'devanagari');
    },
    convert_todev(myinput) {
      if(this.script==='iast' | this.script==='itrans') {
      return Sanscript.t(myinput, 'iast', 'devanagari')
    } else {
      return myinput
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
    playSound: function(melody) {
      var snd = new Audio();
      snd.src = '/static/assets/audio/mp3_alphabet/' + melody + '.mp3';
      snd.volume = 0.7
      snd.play()
    },
    toggle () {
       this.$refs['fullscreen'].toggle() // recommended
       // this.fullscreen = !this.fullscreen // deprecated
     },
     fullscreenChange (fullscreen) {
       this.fullscreen = fullscreen
     },
     goMatrikaChakra() {
      if(this.myAnimationArray.length==0) {
      this.myAnimationArray = timelineTranslate(this)
      }
      this.myAnimationArray[this.myAnimationNumber].play()
      document.querySelector('#myTextPanel').innerHTML = this.myAnimationText[this.myAnimationNumber]
      this.myAnimationPointer = setInterval( () => {
        if(this.myAnimationNumber < (this.myAnimationArray.length - 1)) {
        this.myAnimationNumber += 1
        this.myAnimationArray[this.myAnimationNumber-1].pause()
        this.myAnimationArray[this.myAnimationNumber].play()
        document.querySelector('#myTextPanel').innerHTML = this.myAnimationText[this.myAnimationNumber]
      }
    }, 10000)
    },
    pauseMatrikaChakra() {
      this.myAnimationArray[this.myAnimationNumber].restart()
      this.myAnimationArray[this.myAnimationNumber].pause()
      clearInterval(this.myAnimationPointer)
    },
    goAllMatrikaChakra() {
      if(this.myAnimationArray.length==0) {
      this.myAnimationArray = timelineTranslate(this)
      }
      this.myAnimationArray.forEach( (item) => {item.play()})
    },
    pauseAllMatrikaChakra() {
      this.myAnimationArray.forEach( (item) => {
        item.restart()
        item.pause()
      })
      this.myAnimationNumber = 0
    },
    pressLetterAction(item){
      this.clickTextShow=item.approximation
      this.clickLetter=item.letter
      this.clickTextVowel=item.tag.split('_').includes('vowel')
      this.playSound(this.convert_dev(item.letter + (item.tag.split('_').includes('consonant') & item.letter!==' ' ? this.conjunctConsonant+this.inherentVowel : '')))
      // this.playSound(this.convert_dev(item.letter+(this.clickTextVowel?'':'a')))
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
.stirkeThrough {
  text-decoration: line-through;
}

.shrinkHeight {
  line-height: 1.2em;
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
  width: 65%;
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
.activeButton{
  color: #FF1744;
  border: 2px solid rgba(256, 10, 10, 0.7);
}
.alphaButtonDialog.v-btn {
  width: 26px;
  height: 26px;
  /* width: 40px;
  height: 32px; */
  padding: 0;
}

</style>
