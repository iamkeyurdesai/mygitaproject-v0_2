<template>
<div v-touch="{
      left: () => increment(),
      right: () => decrement()
    }">
  <!-- header containing chapter, verse and salutation -->

    <v-layout justify-space-between row>
      <chapter-menu></chapter-menu>
      <v-btn  flat>{{GET_salutation}}</v-btn>
      <verse-menu></verse-menu>
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>


  <!-- sambandh component-->
      <v-layout justify-center row class="pa-2">
          <sambandh-card></sambandh-card>
        </v-layout>
        <v-divider :dark="options[theme].type=='dark'"></v-divider>


  <!-- verse component; fairly complex rendering and styling inside -->
  <v-layout justify-center>


<shloak-card></shloak-card>

      </v-layout>


  <!-- bhavarth (meaning) component -->
      <v-divider :dark="options[theme].type=='dark'"></v-divider>
    <v-layout justify-center row class="pa-2">
      <bhavarth-card></bhavarth-card>
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>


  <!-- anvaya (breakdown) component, farily complex rednering and styling inside -->


<v-layout justify-center row>
    <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom left fixed v-on:click.stop="decrement()" class="my-5">
  <v-icon>arrow_back_ios</v-icon>
  </v-icon>
</v-btn> -->
  <v-btn  :dark="options[theme].type=='dark'" flat small v-on:click.stop="decreaseColumn()">
  <v-icon>remove</v-icon>
  </v-btn>
  <div>
  Breakdown
  </div>
  <v-btn  :dark="options[theme].type=='dark'" flat small v-on:click.stop="increaseColumn()">
  <v-icon>add</v-icon>
  </v-btn>
  <!-- <v-btn :dark="options[theme].type=='dark'" fab small bottom right fixed v-on:click.stop="increment()" class="my-5">
<v-icon>arrow_forward_ios</v-icon>
</v-icon>
</v-btn> -->
</v-layout>
<v-divider :dark="options[theme].type=='dark'"></v-divider>
<v-layout justify-center row class="px-5">
<div class="trantext" v-bind:style="styleAnvaya">
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
      styleAnvaya: { columnCount: 2
      }
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL', 'theme', 'language']),
    ...mapGetters('coretext', ['GET_salutation'])
  },
  methods: {
    ...mapMutations('parameters', ['increment', 'decrement', 'SET_value']),
    decreaseColumn: function() {
      if(this.styleAnvaya.columnCount > 1) this.styleAnvaya.columnCount -= 1
    },
    increaseColumn: function() {
      if(this.styleAnvaya.columnCount <4 ) this.styleAnvaya.columnCount += 1
    },
    addTodo() {
      var db = firebase.firestore();
      db.collection("users").add({
          first: "Vaibhav",
          last: "Desai"
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
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
    column-rule: 1px solid grey;
    column-width: auto;
}
</style>
