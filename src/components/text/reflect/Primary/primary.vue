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

  <!-- sambandh component-->
  <v-flex xs12 class="samb">
    <v-layout align-content-space-between>
          &nbsp;
      <v-spacer></v-spacer>
          <sambandh-card></sambandh-card>
          <v-spacer></v-spacer>
              &nbsp;
        </v-layout>
        <v-divider :dark="options[theme].type=='dark'"></v-divider>
  </v-flex>

  <!-- verse component; fairly complex rendering and styling inside -->
  <v-flex xs12 class="vers">
    <shloak-card></shloak-card>
  </v-flex>


  <!-- bhavarth (meaning) component -->
  <v-flex xs12 class="bhav">
    <v-divider :dark="options[theme].type=='dark'"></v-divider>
    <v-layout align-content-space-between>
          &nbsp;
      <v-spacer></v-spacer>
      <bhavarth-card></bhavarth-card>
      <v-spacer></v-spacer>
          &nbsp;
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>
  </v-flex>

  <!-- anvaya (breakdown) component, farily complex rednering and styling inside -->
<div class="tran elevation-5" >
<div class="tranhead text-xs-center">
<v-flex>
<v-layout align-content-space-between>
<v-spacer></v-spacer>
<v-btn  :dark="options[theme].type=='dark'" flat small v-on:click.stop="decreaseColumn()">
<v-icon> remove </v-icon>
</v-btn>
<v-spacer></v-spacer>
Breakdown
<v-spacer></v-spacer>
<v-btn  :dark="options[theme].type=='dark'" flat small v-on:click.stop="increaseColumn()">
<v-icon> add </v-icon>
</v-btn>
<v-spacer></v-spacer>
</v-layout>
</v-flex>
</div>
<v-divider :dark="options[theme].type=='dark'"></v-divider>
<div class="trantext" v-bind:style="styleAnvaya">
<anvaya-card></anvaya-card>
</div>
  <!-- </v-card> -->
  </div>

<div class="nv1a">
    <v-icon flat small :dark="options[theme].type=='dark'" v-on:click.stop="decrement()">
    arrow_back_ios</v-icon>
</div>
<div class="nv1b">
    <v-icon flat small :dark="options[theme].type=='dark'" v-on:click.stop="increment()">
    arrow_forward_ios
  </v-icon>
  </div>

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
#content {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(30px, auto);
    grid-gap: 5px;
    margin: 0 auto;
    grid-template-areas:
    "head head head head head head head head head"
    "samb samb samb samb samb samb samb samb samb"
    "samb samb samb samb samb samb samb samb samb"
    "vers vers vers vers vers vers vers vers vers"
    "vers vers vers vers vers vers vers vers vers"
    "vers vers vers vers vers vers vers vers vers"
    "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
    "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "nv1a tran tran tran tran tran tran tran nv1b"
    "foot foot foot foot foot foot foot foot foot"

}
/* desktop grid */
@media screen and (min-width: 760px) {
    #content {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-auto-rows: minmax(30px, auto);
        grid-gap: 5px;
        max-width: 960px;
        margin: 0 auto;
        grid-template-areas:
        "head head head head head head head head head"
        "samb samb samb samb samb samb samb samb samb"
        "samb samb samb samb samb samb samb samb samb"
        "vers vers vers vers vers vers vers vers vers"
        "vers vers vers vers vers vers vers vers vers"
        "vers vers vers vers vers vers vers vers vers"
        "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
        "bhav bhav bhav bhav bhav bhav bhav bhav bhav"
        "nv1a tran tran tran tran tran tran tran nv1b"
        "nv1a tran tran tran tran tran tran tran nv1b"
        "nv1a tran tran tran tran tran tran tran nv1b"
        "nv1a tran tran tran tran tran tran tran nv1b"
        "foot foot foot foot foot foot foot foot foot"
    }
}
.head {
    grid-area: head;
}
.nv1a {
    grid-area: nv1a;
    justify-self: center;
}
.nv1b {
    grid-area: nv1b;
    justify-self: center;
}
.samb {
    grid-area: samb;
}
.vers {
    grid-area: vers;
    justify-self: center;
    align-self: start;
}
.bhav {
    grid-area: bhav;
}
.tran {
    grid-area: tran;
    margin-top: 5px;
}
.tranhead {
    // color: yellow;
}
.trantext {
    column-rule: 1px solid grey;
    column-width: auto;
}
//
// @font-face {
//     font-family: myfont;
//     src: url("../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf");
// }
</style>
