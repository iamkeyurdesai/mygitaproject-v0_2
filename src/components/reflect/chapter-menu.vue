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
  <v-layout justify-space-between row align-center>
  <v-flex>
    <v-btn dark icon small @click.native="sheet = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-flex>
  <v-flex>
      <div class="text-xs-center subheading">
    {{subItem}} | select chapter
  </div>
  </v-flex>
  <v-flex>
  <v-layout column wrap align-center>
  <div class="title">{{verse}}</div>
  <div class="caption">verse</div>
  </v-layout>
  </v-flex>
  </v-layout>
  </v-toolbar>

<v-card class="secondary">
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
