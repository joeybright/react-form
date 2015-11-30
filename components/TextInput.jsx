
// components/TextInput.jsx
var React = require('react')

var TextInput = React.createClass({
  getDefaultProps: function() {
    return {type: "text"}
  },
  getInitialState: function() {
    return {errorMessage: ""}
  },
  currentError: function() {
    if(this.props.errorMessage) {
      return (
        <span className="w100p ts-small tc-red mb10">{this.props.errorMessage}</span>
      )
    }
    if(this.state.errorMessage) {
      return (
        <span className="w100p ts-small tc-red mb10">{this.state.errorMessage}</span>
      )
    }
  },
  checkForRequired: function(e) {
    if(this.props.onBlurEvent) {
      return this.props.onBlurEvent();
    }
    if(this.props.isRequired === "true" && e.target.value === "") {
      var errorMessage = this.props.label + " is a required field!";
      this.setState({errorMessage: errorMessage});
    }
  },
  render: function () {
    return (
      <label className="display-block">
        <span className="w100p ts-small tc-gray mb5 display-block">{this.props.label}</span>
        <input className="w100p p15 mb5" type={this.props.type} onBlur={this.checkForRequired} {...this.props}></input>
        {this.currentError()}
      </label>
    )
  }
});

module.exports = TextInput
