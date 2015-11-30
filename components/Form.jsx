
// components/Form.jsx
var React = require('react')
var Input = require('./Input.jsx')
var EmailInput = require('./EmailInput.jsx')
var SubmitButton = require('./SubmitButton.jsx')
var PasswordInput = require('./PasswordInput.jsx')

var Form = React.createClass({
  getDefaultProps: function() {
    return this.data;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return console.log(this.state);
  },
  updateState: function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    return this.setState(obj);
  },
  render: function () {
    return (
      <form name="registerForm" className="register-form w100p" onError={this.props.onError}>
        <Input label="First Name" name="first-name" placeholder="John" isRequired="true" onChangeFunc={this.updateState} />
        <Input label="Last Name" name="last-name" placeholder="Doe" isRequired="true" onChangeFunc={this.updateState} />
        <EmailInput label="Email address" name="email-address" placeholder="example@domain.com" isRequired="true" onChangeFunc={this.updateState} />
        <PasswordInput label="Password" name="password" placeholder="averystrong1" isRequired="true" onChangeFunc={this.updateState} />
        <Input label="Favorite Pet" name="favorite-pet" placeholder="Spot" onChangeFunc={this.updateState} />
        <SubmitButton text="Register" onClick={this.handleSubmit} />
      </form>
    )
  }
});

module.exports = Form
