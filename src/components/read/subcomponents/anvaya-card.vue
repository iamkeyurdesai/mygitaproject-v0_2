<!-- This componet will render a shloaka brakdown in the so-called sentence order
The verse_id is provided as a prop, and the trasliterated verses are fetched and converted to the selected script
Type of theming is decided by options and theme is read from Vuex
Number of columns is decided using columnCount from Vuex
Local func convert() uses lib Sanscript -->

<template>
  <div class="text-xs-center">

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

      <!-- for dark theme -->
      <div align="left" class="trantext pb-3 adjustLineHeight" v-bind:style="[{columnCount: this.columnCount}, {columnRule: '1px solid #FFFFFF5F'} ]" v-if="this.GET_dark" key="darkAnvaya">
          <span v-for="i in myindex_extract()" :class="`accent${GET_main_local.word_info[i-1].foot}--text`"
          @click="searchWord(GET_main_local.word_info[i-1].sanskrit)">
            {{convert(GET_main_local.word_info[i-1].sanskrit)}} <span class="body-1">=</span>  <span class="myspan2">{{GET_main_local.word_info[i-1][language]}}</span><br></span>
          </span>
        </div>
      <!-- for light theme -->
      <div align="left" class="trantext pb-3 adjustLineHeight" v-bind:style="[{columnCount: this.columnCount}, {columnRule: '1px solid #0000005F'}]" v-else key="lightAnvaya">
          <span v-for="i in myindex_extract()" :class="`accent${GET_main_local.word_info[i-1].foot}--text`"
          @click="searchWord(GET_main_local.word_info[i-1].sanskrit)">
            {{convert(GET_main_local.word_info[i-1].sanskrit)}}
            <span class="body-1">=</span>
            <span class="myspan2">{{GET_main_local.word_info[i-1][language]}}</span><br></span>
          </span>
      </div>
    </v-layout>

  </div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
var FlexSearch = require("flexsearch")
export default {
  props: {
    verse_id: Number,
    required: true
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['indexWord']),
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
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_columnCount']),
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
    searchWord(word) {
      console.log(this.indexWord.search(word))
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
</style>
