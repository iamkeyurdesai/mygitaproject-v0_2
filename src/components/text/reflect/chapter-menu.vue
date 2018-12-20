<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="sheet"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >

    <button slot="activator" class="pa-2">
                  <v-layout column wrap>
                  <div class="title">{{chapter}}</div>
                  <div class="caption">chapter</div>
                  </v-layout>
                </button>

<!-- <span slot="activator">C-{{chapter}} </span> -->


<v-card tile>

<v-toolbar card dark color="primary">
<v-btn icon dark @click.native="sheet = false">
  <v-icon>close</v-icon>
</v-btn>
Select Chapter
</v-toolbar>
<v-card>
  <v-container fluid grid-list-xs>
<chapter-card v-for="(mypreview,i) in preview" :key="i" :index="i"></chapter-card>
</v-container>
</v-card>
<!-- <v-btn dark bottom right fab absolute small color="pink" @click.native="sheet = false">
  <v-icon>close</v-icon>
</v-btn> -->
</v-card>

</v-dialog>
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
      ...mapState('parameters', ['chapter']),
      ...mapState('coretext', ['preview']),
    },
    components: {
      'chapter-card': chaptercard
    }
  }
</script>

<style scoped>
</style>
