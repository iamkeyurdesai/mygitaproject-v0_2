<template>
<v-card class="ma-1 pa-0 background" flat>
  <v-layout column wrap class="ma-0" justify-center>
      <v-flex class="ma-1 pa-0">
        <div align="center" class="pa-2 accentinfo--text" :style="cssProps">
          {{GET_salutation_local}}
      </div>
      </v-flex>
      </v-layout>
      </v-card>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Sanscript from 'Sanscript';
export default {
  props: {
    whatLanguage: String
  },
  data: () => ({
  }),
  computed: {
    ...mapState('settings', ['options']),
    ...mapState('parameters', ['chapter', 'theme', 'script']),
    ...mapGetters('coretext', ['GET_salutation']),
    cssProps() { return {
      color: this.options[this.theme].emphasis.high
    }
  },
  GET_salutation_local() {
    if(this.whatLanguage===undefined) {
      return this.GET_salutation
    } else {
      if(this.whatLanguage==='hindi') {
        return 'ॐ आदरणीय परमात्माको नमन!'
      }
      if(this.whatLanguage==='english') {
        return 'Oṃ! Saluation to the Supreme Soul!'
      }
    }
  }
},
methods: {

}
}
</script>

<style scoped>
</style>
