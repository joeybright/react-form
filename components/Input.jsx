
// components/TextInput.jsx
var React = require('react')
var InputError = require('./InputError.jsx')
var InputLabel = require('./InputLabel.jsx')

var errorHandling = require('../helpers/inputErrorHandling.jsx')

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
  // Defines the default props
  getDefaultProps: function() {
    // Currently defines the type as "text"
    // If there is another type prop passed, it will overwrite this default prop
    // errorMessage in-dev.
    return {
      type: "text",
      errorMessage: "",
      hasError: false
    }
  },
  // Set the initial state
  getInitialState: function() {
    // Sets the errorMessage string and hasError boolean to empty and false
    // The component can change it's own state or change states via passed props
    return {
      errorMessage: "",
      hasError: false
    }
  },
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
  // Run when any changes happen to the input
  checkInput: function(e) {
    // Checks to make sure that the input is required (if not, no need to show error)
    // And that the input has been entered at least once
    if(this.props.isRequired === true && hasEnteredInput !== false) {
      // Gets the lengs of the string
      var stringLength = e.target.value.split("").length,
      // Sets initial error to false
          doesHaveError = false;
      // Checks to see if the value is blank ("")
      if(stringLength == 0) {
        // Since this field is required and the length of the string in the input
        // is false, changes the error to true
        doesHaveError = true;
      }
      // Sets state to new value
      this.setState({hasError: doesHaveError}, function() {
        // Then bubbles the state up to the parent
        // TODO: Need to bubble up an error Object to parent, as opposed to boolean
        return this.props.handleError(this.state.hasError);
      });
    }
    // If the prop is not required or hasn't been entered, set hasEnteredInput to true
    return hasEnteredInput = true;
  },
  // Checks the password against a RegExp
  checkPassword: function(e) {
    var regExp = new RegExp("[a-z0-9]{5,}", "g");
    // Start off by removing whatever error was already there
    this.setState({hasError: false});
    // Then run the errorHandling function, passing the event, the RegExp to compare against, and the error message
    return this.setState(errorHandling(e, regExp, "Your password is too short!"), function() {
      this.setState({errorMessage: "Your password is too short! It must be at least 6 characters long."})
      return this.props.setCanSubmit(this.state.hasError);
    });
  },
  // Checks the password against a RegExp
  checkEmail: function(e) {
    var regExp = new RegExp("^[a-z0-9](\\.?[a-z0-9_-]){0,}@[a-z0-9-]+\\.([a-z]{1,6}\\.)?[a-z]{2,6}$", "g");
    // Start off by removing whatever error was already there
    this.setState({hasError: false});
    // Then run the errorHandling function, passing the event, the RegExp to compare against, and the error message
    return this.setState(errorHandling(e, regExp, "That doesn't look quite like an email address."), function() {
      this.setState({errorMessage: "That doesn't look quite like an email address."})
      return this.props.setCanSubmit(this.state.hasError);
    });
  },
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
    // Need to handle both props and state
    // Since the input can determine it has an error
    // And, in addition, an error can be from a parent (such as the PasswordInput component)
    // The internal errors are handled via state
    // External errors handled via props
    if(this.props.hasError) {
      return ( <InputError errorMessage={this.props.errorMessage} /> )
    }
    if (this.state.hasError) {
      // The errorMessage is created on render from the label and an additional
      // piece of text to tell that it's required
      // TODO: Look into this - is it the best way?
      return ( <InputError errorMessage={errorMessage} /> )
    }
  },
  render: function () {
    // Defines the errorMessage
    // TODO: Move to componentDidMount() function to prevent rewriting var on render
    errorMessage = this.props.label + " is a required field!";
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
