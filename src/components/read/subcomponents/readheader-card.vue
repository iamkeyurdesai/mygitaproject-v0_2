<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <div>

    <!-- verse id -->
    <span class="title ma-2 font-weight-light" :style="options[theme].emphasis.medium">{{verse_id}}</span>

    <!-- showLink -->
    <v-btn flat small icon v-if="!showLink" v-on:click.stop="SET_showLink(!showLink)">
      <span :style="options[theme].emphasis.medium"> L </span>
    </v-btn>
    <v-btn flat small icon v-else v-on:click.stop="SET_showLink(!showLink)">
      <span :style="options[theme].emphasis.high"> L </span>
    </v-btn>

    <!-- showTranslation -->
    <v-btn flat small icon v-if="!showTranslation" v-on:click.stop="SET_showTranslation(!showTranslation)">
      <span :style="options[theme].emphasis.medium"> T </span>
    </v-btn>
    <v-btn flat small icon v-else v-on:click.stop="SET_showTranslation(!showTranslation)">
      <span :style="options[theme].emphasis.high"> T </span>
    </v-btn>

    <!-- showAnvaya -->
    <v-btn flat small icon v-if="!showAnvaya" v-on:click.stop="SET_showAnvaya(!showAnvaya)">
      <span :style="options[theme].emphasis.medium"> A </span>
    </v-btn>
    <v-btn flat small icon v-else v-on:click.stop="SET_showAnvaya(!showAnvaya)">
      <span :style="options[theme].emphasis.high"> A </span>
    </v-btn>

    <!-- showVerse -->
    <v-btn flat small icon v-if="!showVerse" v-on:click.stop="SET_showVerse(!showVerse)">
      <span :style="options[theme].emphasis.medium"> V </span>
    </v-btn>
    <v-btn flat small icon v-else v-on:click.stop="SET_showVerse(!showVerse)">
      <span :style="options[theme].emphasis.high"> V </span>
    </v-btn>

    <!-- breakSandhi -->
    <v-btn flat small icon v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
      <v-icon :style="options[theme].emphasis.medium"> gavel</v-icon>
    </v-btn>
    <v-btn flat small icon  v-else v-on:click.stop="SET_breakSandhi(!breakSandhi)">
      <v-icon :style="options[theme].emphasis.high" small> gavel</v-icon>
    </v-btn>

    <!-- add to favorite -->
    <v-btn flat small icon> <v-icon small>favorite_border</v-icon> </v-btn>

  </div>
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
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse']),
    ...mapGetters('coretext', ['GET_gitapress_chapter']),
    // use verse_id to get specific verse of the main text
    GET_gitapress_local() {
      self = this
      let mytemp = this.GET_gitapress_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'SET_showLink', 'SET_showTranslation', 'SET_showAnvaya', 'SET_showVerse']),
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
