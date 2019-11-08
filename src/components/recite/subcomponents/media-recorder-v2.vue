<template>
<div>

<h1>Audio Recording Test</h1>
   <p>Talk for 3 seconds, then you will hear your recording played back</p>
   <v-btn id="action" @click="handleAction()">Start recording...</v-btn>
   {{audioChunks}}
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
      mediaRecorder: null,
      audioChunks: []
    }
  },
  methods: {
    recordAudio() {
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      // const audioChunks = [];
      //this.audioChunks = []

      mediaRecorder.addEventListener("dataavailable", event => {
        this.audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
            this.audioChunks = []
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    })
  },
  sleep(time) {
    new Promise(resolve => setTimeout(resolve, time))
  },
  async handleAction() {
  const recorder = await this.recordAudio();
  const actionButton = document.getElementById('action');
  //actionButton.disabled = true;
  recorder.start();
  //await this.sleep(3000);
  const audio = await recorder.stop();
  audio.play();
  //await this.sleep(3000);
  //actionButton.disabled = false;
}
}
}
</script>

<style lang="scss">
</style>
