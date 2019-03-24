<template>
  <div class="myspan">
    <span class="subheading accentinfo--text">Connection</span>
    <div v-show="show">
      <span> {{ GET_gitapress.sambandh }}
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
}

/* @font-face {
  font-family: myfont;
  src: url(../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
} */

.myspan {
  line-height: 1.6em;
  /* font-family: "myfont"; */
}
</style>
