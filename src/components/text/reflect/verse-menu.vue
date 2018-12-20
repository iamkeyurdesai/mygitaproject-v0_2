<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
    <v-btn slot="activator" flat>
                  <v-layout column wrap>
                  <div class="title">{{verse}}</div>
                  <div class="caption">verse</div>
                  </v-layout>
                  </v-btn>


    <!-- <span slot="activator">V-{{verse}} </span> -->


<v-card-text>
    <v-card tile>
      <v-toolbar card :class="options[theme].toolbarAccent1" :dark="options[theme].type=='dark'" dense>
        Select Verse
 <v-spacer></v-spacer>
        <v-btn icon :dark="options[theme].type=='dark'" @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
            Chapter {{chapter}}
      </v-toolbar>
<div v-for="(item, i) in mysummary" :key="i">
      <v-container grid-list-sm>
      <v-card color="purple darken-2" class="white--text elevation-10">
        <div class="subheading"> {{item.summary}}</div>
          <span  v-for="(vid, j) in range(item.begin, item.end)" :key="j">
        <v-btn  class="title tst2" fab small color="red" @click.native.stop="setVerse_local(vid)" v-if="vid==verse">{{vid}}</v-btn>
        <v-btn class="caption tst2" fab small @click.native.stop="setVerse_local(vid)" v-else>{{vid}}</v-btn>
      </span>
      </v-card>
    </v-container>
</div>

  </v-card>
</v-card-text>
</v-dialog>
</div>

</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';
export default {
  data: () => ({
    sheet: false,
    tempcolor: 'green'
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme']),
    ...mapState('coretext', ['summary']),
    mysummary(){
      // console.log(this.summary);
      return this.summary.filter(function(item) {
        return item.chapter_id == this;
      }, this.chapter);
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_verse']),
    setVerse_local(vid){
      this.SET_verse(vid);
    },
    range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}
  }
}
</script>

<style scoped>
.tst2 {
  margin: 2px;
  padding: 0px;
}
</style>
