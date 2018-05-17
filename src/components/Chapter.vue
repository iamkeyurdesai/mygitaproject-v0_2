<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="sheet"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >

<span slot="activator" class="tst1">Chapter 1</span>
<v-card tile>

<v-toolbar card dark color="primary">
  <v-btn icon dark @click.native="sheet = false">
    <v-icon>close</v-icon>
  </v-btn>
  </v-toolbar>

<v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 v-for="(item,i) in line1.isActive" :key="i">
            <v-card color="purple darken-2" class="white--text">

              <!-- <v-card-media
                        class="white--text"
                        height="150px"
                        src="https://source.unsplash.com/random"
                      >
                        <v-container fill-height fluid>
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                              <div class="subheading grey--text">Chapter {{i + 1}} </div>
                        <div class="title">{{line1.title[i]}}</div>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-media>
                        <v-card-actions>
                <v-btn flat small>Summary</v-btn>
                <v-btn flat small>Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="show">
                  {{line1.preview[i]}}
                </v-card-text>
              </v-slide-y-transition> -->

              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs6>
                    <div>
            <div class="subheading grey--text">Chapter {{i + 1}} </div>
            <div class="title">{{line1.title[i]}}</div>
            <div>47 verses</div>
            <div>{{show}}</div>
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
          <v-btn small>Select</v-btn>
<v-spacer></v-spacer>
          <v-btn  fab flat small dark><v-icon>ondemand_video</v-icon></v-btn>
          <v-btn  fab flat small dark><v-icon>hearing</v-icon></v-btn>
          <v-btn  fab flat small dark><v-icon>image</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="toggle(i)">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show" v-html="mytext[i]">
          </v-card-text>
        </v-slide-y-transition>
      </v-flex>
      </v-layout>
              </v-container>

            </v-card>
          </v-flex>

        </v-layout>
      </v-container>

    </v-card>
  </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
  export default {
    data: () => ({
      sheet: false,
      show: false,
      mytext: [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    }),
    computed: {
      line1(){
        return this.$store.state.text1;
      }
    },
    methods: {
      toggle: function (i) {
        console.log(i)
        for (var j = 0; j < this.mytext.length; j++) {
    this.mytext[i] = " "
}
        this.mytext[i] = this.$store.state.text1.preview[i]
        this.show = !this.show
      },
      toggle_return: function (i) {
        return(this.show[i])
      }
    }
  }
</script>

<style scoped>
.tst1 {
  font-size: 120%;
  color: white;
}
</style>
