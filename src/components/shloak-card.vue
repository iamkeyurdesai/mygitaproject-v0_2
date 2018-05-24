<template>
  <div class="text-xs-center mydiv1">
    <v-flex xs12>
      <v-layout justify-space-between v-if="opentoolbar">
        <v-icon  v-on:click.stop="opentoolbar=!opentoolbar" class="openicon">add</v-icon>
        <span v-bind:style="{ color: footcolors[6]}">: {{mymain.speaker}} :</span>
        <v-icon v-if="opentoolbar" v-on:click.stop="opentoolbar=!opentoolbar" class="openicon">add</v-icon>
      </v-layout>
        <v-layout justify-space-between v-else>
        <v-icon  v-on:click.stop="opentoolbar=!opentoolbar" class="openicon">clear</v-icon>
       <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="forum">mdi-forum</v-icon>
        <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="language">language</v-icon>
        <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="settings">settings</v-icon>
        <span v-bind:style="{ color: footcolors[6]}">&emsp;: {{mymain.speaker}} :&emsp;</span>
        <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="audio">volume_off</v-icon>
        <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="images">image</v-icon>
        <v-icon v-bind:style="{color: mycolor1}" v-on:click.stop="sandhi">mdi-format-color-text</v-icon>
        <v-icon v-bind:style="{color: mycolor}" v-on:click.stop="sandhi">build</v-icon>
        <!-- <span v-bind:style="{color: 'transparent', textShadow: '0 0 0 ' + mycolor}" v-on:click.stop="sandhi">&#128296</span> -->
      </v-layout>



<div class="elevation-5 mydiv2">
      <div v-if="mymain.chhandaH=='Trishtubh' && !dosandhi"  align="left" v-for="(item,i) in mymain.foot" v-bind:style="{color:footcolors[i]}"> {{item.foot}} {{footbreaks[i]}}
      </div>
      <div v-if="mymain.chhandaH=='Trishtubh' && dosandhi" align="left">
        <span v-for="(item,i) in mymain.word_info" v-bind:style="{color:footcolors[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="mymain.word_info[i+1]=== undefined">  {{item.sanskrit}}{{" ||"}}</span>
          <span v-else> {{item.sanskrit}},</span>
          <span v-if="checkBreak(i,4)"><br/></span>
        </span>
      </div>

      <div v-if="mymain.chhandaH!='Trishtubh' && !dosandhi" align="left" v-for="(item,i) in mymain.stanza" v-bind:style="{color:footcolors[i]}">
        <span v-bind:style="{color:footcolors[0+(i*2)]}">{{mymain.foot[0+(i*2)].foot}}</span>
        <span<span v-bind:style="{color:footcolors[1+(i*2)]}"> {{mymain.foot[1+(i*2)].foot}} {{footbreaks[1+(i*2)]}}</span>
      </div>

      <div v-if="mymain.chhandaH!='Trishtubh' && dosandhi" align="left">
        <span v-for="(item,i) in mymain.word_info" v-bind:style="{color:footcolors[item.foot-1]}" v-on:click="playSound(item.sanskrit)">
          <span v-if="mymain.word_info[i+1]=== undefined">  {{item.sanskrit}}{{" ||"}}</span>
          <span v-else> {{item.sanskrit}},</span>
          <span v-if="checkBreak(i,2)"><br/></span>
        </span>
      </div>

</div>


    </v-flex>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
  data: () => ({
    counter: true,
    footcolors: ["aqua", "gold", "pink", "lawngreen", "blue", "ivory", "yellow"],
    footbreaks: ["", "|", "", "||", "", "|"],
    dosandhi: false,
    mycolor: "grey",
    opentoolbar: true
  }),
  computed: {
    mymain(){
      let mytemp1 = this.$store.state.chapter
      let mytemp2 = this.$store.state.verse
      let mytemp =  this.$store.state.main.filter(function(item) {
        return (item.chapter_id == mytemp1 &&  item.verse_id == mytemp2);
      });
      return mytemp[0];
    }
  },
  methods: {
    setVerse(vid){
      this.$store.state.verse = vid;
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
      let mytemp = this.mymain.word_info[i+1]
      if(!(mytemp === undefined)) {
        if(j==2){
          myflag = (this.mymain.word_info[i].foot < this.mymain.word_info[i+1].foot) &&
          (this.mymain.word_info[i].foot % 2 == 0)
        } else {
          myflag = (this.mymain.word_info[i].foot < this.mymain.word_info[i+1].foot)
        }
      }
      return myflag
    },
    sandhi: function(){
      this.dosandhi = !this.dosandhi;
      if (this.dosandhi) {
        this.mycolor = "white";
      } else  {
        this.mycolor = "grey";
      }
    },
    playSound: function (melody) {
       // var storage = firebase.storage();
       // var pathReference = storage.ref('sounds/mp3/ॐ.mp3');
       // pathReference.getDownloadURL().then(function(url){
         // console.log(url);
         console.log(melody);
         var snd = new Audio();
         snd.src = 'https://gitawebapp.firebaseapp.com/assets/audio/mp3/' + melody + '.mp3';
         console.log(snd.src);
         snd.play()
       // })
       // var snd = new Audio("https://firebasestorage.googleapis.com/v0/b/gitawebapp.appspot.com/o/sounds%2Fmp3%2F%E0%A5%90.mp3?alt=media&token=7fbad31c-09af-4a90-b723-523c8c464d67");
       // snd.play();
       // console.log(melody+'.mp3');
    }
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
