<template>
<div class="text-xs-center">
  <v-dialog v-model="sheet" hide-overlay scrollable transition="dialog-bottom-transition">
    <button slot="activator" class="pa-2">
                  <v-layout column wrap>
                  <div class="title">{{verse}}</div>
                  <div class="caption">verse</div>
                  </v-layout>
                </button>


    <!-- <span slot="activator">V-{{verse}} </span> -->

    <v-card>
      <v-toolbar card dark color="primary">
        <v-layout justify-space-between row align-center>
          <v-flex>
            <v-btn dark icon small @click.native="sheet = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
          <v-flex>
            <div class="text-xs-center subheading">
              {{subItem}} | select verse
            </div>
          </v-flex>
          <v-flex>
            <v-layout column wrap align-center>
              <div class="title">{{chapter}}</div>
              <div class="caption">chapter</div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-card class="secondary">
        <v-container grid-list-xs>
          <v-layout column wrap>
            <v-card class="my-1" v-for="(item, i) in mysummary" :key="i">
              <v-layout justify-center row>
                <!--  :class="['pa-3 mygroup', {active: this.isActiveGroup}]" -->
                <v-flex>
                  <v-card-text class="pa-1"> {{item[language]}}</v-card-text>
                </v-flex>
                <v-flex>
                  <v-card-text class="pa-1">
                    <span v-for="(vid, j) in range(item.begin, item.end)" :key="j">
        <button  class="activity subheading mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-if="vid==verse"> {{vid}} </button>
        <button  class="caption mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-else> {{vid}} </button>
      </span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-layout>
        </v-container>
      </v-card>
    </v-card>

  </v-dialog>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';
import {
  mapMutations
} from 'vuex';
import {
  mapState
} from 'vuex';
export default {
  data: () => ({
    sheet: false,
    tempcolor: 'green'
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem', 'language']),
    ...mapState('coretext', ['summary']),
    mysummary() {
      // console.log(this.summary);
      return this.summary.filter(function(item) {
        return item.chapter_id == this;
      }, this.chapter);
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_verse']),
    setVerse_local(vid) {
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
.mybutton {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  width: 1.6rem;
  height: auto;
}
</style>
