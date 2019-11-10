const Pitchfinder = require('pitchfinder')
const detectPitch = Pitchfinder.YIN()
import MusicTempo from 'music-tempo/src/MusicTempo.js'
//import { analyze } from 'web-audio-beat-detector'
// import _ from 'web-audio-beat-detector'
//self.analyze = require('web-audio-beat-detector').analyze
// self.importScripts('/static/deatdetektor.js')
// const bd_low = new BeatDetektor(48,95)
//const detectPitch = Pitchfinder.AMDF()
// const config1 = {
//     tempo: 120, // in BPM, defaults to 120
//     quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
//     //sampleRate: 48000
//   }

  // self.onmessage = (event) => {
  //   let pitch1 = Pitchfinder.frequencies(detectPitch, event.data, config)
  //   let pitch = new Float32Array(pitch1)
  //   self.postMessage(pitch.buffer, [pitch.buffer])
  // }

self.onmessage = ({ data: { myDataFinal, config} }) => {
  let pitch = Pitchfinder.frequencies(detectPitch, myDataFinal, config)
  let mt = new MusicTempo(myDataFinal)
  //pitch = mt.tempo
  pitch = mt.beatInterval
  //pitch = mt.beats
  // bd_low.process(0, myDataFinal)
  // pitch = bd_low.win_bpm_int/10.0
  self.postMessage({pitch: pitch})
}
