
<template>
<div class="text-xs-center mydiv1">
    <div align="left">
      <span v-for="i in myindex_extract()" v-bind:style="{color:footcolors[mymain.word_info[i-1].foot - 1]}" class="myspan1">
{{convert(mymain.word_info[i-1].sanskrit)}} = <span class="myspan2">{{mymain.word_info[i-1].english}}</span><br></span>
      </span>
    </div>
</div>
</template>

<script>
import Sanscript from 'Sanscript';
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';
export default {
  data: () => ({
    counter: true,
    footcolors: ["aqua", "gold", "pink", "lawngreen", "blue", "ivory", "yellow"],
    footbreaks: ["", "|", "", "||", "", "|"],
    dosandhi: false,
    mycolor: "grey",
    opentoolbar: true,
  }),
  computed: {
    mymain() {
      let mytemp1 = this.$store.state.chapter
      let mytemp2 = this.$store.state.verse
      let mytemp = this.$store.state.main.filter(function(item) {
        return (item.chapter_id == mytemp1 && item.verse_id == mytemp2);
      });
      return mytemp[0];
    }
  },
  methods: {
    convert(myinput){
          return Sanscript.t(myinput, 'iast', this.$store.state.settingsCurrent.language);
        },
    setVerse(vid) {
      this.$store.state.verse = vid;
    },
    myindex_extract() {
      return this.mymain.word_info.map(x => x.index)
    },
    range(start, end) {
      var foo = [];
      for (var i = start; i <= end; i++) {
        foo.push(i);
      }
      return foo;
    },
    checkBreak(i, j) {
      let myflag = false
      let mytemp = this.mymain.word_info[i + 1]
      if (!(mytemp === undefined)) {
        if (j == 2) {
          myflag = (this.mymain.word_info[i].foot < this.mymain.word_info[i + 1].foot) &&
            (this.mymain.word_info[i].foot % 2 == 0)
        } else {
          myflag = (this.mymain.word_info[i].foot < this.mymain.word_info[i + 1].foot)
        }
      }
      return myflag
    },
    sandhi: function() {
      this.dosandhi = !this.dosandhi;
      if (this.dosandhi) {
        this.mycolor = "white";
      } else {
        this.mycolor = "grey";
      }
    }
  }
}
</script>

<style scoped>
.mydiv1 {
  font-size: 100%;
}

.mydiv2 {
  padding: 5px;
}


.openicon {
  color: white;
  -webkit-animation-name: openicon;
  /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 10s;
  /* Safari 4.0 - 8.0 */
  animation-name: openicon;
  animation-duration: 10s;
  animation-iteration-count: 10;
}

/* Safari 4.0 - 8.0 */

@-webkit-keyframes openicon {
  from {
    color: red;
  }
  to {
    color: green;
  }
}

/* Standard syntax */

@keyframes openicon {
  from {
    color: red;
  }
  to {
    color: green;
  }
}

@font-face {
  font-family: myfont;
  src: url(../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
}

.myspan1 {
  font-size: 100%;
  /* word-spacing: -0.05em; */
  font-family: "myfont", 'Roboto';
}

.myspan2 {
  font-size: 110%;
  word-spacing: -0.05em;
  font-family: "myfont", 'Roboto';
  /* font-weight: 300; */
}
</style>
