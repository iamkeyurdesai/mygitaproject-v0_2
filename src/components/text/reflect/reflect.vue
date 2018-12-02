<template>
<div id="content" :style="{color:options[theme].textMain}">

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
  <div class="vers">
    <shloak-card></shloak-card>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>
  </div>

  <!-- bhavarth (meaning) component -->
  <v-flex xs12 class="bhav">
    <v-layout align-content-space-between>
      <v-icon color="white" v-on:click.stop="decrement()">arrow_back_ios</v-icon>
      <v-spacer></v-spacer>
      <bhavarth-card></bhavarth-card>
      <v-spacer></v-spacer>
      <v-icon color="white" v-on:click.stop="increment()">arrow_forward_ios</v-icon>
    </v-layout>
    <v-divider :dark="options[theme].type=='dark'"></v-divider>
  </v-flex>

  <!-- anvaya (breakdown) component, farily complex rednering and styling inside -->
  <div class="tran elevation-5">
    <v-flex xs12>
      <v-layout align-content-space-between>
        <v-btn dark flat small v-on:click.stop="decreaseColumn()">
          <v-icon> remove </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="tranhead text-xs-center">
          Breakdown
        </div>
        <v-spacer></v-spacer>
        <v-btn dark flat small v-on:click.stop="increaseColumn()">
          <v-icon> add </v-icon>
        </v-btn>
      </v-layout>
      <v-divider dark></v-divider>
    </v-flex>
    <div class="trantext" v-bind:style="styleAnvaya">
      <anvaya-card></anvaya-card>
    </div>
  </div>

  <div class="nv1b">
  </div>

</div>
</template>

<script>
import chaptermenu from './chapter-menu.vue'
import versemenu from './verse-menu.vue'
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
    ...mapState('settings', ['options', 'theme', 'language']),
    ...mapState('parameters', ['chapter', 'verse', 'authenticated', 'photoURL']),
    ...mapGetters('coretext', ['GET_salutation']),
  },
  methods: {
    ...mapMutations('parameters', ['increment', 'decrement', 'setChapter', 'setVerse']),
    decreaseColumn: function() {
      this.styleAnvaya.columnCount -= 1
    },
    increaseColumn: function() {
      this.styleAnvaya.columnCount += 1
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
    next(vm => {
      // this callback has access to component instance (ie: 'this') via `vm`
      // vm.testFunc('Some Message', true)
      // console.log("Fully Entered Bar")
      if (to.params.chapter != null) vm.$store.state.parameters.chapter = parseInt(to.params.chapter);
      if (to.params.verse != null) vm.$store.state.parameters.verse = parseInt(to.params.verse);

    })

  },
  beforeRouteUpdate(to, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    // console.log(this.footcolors)
    // if (to.params.chapter != null) this.setChapter(parseInt(to.params.chapter));
    // if (to.params.verse != null) this.setVerse(parseInt(to.params.verse));
    if (to.params.chapter != null) this.$store.state.parameters.chapter = parseInt(to.params.chapter);
    if (to.params.verse != null) this.$store.state.parameters.verse = parseInt(to.params.verse);
    next()
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
    background: linear-gradient(132deg, #004e92, #004e92);
    background-size: 400% 400%;
    animation: BackgroundGradient 10s ease infinite;

    background: "#5E35B1";
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, "deep-purple darken-1", #00c6ff);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #7E57C2, #5E35B1);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(30px, auto);
    grid-gap: 3px;
    max-width: 960px;
    margin: 0 auto;
    grid-template-areas: "head head head head head head head head head" "samb samb samb samb samb samb samb samb samb" "vers vers vers vers vers vers vers vers vers" "vers vers vers vers vers vers vers vers vers" "bhav bhav bhav bhav bhav bhav bhav bhav bhav" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot";
}
/* desktop grid */
@media screen and (min-width: 760px) {
    #content {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-auto-rows: minmax(30px, auto);
        grid-gap: 3px;
        max-width: 960px;
        margin: 0 auto;
        grid-template-areas: "head head head head head head head head head" "samb samb samb samb samb samb samb samb samb" "vers vers vers vers vers vers vers vers vers" "vers vers vers vers vers vers vers vers vers" "bhav bhav bhav bhav bhav bhav bhav bhav bhav" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "nv1a tran tran tran tran tran tran tran nv1b" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot" "foot foot foot foot foot foot foot foot foot";
    }
}
#content > * {
    /* background: black; */
    /* padding: 30px; */
}
.head {
    grid-area: head;
    font-weight: 300;
    // color: red;
}
.nv1a {
    grid-area: nv1a;
    /* margin: 0; */
    /* justify-self: center;
  align-self: center; */
}
.nv1b {
    grid-area: nv1b;
    /* margin: 0; */
    /* justify-self: center;
  align-self: center; */
}
.samb {
    grid-area: samb;
    /* justify-self: center; */
    /* align-self: center; */
    // color: white;
    font-weight: 300;
}
.vers {
    grid-area: vers;
    justify-self: center;
    align-self: start;
    // color: white;
    font-weight: 300;
}
.bhav {
    grid-area: bhav;
    /* justify-self: center;
  align-self: start; */
    // color: white;
    font-weight: 300;
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
    font-weight: 300;
}

@font-face {
    font-family: myfont;
    src: url("../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf");
}
span {
    padding-right: 5px;
    font-size: 115%;
    /* word-spacing: -0.05em; */
    font-family: "myfont", 'Roboto Condensed';
}
.span-a {
    font-size: 95%;
    /* word-spacing: -0.05em; */
    /* font-family: "myfont", 'Roboto Condensed'; */
}
.myvselect {
    width: 55px;
    color: rgb(115, 65, 74);
}
@keyframes BackgroundGradient {
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
