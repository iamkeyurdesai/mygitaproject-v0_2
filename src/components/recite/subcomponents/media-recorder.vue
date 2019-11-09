<template>
  <v-container mb-5>
    <v-layout row wrap>
      <div class="test2">
        <h3>Test 2 <span v-if="$vuetify.breakpoint.xsOnly"><br></span>
          <span v-if="!$vuetify.breakpoint.xsOnly"> - </span> Recording Processing &amp; Manipulation
        </h3>

        <h3></h3>
        <p>Manual processing and manipulation of the recording audio stream.</p>
        <div>
          <v-btn @click="startRecording" :disabled="recordingInProgress">Start Recording
          </v-btn>
          <v-btn @click="stopRecording" :disabled="!recordingInProgress">Stop Recording</v-btn>
          <v-icon :class="recordingInProgress ? 'live' : ''">mic</v-icon>
        </div>
      </div>
    </v-layout>

    <v-layout column wrap>
      <div id="audioProcessDiv" ref="audioProcessDiv" class="ml-2">
        Samples Received: {{ numAudioSamples }}
      </div>
    </v-layout>

    <v-layout row wrap class="ml-1 mt-1">
      <v-checkbox v-model="addNoise"
                  label="Add noise (dynamic)"></v-checkbox>
    </v-layout>

    <v-layout column wrap v-if="recordings.length > 0">
      <h4 class="mt-3">Recordings</h4>
      <div v-for="(recording,idx) in recordings" :key="recording.ts">
        <v-card>
          <v-card-title primary-title>
            <v-layout column wrap>
              <div>
                <h3>Recording #{{ idx + 1 }}</h3>
              </div>
              <div class="ml-3">
                <div>
                  <audio :src="recording.blobUrl" controls="true"/>
                </div>
                <div>
                  size: {{recording.size | fileSizeToHumanSize}}, type: {{recording.mimeType}}
                </div>
              </div>
            </v-layout>
          </v-card-title>
        </v-card>
        <v-divider v-if="idx !== (recordings.length-1)"/>
      </div>
    </v-layout>

    <v-layout column wrap>
      <h4 class="mt-3">Source</h4>
      <v-divider></v-divider>
      <div class="ml-4">
        <ul>
          <li>
            <a href="https://github.com/kaliatech/web-audio-recording-tests/blob/master/src/views/Test2.vue">
              src/views/Test2.vue
            </a>
            <ul class="ml-3">
              <li>Primarily:
                <a
                  href="https://github.com/kaliatech/web-audio-recording-tests/blob/master/src/shared/RecorderService.js">
                  src/shared/RecorderService.js
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </v-layout>

    <v-layout column wrap hidden-xs-only>
      <h4 class="mt-3">Relevant</h4>
      <v-divider></v-divider>
      <div class="ml-4">
        <ul>
          <li>
            <a href="https://github.com/muaz-khan/RecordRTC/issues/324">
              https://github.com/muaz-khan/RecordRTC/issues/324
            </a>
          </li>
          <li>
            <a href="https://github.com/ai/audio-recorder-polyfill/issues/4">
              https://github.com/ai/audio-recorder-polyfill/issues/4
            </a>
          </li>
          <li>
            <a href="https://github.com/danielstorey/webrtc-audio-recording">
              https://github.com/danielstorey/webrtc-audio-recording
            </a>
          </li>
          <li>
            <a href="https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/microphone/">
              https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/microphone/
            </a>
          </li>
          <ul>
            <li>
              <a href="https://github.com/MicrosoftEdge/Demos/blob/master/microphone">
                https://github.com/MicrosoftEdge/Demos/blob/master/microphone
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </v-layout>

  </v-container>
</template>

<script>
import RecorderService from '@/components/recite/subcomponents/audiorecorder/shared/RecorderService'
import utils from '@/components/recite/subcomponents/audiorecorder/shared/Utils'
const Pitchfinder = require("pitchfinder");

export default {
  name: 'Test1',
  filters: {
    fileSizeToHumanSize (val) {
      return utils.humanFileSize(val, true)
    }
  },
  data () {
    return {
      recordingInProgress: false,
      supportedMimeTypes: [],
      recordings: [],
      cleanupWhenFinished: true,
      addNoise: false,
      numAudioSamples: 0,
      myData: new Float32Array(2048*1000),
      startTime: null,
      endTime: null
    }
  },
  created () {
    this.recorderSrvc = new RecorderService()
    this.recorderSrvc.em.addEventListener('recording', (evt) => this.onNewRecording(evt))
    this.recorderSrvc.em.addEventListener('onaudioprocess', (evt) => this.onAudioProcess(evt))
    this.recorderSrvc.config.broadcastAudioProcessEvents = true
  },
  mounted () {

  },
  methods: {
    start() {
  this.startTime = new Date();
},
end() {
  this.endTime = new Date();
  let timeDiff = this.endTime - this.startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  let seconds = Math.round(timeDiff);
  console.log(seconds + " seconds");
  console.log(timeDiff + " seconds");
},
    startRecording () {
      this.start()
      this.numAudioSamples = 0
      this.recorderSrvc.startRecording()
        .then(() => {
          this.recordingInProgress = true
        })
        .catch((error) => {
          console.error('Exception while start recording: ' + error)
          alert('Exception while start recording: ' + error.message)
        })
    },
    stopRecording () {
      this.end()
      this.recorderSrvc.stopRecording()
      this.recordingInProgress = false
      console.time('freqPeak')
      const myDataFinal = this.myData.slice(0,this.numAudioSamples*2048)
      const detectPitch = Pitchfinder.YIN();
      const frequencies = Pitchfinder.frequencies(detectPitch, myDataFinal, {
          tempo: 120, // in BPM, defaults to 120
          quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
          //sampleRate: 48000
        })
     //console.log(detectPitch(this.dataArray))
     console.log(frequencies.map(a=>a>1000?null:a))
     console.timeEnd('freqPeak')
     console.log(myDataFinal)
    },
    onAudioProcess (e) {
      this.numAudioSamples++

      let inputBuffer = e.detail.inputBuffer
      let outputBuffer = e.detail.outputBuffer

      for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        let inputData = inputBuffer.getChannelData(channel)
        let outputData = outputBuffer.getChannelData(channel)
        for(let i=0;i<2048;i=i+1){
          this.myData[(this.numAudioSamples-1)*2048+i] = inputData[i]
        }
        // Each sample
        for (let sample = 0; sample < inputBuffer.length; sample++) {
          if (this.addNoise) {
            outputData[sample] = (inputData[sample] + (Math.random() * 0.02))
          }
          else {
            outputData[sample] = inputData[sample]
          }
        }
      }
    },
    onNewRecording (evt) {
      this.recordings.push(evt.detail.recording)
    }

  }
}
</script>
<style lang="stylus" scoped="true">
  @import '~vuetify/src/stylus/settings/_variables'
  @media screen and (min-width: $grid-breakpoints.sm)
    audio
      width 35em

  @media screen and (max-width: ($grid-breakpoints.sm - 1))
    audio
      width 100%

  .live
    color red
</style>
