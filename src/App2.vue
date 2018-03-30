<template>
  <v-app>
    <v-navigation-drawer
    persistent
    :clipped="clipped"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
    dark
    class="purple darken-3"
    width="250"
    >
    <v-flex xs12 class="purple darken-3">
      <v-card class="purple darken-3">
        <v-list class="purple darken-3">
          <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
          >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</v-navigation-drawer>
<v-toolbar
app
:clipped-left="$vuetify.breakpoint.lgAndUp"
color="indigo"
dark
scroll-off-screen
scroll-target="#content"
dense
>
<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Power Gita</span>
      </v-toolbar-title>
<v-spacer></v-spacer>
  <!-- <button @click='logOut'>Log out</button>
    <v-btn icon> -->
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px">
        <img
          :src="photo"
          alt="Error Loading"
        >
      </v-avatar>
    </v-btn>
    <v-menu bottom left offset-y>
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(myitem, i) in myLoginMenu" :key="i" @click="logOut">
                <v-list-tile-title>{{ myitem.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
</v-toolbar>
<v-content>
  <verse></verse>
<!-- <button @click="addTodo">X</button> -->

</v-content>
<v-footer :fixed="fixed" app>
  <span>&copy; 2018</span>
</v-footer>
</v-app>
</template>

<script>
import verse from './components/verse.vue'
import Personalize2 from './components/Personalize2.vue'



export default {
  data () {
    return {
      dialog: false,
      currentView: 'Auth',
      clipped: false,
      drawer: false,
      fixed: false,
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      items: [
        {
          action: 'explore',
          title: 'Text',
          items: [
            { title: 'Read' },
            { title: 'Recite' },
            { title: 'Reflect' }
          ]
        },
        {
          action: 'insert_chart',
          title: 'Data',
          active: true,
          items: [
            { title: 'Basic' },
            { title: 'Advanced' }
          ]
        },
        {
          action: 'spa',
          title: 'Meditation',
          items: [
            { title: 'Free' },
            { title: 'Paid' }
          ]
        },
        {
          action: 'directions_transit',
          title: 'Media',
          items: [
            { title: 'Audio' },
            { title: 'Video' },
            { title: 'Pictures' }
          ]
        },
        {
          action: 'people',
          title: 'Community',
          items: [
            { title: 'Connect' },
            { title: 'Contribute' }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          items: [
            { title: 'Language' },
            { title: 'Theme' },
            { title: 'Notifications' }
          ]
        },
        {
          action: 'card_giftcard',
          title: 'Store',
          items: [
            { title: 'Buy Apps' },
            { title: 'Gift Shop' },
            { title: 'Donate' }
          ]
        },
        {
          action: 'info',
          title: 'About Us',
          items: [
            { title: 'Our Mission' },
            { title: 'FAQs' }
          ]
        }
      ],
      myLoginMenu: [
       { title: 'History' },
       { title: 'Account' },
       { title: 'Profile' },
       { title: 'Signout' }
     ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Power Gita'
    }
  },
  name: 'App2',
  components: {
    'verse': verse,
    'Personalize2': Personalize2
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
   },
   addTodo() {
            if (this.user) {

              var usernameRef = firebase.database().ref(this.userId)

              usernameRef.child('NAME').set(this.name)
              usernameRef.child('EMAIL').set(this.email)
              usernameRef.on('value', gotData, gotData)
            }
            function gotData(data){
              console.log(data.val())
            }
          }

}
}
</script>
