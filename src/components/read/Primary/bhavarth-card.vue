<template>
  <div class="text-xs-right mydiv1">
    <span class="subheading accentinfo--text mr-4">Translation</span>
    <div align="left" v-show="show">
      <span class="myspan2"> {{ GET_gitapress.bhavarth }}
 </span>
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
    ...mapState('parameters', ['chapter', 'verse']),
    ...mapState('coretext', ['gitapress']),
    ...mapGetters('coretext', [ 'GET_gitapress'])
  }
  }
</script>

<style scoped>
.mydiv1 {
  /* font-size: 100%; */
  line-height: 1.6em;
}

/* @font-face {
  font-family: myfont;
  src: url(../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
} */
</style>
