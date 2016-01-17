"use strict";

$(document).ready(function() {
  var $videoplayer, index = 0;

  $videoplayer = $('.react-video-player');

  if($videoplayer.length > 0 && VideoPlayer) {
    for(index; index < $videoplayer.length; index++) {
      ReactDOM.render(
        <VideoPlayer />,
        $videoplayer[index]
      )
    }
  }
});

