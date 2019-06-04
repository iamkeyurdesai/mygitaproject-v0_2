<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>


  <v-fab-transition>
    <v-btn v-show="offsetTop > 350 || chapter > 18" color="accentmain" dark fab bottom right fixed class="shiftUpDouble shiftRight"
      v-on:click.stop="zoomChantFont('plus')" small>
        <v-icon :style="cssProps_high" large> zoom_in</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="offsetTop > 350 || chapter > 18" color="accentmain" dark fab bottom right fixed class="shiftUp shiftRight"
      v-on:click.stop="zoomChantFont('minus')" small>
        <v-icon :style="cssProps_high" large> zoom_out</v-icon>
    </v-btn>
  </v-fab-transition>



    <v-fab-transition>
      <v-btn v-show="true" color="accentinfo" dark fab bottom right small fixed class="mb-5 shiftRight">
    <settings-popup isScript isTheme></settings-popup>
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
        if(this.reciteChantFontSize < 6) this.reciteChantFontSize = this.reciteChantFontSize + 1
      } else {
        if(this.reciteChantFontSize > 1) this.reciteChantFontSize = this.reciteChantFontSize - 1
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
  margin-bottom: 100px;
}
.shiftUpDouble{
  margin-bottom: 150px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}

</style>
