<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <div class="my-1 my-2 px-2 py-1" :style="cssProps" :class="{adjustLineHeight: !noLineHeightAdjust}">
    <div align="left" class="info--text subheading" v-if="!headingHide">Translation</div>
    <span> {{myTranslation}} </span>
    <span v-if="showVerseIndex" :style="'color: ' +
    this.setWhite?this.options['dark'].emphasis.medium:this.options[this.theme].emphasis.medium" class="small">
    <span v-if="chapter_id===undefined">
    ({{chapter}}|{{verse_id}})
    </span>
    <span v-else>
    ({{chapter_id}}|{{verse_id}})
    </span>

  </span>
  </div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true,
    headingHide: Boolean,
    showVerseIndex: Boolean,
    noLineHeightAdjust: Boolean,
    setWhite: Boolean,
    chapter_id: Number
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script', 'chapter', 'verse']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_gitapress_chapter', 'GET_sivananda_chapter',
                              'GET_sivananda_method', 'GET_gitapress_method']),
    cssProps() { return {
      // borderLeft: 'solid ' + this.$vuetify.theme.success + ' 3px',
      color: this.setWhite?this.options['dark'].emphasis.high:this.options[this.theme].emphasis.high
      }
    },
    myTranslation() {
    if(this.language=="english") {
      return this.GET_sivananda_local.translation
    } else if(this.language=="hindi") {
      return this.GET_gitapress_local.bhavarth
    }
  },
    // use verse_id to get specific verse of the main text
    GET_gitapress_local() {
      if(this.chapter_id===undefined) {
      self = this
      let mytemp = this.GET_gitapress_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    } else {
      return this.GET_gitapress_method([this.chapter_id,this.verse_id])
    }
    },
    GET_sivananda_local() {
      if(this.chapter_id===undefined) {
      self = this
      let mytemp = this.GET_sivananda_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    } else {
      return this.GET_sivananda_method([this.chapter_id,this.verse_id])
    }
  }
}
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
