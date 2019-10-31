<!-- This componet will render a shloaka
The verse_id is provided as a prop, and the trasliterated verses are fetched and converted to the selected script
Type of rendering is decided by breakSandhi which is read from Vuex
Type of theming is decided by options and theme is read from Vuex
Local func convert() used lib Sanscript -->

<template>
  <!-- foots are rendered row-wise with spacing defined by myspan -->
  <v-layout row align-center justify-center class="adjustLineHeight pa-1">
    <!-- breakSandhi is false -->
    <div v-if="!breakSandhi | !wordByWord"  key="breakSandhiFalse" align="left">
      <!-- render four foots -->
      <span v-for="(item,i) in GET_main_local.foot" :class="`accent${i+1}--text`">
        <span> {{convert(item.foot)}} {{footbreaks[i]}}
          <!-- chapter and verse ids -->
          <span v-show="i==3" :style="'color: ' + options[theme].emphasis.disabled" class="small" v-if="verseNumber"> {{chapter}}|{{verse_id}} </span>
          </span>

          <br/>
        </span>
      </span>
    </div>

    <!-- breakSandhi is true -->

    <div v-if="breakSandhi & wordByWord" key="breakSandhiTrue" align="left"  class="mytall">
      <!-- render words with break at the end of the foot inserted using checkBreak -->

      <span v-for="(item,i) in GET_main_local.word_info" :class="`accent${item.foot}--text`" @click="playSound(item.sanskrit)">

        <span v-if="GET_main_local.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
        <span v-else> {{convert(item.sanskrit)}},</span>
        <span v-if="checkBreak(i,4)"><br/></span>
      </span>
      <span :style="'color: ' + options[theme].emphasis.disabled" class="small" v-if="verseNumber"> {{chapter}}|{{verse_id}} </span>
</div>
<div v-if="breakSandhi & false" key="breakSandhiTrue" align="left"  class="mytall">
      <div v-show="!breakSandhi_animate" align="left">
        <div class="mx-1" align="center">
          <v-btn small icon :style="'color: ' + options[theme].emphasis.medium">
          <v-icon  v-on:click.stop="typeWriterWrapper()"> play_circle_outline </v-icon>
        </v-btn>
      </div>
        <div class="px-3 py-1 ml-4 mytext" v-for="(item,i) in GET_main_local.foot" :class="[`accent${i+1}--text`]">
          <span>{{convert(item.foot)}}</span>
          {{footbreaks[i]}}<br/>
          <span>
          <span class="opaque" v-for="(item1,i1) in GET_main_local.word_info.filter(a => a.foot == (i + 1))" v-on:click="playSound(item1.sanskrit)">
            {{convert(item1.sanskrit)}}
          </span>
          {{footbreaks[i]}}
        </span>
          <v-icon :class="[`accent${i+1}--text`]" class="opaque tiny">vpn_key</v-icon>
        </br>
      </div>
    </div>
      <!-- chapter and verse ids -->
      <!-- <span :style="'color: ' + options[theme].emphasis.medium"  class="caption"> {{chapter}}|{{verse_id}} </span> -->

      <div v-show="breakSandhi_animate" align="left">
        <div class="mx-1" align="center">
          <span v-if="!pauseSandhi">
            <v-btn small icon :style="'color: ' + options[theme].emphasis.medium">
            <v-icon  v-on:click.stop="pauseSandhi = true"> pause_circle_outline </v-icon>
          </v-btn>
          </span>
          <span v-if="pauseSandhi">
            <v-btn small icon :style="'color: ' + options[theme].emphasis.medium">
            <v-icon  v-on:click.stop="pauseSandhi = false"> play_circle_outline </v-icon>
          </v-btn>
          </span>
        </div>
        <div class="px-3 py-1 ml-4 mytext" v-for="(item,i) in GET_main_local.foot" :class="[`accent${i+1}--text`]">
          <span :id="'shloakaUnbroken'+chapter+verse_id+i"></span>
          <br/>
          <span class="opaque" :id="'shloakaBroken'+chapter+verse_id+i">
          <span v-for="(item1,i1) in GET_main_local.word_info.filter(a => a.foot == (i + 1))">
          </span>
        </span>
        </br>
      </div>
      </div>

    </div>

  </v-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';

