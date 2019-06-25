import anime from 'animejs';

export function translate(element, howFar) {
  // anime({
return  {
    targets: element,
    translateX: [0, howFar],
    loop: true,
    delay: 500,
  direction: 'alternate',
  loop: true
}
  // });
}

export function timelineTranslate(element) {
// Create a timeline with default parameters
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

var step1 = {
  targets: element[0],
  translateX: 250,
}
var step2 = {
  targets: element[1],
  translateX: 250,
}
var step3 = {
  targets: '#alphabet_ई',
  translateX: 250,
}
// Add children
tl
.add(step1)
.add(translate(step3.targets, -50))
.add(step1);

anime(translate(step3.targets, -50))
}



export function rotate(element) {
  anime({
    targets: element,
    translateX: [50, -50],
direction: 'alternate',
loop: true,
delay: function(el, i, l) {
  return i * 100;
},
endDelay: function(el, i, l) {
  return (l - i) * 100;
}
  });
}


export function translate1(element) {
  var updates = 0;
  var myAlphabet = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प",
  "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ॐ"];
  anime({
    targets: element,
    value: ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
    "क", "ख", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प",
    "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ॐ"],
    // easing: 'easeInOutExpo',
    easing: 'steps(53)',
    update: function(anim) {
    updates++;
    console.log(anim)
    console.log(anim.animatables[1].target.innerHTML)
    if(updates < (myAlphabet.length + 2)) {
    anim.animatables[1].target.innerHTML = myAlphabet[updates % myAlphabet.length];
  }
  }
  });
}
