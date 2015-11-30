
// components/PasswordInput.jsx
var React = require('react')
var TextInput = require('./TextInput.jsx')

var PasswordInput = React.createClass({
  getInitialState: function() {
    return {error: ""}
  },
  checkError: function(event) {
    if(this.state.hasError == true) {
      this.checkPassword(event);
    }
  },
  checkPassword: function(event) {
    var password = event.target.value,
        regEx = new RegExp("(?=.{6,}).*", "g"),
        result = regEx.test(password);
    if(password != "") {
      if(result) {
        this.setState({error: ""});
        return this.setState({hasError: false});
      }
      this.setState({error: "error text here"});
      return this.setState({hasError: true});
    }
    this.setState({error: ""});
    return this.setState({hasError: false});
  },
  render: function () {
    return (
      <TextInput type="password" label={this.props.label} errorMessage={this.state.error} onBlurEvent={this.checkPassword} onChange={this.checkError} {...this.props} />
    )
  }
});

module.exports = PasswordInput
