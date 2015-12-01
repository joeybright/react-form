
// components/PasswordInput.jsx
var React = require('react')
var Input = require('./Input.jsx')
var errorHandling = require('../helpers/inputErrorHandling.jsx')

var PasswordInput = React.createClass({
  getInitialState: function() {
    // Sets the current error state to blank and false
    return {error: ""}
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
        label={this.props.label}
        placeholder={this.props.placeholder}
        isRequired={this.props.isRequired}
        errorMessage={this.state.error}
        onBlurFunc={this.checkPassword}
        onChangeFunc={this.checkPassword} />
    )
  }
});

module.exports = PasswordInput
