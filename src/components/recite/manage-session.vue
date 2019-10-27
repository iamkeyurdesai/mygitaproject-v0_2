<template>
<v-layout column class="background lighten-1" :style="cssProps"  v-if="authenticated && isSessionLeader">
    <v-subheader :dark="GET_dark"> Lead a session</v-subheader>
  <v-card class="ma-2">
    <div class="addBorder">
        <v-layout row wrap class="mx-2">
          <v-btn class="mt-2 text-none" v-for="(elem,i) in sessionsCanLead" :key="elem"
          @click="setSession(elem, 'open')" :color="sessionsCanLeadColors[i]" round dark>  {{elem}} </v-btn>
        </v-layout>
    </div>
  </v-card>
</v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import {db, rtdb, auth} from '@/main.js'
export default {
  data: function() {
    return {
      sessionsCanLeadColors: [],
      myGroupSelectData: null
    };
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
    ...mapState("parameters", [ "chapter", "verse", "script", "authenticated", "photoURL", "currentChantGroup", "currentChantGroupURL", "userClaims", 'userName' ]),
    ...mapGetters("settings", ["GET_dark"]),
    cssProps() {
      return {
        "--formBorderColor": this.$vuetify.theme.primary
      };
    },
    isSessionLeader() {
      let myDecision = false
      myDecision = (typeof this.userClaims.owner !== 'undefined') ||
                   (this.userClaims.leader.length > 0)
      return myDecision
    },
    sessionsCanLead() {
      let whichOnes = []
      if(this.userClaims.leader.length > 0) {
        whichOnes = this.userClaims.leader
        this.sessionsCanLeadColors = Array(whichOnes.length).fill("pink darken-4")
      }
      if(this.userClaims.owner) {
        whichOnes.push(this.userClaims.owner)
        this.sessionsCanLeadColors.push("purple darken-4")
      }
      return whichOnes
    }
  },
  methods: {
    ...mapMutations("parameters", ["SET_userClaims", "SET_currentChantGroup"]),
    async setSession(group, val) {
      try {
      this.SET_currentChantGroup(group)
      const docRef = db.collection("recite/chant/groups").doc(this.currentChantGroup).collection('admin').doc('status')
      const document = await docRef.get()
      this.myGroupSelectData = document.data()
      await  docRef.set({
            current: {
              leader: this.userName,
              total: 0,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              duration: 0,
              chapter: this.chapter,
              mahatmya: false,
              score:   0,
              online: true
            },
            previous: Object.assign({},this.myGroupSelectData.current)
          })
      await rtdb.ref('recite/chant/groups/' + this.currentChantGroup + '/admin/status').set({
            name: auth.currentUser.displayName,
            time: firebase.database.ServerValue.TIMESTAMP,
            session: val
          })
        }
        catch (err) {
        }
      }
  },
  components: {},
  watch: {
  }
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
