const Pitchfinder = require('pitchfinder')
const detectPitch = Pitchfinder.YIN()
import MusicTempo from 'music-tempo/src/MusicTempo.js'
self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js')
self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands')
// const tf = require('@tensorflow/tfjs')
// const _ = require('@tensorflow-models/speech-commands')
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

self.onmessage =  async({ data: { myDataFinal, config} }) => {

//   let summary = {}
//   summary.pitch = Pitchfinder.frequencies(detectPitch, myDataFinal, config)
//   summary.pitch = summary.pitch.filter(a => (a < 2000 & a!==null))
//   if(summary.pitch.length > 0) {
//   summary.pitchMean = summary.pitch.reduce((a,b) => (a+b)) / summary.pitch.length
//   summary.pitchStdDev = Math.sqrt(summary.pitch.map(x => Math.pow(x-summary.pitchMean,2)).reduce((a,b) => a+b)/(summary.pitch.length))
// } else {
//   summary.pitchMean = null
//   summary.pitchStdDev = null
// }
//   let mt = new MusicTempo(myDataFinal)
//   summary.tempo = mt.tempo
//   summary.beats = mt.beats
//   self.postMessage({summary: summary})

const recognizer = speechCommands.create('BROWSER_FFT');

await recognizer.ensureModelLoaded();

// Inspect the input shape of the recognizer's underlying tf.Model.
console.log(recognizer.modelInputShape());
// You will get something like [null, 43, 232, 1].
// - The first dimension (null) is an undetermined batch dimension.
// - The second dimension (e.g., 43) is the number of audio frames.
// - The third dimension (e.g., 232) is the number of frequency data points in
//   every frame (i.e., column) of the spectrogram
// - The last dimension (e.g., 1) is fixed at 1. This follows the convention of
//   convolutional neural networks in TensorFlow.js and Keras.

// Inspect the sampling frequency and FFT size:
console.log(recognizer.params().sampleRateHz);
console.log(recognizer.params().fftSize);


const x = tf.tensor4d(
  myDataFinal, [1].concat(recognizer.modelInputShape().slice(1)));
const output = await recognizer.recognize(x);
// output has the same format as `result` in the online streaming example
// above: the `scores` field contains the probabilities of the words.

tf.dispose([x, output]);
self.postMessage({summary: output})

}
