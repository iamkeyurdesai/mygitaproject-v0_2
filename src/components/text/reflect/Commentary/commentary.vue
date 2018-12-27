<template>
<v-layout v-scroll="onScroll" column v-touch="{
      left: () => increment(),
      right: () => decrement(),
      up: () => {fabShow = true},
      down: () => {fabShow = false}
    }">
  <!-- header containing chapter, verse and salutation -->

    <v-layout justify-space-between row class="mb-1">
      <chapter-menu></chapter-menu>
      <v-btn  flat>{{GET_salutation}}</v-btn>
      <verse-menu></verse-menu>
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>

  <!-- commentary component-->
  <v-tabs v-model="active" color="primary lighten-1" slider-color="yellow" >
        <v-tab v-for="n in 2" :key="n" ripple class="secondary--text darken-1">
          {{options[theme].toolbar}}
        </v-tab>
        <v-tab-item v-for="n in 2" :key="n" >
          <v-layout justify-space-between  class="mt-1 pa-3">
      <sivananda-commentary>
      </sivananda-commentary>
                  </v-layout>
        </v-tab-item>
      </v-tabs>

<v-fab-transition>
        <v-speed-dial v-model="fab" fab small bottom right fixed class="mb-5" >
              <v-btn v-show="fabShow" slot="activator" v-model="fab" color="blue darken-2" dark fab small >
                <v-icon>account_circle</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn fab dark small color="green" >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn fab dark small color="indigo" >
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn fab dark small color="red" >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-speed-dial>
</v-fab-transition>

<v-fab-transition>
              <v-btn v-show="!fabShow & offsetTop > 500" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
                color="blue darken-2" dark fab small bottom left fixed class="my-4 mx-0">
                <v-icon>arrow_upward</v-icon>
              </v-btn>
              </v-fab-transition>

  </v-layout>

</template>

<script>
import chaptermenu from '../chapter-menu.vue'
import versemenu from '../verse-menu.vue'
import sivanandaCommentary from './sivananda_commentary.vue'

import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      active: null,
      fab: false,
      fabShow: false,
      offsetTop: 0,
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
    },
      onScroll (e) {
        let scrollTemp = window.pageYOffset || document.documentElement.scrollTop
        if(scrollTemp < this.offsetTop) {
          this.fabShow = true
        } else {
          this.fabShow = false
        }
        this.offsetTop = scrollTemp
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
    'sivananda-commentary': sivanandaCommentary
  }
}
</script>

<style lang="scss" scoped>
</style>
