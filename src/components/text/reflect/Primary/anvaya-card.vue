
<template>
<div class="text-xs-center mydiv1">
    <div align="left">
      <span v-for="i in myindex_extract()" v-bind:style="{color:options[theme].textAccent1[GET_main.word_info[i-1].foot - 1]}" class="myspan1">
{{convert(GET_main.word_info[i-1].sanskrit)}} = <span class="myspan2">{{GET_main.word_info[i-1][language]}}</span><br></span>
      </span>
    </div>
</div>
</template>

<script>
import Sanscript from 'Sanscript';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script']),
    ...mapGetters('coretext', [ 'GET_main'])
  },
  methods: {
    convert(myinput){
          return Sanscript.t(myinput, 'iast', this.script);
        },
    myindex_extract() {
      return this.GET_main.word_info.map(x => x.index)
    }
  }
}
</script>

<style scoped>
.mydiv1 {
  /* font-size: 100%; */
}

/* @font-face {
  font-family: myfont;
  src: url(../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
} */

.myspan1 {
  /* font-size: 100%; */
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto'; */
}

/* .myspan2 {
  font-size: 110%;
  word-spacing: -0.05em;
  font-family: "myfont", 'Roboto';
  font-weight: 300;
} */
</style>
