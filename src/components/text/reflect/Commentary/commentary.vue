<template>
<div id="content" v-touch="{
      left: () => increment(),
      right: () => decrement()
    }">
  <!-- header containing chapter, verse and salutation -->
  <v-flex xs12 class="head">
    <v-layout align-content-space-between>
      <chapter-menu></chapter-menu>
      <v-spacer></v-spacer>
      <!-- ॥ {{convert('oṃ śrī paramātmane namaḥ')}} ॥ -->
      {{GET_salutation}}
      <v-spacer></v-spacer>
      <verse-menu></verse-menu>
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>
  </v-flex>

  <!-- commentary component-->
  <div xs12 class="comm">

    <v-layout align-content-space-between>
          &nbsp;
      <v-spacer></v-spacer>
          <sivananda-commentary></sivananda-commentary>
          <v-spacer></v-spacer>
              &nbsp;
        </v-layout>

  </div>


</div>
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
    'sivananda-commentary': sivanandaCommentary
  }
}
</script>

<style lang="scss" scoped>
// #content {
//     display: grid;
//     grid-template-columns: repeat(9, 1fr);
//     grid-auto-rows: minmax(30px, auto);
//     grid-gap: 5px;
//     margin: 0 auto;
//     grid-template-areas:
//     "head head head head head head head head head"
//     "comm comm comm comm comm comm comm comm comm"
//     "comm comm comm comm comm comm comm comm comm"
//     "comm comm comm comm comm comm comm comm comm"
//     "comm comm comm comm comm comm comm comm comm"
//     "foot foot foot foot foot foot foot foot foot"
//
// }
// /* desktop grid */
// @media screen and (min-width: 760px) {
//     #content {
//         display: grid;
//         grid-template-columns: repeat(9, 1fr);
//         grid-auto-rows: minmax(30px, auto);
//         grid-gap: 5px;
//         max-width: 960px;
//         margin: 0 auto;
//         grid-template-areas:
//         "head head head head head head head head head"
//         "comm comm comm comm comm comm comm comm comm"
//         "comm comm comm comm comm comm comm comm comm"
//         "comm comm comm comm comm comm comm comm comm"
//         "comm comm comm comm comm comm comm comm comm"
//         "foot foot foot foot foot foot foot foot foot"
//     }
// }
.head {
    grid-area: head;
}
.comm {
    grid-area: samb;
}
//
// @font-face {
//     font-family: myfont;
//     src: url("../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf");
// }
</style>
