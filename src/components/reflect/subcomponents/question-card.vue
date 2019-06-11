<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <v-card-text class="font-weight-light adjustLineHeight my-1 my-2 px-2 py-1" :style="cssProps">
    <div align="left" class="info--text subheading" v-if="!headingHide">Translation</div>
    {{myTranslation}}
    <span v-if="showVerseIndex" :style="'color: ' + options[theme].emphasis.medium" class="small"> ({{chapter}}|{{verse_id}}) </span>
    <v-textarea v-for="i in myix" class="ma-3" :key="i"
        v-model="myQuestions[i-1]"
        color="deep-purple"
        :label="'Question ' + myix"
        outline
      ></v-textarea>
<v-btn small @click="myix += 1, showSave=true"> + </v-btn>
    <v-btn small @click="saveQuestions()" v-if="showSave">save</v-btn>
  </v-card-text>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true,
    headingHide: Boolean,
    showVerseIndex: Boolean
  },
  data: () => ({
    showSave: true,
    myix: 1,
    myQuestions: ["What"]
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script', 'chapter', 'verse']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_gitapress_chapter', 'GET_sivananda_chapter']),
    cssProps() { return {
      // borderLeft: 'solid ' + this.$vuetify.theme.success + ' 3px',
      color: this.options[this.theme].emphasis.high
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
      self = this
      let mytemp = this.GET_gitapress_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    },
    GET_sivananda_local() {
      self = this
      let mytemp = this.GET_sivananda_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    }
  },
  methods: {
    saveQuestions() {
      var db = firebase.firestore();
      db.collection("myquestions").doc(
        "c" + this.chapter.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +
        "v" + this.verse_id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})).set({
        chapter_id: this.chapter, verse_id: this.verse_id, questions: this.myQuestions})
      this.showSave = false
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
