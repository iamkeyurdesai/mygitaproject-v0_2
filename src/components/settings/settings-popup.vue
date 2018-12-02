<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    fullscreen
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
  <span slot="activator"><v-icon v-bind:style="{color:settings_color}">settings</v-icon></span>


    <v-card tile>

      <v-toolbar card dark color="primary">
        <v-btn icon dark @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- <v-container fluid>
        <span>My Theme: </span>
          <v-radio-group v-model="theme" row>
            <v-radio v-for="(item, i) in settingsOptions.theme" v-bind:label="settingsOptions.theme[i]" v-bind:value="settingsOptions.theme[i]" :key="{i}"></v-radio>
          </v-radio-group>
          {{theme}}
          <hr>
          <span>My Language: </span>
            <v-radio-group v-model="language" row>
              <v-radio v-for="(item, i) in settingsOptions.language" v-bind:label="settingsOptions.language[i]" v-bind:value="settingsOptions.language[i]" :key="{i}"></v-radio>
            </v-radio-group>
            {{language}}
            <hr>
            <v-switch label="Audio" v-model="audio"></v-switch>
            {{audio}}
        </v-container> -->


      <!-- <div v-for="(item, i) in mysummary" :key="i">
            <v-container grid-list-sm>
            <v-card color="purple darken-2" class="white--text elevation-10">
              <div class="subheading"> {{item.summary}}</div>

                <span  v-for="(vid, j) in range(item.begin, item.end)" :key="j">
              <v-btn  class="title tst2" fab small color="red" @click.native.stop="setVerse(vid)" v-if="vid==myverse">{{vid}}</v-btn>
              <v-btn class="caption tst2" fab small @click.native.stop="setVerse(vid)" v-else>{{vid}}</v-btn>
            </span>
            </v-card>
          </v-container>
      </div> -->


      <!-- <v-container grid-list-sm>
      <v-card color="purple darken-2" class="white--text elevation-10">
        <div class="subheading"> {{settingsCurrent.theme}}</div>

      </v-card>
    </v-container> -->

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
    settings_color: 'white',
    theme: "lakshmi",
    language: "gujarati",
    audio: true
  }),
  mounted() {
    //do something after mounting vue instance
    this.settings_color = this.options[this.theme].iconEnabled;
  },
  computed: {
    ...mapState('settings', ['options', 'theme', 'language']),
    ...mapState('parameters', ['chapter', 'verse', 'breakSandhi']),
  },
  watch: {
          theme: function(x) {this.$store.state.settingsCurrent.theme = this.theme;},
          langue: function(x) {this.$store.state.settingsCurrent.language = this.language;}
        },
  methods: {
    setVerse(vid){
      this.$store.state.verse = vid;
    }
}
}
</script>

<style scoped>
.tst2 {
  margin: 2px;
}
</style>
