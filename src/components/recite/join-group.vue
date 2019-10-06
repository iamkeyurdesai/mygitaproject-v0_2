<template>
        <v-layout column class="background lighten-1" :style="cssProps">

<v-card class="ma-2" v-if="userClaims.createGroupPrivilege">
<div class="addBorder">
<div>
<v-btn @click="showForm=true" color="info" v-if="!showForm">create new group</v-btn>
<div class="ma-2" v-if="showForm">
  <v-form ref="form" v-model="valid" lazy-validation >
    <v-text-field v-model="name" :counter="15" :rules="nameRules" label="Group Name" required ></v-text-field>
    <v-select v-model="select" :items="items" :rules="[v => !!v || 'Location is required']" label="Location" append-outer-icon="map" required single-line></v-select>
    <v-btn :disabled="!valid || name==='' || select===null" @click="create(), showForm=false" color="success" small>create</v-btn>
  </v-form>
</div>
</div>
<div>
<v-text-field v-model="emailToAdd"  label="Email" ></v-text-field>
<v-btn @click="update('add', emailToAdd)">add a leader </v-btn>
<v-btn @click="update('remove', emailToAdd)">remove a leader </v-btn>
</div>
</div>
</v-card>
<v-card class="ma-2">
<div class="addBorder">

<div class="ma-2 subheading">
          Current Group <v-chip small :close="currentChantGroup!=='Myself'" @input="SET_currentChantGroup('Myself'), SET_currentChantGroupURL(photoURL)">
            <v-avatar>
                        <img :src="currentChantGroupURL" alt="">
                      </v-avatar>
            {{currentChantGroup}}
          </v-chip>
          </div>
<div class="ma-2">
            <v-text-field
        v-model="searchGroup"
        append-icon="mdi-magnify"
        label="Search Groups"
        single-line
        @input="show_results"
      ></v-text-field>
      <!-- <v-btn @click="createSearch()"> addindex </v-btn> -->

      <v-layout row wrap>
                <v-flex class="pa-1" xm4 v-for="item in results"
                @click="SET_currentChantGroup(item.name), SET_currentChantGroupURL(item.url), searchGroup='', show_results()" :key="item.name">
            <!-- <v-list-tile  avatar v-for="item in results" @click="SET_currentChantGroup(item.name), searchGroup='', show_results()" :key="item.name"> -->
<v-list three-line>
<v-list-tile class="grey lighten-5 elevation-5 addBorderRound">
              <v-list-tile-avatar>
                <img :src="item.url">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.country}}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>
  </v-list>
      </v-flex>
      </v-layout>

      </div>
          </div>
        </v-card>
        </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Sanscript from 'Sanscript';
var FlexSearch = require("flexsearch")
const countryList = require('country-list');
// import VueC3 from 'vue-c3'
export default {
  data: function() {
    return {
      index: null,
      results: null,
      valid: true,
      emailToAdd: '',
      name: '',
      myGroups: '',
      myGroupsData: '',
      nameRules: [
        v => !!v || 'Group Name is required',
        v => (v && v.length > 8) || 'Group Name must be greater than 8 characters',
        v => (v && v.length <= 15) || 'Group Name must be less than 15 characters',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        v => this.myGroups.indexOf(v) < 0 || 'Group Name already taken'
      ],
      select: null,
      items: [],
      checkbox: false,
      searchGroup: '',
      showForm: false
    }
  },
  mounted() {
    this.items = countryList.getNames()
    var unsubscribe = firebase.firestore().collection("aggregates").doc("available_groups")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.myGroupsData = doc.data().groups
        this.myGroups = this.myGroupsData.map(a => a.name)
        console.log(this.myGroups)
        console.log(this.nameRules)
        this.createSearch()
    });

  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
         this.SET_userClaims(idTokenResult.claims)
      })
     }
   });
console.log(this.userClaims)
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('audiolabels', ['sanskritLabels']),
    ...mapState('coretext', ['preview']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
    'currentChantGroup', 'currentChantGroupURL', 'userClaims',
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
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter', 'SET_currentChantGroup', 'SET_currentChantGroupURL', 'SET_userClaims',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter',
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      clear () {
        console.log(countryList.getNames())
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      create() {

firebase.firestore().collection("groups").doc(this.name).collection('leaders').doc(firebase.auth().currentUser.uid).set(
  {
  name: this.name,
  country: this.select,
  url: this.photoURL,
  leaders: []
  }
)
},
update(mode, email) {
console.log(mode)
console.log(email)
console.log(this.currentChantGroup)
if(mode==="add"){
firebase.firestore().collection("groups").doc(this.currentChantGroup).collection('leaders').doc(firebase.auth().currentUser.uid).update(
  {leaders: firebase.firestore.FieldValue.arrayUnion(email)}
)
} else {
  firebase.firestore().collection("groups").doc(this.currentChantGroup).collection('leaders').doc(firebase.auth().currentUser.uid).update(
    {leaders: firebase.firestore.FieldValue.arrayRemove(email)}
  )
}
},
createSearch(){

  for(var j = 0; j < this.myGroupsData.length; j++) {
    this.myGroupsData[j]["id"] = j
                  }
console.log(this.myGroupsData)
                  this.index = new FlexSearch({
                  doc: {
                      id: "id",
                      field: [
                          "name",
                          "country"
                      ]
                  }
              });

                this.index.add(this.myGroupsData)
console.log(this.index)
},
show_results(){
 this.results = this.index.search(this.searchGroup);
 // console.log(results)
 // var i = 0, len = results.length;
//   for(; i < len; i++){
//   console.log(self.myGroupsData[results[i]]["name"])
// }

},

//         firebase.firestore().collection("groups").doc("total").update({
//     groups: firebase.firestore.FieldValue.arrayUnion(
//       {
//       name: this.name,
//       country: this.select,
//       url: this.photoURL
//       }
//     )
// });


addChantLog(val) {
  var db = firebase.firestore();
  db.collection("logs").doc(firebase.auth().currentUser.uid).collection("chant").doc('t'+val.start_time).set(val)
}
},
watch: {
  unsubscribe: function(){
    this.createSearch()
  }
},
  components: {
  }
}
</script>

<style lang="scss">
.addBorder{
    border: 2px solid var(--formBorderColor);
}
.addBorderRound{
    border-radius: 8px;
}
</style>
