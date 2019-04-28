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

        <!-- info -->
        <v-btn icon  color="accentinfo" v-if="!readHelp" v-on:click.stop="readHelp = true">
          <v-icon :style="cssProps_medium"> help_outline</v-icon>
        </v-btn>
        <v-btn icon  color="activity" v-else v-on:click.stop="readHelp = false">
          <v-icon :style="cssProps_high" small> help_outline </v-icon>
        </v-btn>

        <!-- showVerse -->
        <v-btn icon  color="accentmain" v-if="!showVerse" v-on:click.stop="SET_showVerse(!showVerse)">
          <v-icon :style="cssProps_medium" small> view_headline </v-icon>
        </v-btn>
        <v-btn icon  color="activity" v-else v-on:click.stop="SET_showVerse(!showVerse)">
          <v-icon :style="cssProps_high" small> view_headline </v-icon>
        </v-btn>

        <!-- showLink -->
        <v-btn icon  color="accentmain" v-if="!showLink" v-on:click.stop="SET_showLink(!showLink)">
          <v-icon :style="cssProps_medium"> link </v-icon>
        </v-btn>
        <v-btn  icon  color="activity" v-else v-on:click.stop="SET_showLink(!showLink)">
          <v-icon :style="cssProps_high" small> link </v-icon>
        </v-btn>

        <!-- showTranslation -->
        <v-btn icon  color="accentmain" v-if="!showTranslation" v-on:click.stop="SET_showTranslation(!showTranslation)">
          <v-icon :style="cssProps_medium"> translate </v-icon>
        </v-btn>
        <v-btn icon  color="activity" v-else v-on:click.stop="SET_showTranslation(!showTranslation)">
          <v-icon :style="cssProps_high" small> translate </v-icon>
        </v-btn>

        <!-- showAnvaya -->
        <v-btn icon  color="accentmain" v-if="!showAnvaya" v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <v-icon :style="cssProps_medium"> format_bold </v-icon>
        </v-btn>
        <v-btn icon  color="activity" v-else v-on:click.stop="SET_showAnvaya(!showAnvaya)">
          <v-icon :style="cssProps_high" small> format_bold </v-icon>
        </v-btn>

        <!-- breakSandhi -->
        <v-btn icon  color="accentmain" v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="cssProps_medium"> gavel</v-icon>
        </v-btn>
        <v-btn icon  color="activity" v-else v-on:click.stop="SET_breakSandhi(!breakSandhi)">
          <v-icon :style="cssProps_high" small> gavel</v-icon>
        </v-btn>

      </v-speed-dial>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="!fabShow & offsetTop > 2000" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
        color="rgba(255, 0, 43, 0.6)" dark fab small bottom left fixed class="mb-5">
        <v-icon large>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="fabShow" color="accentinfo" dark fab small bottom left fixed class="mb-5">
    <settings-popup></settings-popup>
      </v-btn>
    </v-fab-transition>

    <v-bottom-sheet v-model="readHelp" inset max-width="65%">
      <v-list>
    <v-subheader class="ml-2 subheading info--text"> Press these buttons for </v-subheader>

    <v-list-tile
      v-for="tile in tiles"
      :key="tile.title"
    >

      <v-list-tile-avatar>
        <v-btn icon  v-if="tile.icon==='format_size'" color="accentinfo">
          <v-icon :style="cssProps_medium"> {{tile.icon}}</v-icon>
      </v-btn>
      <v-btn icon  v-else color="accentmain">
        <v-icon :style="cssProps_medium"> {{tile.icon}}</v-icon>
    </v-btn>
      </v-list-tile-avatar>
      <v-list-tile-text class="body-1 shrinkHeight">{{ tile.title }}</v-list-tile-text>
    </v-list-tile>

  </v-list>
        </v-bottom-sheet>


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
    fab: false,
    readHelp: false,
    tiles: [
        { icon: 'format_size', title: 'Set language and script' },
        { icon: 'view_headline', title: 'Original verse' },
        { icon: 'link', title: 'Link with the previous verse' },
        { icon: 'translate', title: 'Translation of the verse' },
        { icon: 'format_bold', title: 'Breakdown into words and sentence formation' },
        { icon: 'gavel', title: 'Break sandhi' }
      ]
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse',
    'fabShow', 'offsetTop']),
    cssProps_medium() { return {
        'color': '#FFFFFFFF'
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
.shrinkHeight {
  line-height: 1.1em;
}
</style>
