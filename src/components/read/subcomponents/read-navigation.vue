<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>

    <v-fab-transition>
      <v-speed-dial v-model="fab" bottom right fixed class="mb-5" direction="top">
        <v-btn v-show="fabShow" slot="activator" v-model="fab" color="accentmain" dark fab>
          <v-icon large>add</v-icon>
          <v-icon large>close</v-icon>
        </v-btn>
        <!-- showLink -->
        <v-btn icon small color="accentmain" v-if="!showLink" v-on:click.stop="SET_showLink(!showLink)">
          <span :style="cssProps_medium"> L </span>
        </v-btn>
        <v-btn  icon small color="accentmain" v-else v-on:click.stop="SET_showLink(!showLink)">
          <span :style="cssProps_high"> L </span>
        </v-btn>

        <!-- showTranslation -->
        <v-btn icon small color="accentmain" v-if="!showTranslation" v-on:click.stop="SET_showTranslation(!showTranslation)">
          <span :style="cssProps_medium"> T </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showTranslation(!showTranslation)">
          <span :style="cssProps_high"> T </span>
        </v-btn>

        <!-- showVerse -->
        <v-btn icon small color="accentmain" v-if="!showVerse" v-on:click.stop="SET_showVerse(!showVerse)">
          <span :style="cssProps_medium"> V </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showVerse(!showVerse)">
          <span :style="cssProps_high"> V </span>
        </v-btn>

        <!-- showAnvaya -->
        <v-btn icon small color="accentmain" v-if="!showAnvaya" v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <span :style="cssProps_medium"> A </span>
        </v-btn>
        <v-btn icon small color="accentmain" v-else v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <span :style="cssProps_high"> A </span>
        </v-btn>

        <!-- breakSandhi -->
        <v-btn icon  color="accentmain" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="cssProps_medium"> gavel</v-icon>
        </v-btn>
        <v-btn icon  color="accentmain" v-else v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="cssProps_high" small> gavel</v-icon>
        </v-btn>


      </v-speed-dial>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="!fabShow & offsetTop > 2000" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
        color="rgba(255, 0, 43, 0.7)" dark fab small bottom left fixed class="mb-5">
        <v-icon large>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="fabShow" color="activity" dark fab small bottom left fixed class="mb-5">
    <settings-popup></settings-popup>
      </v-btn>
    </v-fab-transition>

</div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
import settingspopup from '@/components/settings/settings-popup.vue'
export default {
  props: {
    verse_id: Number,
    required: true
  },
  components: {
    'settings-popup': settingspopup
  },
  data: () => ({
    fab: false
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse',
    'fabShow', 'offsetTop']),
    cssProps_medium() { return {
        'color': '#FFFFFF9F'
  }},
  cssProps_high() { return {
      'color': '#FFFFFFFF'
}
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
