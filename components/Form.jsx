
// components/Form.jsx
var React = require('react')
var Input = require('./Input.jsx')
var EmailInput = require('./EmailInput.jsx')
var SubmitButton = require('./SubmitButton.jsx')
var PasswordInput = require('./PasswordInput.jsx')

var formStyles = {
  width: "100%"
}

var formData = {};

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(e, formData);
  },
  saveData: function(e) {
    var name = e.target.name;
    return formData[name] = e.target.value;
  },
  generateForm: function(form) {
    // Maps the fields array
    var formNodes = this.props.data.fields.map(function(data) {
      switch(data.type) {
        case "text":
          return <Input
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData} />
          break;
        case "password":
          return <PasswordInput
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData} />
          break;
        case "email":
          return <EmailInput
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData} />
          break;
      }
    });
    return formNodes;
  },
  render: function () {
    return (
      <form name="registerForm" style={formStyles} onError={this.props.onError}>
        {this.generateForm(this)}
        <SubmitButton text={this.props.data.submit.text} onClick={this.handleSubmit} />
      </form>
    )
  }
});

module.exports = Form
