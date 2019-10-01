<template>
        <v-layout column class="background lighten-1" :style="cssProps">

<v-card class="indigo lighten-5">
            <v-flex shrink class="ma-3" :dark="GET_dark" v-for="(item,i) in this.groupMessages" :key="i">
             <span class="grey lighten-5 elevation-5 addBorderRound pa-1 d-inline-block speech-bubble">
               <span class="caption" :style="'color: ' + colorize(item.name)"> {{item.name}}</span>
               <br>
              {{item.message}}

               <span class="tinyFont" :style="'color: ' + options['light'].emphasis.disabled"> {{getAMPM(item.time)}} </span>
             </span>

          </v-flex>
          <v-layout row v-if="true" class="ma-3" :dark="GET_dark">
            <v-textarea outline v-model="inputMessage" :rules="inputRules" label="Type a message" box auto-grow rows="1"></v-textarea>
            <v-btn fab color="green" small dark @click="addChantMessage()"> <v-icon>send</v-icon> </v-btn>
          </v-layout>
        </v-card>
        </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  data: function() {
    return {
      index: null,
      results: null,
      groupMessages: null,
      groupMessagesRef: null,
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
    });
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi', 'currentChantGroup',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall'
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {
        '--formBorderColor': this.$vuetify.theme.primary,
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
  }
},
  components: {
  }
}
</script>

<style lang="scss">
.addBorderRound{
    border-radius: 8px;
}
.tinyFont{
  font-size: x-small;
}
.speech-bubble {
	position: relative;
	// border-radius: .4em;
  border-radius: 8px;
  background: #FAFAFA;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-left: 0;
  border-right-color: #FAFAFA;
	margin-top: -10px;
	margin-left: -10px;
}
</style>
