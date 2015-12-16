
// components/Form.jsx
var React = require('react')
var Input = require('./Input.jsx')
var SubmitButton = require('./SubmitButton.jsx')

var formStyles = {
  width: "100%"
}

var formData = {};
var errors = {};

var Form = React.createClass({
  propTypes: {
    // The data to
    data: React.PropTypes.object.isRequired,
    // Function to pass error object up to parent when there is an error
    onError: React.PropTypes.func.isRequired,
    // Function to pass data object up to parent after form is submitted
    onSubmit: React.PropTypes.func.isRequired
  },
  // ************************************************************************
  // INIT
  // ************************************************************************
  getInitialState: function() {
    return {
      hasError: false,
      canSubmit: false,
      error: {
        message: "",
        name: ""
      },
    }
  },
  // ************************************************************************
  // EVENTS
  // ************************************************************************
  handleSubmit: function(e) {
    // Prevents default action
    e.preventDefault();
    // Bubbles up both the event and the formData object
    this.props.onSubmit(e, formData);
  },
  // Both handle error and set can submit need to update an object
  // similar to how form data is being handled (using the "name" attr)
  // checks all of the items in the array
  // if they don't have errors,
  // set state to false (otherwise true)
  // if they can't submit
  // set state to false (true otherwise)
  handleError: function(error) {
    this.setState({hasError: error.hasError}, function() {
      return this.props.onError({
        hasError: this.state.hasError,
        error: error.info
      });
    });
  },
  // ************************************************************************
  // CHECK
  // ************************************************************************
  setCanSubmit: function(submit) {
    // console.log(submit);
    // if(canSubmit.each() == true) { make can submit a true - otherwise, it's false }
    // return this.setState({canSubmit: submit});
  },
  // Function that saves data to the formData object - this function is passed to
  // the Input components and runs on each change (i.e. whenever something happens to the
  // text in the input)
  // The formData object is passed up to the parent when the form is submitted
  saveData: function(e) {
    var name = e.target.name;
    return formData[name] = e.target.value;
  },
  // ************************************************************************
  // RENDER
  // ************************************************************************
  // Generates the form based on the passed object (data)
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
                  onChangeFunc={form.saveData}
                  handleError={form.handleError} />
          break;
        case "password":
          return <Input
                  type="password"
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError}
                  setCanSubmit={form.setCanSubmit} />
          break;
        case "email":
          return <Input
                  type="email"
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError}
                  setCanSubmit={form.setCanSubmit} />
          break;
      }
    });
    return formNodes;
  },
  // Displays the submit button, diabled if the form can't (and shouldn't submit)
  // Enabled if it can submit
  displaySubmitButton: function() {
    if(this.state.canSubmit == false &&
       this.state.hasError == true) {
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
      <form name={this.props.data.name} style={formStyles}>
        {this.generateForm(this)}
        {this.displaySubmitButton()}
      </form>
    )
  }
});

module.exports = Form
