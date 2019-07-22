<template>
<div :style="cssProps" v-scroll="onScroll" id="beginChanting">
  <div class="mx-0" :class="{'background lighten-1': GET_dark, 'background darken-1': !GET_dark}" max-width="500" :dark="GET_dark">
    <readNavigation v-if="!playON"> </readNavigation>

<v-fab-transition>
          <v-btn class="shiftRight" color="accentmain" dark fab bottom right fixed :class="{'mb-5':showNav}" v-on:click.stop="readPlay()" small v-if="!playON">
          <v-icon :style="cssProps_high"> play_arrow</v-icon>
      </v-btn>
      <v-btn class="shiftRight" color="accentmain" dark fab bottom right fixed :class="{'mb-5':showNav}"
      v-on:click.stop="readPause()" small v-else>
      <v-progress-circular :value="playONLoaderValue">
      <v-icon :style="cssProps_high"> pause</v-icon>
    </v-progress-circular>
  </v-btn>
</v-fab-transition>
<!-- <v-btn @click="createSearch()"> addindex </v-btn>
<div>
<input type="text" id="autocomplete">
            <input type="text" id="userinput" placeholder="Search by movie title ...">
          </div>
          <div id="suggestions"></div> -->

<v-subheader :dark="GET_dark" class="background"> For a quick reading </v-subheader>
      <v-container grid-list-md text-xs-left class="pa-1">
        <v-layout row wrap>
          <v-flex xs12 class="ma-0">
            <readSalutation> </readSalutation>
          </v-flex>
          <v-flex xs12 class="ma-0">
            <readStart> </readStart>
          </v-flex>
          <v-flex xs12  v-for="(item, i) in GET_gitapress_chapter" :key="i" class="ma-0 pa-0" :id="`read${i}`" v-observe-visibility="{
            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, i),
            throttle: 300
            }">

            <v-card class="background mx-1 my-2" :dark="GET_dark" v-if="$vuetify.breakpoint.width < 600">
              <div class="overflowHidden">
                <v-img :src="imagePath(i)" :lazy-src="imagePath(i)" gradient="to top,
                rgba(0,0,0,.44), rgba(0,0,0,.44)" :style="cssImage" transition >
                </v-img>
              </div>
              <div>
                <uvachCard :verse_id="item.verse_id" class="mt-2"> </uvachCard>
                <bhavarthCard :verse_id="item.verse_id" headingHide showVerseIndex></bhavarthCard>
              </div>
            </v-card>

            <v-card class="background mx-0 my-3" :dark="GET_dark" v-else-if="$vuetify.breakpoint.height < 500" :min-height="$vuetify.breakpoint.height">

              <v-layout row>
                <v-flex grow>
              <div class="overflowHidden">
                <v-img :src="imagePath(i)" :lazy-src="imagePath(i)" gradient="to top,
                rgba(0,0,0,.44), rgba(0,0,0,.44)" :style="cssImage" transition min-width="500" :max-height="$vuetify.breakpoint.height">
                </v-img>
              </div>
            </v-flex>
              <v-flex shrink>
              <div>
                <uvachCard :verse_id="item.verse_id" class="mt-1"> </uvachCard>
                <bhavarthCard :verse_id="item.verse_id" headingHide showVerseIndex></bhavarthCard>
              </div>
              </v-flex>
            </v-layout>


            </v-card>

            <v-card class="background mx-2 my-3" :dark="GET_dark" v-else>
              <v-layout row>
                <v-flex grow>
              <div class="overflowHidden">
                <v-img :src="imagePath(i)" :lazy-src="imagePath(i)" gradient="to top,
                rgba(0,0,0,.44), rgba(0,0,0,.44)" :style="cssImage" transition min-width="500" max-height="500">
                </v-img>
              </div>
            </v-flex>
              <v-flex shrink>
              <div>
                <uvachCard :verse_id="item.verse_id" class="mt-1"> </uvachCard>
                <bhavarthCard :verse_id="item.verse_id" headingHide showVerseIndex></bhavarthCard>
              </div>
              </v-flex>
            </v-layout>
            </v-card>

          </v-flex>
        </v-layout>
        <v-flex xs12 class="ma-0">
          <readEnd> </readEnd>
        </v-flex>
      </v-container>

  </div>

