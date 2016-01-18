"use strict";

class VideoTimeline extends React.Component {

  constructor(props) {
    var index = 0, colors = [];
    props.name = props.name || 'videotimeline' + Date.now();
    props.id = props.id || 'videotimeline' + Date.now();
    props.duration = props.duration || 0;
    props.currentTime = props.currentTime || 0;
    props.clips = props.clips || [];
    props.updateEventPrefix = props.updateEventPrefix || props.name;
    props.playEventPrefix = props.playEventPrefix || props.updateEventPrefix;
    props.addMarkerEventPrefix = props.addMarkerEventPrefix || props.updateEventPrefix;
    props.class = props.class ? props.class + ' video-timeline' : 'video-timeline';
    props.containerWidth = props.containerWidth || 555;
    props.markerSize = props.markerSize || 14;
    super(props);  
    this.state = {duration:this.props.duration, currentTime:this.props.currentTime, clips:this.props.clips};
    for(index = 0; index < props.clips.length; index++) {
      colors.push(this.getRandomColor());  
    }
    this.colors = colors;
  }

  getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  createMarker() {
    var newClip = {}, clips = this.state.clips, color;
    newClip.clipStart = event.clipData.start;
    newClip.clipEnd = event.clipData.end;
    newClip.clipSrc = event.clipData.src;
    newClip.clipName = event.clipData.tag;
    newClip.class = 'video-clip';
    clips.push(newClip);
    color = this.getRandomColor();
    this.colors.push(color);
    this.setState({clips:clips});
  }

  progressUpdate(event) {
    var currentTime = event.videoData.currentTime;
    currentTime = Math.floor(currentTime);
    this.setState({currentTime: currentTime});
  }

  navigateMarker(index) {
    var newEvent = {}, clip;
    clip = this.state.clips[index];
    newEvent = new Event(this.props.playEventPrefix + '_videoclip_play');
    newEvent.clipData = { tag: clip.clipName, start: clip.clipStart, end: clip.clipEnd, src: clip.clipSrc, autostart:true, index:clip.index }; 
    document.dispatchEvent(newEvent);
  }

  componentDidMount() {
    document.addEventListener(this.props.updateEventPrefix + '_video_timeupdate' , this.progressUpdate.bind(this));
    document.addEventListener(this.props.addMarkerEventPrefix + '_videoclip_create' , this.createMarker.bind(this));
  }

  renderMarkers() {
    var index, clips, markers, markerStyle, leftPos, color;
    clips = this.state.clips;
    markers = [];
    for(index = 0; index < clips.length; index++) {
      clips[index].index = index;     
      leftPos = clips[index].clipStart / this.props.duration;      
      leftPos *= this.props.containerWidth;
      leftPos = leftPos - (this.props.markerSize * index);
      leftPos += 'px';
      markerStyle = { position: 'relative', left: leftPos, color: this.colors[index] };
      markers.push(
          <span alt={clips[index].clipName} className="glyphicon glyphicon-map-marker" style={markerStyle} onClick={this.navigateMarker.bind(this, index)}></span>
      )
    }

    return markers;
  }

  renderComponents() {
    var progressStyle = {}, progressWidth = 0;
    progressWidth = (this.state.currentTime / this.props.duration) * 100;
    progressStyle.width = progressWidth + '%';
    return (
      <div refs="progress">
        {this.renderMarkers()}
        <div className="progress">
          <div className="progress-bar" role="progressbar" ariaValuenow={this.state.currentTime} ariaValuemin="0" ariaValuemax="100" style={progressStyle}>
            {this.state.currentTime}s
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.class}>
          {this.renderComponents()}
      </div>
    );
  }

}


