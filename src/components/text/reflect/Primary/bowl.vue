<template>
<div :style="cssProps">
  <!-- header containing chapter, verse and salutation -->


        <div class="ma-1 pa-1">
          <div class="bowl ma-0 pa-0">
    <div class="inner">
      <div class="fill">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300">
          <path class="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
  	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
  	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"/></path>
        </svg>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>

export default {
  data: function() {
    return {
    }
  },
  props: ['mywidth', 'myfill', 'mycolor'],
  computed: {
    cssProps() { return {
        '--mycolor': this.$vuetify.theme[this.mycolor],
	      '--mywidth': this.mywidth + "px",
        '--myfill': this.myfill + "px"
      }
    }
  }
}
</script>

<style lang="scss">
.bowl {
  position: relative;
  border-radius: 50%;
  width: var(--mywidth);
  height: var(--mywidth);
  box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
  background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
  background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
  margin: 20px;
  &:before {
    overflow: hidden;
    border-radius: 50%;
    content: "";
    box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.5), inset 0 -20px 5px 0 rgba(0, 0, 0, 0.2), inset -15px 0 5px 0 rgba(0, 0, 0, 0.1), inset 15px 0 5px 0 rgba(0, 0, 0, 0.1);
    background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
    background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.65) 81%, black 100%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.65) 81%, #000000 100%);
    position: absolute;
    width: var(--mywidth);
    height: var(--mywidth);
    z-index: 2;
  }
  &:after {
    content: "";
    width: var(--mywidth) / 2.5;
    border-radius: 50%;
    height: 10px;
    background: var(--mycolor);
    box-shadow: inset 0 0 10px 0 #000;
    position: absolute;
    left: 50%;
    margin-left: -((var(--mywidth) / 2.5) /2);
    bottom: 0;
    z-index: 2;
  }
  & .inner {
    border-radius: 50%;
    width: var(--mywidth);
    height: var(--mywidth);
    background: -moz-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
    background: -webkit-radial-gradient(center, ellipse cover, transparent 0%, transparent 76%, rgba(0, 0, 0, 0.65) 100%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 76%, rgba(0, 0, 0, 0.65) 100%);
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    &:before {
      content: "";
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      position: absolute;
      right: 40%;
      top: 60%;
      z-index: 2;
    }
    &:after {
      content: "";
      width: 20px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      position: absolute;
      right: 30%;
      top: 15%;
      transform: rotate(-20deg);
      z-index: 2;
    }
  }
  & .fill {
    animation-name: fillAction;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.2, 0.6, 0.8, 0.4);
    animation-duration: 4s;
    animation-fill-mode: forwards;
  }
  & .waveShape {
    overflow: hidden;
    animation-name: waveAction;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 0.5s;
    width: var(--mywidth) ;
    height: var(--mywidth);
    // fill: #039be4;
    fill: var(--mycolor);
  }
}

@keyframes fillAction {
  0% {
    transform: translate(0, var(--mywidth));
  }
  100% {
    transform: translate(0, var(--myfill));
  }
}

@keyframes waveAction {
  0% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

</style>
