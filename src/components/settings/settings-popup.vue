<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
  <span slot="activator"><v-icon v-bind:style="{color:this.options[this.theme].iconEnabled}">settings</v-icon></span>
    <v-card tile>

<v-toolbar card :class="options[theme].toolbarAccent1" :dark="options[theme].type=='dark'" dense>
       Settings
<v-spacer></v-spacer>
        <v-btn icon dark @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
      <v-spacer></v-spacer>
          <v-icon>settings</v-icon>
      </v-toolbar>

      <v-container fluid>
        <span>Theme: </span>
          <v-radio-group v-model="theme" row>
            <v-radio v-for="(item, i) in options.theme" v-bind:label="options.theme[i]" v-bind:value="options.theme[i]" :key="i"></v-radio>
          </v-radio-group>
          <hr>
          <span>Language: </span>
            <v-radio-group v-model="language" row>
              <v-radio v-for="(item, i) in options.language" v-bind:label="options.language[i]" v-bind:value="options.language[i]" :key="i"></v-radio>
            </v-radio-group>
          <hr>
            <v-switch label="Audio" v-model="audio"></v-switch>
        </v-container>
  </v-card>

</v-dialog>
</div>

</template>

<script>
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';


export default {
  data: () => ({
    sheet: false,
    settings_color: 'white'
  }),
  mounted() {
    //do something after mounting vue instance
    this.settings_color = this.options[this.theme].iconEnabled;
  },
  computed: {
    ...mapState('settings', ['options']),
    theme: {get(){return this.$store.state.parameters.theme}, set(value){this.SET_theme(value)}},
    language: {get(){return this.$store.state.parameters.language}, set(value){this.SET_language(value)}},
    audio: {get(){return this.$store.state.parameters.audio}, set(value){this.SET_audio(value)}},
},
  methods: {
    ...mapMutations('parameters', ['SET_audio', 'SET_theme', 'SET_language'])
}
}
</script>

<style scoped>
.tst2 {
  margin: 2px;
}
</style>
