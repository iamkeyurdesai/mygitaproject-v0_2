<template>
<v-layout column class="background lighten-1" :style="cssProps"  v-if="userClaims.createGroupPrivilege">
  <v-subheader :dark="GET_dark"> You have been granted the group leader privilege </v-subheader>
  <v-card class="ma-2">
    <div class="addBorder">

      <!-- new group form -->
      <div v-if="!userClaims.owner">
        <div v-if="!groupAdded">
        <v-btn @click="showForm=true" color="info" v-if="!showForm">create new group</v-btn>
        <div class="ma-2" v-if="showForm">
          <v-progress-linear :indeterminate="true" color="success" v-if="processForm"></v-progress-linear>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="15" :rules="nameRules" label="Group Name" required></v-text-field>
            <v-text-field v-model="missionStatement" :counter="60" :rules="missionStatementRules" label="Group/Org Purpose" required></v-text-field>
            <v-select v-model="select" :items="items" :rules="[v => !!v || 'Location is required']"
              label="Country of Origin" hint="Country of Origin" persistent-hint append-outer-icon="map" required single-line></v-select>
            <!-- <v-btn :disabled="!valid || name==='' || select===null" @click="createGroup(), showForm=false" color="success" small>create</v-btn> -->
            <v-btn :disabled="!valid" @click="createGroup()" color="success" small>create</v-btn>
            <v-btn @click="showForm=false" color="error" small>later</v-btn>
          </v-form>
        </div>
        </div>
        <div v-else align="center">
          <div> ADDED!</div>
          <v-btn @click="loadManageAccess()" color="info" v-if="!showEditPortal">manage group access</v-btn>
          </div>
      </div>

      <!-- add or remove leaders -->
      <div v-else>
        <v-btn @click="showEditPortal=true" color="info" v-if="!showEditPortal">manage group access</v-btn>
        <v-layout column class="ma-2 grey lighten-5 elevation-5 addBorderRound1" v-if="showEditPortal">
          <v-btn @click="deleteGroup()" color="info" v-if="showEditPortal">delete group </v-btn>
            <v-flex grow>
              <v-list two-line>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img :src="myGroupsData.url">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{myGroupsData.name}} <span class="ml-4 body-1 grey--text">{{myGroupsData.country}}</span>  </v-list-tile-title>
                    <v-list-tile-sub-title>{{myGroupsData.mission}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-divider></v-divider>
                  <v-flex grow>
                  <v-subheader> Manage leaders for your group: </v-subheader>
                  <v-layout row wrap class="mx-2">
                  <v-chip class="mt-2" v-for="(elem,i) in myGroupsData.leaders" :key="elem"
                  close v-model="myLeadersKeep[i]" @input="updateGroup('remove', elem)" small>  {{elem}} </v-chip>

                  <v-chip class="mt-2" outline>
                  <v-text-field v-model="emailToAdd" label="Email" class="body-1"></v-text-field>
                  <v-icon @click="updateGroup('add', emailToAdd)" color="green">add</v-icon>
                  </v-chip>

                  </v-layout>
                  </v-flex>

<v-flex>
  <div align="right" class="mx-1">
        <v-btn @click="showEditPortal=false" color="error" small>close</v-btn>
      </div>
      </v-flex>
      </v-layout>
      </div>

    </div>
  </v-card>
</v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
  ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands"
  ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
  ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
  ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
  ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
  ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
  ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
  ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
  ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
  ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
  ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
  ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia"
  ,"Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
  ,"Yemen","Zambia","Zimbabwe"]
  import {db, auth} from '@/main.js'
