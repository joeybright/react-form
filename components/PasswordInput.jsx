
// components/PasswordInput.jsx
var React = require('react')
var Input = require('./Input.jsx')

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
    console.log("CHECKING PASSWORD");
    // var password = event.target.value,
    //     regEx = new RegExp("(?=.{6,}).*", "g"),
    //     result = regEx.test(password);
    // if(password != "") {
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
    console.log(this.props);
    return (
      <Input
        type="password"
        label={this.props.label}
        placeholder={this.props.placeholder}
        isRequired={this.props.isRequired}
        errorMessage={this.state.error}
        onBlurFunc={this.checkPassword}
        onChangeFunc={this.props.onChangeFunc} />
    )
  }
});

module.exports = PasswordInput
