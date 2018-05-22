
<template>

  <div class="text-xs-center mydiv1">
    <v-flex xs12>
      <v-layout justify-space-between>
<v-icon small fab v-bind:style="{color: mycolor1}" v-on:click.stop="settings" class="vbtn"></v-icon>
      <span v-bind:style="{ color: footcolors[6]}">: meaning :</span>
<v-icon v-bind:style="{color: mycolor}" v-on:click.stop="settings"> </v-icon>
</v-layout>
<div align="left" v-show="!show" class="elevation-5">
<span class="myspan1"> {{mygitapress.bhavarth.substring(0,40)}} &#8230;
  <v-btn small flat icon dark @click.native="show = !show" class="vbtn">
    <v-icon>{{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
  </v-btn>
  </span>
</div>
  <v-slide-y-transition>
    <div align="left" v-show="show" class="elevation-5">
      <span class="myspan2"> {{ mygitapress.bhavarth }}
      <!-- <v-btn small flat icon dark @click.native="show = !show" class="vbtn"> -->
        <v-icon dark @click="show = !show" class="vbtn">
          {{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}
        </v-icon>
      <!-- </v-btn> -->
      </span>
    </div>
  </v-slide-y-transition>
</v-flex>
</div>
  <!--
<div class="text-xs-center mydiv1">
  <v-flex xs12>
    <div align="left">
      <span class="myspan1"> {{ mygitapress.sambandh }} </span>
    </div>
  </v-flex>
</div> -->


</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';
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
    mygitapress() {
      let mytemp1 = this.$store.state.chapter
      let mytemp2 = this.$store.state.verse
      let mytemp = this.$store.state.gitapress.filter(function(item) {
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
  src: url(../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
}

.myspan1 {
  font-size: 85%;
  text-overflow: ellipsis;
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto Condensed'; */
}

.myspan2 {
  font-size: 90%;
  /* word-spacing: -0.05em; */
  /* font-family: "myfont", 'Roboto Condensed'; */
  font-weight: 200;
}
vbtn {
  margin: 0;
  padding: 0;
}
</style>
