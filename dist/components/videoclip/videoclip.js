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
    props.index = props.index || 0;
    props.initialEditMode = props.initialEditMode || false;
    props.maxDuration = props.maxDuration || 0;
    super(props);
    this.state = {
      editMode: props.initialEditMode,
      clipStart: props.clipStart,
      clipEnd: props.clipEnd,
      clipName: props.clipName
    };
  }

  playClip() {
    var newEvent = {};
    newEvent = new Event(this.props.playEventPrefix + '_videoclip_play');
    newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, autostart: true };
    document.dispatchEvent(newEvent);
  }

  editClip() {
    this.setState({ editMode: !this.state.editMode });
    if (this.state.editMode) {
      var newEvent = {};
      newEvent = new Event(this.props.name + '_videoclip_play');
      newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, autostart: false };
      document.dispatchEvent(newEvent);
    }
  }

  removeClip() {
    var newEvent = {};
    if (confirm('Are you sure you want to delete this clip? This cannot be undone.')) {
      newEvent = new Event(this.props.removeEventPrefix + '_videoclip_remove');
      newEvent.clipData = { tag: this.state.clipName, start: this.state.clipStart, end: this.state.clipEnd, src: this.props.clipSrc, index: this.props.index };
      document.dispatchEvent(newEvent);
    }
  }

  renderPlayButton() {
    if (!this.state.editMode) {
      return React.createElement('span', { className: 'glyphicon glyphicon-play', alt: 'Play clip', onClick: this.playClip.bind(this) });
    }
  }

  renderEditButton() {
    var altText;
    if (this.props.allowEdit) {
      altText == this.state.editMode ? 'Save clip' : 'Edit clip';
      return React.createElement('span', { className: 'glyphicon glyphicon-pencil', alt: altText, onClick: this.editClip.bind(this) });
    }
  }

  renderRemoveButton() {
    if (this.props.allowRemove && !this.state.editMode) {
      return React.createElement('span', { className: 'glyphicon glyphicon-remove', alt: 'Delete clip', onClick: this.removeClip.bind(this) });
    }
  }

  renderClipName() {
    if (this.state.editMode) {
      return React.createElement('input', { type: 'text', name: this.props.name + '_name_field', id: this.props.id + '_name_field', maxlength: '50', value: this.state.clipName, onChange: this.fieldChange('clipName') });
    } else {
      return React.createElement(
        'p',
        null,
        this.state.clipName
      );
    }
  }

  renderClipData() {
    if (this.state.editMode) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            null,
            'Start'
          ),
          React.createElement('input', { type: 'number', name: this.props.name + '_start_field', id: this.props.id + '_start_field', max: this.props.maxDuration, value: this.state.clipStart, onChange: this.fieldChange('clipStart') })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            null,
            'End'
          ),
          React.createElement('input', { type: 'number', name: this.props.name + '_end_field', id: this.props.id + '_end_field', max: this.props.maxDuration, value: this.state.clipEnd, onChange: this.fieldChange('clipEnd') })
        )
      );
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          { 'class': 'start-time' },
          'Start: ',
          this.state.clipStart,
          's'
        ),
        ' ',
        React.createElement(
          'span',
          { 'class': 'end-time' },
          'End: ',
          this.state.clipEnd,
          's'
        )
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
    return React.createElement(
      'div',
      { className: this.props.class },
      React.createElement(
        'div',
        { className: 'thumb' },
        React.createElement(VideoPlayer, { videoSrc: this.props.clipSrc, playEventPrefix: this.props.name, videoStart: this.state.clipStart, videoEnd: this.state.clipEnd, controls: this.props.videoControls, name: this.props.name + '_video', id: this.props.id + '_video' }),
        React.createElement('input', { type: 'hidden', value: this.props.index, name: this.props.name + '_index', id: this.props.id + '_index' }),
        React.createElement('input', { type: 'hidden', value: this.state.clipStart, name: this.props.name + '_clipStart', id: this.props.id + '_clipStart' }),
        React.createElement('input', { type: 'hidden', value: this.state.clipEnd, name: this.props.name + '_clipEnd', id: this.props.id + '_clipEnd' })
      ),
      React.createElement(
        'div',
        { className: 'content' },
        this.renderClipName(),
        this.renderClipData()
      ),
      React.createElement(
        'div',
        { className: 'action' },
        this.renderPlayButton(),
        this.renderEditButton(),
        this.renderRemoveButton()
      )
    );
  }

}