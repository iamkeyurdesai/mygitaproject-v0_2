<template>
  <div class="text-xs-center openicon" @click="$router.push(path)">
    ॐ
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: 'reflect/primary'
    }
  }
}
</script>

<style scoped>
.openicon {
     margin-top: 200px;
     color: red;
     font-size: 1000%;
    -webkit-animation-name: openicon; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 5s; /* Safari 4.0 - 8.0 */
    animation-name: openicon;
    animation-duration: 5s;
    animation-iteration-count:50;
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
