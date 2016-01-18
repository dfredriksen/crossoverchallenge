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
    props.message = props.message || false;
    props.filter = props.filter || '';
    super(props);
    this.state = {clips: props.clips, message: props.message, filter: this.props.filter};
  }

  createClip(event) {
    var newClip = {}, clips = this.state.clips;
    newClip.clipStart = event.clipData.start;
    newClip.clipEnd = event.clipData.end;
    newClip.clipSrc = event.clipData.src;
    newClip.clipName = event.clipData.tag;
    newClip.class = 'video-clip';
    clips.push(newClip);
    this.setState({clips:clips, filter:''});
  }

  removeClip(event) {
    var index, clips = this.state.clips;   
    clips.splice(event.clipData.index,1); 
    this.setState({clips:clips});
  }

  videoSelected(event) {
    var index, clips, loopindex;
    clips = this.state.clips;
    index = event.clipData.index;
    if(index > -1 && index < clips.length) {
      for(loopindex = 0; loopindex < clips.length; loopindex++) {
        clips[loopindex].selected = false;
      }

      clips[index].selected = true;
    }

    this.setState({clips:clips});
  }

  selectVideo(next) {
    var selectedIndex = -1, index, clips, selectedClip;
    clips = this.state.clips;
    for(index = 0; index < clips.length; index++) {
      selectedIndex = clips[index].selected ? index : selectedIndex;
      if(selectedIndex > -1) {
        break;
      }
    }

    if(next && selectedIndex < clips.length-1) {
      selectedIndex += 1;
    } else if(!next && selectedIndex > 0) {
      selectedIndex -= 1;
    }
    console.log(selectedIndex);
    selectedClip = clips[selectedIndex];
    var newEvent = {};
    newEvent = new Event(this.props.playEventPrefix + '_videoclip_play');
    newEvent.clipData = { tag: selectedClip.clipName, start: selectedClip.clipStart, end: selectedClip.clipEnd, src: selectedClip.clipSrc, autostart:true, index:selectedIndex }; 
    document.dispatchEvent(newEvent);

  }

  keyEvent(event) {
    var code = event.keyCode;
    //n or N key is pressed for next
    if( code == 78 ) {
       this.selectVideo(true);
    } else if(code == 80) {
       this.selectVideo(false);     
    }
  }

  componentDidMount() {
    document.addEventListener(this.props.createEventPrefix + '_videoclip_create' , this.createClip.bind(this));
    document.addEventListener(this.props.removeEventPrefix + '_videoclip_remove' , this.removeClip.bind(this));
    document.addEventListener(this.props.playEventPrefix + '_videoclip_play' , this.videoSelected.bind(this));
    document.addEventListener(this.props.videoEndEventPrefix + '_video_end' , this.videoEnded.bind(this));
    document.addEventListener('keyup' , this.keyEvent.bind(this));
  }

  videoEnded(event) {
    var newEvent = {}, clip = {}, index, self, timer;
    self = this;
    index = event.videoData.index;
    if(index > -1 && (index < this.state.clips.length - 1)) {
      event.videoData.videoObject.showLoader();
      timer = window.setInterval(function(){
          clearInterval(timer);
          clip = self.state.clips[index+1];
          event.videoData.videoObject.hideLoader();     
          newEvent = new Event(self.props.playEventPrefix + '_videoclip_play');
          newEvent.clipData = { tag: clip.clipName, start: clip.clipStart, end: clip.clipEnd, src: clip.clipSrc, autostart:true, index:index+1 }; 
          document.dispatchEvent(newEvent);

      }, this.props.clipInterval);          
    }
  }

  fieldChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  saveList() {
    var message = {}, clipData;
   
    if(confirm('This will save the current cliplist to your session and erase any previous data you may have saved. Are you sure you want to continue?')) {
      clipData = JSON.stringify(this.state.clips);
      window.localStorage.setItem('clips', clipData);
      message.text = 'Clip list has been saved successfully';
      message.type = 'alert-success';
      this.setState({message:message});
    }
  }

  renderMessage() {
    var text, type, timer, self;
    self = this;
    if(this.state.message) { 
      text = this.state.message.text;
      type = 'margin-5-top alert ' + this.state.message.type;
      timer = window.setInterval(function(){
          clearInterval(timer);
          self.setState({message:false});
      }, 5000);
      return (
        <div className={type}>
          {text}
        </div>
      );
    }
  }

   renderClips() {
    var index = 0, clips = [], clipData;
    for(index = 0; index < this.state.clips.length; index++) {
      clipData = {};
      clipData.name = this.props.name + '_clip' + index;
      clipData.id = this.props.id + '_clip' + index;
      clipData.class = this.state.clips[index].class;
      clipData.clipEnd = this.state.clips[index].clipEnd;
      clipData.clipName = this.state.clips[index].clipName;
      clipData.clipSrc = this.state.clips[index].clipSrc;
      clipData.clipStart = this.state.clips[index].clipStart;     
      clipData.selected = this.state.clips[index].selected || false; 
      clipData.index = index;
      if(this.state.filter != '' && clipData.clipName.indexOf(this.state.filter) < 0) {
        clipData.class = this.state.clips[index].class + ' hide';
      }

       clips.push(
         <li>
          <VideoClip {...clipData} playEventPrefix={this.props.playEventPrefix} editEventPrefix={this.props.editEventPrefix} removeEventPrefix={this.props.removeEventPrefix} allowEdit={this.props.allowEdit} allowRemove={this.props.allowRemove} maxDuration={this.props.maxDuration} />
           <hr className={clipData.class} /> 
         </li>
       );    
    }
    return clips;
   }

  render() {
    return (
      <div className={this.props.class}>
        <div className="video-clip-list-filter">
          <div className="label-container">
            <label>Filter by:</label>
          </div>
          <div className="field-container">
            <input type="text" name={this.props.name + '_filter'} id={this.props.id + '_filter'} value={this.state.filter} onChange={this.fieldChange('filter')} className="form-control" />
          </div>
        </div>
        <ul className="margin-5-top">
          {this.renderClips()}
        </ul>
        <div className="video-clip-list-controls">
          <button className="btn btn-primary" onClick={this.saveList.bind(this)}>Save</button>
        </div>
        {this.renderMessage()}
      </div>
    );
  }

}


