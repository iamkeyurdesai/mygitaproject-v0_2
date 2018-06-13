
<template>
<div>
  <!-- <welcome></welcome> -->
</div>
</template>

<script>
import welcome from '@/components/root/welcome'
import firebase from 'firebase';
import firebaseui from 'firebaseui'
export default {
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.state.authenticated = true
        // this.$router.push('/')
        this.$store.state.photoURL = user.photoURL        
      } else {
        // this.$router.push('/')
        this.$store.state.authenticated = false
        this.$store.state.photoURL = 'not signed in'
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
