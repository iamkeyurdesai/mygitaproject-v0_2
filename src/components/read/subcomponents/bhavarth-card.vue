<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <v-card-title class="font-weight-light adjustLineHeight my-1 my-2 px-2 py-1" :style="cssProps">
    {{GET_gitapress_local.bhavarth}}
  </v-card-title>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script', 'chapter']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_gitapress_chapter']),
    cssProps() { return {
      borderLeft: 'solid ' + this.$vuetify.theme.accentmain + ' 4px',
      color: this.options[this.theme].emphasis.high
      }
    },
    // use verse_id to get specific verse of the main text
    GET_gitapress_local() {
      self = this
      let mytemp = this.GET_gitapress_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
