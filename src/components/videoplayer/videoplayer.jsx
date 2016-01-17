"use strict";

class VideoPlayer extends React.Component {

  render() {
    return (
      <div className="video-player">
          <video controls name="video" id="video">
            <source src="assets/sintel_trailer-480.mp4" />              
          </video>
      </div>
    );
  }

}


