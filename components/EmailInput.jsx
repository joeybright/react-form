
// components/EmailInput.jsx
var React = require('react')
var Input = require('./Input.jsx')
//
var errorHandling = require('../helpers/inputErrorHandling.jsx')

var EmailInput = React.createClass({
  getInitialState: function() {
    // Sets the current error state to blank and false
    return {error: ""}
  },
  handleChange: function(e) {
    this.checkEmail(e);
    this.props.onChangeFunc(e);
  },
  handleError: function(e) {
    // console.log("eml", e);
    // this.props.handleError(e);
  },
  // Checks the password against a RegExp
  checkEmail: function(e) {
    var regExp = new RegExp("^[a-z0-9](\\.?[a-z0-9_-]){0,}@[a-z0-9-]+\\.([a-z]{1,6}\\.)?[a-z]{2,6}$", "g");
    // Start off by removing whatever error was already there
    this.setState({error: ""});
    // Then run the errorHandling function, passing the event, the RegExp to compare against, and the error message
    return this.setState(errorHandling(e, regExp, "That doesn't look quite like an email address."));
  },
  render: function () {
    return (
      <Input
        type="email"
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

module.exports = EmailInput
