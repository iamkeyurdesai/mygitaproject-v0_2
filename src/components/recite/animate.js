import anime from 'animejs';

export function timelineTranslate(self) {

var updates = 0;
var myAlphabet = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प",
  "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ॐ"];
var animationPointer = []

animationPointer[0] = anime({
  targets: ['#alphabet_a', '#alphabet_ā'],
  loop: true,
  direction: 'alternate',
  duration: 1000,
  autoplay: false,
  translateX: function(el, i, l){
    return i===0 ? self.computeMyWidth : -self.computeMyWidth
  }
});

animationPointer[1] = anime({
  targets: ['#alphabet_i', '#alphabet_ī'],
  loop: true,
  direction: 'normal',
  duration: 1000,
  autoplay: false,
  easing: 'linear',
  rotate: function(el, i, l){ return i===0 ? '1turn' : '2turn'},
  translateX: function(el, i, l){ return i===0 ? 0 : (Math.random()*20 - 2)},
  translateY: function(el, i, l){ return i===0 ? 0 : (Math.random()*20 - 2)}
});

var myX = [-self.computeMyWidth/4, self.computeMyWidth/4, self.computeMyWidth/4, -self.computeMyWidth/4]
var myY = [0, 0, -self.computeMyHeight, -self.computeMyHeight]
animationPointer[2] = anime({
  targets: ['#alphabet_ṛ', '#alphabet_ṝ', '#alphabet_ḷ', '#alphabet_ḹ'],
  loop: true,
  direction: 'alternate',
  duration: 1000,
  autoplay: false,
  easing: 'spring(1, 80, 10, 0)',
  translateX: function(el, i, l){
    return myX[i]
  },
  translateY: function(el, i, l){
    return myY[i]
  }
});

animationPointer[3] = anime({
  targets: ['#alphabet_au', '#alphabet_ai'],
  value: myAlphabet,
  loop: true,
  direction: 'alternate',
  easing: 'steps(5)',
  autoplay: false,
  duration: 50000,
  update: function(anim) {
  updates++;
  anim.animatables[0].target.innerHTML = myAlphabet[updates % myAlphabet.length];
}
});

return animationPointer
}
