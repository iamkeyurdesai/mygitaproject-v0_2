<template>
<v-layout column class="background lighten-1" :style="cssProps">
  <v-card class="ma-2" v-if="userClaims.owner | userClaims.leader">
    <div class="addBorder">
      <div>
        <v-btn @click="setSession('open')" color="info">Open</v-btn>
      </div>
    </div>
  </v-card>
</v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: function() {
    return {};
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            this.SET_userClaims(idTokenResult.claims);
          });
      }
    });
  },
  computed: {
    ...mapState("parameters", [ "chapter", "verse", "script", "authenticated", "photoURL", "currentChantGroup", "currentChantGroupURL", "userClaims" ]),
    ...mapGetters("settings", ["GET_dark"]),
    cssProps() {
      return {
        "--formBorderColor": this.$vuetify.theme.primary
      };
    }
  },
  methods: {
    ...mapMutations("parameters", ["SET_userClaims", "SET_currentChantGroup"]),
    setSession(val) {
      firebase.database().ref('chats/chant/' + this.currentChantGroup + '/session/').set({
        name: firebase.auth().currentUser.displayName,
        time: firebase.database.ServerValue.TIMESTAMP,
        session: val
      }).then(this.inputMessage='')
}
  },
  watch: {
    unsubscribe: function() {
      this.createSearch();
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
