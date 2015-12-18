
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
  fontFamily: "Helvetica, sans-serif",
  fontSize: "16px",
  marginBottom: "5px",
  boxSizing: "border-box",
  border: "1px solid #cfcfcf",
  boxShadow: "none",
  borderRadius: "3px"
}

var hasEnteredInput = false;
var errorMessage;
var passwordRegExp = new RegExp("[a-z0-9]{5,}", "g");
var emailRegExp = new RegExp("^[a-z0-9](\\.?[a-z0-9_-]){0,}@[a-z0-9-]+\\.([a-z]{1,6}\\.)?[a-z]{2,6}$", "g");

var Input = React.createClass({
  // Define propTypes for development purposes
  propTypes: {
    // A key that's required when the form is dynamically generated
    key: React.PropTypes.number.isRequired,
    // The type of form field it is
    // Use the HTML form type (text, password, email, etc)
    // Automatically fallsback to type "text"
    type: React.PropTypes.string.isRequired,
    // The label that the form has
    label: React.PropTypes.string,
    // The name of the input
    // Required as it's used to save data
    // Should be unique in each form
    name: React.PropTypes.string.isRequired,
    // Placeholder to display inside of the input field
    placeholder: React.PropTypes.string,
    // A boolean that denotes if a
    isRequired: React.PropTypes.bool.isRequired,
    // Additional function that's triggered on onChange
    onChangeFunc: React.PropTypes.func,
    // Additional function that's triggered on onBlur
    onBlurFunc: React.PropTypes.func,
    // Additional function that's triggered on onFocus
    onFocusFunc: React.PropTypes.func,
    // A function that's passed from parent
    // Should pass an error object (TBD) to this function
    handleError: React.PropTypes.func.isRequired,
    // If the the form start out with an error
    // Defaults to false
    hasError: React.PropTypes.bool.isRequired
  },
  // ************************************************************************
  // INIT
  // ************************************************************************
  // Defines the default props
  getDefaultProps: function() {
    // Currently defines the type as "text"
    // If there is another type prop passed, it will overwrite this default prop
    return {
      type: "text"
    }
  },
  // Set the initial state
  getInitialState: function() {
    // Sets the errorMessage string and hasError boolean to empty and false
    // The component can change it's own state or change states via passed props
    return {
      error: {
        hasError: true,
        errorMessage: "",
        errorElementName: ""
      }
    }
  },
  // ************************************************************************
  // EVENTS
  // ************************************************************************
  // Handles onChange event
  handleChange: function(e) {
    // First, the input checks itself
    this.checkInput(e);
    // Then, if there's an onChangeFunc prop, it runs it
    if(this.props.onChangeFunc) {
      this.props.onChangeFunc(e);
    }
  },
  // Handles onBlur event
  handleBlur: function(e) {
    // First, the input checks itself
    this.checkInput(e);
    // Then, if there's an onBlueFunc prop, it runs it
    if(this.props.onBlurFunc) {
      this.props.onBlurFunc(e);
    }
  },
  // Handles onFocus event
  handleFocus: function(e) {
    // First, the input checks itself
    this.checkInput(e);
    // Then, if there's an onFocusFunc prop, it runs it
    if(this.props.onFocusFunc) {
      this.props.onFocusFunc(e);
    }
  },
  // ************************************************************************
  // CHECK
  // ************************************************************************
  // Run when any changes happen to the input
  checkInput: function(e) {
    // Sets initial error to false
    var doesHaveError = false;
    // Checks to make sure that the input is required (if not, no need to show error)
    // And that the input has been entered at least once
    if(hasEnteredInput !== false) {
      // Checking only if the form field is required
      if(this.props.isRequired === true) {
        // Gets the lengs of the string
        var stringLength = e.target.value.split("").length;
        // Checks to see if the value is blank ("")
        if(stringLength == 0) {
          // Since this field is required and the length of the string in the input
          // is false, changes the error to true
          doesHaveError = true;
          errorMessage = this.props.label + " is a required field!";
        }
      }
      // Checking for password and email input types
      // If the event is not an input event
      if(e.type != "input") {
        // If the event is not an input event
        if(e.target.value !== "") {
          // If it's a password type, checks for a password error
          if(this.props.type === "password") {
            doesHaveError = !passwordRegExp.test(e.target.value);
            errorMessage = "Your password need to be at least 6 characters!";
          }
          // If it's an email password type, checks for an email error
          if(this.props.type === "email") {
            doesHaveError = !emailRegExp.test(e.target.value);
            errorMessage = "That email doesn't look quite right. Try again?";
          }
        }
      }
    }
    this.setState({
      error: {
        hasError: doesHaveError,
        errorMessage: errorMessage,
        errorElementName: e.target.name
      }
    }, function() {
      // Bubble event up
      // this.props.handleError({
      //   elementName: true
      // });
    })
    // If the prop is not required or hasn't been entered, set hasEnteredInput to true
    return hasEnteredInput = true;
  },
  // ************************************************************************
  // RENDER
  // ************************************************************************
  // Renders the label (if there is one)
  displayLabel: function() {
    // If there's a label
    if(this.props.label) {
      var label = this.props.label;
      // And that label is required
      if(this.props.isRequired) {
        // Add an astericks to the end of the label string
        var label = label + "*"
      }
      // Returns the InputLabel component with the text prop being the label string
      return (
        <InputLabel text={label} />
      )
    }
  },
  // Renders an error if there is one
  displayError: function() {
    if (this.state.error.hasError) {
      // The errorMessage is created on render from the label and an additional
      // piece of text to tell that it's required
      // TODO: Look into this - is it the best way?
      return ( <InputError errorMessage={this.state.error.errorMessage} /> )
    }
  },
  render: function () {
    // Renders the form
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
