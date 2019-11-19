<template>
<div class="text-xs-center my-3">
                    <v-layout column wrap>
                  <div class="title">{{verse}}</div>
                  <div class="caption">verse</div>
                  </v-layout>
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
