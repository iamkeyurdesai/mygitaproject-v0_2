<template>
<div v-touch="{
      left: () => increment(),
      right: () => decrement()
    }" :style="cssProps">

    <v-card
       class="mx-0 background lighten-1"
       max-width="500"
       :dark="GET_dark"
     >
     <v-card
      flat
      dark
    >
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

<v-card-text class="pa-0 ">
    <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              color="button"
              small
              v-for="(item, i) in GET_gitapress_chapter"
              :key="i"
              fill-dot
            >
            <span slot="icon">{{item.verse_id}}</span>

              <v-layout pt-0>
                <v-flex>
                  <v-hover>
     <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`"
     class="mr-2 pa-1 background" :dark="GET_dark">
                  <v-card-title class="pa-2 accentmain">{{item.sambandh}}</v-card-title>
                  <v-card-text class="pa-2">{{item.bhavarth}}</v-card-text>
                </v-card>
                </v-hover>
                </v-flex>
              </v-layout>

            </v-timeline-item>

          </v-timeline>
</v-card-text>
</v-card>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {

    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language']),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter']),
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
    ...mapMutations('parameters', ['increment', 'decrement', 'SET_value'])
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
}
</script>

<style lang="scss">
</style>
