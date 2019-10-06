
<template>
<div>
  <v-menu bottom left offset-y>
          <v-btn icon slot="activator" dark>
            <v-avatar size="32px">
              <img
                :src="photoURL"
                alt="Error Loading"
              >
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(myitem, i) in myLoginMenu" :key="i" @click="logOut">
              <v-list-tile-title>{{ myitem.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
data () {
  return {
    myLoginMenu: [
     { title: 'History' },
     { title: 'Account' },
     { title: 'Profile' },
     { title: 'Signout' }]
  }
},
computed: {
  ...mapState('parameters', ['authenticated', 'photoURL']),
},
methods: {
  ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_userClaims']),
  logOut() {
    firebase.auth().signOut();
    this.SET_authenticated(false);
    this.SET_photoURL('not signed in');
    this.SET_userClaims({})
  }
},
  mounted() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_photoURL(user.photoURL);
     }
   });
 }
}
</script>

<style scoped>
</style>
