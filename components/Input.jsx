
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
    if(this.props.errorMessage) {
      return ( <InputError errorMessage={this.props.errorMessage} /> )
    }
    if (this.state.errorMessage) {
      return ( <InputError errorMessage={this.state.errorMessage} /> )
    }
  },
  render: function () {
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
