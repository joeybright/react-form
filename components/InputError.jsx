
// components/TextInput.jsx
var React = require('react')

var InputError = React.createClass({
  getDefaultProps: function() {
    return {errorMessage: ""}
  },
  render: function () {
    return (
      <span className="w100p ts-small tc-red mb10">{this.props.errorMessage}</span>
    )
  }
});

module.exports = InputError
