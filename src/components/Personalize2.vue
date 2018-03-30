<template>
  <div>
    <v-container fluid>
    <div>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            :src="photo"
            alt="Error Loading"
          >
        </v-avatar>
      </v-btn>
    </div>
    </v-container>
  </div>

</template>
<script>
import firebase from 'firebase'
import Auth from './Auth.vue'
import AuthSuccess from './AuthSuccess.vue'

export default {
  data () {
    return {
      dialog: false,
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  components: {
    'Auth': Auth,
    'AuthSuccess': AuthSuccess
  },
  props: {
    userSignedIn: Boolean
  },
  created() {
    var vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
        vm.name = vm.user.displayName;
        vm.email = vm.user.email;
        vm.photo = vm.user.photoURL;
        vm.userId = vm.user.uid;
     }
   });
 },
 methods: {
   logOut() {
     firebase.auth().signOut();
   }
 }
}
</script>