export default {
  props: {
    verse_id: Number,
    required: true,
    verseNumber: Boolean,
    wordByWord: Boolean,
    whatScript: String
  },
  data: () => ({
    footbreaks: ["", "|", "", "||", "", "|"],  // goes to six due to 6 foot verses in chapter 1
    breakSandhi_animate: false,
    iSandhi: 0,
    iLength: 0,
    speed: 500,
    iProgressSandhi: 0,
    pauseSandhi: true,
    txtUnbroken: [],
    txtBroken: []
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'breakSandhi', 'theme', 'script']),
    ...mapGetters('coretext', ['GET_main_chapter']),
    // use verse_id to get specific verse of the main text
    GET_main_local() {
      self = this
      let mytemp = this.GET_main_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    }
  },
  methods: {
    convert(myinput) {
if(this.whatScript!==undefined) {
  if(this.whatScript === "iast") {
    return myinput
  } else {
  return Sanscript.t(myinput, 'iast', this.whatScript);
}
} else {
  if(this.script === "iast") {
    return myinput
  } else {
  return Sanscript.t(myinput, 'iast', this.script);
}
}
    },
    checkBreak(i, j) {
      let myflag = false
      let mytemp = this.GET_main_local.word_info[i + 1]
      if (!(mytemp === undefined)) {
        if (j == 2) {
          myflag = (this.GET_main_local.word_info[i].foot < this.GET_main_local.word_info[i + 1].foot) &&
            (this.GET_main_local.word_info[i].foot % 2 == 0)
        } else {
          myflag = (this.GET_main_local.word_info[i].foot < this.GET_main_local.word_info[i + 1].foot)
        }
      }
      return myflag
    },
    playSound: function(melody) {
      var snd = new Audio();
      snd.src = 'https://gitawebapp.firebaseapp.com/static/assets/audio/mp3/' + melody + '.mp3';
      snd.play()
    },
    typeWriterWrapper: function(){
      this.breakSandhi_animate = true
      this.pauseSandhi = false
      this.iLength = Math.max(...this.GET_main_local.foot.map(a => a.foot.length)) + 5
      for(var jj=0; jj < this.GET_main_local.foot.length; jj++){
        this.txtUnbroken[jj] = this.convert(this.GET_main_local.foot[jj].foot)
        this.txtBroken[jj] = this.convert(this.GET_main_local.word_info.filter(a => a.foot == (jj + 1)).map(a => a.sanskrit).join(" "))
        let mytmp1 = `shloakaUnbroken${this.chapter}${this.verse_id}${jj}`
        let mytmp2 = `shloakaBroken${this.chapter}${this.verse_id}${jj}`
        document.getElementById(mytmp1).innerHTML = ""
        document.getElementById(mytmp2).innerHTML = ""
      }
      self = this
      function typeWriter(){
        if (self.iSandhi < self.iLength) {
          if(!self.pauseSandhi) {
          for(var jj=0; jj < self.GET_main_local.foot.length; jj++){
            let mytmp1 = `shloakaUnbroken${self.chapter}${self.verse_id}${jj}`
            let mytmp2 = `shloakaBroken${self.chapter}${self.verse_id}${jj}`
            document.getElementById(mytmp1).innerHTML += self.txtUnbroken[jj].charAt(self.iSandhi)
            document.getElementById(mytmp2).innerHTML += self.txtBroken[jj].charAt(self.iSandhi)
          }
          self.iSandhi++;
          self.iProgressSandhi = parseInt(self.iSandhi / self.iLength * 100)
          setTimeout(typeWriter, self.speed)
        } else {
          setTimeout(typeWriter, self.speed*3)
        }
        } else {
          self.iSandhi = 0
          self.breakSandhi_animate = false
          self.iProgressSandhi = 0
        }
  }
      typeWriter()
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
.small {
  font-size: 70%;
}
.tiny {
  font-size: 50%;
}
.opaque {
  opacity: 0.7;
}
.mytall {
  transition: font-size 0.3s ease-in-out;
}
.animate {
  animation: breakSandhiGlow 1s infinite
}
@keyframes breakSandhiGlow {
    0% {background:red;}
    50% {background:yellow;}
    100% {background:red;}
}
</style>
