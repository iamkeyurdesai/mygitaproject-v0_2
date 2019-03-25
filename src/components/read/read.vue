<template>
  <div v-touch="{
    left: () => increment(),
    right: () => decrement()
    }" :style="cssProps">

    <div
    class="mx-0 background lighten-1"
    max-width="500"
    :dark="GET_dark"
    >
    <v-card flat dark>
      <v-img
      src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
      gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
      <v-container fill-height>
        <v-layout align-center>
          <strong class="display-4 font-weight-regular mr-4">{{chapter}}</strong>
          <v-layout column justify-end>
            <div class="headline font-weight-light">{{preview[chapter-1].title}}</div>
            <div class="text-uppercase font-weight-light">{{preview[chapter-1].title}}</div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>

  <v-card-text class="pa-2">
    <v-card class="my-3 background" v-for="(item, i) in GET_gitapress_chapter" :key="i" :dark="GET_dark">
      <v-hover>
        <div slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
          <readheaderCard :verse_id="item.verse_id" v-show="showNav"> </readheaderCard>
          <v-divider :dark="GET_dark"></v-divider>

          <sambandhCard :verse_id="item.verse_id" v-if="showLink"> </sambandhCard>
          <v-divider :dark="GET_dark"></v-divider>

          <uvachCard :verse_id="item.verse_id"  v-if="showVerse"> </uvachCard>
          <shloakCard :verse_id="item.verse_id"  v-if="showVerse"></shloakCard>
          <v-divider :dark="GET_dark"></v-divider>

          <bhavarthCard :verse_id="item.verse_id"  v-if="showTranslation"> </bhavarthCard>
          <v-divider :dark="GET_dark"></v-divider>

          <anvayaCard :verse_id="item.verse_id"  v-if="showAnvaya"></anvayaCard>

        </div>
      </v-hover>
    </v-card>
  </v-card-text>
</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import shloakCard from './subcomponents/shloak-card.vue'
import anvayaCard from './subcomponents/anvaya-card.vue'
import sambandhCard from './subcomponents/sambandh-card.vue'
import bhavarthCard from './subcomponents/bhavarth-card.vue'
import readheaderCard from './subcomponents/readheader-card.vue'
import uvachCard from './subcomponents/uvach-card.vue'
export default {
  data: function() {
    return {

    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
    'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_main_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() { return {
      '--bg-hover-color': this.$vuetify.theme.accent1,
      '--hover-content': JSON.stringify(this.hoverContent),
      '--mywidth': "75px",
      '--myfill': "25px"
    }
  }
},
methods: {
  ...mapMutations('parameters', ['increment', 'decrement', 'SET_value', 'SET_breakSandhi'])
},
beforeRouteEnter(to, from, next) {
  next();
},
beforeRouteUpdate(to, from, next) {
  next();
},
components: {
  shloakCard,
  anvayaCard,
  sambandhCard,
  bhavarthCard,
  readheaderCard,
  uvachCard
}
}
</script>

<style lang="scss">
.trantext {
  column-width: auto;
}
</style>
