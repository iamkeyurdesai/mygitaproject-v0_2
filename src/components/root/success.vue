<template>
<div>
  <!-- log in successful -->
</div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('parameters', ['path'])
  },
  methods: {
    ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_authenticated(true)
        this.SET_photoURL(user.photoURL)
      } else {
        this.SET_authenticated(false)
        this.SET_photoURL('not signed in')
      }
     });
     this.$router.push(this.path)
 }
}
</script>

<style scoped>
</style>
