<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import {config} from '../../helpers/firebaseConfig';
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
export default {
  name: 'auth',
  computed: {
    ...mapState('parameters', ['path'])
  },
  methods: {
    ...mapMutations('parameters', ['SET_path'])
  },
  mounted() {
    var uiConfig = {
      callbacks: {
          signInSuccessWithAuthResult: function(authResult) {
            if(authResult.additionalUserInfo.isNewUser) {
            var user = authResult.user
            firebase.firestore().collection('users').doc('profiles').collection('signin').doc(authResult.user.uid).set({
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
              emailVerified: user.emailVerified
            })
          }
            return true;
          }
        },
      // signInSuccessUrl: this.path,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
      };
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        // firebase.initializeApp(config);
        ui = new firebaseui.auth.AuthUI(window.firebase.auth());
      }
      ui.start('#firebaseui-auth-container', uiConfig);
    }
}
</script>

<style lang="css">
#firebaseui-auth-container {
   background-color: #fefbd8;
}
</style>
