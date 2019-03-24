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
      <div>
        <span class="title ma-2 font-weight-light">{{item.verse_id}}</span>
        <v-btn flat icon> <v-icon>link</v-icon> </v-btn>
        <v-btn flat icon> <v-icon>translate</v-icon> </v-btn>
        <v-btn flat icon> <v-icon>format_bold</v-icon> </v-btn>
        <v-btn flat icon v-if="!breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
        <v-icon :style="options[theme].emphasis.medium"> gavel</v-icon>
        </v-btn>
          <v-btn flat icon  v-if="breakSandhi" v-on:click.stop="SET_breakSandhi(!breakSandhi)">
            <v-icon :style="options[theme].emphasis.high"> gavel</v-icon>
        </v-btn>
        <v-btn flat icon> <v-icon>favorite_border</v-icon> </v-btn>
      </div>
        <v-divider :dark="GET_dark"></v-divider>
      <v-card-title class="pa-2  font-weight-light"> {{item.sambandh}} </v-card-title>
      <v-divider :dark="GET_dark"></v-divider>
<shloak-card :verse_id="item.verse_id"></shloak-card>
      <v-divider :dark="GET_dark"></v-divider>
      <v-card-text class="pa-2  font-weight-light"> {{item.bhavarth}} </v-card-text>
      <v-divider :dark="GET_dark"></v-divider>

      <anvaya-card></anvaya-card>

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
import shloakcard from './Primary/shloak-card.vue'
import anvayacard from './Primary/anvaya-card.vue'
export default {
  data: function() {
    return {

    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi']),
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
    'shloak-card': shloakcard,
    'anvaya-card': anvayacard
  }
}
</script>

<style lang="scss">
.trantext {
    column-width: auto;
}
</style>
