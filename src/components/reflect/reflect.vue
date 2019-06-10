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
      <v-flex class="pa-2 text-xs-center body-2">
      <button>{{GET_salutation}}</button>
      </v-flex>
      <v-flex>
      <verse-menu></verse-menu>
    </v-flex>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>
<chapterCarousel></chapterCarousel>
<v-divider :dark="GET_dark"></v-divider>
<div class="font-weight-light mt-2 pa-1 subheading"> Select action</div>
<v-tabs v-model="activeTab" color="background lighten-1" slider-color="activity" :dark="GET_dark">
    <!-- <v-tab href="#full" ripple class="subheading"> FULL </v-tab> -->
    <v-tab href="#questions" ripple class="subheading"> QUESTIONS </v-tab>
    <!-- <v-tab href="#slides" ripple class="subheading"> SLIDES </v-tab> -->
<v-tabs-items v-model="activeTab" touchless>
<!-- <v-tab-item  lazy transition :value="'full'">  <br> <readfull></readfull>   </v-tab-item> -->
        <v-tab-item  lazy transition :value="'questions'"> <br> <reflectquestions></reflectquestions>  </v-tab-item>
        <!-- <v-tab-item  lazy transition :value="'slides'">  <br> <readslides></readslides>  </v-tab-item> -->
      </v-tabs-items>
        </v-tabs>

<v-divider :dark="GET_dark"></v-divider>

<!-- <firebase-messaging></firebase-messaging>   -->

</div>
</template>

<script>
import chaptermenu from './../reflect/chapter-menu.vue'
import versemenu from './../reflect/verse-menu.vue'
import reflectquestions from './reflect-questions.vue'
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
    },
    activeTab: {
      get() {
        return this.$store.state.parameters.activeTab
      },
      set(value) {
        this.SET_activeTab(value)
      }
  }
},
  methods: {
    ...mapMutations('parameters', ['increment', 'decrement', 'SET_value', 'SET_activeTab']),
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
    chapterCarousel,
    reflectquestions
  }
}
</script>

<style lang="scss">
.trantext {
    column-width: auto;
}
</style>
