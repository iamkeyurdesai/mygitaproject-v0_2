<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <div class="my-1 my-2 px-2 py-1" :style="cssProps" :class="{adjustLineHeight: !noLineHeightAdjust}">
    <div align="left" class="info--text subheading" v-if="!headingHide">Translation</div>

    <span> {{myTranslation}} </span>

    <span v-if="showVerseIndex" class="font-weight-light">
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
import { mapGetters} from 'vuex';
export default {
  props: {
    required: true,
    verse_id: Number,
    headingHide: Boolean,
    showVerseIndex: Boolean,
    noLineHeightAdjust: Boolean,
    setWhite: Boolean,
    chapter: Number,
    chapter_id: Number,
    GET_sivananda_chapter_local: Object,
    GET_gitapress_chapter_local: Object,
    options: Object,
    theme: String,
    language: String
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('coretext', ['GET_sivananda_method', 'GET_gitapress_method']),
    cssProps() { return {
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
      return this.GET_gitapress_chapter_local
    } else {
      return this.GET_gitapress_method([this.chapter_id,this.verse_id])
    }
    },
    GET_sivananda_local() {
      if(this.chapter_id===undefined) {
      return this.GET_sivananda_chapter_local
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
