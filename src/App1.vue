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
>
<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Power Gita</span>
      </v-toolbar-title>
<v-spacer></v-spacer>
<v-btn icon>
  <v-icon>notifications</v-icon>
</v-btn>
<v-btn small color="primary" dark @click.native.stop="dialog = true">Sing In</v-btn>
<v-dialog v-model="dialog">
  <Auth></Auth>
</v-dialog>
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
import Auth from './components/Auth.vue'


export default {
  data () {
    return {
      dialog: false,
      currentView: 'Auth',
      clipped: false,
      drawer: false,
      fixed: false,
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Power Gita'
    }
  },
  name: 'App1',
  components: {
    'verse': verse,
    'Auth': Auth
  },
  methods: {
    addTodo() {


               var usernameRef = firebase.database().ref('username')

               usernameRef.set("vaibhav")

           }
 }

}
</script>
