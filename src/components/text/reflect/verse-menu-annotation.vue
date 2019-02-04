<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
    <button slot="activator" class="pa-2">
                  <v-layout column wrap>
                  <div class="title">{{verse_local}}</div>
                  <div class="caption">verse</div>
                  </v-layout>
                </button>


    <!-- <span slot="activator">V-{{verse}} </span> -->

<v-card>
      <v-toolbar card dark color="primary">
<v-layout justify-space-between row align-center>
<v-flex>
        <v-btn dark icon small @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
          <div class="text-xs-center subheading">
        {{subItem}} | select verse
      </div>
    </v-flex>
    <v-flex>
  <v-layout column wrap align-center>
  <div class="title">{{chapter}}</div>
  <div class="caption">chapter</div>
  </v-layout>
</v-flex>
  </v-layout>
      </v-toolbar>
<v-card class="secondary">
        <v-container grid-list-xs>
          <v-layout column wrap>
<v-card class="my-1" v-for="(item, i) in mysummary" :key="i">
   <v-layout justify-center row> <!--  :class="['pa-3 mygroup', {active: this.isActiveGroup}]" -->
            <v-flex>
            <v-card-text class="pa-1"> {{item.hindi}}</v-card-text>
          </v-flex>
          <v-flex>
           <v-card-text class="pa-1">
          <span  v-for="(vid, j) in range(item.begin, item.end)"  :key="j">
        <button  class="activity subheading mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-if="vid==verse_local"> {{vid}} </button>
        <button  class="caption mybutton ma-1 elevation-5" @click="setVerse_local(vid)" v-else> {{vid}} </button>
      </span>
    </v-card-text>
    </v-flex>
    </v-layout>
    <v-layout justify-center column> <!--  :class="['pa-3 mygroup', {active: this.isActiveGroup}]" -->
  <v-btn small @click="translateDiscription(i)">translate</v-btn>
    <v-textarea class="ma-3"
        v-model="mytrans[i].english"
        color="deep-purple"
        label="English"
        box
      ></v-textarea>
    </v-layout>
    </v-card>
    {{mysummary.length}}
    </v-layout>
    </v-container>
    <v-btn small @click="addSummaryTranslation()">save</v-btn>
  </v-card>
  </v-card>
</v-dialog>
</div>

</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';


export default {
  data: () => ({
    sheet: false,
    tempcolor: 'green',
    mytrans: null
  }),
  watch: {
    sheet: function(val){
      if (this.sheet && this.mytrans===null) {
        function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}
        this.mytrans = cloneObject(this.mysummary)
      }
    },
    chapter: function(val){
      this.mytrans = null
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'verse', 'theme', 'subItem']),
    ...mapState('coretext', ['summary']),
    mysummary(){
      // console.log(this.summary);
      return this.summary.filter(function(item) {
        return item.chapter_id == this;
      }, this.chapter);
    },
    verse_local(){
      return this.verse
    }
  },
  methods: {
    translateDiscription(myi){
      self = this;
      let myq = this.mysummary[myi].hindi
      gapi.load('client')
      // Initializes the client with the API key and the Translate API.
              gapi.client.init({
                'apiKey': 'AIzaSyBqhpB6SAY2_IOreHc80pRPlUjvuIwaRJ4',
                'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
              }).then(function() {
                // let myq = self.mysummary[0].summary
                // Executes an API request, and returns a Promise.
                // The method name `language.translations.list` comes from the API discovery.
                return gapi.client.language.translations.list({
                  q: myq,
                  source: 'hi',
                  target: 'gu',
                });
              }).then(function(response) {
                console.log(myq)
                console.log(response.result.data.translations[0].translatedText);
                self.mytrans[myi].english = response.result.data.translations[0].translatedText
              }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
              });
    },
    ...mapMutations('parameters', ['SET_verse']),
    setVerse_local(vid){
      this.SET_verse(vid);
    },
    range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
},
addSummaryTranslation() {
  var db = firebase.firestore();
  db.collection("mysummary").doc("c" + this.chapter).set(this.mytrans)
}
  }
}
</script>

<style scoped>

.mybutton{
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
  width: 1.6rem;
  height: auto;
}

</style>
