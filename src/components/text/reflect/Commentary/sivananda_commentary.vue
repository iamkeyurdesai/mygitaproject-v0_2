<template>
  <div class="text-xs-center mydiv1">
    <div align="left" v-show="show">
  <div v-html="GET_sivananda.commentary" v-bind:style="{fontWeight : this.fontWeight, fontSize:this.fontSize}"> </div>
     </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    show: true
  }),
  computed: {
    ...mapState('parameters', ['chapter', 'verse', 'fontWeight', 'fontSize']),
    ...mapState('coretext', ['gitapress']),
    ...mapGetters('coretext', [ 'GET_sivananda'])
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

.myspan2 {
  font-size: 100%;
  word-spacing: -0.05em;
  font-family: "myfont";
}
</style>
