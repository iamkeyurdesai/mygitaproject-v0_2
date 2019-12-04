<template>

  <div :style="cssProps" :dark="GET_dark">
 <v-layout column align-center justify-center  class="px-5 py-4  fixedWidth" v-if="$vuetify.breakpoint.width < 650">
   <div class="display-2 font-weight-bold info--text" >
     Read <br> Reflect <br> Realize, with
     <div class="display-3 font-weight-bold info--text" > Power Gita
       </div>
   </div>
   <div class="subheading font-weight-medium my-3" :dark="GET_dark" :style="'color:' + this.options[this.theme].emphasis.high">
     The essential app to help you gain a clear knowledge of the Bhagavad-Gita.
<!-- Power Gita is a modern app designed to help you acheive your spiritual goals &#8212;
so you can realize your true potential. -->
 <div>
<v-layout>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" @click="$router.push(path)" >  ENTER / RESUME  </v-btn>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" v-if="false">  Take a Tour  </v-btn>
</v-layout>
</div>
    </div>
</v-layout>
<v-layout column align-center justify-center  class="px-5 py-5 fixedWidth" v-else>
  <div class="display-2 font-weight-bold info--text" >
    Read <br> Reflect <br> Realize, with
    <div class="display-3 font-weight-bold info--text" > Power Gita
      </div>
  </div>
  <v-layout class="subheading font-weight-medium my-3" :dark="GET_dark" :style="'color:' + this.options[this.theme].emphasis.high">
<v-card flat class="background" :dark="GET_dark">
    The essential app to help you gain a clear knowledge of the Bhagavad-Gita.
<!-- Power Gita is a modern app designed to help you acheive your spiritual goals &#8212;
so you can realize your true potential. -->
</v-card>
</v-layout>
<v-layout>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" @click="$router.push(path)" > <span class="title"> ENTER / RESUME </span>  </v-btn>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" v-if="false">  Take a Tour  </v-btn>
</v-layout>
</v-layout>


<v-card flat dark>
  <v-img
  src="static/img/chapter_preview/previewchapter4.jpeg"
  >
</v-img>
</v-card>

<v-divider :dark="GET_dark"></v-divider>
<v-layout align-center justify-center column class="my-4" :style="'color:' + this.options[this.theme].emphasis.high">
  <div class="headline">
    <v-card flat class="background" :dark="GET_dark">
    Frequently Asked Questions
    </v-card>
  </div>
<v-card class="background"  flat >
  <v-expansion-panel popout :dark="GET_dark" class="background">
      <v-expansion-panel-content
        v-for="(item,i) in myHelpText"
        :key="i"
        class="background subheading"
      >
        <template slot="header">
          <div>{{item.question}}</div>
        </template>
        <v-card class="background body-2" flat>
          <v-card-text class="body-2" v-html="item.answer"></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-card>
</v-layout>

<v-layout align-center justify-center class="my-5 amber lighten-2 black--text">
    <div class="quoteSymbol">
      <v-carousel class="text-xs-center elevation-0"  height="175" hide-controls interval="15000">
    <v-carousel-item
      v-for="(item, i) in myOpeningText"
      :key="i"
      light
      class="my-2"
    >
    <div >
    <div class="font-weight-regular.font-italic" v-html="item">
  </div>
</div>
  </v-carousel-item>
  </v-carousel>
</div>
</v-layout>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      myOpeningText: [
                      "From a clear knowledge of the Bhagavad-Gita <br> all the goals of human existence become fulfilled. <br> Bhagavad-Gita is the manifest quintessence of <br> all the teachings of the Vedic scriptures.<br> <strong class='error--text mb-3'>Adi Shankara</strong>",
                  "The marvel of the Bhagavad-Gita is <br> its truly beautiful revelation of life's wisdom <br> which enables philosophy to blossom into religion.<br> <strong class='error--text mb-3'>Herman Hesse</strong>",
                "Therefore without attachment, <br> do thou always perform action which should be done; <br> for by performing action without attachment <br> man reaches the Supreme.<br> <strong class='error--text mb-3'>Bhagavad-Gita 3.19</strong>"],
      myHelpText: [{question: "What is the Bhagavad-Gita?", answer: "The Song of God. A sacred scripture. The longest philosophical peom. The manual of Yoga. The foundational text of Vedanta. Timeless inspiration. The freedom and the path. The ultimate reference on Karma Yoga. The deepest secret. Love unconditional."},
                   {question: "Why make one more app on Bhagavad-Gita?", answer: "We couldn't find that one app with the features we wanted for ourselves so we felt inspired to build one. When the project really started taking shape, all of it--the content, the interactivity and accessibility features, the group functionality--seemed quite unique and worth sharing so everyone could benefit from it."},
                   {question: "What are some of the special features of Power Gita?", answer: "Multiple scripts and languages. <br>Modern themes and typography with accessibility.<br>An advance recitation mode, where one can learn the sanskrit alphabet, listen to curated audio, perform group chanting, track progress and even share their recitation with others.<br>Cultivate deep insights by asking the right questions based on authentic commentaries."},
                 {question: "Contact us at", answer: "info@powergita.com"}]
    }
  },
  mounted() {
    //do something after mounting vue instance
    setTimeout(()=>{this.$vuetify.goTo("#carouselDivider", {
    duration: 100,
    offset: 0,
    easing: 'easeOutQuint'
  })}, 500)
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['path', 'theme']),
    ...mapGetters('settings', ['GET_dark']),
  cssProps() {
    return {
      'color': this.options[this.theme].emphasis.high
    }
  }
}
}
</script>

<style scoped>
.fixedWidth{
  width: 400px;
}
.quoteSymbol::before {
    font-family: "Times New Roman", Times, serif;
    content: open-quote;
    display: inline;
    height: 0;
    line-height: 0;
    left: 45%;
    position: relative;
    top: 50px;
    color: #7e7a7a;
    font-size: 6em;
}
</style>
