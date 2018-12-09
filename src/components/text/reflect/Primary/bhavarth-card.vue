
<template>

  <div class="text-xs-center mydiv1">
<div align="center" v-show="!show">
<span class="myspan1"> MEANING: {{mygitapress.bhavarth.substring(0,25)}} &#8230;
  <v-btn small flat icon dark @click.native="show = !show" class="vbtn">
    <v-icon>{{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
  </v-btn>
  </span>
</div>
  <v-slide-y-transition>
    <div align="left" v-show="show">
      <span class="myspan2"> {{ mygitapress.bhavarth }}
      <!-- <v-btn small flat icon dark @click.native="show = !show" class="vbtn"> -->
        <v-icon dark @click="show = !show" class="vbtn">
          {{ show ? 'arrow_drop_up' : 'arrow_drop_down' }}
        </v-icon>
      <!-- </v-btn> -->
      </span>
    </div>
  </v-slide-y-transition>
</div>


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
    footcolors: ["aqua", "gold", "pink", "lawngreen", "blue", "ivory", "lightgrey"],
    footbreaks: ["", "|", "", "||", "", "|"],
    dosandhi: false,
    show: false
  }),
  computed: {
    ...mapGetters([
      'mygitapress'
    ])
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
src: url(../../../../assets/fonts/NotoSansDevanagari-hinted/NotoSansDevanagari-Light.ttf);
}

.myspan1 {
  /* word-spacing: -0.05em; */
  font-family: "myfont", 'Roboto';
}

.myspan2 {
  /* word-spacing: -0.05em; */
  font-family: "myfont", 'Roboto';
}
vbtn {
  margin: 0;
  padding: 0;
}
</style>
