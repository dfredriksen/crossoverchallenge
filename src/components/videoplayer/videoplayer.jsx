"use strict";

class VideoPlayer extends React.Component {

  constructor(props) {
    props.name = props.name || 'video' + Date.now();
    props.id = props.id || 'video' + Date.now();
    props.controls = typeof props.controls === 'undefined' ? true : props.controls;
    props.playEventPrefix = props.playEventPrefix || props.name;
    props.listenToEvents = props.listenToEvents || true;
    props.videoSrc = props.videoSrc || '';
    props.videoStart = props.videoStart || 0;
    props.videoEnd = props.videoEnd || 0;
    super(props);  
    props.videoSrc = this.prepareVideoSource(props.videoSrc, props.videoStart, props.videoEnd);
    this.state = {videoSrc:props.videoSrc};
  }

  playClip(event) {
    var videoSrc, end, start, timer, timercounter, self;
    self = this;
    end = event.clipData.end;
    start = event.clipData.start;
    videoSrc = event.clipData.src;
    videoSrc = this.prepareVideoSource(videoSrc, start, end);
    this.setState({videoSrc:videoSrc});
    this.refs.video.src = videoSrc;
    console.log('I caught the ' + this.props.playEventPrefix + ' event');
    if( event.clipData.autostart ) {
      timer = window.setInterval(function(){      
        timercounter++;
        if(self.refs.video.readyState == 4) {
          clearInterval(timer);
          self.refs.video.play();
        }
        else if(timercounter > 100) {
          clearInterval(timer);
        }
      }, 500);
    }
    this.refs.video.play;
  }

  prepareVideoSource(source,start,end)
  {
    var videoSrc = source;
    videoSrc = videoSrc + '#t=' || '';
    videoSrc = start ? videoSrc + start : videoSrc + '0';
    videoSrc = end ? videoSrc + ',' + end : videoSrc;    
    return videoSrc;
  }

  componentDidMount() {
    document.addEventListener(this.props.playEventPrefix + '_videoclip_play' , this.playClip.bind(this));
  }

  render() {
    this.props.class = this.props.class ? this.props.class + ' video-player' : 'video-player';
    return (
      <div className={this.props.class}>
          <video ref="video" name={this.props.name} id={this.props.id} controls={this.props.controls}>
            <source src={this.state.videoSrc} />              
          </video>
      </div>
    );
  }

}


