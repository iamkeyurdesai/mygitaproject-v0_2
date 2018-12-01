
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
    photo: '',
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
  created() {
    // var vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // vm.user = user;
        // vm.photo = vm.user.photoURL;
        this.setValue({key: 'photoURL', value: user.photoURL})
     }
   });
 },
 methods: {
   ...mapMutations('parameters', ['setValue']),
   logOut() {
     firebase.auth().signOut();
     this.setValue({key: 'authenticated', value: false})
   }
}
}
</script>

<style scoped>
</style>
