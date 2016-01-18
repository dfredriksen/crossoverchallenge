"use strict";

class VideoClip extends React.Component {

  constructor(props) {
    props.name = props.name || 'videoclip' + Date.now();
    props.id = props.id || 'videoclip' + Date.now();
    props.clipStart = props.clipStart || 0;
    props.clipEnd = props.clipEnd || 0;
    props.clipSrc = props.clipSrc || '';
    props.clipName = props.clipName || props.name;
    props.videoControls = props.videoControls || false;
    props.playEventPrefix = props.playEventPrefix || props.name;
    props.editEventPrefix = props.editEventPrefix || props.name;
    props.removeEventPrefix = props.removeEventPrefix || props.name;
    props.allowEdit = props.allowEdit || false;
    props.allowRemove = props.allowRemove || false;
    props.index = typeof props.index !== 'undefined' ? props.index : -1;
    props.initialEditMode = props.initialEditMode || false;
    props.maxDuration = props.maxDuration || 0;
    props.selected = props.selected || false;
    super(props);
    this.state = {
      editMode:props.initialEditMode, 
      clipStart: props.clipStart,
      clipEnd: props.clipEnd,
      clipName: props.clipName
    };
  }

  playClip() {
    var newEvent = {};
    newEvent = new Event(this.props.playEventPrefix + '_videoclip_play');
    newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, autostart:true, index:this.props.index }; 
    document.dispatchEvent(newEvent);
  }

  editClip() {
    this.setState({editMode: !this.state.editMode});
    if( this.state.editMode ) {
      var newEvent = {};
      newEvent = new Event(this.props.name + '_videoclip_play');
      newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, autostart:false }; 
      document.dispatchEvent(newEvent);
    }
  }

  removeClip() {
    var newEvent = {};
    if( confirm('Are you sure you want to delete this clip? This cannot be undone.') ) {
      newEvent = new Event(this.props.removeEventPrefix + '_videoclip_remove');
      newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, index: this.props.index }; 
      document.dispatchEvent(newEvent);
    }
  }

  renderPlayButton() {
    if( !this.state.editMode ) {
      return( 
        <span className="glyphicon glyphicon-play" alt="Play clip" onClick={this.playClip.bind(this)}></span>
      );
    }
  }

  renderEditButton() {
    var altText;
    if( this.props.allowEdit) {
      altText == this.state.editMode ? 'Save clip' : 'Edit clip';
      return (
        <span className="glyphicon glyphicon-pencil" alt={altText} onClick={this.editClip.bind(this)}></span>
     );
    }
  }

  renderRemoveButton() {
    if( this.props.allowRemove && !this.state.editMode ) {
      return (
        <span className="glyphicon glyphicon-remove" alt="Delete clip" onClick={this.removeClip.bind(this)}></span>
      );
    }
  }

  renderClipName() {
    if( this.state.editMode ) {
        return (
          <input type="text" name={this.props.name + '_name_field'} id={this.props.id + '_name_field'} maxlength="50" value={this.state.clipName} onChange={this.fieldChange('clipName')} />
        );
    } else {
      return (
        <p>{this.state.clipName}</p>        
      );
    }
  }

  renderClipData() {
    if( this.state.editMode ) {
      return (
        <div>
          <div>
            <label>Start</label>
            <input type="number" name={this.props.name + '_start_field'} id={this.props.id + '_start_field'} max={this.props.maxDuration} value={this.state.clipStart} onChange={this.fieldChange('clipStart')} />
          </div>
          <div>
            <label>End</label>
            <input type="number" name={this.props.name + '_end_field'} id={this.props.id + '_end_field'} max={this.props.maxDuration} value={this.state.clipEnd} onChange={this.fieldChange('clipEnd')} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span class="start-time">Start: {this.state.clipStart}s</span> <span class="end-time">End: {this.state.clipEnd}s</span>
        </div>
      );
    }
  }

  fieldChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }


  render() {
    this.props.class = this.props.class ? this.props.class + ' video-clip' : 'video-clip';
    this.props.class = this.props.selected ? this.props.class + ' selected' : this.props.class;  
    return (
      <div className={this.props.class}>
        <div className="thumb">
          <VideoPlayer videoSrc={this.props.clipSrc} playEventPrefix={this.props.name} videoStart={this.state.clipStart} videoEnd={this.state.clipEnd} controls={this.props.videoControls} name={this.props.name + '_video'} id={this.props.id + '_video'} index={this.props.index} /> 
          <input type="hidden" value={this.props.index} name={this.props.name + '_index'} id={this.props.id + '_index'} />
          <input type="hidden" value={this.state.clipStart} name={this.props.name + '_clipStart'} id={this.props.id + '_clipStart'} />
          <input type="hidden" value={this.state.clipEnd} name={this.props.name + '_clipEnd'} id={this.props.id + '_clipEnd'} />
        </div>
        <div className="content">
          {this.renderClipName()}
          {this.renderClipData()}          
        </div> 
        <div className="action">
          {this.renderPlayButton()}
          {this.renderEditButton()}
          {this.renderRemoveButton()}
        </div>
      </div>
    );
  }

}


