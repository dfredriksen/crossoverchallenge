"use strict";

class VideoClipList extends React.Component {

  constructor(props) {
    props.name = props.name || 'videocliplist' + Date.now();
    props.id = props.id || 'videocliplist' + Date.now();
    props.class = props.class ? props.class + ' video-clip-list' : 'video-clip-list';
    props.clips = props.clips || []; 
    props.createEventPrefix = props.createEventPrefix || 'clip';
    props.playEventPrefix = props.playEventPrefix || props.name;
    props.editEventPrefix = props.editEventPrefix || props.name;
    props.removeEventPrefix = props.removeEventPrefix || props.name;
    props.videoEndEventPrefix = props.videoEndEventPrefix || props.playEventPrefix;
    props.allowEdit = props.allowEdit || true;
    props.allowRemove = props.allowRemove || true;
    props.maxDuration = props.maxDuration || 0;
    props.clipInterval = props.clipInterval || 3000;
    super(props);
    this.state = {clips: props.clips};
  }

  createClip(event) {
    var newClip = {}, clips = this.state.clips;
    newClip.clipStart = event.clipData.start;
    newClip.clipEnd = event.clipData.end;
    newClip.clipSrc = event.clipData.src;
    newClip.clipName = event.clipData.tag;
    newClip.class = 'video-clip';
    clips.push(newClip);
    this.setState({clips:clips});
  }

  removeClip(event) {
    var index, clips = this.state.clips;   
    clips.splice(event.clipData.index,1); 
    this.setState({clips:clips});
  }

  componentDidMount() {
    document.addEventListener(this.props.createEventPrefix + '_videoclip_create' , this.createClip.bind(this));
    document.addEventListener(this.props.removeEventPrefix + '_videoclip_remove' , this.removeClip.bind(this));
    document.addEventListener(this.props.videoEndEventPrefix + '_video_end' , this.videoEnded.bind(this));

  }

  videoEnded(event) {
    var newEvent = {}, clip = {}, index, self, timer;
    self = this;
    index = event.videoData.index;
    if(index < this.state.clips.length - 1) {
      timer = window.setInterval(function(){
          clearInterval(timer);
          clip = self.state.clips[index+1];
          newEvent = new Event(self.props.playEventPrefix + '_videoclip_play');
          newEvent.clipData = { tag: clip.clipName, start: clip.clipStart, end: clip.clipEnd, src: clip.clipSrc, autostart:true, index:index+1 }; 
          document.dispatchEvent(newEvent);

      }, this.props.clipInterval);          
    }
  }

  renderClips() {
    var index = 0, clips = [];
    for(index = 0; index < this.state.clips.length; index++) {
      this.state.clips[index].name = this.props.name + '_clip' + index;
      this.state.clips[index].id = this.props.id + '_clip' + index;
      clips.push(
        <li>
          <VideoClip {...this.state.clips[index]} playEventPrefix={this.props.playEventPrefix} editEventPrefix={this.props.editEventPrefix} removeEventPrefix={this.props.removeEventPrefix} allowEdit={this.props.allowEdit} allowRemove={this.props.allowRemove} index={index} maxDuration={this.props.maxDuration} />
          <hr /> 
        </li>
      );
    }

    return clips;
  }

  render() {
    return (
      <div className={this.props.class}>
        <ul>
          {this.renderClips()}
        </ul>
      </div>
    );
  }

}


