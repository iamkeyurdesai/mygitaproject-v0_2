<template>
<v-card class="ma-1 background">
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0 xs12 lg6">
        <div align="left" class="subheading font-weight-regular" :style="cssProps">
          Chapter {{chapter}} Summary
        </span>
      </div>

        <v-card-text class="pa-1 adjustLineHeight font-weight-light" :style="cssProps">
          <span v-if="showFullSummary" :style="'color:' + this.options[this.theme].emphasis.high" v-html="this.GET_preview_chapter[this.language]">
          </span>
          <span v-if="showFullSummary" :style="'color:' + this.options[this.theme].emphasis.disabled" class="font-weight-light" @click="showFullSummary=false"> less </span>
          <div v-if="!showFullSummary" :style="'color:' + this.options[this.theme].emphasis.high"> <span> {{truncateWithEllipses}} </span>
            <span :style="'color:' + this.options[this.theme].emphasis.disabled" class="font-weight-light" @click="showFullSummary=true"> more </span>
          </div>
        </v-card-text>
      </v-flex>
      </v-layout>
      </v-card>
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
    ...mapGetters('coretext', ['GET_preview_chapter']),
    cssProps() { return {
      color: this.options[this.theme].emphasis.high
    }
  },
  truncateWithEllipses() {
    let text = this.GET_preview_chapter[this.language]
    let max = 200
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
