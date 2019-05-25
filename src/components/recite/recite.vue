<template>
<!-- <div v-touch="{
      left: () => increment(),
      right: () => decrement()
    }" :style="cssProps"> -->
    <div :style="cssProps">
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
<chapterCarousel></chapterCarousel>

<v-tabs v-model="active" color="background lighten-1" slider-color="activity" :dark="GET_dark">

    <v-tab href="#listen" ripple > LISTEN </v-tab>
    <v-tab href="#chant" ripple > CHANT </v-tab>
    <v-tab href="#learn" ripple class="secondary--text darken-1"> LEARN </v-tab>

        <v-tab-item  :value="'listen'">  <play-verse></play-verse>  </v-tab-item>
        <v-tab-item  :value="'chant'">  chant  </v-tab-item>
        <v-tab-item  :value="'learn'">  learn  </v-tab-item>
        </v-tabs>

<v-divider :dark="GET_dark"></v-divider>

<!-- <firebase-messaging></firebase-messaging>   -->

</div>
</template>

<script>
import chaptermenu from '../reflect/chapter-menu.vue'
import versemenu from '../reflect/verse-menu.vue'
import playverse from './play-verse.vue'
import firebasemessaging from './firebase-messaging.vue'
import chapterCarousel from './../reflect/chapter-carousel.vue'
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {
active: null
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
    'play-verse': playverse,
    'firebase-messaging': firebasemessaging,
    chapterCarousel
  }
}
</script>

<style lang="scss">
.trantext {
    column-width: auto;
}

</style>
