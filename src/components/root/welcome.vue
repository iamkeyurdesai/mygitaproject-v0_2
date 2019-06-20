<template>
  <!-- <div class="text-xs-center openicon" @click="$router.push(path)"> -->
    <!-- <div class="text-xs-center openicon" @click="myPathPush()"> -->

  <div :style="cssProps">
 <v-layout column align-center justify-center  class="px-5 py-4  fixedWidth" v-if="$vuetify.breakpoint.width < 650">
   <div class="display-2 font-weight-bold info--text" >
     Read <br> Reflect <br> Meditate <br> Realize, with Power Gita
   </div>
   <div class="subheading font-weight-medium my-3">
Power Gita is a modern app designed to help you acheive your spiritual goals &#8212;
so you can realize your true potential.
 <div>
<v-layout>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" @click="$router.push(path)" >  ENTER / RESUME  </v-btn>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3">  Take a Tour  </v-btn>
</v-layout>
</div>
    </div>
</v-layout>
<v-layout column align-center justify-center  class="px-5 py-5 fixedWidth" v-else>
  <div class="display-2 font-weight-bold info--text" >
    Read <br> Reflect <br> Meditate <br> Realize, with Power Gita
  </div>
  <div class="subheading font-weight-medium my-3">
Power Gita is a modern app designed to help you acheive your spiritual goals &#8212;
so you can realize your true potential.
<div>
<v-layout>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3" @click="$router.push(path)" > <span class="title"> ENTER / RESUME </span>  </v-btn>
<v-btn :dark="GET_dark" color="error" class="ml-0 mt-3">  Take a Tour  </v-btn>
</v-layout>
</div>
</div>
</v-layout>

<v-card flat dark>
  <v-img
  src="static/img/chapter_preview/previewchapter4.jpeg"
  >
</v-img>
</v-card>

<v-divider :dark="GET_dark"></v-divider>
<v-layout align-center justify-center column class="my-4">
  <div class="headline">
    Frequently Asked Questions
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
          <v-card-text class="body-2">{{item.answer}}</v-card-text>
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
      myOpeningText: ["Gita is my heart Arjuna <br> Gita is my ultimate essence <br> Gita is my fierce knowledge <br> Gita is my unending knowledge. <br> <strong class='error--text mb-3'>Krishna</strong>",
                      "Just as the water stains not the lotus leaf, <br> even so sins do not taint him who is regular in the recitation of the Gita.<br> <strong class='error--text mb-3'>Vishnu</strong>",
                      "From a clear knowledge of the Bhagavad-Gita <br> all the goals of human existence become fulfilled. <br> Bhagavad-Gita is the manifest quintessence of <br> all the teachings of the Vedic scriptures.<br> <strong class='error--text mb-3'>Adi Shankara</strong>",
                    "When I read the Bhagavad-Gita and reflect about <br> how God created this universe everything else seems so superfluous.<br> <strong class='error--text mb-3'>Albert Einstein</strong>",
                  "The marvel of the Bhagavad-Gita is <br> its truly beautiful revelation of life's wisdom <br> which enables philosophy to blossom into religion.<br> <strong class='error--text mb-3'>Herman Hesse</strong>"],
      myHelpText: [{question: "What is Power Gita?", answer: "here"},
                   {question: "How is it related to Bhagavada-Gita?", answer: "here"},
                   {question: "What is unique about Power Gita?", answer: "here"},
                   {question: "What can I do on Power Gita?", answer: "here"},
                   {question: "How much does Power Gita cost?", answer: "here"},                   
                 {question: "How can I contribute to Power Gita?", answer: "here"}]
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['path', 'theme']),
    ...mapGetters('settings', ['GET_dark']),
  cssProps() {
    return {
      '--myWidth': '350px',
      '--myColor': this.options[this.theme].emphasis.high
    }
  }
}
}
</script>

<style scoped>
.openicon {
     margin-top: 200px;
     color: red;
     font-size: 1000%;
    -webkit-animation-name: openicon; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 5s; /* Safari 4.0 - 8.0 */
    animation-name: openicon;
    animation-duration: 5s;
    animation-iteration-count:50;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes openicon {
    from {color: red;}
    to {color: green;}
}
/* Standard syntax */
@keyframes openicon {
    from {color: red;}
    to {color: green;}
}
.addBorder{
  width: var(--myWidth);
  border: 1px solid var(--myColor);
  border-radius: 8px;
}
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
