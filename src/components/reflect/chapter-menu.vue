<template>
  <div class="text-xs-center my-3">

                  <v-layout column wrap>
                  <div class="title">{{chapter}}</div>
                  <div class="caption">chapter</div>
                  </v-layout>

</div>

</template>

<script>
import {mapState} from 'vuex';
import chaptercard from './chapter-card.vue';
  export default {
    data: () => ({
      sheet: false
    }),
    computed: {
      ...mapState('parameters', ['chapter', 'verse', 'subItem']),
      ...mapState('coretext', ['preview']),
    },
    components: {
      'chapter-card': chaptercard
    }
  }
</script>

<style scoped>
</style>
