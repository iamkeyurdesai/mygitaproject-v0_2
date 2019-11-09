<template>
<div>
<v-btn @click="loadMedia()" id="btnStart">Load Video</v-btn>
<v-btn @click="this.mediaRecorder.start()" >START RECORDING</v-btn>
<v-btn @click="this.mediaRecorder.stop()" >STOP RECORDING</v-btn>


  <v-layout max-width="400px">
  <video id="vid1" controls></video>
</v-layout>
  <video id="vid2" controls></video>
  {{this.chunks.length}}
  {{this.chunks}}
  {{this.video}}
  {{this.vidSave}}
  {{this.mediaRecorder}}
</div>
</template>
<script>
export default {
  data: function() {
    return {
      chunks: [],
      video: null,
      start: null,
      stop: null,
      vidSave: null,
      mediaRecorder: null
    }
  },
  methods: {
    loadMedia() {
      console.log("i ma here")
      //do something after mounting vue instance
       let constraintObj = {
           audio: true,
           video: {
               facingMode: "user",
               width: { min: 640, ideal: 1280, max: 1920 },
               height: { min: 480, ideal: 720, max: 1080 }
           }
       }
       // width: 1280, height: 720  -- preference only
       // facingMode: {exact: "user"}
       // facingMode: "environment"

       //handle older browsers that might implement getUserMedia in some way
       if (navigator.mediaDevices === undefined) {
           navigator.mediaDevices = {};
           navigator.mediaDevices.getUserMedia = function(constraintObj) {
               let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
               if (!getUserMedia) {
                   return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
               }
               return new Promise(function(resolve, reject) {
                   getUserMedia.call(navigator, constraintObj, resolve, reject);
               });
           }
       }else{
           navigator.mediaDevices.enumerateDevices()
           .then(devices => {
               devices.forEach(device=>{
                   console.log(device.kind.toUpperCase(), device.label);
                   //, device.deviceId
               })
           })
           .catch(err=>{
               console.log(err.name, err.message);
           })
       }

       navigator.mediaDevices.getUserMedia(constraintObj)
       .then((mediaStreamObj)=> {
           //connect the media stream to the first video element
           this.video = document.getElementById('vid1');
           if ("srcObject" in this.video) {
               this.video.srcObject = mediaStreamObj;
           } else {
               //old version
               this.video.src = window.URL.createObjectURL(mediaStreamObj);
           }

           this.video.onloadedmetadata = (ev) => {
               //show in the video element what is being captured by the webcam
               this.video.play();
           };

           //add listeners for saving video/audio
           this.vidSave = document.getElementById('vid2');
           this.mediaRecorder = new MediaRecorder(mediaStreamObj);
           // let chunks = [];
           this.mediaRecorder.ondataavailable = (ev)=>{
               this.chunks.push(ev.data);
           }
           this.mediaRecorder.onstop = (ev)=>{
               let blob = new Blob(this.chunks, { 'type' : 'video/mp4;' });
               this.chunks = [];
               let videoURL = window.URL.createObjectURL(blob);
               this.vidSave.src = videoURL;
           }
       })
       .catch(function(err) {
           console.log(err.name, err.message);
       });
     }
  }
}
</script>

<style lang="scss">
</style>
