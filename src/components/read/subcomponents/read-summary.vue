<template>
  <v-flex class="secondary ma-2 pa-0 xs12 md6">
    <div align="center" class="title primary--text pa-2 font-weight-medium">
      Chapter {{chapter}} Summary
    </span>
  </div>
  <v-container grid-list-xs class="text-xs-left ma-0 pa-1">
    <v-layout column wrap class="ma-0">
      <v-card class="ma-1">
        <v-card-text class="pa-1 adjustLineHeight" :style="cssProps">
          <span v-show="showFullSummary" v-html="preview[chapter-1].preview">
          </span>
          <span v-show="showFullSummary" :style="this.options['saraswati'].emphasis.disabled" class="font-weight-light" @click="showFullSummary=false"> less </span>
          <div v-show="!showFullSummary"> <span> {{truncateWithEllipses}} </span>
            <span :style="this.options['saraswati'].emphasis.disabled" class="font-weight-light" @click="showFullSummary=true"> more </span>
          </div>
        </v-card-text>
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
    showFullSummary: false
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem', 'language']),
    ...mapState('coretext', ['preview']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() { return {
      color: this.options["saraswati"].emphasis.high
    }
  },
  truncateWithEllipses() {
    let text = this.preview[this.chapter - 1].preview
    let max = 200
    console.log(text)
    return text.substr(0,max-1)+(text.length>max ? '' : '');
  }
},
methods: {
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
