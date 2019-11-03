<template>
                 <!-- <v-layout row v-show="chantAddColumn">
                   <v-flex xs5>
                 <uvachCard :verse_id="item.verse_id"> </uvachCard>
                 <shloakCard :verse_id="item.verse_id"></shloakCard>
               </v-flex>
               <v-flex xs5>
               <uvachCard :verse_id="item.verse_id" whatScript="iast"> </uvachCard>
               <shloakCard :verse_id="item.verse_id" whatScript="iast"></shloakCard>
               </v-flex>
                 </v-layout>
                   <v-flex v-show="!chantAddColumn">
               <uvachCard :verse_id="item.verse_id"> </uvachCard>
               <shloakCard :verse_id="item.verse_id"></shloakCard>
             </v-flex> -->

             <v-layout row>
               <v-flex :xs5="chantAddColumn">
             <uvachCard :verse_id="item.verse_id"> </uvachCard>
             <shloakCard :verse_id="item.verse_id"></shloakCard>
           </v-flex>
           <v-flex xs5 v-show="chantAddColumn">
           <uvachCard :verse_id="item.verse_id" whatScript="iast"> </uvachCard>
           <shloakCard :verse_id="item.verse_id" whatScript="iast"></shloakCard>
           </v-flex>
             </v-layout>
</template>

<script>
import shloakCard from '../read/subcomponents/shloak-card.vue'
import uvachCard from '../read/subcomponents/uvach-card.vue'
export default {
  props: {
    item: Object,
    chantAddColumn: Boolean
  },
  data: function() {
    return {
      }
    },
  components: {
    shloakCard,
    uvachCard
  }
}
</script>

<style lang="scss">
</style>
