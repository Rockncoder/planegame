/**
 * User: Troy
 * Date: 11/2/13
 * Time: 4:51 PM
 */


(function () {
  "use strict";

  var context;
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    console.log('Web Audio API is supported in this browser');
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

  loadDogSound("audios/95078__sandyrb__the-crash.wav");




}());