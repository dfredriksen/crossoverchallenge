"use strict";

$(document).ready(function() {
  var 
    $videoplayer, 
    $videoclip,
    $videocliplist,
    $clipcontrol,
    $videotimeline,
    $video,
    props,
    duration,
    timer,
    index = 0;

  $videoplayer = $('.react-video-player');
  $videoclip = $('.react-video-clip');
  $videocliplist = $('.react-video-clip-list');
  $clipcontrol = $('.react-clip-control');
  $videotimeline = $('.react-video-timeline');

  if($videoplayer.length > 0 && VideoPlayer) {
    props = $videoplayer.data('props');    

    ReactDOM.render(
      <VideoPlayer {...props} />,
      $videoplayer[0]
    )

    timer = window.setInterval(function(){
      $video  = $videoplayer.find('video').get(0);
      if($video.readyState > 0) {
        var duration = $video.duration;
        clearInterval(timer);
        props.videoEnd = duration;

        if($videoclip.length > 0 && VideoClip) {
            props = $videoclip.data('props');
            props.clipStart = 0;
            props.clipEnd = duration;
            ReactDOM.render(
              <VideoClip {...props} />,
              $videoclip[0]
            )
        }

        if($clipcontrol.length > 0 && ClipControl) {
          props = $clipcontrol.data('props');   
          props.maxDuration = duration; 
          ReactDOM.render(
            <ClipControl {...props} />,
            $clipcontrol[0]
          );
        }

        if($videocliplist.length > 0 && VideoClipList) {
          var savedClips = window.localStorage.getItem('clips') || [];
          props = $videocliplist.data('props');   
          props.clips = JSON.parse(savedClips);
          props.maxDuration = duration;
          ReactDOM.render(
            <VideoClipList {...props} />,
            $videocliplist[0]
          );
        }

        if($videotimeline.length > 0 && VideoTimeline) {
          var savedClips = window.localStorage.getItem('clips') || [];
          var containerWidth = $videotimeline.width();          
          props = $videotimeline.data('props');   
          props.clips = JSON.parse(savedClips);
          props.containerWidth = containerWidth;
          props.duration = duration;
          ReactDOM.render(
            <VideoTimeline {...props} />,
            $videotimeline[0]
          );         
        }

      }
    }, 500);

  }
});

