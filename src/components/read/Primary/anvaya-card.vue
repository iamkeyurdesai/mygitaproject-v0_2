
<template>
<div class="text-xs-center mydiv">
  <v-layout justify-center align-center row>
    <v-btn  :dark="GET_dark" flat small v-on:click.stop="decreaseColumn()">
    <v-icon>remove</v-icon>
    </v-btn>
    <div class="caption">
    Breakdown
    </div>
    <v-btn  :dark="GET_dark" flat small v-on:click.stop="increaseColumn()">
    <v-icon>add</v-icon>
    </v-btn>
  </v-layout>  
  <v-layout justify-center row class="px-5">
  <div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #FFFFFF5F'} ]" v-if="this.GET_dark">
    <div align="left">
      <span v-for="i in myindex_extract()" :class="`accent${GET_main.word_info[i-1].foot}--text`">
  {{convert(GET_main.word_info[i-1].sanskrit)}} = <span class="myspan2">{{GET_main.word_info[i-1][language]}}</span><br></span>
      </span>
    </div>

  </div>
  <div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #0000005F'}]" v-else>
    <div align="left">
      <span v-for="i in myindex_extract()" :class="`accent${GET_main.word_info[i-1].foot}--text`">
  {{convert(GET_main.word_info[i-1].sanskrit)}} = <span class="myspan2">{{GET_main.word_info[i-1][language]}}</span><br></span>
      </span>
    </div>

  </div>
  </v-layout>

</div>
</template>



<script>
import Sanscript from 'Sanscript';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  data: () => ({
    styleAnvaya: {
      columnCount: 2
    }
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'language', 'script']),
    ...mapGetters('coretext', [ 'GET_main']),
    ...mapGetters('settings', ['GET_dark'])
  },
  methods: {
    convert(myinput){
          return Sanscript.t(myinput, 'iast', this.script);
        },
    myindex_extract() {
      return this.GET_main.word_info.map(x => x.index)
    },
    decreaseColumn: function() {
      if(this.styleAnvaya.columnCount > 1) this.styleAnvaya.columnCount -= 1
    },
    increaseColumn: function() {
      if(this.styleAnvaya.columnCount <4 ) this.styleAnvaya.columnCount += 1
    }
  }
}
</script>

<style scoped>
.mydiv {
  line-height: 1.6;
}
.trantext {
    column-width: auto;
}
</style>
