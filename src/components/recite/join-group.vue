<template>
<v-layout column class="background lighten-1" :style="cssProps" v-if="authenticated">
  <v-card class="ma-2">
    <div class="addBorder">
      <!-- display the selected group -->
      <div class="ma-2 subheading">
        My current group is
        <v-chip small :close="currentChantGroup!=='Myself'" @input="SET_currentChantGroup('Myself'), SET_currentChantGroupURL(photoURL)">
          <v-avatar>
            <img :src="currentChantGroupURL" alt="">
          </v-avatar>
          {{currentChantGroup}}
        </v-chip>
      </div>      
      <!-- search functionality to select group -->
      <!-- <div class="ma-2" @click="addGroupListner='true'"> -->
              <div class="ma-2" @click="addGroupListner=true">
        <v-text-field v-model="searchGroup" append-icon="mdi-magnify" label="Search Groups" single-line @input="show_results"></v-text-field>
        <v-layout row wrap>
          <v-flex class="pa-1" xm4 v-for="item in results" @click="SET_currentChantGroup(item.name), SET_currentChantGroupURL(item.url), searchGroup='', show_results()" :key="item.name">
            <v-list two-line>
              <v-list-tile class="grey lighten-5 elevation-5 addBorderRound">
                <v-list-tile-avatar>
                  <img :src="item.url">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.name}}<span class="ml-4 body-1 grey--text">{{item.country}}</span>  </v-list-tile-title>
                  <v-list-tile-sub-title>{{item.mission}}</v-list-tile-sub-title>
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
import {db} from '@/main.js'
var FlexSearch = require("flexsearch")
export default {
  data: function() {
    return {
      index: null,
      results: null,
      myGroupsData: null,
      searchGroup: '',
      addGroupListner: false
    }
  },
  mounted() {
    console.log(firebase.firestore())
  },
  computed: {
    ...mapState('parameters', ['script', 'authenticated', 'photoURL', 'currentChantGroup', 'currentChantGroupURL']),
    ...mapGetters('settings', ['GET_dark']),
    cssProps() {
      return {
        '--formBorderColor': this.$vuetify.theme.primary,
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['SET_currentChantGroup', 'SET_currentChantGroupURL']),
    consoleInfo(val){
      //@click wouldn't directly accept console.log
      if (location.hostname === "localhost") { console.log(val)
      }
    },
    createSearch() {
      // add id to every entry of myGroupData
      for (var j = 0; j < this.myGroupsData.groups.length; j++) {
        this.myGroupsData.groups[j]["id"] = j
      }
      // setup the index
      this.index = new FlexSearch({
        doc: {id: "id", field: ["name", "country"]}
      })
      //create the actual index
      this.index.add(this.myGroupsData.groups)
    },
    show_results() {
      this.results = this.index.search(this.searchGroup);
    }
  },
  watch: {
    authenticated: function() {
      if(!authenticated){this.unsubscribe()}
    },
    myGroupsData: function() {
      this.createSearch()
    },
    addGroupListner: {
     // don't call it upon creation
     immediate: false,
     handler(addGroupListner) {
       this.$bind('myGroupsData', db.collection("aggregates").doc("available_groups"))
       .then(myGroupsData => {
         this.createSearch()
       })
     },
   }
  },
  beforeDestroy () {
    console.log('I am join-group and just got destroyed!')
  },
  components: {}
}
</script>

<style lang="scss">
.addBorder {
    border: 2px solid var(--formBorderColor);
}
</style>
