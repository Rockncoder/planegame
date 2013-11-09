/**
 * User: Troy
 * Date: 11/2/13
 * Time: 4:51 PM
 */

var RocknCoder = RocknCoder || {};

(function () {
  "use strict";

  RocknCoder.playAudio = function(context, buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
  };


  RocknCoder.playSoundFx = function(bufferIndex) {
    RocknCoder.playAudio(RocknCoder.context, RocknCoder.Resources.audios[bufferIndex]);
  };
}());