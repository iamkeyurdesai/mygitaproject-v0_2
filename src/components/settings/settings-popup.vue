<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
  <span slot="activator"><v-icon v-bind:style="{color:this.options[this.theme].iconEnabled}">settings</v-icon></span>
    <v-card>


<v-toolbar card :class="options[theme].toolbarAccent1" :dark="options[theme].type=='dark'" dense>
       Settings
<v-spacer></v-spacer>
        <v-btn icon :dark="options[theme].type=='dark'" @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
      <v-spacer></v-spacer>
          <v-icon>settings</v-icon>
      </v-toolbar>

<v-card-text>

<v-card class="mycard">
          <v-radio-group v-model="fsize" row>
          <strong> font size: </strong>
            <v-radio v-for="(item, i) in options.fsize" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
          </v-radio-group>
  </v-card>
<v-card class="mycard">
            <v-radio-group v-model="fweight" row>
              <strong> font weight: </strong>
              <v-radio v-for="(item, i) in options.fweight" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
            </v-radio-group>
            </v-card>
            <v-card class="mycard">
              <v-radio-group v-model="script" row>
                <strong>script: </strong>
                <v-radio v-for="(item, i) in options.script" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
              </v-radio-group>
              </v-card>
            <v-card class="mycard">
          <v-radio-group v-model="theme" row>
            <strong>theme: </strong>
            <v-radio v-for="(item, i) in options.theme" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
          </v-radio-group>
          </v-card>
          <v-card class="mycard">
            <v-radio-group v-model="language" row>
              <strong>language: </strong>
              <v-radio v-for="(item, i) in options.language" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
            </v-radio-group>
          </v-card>
          <v-card class="mycard">
            <v-radio-group v-model="slines" row>
              <strong> shloaka lines: </strong>
              <v-radio v-for="(item, i) in options.slines" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
            </v-radio-group>
          </v-card>
          <v-card class="mycard">
            <v-switch label="Audio" v-model="audio"></v-switch>
            </v-card>
</v-card-text>
  </v-card>

</v-dialog>
</div>

</template>

<script>
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';


export default {
  data: () => ({
    sheet: false
  }),
  computed: {
    ...mapState('settings', ['options']),
    theme: {get(){return this.$store.state.parameters.theme}, set(value){this.SET_theme(value)}},
    language: {get(){return this.$store.state.parameters.language}, set(value){this.SET_language(value)}},
    script: {get(){return this.$store.state.parameters.script}, set(value){this.SET_script(value)}},
    audio: {get(){return this.$store.state.parameters.audio}, set(value){this.SET_audio(value)}},
    fsize: {get(){return this.$store.state.parameters.fsize}, set(value){this.SET_fsize(value)}},
    fweight: {get(){return this.$store.state.parameters.fweight}, set(value){this.SET_fweight(value)}},
    slines: {get(){return this.$store.state.parameters.slines}, set(value){this.SET_slines(value)}},
},
  methods: {
    ...mapMutations('parameters', ['SET_audio', 'SET_theme', 'SET_language', 'SET_script',
                                   'SET_fsize', 'SET_fweight', 'SET_slines'])
}
}
</script>

<style scoped>
.mycard{
  margin: 5px;
  background: #F7F7F7;
}
</style>
