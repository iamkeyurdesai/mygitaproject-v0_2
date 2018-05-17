<template>
<v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-card color="purple darken-2" class="white--text elevation-10">
        <v-container>
        <v-layout row>
          <v-flex xs6>
            <div>
              <div class="body-2 grey--text"> | Chapter {{mypreviews[index].chapter_id}} </div>
              <div class="subheading ma-0" v-bind:style="{fontWeight : 300}">{{mypreviews[index].title1}}</div>
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
              <v-btn small @click.native="setChapter" color="red" v-if="mypreviews[index].chapter_id==this.$store.state.chapter">Select</v-btn>
              <v-btn small @click.native="setChapter" v-else>Select</v-btn>
              <v-spacer></v-spacer>
              <v-btn  fab flat small dark><v-icon>ondemand_video</v-icon></v-btn>
              <v-btn  fab flat small dark><v-icon>hearing</v-icon></v-btn>
              <v-btn  fab flat small dark><v-icon>image</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show" class="body-2 pa-0">
                <div v-html="mypreviews[index].preview" v-bind:style="{fontWeight : 200}"> </div>
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
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';
  export default {
    props: ["index"],
    data: () => ({
      show: false
    }),
    computed: {
      mypreviews(){
        return this.$store.state.preview;
      }
    },
    methods: {
      setChapter(){
        this.$store.state.chapter = this.$store.state.preview[this.index].chapter_id;
      }
  }
}
  </script>
