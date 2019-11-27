<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
  <v-card-text class="font-weight-light adjustLineHeight my-1 my-2 px-2 py-1" :style="cssProps">
<v-layout row>
<v-flex xs5 class="mr-2">
    <v-layout column>
<span v-for="(item, i) in myQuestions" :key="i">
  {{i+1}}.&nbsp;{{myConverter(item)}}</span>
      </v-layout>
</v-flex>
<v-flex xs7 class="ml-2">
<v-layout column v-if="isDeveloper">
    <div align="left" class="info--text subheading" v-if="!headingHide">Translation</div>
    {{myTranslation}}
    <span v-if="showVerseIndex" :style="'color: ' + options[theme].emphasis.medium" class="small"> ({{chapter}}|{{verse_id}}) </span>
<v-layout row wrap>
    <v-btn  v-for="(item, i) in myWords" class="ma-2 text-none info" dark small @click="appendWord(item.sanskrit)" :key="i">{{item.sanskrit}} </v-btn>
    </v-layout>
      <v-textarea class="ma-3"
          v-model="myQuestion"
          color="deep-purple"
          :label="'Add Question'"
          outline
        ></v-textarea>
<!-- <v-btn small @click="myix += 1, showSave=true"> + </v-btn> -->
    <v-btn small @click="saveQuestion('add')" v-if="showSave">save</v-btn>
  </v-layout>
  </v-flex>
        </v-layout>
  </v-card-text>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import {db} from '@/main.js'
import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true,
    headingHide: Boolean,
    showVerseIndex: Boolean,
    myQuestions: Array,
    myWords: Array,
    myQuestion: String
  },
  data: () => ({
    showSave: true,
    // myix: 1,
    // myQuestions: ["What"]
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script', 'chapter', 'verse', 'isDeveloper']),
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
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    myConverter(val) {
      return val.split("+-+").map(a=>{
        if(a.slice(0,4)==="$$^^") {          
          return this.convert(a.slice(4))
        } else {
          return a
        }}).join(' ')
    },
    appendWord(word){
      this.myQuestion = this.myQuestion + '+-+$$^^' + word + '+-+ '
    },
    saveQuestions() {
      var db = firebase.firestore();
      db.collection("myquestions").doc(
        "c" + this.chapter.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +
        "v" + this.verse_id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})).set({
        chapter_id: this.chapter, verse_id: this.verse_id, questions: this.myQuestions})
      this.showSave = false
    },
    saveQuestion(mode) {
      if (mode === "add") {
        if(this.myQuestions.length===0) {
          db.collection("reflect").doc("questions").collection("chapter").doc("chapter"+this.chapter).update({
            ['v'+this.verse_id]:  [this.myQuestion]
          })
        } else {
        db.collection("reflect").doc("questions").collection("chapter").doc("chapter"+this.chapter).update({
          ['v'+this.verse_id]: firebase.firestore.FieldValue.arrayUnion(this.myQuestion)
        })
      }
      } else {
        db.collection("recite").doc("chant").collection("groups").doc(this.userClaims.owner).collection('admin').doc(firebase.auth().currentUser.uid).update({
          leaders: firebase.firestore.FieldValue.arrayRemove(email)
        })
      }
    },
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
