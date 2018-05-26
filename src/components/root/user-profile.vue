
<template>
<div>
  <v-menu bottom left offset-y>
          <v-btn icon slot="activator" dark>
            <v-avatar size="32px">
              <img
                :src="photo"
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
  created() {
    var vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
        vm.photo = vm.user.photoURL;
     }
   });
 },
 methods: {
   logOut() {
     firebase.auth().signOut();
     this.$store.state.authenticated = false;
   }
}
}
</script>

<style scoped>
</style>
