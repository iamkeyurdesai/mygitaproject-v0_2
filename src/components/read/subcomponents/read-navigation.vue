<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div>


  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom right fixed class="mb-5 shiftRight" v-on:click.stop="increment()" small v-if="lrArrowShow">
        <v-icon :style="cssProps_high" large> keyboard_arrow_right</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom left fixed class="mb-5 shiftLeft" v-on:click.stop="decrement()" small v-if="lrArrowShow">
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

    <!-- share -->
        <v-fab-transition>
    <v-btn icon  color="success" v-on:click.stop="readHelp = true" dark fab small bottom right fixed class="shiftUpUp shiftRight">
      <v-icon :style="cssProps_medium"> share</v-icon>
    </v-btn>
</v-fab-transition>


<v-bottom-sheet v-model="readHelp" inset >
<div class="secondary">
  <v-subheader class="ma-2 subheading info--text"> Share using </v-subheader>
<v-divider> </v-divider>
<social-sharing :url="'https://gitawebapp.firebaseapp.com'+path" inline-template>
<div>
<network network="facebook">
<v-icon class="ma-3" large> mdi-facebook</v-icon>
</network>
<network network="linkedin">
<v-icon class="ma-3" large> mdi-linkedin</v-icon>
</network>
<network network="twitter">
<v-icon class="ma-3" large> mdi-twitter</v-icon>
</network>
<network network="whatsapp">
<v-icon class="ma-3" large> mdi-whatsapp</v-icon>
</network>
</div>
</social-sharing>
  <br> <br>
</div>

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
    required: true,
    lrArrowShow: Boolean
  },
  components: {
    'settings-popup': settingspopup
  },
  data: () => ({
    fab: false,
    readHelp: false,
    tiles: [
        { icon: 'format_size', title: 'select language' },
        { icon: 'view_headline', title: 'read original verses' },
        { icon: 'link', title: 'read links' },
        { icon: 'translate', title: 'read translation' },
        { icon: 'format_bold', title: 'read word-by-word' },
        { icon: 'gavel', title: 'break sandhi (word fusion)' }
      ]
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse',
    'fabShow', 'offsetTop', 'chapter', 'path']),
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
.shiftUpUp{
  margin-bottom: 150px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}

</style>
