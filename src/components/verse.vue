<template>
<div id="content">

<v-flex xs12 class="head">
  <v-layout align-content-space-between>
<chapter-menu></chapter-menu>
<v-spacer></v-spacer>
<!-- <div class="strt"><span class="tst1">॥ ॐ श्री परमात्मने नमः ॥</span></div> -->
॥ oṃ śrī paramātmane namaḥ ॥
<v-spacer></v-spacer>
<verse-menu></verse-menu>
</v-layout>
</v-flex>

<v-flex xs12 class="samb">
<v-layout align-content-space-between>
&nbsp;
<v-spacer></v-spacer>
<sambandh-card></sambandh-card>
<v-spacer></v-spacer>
&nbsp;
</v-layout>
<v-divider dark></v-divider>
</v-flex>


<!-- <div class="samb">
<sambandh-card></sambandh-card>
<v-divider dark></v-divider>
</div> -->



<div class="vers"> <shloak-card></shloak-card> </div>

<v-flex xs12 class="bhav">
<v-layout align-content-space-between>
<v-btn color="deep-orange darken-4" dark small fab v-on:click.stop="decrease()"> <v-icon>arrow_back_ios</v-icon></v-btn>
<v-spacer></v-spacer>
<bhavarth-card></bhavarth-card>
<v-spacer></v-spacer>
<v-btn color="deep-orange darken-4" dark small fab v-on:click.stop="increase()"> <v-icon>arrow_forward_ios</v-icon></v-btn>
</v-layout>
<v-divider dark></v-divider>
</v-flex>


<div class="tran elevation-5">
<v-flex xs12>
  <v-layout align-content-space-between>
    <v-btn dark  flat small v-on:click.stop="decreaseColumn()"> <v-icon> remove </v-icon> </v-btn>
    <v-spacer></v-spacer>
  <div class="tranhead text-xs-center">
        Breakdown
      </div>
      <v-spacer></v-spacer>
      <v-btn dark flat small v-on:click.stop="increaseColumn()"><v-icon> add  </v-icon> </v-btn>
    </v-layout>
    <v-divider dark></v-divider>
    </v-flex>
<div class="trantext" v-bind:style="styleObject">
<anvaya-card></anvaya-card>
</div>
</div>

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
      footcolors: ["aqua", "gold", "pink", "lawngreen", "blue", "ivory", "yellow"],
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
      verseadd: [0, 47, 119, 162, 204, 233, 280, 310, 338, 372, 414, 469, 489, 524, 551, 571, 595, 623],
      styleObject: {
        // -webkit-column-count: 2; /* Chrome, Safari, Opera */
        // -moz-column-count: 2; /* Firefox */
        columnCount: 1
  }
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
    },
    decreaseColumn: function(){
      this.styleObject.columnCount -= 1
    },
    increaseColumn: function(){
      this.styleObject.columnCount += 1
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

<style lang="scss" scoped>

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
  "head head head head head head head head head"
  "samb samb samb samb samb samb samb samb samb"
  "vers vers vers vers vers vers vers vers vers"
  "vers vers vers vers vers vers vers vers vers"
  "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
  "nv1a tran tran tran tran tran tran tran nv1b"
  "nv1a tran tran tran tran tran tran tran nv1b"
  "nv1a tran tran tran tran tran tran tran nv1b"
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
    "head head head head head head head head head"
    "samb samb samb samb samb samb samb samb samb"
    "vers vers vers vers vers vers vers vers vers"
    "vers vers vers vers vers vers vers vers vers"
    "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "foot foot foot foot foot foot foot foot foot";
  }
}
#content > *{
  /* background: black; */
  /* padding: 30px; */
}
.head{
  grid-area: head;
  font-weight: 300;
  color: white;
}
.nv1a{
  grid-area: nv1a;
  /* margin: 0; */
  /* justify-self: center;
  align-self: center; */
}
.nv1b{
  grid-area: nv1b;
  /* margin: 0; */
  /* justify-self: center;
  align-self: center; */
}
.samb{
  grid-area: samb;
  /* justify-self: center; */
  /* align-self: center; */
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
  /* justify-self: center;
  align-self: start; */
  color: white;
  font-weight: 300;
}
.tran{
  grid-area: tran;
  margin-top: 5px;
}
.tranhead{
  color: yellow;
}
.trantext{
  column-rule: 1px solid grey;
  column-width: auto;
  font-weight: 300;
}

@font-face {
  font-family: myfont;
  src: url(../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
}
span {
  padding-right: 5px;
  font-size: 115%;
  /* word-spacing: -0.05em; */
  font-family: "myfont", 'Roboto Condensed';
}
.span-a {
  font-size: 95%;
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto Condensed'; */
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
