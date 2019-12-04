<template>
<v-card flat class="ma-1 background">
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0 xs12 lg6">
        <div align="center" class="pa-2 info--text adjustLineHeight" :style="cssProps" v-html="get_end()">
          <!-- ॥ {{convert_flexible(preview[chapter-1].end)}} ॥ -->
<br> <br>
      </div>
      </v-flex>
      </v-layout>
      </v-card>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    required: true,
    language: String
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'theme', 'script']),
    ...mapState('coretext', ['preview']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() { return {
      color: this.options[this.theme].emphasis.high
    }
  }
},
methods: {
  convert_flexible(myinput) {
    if(this.chapter < 19) {
    return Sanscript.t(myinput, 'devanagari', this.script);
  } else {
    return Sanscript.t(myinput, 'iast', this.script);
  }
},
get_end() {
  if(this.language===undefined) {
  return this.convert_flexible(this.preview[this.chapter-1].end) + '॥'
} else {
  return (this.preview[this.chapter>18?this.chapter-1:0]['end_'+this.language]+
  (this.chapter>18?'':(this.preview[0]['endChap_'+this.language]+ this.chapter)) +
  (this.chapter>18?'':'<br>॥ ') +
  (this.chapter>18?'': this.preview[this.chapter-1]['title'+(this.language==='english'?'_english':'')]) +
  (this.chapter>18?'':' ॥ '))
}
}
}
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
