"use strict";

$(document).ready(function () {
  var $videoplayer,
      $videoclip,
      $videocliplist,
      $clipcontrol,
      $video,
      props,
      duration,
      timer,
      index = 0;

  $videoplayer = $('.react-video-player');
  $videoclip = $('.react-video-clip');
  $videocliplist = $('.react-video-clip-list');
  $clipcontrol = $('.react-clip-control');

  if ($videoplayer.length > 0 && VideoPlayer) {
    props = $videoplayer.data('props');

    ReactDOM.render(React.createElement(VideoPlayer, props), $videoplayer[0]);

    timer = window.setInterval(function () {
      $video = $videoplayer.find('video').get(0);
      if ($video.readyState > 0) {
        var duration = $video.duration;
        clearInterval(timer);
        props.videoEnd = duration;

        if ($videoclip.length > 0 && VideoClip) {
          props = $videoclip.data('props');
          props.clipStart = 0;
          props.clipEnd = duration;
          ReactDOM.render(React.createElement(VideoClip, props), $videoclip[0]);
        }

        if ($clipcontrol.length > 0 && ClipControl) {
          props = $clipcontrol.data('props');
          props.maxDuration = duration;
          ReactDOM.render(React.createElement(ClipControl, props), $clipcontrol[0]);
        }

        if ($videocliplist.length > 0 && VideoClipList) {
          props = $videocliplist.data('props');
          props.maxDuration = duration;
          ReactDOM.render(React.createElement(VideoClipList, props), $videocliplist[0]);
        }
      }
    }, 500);
  }
});