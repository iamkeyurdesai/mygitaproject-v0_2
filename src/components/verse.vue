<template>
<div id="content">

<div class="ind1"><chapter-menu></chapter-menu></div>
<!-- <div class="strt"><span class="tst1">॥ ॐ श्री परमात्मने नमः ॥</span></div> -->
<div class="strt"><span class="tst1">॥ oṃ śrī paramātmane namaḥ ॥</span></div>

<div class="ind2"> <verse-menu></verse-menu>  </div>

<div class="vers"> <shloak-card></shloak-card> </div>
      <!-- <v-bottom-sheet v-model="sheet">
        <v-btn
        slot="activator"
        flat
        icon
        >
        <v-icon >touch_app</v-icon>
      </v-btn>
          <v-list>
            <span v-for="(i, index) in line1.bdata[mytemp].sanskrit">{{i}} = {{line1.bdata[mytemp].english[index]}}<br></span>
          </v-list>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="sheet">
      <v-btn
      slot="activator"
      flat
      icon
      >
      <v-icon>free_breakfast</v-icon>
    </v-btn>
        <v-list>
          <span v-for="(i, index) in line1.bdata[mytemp].sanskrit">{{i}} = {{line1.bdata[mytemp].english[index]}}<br></span>
        </v-list>
  </v-bottom-sheet> -->

<!-- <div class="nav1a">
<v-speed-dial
     v-model="fab"
     top
     left
     direction="bottom"
     transition="slide-y-reverse-transition"
   >
     <v-btn
       slot="activator"
       v-model="fab"
       color="blue darken-2"
       dark
       fab
       small
     >
       <v-icon>account_circle</v-icon>
       <v-icon>close</v-icon>
     </v-btn>
     <v-btn
       fab
       dark
       small
       color="green"
     >
       <v-icon>edit</v-icon>
     </v-btn>
     <v-btn
       fab
       dark
       small
       color="indigo"
     >
       <v-icon>add</v-icon>
     </v-btn>
     <v-btn
       fab
       dark
       small
       color="red"
     >
       <v-icon>delete</v-icon>
     </v-btn>
   </v-speed-dial>
</div> -->


<!-- <div class="nv1b"> -->
  <!-- <v-btn
  flat
  icon
  v-bind:style="{color: mycolor}"
  v-on:click.stop="sandhi"
  >
  <v-icon>favorite_border</v-icon>
</v-btn> -->
<!-- <v-btn
flat
icon
v-bind:style="{color: mycolor}"
v-on:click.stop="sandhi"
>
<v-icon>gavel</v-icon>
</v-btn>
</div>


<div class="nv2a">

  <v-btn class="nv2a"
  dark
  flat
  icon
  bottom
  left
  color="white"
  v-on:click.native="decrease"
  >
  <v-icon left medium>navigate_before</v-icon>
</v-btn>

</div>

<div class="nv2b">

  <v-btn class="nv2b"
  dark
  flat
  icon
  bottom
  right
  color="white"
  v-on:click.native="increase"
  >
  <v-icon right medium>navigate_next</v-icon>
</v-btn>

</div>


<div class="hdr1">
  <span>{{line1.speaker_dev[mytemp]}}</span>
</div>

<div class="hdr2">
  <span>{{line1.chhandaH[mytemp]}}</span>
</div>



  <div class="vers elevation-5" v-if="counter && mychhandah=='Anushtubh'">

    <span v-bind:style="{ color: footcolors[1]}">{{line1.vdata[mytemp].foot[0]}}</span>
    <span v-bind:style="{ color: footcolors[2]}">{{line1.vdata[mytemp].foot[1]}}</span> । <br>
    <span v-bind:style="{ color: footcolors[3]}">{{line1.vdata[mytemp].foot[2]}}</span>
    <span v-bind:style="{ color: footcolors[4]}">{{line1.vdata[mytemp].foot[3]}}</span> ॥

  </div>
  <div class="vers elevation-5" v-else-if="counter && mychhandah=='Trishtubh'">
    <span v-bind:style="{ color: footcolors[1]}">{{line1.vdata[mytemp].foot[0]}}</span><br>
    <span v-bind:style="{ color: footcolors[2]}">{{line1.vdata[mytemp].foot[1]}}</span> । <br>
    <span v-bind:style="{ color: footcolors[3]}">{{line1.vdata[mytemp].foot[2]}}</span><br>
    <span v-bind:style="{ color: footcolors[4]}">{{line1.vdata[mytemp].foot[3]}}</span> ॥
  </div>
  <div class="vers elevation-5" v-else-if="!counter && mychhandah=='Anushtubh'">
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==1"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==2"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span> । <br>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==3"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==4"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span> ॥
  </div>
  <div class="vers elevation-5" v-else>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==1"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span><br>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==2"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span> । <br>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==3"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span><br>
    <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-if="line1.bdata[mytemp].foot[index]==4"
    :title="line1.bdata[mytemp].sanskrit[index]" data-tippy-trigger="click" data-tippy-maxWidth="60px" data-tippy-size="small"
    :data-tippy-placement="bottom" data-tippy-arrow="true" data-tippy-hideOnClick="false"
    data-tippy-theme="light" v-tippy
    v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}"
    v-on:click="playSound(i)"
    >{{i}}</span> ॥
  </div>



