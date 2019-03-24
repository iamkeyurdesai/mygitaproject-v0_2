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
          <bowl mywidth="75" myfill="15" mycolor="accent2"></bowl>          
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
        <bowl mywidth="75" myfill="50" mycolor="accent4"></bowl>
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
import bowl from './bowl.vue'
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
    'bhavarth-card': bhavarthcard,
    'bowl': bowl
  }
}
</script>

<style lang="scss">
.trantext {
    column-width: auto;
}
// var(--mywidth): var(--mywidth);
// var(--mywidth): var(--mywidth);
// .bowl {
//   position: relative;
//   border-radius: 50%;
//   width: var(--mywidth);
//   height: var(--mywidth);
//   box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
//   background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
//   background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
//   background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
//   margin: 20px;
//   &:before {
//     overflow: hidden;
//     border-radius: 50%;
//     content: "";
//     box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
//     background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
//     background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
//     background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.65) 81%, #000000 100%);
//     position: absolute;
//     width: var(--mywidth);
//     height: var(--mywidth);
//     z-index: 2;
//   }
//   &:after {
//     content: "";
//     width: var(--mywidth) / 2.5;
//     border-radius: 50%;
//     height: 10px;
//     background: #039be4;
//     box-shadow: inset 0 0 10px 0 #000;
//     position: absolute;
//     left: 50%;
//     margin-left: -((var(--mywidth) / 2.5) /2);
//     bottom: 0;
//     z-index: 2;
//   }
//   & .inner {
//     border-radius: 50%;
//     width: var(--mywidth);
//     height: var(--mywidth);
//     background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
//     background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
//     background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
//     overflow: hidden;
//     -webkit-backface-visibility: hidden;
//     -webkit-transform: translate3d(0, 0, 0);
//     &:before {
//       content: "";
//       width: 20px;
//       height: 20px;
//       background: rgba(255, 255, 255, 0.2);
//       border-radius: 50%;
//       position: absolute;
//       right: 40%;
//       top: 60%;
//       z-index: 2;
//     }
//     &:after {
//       content: "";
//       width: 20px;
//       height: 40px;
//       background: rgba(255, 255, 255, 0.2);
//       border-radius: 50%;
//       position: absolute;
//       right: 30%;
//       top: 15%;
//       transform: rotate(-20deg);
//       z-index: 2;
//     }
//   }
//   & .fill {
//     animation-name: fillAction;
//     animation-iteration-count: 1;
//     animation-timing-function: cubic-bezier(0.2, 0.6, 0.8, 0.4);
//     animation-duration: 4s;
//     animation-fill-mode: forwards;
//   }
//   & .waveShape {
//     overflow: hidden;
//     animation-name: waveAction;
//     animation-iteration-count: infinite;
//     animation-timing-function: linear;
//     animation-duration: 0.5s;
//     width: var(--mywidth) ;
//     height: var(--mywidth);
//     // fill: #039be4;
//     fill: var(--bg-hover-color);
//   }
// }
//
// @keyframes fillAction {
//   0% {
//     transform: translate(0, var(--mywidth));
//   }
//   100% {
//     transform: translate(0, var(--myfill));
//   }
// }
//
// @keyframes waveAction {
//   0% {
//     transform: translate(-50%, 0);
//   }
//   100% {
//     transform: translate(0, 0);
//   }
// }

</style>
