<template>
  <div class="text-xs-center openicon">
Welcome!
  </div>


    </v-flex>
  </div>
</template>

<script>

</script>

<style scoped>
.openicon {
     color: white;
    -webkit-animation-name: openicon; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 10s; /* Safari 4.0 - 8.0 */
    animation-name: openicon;
    animation-duration: 10s;
    animation-iteration-count:10;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes openicon {
    from {color: red;}
    to {color: green;}
}
/* Standard syntax */
@keyframes openicon {
    from {color: red;}
    to {color: green;}
}
</style>
