<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
    <button slot="activator" class="pa-2">
                  <v-layout column wrap>
                  <div class="title">{{verse}}</div>
                  <div class="caption">verse</div>
                  </v-layout>
                </button>


    <!-- <span slot="activator">V-{{verse}} </span> -->

<v-card-text>
    <v-card tile>
      <v-toolbar card dark color="primary">
        Select Verse
  <v-spacer></v-spacer>
      <v-btn icon dark @click.native="sheet = false">
        <v-icon>close</v-icon>
      </v-btn>
        <v-spacer></v-spacer>
            Chapter {{chapter}}
      </v-toolbar>
      </v-card>
      <v-card class="secondary">
        <v-container grid-list-md>
          <v-layout row wrap>
<v-flex v-for="(item, i) in mysummary" :key="i">
  <v-card>
        <div> {{item.summary}}</div>
          <span  v-for="(vid, j) in range(item.begin, item.end)" :key="j">
        <v-btn  class="subheading pa-0 ma-1" small  fab color="active" @click.native.stop="setVerse_local(vid)" v-if="vid==verse">{{vid}}</v-btn>
        <v-btn class="caption pa-0 ma-1"  small fab @click.native.stop="setVerse_local(vid)" v-else>{{vid}}</v-btn>
      </span>
    </v-card>
    </v-flex>
    </v-layout>
    </v-container>
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

</style>
