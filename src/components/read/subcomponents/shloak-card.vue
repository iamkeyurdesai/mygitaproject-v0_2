<!-- This componet will render a shloaka
The verse_id is provided as a prop, and the trasliterated verses are fetched and converted to the selected script
Type of rendering is decided by breakSandhi which is read from Vuex
Type of theming is decided by options and theme is read from Vuex
Local func convert() used lib Sanscript -->

<template>
  <!-- foots are rendered row-wise with spacing defined by myspan -->
  <v-layout row align-center justify-center class="adjustLineHeight pa-2">

    <!-- breakSandhi is false -->
    <div v-if="breakSandhi===false"  key="breakSandhiFalse" align="left">
      <!-- render four foots -->
      <span v-for="(item,i) in GET_main_local.foot" :class="`accent${i+1}--text`">
        <span> {{convert(item.foot)}} {{footbreaks[i]}}
          <!-- chapter and verse ids -->
          <!-- <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption"> {{chapter}}|{{verse_id}} </span> -->
          <br/>
        </span>
      </span>
    </div>

    <!-- breakSandhi is true -->
    <div v-else key="breakSandhiTrue" align="left">
      <!-- render words with break at the end of the foot inserted using checkBreak -->
      <span v-for="(item,i) in GET_main_local.word_info" :class="`accent${item.foot}--text`" @click="playSound(item.sanskrit)">
        <span v-if="GET_main_local.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
        <span v-else> {{convert(item.sanskrit)}},</span>
        <span v-if="checkBreak(i,4)"><br/></span>
      </span>
      <!-- chapter and verse ids -->
      <!-- <span :style="options[theme].emphasis.medium"  class="caption"> {{chapter}}|{{verse_id}} </span> -->
    </div>

  </v-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';

export default {
  props: {
    verse_id: Number,
    required: true
  },
  data: () => ({
    footbreaks: ["", "|", "", "||", "", "|"]  // goes to six due to 6 foot verses in chapter 1
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
      return Sanscript.t(myinput, 'iast', this.script);
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
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
