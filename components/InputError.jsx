
// components/TextInput.jsx
var React = require('react')

var errorStyles = {
  width: "100%",
  fontSize: "14px",
  color: "red",
  marginBottom: "10px"
}

var InputError = React.createClass({
  propTypes: {
    // The error message that will be displayed
    errorMessage: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    // Defaults to no error message
    return {errorMessage: ""}
  },
  render: function () {
    // Renders a simple span with the appropriate styling
    return (
      <span style={errorStyles}>{this.props.errorMessage}</span>
    )
  }
});

module.exports = InputError
