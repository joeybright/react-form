
// components/PasswordInput.jsx
var React = require('react')
var Input = require('./Input.jsx')
//
var errorHandling = require('../helpers/inputErrorHandling.jsx')

var PasswordInput = React.createClass({
  getInitialState: function() {
    // Sets the current error state to blank and false
    return {error: ""}
  },
  handleChange: function(e) {
    this.checkPassword(e);
    this.props.onChangeFunc(e);
  },
  handleError: function(e) {
    // console.log("pswrd", e);
    this.props.handleError(e);
  },
  // Checks the password against a RegExp
  checkPassword: function(e) {
    var regExp = new RegExp("[a-z0-9]{5,}", "g");
    // Start off by removing whatever error was already there
    this.setState({error: ""});
    // Then run the errorHandling function, passing the event, the RegExp to compare against, and the error message
    return this.setState(errorHandling(e, regExp, "Your password is too short!"));
  },
  render: function () {
    return (
      <Input
        type="password"
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        isRequired={this.props.isRequired}
        errorMessage={this.state.error}
        onBlurFunc={this.handleChange}
        onChangeFunc={this.handleChange}
        handleError={this.handleError} />
    )
  }
});

module.exports = PasswordInput
