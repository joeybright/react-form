
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
  // Set the initial errorMessage state to "" (no error)
  getInitialState: function() {
    return {hasError: true}
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(e, formData);
  },
  handleError: function(error) {
    this.setState({hasError: error}, function() {
      this.props.onError(this.state.hasError);
    });
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
                  key={data.id}
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError}/>
          break;
        case "password":
          return <PasswordInput
                  key={data.id}
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError} />
          break;
        case "email":
          return <EmailInput
                  key={data.id}
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError}/>
          break;
      }
    });
    return formNodes;
  },
  displaySubmitButton: function() {
    if(this.state.hasError == true) {
      return (
        <SubmitButton text={this.props.data.submit.text} onClick={this.handleSubmit} disabled="true" />
      )
    }
    return (
      <SubmitButton text={this.props.data.submit.text} onClick={this.handleSubmit} />
    )
  },
  render: function () {
    return (
      <form name="registerForm" style={formStyles}>
        {this.generateForm(this)}
        {this.displaySubmitButton()}
      </form>
    )
  }
});

module.exports = Form
