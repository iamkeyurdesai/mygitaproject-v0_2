<template>
<div class="comm">

  <!-- <img src="https://source.unsplash.com/random" width="150px"> -->
<p v-html="GET_sivananda.commentary" v-bind:style="{fontWeight : this.fontWeight, fontSize:this.fontSize}">
  </p>
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

<style lang="scss" scoped>
.comm{
    column-rule: 1px solid grey;
    column-width: 300px;
    column-count: 3;
    column-fill: auto;
    line-height: 1.8;
    height: auto;
    min-height: 200px;
}
img {
  height: 150px;
  min-width: 125px;
  float: left;
  shape-margin: 1.5rem;
  border-radius: 40%;
  shape-outside: circle(40%);
}
</style>
