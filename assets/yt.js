$(function () {
    var iframeUrl = 'https://www.youtube.com/iframe_api'
    $('button').click(function(){
        $.getScript(iframeUrl);
    });    
});

var player;
var states;
function onYouTubeIframeAPIReady() {
    states = Object.keys(YT.PlayerState)
        .reduce((carrier, key) => 
            Object.assign(carrier, { [YT.PlayerState[key]] : { key, value: YT.PlayerState[key] } }), {});
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'nl5dlbCh8lY',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        cc_load_policy: 1,
        cc_lang_pref: 'en'
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    player.playVideo();
    let iframe = $('#player')[0];
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
    }
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    let state = event.data;
    let status = states[state];
    console.log('PlayerState:', status.key, 'value:', status.value);
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     // setTimeout(stopVideo, 6000);
        
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}