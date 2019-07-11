import anime from 'animejs';



export function translate(element, howFar) {
  // anime({
return  {
    targets: element,
    loop: true,
    direction: 'alternate',
    duration: 1000,
    translateX: function(el, i, l){
      return howFar[i]
    }
}
  // });
}



export function rotate(element) {
  // anime(
return    {
    targets: element,
    translateX: [-5, 5],
    loop: true,
    direction: 'alternate',
    duration: 500
// delay: function(el, i, l) {
//   return i * 100;
// },
// endDelay: function(el, i, l) {
//   return (l - i) * 100;
// }
  }

// );
}

export function timelineTranslate(self) {
// let height = self.computeMyHeight
// let width = self.computeMyWidth

// Create a timeline with default parameters
// var tl = anime.timeline({
//   easing: 'easeOutExpo',
// });
//
// var step1 = {
//   targets: element[0],
//   translateX: width,
// }
// var step2 = {
//   targets: element[1],
//   translateX: -width,
// }
// var step3 = {
//   targets: element[2],
//   translateX: 250,
// }
// Add children
// tl
// .add(translate([step1.targets, step2.targets], [width, -width]))
// .add(rotate(step3.targets))
// .add(translate(step1.targets, width))
// .add(translate(step2.targets, -width), '-=5000')
// .add(rotate(step3.targets))
// .add(translate([step1.targets, step2.targets], [width, -width]))

// .add(translate(step3.targets, -50))
// .add(step1);

// anime(translate(step3.targets, -50))
// anime(translate(step1.targets, width))
// anime(translate(step2.targets, -width))
// anime(translate([step1.targets, step2.targets], [width, -width]))
// document.querySelector('#myTextPanel').innerHTML = "something"
// setTimeout( function(){
//   anime(rotate(step3.targets))
//   document.querySelector('#myTextPanel').innerHTML = "nothing"
// },
// 5000)
var animationPointer = []
animationPointer[0] = anime({
  targets: ['#alphabet_a', '#alphabet_ā'],
  loop: true,
  direction: 'alternate',
  duration: 1000,
  autoplay: false,
  translateX: function(el, i, l){
    console.log(self.computeMyWidth, i)
    return i===0 ? self.computeMyWidth : -self.computeMyWidth
  }
});

animationPointer[1] = anime({
  targets: ['#alphabet_i', '#alphabet_e'],
  loop: true,
  direction: 'alternate',
  duration: 1000,
  autoplay: false,
  translateX: function(el, i, l){

    return i===0 ? self.computeMyWidth : -self.computeMyWidth
  }
});

return animationPointer
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
