<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
<template v-slot:activator="{ on }">
<!-- <span :style="{width: '28px', height: '28px'}" slot="activator" @click="sheet=true"> -->
  <span :style="{width: '28px', height: '28px'}" @click="sheet=true">
    <v-icon> format_size</v-icon>
</span>
</template>
    <v-card>
      <v-toolbar card dark color="primary">
<v-layout justify-space-between row align-center>
<v-flex>
        <v-btn dark icon small @click.native="sheet = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
          <div class="text-xs-center subheading">
        {{subItem}} | settings
      </div>
    </v-flex>
    <v-flex>
  <v-layout column wrap align-center>
  <div class="subheading">{{language}}</div>
  <div class="caption">{{script}}</div>
  </v-layout>
</v-flex>
  </v-layout>
      </v-toolbar>


  <v-card class="secondary pb-4 px-2">
  <v-layout row wrap>
  <v-flex>
    <v-card class="px-1" v-if="isScript">
      <v-radio-group v-model="script" row>
        <strong>script: </strong>
        <v-radio v-for="(item, i) in options.script" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
      </v-radio-group>
      </v-card>

<v-card class="px-1" v-if="isFsize">
          <v-radio-group v-model="fsize" row>
          <strong> font size: </strong>
            <v-radio v-for="(item, i) in options.fsize" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
          </v-radio-group>
  </v-card>
            <v-card class="px-1" v-if="isTheme">
          <v-radio-group v-model="theme" row>
            <strong>theme: </strong>
            <v-radio v-for="(item, i) in options.theme" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
          </v-radio-group>
          </v-card>

          <v-card class="px-1" v-if="isLanguage">
            <v-radio-group v-model="language" row>
              <strong>language: </strong>
              <v-radio v-for="(item, i) in options.language" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
            </v-radio-group>
          </v-card>
</v-flex>
</v-layout>
</v-card>


            </v-card>
</v-dialog>
</div>

</template>

<script>
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';
import { mapGetters } from 'vuex';

export default {
  props: {
    isLanguage: Boolean,
    isScript: Boolean,
    isTheme: Boolean,
    isFsize: Boolean
  },
  data: () => ({
    sheet: false
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['subItem']),
    ...mapGetters('settings', ['GET_dark']),
    theme: {get(){return this.$store.state.parameters.theme}, set(value){this.SET_theme(value)}},
    language: {get(){return this.$store.state.parameters.language}, set(value){this.SET_language(value)}},
    script: {get(){return this.$store.state.parameters.script}, set(value){this.SET_script(value)}},
    fsize: {get(){return this.$store.state.parameters.fsize}, set(value){this.SET_fsize(value)}}
},
  methods: {
    ...mapMutations('parameters', ['SET_audio', 'SET_theme', 'SET_language', 'SET_script',
                                   'SET_fsize', 'SET_fweight', 'SET_slines'])
}
}
</script>

<style scoped>

</style>
