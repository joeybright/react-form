
// components/EmailInput.jsx
var React = require('react')
var Input = require('./Input.jsx')

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
    console.log("CHECKING EMAIL");
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
      <Input
        type="email"
        label={this.props.label}
        placeholder={this.props.placeholder}
        isRequired={this.props.isRequired}
        onBlurFunc={this.checkEmail}
        onChangeFunc={this.props.onChangeFunc} />
    )
  }
});

module.exports = EmailInput
