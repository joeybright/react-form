
// components/EmailInput.jsx
var React = require('react')
var TextInput = require('./TextInput.jsx')

var EmailInput = React.createClass({
  getInitialState: function() {
    return {error: ""}
  },
  checkError: function(event) {
    if(this.state.hasError == true) {
      this.checkPassword(event);
    }
  },
  checkEmail: function(event) {
    // var email = event.target.value,
    //     regEx = new Regex(0),
    //     result = regEx.test(email);
    // if(email != "") {
    //   if(result) {
    //     this.setState({error: ""});
    //     return this.setState({hasError: false});
    //   }
    //   this.setState({error: "error text here"});
    //   return this.setState({hasError: true});
    // }
    // this.setState({error: ""});
    // return this.setState({hasError: false});
  },
  render: function () {
    return (
      <TextInput type="email" label={this.props.label} onBlurEvent={this.checkEmail} {...this.props} />
    )
  }
});

module.exports = EmailInput
