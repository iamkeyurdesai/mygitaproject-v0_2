<!-- This componet will render the link between shloaks
The verse_id is provided as a prop
The language is decided from Vuex parameters-->

<template>
<div :style="cssProps">


  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom right fixed class="mb-5 shiftRight" v-on:click.stop="increment()" small v-if="lrArrowShow">
        <v-icon :style="cssProps_high"> keyboard_arrow_right</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition>
    <v-btn v-show="offsetTop > 700 || chapter > 18" color="accentmain" dark fab bottom left fixed class="mb-5 shiftLeft" v-on:click.stop="decrement()" small v-if="lrArrowShow">
        <v-icon :style="cssProps_high"> keyboard_arrow_left</v-icon>
    </v-btn>
  </v-fab-transition>




    <v-fab-transition>
      <!-- <v-btn v-show="!fabShow & offsetTop > 1200" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
        color="rgba(255, 0, 43, 0.6)" dark fab small bottom left fixed class="mb-5 shiftLeft"> -->
        <v-btn v-show="offsetTop >  1000" @click="$vuetify.goTo(0, { duration: 300, offset: 0, easing: 'easeInOutCubic'})"
          dark fab flat bottom small left fixed icon class="shiftMiddle mb-5">
        <v-icon>fa-angle-double-up</v-icon>
      </v-btn>
    </v-fab-transition>


    <!-- share -->
        <v-fab-transition>
    <v-btn icon  color="success" v-on:click.stop="readHelp = true" dark fab small bottom right fixed class="shiftUpUp shiftRight" v-if="share">
      <v-icon :style="cssProps_medium"> share</v-icon>
    </v-btn>
</v-fab-transition>


<v-bottom-sheet v-model="readHelp" inset >
<div class="secondary">
  <v-subheader class="subheading info--text"> Share using </v-subheader>
  <!-- <span class="caption"> {{path}} </span>
  <span class="caption"> <br> {{readHelp}} </span> -->
<!-- <v-divider> </v-divider> -->
<social-sharing :url="'https://gitawebapp.firebaseapp.com'+path"
                      title="Power Gita"
                      description="Read, Reflect, Meditate, Realize, with Power Gita."
                      quote="Power Gita is a modern app designed to help you acheive your spiritual goals — so you can realize your true potential."
                      hashtags="Gita,Meditation,Yoga,Philosophy"
inline-template>
<div class="mx-3">
<network network="facebook">
<v-btn icon> <v-icon class="mx-3" large color="#4267b2"> fab fa-facebook</v-icon> </v-btn>
</network>
<network network="twitter">
<v-btn icon> <v-icon class="mx-3" large color="#38A1F3"> fab fa-twitter</v-icon> </v-btn>
</network>
<!-- <network network="whatsapp">
<v-icon class="ma-3" large> mdi-whatsapp</v-icon>
</network> -->
</div>
</social-sharing>
<!-- <div class="px-3"> -->
<!-- <vue-goodshare-facebook
    :page_url="'https://gitawebapp.firebaseapp.com'+path"
    has_counter
    has_icon
  ></vue-goodshare-facebook>
  <vue-goodshare-whatsapp
      :page_url="'https://gitawebapp.firebaseapp.com'+path"
      has_icon
    ></vue-goodshare-whatsapp>
    <vue-goodshare-twitter
        :page_url="'https://gitawebapp.firebaseapp.com'+path"
        has_counter
        has_icon
      ></vue-goodshare-twitter> -->
      <!-- <facebook :url="'https://gitawebapp.firebaseapp.com'+path" scale="3"></facebook>
          <twitter :url="'https://gitawebapp.firebaseapp.com'+path" title="Power Gita" scale="3"></twitter>
          <whats-app :url="'https://gitawebapp.firebaseapp.com'+path" title="Power Gita" scale="3"></whats-app>           -->
  <br>
<!-- </div> -->

</div>
</v-bottom-sheet>

</div>
</template>



<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';

// import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue"
// import VueGoodshareWhatsapp from "vue-goodshare/src/providers/WhatsApp.vue"
// import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue"
// import {
//   Facebook,
//   Twitter,
//   WhatsApp,
// } from "vue-socialmedia-share";

export default {
  props: {
    required: true,
    lrArrowShow: Boolean,
    share: Boolean
  },
  components: {
    // Facebook,
    // Twitter,
    // WhatsApp
    // VueGoodshareTwitter,
    // VueGoodshareFacebook,
    // VueGoodshareWhatsapp
  },
  data: () => ({
    fab: false,
    readHelp: false,
    tiles: [
        { icon: 'format_size', title: 'select language' },
        { icon: 'view_headline', title: 'read original verses' },
        { icon: 'link', title: 'read links' },
        { icon: 'translate', title: 'read translation' },
        { icon: 'format_bold', title: 'read word-by-word' },
        { icon: 'gavel', title: 'break sandhi (word fusion)' }
      ]
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['theme', 'breakSandhi', 'showLink', 'showTranslation', 'showAnvaya', 'showVerse',
    'fabShow', 'offsetTop', 'chapter', 'path']),
    cssProps_medium() { return {
        'color': '#FFFFFFFF'
  }},
  cssProps_high() { return {
      'color': '#FFFFFFFF'
}
},  cssProps() { return {
      // '--screenWidth': this.$vuetify.breakpoint.width/2+'px',
      '--screenWidth': (this.$vuetify.breakpoint.width/2 - 40)+'px',
}
}
  },
  methods: {
    ...mapMutations('parameters', ['SET_breakSandhi', 'SET_showLink', 'SET_showTranslation', 'SET_showAnvaya',
    'SET_showVerse', 'increment', 'decrement']),
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
.shrinkHeight {
  line-height: 1.1em;
}
.shiftUp{
  margin-bottom: 100px;
}
.shiftUpUp{
  margin-bottom: 150px;
}
.shiftLeft{
  margin-left: -5px;
}
.shiftRight{
  margin-right: -5px;
}
.shiftMiddle{
  margin-left: var(--screenWidth);
  opacity: 0.67;
  }
</style>
