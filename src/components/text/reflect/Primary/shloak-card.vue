<template>

<div class="text-xs-center">
<v-layout justify-center>
  <settings-popup></settings-popup>
  <span class="px-3"> {{convert(GET_main.speaker)}} </span>
  <v-icon :style="this.options[this.theme].emphasis.medium" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)"> gavel</v-icon>
  <v-icon :style="this.options[this.theme].emphasis.high" v-if="breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)"> gavel</v-icon>
</v-layout>
<v-btn @click="myAdd()">YES</v-btn>
<v-layout column align-center justify-sapce-between>
<div v-if="!breakSandhi"  align="left">
<span v-for="(item,i) in GET_main.foot" :class="`accent${i+1}--text`">
  <span> {{convert(item.foot)}} {{footbreaks[i]}} <br/> </span>
</span>
</div>
<div v-if="breakSandhi"  align="left">
  <!-- <span v-for="(item,i) in GET_main.word_info" :class="`accent${item.foot}--text`" v-on:click="playSound(item.sanskrit)"> -->
    <span v-for="(item,i) in GET_main_local.word_info" :class="`accent${item.foot}--text`" class="pa-1 ma-1" v-on:click="myUpdate(i,footNumber)">
    <span v-if="GET_main_local.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
    <span v-else> {{convert(item.sanskrit)}},</span>
    <span v-if="checkBreak(i,4)"><br/></span>
  </span>
  <v-card>
  <v-radio-group v-model="footNumber" row>
    foot number:
    <v-radio v-for="item in 4" v-bind:label="''+item" v-bind:value="item" :key="item + '_key'"></v-radio>
  </v-radio-group>
</v-card>
{{footNumber}}
</div>
</v-layout>
</div>
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




    <!-- </div> -->
</template>

<script>
import {mapActions} from 'vuex';
import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';
import {mapState} from 'vuex';
import Sanscript from 'Sanscript';
import settingspopup from '../../../settings/settings-popup.vue'
export default {
  data: () => ({
    footbreaks: ["", "|", "", "||", "", "|"],
    footNumber: 4
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['main']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi', 'theme', 'script', 'slines']),
    ...mapGetters('coretext', [ 'GET_main']),
    GET_main_local() {
      return Object.assign({}, this.GET_main)
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
    // sandhi: function(){
    //   this.SET_breakSandhi(!this.breakSandhi)
    //   if (this.breakSandhi) {
    //     this.build_color = this.options[this.theme].iconActive;
    //   } else  {
    //     this.build_color = this.options[this.theme].iconEnabled;
    //   }
    // },
    playSound: function (melody) {
       // var storage = firebase.storage();
       // var pathReference = storage.ref('sounds/mp3/ॐ.mp3');
       // pathReference.getDownloadURL().then(function(url){
         // console.log(url);
         console.log(melody);
         var snd = new Audio();
         snd.src = 'https://gitawebapp.firebaseapp.com/static/assets/audio/mp3/' + melody + '.mp3';
         console.log(snd.src);
         snd.play()
       // })
       // var snd = new Audio("https://firebasestorage.googleapis.com/v0/b/gitawebapp.appspot.com/o/sounds%2Fmp3%2F%E0%A5%90.mp3?alt=media&token=7fbad31c-09af-4a90-b723-523c8c464d67");
       // snd.play();
       // console.log(melody+'.mp3');
    },
    addWordIndex() {
      var db = firebase.firestore();
      // db.collection("wordIndex").add({
      //     chapter: this.chapter,
      //     verse: this.verse,
      //     i: val
      //   })
      db.collection("mymain").doc("c"+this.chapter+"v"+this.verse).set(this.GET_main)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch(function(error) {
      //     console.error("Error adding document: ", error);
      //   });
    },
    myUpdate(i, j) {
      // this.$store.state.coretext.mymain.word_info[i].foot = parseInt(j);
      // this.SET_main_foot({i:i, j:j});
      this.GET_main_local.word_info[i].foot = parseInt(j);
    },
    myAdd(i) {
      this.addWordIndex();
      this.increment()
    }
  },
  components: {
    'settings-popup': settingspopup
  }
}
</script>

<style scoped>
</style>
