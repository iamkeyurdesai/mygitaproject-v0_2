<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>


  <v-fab-transition>
    <v-btn v-show="showZoom & !scrollLock & !showLock" color="accentmain" dark fab bottom right fixed class="shiftUpDouble shiftRight"
      v-on:click.stop="zoomChantFont('plus')" small>
        <v-icon :style="cssProps_high" large> zoom_in</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="showZoom & !scrollLock & !showLock" color="accentmain" dark fab bottom right fixed class="shiftUp shiftRight"
      v-on:click.stop="zoomChantFont('minus')" small>
        <v-icon :style="cssProps_high" large> zoom_out</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="scrollLock" color="activity" dark fab bottom right fixed class="shiftUp shiftRight"
      v-on:click="$emit('unLock')" small>
        <v-icon :style="cssProps_high" large> lock</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="showLock & !scrollLock" color="success" dark fab bottom right fixed class="shiftUp shiftRight" small>
        <v-icon :style="cssProps_high" large> lock_open </v-icon>
    </v-btn>
  </v-fab-transition>


</div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    showZoom: Boolean,
    scrollLock: Boolean,
    showLock: Boolean
  },
  components: {
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
},
reciteChantFontSize: {
  get() {
    return this.$store.state.parameters.reciteChantFontSize
  },
  set(value) {
    this.SET_reciteChantFontSize(value)
  }
  }
},
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'SET_showLink', 'SET_showTranslation', 'SET_showAnvaya',
    'SET_showVerse', 'SET_reciteChantFontSize']),
    zoomChantFont (mode) {
      if(mode=="plus") {
        if(this.reciteChantFontSize < 7) this.reciteChantFontSize = this.reciteChantFontSize + 1
      } else {
        if(this.reciteChantFontSize > 0) this.reciteChantFontSize = this.reciteChantFontSize - 1
      }
    }
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
  margin-bottom: 48px;
}
.shiftUpDouble{
  margin-bottom: 96px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}

</style>
