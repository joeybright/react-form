
// components/EmailInput.jsx
var React = require('react')
var TextInput = require('./TextInput.jsx')

var EmailInput = React.createClass({
  checkError: function(event) {
    if(this.state.hasError == true) {
      this.checkPassword(event);
    }
  },
  checkEmail: function(event) {
    var email = event.target.value,
        regEx = new RegExp("^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$"),
        result = regEx.test(email);
    if(email != "") {
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
      <TextInput type="email" label={this.props.label} onBlur={this.checkEmail} {...this.props} />
    )
  }
});

module.exports = EmailInput
