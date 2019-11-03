<!-- This component will render speaker name if appropriate
several props provide the required info to render-->

<template>
  <v-layout justify-center>
    <span class="activity--text"> {{myText()}} </span>
  </v-layout>
</template>

<script>
import Sanscript from 'Sanscript';
export default {
  props: {
    verse_id: Number,
    required: true,
    whatScript: String,
    speakerCurrent: String,
    speakerPrevious: String
  },
  data: () => ({
  }),
  methods: {
  convert(myinput) {
    return Sanscript.t(myinput, 'iast', this.whatScript)
},
myText() {
  if(this.verse_id > 1) {
  if(this.speakerCurrent!==this.speakerPrevious) {
    return this.convert(this.speakerCurrent)
  } else {
    return  ""
  }
} else {
    return this.convert(this.speakerCurrent)
  }
}
  }
}
</script>

<style scoped>
.adjustLineHeight {
  line-height: 1.6em;
}
</style>
