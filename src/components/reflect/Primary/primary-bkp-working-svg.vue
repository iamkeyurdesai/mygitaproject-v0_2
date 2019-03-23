<template>
<div v-touch="{
      left: () => increment(),
      right: () => decrement()
    }" :style="cssProps">
  <!-- header containing chapter, verse and salutation -->


    <v-layout justify-space-between row wrap>
      <v-flex>
      <chapter-menu></chapter-menu>
      </v-flex>
      <v-flex class="pa-2 text-xs-center">
      <button>{{GET_salutation}}</button>
      </v-flex>
      <v-flex>
      <verse-menu></verse-menu>
    </v-flex>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>


  <!-- sambandh component-->
      <v-layout justify-center row class="pa-2">
          <sambandh-card></sambandh-card>
        <v-divider vertical :dark="GET_dark"></v-divider>

        <div class="ma-1 pa-1">
          <div class="bowl ma-0 pa-0">
    <div class="inner">
      <div class="fill">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300">
          <path class="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
  	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
  	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"/></path>
        </svg>

        <!-- <svg width="100" height="100">
   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
   Sorry, your browser does not support inline SVG.
</svg> -->

      </div>
    </div>
  </div>

    <span class="pl-2"> Anatman </span>

        </div>

              </v-layout>
        <v-divider :dark="GET_dark"></v-divider>


  <!-- verse component; fairly complex rendering and styling inside -->

<shloak-card></shloak-card>
<v-divider :dark="GET_dark"></v-divider>


  <!-- bhavarth (meaning) component -->

  <v-layout justify-center row class="pa-2">
      <div class="ml-1 pa-2">
        graphics
      </div>
      <v-divider vertical :dark="GET_dark"></v-divider>
      <bhavarth-card class="ml-2"></bhavarth-card>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>

  <!-- anvaya (breakdown) component, farily complex rednering and styling inside -->


<v-layout justify-center align-center row>
    <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom left fixed v-on:click.stop="decrement()" class="my-5">
  <v-icon>arrow_back_ios</v-icon>
  </v-icon>
</v-btn> -->
  <v-btn  :dark="GET_dark" flat small v-on:click.stop="decreaseColumn()">
  <v-icon>remove</v-icon>
  </v-btn>
  <div>
  Breakdown
  </div>
  <v-btn  :dark="GET_dark" flat small v-on:click.stop="increaseColumn()">
  <v-icon>add</v-icon>
  </v-btn>
  <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom right fixed v-on:click.stop="increment()" class="my-5">
<v-icon>arrow_forward_ios</v-icon>
</v-icon>
</v-btn> -->
</v-layout>
<v-divider :dark="GET_dark"></v-divider>
<v-layout justify-center row class="px-5">
<div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #FFFFFF5F'} ]" v-if="this.GET_dark">
<anvaya-card></anvaya-card>
</div>
<div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #0000005F'}]" v-else>
<anvaya-card></anvaya-card>
</div>
</v-layout>

</div>
</template>

<script>
import chaptermenu from '../chapter-menu.vue'
import versemenu from '../verse-menu.vue'
import sambandhcard from './sambandh-card.vue'
import shloakcard from './shloak-card.vue'
import bhavarthcard from './bhavarth-card.vue'
import anvayacard from './anvaya-card.vue'

import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      accentColor: "red",
      styleAnvaya: {
        columnCount: 2
      }
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language']),
    ...mapGetters('coretext', ['GET_salutation']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() { return {
        '--bg-hover-color': this.$vuetify.theme.accent1,
			  '--hover-content': JSON.stringify(this.hoverContent),
        '--mywidth': "75px",
        '--myfill': "25px"
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['increment', 'decrement', 'SET_value']),
    decreaseColumn: function() {
      if(this.styleAnvaya.columnCount > 1) this.styleAnvaya.columnCount -= 1
    },
    increaseColumn: function() {
      if(this.styleAnvaya.columnCount <4 ) this.styleAnvaya.columnCount += 1
    },
    changeTheme(val){
      console.log(this.$vuetify)
      this.$vuetify.theme = Object.assign({}, this.options["lakshmi"].theme)
      console.log(this.$vuetify)
    }
  },
  beforeRouteEnter(to, from, next) {
    // Pass a callback to next (optional)
    // next(vm => {})
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
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

<style lang="scss">
.trantext {
    column-width: auto;
}
$width: 100px;
$height: $width;
.bowl {
  position: relative;
  border-radius: 50%;
  width: $width;
  height: $height;
  box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
  background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
  background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
  margin: 20px;
  &:before {
    overflow: hidden;
    border-radius: 50%;
    content: "";
    box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
    background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
    background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.65) 81%, #000000 100%);
    position: absolute;
    width: $width;
    height: $height;
    z-index: 2;
  }
  &:after {
    content: "";
    width: $width / 2.5;
    border-radius: 50%;
    height: 10px;
    background: #039be4;
    box-shadow: inset 0 0 10px 0 #000;
    position: absolute;
    left: 50%;
    margin-left: -(($width / 2.5) /2);
    bottom: 0;
    z-index: 2;
  }
  & .inner {
    border-radius: 50%;
    width: $width;
    height: $height;
    background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
    background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    &:before {
      content: "";
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      position: absolute;
      right: 40%;
      top: 60%;
      z-index: 2;
    }
    &:after {
      content: "";
      width: 20px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      position: absolute;
      right: 30%;
      top: 15%;
      transform: rotate(-20deg);
      z-index: 2;
    }
  }
  & .fill {
    animation-name: fillAction;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.2, 0.6, 0.8, 0.4);
    animation-duration: 4s;
    animation-fill-mode: forwards;
  }
  & .waveShape {
    animation-name: waveAction;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 0.5s;
    width: $width * 2;
    height: $height;
    fill: #039be4;
  }
}

@keyframes fillAction {
  0% {
    transform: translate(0, $width);
  }
  100% {
    transform: translate(0, 10px);
  }
}

@keyframes waveAction {
  0% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
/* For aesthetics only ------------------------------------------*/

body {
  margin: 0;
  font-family: Segoe, "Segoe UI", "DejaVu Sans", "Trebuchet MS", Verdana, sans-serif;
}

h1 {
  font: 200 1.2em "Segoe UI Light", "DejaVu Sans", "Trebuchet MS", Verdana, sans-serif;
  font-weight: 200;
  color: #fff;
  background: #039be4;
  padding: 20px;
  margin: 0;
  border-bottom: 10px solid #ccc;
}

h1 strong {
  font-family: "Segoe UI Black";
  font-weight: normal;
}

.explanation {
  padding: 20px 40px;
  float: right;
  background: #e64a19;
  -webkit-box-shadow: inset 0 30px 3px 0 rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.2);
  border-bottom: 10px solid #ccc;
  max-width: 300px;
}

.explanation p {
  color: #fff;
  font-size: 0.8rem;
}
</style>
