<template>
<div v-touch="{
      left: () => increment(),
      right: () => decrement()
    }">
  <!-- header containing chapter, verse and salutation -->

    <v-layout justify-space-between row wrap>
      <v-flex>
      <chapter-menu></chapter-menu>
      </v-flex>
      <v-flex class="pa-2 text-xs-center">
      <button>{{GET_salutation}}</button>
      </v-flex>
      <v-flex>
      <verse-menu></verse-menu>
    </v-flex>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>


  <!-- sambandh component-->
      <v-layout justify-center row class="pa-2">
          <sambandh-card></sambandh-card>
        <v-divider vertical :dark="GET_dark"></v-divider>
          <div class="ml-1 pa-2">
            graphics
          </div>
        </v-layout>
        <v-divider :dark="GET_dark"></v-divider>


  <!-- verse component; fairly complex rendering and styling inside -->

<shloak-card></shloak-card>
<v-divider :dark="GET_dark"></v-divider>


  <!-- bhavarth (meaning) component -->

  <v-layout justify-center row class="pa-2">
      <div class="ml-1 pa-2">
        graphics
      </div>
      <v-divider vertical :dark="GET_dark"></v-divider>
      <bhavarth-card class="ml-2"></bhavarth-card>
    </v-layout>
    <v-divider :dark="GET_dark"></v-divider>

  <!-- anvaya (breakdown) component, farily complex rednering and styling inside -->


<v-layout justify-center align-center row>
    <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom left fixed v-on:click.stop="decrement()" class="my-5">
  <v-icon>arrow_back_ios</v-icon>
  </v-icon>
</v-btn> -->
  <v-btn  :dark="GET_dark" flat small v-on:click.stop="decreaseColumn()">
  <v-icon>remove</v-icon>
  </v-btn>
  <div>
  Breakdown
  </div>
  <v-btn  :dark="GET_dark" flat small v-on:click.stop="increaseColumn()">
  <v-icon>add</v-icon>
  </v-btn>
  <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom right fixed v-on:click.stop="increment()" class="my-5">
<v-icon>arrow_forward_ios</v-icon>
</v-icon>
</v-btn> -->
</v-layout>
<v-divider :dark="GET_dark"></v-divider>
<v-layout justify-center row class="px-5">
<div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #FFFFFF5F'} ]" v-if="this.GET_dark">
<anvaya-card></anvaya-card>
</div>
<div class="trantext" v-bind:style="[styleAnvaya, {columnRule: '1px solid #0000005F'}]" v-else>
<anvaya-card></anvaya-card>
</div>
</v-layout>

</div>
</template>

<script>
import chaptermenu from '../chapter-menu.vue'
import versemenu from '../verse-menu.vue'
import sambandhcard from './sambandh-card.vue'
import shloakcard from './shloak-card.vue'
import bhavarthcard from './bhavarth-card.vue'
import anvayacard from './anvaya-card.vue'

import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      styleAnvaya: {
        columnCount: 2
      }
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language']),
    ...mapGetters('coretext', ['GET_salutation']),
    ...mapGetters('settings', ['GET_dark'])
  },
  methods: {
    ...mapMutations('parameters', ['increment', 'decrement', 'SET_value']),
    decreaseColumn: function() {
      if(this.styleAnvaya.columnCount > 1) this.styleAnvaya.columnCount -= 1
    },
    increaseColumn: function() {
      if(this.styleAnvaya.columnCount <4 ) this.styleAnvaya.columnCount += 1
    },
    changeTheme(val){
      console.log(this.$vuetify)
      this.$vuetify.theme = Object.assign({}, this.options["lakshmi"].theme)
      console.log(this.$vuetify)
    }
  },
  beforeRouteEnter(to, from, next) {
    // Pass a callback to next (optional)
    // next(vm => {})
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    'chapter-menu': chaptermenu,
    'verse-menu': versemenu,
    'shloak-card': shloakcard,
    'anvaya-card': anvayacard,
    'sambandh-card': sambandhcard,
    'bhavarth-card': bhavarthcard
  }
}
</script>

<style lang="scss" scoped>
.trantext {
    column-width: auto;
}
</style>
