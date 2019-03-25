<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>

    <v-fab-transition>
      <v-speed-dial v-model="fab" fab small bottom right fixed class="mb-5">
        <v-btn v-show="fabShow" slot="activator" v-model="fab" color="accentinfo" dark fab small>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <!-- showLink -->
        <v-btn icon small color="accentmain" v-if="!showLink" v-on:click.stop="SET_showLink(!showLink)">
          <span :style="options[theme].emphasis.medium"> L </span>
        </v-btn>
        <v-btn  icon small color="accentmain" v-else v-on:click.stop="SET_showLink(!showLink)">
          <span :style="options[theme].emphasis.high"> L </span>
        </v-btn>

        <!-- showTranslation -->
        <v-btn icon small color="accentmain" v-if="!showTranslation" v-on:click.stop="SET_showTranslation(!showTranslation)">
          <span :style="options[theme].emphasis.medium"> T </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showTranslation(!showTranslation)">
          <span :style="options[theme].emphasis.high"> T </span>
        </v-btn>

        <!-- showVerse -->
        <v-btn icon small color="accentmain" v-if="!showVerse" v-on:click.stop="SET_showVerse(!showVerse)">
          <span :style="options[theme].emphasis.medium"> V </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showVerse(!showVerse)">
          <span :style="options[theme].emphasis.high"> V </span>
        </v-btn>

        <!-- showAnvaya -->
        <v-btn icon small color="accentmain" v-if="!showAnvaya" v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <span :style="options[theme].emphasis.medium"> A </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <span :style="options[theme].emphasis.high"> A </span>
        </v-btn>

        <!-- breakSandhi -->
        <v-btn icon  color="accentmain" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="options[theme].emphasis.medium"> gavel</v-icon>
        </v-btn>
        <v-btn icon  color="accentmain" v-else v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="options[theme].emphasis.high" small> gavel</v-icon>
        </v-btn>


      </v-speed-dial>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="!fabShow & offsetTop > 500" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
        color="blue darken-2" dark fab small bottom left fixed class="my-5 mx-0">
        <v-icon>arrow_upward</v-icon>
      </v-btn>
    </v-fab-transition>
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
    fab: false
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse',
    'fabShow', 'offsetTop']),
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
