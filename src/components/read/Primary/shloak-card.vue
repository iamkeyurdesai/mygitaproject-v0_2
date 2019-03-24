<template>
<v-layout justify-center class="myspan">

<v-layout justify-center column>

  <v-layout row align-center justify-center>
<div v-if="!breakSandhi"  align="left">
<span v-for="(item,i) in GET_main_local.foot" :class="`accent${i+1}--text`">
  <span> {{convert(item.foot)}} {{footbreaks[i]}}
    <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption">
    {{chapter}}|{{verse_id}}
    </span>
    <br/> </span>
</span>
</div>
<div v-if="breakSandhi"  align="left" :class="options.fsizeInternal1[fsize]">
  <span v-for="(item,i) in GET_main_local.word_info" :class="`accent${item.foot}--text`" v-on:click="playSound(item.sanskrit)" class="mx-1">
    <span v-if="GET_main_local.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
    <span v-else> {{convert(item.sanskrit)}},</span>
    <span v-if="checkBreak(i,4)"><br/></span>
  </span>
  <span :style="options[theme].emphasis.disabled"  class="caption">
  {{chapter}}|{{verse_id}}
  </span>
</div>
</v-layout>

</v-layout>

</v-layout>

</template>

<script>
import {mapActions} from 'vuex';
import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';
import {mapState} from 'vuex';
import Sanscript from 'Sanscript';

import {Howl, Howler} from 'howler';
export default {
  props: ["verse_id"],
  data: () => ({
    footbreaks: ["", "|", "", "||", "", "|"],
    footNumber: 4
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['main']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi', 'theme', 'script', 'fsize']),
    ...mapGetters('coretext', [ 'GET_main_chapter', 'GET_main']),
    GET_main_local() {
      self = this
      let mytemp = this.GET_main_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      console.log(mytemp[0])
      return mytemp[0];
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement']),
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
    checkBreak(i,j){
      let myflag = false
      let mytemp = this.GET_main_local.word_info[i+1]
      if(!(mytemp === undefined)) {
        if(j==2){
          myflag = (this.GET_main_local.word_info[i].foot < this.GET_main_local.word_info[i+1].foot) &&
          (this.GET_main_local.word_info[i].foot % 2 == 0)
        } else {
          myflag = (this.GET_main_local.word_info[i].foot < this.GET_main_local.word_info[i+1].foot)
        }
      }
      return myflag
    },
    playSound: function (melody) {
         var snd = new Audio();
         snd.src = 'https://gitawebapp.firebaseapp.com/static/assets/audio/mp3/' + melody + '.mp3';
         snd.play()
    }
  }
}
</script>

<style scoped>
.myspan {
  line-height: 1.6em;
  /* font-family: "myfont"; */
}
</style>
