<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <v-layout justify-center>
    <v-card-title class="pa-0 ma-0 font-weight-light warning--text" :style="'color:' + options[theme].emphasis.medium"
    v-show="GET_main_local.speaker!==GET_main_local_prev.speaker"> {{convert(GET_main_local.speaker)}} </v-card-title>
  </v-layout>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_main_chapter']),
    // use verse_id to get specific verse of the main text
    GET_main_local() {
      self = this
      let mytemp = this.GET_main_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    },
    // use verse_id to get specific verse of the main text
    GET_main_local_prev() {
      if(this.verse_id > 1) {
      self = this
      let mytemp = this.GET_main_chapter.filter(function(item) {
        return (item.verse_id === (self.verse_id - 1));
      });
      return mytemp[0];
    } else return false
  }
  },
  methods: {
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
