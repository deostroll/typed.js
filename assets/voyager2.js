// function prettyLog(str) {
//     console.log('%c ' + str, 'color: green; font-weight: bold;');
// }

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log('Player ready');
    event.target.playVideo();
}
var done = false;
var playCounter = {};
function onPlayerStateChange(event) {
    var code = event.data;
    console.log('code:', code);
    playCounter['current'] = code;
    var count = playCounter[code];
    if(typeof count !== 'undefined') {
        playCounter[code]++;
    }
    else {
        playCounter[code] = 0;
    }
    runCounterLogic();
}

function runCounterLogic() {
    console.log(playCounter);
    let current = playCounter.current;
    if(playCounter.current === -1 && playCounter[current] === 1) {
        
        setTimeout(() => {
            console.log('Actual video playing...');
            player.playVideo()
        }, 1000);
    }
}
function stopVideo() {
    player.stopVideo();
}

$(function () {
    var counter = 0;
    var voyager = $('#voyager');
    var sagan = $('#sagan');
    var dot = $('#dot');
    var container1 = $('#container1');
    var container2 = $('#container2').hide();
    var slideshow = $('.img-slideshow');

    var fixContainer1 = function() {
        var height = window.innerHeight;
        // container1.height(height);
        slideshow.height(height-10);
    };

    $(window).load(fixContainer1);
    $(window).resize(fixContainer1);


    var displayImage = function(counter) {
        if(counter === 3) {
            voyager.fadeIn(1000);
            return;
        }
        if(counter === 17) {
            voyager.fadeOut(500, function() {
                sagan.fadeIn(500);
            });
            return;
        }
        if(counter === 68) {
            sagan.fadeOut(500, function(){
                dot.fadeIn(500);
            })
        }
        if(counter === 74) {
            setTimeout(function() {                
                $(window).trigger('typed-show-over');
            }, 5000);
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
        startDelay: 3000,
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

    $(window).bind('typed-show-over', function() {
        container1.hide();
        container2.show();
        $.getScript('https://www.youtube.com/iframe_api');
    });
});