<div class="tran elevation-5">

  <span v-for="(i, index) in line1.bdata[mytemp].sanskrit" v-bind:style="{ color: footcolors[line1.bdata[mytemp].foot[index]]}">
    {{i}} = <span class="span-a">{{line1.bdata[mytemp].english[index]}}</span><br></span> -->
  <!-- <span v-for="i in line2" :style="i.color" :title="i.tiptext" data-tippy-trigger="click"
  :data-tippy-placement="i.tipplace" data-tippy-arrow="true" data-tippy-hideOnClick="false"
  data-tippy-theme="light" v-tippy>{{i.foot}}</span> ॥ -->
<!-- </div> -->
</div>
</template>

<script>
import chaptermenu from './chapter-menu.vue'
import versemenu from './verse-menu.vue'
import shloakcard from './shloak-card.vue'
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
  data: function () {
    return {
      footcolors: ["red", "aqua", "gold", "ivory", "lawngreen"],
      fab: false,
      sheet: false,
      color1: "white",
      counter: true,
      mycolor: "grey",
      mytemp: 0,
      mychhandah: "Anushtubh",
      verseitems: [1, 2, 3, 4, 5, 6, 7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      chapall: [1, 2, 3, 4, 5, 6, 7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      verseall:  [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78] ,
      verseadd: [0, 47, 119, 162, 204, 233, 280, 310, 338, 372, 414, 469, 489, 524, 551, 571, 595, 623]
    }
  },
  computed: {
    mychap(){
      return this.$store.state.chapter
    },
    myverse(){
      return this.$store.state.verse
    },
    line1(){
      return this.$store.state.text;
    }
  },
  watch: {
    // whenever question changes, this function will run
    mychap: function (a, b) {
      // this.verseitems = _.range(1, this.verseall[2]);
      var N = this.verseall[this.mychap-1];
      this.verseitems = Array.from({length: N}, (v, k) => k+1); //for(var i,a=[i=0];i<this.verseitems;a[i++]=i);
      this.myverse = 1;
      this.mytemp = this.verseadd[this.mychap-1] + this.myverse - 1;
      this.mychhandah = this.$store.state.text.chhandaH[this.mytemp];
    },
    myverse: function (a, b) {
      this.mytemp = this.verseadd[this.mychap-1] + this.myverse - 1;
      this.mychhandah = this.$store.state.text.chhandaH[this.mytemp];
    }
  },
  methods: {
    playSound: function (melody) {
       // var storage = firebase.storage();
       // var pathReference = storage.ref('sounds/mp3/ॐ.mp3');
       // pathReference.getDownloadURL().then(function(url){
         // console.log(url);
         var snd = new Audio();
         snd.src = 'https://gitawebapp.firebaseapp.com/assets/audio/mp3/' + melody + '.mp3';
         console.log(snd.src);
         snd.play()
       // })
       // var snd = new Audio("https://firebasestorage.googleapis.com/v0/b/gitawebapp.appspot.com/o/sounds%2Fmp3%2F%E0%A5%90.mp3?alt=media&token=7fbad31c-09af-4a90-b723-523c8c464d67");
       // snd.play();
       // console.log(melody+'.mp3');
    },
    decrease: function(){
      if (this.myverse==1 & this.mychap == 1) {
        this.mychap = 18;
        this.myverse = this.verseall[this.mychap-1];
      } else {
        this.myverse = this.myverse - 1;
        if (this.myverse == 0) {
          this.mychap = this.mychap -1;
          this.myverse = this.verseall[this.mychap-1]
        }
      }
    },
    increase: function(){
      if (this.myverse==this.verseall[this.mychap-1] & this.mychap == 18) {
        this.mychap = 1;
        this.myverse = 1;
      } else {
        this.myverse = this.myverse + 1;
        if (this.myverse > this.verseall[this.mychap-1]) {
          this.mychap = this.mychap + 1;
          this.myverse = 1
        }
      }
    },
    sandhi: function(){
      this.counter = !this.counter;
      if (this.counter) {
        this.mycolor = "grey";
      } else  {
        this.mycolor = "white";
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('loadText')
  },
  components: {
    'chapter-menu': chaptermenu,
    'verse-menu': versemenu,
    'shloak-card': shloakcard,
  }
}
</script>

<style scoped>
#content{
  background: linear-gradient(132deg, #004e92, #004e92);
  background-size: 400% 400%;
  animation: BackgroundGradient 10s ease infinite;

  background: "#5E35B1";  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, "deep-purple darken-1", #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #7E57C2, #5E35B1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: minmax(30px, auto);
  grid-gap: 3px;
  max-width: 960px;
  margin: 0 auto;
  grid-template-areas:
  "ind1 strt strt strt strt strt strt strt ind2 "
  "vers vers vers vers vers vers vers vers vers"
  "vers vers vers vers vers vers vers vers vers"
  "vers vers vers vers vers vers vers vers vers"
  "nv2a nv2a hdr2 hdr2 hdr2 hdr2 hdr2 nv2b nv2b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "nv3a tran tran tran tran tran tran tran nv3b"
  "foot foot foot foot foot foot foot foot foot";
}
/* desktop grid */
@media screen and (min-width: 760px){
  #content{
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(30px, auto);
    grid-gap: 3px;
    max-width: 960px;
    margin: 0 auto;
    grid-template-areas:
    "ind1 ind1 strt strt strt strt strt ind2 ind2"
    "nv1a nv1a hdr1 hdr1 hdr1 hdr1 hdr1 nv1b nv1b"
    "vers vers vers vers vers vers vers vers vers"
    "vers vers vers vers vers vers vers vers vers"
    "nv2a hdr2 hdr2 hdr2 hdr2 hdr2 hdr2 hdr2 nv2b"
    "nv3a tran tran tran tran tran tran tran nv3b"
    "nv3a tran tran tran tran tran tran tran nv3b"
    "nv3a tran tran tran tran tran tran tran nv3b"
    "nv3a tran tran tran tran tran tran tran nv3b"
    "nv3a tran tran tran tran tran tran tran nv3b"
    "foot foot foot foot foot foot foot foot foot";
  }
}
#content > *{
  /* background: black; */
  /* padding: 30px; */
}
.ind1{
  grid-area: ind1;
  justify-self: start;
  align-self: start;
  font-weight: 300;
}
.ind2{
  grid-area: ind2;
  justify-self: end;
  font-weight: 300;
}
.strt{
  grid-area: strt;
  justify-self: center;
  align-self: start;
  color: #FF9A00;
  font-weight: 300;
}
.hdr1{
  grid-area: hdr1;
  justify-self: center;
  align-self: center;
  color: #FF9A00;
}
.nv1a{
  grid-area: nv1a;
  justify-self: center;
  align-self: center;
}
.nv1b{
  grid-area: nv1b;
  justify-self: center;
  align-self: center;
}
.hdr2{
  grid-area: hdr2;
  justify-self: center;
  align-self: end;
  color: #FF9A00;
  margin-bottom: 0;
  margin-top: 0 ;
}
.nv2a{
  grid-area: nv2a;
  justify-self: start;
  align-self: end;
  margin: 0;
}
.nv2b{
  grid-area: nv2b;
  justify-self: end;
  align-self: end;
  margin: 0;
}
.vers{
  grid-area: vers;
  justify-self: center;
  align-self: start;
  color: white;
  font-weight: 300;
}
.tran{
  grid-area: tran;
  justify-self: center;
  align-self: center;
  color: white;
  -webkit-column-count: 2; /* Chrome, Safari, Opera */
  -moz-column-count: 2; /* Firefox */
  column-count: 2;
  column-rule: 1px solid grey;
  column-width: auto;
}
/* @font-face {
  font-family: myfont;
  src: url(../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
} */
span {
  padding-right: 5px;
  font-size: 115%;
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto Condensed'; */
}
.span-a {
  font-size: 95%;
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto Condensed'; */
}

.tst1 {
  font-size: 80%;
  color: white;
}
.myvselect{
  width: 55px;
  color: rgb(115, 65, 74);
}
@keyframes BackgroundGradient {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
</style>