</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';
import {
  mapMutations
} from 'vuex';
import bhavarthCard from '../read/subcomponents/bhavarth-card.vue'
import readheaderCard from '../read/subcomponents/readheader-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
import readOutline from '../read/subcomponents/read-outline.vue'
import readStart from '../read/subcomponents/read-start.vue'
import readEnd from '../read/subcomponents/read-end.vue'
import readSalutation from '../read/subcomponents/read-salutation.vue'
import readNavigation from './subcomponents/read-navigation.vue'
import Sanscript from 'Sanscript';
var FlexSearch = require("flexsearch")

export default {
  data: function() {
    return {
       index: null,
       currentVerse: null,
       playON: false,
       playONPointer: null,
       playVerse: null,
       playONLoader: null,
       playONLoaderValue: 10,
       playMusic: new Audio()
    }
  },
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('coretext', ['preview', 'sivananda', 'gitapress', 'gitapress_commentary', 'main']),
    ...mapState('parameters', ['chapter', 'verse', 'script', 'authenticated', 'photoURL', 'theme', 'language', 'breakSandhi',
      'showLink', 'showTranslation', 'showAnvaya', 'showVerse', 'showNav', 'loadTheRestOfVerses', 'reciteChantFontSize', 'verseall'
    ]),
    ...mapGetters('coretext', ['GET_salutation', 'GET_gitapress_chapter', 'GET_preview_chapter', 'GET_sivananda_chapter']),
    ...mapGetters('settings', ['GET_dark']),
    offsetTop: {
      get() {
        return this.$store.state.parameters.offsetTop
      },
      set(value) {
        this.SET_offsetTop(value)
      }
    },
    fabShow: {
      get() {
        return this.$store.state.parameters.fabShow
      },
      set(value) {
        this.SET_fabShow(value)
      }
    },
    cssProps() {
      return {
        '--bg-hover-color': this.$vuetify.theme.accent1,
        '--hover-content': JSON.stringify(this.hoverContent),
        '--mywidth': "75px",
        '--myfill': "25px",
        'color': this.options[this.theme].emphasis.high
      }
    },
    cssProps_high() { return {
        'color': '#FFFFFFFF'
  }
},
    cssImage() {
      return {
            animation: 'move 10s ease infinite'
      }
    }
  },
  methods: {
    ...mapMutations('parameters', ['incrementChapter', 'decrementChapter', 'SET_showNav',
      'SET_value', 'SET_breakSandhi', 'SET_offsetTop', 'SET_fabShow', 'SET_showVerse', 'SET_loadTheRestOfVerses', 'SET_verse', 'SET_chapter',
    ]),
    convert(myinput) {
      return Sanscript.t(myinput, 'iast', this.script);
    },
    imagePath(myix) {
      return "/static/img/chapter_" + this.chapter + "_500px/"+ (myix+1) + ".jpeg"
    },
    onScroll(e) {
      let scrollTemp = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTemp < this.offsetTop) {
        this.fabShow = true
      } else {
        this.fabShow = false
      }
      this.offsetTop = scrollTemp
      if (scrollTemp > 300) {
        this.SET_loadTheRestOfVerses(true)
      }
    },
    readPlay() {

      this.playMusic.src = '/static/music/bensound-summer.mp3'
      this.playMusic.play()
      this.playON = true
      if(this.playVerse === null) {
      this.playVerse = this.currentVerse
    }
    if(!(this.playVerse > 1)) {
      this.playVerse = 1
    }
      this.playONLoader = setInterval(() => {
       this.playONLoaderValue += 10
     }, 20000/10 - 10)

    this.$vuetify.goTo('#read' + (this.playVerse - 1), {
      duration: 300,
      offset: this.showNav ? 0 : -60,
      easing: 'easeInOutCubic'
    })
      this.playONPointer = setInterval(() => {
        this.$vuetify.goTo('#read' + (this.playVerse - 1), {
          duration: 300,
          offset: this.showNav ? 0 : -60,
          easing: 'easeInOutCubic'
        })
        if(this.playVerse < this.verseall[this.chapter - 1]) {
        this.playVerse += 1
        this.playONLoaderValue = 0
      } else {
        this.playON = false
        this.playVerse = null
        clearInterval(this.playONPointer)
        clearInterval(this.playONLoader)
      }
    }, 20000)
    },
    readPause() {
      this.playON = false
      clearInterval(this.playONPointer)
      clearInterval(this.playONLoader)
      this.playMusic.pause()
    },
    visibilityChanged(isVisible, entry, i) {
      // console.log(isVisible, i, entry.time)
      this.currentVerse = i
    },
    createSearch(){
      console.log(this.main[0].foot.length)
      this.index = new FlexSearch({
            encode: false,
            suggest: true,
   tokenize: function(str){
       // return str.split(/[\x00-\x7F]+/);
       return str.split("");
   }
        })

        // for(var i = 0; i < this.gitapress.length; i++){
        //        this.index.add(i, this.gitapress[i].sambandh_hindi);
        //    }
        //    for(var i = 0; i < this.gitapress.length; i++){
        //   this.index.add(i+this.gitapress.length, this.gitapress[i].sambandh_english);
        //       }
        for(var j = 0; j < 4; j++) {
                 for(var i = 0; i < this.gitapress.length; i++){
                this.index.add(i+j*this.gitapress.length,
                  this.main[i].foot.length > j ? this.main[i].foot[j]["foot"] : "");
                    }
                  }

           var suggestions = document.getElementById("suggestions");
        var autocomplete = document.getElementById("autocomplete");
        var userinput = document.getElementById("userinput");
           userinput.addEventListener("input", show_results, true);
console.log(this.index)
console.log(this.gitapress)

           self = this
           function show_results(){
             console.log(this.value)
            var value = this.value;
            var results = self.index.search(value);
            console.log(results)
            console.log(self.gitapress.length)
            var i = 0, len = results.length;
            for(; i < len; i++){
            // console.log(self.gitapress[results[i]].sambandh_hindi)
            // console.log(self.gitapress[results[i] - self.gitapress.length].sambandh_english)
            console.log(self.main[results[i] % self.gitapress.length].foot[0]["foot"],
                        self.main[results[i] % self.gitapress.length].foot[1]["foot"],
                        self.main[results[i] % self.gitapress.length].foot[2]["foot"],
                        self.main[results[i] % self.gitapress.length].foot[3]["foot"])
          }

          }

    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    // verse: function(val) {
    //   if (!this.loadTheRestOfVerses) {
    //     this.SET_loadTheRestOfVerses(true)
    //     setTimeout(() => {
    //       this.$vuetify.goTo('#read' + (this.verse - 1), {
    //         duration: 300,
    //         offset: 0,
    //         easing: 'easeInOutCubic'
    //       })
    //     }, 400)
    //   } else {
    //     this.$vuetify.goTo('#read' + (this.verse - 1), {
    //       duration: 300,
    //       offset: 0,
    //       easing: 'easeInOutCubic'
    //     })
    //   }
    // }
  },
  updated: function() {
    this.$nextTick(function() {})
  },
  components: {
    bhavarthCard,
    readheaderCard,
    uvachCard,
    readOutline,
    readStart,
    readEnd,
    readSalutation,
    readNavigation
  }
}
</script>

<style lang="scss">
@keyframes move {
  from {
  	transform: scale(1.0);
  }
  to {
  	transform: scale(1.5);
  }
}
.overflowHidden{
  overflow: hidden;
}
.shiftRight{
  margin-right: -5px;
}
.shiftRight{
  margin-right: -5px;
}
</style>
