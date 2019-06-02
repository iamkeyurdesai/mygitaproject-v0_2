<template>
<div class="background">
<div class="font-weight-light mt-2 pa-1 body-2"> Select chapter </div>
  <div class="scrolling-wrapper-flexbox background" id="chapterContainer">
    <div class="card mx-1" v-for="i in 23" @click="setChapter_local(i)">
<v-card class="mt-0 background" :dark="GET_dark">
      <v-card class="mt-0">
        <v-img height="100px" width="100px"
        :src="chapterCarouselImage(i)">
      </v-img>
      </v-card>
      <div class="body-2 pt-1"> {{title_local(i)}} </div>
      <div class="caption font-weight-light pb-1"> chapter {{i}} </div>
      </v-card>
    </div>
  </div>
  <v-layout row align-start justify-start class="shiftButtons">
    <v-btn fab small light  @click="sideScroll('left')" class="mx-0"> <v-icon  large> keyboard_arrow_left  </v-icon> </v-btn>
    <v-spacer></v-spacer>
    <v-btn fab small light @click="sideScroll('right')" class="mx-0"> <v-icon  large> keyboard_arrow_right </v-icon> </v-btn>
  </v-layout>
</div>
</template>

  <script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  import { mapGetters } from 'vuex';
  import Sanscript from 'Sanscript';
  export default {
    props: ["index"],
    data: () => ({
      show: false
    }),
    computed: {
      ...mapState('parameters', ['chapter', 'language', 'script']),
      ...mapState('coretext', ['preview']),
      ...mapGetters('settings', ['GET_dark'])
    },
    methods: {
      ...mapMutations('parameters', ['SET_chapter']),
      setChapter_local(i){
        this.SET_chapter(i);
      },
      chapterCarouselImage(i) {
        let mylink = '/static/img/chapter_preview/previewchapter' + i + '.jpeg'
        return mylink
      },
      title_local(i){
        let temp = []
        temp = this.preview.filter(a => a.chapter_id==i)
        return Sanscript.t(temp[0].title2, 'iast', this.script);
      },
      sideScroll(direction){
        let element = document.getElementById("chapterContainer")
        let speed = 25, distance = 120, step = 10
        let scrollAmount = 0;
        var slideTimer = setInterval(function(){
          if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}
  }
}
  </script>
<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 160px;
  margin-bottom: 20px;
  margin-top: 5px;
  width: 100%;
  .card {
    flex: 0 0 auto;
    margin-right: 3px;
  }
}

.card {
  width: 160px;
  height: 160px;
}

.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
.shiftButtons{
  top: -185px;
  margin-bottom: -52px;
  position: relative;
}
</style>
