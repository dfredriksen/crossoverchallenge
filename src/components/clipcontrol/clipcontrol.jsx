"use strict";

class ClipControl extends React.Component {

  constructor(props) {
    props.name = props.name || 'clipcontrol' + Date.now();
    props.id = props.id || 'clipcontrol' + Date.now();
    props.class = props.class ? props.class + ' clip-control' : 'clip-control';  
    props.maxDuration = props.maxDuration || 0;
    super(props);
    this.state = { tagValue: '', startValue: 0, endValue: 0 };
  }

  createClip(event) {
      var newEvent = {};
      event.preventDefault();
      newEvent = new Event(this.props.name + '_videoclip_create');
      newEvent.clipData = { tag: this.state.tagValue, start: this.state.startValue, end: this.state.endValue, src: this.props.videoSrc }; 
      document.dispatchEvent(newEvent);
      this.setState({ tagValue: '', startValue: 0, endValue: 0 });
  } 

  fieldChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  render() {
    return (
      <div className={this.props.class}>
        <form className="horizontal-form">
          <div className="form-group margin-5-top">
            <label for="{this.props.name + '_tag'}">
              Tag:
            </label>
            <input type="text" name={this.props.name + '_tag'} id={this.props.id + '_tag'} maxlength="50" value={this.state.tagValue} onChange={this.fieldChange('tagValue')} className="form-control" />            
          </div>
          <div className="form-group margin-5-top">
            <label for="{this.props.name + '_start'}">
              Start Time (Seconds):
            </label>
            <input type="number" name={this.props.name + '_start'} id={this.props.id + '_start'} value={this.state.startValue} onChange={this.fieldChange('startValue')} className="form-control" />            
          </div>
          <div className="form-group margin-5-top">
            <label for="{this.props.name + '_end'}">
              End Time (Seconds):
            </label>
            <input type="number" name={this.props.name + '_end'} id={this.props.id + '_end'} max={this.props.maxDuration} value={this.state.endValue} onChange={this.fieldChange('endValue')} className="form-control" />            
          </div>
          <div className="form-group margin-5-top">
            <button className="btn btn-primary" onClick={this.createClip.bind(this)}>Create Clip</button>
          </div>
        </form>
      </div>
    );
  }

}
