<template>
<v-layout justify-center class="myspan">
  <!-- <v-layout column justify-end align-start align-content-start>
    </v-layout> -->

<v-layout justify-center column>
<v-layout justify-center>
  <settings-popup></settings-popup>
  <span class="px-3"> {{convert(GET_main.speaker)}} </span>
  <v-icon :style="this.options[this.theme].emphasis.medium" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)"> gavel</v-icon>
  <v-icon :style="this.options[this.theme].emphasis.high" v-if="breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)"> gavel</v-icon>
</v-layout>


  <v-layout row align-center justify-center>
<div v-if="!breakSandhi"  align="left">
<span v-for="(item,i) in GET_main.foot" :class="`accent${i+1}--text`">
  <span> {{convert(item.foot)}} {{footbreaks[i]}}
    <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption">
    {{chapter}}|{{verse}}
    </span>
    <br/> </span>
</span>
</div>
<div v-if="breakSandhi"  align="left" :class="options.fsizeInternal1[fsize]">
  <span v-for="(item,i) in GET_main.word_info" :class="`accent${item.foot}--text`" v-on:click="playSound(item.sanskrit)" class="mx-1">
    <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
    <span v-else> {{convert(item.sanskrit)}},</span>
    <span v-if="checkBreak(i,4)"><br/></span>
  </span>
  <span :style="options[theme].emphasis.disabled"  class="caption">
  {{chapter}}|{{verse}}
  </span>
</div>
</v-layout>

</v-layout>

<!-- <v-layout column caption justify-end align-start align-content-start> -->
<!-- <div class="ml-1" :style="options[theme].emphasis.disabled"> -->
<!-- {{chapter}}|{{verse}} -->
<!-- </div> -->
<!-- </v-layout> -->

</v-layout>

<!-- </div> -->
      <!-- <div v-if="slines=='auto'"> -->
      <!-- <div v-if="GET_main.chhandaH=='Trishtubh' && !breakSandhi"  align="left" v-for="(item,i) in GET_main.foot" v-bind:style="{color:options[theme].textAccent1[i]}">
        {{convert(item.foot)}} {{footbreaks[i]}}
      </div>
      <div v-if="GET_main.chhandaH=='Trishtubh' && breakSandhi" align="left">
        <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
          <span v-else> {{convert(item.sanskrit)}},</span>
          <span v-if="checkBreak(i,4)"><br/></span>
        </span>
      </div> -->

      <!-- <div v-if="GET_main.chhandaH!='Trishtubh' && !breakSandhi" align="left" v-for="(item,i) in GET_main.stanza" v-bind:style="{color:options[theme].textAccent1[i]}">
        <span v-bind:style="{color:options[theme].textAccent1[0+(i*2)]}">{{convert(GET_main.foot[0+(i*2)].foot)}}</span>
        <span<span v-bind:style="{color:options[theme].textAccent1[1+(i*2)]}"> {{convert(GET_main.foot[1+(i*2)].foot)}} {{footbreaks[1+(i*2)]}}</span>
      </div>

      <div v-if="GET_main.chhandaH!='Trishtubh' && breakSandhi" align="left">
        <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
          <span v-else> {{convert(item.sanskrit)}},</span>
          <span v-if="checkBreak(i,2)"><br/></span>
        </span>
      </div> -->
    <!-- </div> -->
      <!-- <div v-if="slines=='4x'">
        <div v-if="!breakSandhi"  align="left" v-for="(item,i) in GET_main.foot" v-bind:style="{color:options[theme].textAccent1[i]}">
          {{convert(item.foot)}} {{footbreaks[i]}}
        </div>
        <div v-if="breakSandhi" align="left">
          <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
            <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
            <span v-else> {{convert(item.sanskrit)}},</span>
            <span v-if="checkBreak(i,4)"><br/></span>
          </span>
        </div>
        </div> -->
        <!-- <div v-if="slines=='2x'">
          <div v-if="!breakSandhi" align="left" v-for="(item,i) in GET_main.stanza" v-bind:style="{color:options[theme].textAccent1[i]}">
            <span v-bind:style="{color:options[theme].textAccent1[0+(i*2)]}">{{convert(GET_main.foot[0+(i*2)].foot)}}</span>
            <span<span v-bind:style="{color:options[theme].textAccent1[1+(i*2)]}"> {{convert(GET_main.foot[1+(i*2)].foot)}} {{footbreaks[1+(i*2)]}}</span>
          </div>

          <div v-if="breakSandhi" align="left">
            <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
              <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
              <span v-else> {{convert(item.sanskrit)}},</span>
              <span v-if="checkBreak(i,2)"><br/></span>
            </span>
          </div>
          </div> -->
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
    footbreaks: ["", "|", "", "||", "", "|"],
    footNumber: 4
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['main']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi', 'theme', 'script', 'slines', 'fsize']),
    ...mapGetters('coretext', [ 'GET_main'])
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
      let mytemp = this.GET_main.word_info[i+1]
      if(!(mytemp === undefined)) {
        if(j==2){
          myflag = (this.GET_main.word_info[i].foot < this.GET_main.word_info[i+1].foot) &&
          (this.GET_main.word_info[i].foot % 2 == 0)
        } else {
          myflag = (this.GET_main.word_info[i].foot < this.GET_main.word_info[i+1].foot)
        }
      }
      return myflag
    },
    playSound: function (melody) {
         var snd = new Audio();
         snd.src = 'https://gitawebapp.firebaseapp.com/static/assets/audio/mp3/' + melody + '.mp3';
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
  line-height: 1.6em;
  /* font-family: "myfont"; */
}
</style>
