// function prettyLog(str) {
//     console.log('%c ' + str, 'color: green; font-weight: bold;');
// }

$(function () {
    var counter = 0;
    var voyager = $('#voyager');
    var sagan = $('#sagan');
    var dot = $('#dot');
    
    var displayImage = function(counter) {
        if(counter === 17) {
            voyager.fadeOut(500, function() {
                sagan.fadeIn(500);
            });
            return;
        }
        if(counter == 68) {
            sagan.fadeOut(500, function(){
                dot.fadeIn(500);
            })
        }
    };

    var prettyLog = function (str) {
        counter++;
        console.log('%c ' + `${str}:${counter}`, 'color: green; font-weight: bold;');
        displayImage(counter);
    };

    

    

    var typed = new Typed('#typed-text', {
        stringsElement: '#my-strings',
        typeSpeed: 0,
        backSpeed: 0,
        startDelay: 1000,
        loop: false,
        loopCount: Infinity,
        onBegin: function (self) { prettyLog('onBegin ' + self) },
        onComplete: function (self) { prettyLog('onCmplete ' + self) },
        preStringTyped: function (pos, self) { prettyLog('preStringTyped ' + pos + ' ' + self); },
        onStringTyped: function (pos, self) { prettyLog('onStringTyped ' + pos + ' ' + self) },
        onLastStringBackspaced: function (self) { prettyLog('onLastStringBackspaced ' + self) },
        onTypingPaused: function (pos, self) { prettyLog('onTypingPaused ' + pos + ' ' + self) },
        onTypingResumed: function (pos, self) { prettyLog('onTypingResumed ' + pos + ' ' + self) },
        onReset: function (self) { prettyLog('onReset ' + self) },
        onStop: function (pos, self) { prettyLog('onStop ' + pos + ' ' + self) },
        onStart: function (pos, self) { prettyLog('onStart ' + pos + ' ' + self) },
        onDestroy: function (self) { prettyLog('onDestroy ' + self) }
    });
});

