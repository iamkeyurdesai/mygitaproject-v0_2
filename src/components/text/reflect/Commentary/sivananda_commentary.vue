<template>
  <div class="comm" v-html="GET_sivananda.commentary" v-bind:style="{fontWeight : this.fontWeight, fontSize:this.fontSize}"> </div>
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
.comm{
    column-rule: 1px solid grey;
    column-width: 300px;
    column-count: 3;
    column-fill: auto;    
}

</style>
