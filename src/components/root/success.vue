
<template>
<div>
  <!-- <welcome></welcome> -->
</div>
</template>

<script>
import welcome from '@/components/root/welcome'
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('parameters', ['authenticated', 'photoURL']),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        authenticated = true
        // this.$router.push('/')
        photoURL = user.photoURL
      } else {
        // this.$router.push('/')
        authenticated = false
        photoURL = 'not signed in'
      }
     });
     this.$router.push('/')
 },
 components: {
   'welcome': welcome
 }
}
</script>

<style scoped>
</style>
