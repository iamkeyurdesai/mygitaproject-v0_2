<template>
<v-card flat class="ma-1 background">
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0 xs12 lg6">
        <div align="center" class="pa-2 info--text" :style="cssProps">
          ॥ {{GET_start_local()}} ॥
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
    whatScript: String,
    whatLanguage: String
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'theme', 'script']),    
    ...mapGetters('coretext', ['GET_preview_chapter']),
    cssProps() { return {
      color: this.options[this.theme].emphasis.high
    }
  }
},
methods: {
  GET_start_local() {
    if(this.whatLanguage===undefined) {
      return this.convert_flexible(this.GET_preview_chapter.start)
    } else {
      if(this.whatLanguage==='hindi') {
        return 'अब अध्याय ' + this.chapter
      }
      if(this.whatLanguage==='english') {
        return 'Now Chapter ' + this.chapter
      }
    }
  },
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
</style>
