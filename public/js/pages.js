/**
 * User: Troy
 * Date: 05/14/13
 * Time: 5:30 AM
 */

var RocknCoder = RocknCoder || {};

(function () {
  "use strict";

  RocknCoder.Pages = RocknCoder.Pages || {};

  RocknCoder.Pages.splash = (function () {
    return {
      pageshow: function () {
        RocknCoder.Game.dims = RocknCoder.Dimensions.get();

        var context, loaderReady,
          timerReady = $.Deferred(),
          imageReady = $.Deferred(),
          sounds = [
            "sounds/83560__nbs-dark__ship-fire.wav",
            "sounds/95078__sandyrb__the-crash.wav",
            "sounds/143611__d-w__weapons-synth-blast-01.wav",
            "sounds/DST-Afternoon.mp3"
          ];

        try {
          // Fix up for prefixing
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          context = new AudioContext();
          console.log('Web Audio API is supported in this browser');
          loaderReady = RocknCoder.loadAudioFiles(context, sounds);
        }
        catch (e) {
          console.log('Web Audio API is NOT supported in this browser');
        }

        RocknCoder.Game.spriteSheet = new Image();
        RocknCoder.Game.spriteSheet.src = "images/1945.png";
        RocknCoder.Game.spriteSheet.onload = function () {
          imageReady.resolve();
        };

        // our timer simply waits until it times out, then sets timerReady to resolve
        setTimeout(function () {
          timerReady.resolve();
        }, 3000);

        // put our load screen up
        $.mobile.loading( 'show', {
          text: "Loading resources...",
          textVisible: true,
          theme: "a"
        });

        $.when(loaderReady, timerReady, imageReady)
          .done(function (loaderResponse) {
            // let's put the data in our global
            RocknCoder.Resources = RocknCoder.Resources || {};
            RocknCoder.Resources.audios = loaderResponse;
          })
          // here you would check to find out what failed
          .fail(function () {
            console.log("An ERROR Occurred")
          })
          // the always method runs whether or not there were errors
          .always(function () {
            $.mobile.loading("hide");
            $.mobile.changePage("#attract");
          });
      },
      pagehide: function () {
      }
    };
  }());

  RocknCoder.Pages.attract = (function () {
    return {
      pageshow: function () {
        var dim = RocknCoder.Dimensions.get(),
          msg = "Width = " + dim.width + ", Height = " + dim.height;
        $("#msg").text(msg);
      },
      pagehide: function () {
      }
    };
  }());

  /* An info page displays some info and the user must tap a button to return to the attract page */
  RocknCoder.Pages.info = (function () {
    return {
      pageshow: function () {
      },
      pagehide: function () {
      }
    };
  }());

  RocknCoder.Pages.play = (function () {
    return {
      pageshow: function () {
        var $grid = $('#grid'),
          grid = $grid.get(0);

        /* adjust the size of the canvas grid */
        RocknCoder.Game.dims = RocknCoder.Dimensions.get();
        $grid.attr({
          width: RocknCoder.Game.dims.width - 2,
          height: RocknCoder.Game.dims.height - 2
        });

        RocknCoder.GameLoop(grid);
      },
      pagebeforeshow: function () {
      },
      pagehide: function () {
        RocknCoder.Game.spriteSheet = null;
        if (RocknCoder.IntervalId) {
          clearInterval(RocknCoder.IntervalId);
        }
      }
    };
  }());
}());

