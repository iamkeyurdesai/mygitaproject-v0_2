<template>
<v-layout justify-center class="myspan">

<v-layout justify-center column>
<v-layout justify-center>
  <settings-popup></settings-popup>
  <!-- <span class="px-3" :class="{active: ${this.classObject==-1}}"> {{convert(GET_main.speaker)}} </span> -->
  <span class="px-3" :class="{active: this.classObject==-1}"> {{convert(GET_main.speaker)}} </span>
  <v-btn v-on:click="saveSoundPos(-1)"> Uvach</v-btn>
</v-layout>

  <v-layout row align-center justify-center>
<div  align="left">
<span v-for="(item,i) in GET_main.foot" :class="`accent${i+1}--text`">
    <span :class="{active: classObject===i}"> {{convert(item.foot)}} {{footbreaks[i]}}
    <span v-if="i==3" :style="options[theme].emphasis.medium" class="caption">
    {{chapter}}|{{verse}}
    </span>
    <v-btn v-on:click="saveSoundPos(i)" :class="`accent${i+1}`"> foot{{i}}</v-btn>
    <br/> </span>
</span>
</div>
</v-layout>
<div>
<v-btn v-on:click="loadSoundFull()"> Load</v-btn>
<v-btn v-on:click="mysound.play()"> Play</v-btn>
<v-btn v-on:click="mysound.pause()"> Pause</v-btn>
</div>
{{mytracking1}}
{{myAnn}}
</v-layout>
</v-layout>


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
    footNumber: 4,
    mysound: null,
    mytrackingOn: false,
    mytracking: null,
    mytracking1: null,
    myAnn: {
    mytime: [0, 10, 20, 30, 40],
    myverse: [1, 1, 1, 1, 1],
    myfoot: [-1, 0, 1, 2, 3]
  }
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['main']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi', 'theme', 'script', 'slines', 'fsize']),
    ...mapGetters('coretext', [ 'GET_main']),
    classObject:  function () {
        /**
* Returns the closest smallest number from a sorted array.
**/
function closest(arr, target) {
    if (!(arr) || arr.length == 0)
        return null;
    if (arr.length == 1)
        // return arr[0];
        return 0;
    for (var i=1; i<arr.length; i++) {
        // As soon as a number bigger than target is found, return the previous index
        if (arr[i] > target) return i-1
    }
    // No number in array is bigger so return the last.
    return arr.length-1;
}
if ( this.myAnn.mytime.length > 0) return this.myAnn.myfoot[closest(this.myAnn.mytime, this.mytracking1)]
}
},
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'increment', 'decrement', 'SET_chapter', 'SET_verse']),
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
    loadSoundFull: function () {
    console.log(this.mytrackingOn)
         self = this
         let mylink = 'https://gitawebapp.firebaseapp.com/static/assets/audio/full/gita' + this.chapter + '.mp3';
         this.mysound = new Howl({
  src: [mylink],
  onload: function() {
    // this.mytrackingOn = true
    // if(this.mytrackingOn === true) {
    this.mytracking = setInterval(myTimer, 1000)
    function myTimer() {
      self.mytracking1 = self.mysound.seek()
      console.log(self.mysound.seek())
    }
// }
//     console.log(this.mytrackingOn)
  },
  autoplay: true
  // ,
  // sprite: {
  //   blast: [60000, 100000]
  // }
});
this.SET_verse(1)
// this.mysound.play()
// function myFunction(item,index,arr) {
//   arr[index] = item + 4.421333;
// }
// this.myAnn.mytime.forEach(myFunction)
// this.mytrackingOn = setInterval(myTimer, 1000)
},
    saveSoundPos: function (myval) {
      this.myAnn.mytime.push(this.mysound.seek())
      this.myAnn.myverse.push(this.verse)
      this.myAnn.myfoot.push(myval)
    // console.log(this.myAnn)
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
.myspan {
  line-height: 3.6em;
  /* font-family: "myfont"; */
}
.active {
  font-size: 2rem;
  border-left: 5px solid red;
}
</style>
