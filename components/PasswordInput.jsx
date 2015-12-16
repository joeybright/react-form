
// components/PasswordInput.jsx
var React = require('react')
var Input = require('./Input.jsx')
//
var errorHandling = require('../helpers/inputErrorHandling.jsx')

var PasswordInput = React.createClass({
  // The PasswordInput component requires the same props as an input element
  // since the the PasswordInput component is a version of an Input component
  // with some custom error checking and slightly different HTML.
  // See Input.jsx component to see what the props are for
  propTypes: {
    key: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    isRequired: React.PropTypes.bool.isRequired,
    onChangeFunc: React.PropTypes.func,
    onBlurFunc: React.PropTypes.func,
    onFocusFunc: React.PropTypes.func,
    handleError: React.PropTypes.func.isRequired,
    hasError: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    // Sets the current error state to blank and false
    return {
      errorMessage: "",
      hasError: false,
      canSubmit: false
    }
  },
  // Handles any changes triggered by any events
  handleChange: function(e) {
    // First, checks the password (a function owned by this component)
    this.checkPassword(e);
    // Then, if there is an onChangeFunc passed, runs it
    // TODO: Need to support other events?
    if(this.props.onChangeFunc) {
        this.props.onChangeFunc(e);
    }
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
  render: function () {
    // Renders an input with all necessary props passed
    // The only difference is this input, by default, has a type of "password"
    // And this component has a custom function to check itself for errors
    return (
      <Input
        type="password"
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        isRequired={this.props.isRequired}
        errorMessage={this.state.errorMessage}
        onBlurFunc={this.handleChange}
        onChangeFunc={this.handleChange}
        handleError={this.handleError}
        hasError={this.state.hasError} />
    )
  }
});

module.exports = PasswordInput
