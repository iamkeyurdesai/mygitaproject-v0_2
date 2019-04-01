<template>
  <v-flex class="secondary ma-2 pa-0 xs12 md6">
    <div align="center" class="title primary--text pa-2 font-weight-medium">
      Chapter {{chapter}} Outline
      </span>
    </div>
        <v-container grid-list-xs class="text-xs-left ma-0 pa-1">
          <v-layout column wrap class="ma-0">
            <v-card class="ma-1" v-for="(item, i) in mysummary" :key="i">
              <v-layout justify-center row> <!--  :class="['pa-3 mygroup', {active: this.isActiveGroup}]" -->
                <v-flex>
                  <v-card-text class="pa-1 font-weight-regular adjustLineHeight" :class="options.fsizeInternal['medium']" :style="cssProps">
                    {{item[language]}}
                  </v-card-text>
                </v-flex>
                <v-flex>
                  <v-card-text class="pa-1" :class="options.fsizeInternal['medium']">
                    <span  v-for="(vid, j) in range(item.begin, item.end)"  :key="j">
                      <button  class="activity subheading mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-if="vid==verse"> {{vid}} </button>
                      <button  class="caption mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-else> {{vid}} </button>
                    </span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-layout>
        </v-container>
      </v-flex>
</template>
<!-- <v-btn @click="$vuetify.goTo('read'+this.chapter+vid, { duration: 300, offset: 0, easing: 'easeInOutCubic'})">
  <v-icon>arrow_left</v-icon>
</v-btn> -->
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem', 'language']),
    ...mapState('coretext', ['summary']),
    ...mapGetters('settings', ['GET_dark']),
    mysummary(){
      return this.summary.filter(function(item) {
        return item.chapter_id == this;
      }, this.chapter);
    },
    cssProps() { return {
        color: this.options["saraswati"].emphasis.high
  }
}
  },
  methods: {
    ...mapMutations('parameters', ['SET_verse']),
    setVerse_local(vid){
      this.SET_verse(vid);
      this.$vuetify.goTo('#read' + (vid - 1), { duration: 300, offset: 0, easing: 'easeInOutCubic'})
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
.mybutton{
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
  width: 1.6rem;
  height: auto;
}
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
