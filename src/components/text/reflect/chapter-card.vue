<template>
<v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-card class="elevation-3">
        <v-container>
        <v-layout row>
          <v-flex xs6>
            <div>
              <div> | Chapter {{preview[index].chapter_id}} </div>
              <div class="subheading ma-0" v-bind:style="{fontWeight : 300}">{{preview[index].title1}}</div>
            </div>
          </v-flex>
          <v-flex xs6>
            <v-card-media
            src="https://source.unsplash.com/random"
            height="125px"
            contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn small @click.native="setChapter_local" color="red" v-if="preview[index].chapter_id==this.chapter">Select</v-btn>
              <v-btn small @click.native="setChapter_local" v-else>Select</v-btn>
              <v-spacer></v-spacer>
              <v-btn  fab flat small><v-icon>ondemand_video</v-icon></v-btn>
              <v-btn  fab flat small><v-icon>hearing</v-icon></v-btn>
              <v-btn  fab flat small><v-icon>image</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show" class="body-2 pa-0">
                <div v-html="preview[index].preview" v-bind:style="{fontWeight : 200}"> </div>
              </v-card-text>
            </v-slide-y-transition>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
    </v-layout>
    </v-container>
  </template>

  <script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  import { mapGetters } from 'vuex';
  export default {
    props: ["index"],
    data: () => ({
      show: false
    }),
    computed: {
      ...mapState('parameters', ['chapter']),
      ...mapState('coretext', ['preview']),
      ...mapGetters('settings', ['GET_dark'])
    },
    methods: {
      ...mapMutations('parameters', ['SET_chapter']),
      setChapter_local(){
        this.SET_chapter(this.preview[this.index].chapter_id);
      }
  }
}
  </script>
