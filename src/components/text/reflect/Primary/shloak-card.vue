<template>
  <div class="text-xs-center mydiv1">
    <v-flex xs12>
<v-layout justify-space-between>
  <settings-popup></settings-popup>
  <v-icon v-bind:style="{color:forum_color}" v-on:click.stop="forum">mdi-forum</v-icon>
  <span>: {{convert(GET_main.speaker)}} :</span>
  <v-icon v-bind:style="{color:image_color}" v-on:click.stop="images">image</v-icon>
  <v-icon v-bind:style="{color:build_color}" v-on:click.stop="sandhi">build</v-icon>
</v-layout>

<div class="elevation-1 mydiv2">
      <div v-if="GET_main.chhandaH=='Trishtubh' && !breakSandhi"  align="left" v-for="(item,i) in GET_main.foot" v-bind:style="{color:options[theme].textAccent1[i]}">
        {{convert(item.foot)}} {{footbreaks[i]}}
      </div>
      <div v-if="GET_main.chhandaH=='Trishtubh' && breakSandhi" align="left">
        <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
          <span v-else> {{convert(item.sanskrit)}},</span>
          <span v-if="checkBreak(i,4)"><br/></span>
        </span>
      </div>

      <div v-if="GET_main.chhandaH!='Trishtubh' && !breakSandhi" align="left" v-for="(item,i) in GET_main.stanza" v-bind:style="{color:options[theme].textAccent1[i]}">
        <span v-bind:style="{color:options[theme].textAccent1[0+(i*2)]}">{{convert(GET_main.foot[0+(i*2)].foot)}}</span>
        <span<span v-bind:style="{color:options[theme].textAccent1[1+(i*2)]}"> {{convert(GET_main.foot[1+(i*2)].foot)}} {{footbreaks[1+(i*2)]}}</span>
      </div>

      <div v-if="GET_main.chhandaH!='Trishtubh' && breakSandhi" align="left">
        <span v-for="(item,i) in GET_main.word_info" v-bind:style="{color:options[theme].textAccent1[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="GET_main.word_info[i+1]=== undefined">  {{convert(item.sanskrit)}}{{" ||"}}</span>
          <span v-else> {{convert(item.sanskrit)}},</span>
          <span v-if="checkBreak(i,2)"><br/></span>
        </span>
      </div>

</div>


    </v-flex>
  </div>
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
    build_color: 'black',
    forum_color: 'black',
    image_color: 'black'
  }),
  mounted() {
    //do something after mounting vue instance
    this.build_color = this.options[this.theme].iconEnabled;
    this.forum_color = this.options[this.theme].iconDisabled;
    this.image_color = this.options[this.theme].iconDisabled;
  },
  computed: {
    ...mapState('settings', ['options', 'theme', 'language']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi']),
    ...mapGetters('coretext', [ 'GET_main'])
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi']),
    convert(myinput){
          return Sanscript.t(myinput, 'iast', this.language);
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
    sandhi: function(){
      this.SET_breakSandhi(!this.breakSandhi)
      if (this.breakSandhi) {
        this.build_color = this.options[this.theme].iconActive;
      } else  {
        this.build_color = this.options[this.theme].iconEnabled;
      }
    },
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
    }
  },
  components: {
    'settings-popup': settingspopup
  }
}
</script>

<style scoped>
.mydiv1 {
  font-size: 100%;
}
.mydiv2 {
  padding: 5px;
  font-size: 110%;
}

.openicon {
     color: white;
    -webkit-animation-name: openicon; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 10s; /* Safari 4.0 - 8.0 */
    animation-name: openicon;
    animation-duration: 10s;
    animation-iteration-count:10;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes openicon {
    from {color: red;}
    to {color: green;}
}
/* Standard syntax */
@keyframes openicon {
    from {color: red;}
    to {color: green;}
}
</style>
