<template>
  <div class="text-xs-center">
    <v-dialog
    v-model="sheet"
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
    >
<template v-slot:activator="{ on }">
<v-btn v-show="true" color="accentinfo" dark fab bottom left small fixed class="shiftUp shiftLeft">
    <v-icon @click="sheet=true"> format_size</v-icon>
  </v-btn>
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

    <v-card class="px-2 my-3" v-if="isScript">
      <!-- <v-radio-group v-model="script" row> -->
        <strong>script: </strong>
        <!-- <v-radio v-for="(item, i) in options.script" v-bind:label="convert(item)" v-bind:value="item" :key="item + '_key'"></v-radio> -->
        <v-btn small  class="text-none ma- pa-0"
        v-for="(item, i) in options.script" @click="script=item" :key="item" outline round>
          <span>{{convert(item)}}
            <v-icon small v-if="script===item">done </v-icon> </span></v-btn>
      <!-- </v-radio-group> -->
      </v-card>

<!-- <v-card class="px-1" v-if="isFsize">
          <v-radio-group v-model="fsize" row>
          <strong> font size: </strong>
            <v-radio v-for="(item, i) in options.fsize" v-bind:label="item" v-bind:value="item" :key="item + '_key'"></v-radio>
          </v-radio-group>
  </v-card> -->

  <v-card class="pa-1 my-3" v-if="isFsize">
  <strong>font: </strong>
  <v-btn small class="text-none ma-1 pa-1"
  v-for="(item, i) in options.fsize" @click="fsize=item" :key="item" flat>
    <span :class="options.fsizeInternal[item]">{{item}}
      <v-icon small v-if="fsize===item">done </v-icon> </span></v-btn>
</v-card>
            <v-card class="pa-1 my-3" v-if="isTheme">
            <strong>theme: </strong>
            <v-btn small class="text-none ma-1 pa-1" :color="options[item].theme.background"
            v-for="(item, i) in options.theme" @click="theme=item" :key="item" :round="theme===item">
              <span :style="{color: options[item].theme.accent2}">{{item}}
                <v-icon :color="options[item].theme.accent1" small v-if="theme===item">done </v-icon> </span></v-btn>
          </v-card>

          <v-card class="px-1 my-3" v-if="isLanguage">
            <!-- <v-radio-group v-model="language" row> -->
              <strong>language: </strong>
              <v-btn small class="text-none ma-1 pa-0"
              v-for="(item, i) in options.language" @click="language=item" :key="item" flat>
                <span>{{options.language1[item]}}
                  <v-icon small v-if="language===item">done </v-icon> </span></v-btn>
              <!-- <v-radio v-for="(item, i) in options.language" v-bind:label="options.language1[item]" v-bind:value="item" :key="item + '_key'"></v-radio> -->
            <!-- </v-radio-group> -->
          </v-card>
</v-flex>
</v-layout>
</v-card>


            </v-card>
</v-dialog>
</div>

</template>

<script>
import {mapMutations} from 'vuex'
import {mapState} from 'vuex'
import { mapGetters } from 'vuex'
import Sanscript from 'Sanscript'

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
                                   'SET_fsize', 'SET_fweight', 'SET_slines']),
  convert(myinput) {
    if(myinput==='iast') {
    return 'English'
  } else {
    return Sanscript.t(this.options.script1[myinput], 'itrans', myinput)
  }
   },
}
}
</script>

<style scoped>
.shiftUp{
  margin-bottom: 48px;
}
.shiftLeft{
  margin-left: -5px;
}
</style>
