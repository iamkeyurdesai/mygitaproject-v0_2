<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>


  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom right fixed class="mb-5 shiftRight" v-on:click.stop="increment()" small>
        <v-icon :style="cssProps_high" large> keyboard_arrow_right</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom left fixed class="mb-5 shiftLeft" v-on:click.stop="decrement()" small>
        <v-icon :style="cssProps_high" large> keyboard_arrow_left</v-icon>
    </v-btn>
  </v-fab-transition>




    <v-fab-transition>
      <!-- <v-btn v-show="!fabShow & offsetTop > 1200" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
        color="rgba(255, 0, 43, 0.6)" dark fab small bottom left fixed class="mb-5 shiftLeft"> -->
        <v-btn v-show="offsetTop > 2000" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
          color="rgba(255, 0, 43, 0.6)" dark fab small bottom left fixed class="shiftUp shiftLeft">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>


    <v-fab-transition>
      <v-btn v-show="true" color="accentinfo" dark fab bottom right small fixed class="shiftUp shiftRight">
    <settings-popup isScript isTheme isFsize isLanguage></settings-popup>
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
    'fabShow', 'offsetTop', 'chapter']),
    cssProps_medium() { return {
        'color': '#FFFFFFFF'
  }},
  cssProps_high() { return {
      'color': '#FFFFFFFF'
}
}
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'SET_showLink', 'SET_showTranslation', 'SET_showAnvaya',
    'SET_showVerse', 'increment', 'decrement']),
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
.shiftUp{
  margin-bottom: 100px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}

</style>
