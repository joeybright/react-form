
// components/PasswordInput.jsx
var React = require('react')
var Input = require('./Input.jsx')

var PasswordInput = React.createClass({
  getInitialState: function() {
    // Sets the current error state to blank
    return {
      error: "",
      hasError: false
    }
  },
  // Checks the password against a RegExp
  checkPassword: function(e) {
    var password = e.target.value,
        regEx = new RegExp("[a-z0-9]{5,}", "g"),
        result = regEx.test(password);
    // Start off by removing whatever error was already there
    this.setState({error: ""});
    this.setState({hasError: false});
    // If the event is an input
    if(e.type != "input") {
      // And if the password exists
      if(password !== "") {
        // And the password does not match the RegExp
        if(result === false) {
          // Then there's an error and let the user know
          this.setState({error: "Your password is too short. It must be at least 5 characters long."});
          return this.setState({hasError: true});
        }
      }
    }
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
