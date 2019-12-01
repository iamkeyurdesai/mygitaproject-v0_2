<template>
<div :style="cssProps">
  <v-divider :dark="GET_dark"></v-divider>
  <!-- <v-subheader :dark="GET_dark"> Reading mode </v-subheader> -->
  <v-tabs v-model="activeTab" color="background lighten-1" slider-color="activity" :dark="GET_dark">
    <v-tab href="#simple" ripple class="subheading  text-none"> Original </v-tab>
    <!-- <v-tab href="#full" ripple class="subheading"> TURBO </v-tab> -->
    <v-tabs-items v-model="activeTab" touchless>
      <v-tab-item lazy transition :value="'simple'"> <br>
        <readsimple></readsimple>
      </v-tab-item>
      <!-- <v-tab-item lazy transition :value="'full'"> <br>
        <readfull></readfull>
      </v-tab-item> -->
    </v-tabs-items>
  </v-tabs>
</div>
</template>

<script>
import readfull from './read-full.vue'
import readsimple from './read-simple.vue'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  components: {
    readfull,
    readsimple,
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {}
    },
    activeTab: {
      get() {
        return this.$store.state.parameters.activeTab
      },
      set(value) {
        this.SET_activeTab(value)
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_activeTab']),
  }
}
</script>

<style lang="scss">
</style>
