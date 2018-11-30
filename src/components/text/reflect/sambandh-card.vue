
<template>

  <div class="text-xs-center mydiv1">
    <!-- <v-flex xs12 align-center>
      <v-layout> -->
<div align="center" v-show="!show">
<span class="myspan1"> CONTEXT: {{mygitapress.sambandh.substring(0,40)}} &#8230;
  <v-btn small flat icon dark @click.native="show = !show" class="vbtn">
    <v-icon>{{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
  </v-btn>
  </span>
</div>
  <v-slide-y-transition>
    <div align="left" v-show="show">
      <span class="myspan2"> {{ mygitapress.sambandh }}
      <!-- <v-btn small flat icon dark @click.native="show = !show" class="vbtn"> -->
<v-icon dark @click="show = !show" class="vbtn">
          {{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}
        </v-icon>
      <!-- </v-btn> -->
 </span>
    </div>
  </v-slide-y-transition>
<!-- </v-layout>
</v-flex> -->
</div>


</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    counter: true,
    footcolors: ["aqua", "gold", "pink", "lawngreen", "blue", "ivory", "lightgrey"],
    footbreaks: ["", "|", "", "||", "", "|"],
    dosandhi: false,
    mycolor: "grey",
    opentoolbar: true,
    show: false
  }),
  computed: {
    ...mapState('parameters', ['chapter', 'verse']),
    ...mapState('coretext', ['gitapress']),
    mygitapress() {
      let mytemp1 = this.chapter
      let mytemp2 = this.verse
      let mytemp = this.gitapress.filter(function(item) {
        return (item.chapter_id == mytemp1 && item.verse_id == mytemp2);
      });
      return mytemp[0];
    }
  }
  }
</script>

<style scoped>
.mydiv1 {
  /* font-size: 100%; */
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
  /* text-overflow: ellipsis; */
  /* word-spacing: -0.05em; */
  font-family: "myfont","Roboto";
}

.myspan2 {
  font-size: 100%;
  /* word-spacing: -0.05em; */
  font-family: "myfont";
}
vbtn {
  margin: 0;
  padding: 0;
}
</style>
