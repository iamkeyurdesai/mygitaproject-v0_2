<template>
<v-card flat class="ma-1 background">
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0 xs12 lg6">
        <div align="center" class="pa-2 info--text adjustLineHeight" :style="cssProps" v-html="convert_flexible(preview[chapter-1].end) + '॥'">
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
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem', 'language', 'script']),
    ...mapState('coretext', ['preview']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_preview_chapter']),
    cssProps() { return {
      color: this.options[this.theme].emphasis.high
    }
  },
  truncateWithEllipses() {
    let text = this.GET_preview_chapter[this.language]
    let max = 200
    return text.substr(0,max-1)+(text.length>max ? '' : '');
  }
},
methods: {
  convert_flexible(myinput) {
    if(this.chapter < 19) {
    return Sanscript.t(myinput, 'devanagari', this.script);
  } else {
    return Sanscript.t(myinput, 'iast', this.script);
  }
  }
}
}
</script>

<style scoped>
.mybutton{
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
  width: 1.6rem;
  height: auto;
}
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
