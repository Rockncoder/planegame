/**
 * User: Troy
 * Date: 11/2/13
 * Time: 4:51 PM
 */

var RocknCoder = RocknCoder || {};

(function () {
  "use strict";

  var context,
    sounds = [
      "sounds/83560__nbs-dark__ship-fire.wav",
      "sounds/95078__sandyrb__the-crash.wav",
      "sounds/143611__d-w__weapons-synth-blast-01.wav",
      "sounds/DST-Afternoon.mp3"
    ],
    bufferLoader;

  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    console.log('Web Audio API is supported in this browser');
    bufferLoader = new BufferLoader(context, sounds, finishedLoading);
  }
  catch (e) {
    console.log('Web Audio API is NOT supported in this browser');
  }


  var dogBarkingBuffer = null;
// Fix up prefixing
//  window.AudioContext = window.AudioContext || window.webkitAudioContext;
//  var context = new AudioContext();

  function onError (){

  }

  function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
      context.decodeAudioData(request.response, function (buffer) {
        dogBarkingBuffer = buffer;
        playSound(dogBarkingBuffer);
      }, onError);
    }
    request.send();
  }

  function playSound(buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
    // note: on older systems, may have to use deprecated noteOn(time);
  }

  function finishedLoading(bufferList) {
    debugger;
    // Create two sources and play them both together.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(context.destination);
    source2.connect(context.destination);
    source1.start(0);
    source2.start(0);
  }

  loadDogSound("sounds/95078__sandyrb__the-crash.wav");

}());