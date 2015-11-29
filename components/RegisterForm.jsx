
// components/RegisterForm.jsx
var React = require('react')
// var Form = require('./Form.jsx')
// data
var registerForm = require('../data/register-form.json')

var RegisterForm = React.createClass({
  submitForm: function(data) {
    console.log(data);
  },
  render: function () {
    return (
      <Form handleSubmit={this.submitForm} />
    )
  }
});

module.exports = RegisterForm
