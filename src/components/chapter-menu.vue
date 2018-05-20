<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="sheet"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >

<span slot="activator" class="tst1">C-{{mychapter}} </span>


<v-card tile>

<v-toolbar card dark color="primary">
<v-btn icon dark @click.native="sheet = false">
  <v-icon>close</v-icon>
</v-btn>
Select Chapter
</v-toolbar>
<v-card>
  <v-container fluid grid-list-xs>
<chapter-card v-for="(mypreview,i) in mypreviews" :key="i" :index="i"></chapter-card>
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
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import chaptercard from './chapter-card.vue';
  export default {
    data: () => ({
      sheet: false
    }),
    computed: {
      mychapter(){
        return this.$store.state.chapter
      },
      mypreviews(){
        return this.$store.state.preview;
      }

    },
    components: {
      'chapter-card': chaptercard
    }
  }
</script>

<style scoped>
.tst1 {
  font-size: 100%;
  color: white;
}
</style>
