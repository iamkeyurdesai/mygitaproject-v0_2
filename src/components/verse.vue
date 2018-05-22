<template>
<div id="content">

<div class="ind1"><chapter-menu></chapter-menu></div>
<!-- <div class="strt"><span class="tst1">॥ ॐ श्री परमात्मने नमः ॥</span></div> -->
<div class="strt"><span class="tst1">॥ oṃ śrī paramātmane namaḥ ॥</span></div>

<div class="ind2"> <verse-menu></verse-menu>  </div>

<div class="samb"> <sambandh-card></sambandh-card> </div>

<div class="vers"> <shloak-card></shloak-card> </div>

<div class="bhav"> <bhavarth-card></bhavarth-card> </div>
<div class="nv1a">
<v-btn color="deep-orange darken-4" dark small fab v-on:click.stop="decrease()"> <v-icon>arrow_back_ios</v-icon></v-btn>
</div>
<div class="nv1b">
<v-btn color="deep-orange darken-4" dark small fab v-on:click.stop="increase()"> <v-icon>arrow_forward_ios</v-icon></v-btn>
</div>

<div class="tran elevation-5"> <anvaya-card></anvaya-card> </div>

<v-btn color="teal darken-2" dark small absolute bottom right fab> <v-icon>👏</v-icon></v-btn>

</div>
</template>

<script>
import chaptermenu from './chapter-menu.vue'
import versemenu from './verse-menu.vue'
import shloakcard from './shloak-card.vue'
import anvayacard from './anvaya-card.vue'
import sambandhcard from './sambandh-card.vue'
import bhavarthcard from './bhavarth-card.vue'
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
  methods: {
    increase: function(){
      let mytemp1 = this.$store.state.chapter
      let mytemp2 = this.$store.state.verse
      if (mytemp2 < this.verseall[mytemp1-1])
      {
        this.$store.state.verse += 1
      } else {
        this.$store.state.chapter += 1
        if (this.$store.state.chapter > 18) this.$store.state.chapter = 1
        this.$store.state.verse = 1
      }
    },
    decrease: function(){
      let mytemp1 = this.$store.state.chapter
      let mytemp2 = this.$store.state.verse
      if (mytemp2 != 1)
      {
        this.$store.state.verse -= 1
      } else {
        this.$store.state.chapter -= 1
        if (this.$store.state.chapter < 1) this.$store.state.chapter = 18
        this.$store.state.verse = this.verseall[this.$store.state.chapter-1]
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
    'anvaya-card': anvayacard,
    'sambandh-card': sambandhcard,
    'bhavarth-card': bhavarthcard
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
  grid-gap: 10px;
  max-width: 960px;
  margin: 0 auto;
  grid-template-areas:
  "ind1 strt strt strt strt strt strt strt ind2"
  "samb samb samb samb samb samb samb samb samb"
  "vers vers vers vers vers vers vers vers vers"
  "nv1a bhav bhav bhav bhav bhav bhav bhav nv1b"
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
    "ind1 strt strt strt strt strt strt strt ind2"
    "samb samb samb samb samb samb samb samb samb"
    "vers vers vers vers vers vers vers vers vers"
    "nv1a bhav bhav bhav bhav bhav bhav bhav nv1b"
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
.samb{
  grid-area: samb;
  justify-self: center;
  align-self: start;
  color: white;
  font-weight: 300;
}
.vers{
  grid-area: vers;
  justify-self: center;
  align-self: start;
  color: white;
  font-weight: 300;
}
.bhav{
  grid-area: bhav;
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
  font-weight: 300;
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