export default {
  data: function() {
    return {
      index: null,
      results: null,
      valid: false,
      emailToAdd: '',
      name: '',
      myGroupsData: '',
      myLeaders: '',
      nameRules: [
        v => !!v || 'Group Name is required',
        v => (v && v.length > 8) || 'Group Name must be greater than 8 characters',
        v => (v && v.length <= 15) || 'Group Name must be less than 15 characters',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        v => this.myGroupsTakenName.indexOf(v) < 0 || 'Group Name already taken'
      ],
      missionStatement: '',
      missionStatementRules: [
        v => !!v || 'Group/Org Purpose is required',
        v => (v && v.length > 30) || 'Group/Org Purpose must be greater than 30 characters',
        v => (v && v.length <= 60) || 'Group/Org Purpose must be less than 60 characters'
      ],
      select: 'India',
      items: [],
      checkbox: false,
      searchGroup: '',
      showForm: false,
      unsubscribe: null,
      addGroupListner: false,
      showEditPortal: false,
      myLeadersKeep: [],
      myGroupsTakenData: [],
      myGroupsTakenName: [],
      processForm: false,
      groupAdded: false
    }
  },
  mounted() {
    this.items = country_list
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            this.SET_userClaims(idTokenResult.claims)
          })
      }
    })
  },
  computed: {
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'currentChantGroup', 'currentChantGroupURL', 'userClaims', 'userName']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {
        '--formBorderColor': this.$vuetify.theme.primary,
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter', 'SET_currentChantGroup', 'SET_currentChantGroupURL', 'SET_userClaims']),
    consoleInfo(val){ //@click wouldn't directly accept console.log
      if (location.hostname === "localhost") { console.log(val) }
    },
    validate() {
      if (this.$refs.form.validate()) {
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    createGroup() {
      if (this.$refs.form.validate()) {
        this.processForm = true
        this.valid = true
        db.collection("recite").doc("chant").collection("groups").doc(this.name).collection('admin').doc(firebase.auth().currentUser.uid).set({
          name: this.name,
          owner: this.userName,
          mission: this.missionStatement,
          country: this.select,
          url: this.photoURL,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          leaders: []
        })
        .then(()=>{
              this.processForm=false
              this.showForm = false
              this.groupAdded = true
            })
      } else {
        console.log("not validated")
      }
    },
    loadManageAccess() {
        auth.currentUser.getIdToken(true)
        .then(auth.currentUser.getIdTokenResult().then(
            (idTokenResult) => {
            console.log((idTokenResult.claims))
            this.SET_userClaims(idTokenResult.claims)
            if(this.userClaims.owner) {
              this.showEditPortal = true
            }
          }))
    },
    deleteGroup() {
      db.collection("recite").doc("chant").collection("groups").doc(this.myGroupsData.name).collection('admin').doc(firebase.auth().currentUser.uid).delete().then(
        () => {console.log(this.myGroupsData.name + " group deleted")}
      )
    },
    updateGroup(mode, email) {
      console.log(mode)
      console.log(email)
      console.log(this.currentChantGroup)
      if (mode === "add") {
        db.collection("recite").doc("chant").collection("groups").doc(this.userClaims.owner).collection('admin').doc(firebase.auth().currentUser.uid).update({
          leaders: firebase.firestore.FieldValue.arrayUnion(email)
        })
      } else {
        db.collection("recite").doc("chant").collection("groups").doc(this.userClaims.owner).collection('admin').doc(firebase.auth().currentUser.uid).update({
          leaders: firebase.firestore.FieldValue.arrayRemove(email)
        })
      }
    },
    addChantLog(val) {
      var db = firebase.firestore();
      db.collection("logs").doc(firebase.auth().currentUser.uid).collection("chant").doc('t' + val.start_time).set(val)
    }
  },
  // firestore: {
  //   myGroupsTakenData: db.collection("aggregates").doc("available_groups")
  // },
  watch: {
    unsubscribe: function() {
      this.createSearch()
    },
    myGroupsTakenData: function(){
      this.myGroupsTakenData.groups.forEach((a) => {this.myGroupsTakenName.push(a.name)})
    },
    myGroupsData: function() {
      this.myLeadersKeep = Array(this.myGroupsData.leaders).fill(true)
      if(this.myGroupsData.leaders.includes(this.emailToAdd)) {
        this.emailToAdd=''
      }
    },
    showEditPortal: {
     // don't call it upon creation
     immediate: false,
     handler(showEditPortal) {
       if(showEditPortal) {
       this.$bind('myGroupsData', db.collection("recite").doc("chant").collection("groups").doc(this.userClaims.owner).collection('admin').doc(firebase.auth().currentUser.uid))
     } else {
       this.$unbind('myGroupsData', false)
     }
     },
   },
   showForm: {
    // don't call it upon creation
    immediate: false,
    handler(showForm) {
      if(showForm) {
      this.$bind('myGroupsTakenData', db.collection("aggregates").doc("available_groups"))
    } else {
      this.$unbind('myGroupsTakenData', false)
    }
    },
  }
  },
  components: {}
}
</script>

<style lang="scss">
.addBorder {
    border: 2px solid var(--formBorderColor);
}
</style>
