
// components/TextInput.jsx
var React = require('react')
var InputError = require('./InputError.jsx')
var InputLabel = require('./InputLabel.jsx')

var inputContainerStyles = {
  margin: "10px 0"
}
var inputStyles = {
  width: "100%",
  padding: "15px",
  fontSize: "16px",
  marginBottom: "5px"
}

var hasEnteredInput = false;
var errorMessage;

var Input = React.createClass({
  getDefaultProps: function() {
    return {
      type: "text",
      errorMessage: ""
    }
  },
  // Set the initial errorMessage state to "" (no error)
  getInitialState: function() {
    return {
      errorMessage: "",
      hasError: false
    }
  },
  // Handles onChange event
  handleChange: function(e) {
    // console.log('Change: ', e.target.value);
    this.checkInput(e);
    if(this.props.onChangeFunc) {
      this.props.onChangeFunc(e);
    }
  },
  // Handles onBlur event
  handleBlur: function(e) {
    // console.log('Blur: ', e.target.value);
    this.checkInput(e);
    if(this.props.onBlurFunc) {
      this.props.onBlurFunc(e);
    }
  },
  // Handles onFocus event
  handleFocus: function(e) {
    // console.log('Focus: ', e.target.value);
    this.checkInput(e);
    if(this.props.onFocusFunc) {
      this.props.onFocusFunc(e);
    }
  },
  // Run when any changes happen to the input
  checkInput: function(e) {
    if(this.props.isRequired === "true" && hasEnteredInput !== false) {
      var stringLength = e.target.value.split("").length,
          doesHaveError = false;
      // Checks to see if the value is blank ("")
      if(stringLength == 0) {
        doesHaveError = true;
      }
      // Sets state to new value
      this.setState({hasError: doesHaveError}, function() {
        // Then bubbles the state up to the parent
        return this.props.handleError(this.state.hasError);
      });
    }
    return hasEnteredInput = true;
  },
  displayLabel: function() {
    if(this.props.label) {
      var label = this.props.label;
      if(this.props.isRequired) {
        var label = label + "*"
      }
      return (
        <InputLabel text={label} />
      )
    }
  },
  displayError: function() {
    if(this.props.hasError) {
      return ( <InputError errorMessage={this.props.errorMessage} /> )
    }
    if (this.state.hasError) {
      return ( <InputError errorMessage={errorMessage} /> )
    }
  },
  render: function () {
    errorMessage = this.props.label + " is a required field!";
    return (
      <div style={inputContainerStyles}>
        <label>
          {this.displayLabel()}
          <input
            style={inputStyles}
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}>
          </input>
          {this.displayError()}
        </label>
      </div>
    )
  }
});

module.exports = Input
