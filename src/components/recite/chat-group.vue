<template>
        <v-layout column class="background lighten-1" :style="cssProps">

<v-card class="indigo lighten-5 makeRelative1">
<!-- <v-flex > -->
  <!-- <v-layout column justify-end fill-height class="makeOverflow"> -->
  <!-- <div class="makeOverflow1"> -->

            <v-layout v-bind="{'justify-end':item.name===userName}" :dark="GET_dark" v-for="(item,i) in this.groupMessages1" :key="i">
<v-flex :class="decideBubble(item.name,i)!=='speech-bubble-simple'?'mx-3 mt-3 mb-1':'mx-3 mt-1 mb-1'" shrink>
             <span class="grey lighten-5 elevation-5 addBorderRound pa-1 d-inline-block"
             :class="decideBubble(item.name,i)" :id="`chantChat${i+1}`">
               <span class="caption" :style="'color: ' + colorize(item.name)" v-if="decideBubble(item.name,i)!=='speech-bubble-simple'"> {{item.name}}<br></span>
              {{item.message}}
               <span class="tinyFont" :style="'color: ' + options['light'].emphasis.disabled"> {{getAMPM(item.time)}} </span>
             </span>

          </v-flex>
</v-layout>
        <!-- </div> -->
        <!-- </v-layout> -->
        <!-- </v-flex> -->
          <v-layout row v-if="true" class="ma-3 makeRelative" :dark="GET_dark">
            <v-textarea outline v-model="inputMessage" :rules="inputRules" label="Type a message" box auto-grow rows="1"></v-textarea>
            <v-btn fab color="green" small dark @click="addChantMessage()"> <v-icon>send</v-icon> </v-btn>
          </v-layout>
        </v-card>
        </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Sanscript from 'Sanscript';
import anime from 'animejs'
export default {
  data: function() {
    return {
      index: null,
      results: null,
      myTop: 0,
      groupMessages: null,
      groupMessages1: [],
      groupMessagesRef: null,
      groupMessagesRef1: null,
      valid: true,
      inputMessage: '',
      myGroups: '',
      myGroupsData: '',
      inputRules: [
        v => (v.length <= 150) || 'Message must be less than 150 characters'
      ],
      select: null,
      items: [],
      checkbox: false,
      searchGroup: '',
      showForm: false
    }
  },
  mounted() {
    this.groupMessagesRef = firebase.database().ref('chats/chant/' + this.currentChantGroup).limitToLast(10)
    this.groupMessagesRef.on('value',
    (snapshot) => {
     this.groupMessages = snapshot.val()
     console.log(this.groupMessages1)
    });
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi', 'currentChantGroup',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall', 'userName',
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {
        '--formBorderColor': this.$vuetify.theme.primary,
        '--myChatHeight': this.groupMessages1.length*50+'px'
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter',
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
addChantMessage(val) {
  var database = firebase.database();
  firebase.database().ref('chats/chant/' + this.currentChantGroup + '/').push().set({
    name: firebase.auth().currentUser.displayName,
    message: this.inputMessage,
    time: firebase.database.ServerValue.TIMESTAMP
  }).then(this.inputMessage='')
},
getAMPM(val) {
  var time = new Date(val)
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
},
colorize(str) {
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    let color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
},
decideBubble(name,i){
  if(i===0){
    return name===this.userName?'speech-bubble-right':'speech-bubble-left'
} else {
  if(this.groupMessages1[i].name===this.groupMessages1[i-1].name) {
    return 'speech-bubble-simple'
  } else {
    return name===this.userName?'speech-bubble-right':'speech-bubble-left'
  }
}
}
},
watch: {
  currentChantGroup: function(){
    this.groupMessagesRef.off('value')
     this.groupMessagesRef = firebase.database().ref('chats/chant/' + this.currentChantGroup).limitToLast(10)
     this.groupMessagesRef.on('value',
    (snapshot) => {
      this.groupMessages = snapshot.val()
    });

    this.groupMessagesRef1 = firebase.database().ref('chats/chant/' + this.currentChantGroup).limitToLast(5)
this.groupMessagesRef1.on('child_added', (data) => {
  // console.log(data.val())
  this.myTop = window.pageYOffset
  this.groupMessages1.push(data.val())
  // console.log(this.groupMessages1)
  setTimeout(() => {
    anime({
  targets: '#chantChat'+this.groupMessages1.length,
  direction: 'normal',
  opacity: [0, 1],
  scale: [0, 1],
  easing: 'linear',
  duration: 500
  })
    let el = document.getElementById('chantChat'+this.groupMessages1.length);
let style = window.getComputedStyle(el);
let height = ['height', 'padding-top', 'padding-bottom', 'margin-top']
        .map((key) => parseInt(style.getPropertyValue(key), 10))
        .reduce((prev, cur) => prev + cur);
      console.log(height)
      console.log(this.myTop+height)
    this.$vuetify.goTo(this.myTop+(height+56), {
    duration: 400,
    offset: 0,
    easing: 'linear'
  })}, 10)
});

  }
},
  components: {
  }
}
</script>

<style lang="scss">
.addBorderRound{
    border-radius: 8px;
    max-width: 400px;
}
.tinyFont{
  font-size: x-small;
}
.speech-bubble-left {
	position: relative;
	// border-radius: .4em;
  border-radius: 8px;
  background: #FAFAFA;
}
.speech-bubble-right {
	position: relative;
	// border-radius: .4em;
  border-radius: 8px;
  background: #FAFAFA;
}
.speech-bubble-simple {
	position: relative;
	// border-radius: .4em;
  border-radius: 8px;
  background: #FAFAFA;
}
.speech-bubble-left:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #FAFAFA;
	border-left: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-left: -20px;
}
.speech-bubble-right:after {
	content: '';
	position: absolute;
	right: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-left-color: #FAFAFA;
	border-right: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-right: -20px;
}
.makeSticky{
  position: sticky;
}
.makeRelative{
  position: relative;
  bottom: 0;
}
.makeOverflow{
  // overflow: auto;
  max-height: var(--myChatHeight);
}
</style>
