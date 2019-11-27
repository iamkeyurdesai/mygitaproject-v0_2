<!-- This componet will render a shloaka brakdown in the so-called sentence order
The verse_id is provided as a prop, and the trasliterated verses are fetched and converted to the selected script
Type of theming is decided by options and theme is read from Vuex
Number of columns is decided using columnCount from Vuex
Local func convert() uses lib Sanscript -->

<template>
  <div class="text-xs-center" :style="cssProps">

    <!-- add header with increase / decrease functionality -->
    <v-layout justify-center align-center row class="adjustLineHeight">
      <v-btn  :dark="GET_dark" flat small v-on:click.stop="decreaseColumn()">
        <v-icon>remove</v-icon>
      </v-btn>
      <div class="info--text body-2" >
        word and its meaning
      </div>
      <v-btn  :dark="GET_dark" flat small v-on:click.stop="increaseColumn()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>

    <!-- anvaya -->
    <v-layout justify-center row class="px-5">

      <div align="left" class="trantext pb-3 adjustLineHeight" v-bind:style="[{columnCount: this.columnCount},
      {columnRule: this.columnRuleColor}]" key="lightAnvaya">
          <span v-for="i in myindex_extract()" :class="`accent${GET_main_local.word_info[i-1].foot}--text`"
          @click="searchWord(GET_main_local.word_info[i-1].sanskrit), currentTooltip=i, showTooltip=true">
        <v-tooltip top content-class="myTooltipHeight" :color="GET_dark?'background lighten-1':'background'"
        :max-width="$vuetify.breakpoint.width<600?'200px':'300px'"
        v-model="showTooltip" v-if="i===currentTooltip">
          <template v-slot:activator="{ on }" class="ma-1 pa-2">
                    <span :class="GET_dark?'background lighten-2':'background darken-1'">
            {{convert(GET_main_local.word_info[i-1].sanskrit)}}
            &nbsp;=&nbsp;
            <span class="myspan2">{{GET_main_local.word_info[i-1][language]}}</span><br>
          </span>
        </template>
        <v-flex>
        <div class="text-xs-center">
        <v-btn outline icon small color="accentmain" @click="showTooltip=false, showTooltipVerse=false"><v-icon small>close</v-icon></v-btn>
      </div>
      <div class="myTooltipScroll" :class="$vuetify.breakpoint.width<600?'body-2':'subheading'">
        <v-card v-for="(item, i) in searchResults" :key="i" class="my-2 background" :dark="GET_dark" raised
          @click="showTooltipVerseNumber=i, showTooltipVerse = true" :class="{addActiveBorderVerse: i===showTooltipVerseNumber}">
        <!-- @click="SET_chapter(item.chapter), SET_verse(item.verse), showTooltip=false, currentTooltip=0"> -->
<div class="mx-2 font-weight-light" :style="'color:' + options[theme].emphasis.medium">{{item.chapter}}|{{item.verse}}</div>
<div class="mx-2 pa-1">
          {{item.original}}<span class="mx-1">=</span>{{item.translation}}

          <v-tooltip bottom v-model="showTooltipVerse" v-if="i===showTooltipVerseNumber"
          content-class="myTooltipVerseHeight" :color="GET_dark?'background lighten-2':'background'"
          :max-width="$vuetify.breakpoint.width<600?'300px':'400px'">
            <v-flex>
            <div class="text-xs-center">
            <v-btn outline icon small color="accentmain" @click="showTooltipVerse=false"><v-icon small>close</v-icon></v-btn>
          </div>
          <bhavarthCard :verse_id="item.verse" :chapter_id="item.chapter" headingHide
          v-if="i===showTooltipVerseNumber" :class="$vuetify.breakpoint.width<600?'body-2':'subheading'" showVerseIndex> </bhavarthCard>
          </v-flex>
        </v-tooltip>
            </div>

        </v-card>
      </div>
      </v-flex>
        </v-tooltip>
        <span v-else>
{{convert(GET_main_local.word_info[i-1].sanskrit)}}
&nbsp;=&nbsp;
<span class="myspan2">{{GET_main_local.word_info[i-1][language]}}</span><br>
</span>

          </span>
      </div>
    </v-layout>

  </div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
