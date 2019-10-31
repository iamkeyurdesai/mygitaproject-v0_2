<template>
<v-card class="ma-1 pa-0 background" flat>
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0">
        <div align="center" class="pa-2 accentinfo--text" :style="cssProps">
          {{GET_salutation}}
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
    whatScript: String
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem', 'language', 'script']),
    ...mapState('coretext', ['preview']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_preview_chapter', 'GET_salutation']),
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
if(this.whatScript!==undefined) {
    if(this.chapter < 19) {
    return Sanscript.t(myinput, 'devanagari', this.whatScript);
  } else {
    return Sanscript.t(myinput, 'iast', this.whatScript);
  }
} else {
  if(this.chapter < 19) {
  return Sanscript.t(myinput, 'devanagari', this.script);
} else {
  return Sanscript.t(myinput, 'iast', this.script);
}
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
