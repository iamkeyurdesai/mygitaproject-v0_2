<template>
    <div :style="cssProps">    
<v-subheader :dark="GET_dark"> Select mode </v-subheader>
<v-tabs v-model="activeTab" color="background lighten-1" slider-color="activity" :dark="GET_dark">
    <v-tab href="#chant" ripple class="subheading"> CHANT </v-tab>
    <v-tab href="#listen" ripple class="subheading"> LISTEN </v-tab>
    <v-tab href="#sanskrit" ripple class="subheading">SANSKRIT </v-tab>
<v-tabs-items v-model="activeTab" touchless>
  <!-- v-if="activeTab==='chant'" -->
<v-tab-item  lazy transition :value="'chant'">  <br> <chant-verse></chant-verse>   </v-tab-item>
        <v-tab-item  lazy transition :value="'listen'" > <br> <play-verse></play-verse>  </v-tab-item>
        <v-tab-item  lazy transition :value="'sanskrit'"> <br> <sanskrit-pronounce></sanskrit-pronounce>  </v-tab-item>
      </v-tabs-items>
        </v-tabs>
</div>
</template>

<script>
import chaptermenu from '../reflect/chapter-menu.vue'
import versemenu from '../reflect/verse-menu.vue'
import playverse from './play-verse.vue'
import sanskritpronounce from './sanskrit-pronounce.vue'
import chantverse from './chant-verse.vue'
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
  },
  components: {
    'chapter-menu': chaptermenu,
    'verse-menu': versemenu,
    'play-verse': playverse,
    'chant-verse': chantverse,
    'sanskrit-pronounce': sanskritpronounce,
    chapterCarousel
  },
  beforeDestroy: function () {
}
}
</script>

<style lang="scss">
</style>
