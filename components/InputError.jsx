
// components/TextInput.jsx
var React = require('react')

var errorStyles = {
  width: "100%",
  fontSize: "14px",
  color: "red",
  marginBottom: "10px"
}

var InputError = React.createClass({
  getDefaultProps: function() {
    return {errorMessage: ""}
  },
  render: function () {
    return (
      <span style={errorStyles}>{this.props.errorMessage}</span>
    )
  }
});

module.exports = InputError
