
// components/Button.jsx
var React = require('react')

var submitButtonStyles = {
  width: "100%",
  padding: "20px",
  borderRadius: "3px",
  background: "#efefef",
  fontSize: "16px",
  marginTop: "5px",
  border: "0"
}

var SubmitButton = React.createClass({
  render: function () {
    return (
      <button style={submitButtonStyles} type="submit" onClick={this.props.onClick} {...this.props}>
        {this.props.text}
      </button>
    )
  }
});

module.exports = SubmitButton
