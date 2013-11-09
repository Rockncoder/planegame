/**
 * User: Troy
 * Date: 11/4/13
 * Time: 4:24 AM
 */


var RocknCoder = RocknCoder || {};

(function () {
  "use strict";

  /*
   The loadAudioFiles method uses jQuery deferred object,
   but not its ajax loader since it doesn't support binary data (arraybuffer)
   once it has loaded all of the audio files, it will resolve() itself and
   pass the audio data to the done method
   */
  RocknCoder.loadAudioFiles = function(context, urlList) {
    var myDeferred = $.Deferred(),
      len = urlList.length,
      bufferList = [],
      loadBuffer = function (urls, index) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();

        request.open("GET", urls[index], true);
        request.responseType = "arraybuffer";
        request.onload = function () {
          // Asynchronously decode the audio file data in request.response
          context.decodeAudioData(
            request.response,
            function (buffer) {
              if (!buffer) {
                myDeferred.reject('error decoding file data: ' + urls[index]);
              } else {
                bufferList.push(buffer);
                if (++index === len) {
                  myDeferred.resolve(bufferList);
                } else {
                  loadBuffer(urls, index);
                }
              }
            },
            function (error) {
              myDeferred.reject('decodeAudioData error', error);
            }
          );
        }
        // if there is some kind of loading error come here
        request.onerror = function () {
          myDeferred.reject('unknown error occurred');
        }

        // begin the download
        request.send();
      };

    loadBuffer(urlList, 0);
    return myDeferred;
  };
}());
