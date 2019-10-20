<template>
<v-layout column class="background lighten-1" :style="cssProps"  v-if="authenticated & isSessionLeader">
    <v-subheader :dark="GET_dark"> Lead a session</v-subheader>
  <v-card class="ma-2">
    <div class="addBorder">
        <v-layout row wrap class="mx-2">
          <v-btn class="mt-2 text-none" v-for="(elem,i) in sessionsCanLead" :key="elem"
          @click="setSession(elem, 'open')">  {{elem}} </v-btn>

        <!-- <v-chip class="mt-2" v-for="(elem,i) in sessionsCanLead" :key="elem"
        close v-model="myLeadersKeep[i]" @input="update('remove', elem)" small>  {{elem}} </v-chip>

        <v-chip class="mt-2" outline>
        <v-text-field v-model="emailToAdd" label="Email" class="body-1"></v-text-field>
        <v-icon @click="update('add', emailToAdd)" color="green">add</v-icon>
        </v-chip> -->

        </v-layout>
        <!-- <v-btn @click="setSession('open')" color="info">Open</v-btn> -->
    </div>
  </v-card>
</v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import {db, rtdb, auth} from '@/main.js'
export default {
  data: function() {
    return {};
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        auth.currentUser.getIdToken(true).then(() => {
        auth.currentUser.getIdTokenResult()
          .then(idTokenResult => {
            this.SET_userClaims(idTokenResult.claims)
            })
          })
        }
      })
  },
  computed: {
    ...mapState("parameters", [ "chapter", "verse", "script", "authenticated", "photoURL", "currentChantGroup", "currentChantGroupURL", "userClaims" ]),
    ...mapGetters("settings", ["GET_dark"]),
    cssProps() {
      return {
        "--formBorderColor": this.$vuetify.theme.primary
      };
    },
    isSessionLeader() {
      let myDecision = false
      myDecision = this.userClaims.owner ||
                   (this.userClaims.leader[0].length > 0)
      return myDecision
    },
    sessionsCanLead() {
      let whichOnes = []
      if(this.userClaims.leader[0].length > 0) {
        whichOnes = this.userClaims.leader
      }
      if(this.userClaims.owner) {
        whichOnes.push(this.userClaims.owner)
      }
      return whichOnes
    }
  },
  methods: {
    ...mapMutations("parameters", ["SET_userClaims", "SET_currentChantGroup"]),
    setSession(group, val) {
      rtdb.ref('recite/chant/groups/' + group + '/admin/status').set({
        name: auth.currentUser.displayName,
        time: firebase.database.ServerValue.TIMESTAMP,
        session: val
      })
}
  },
  components: {}
};
</script>

<style lang="scss">
.addBorder {
    border: 2px solid var(--formBorderColor);
}
.addBorderRound {
    border-radius: 8px;
}
</style>
