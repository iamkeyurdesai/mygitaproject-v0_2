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
    speakerPrevious: String,
    whatLanguage: String
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
    return this.convertDecide(this.speakerCurrent)
  } else {
    return  "\u00A0"
  }
} else {
    return this.convertDecide(this.speakerCurrent)
  }
},
convertDecide(val) {
  if(this.whatLanguage===undefined) {
    return this.convert(val)
  } else {
    if(this.whatLanguage==='hindi'){
      if(val==='śrībhagavānuvāca') {return 'श्री भगवान ने कहा'}
      if(val==='arjuna uvāca') {return 'अर्जुन ने कहा'}
      if(val==='dhṛtarāṣṭra uvāca') {return 'धृतराष्ट्र ने कहा'}
      if(val==='sañjaya uvāca') {return 'सञ्जय ने कहा'}
      if(val==='dharovāca') {return 'धरा ने कहा'}
      if(val==='śrī viṣṇuruvāca') {return 'श्री विष्णु ने कहा'}
      if(val==='sūta uvāca') {return 'सूत ने कहा'}
    }
    if(this.whatLanguage==='english'){
      if(val==='śrībhagavānuvāca') {return 'The Blessed Lord said'}
      if(val==='arjuna uvāca') {return 'Arjuna said'}
      if(val==='dhṛtarāṣṭra uvāca') {return 'Dhṛtarāṣṭra said'}
      if(val==='sañjaya uvāca') {return 'Sañjaya said'}
      if(val==='dharovāca') {return 'Dharā said'}
      if(val==='śrī viṣṇuruvāca') {return 'The Blessed Vishnu said'}
      if(val==='sūta uvāca') {return 'Suta said'}
    }
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
