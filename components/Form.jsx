
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
      canSubmit: false
    }
  },
  // ************************************************************************
  // EVENTS
  // ************************************************************************
  handleSubmit: function(e) {
    // Prevents default action
    e.preventDefault();
    // If the form can submit
    if(this.state.canSubmit === true) {
      // Bubbles up both the event and the formData object
      this.props.onSubmit(e, formData);
    } else {
      console.log("Can't submit this form!");
    }
  },
  // Handles errors bubbled up from children and makes sure to set the state
  // Uses a similar method of tracking errors of individual elements as the
  // saveData() function
  handleError: function(error) {
    // Establishes a temporary array.
    var allErrors = new Array();
    // Adds a property to the errors object with the hasError value (bool) as
    // the value and the element name as the key
    errors[error.errorElementName] = error.hasError;
    // Takes all of the current elements in the error object and itterates through the,
    for(var prop in errors) {
      // Adds the value (true/false) of each element and adds it to the allErrors array
      allErrors.push(errors[prop]);
    }
    // If true is present in the array (as in there are errors)
    if(allErrors.indexOf(true) > -1) {
      // Edits the state to show that the form can't submit
      return this.setState({canSubmit: false});
    }
    // Otherwise, the form can submit
    return this.setState({canSubmit: true});
  },
  // ************************************************************************
  // CHECK
  // ************************************************************************
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
                  handleError={form.handleError} />
          break;
        case "email":
          return <Input
                  type="email"
                  label={data.label}
                  name={data.name}
                  placeholder={data.placeholder}
                  isRequired={data.isRequired}
                  onChangeFunc={form.saveData}
                  handleError={form.handleError} />
          break;
      }
    });
    return formNodes;
  },
  // Displays the submit button, diabled if the form can't (and shouldn't submit)
  // Enabled if it can submit
  displaySubmitButton: function() {
    if(this.state.canSubmit === false) {
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
