<template>

<div class="background">
<div class="font-weight-light mt-2 pa-1"> Select chapter </div>
  <div class="scrolling-wrapper-flexbox background lighten-1">
    <div class="card mx-1" v-for="i in 23" @click="setChapter_local(i)">
<v-card class="mt-0 background" :dark="GET_dark">
      <v-card class="mt-0">
        <v-img height="100px" width="100px"
        :src="chapterCarouselImage(i)">
      </v-img>
      </v-card>
      <div class="body-2 "> {{title_local(i)}} </div>
      <div class="caption font-weight-light"> chapter {{i}} </div>
      </v-card>
    </div>
  </div>
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
      }
  }
}
  </script>
<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .card {
    flex: 0 0 auto;
    margin-right: 3px;
  }
}

.card {
  width: 140px;
  height: 140px;
}

.scrolling-wrapper-flexbox {
  height: 140px;
  margin-bottom: 20px;
  margin-top: 5px;
  width: 100%;
}
.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
</style>