import bhavarthCard from '@/components/read/subcomponents/bhavarth-card.vue'
var FlexSearch = require("flexsearch")
export default {
  components: {
    bhavarthCard
  },
  props: {
    verse_id: Number,
    required: true
  },
  data: () => ({
    dialog: false,
    searchResults: [],
    showTooltip: false,
    currentTooltip: 0,
    showTooltipVerseNumber: -1,
    showTooltipVerse: false
  }),
  watch: {
    verse_id: function(){
      this.searchResults = [],
      this.showTooltip = false,
      this.currentTooltip = 0,
      this.showTooltipVerseNumber = -1,
      this.showTooltipVerse = false
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['indexWord', 'main']),
    ...mapState('parameters', ['theme', 'language', 'script', 'chapter']),
    ...mapGetters('settings', ['GET_dark']),
    ...mapGetters('coretext', ['GET_main_chapter']),
    columnCount: {get(){return this.$store.state.parameters.columnCount}, set(value){this.SET_columnCount(value)}},
    // use verse_id to get specific verse of the main text
    GET_main_local() {
      self = this
      let mytemp = this.GET_main_chapter.filter(function(item) {
        return (item.verse_id === self.verse_id);
      });
      return mytemp[0];
    },
    columnRuleColor() {

      let tmpColor = this.GET_dark? '#FFFFFF5F' : '#0000005F'
      console.log("1px solid " + tmpColor)
      return "1px solid " + tmpColor
    },
    cssProps() {
      return {
        // '--tip-border-color': this.columnRuleColor
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_columnCount', 'SET_chapter', 'SET_verse']),
    convert(myinput) {
      if(this.script === "iast") {
        return myinput
      } else {
      return Sanscript.t(myinput, 'iast', this.script);
    }
  },
    myindex_extract() {
      return this.GET_main_local.word_info.map(x => x.index)
    },
    decreaseColumn: function() {
      if(this.columnCount > 1) this.columnCount -= 1
    },
    increaseColumn: function() {
      if(this.columnCount <4 ) this.columnCount += 1
    },
    convertItrans(myinput) {
      return Sanscript.t(myinput, 'iast', 'itrans');
    },
    searchWord(word1) {
      this.dialog = true
      let word = this.convertItrans(word1)
      console.log(word)
      console.log(this.indexWord.search({
        // query:this.convertItrans(word),
        query: word,
        // limit: 5,
        // // depth: 3,
        // threshold: 10,
        // resolution: 12,
        // tokenize: "strict",
        // encode: "false",
      }).map((ans)=>{
        return this.main[ans.index_main].word_info[ans.word_index].sanskrit
      }))
      let wordQuery = word.length < 4 ? word : word.slice(0, -1)
      wordQuery = wordQuery.length < 7 ? wordQuery: wordQuery.slice(0, -1)
      wordQuery = wordQuery.length < 8 ? wordQuery: wordQuery.slice(0, -1)
      //wordQuery = word
      console.log(wordQuery)
      this.searchResults = this.indexWord.search(wordQuery).map((ans)=>{
        return {
          original: this.convert(this.main[ans.index_main].word_info[ans.word_index].sanskrit),
          translation: this.main[ans.index_main].word_info[ans.word_index][this.language],
          chapter: this.main[ans.index_main].chapter_id,
          verse: this.main[ans.index_main].verse_id
        }
      })
      console.log(this.searchResults)
    }
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
.trantext {
    column-width: auto;
}
.addActiveBorderVerse{
  border: 2px solid wheat !important;
}
.myTooltipHeight{
  max-height: 250px;
  opacity:1 !important;
  border-radius: 10px !important;
}
.myTooltipVerseHeight{
  opacity:1 !important;
  border: 2px solid wheat !important;
  border-radius: 10px !important;
}
.myTooltipScroll{
  max-height: 200px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.myTooltipScroll::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}

</style>
