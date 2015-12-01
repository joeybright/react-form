
// components/TextInput.jsx
var React = require('react')
var InputError = require('./InputError.jsx')

var Input = React.createClass({
  getDefaultProps: function() {
    return {
      type: "text",
      errorMessage: "",
      hasError: false
    }
  },
  // Set the initial errorMessage state to "" (no error)
  getInitialState: function() {
    return {errorMessage: ""}
  },
  // Handles onChange event
  handleChange: function(e) {
    this.checkInput(e);
    if(this.props.onChangeFunc) {
      this.props.onChangeFunc(e);
    }
  },
  // Handles onBlur event
  handleBlur: function(e) {
    this.checkInput(e);
    if(this.props.onBlurFunc) {
        this.props.onBlurFunc(e);
    }
  },
  // Handles onFocus event
  handleFocus: function(e) {
    this.checkInput(e);
    if(this.props.onFocusFunc) {
        this.props.onFocusFunc(e);
    }
  },
  // Run when any changes happen to the input
  checkInput: function(e) {
    // Resets the error state
    this.setState({errorMessage: ""});
    this.setState({hasError: false});
    // Checks to see:
    if(
    // if the input is required
    this.props.isRequired === "true" &&
    // and if the value is blank ("")
    e.target.value === "" &&
    e.type !== "focus" ) {
      // Creates an error message based off of the label
      var errorMessage = this.props.label + " is a required field!";
      // TODO: If there isn't a label, has a default message
      // Sets the error message and state
      this.setState({errorMessage: errorMessage});
      this.setState({hasError: true});
    }
    //
    if(this.props.onBlurFunc) {
      this.props.onBlurFunc();
    }
  },
  displayLabel: function() {
    if(this.props.label) {
      var label = this.props.label;
      if(this.props.isRequired) {
        var label = label + "*"
      }
      return (
        <span className="w100p ts-small tc-gray mb5 display-block">{label}</span>
      )
    }
  },
  displayError: function() {
    if(this.props.errorMessage) {
      return ( <InputError errorMessage={this.props.errorMessage} /> )
    }
    if (this.state.errorMessage) {
      return ( <InputError errorMessage={this.state.errorMessage} /> )
    }
  },
  render: function () {
    return (
      <label className="display-block">
        {this.displayLabel()}
        <input
          className="w100p p15 mb5"
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}>
        </input>
        {this.displayError()}
      </label>
    )
  }
});

module.exports = Input
