
var React = require('react')

var labelStyles = {
  width: "100%",
  fontSize: "14px",
  marginBottom: "5px",
  marginTop: "10px",
  fontFamily: "Helvetica, sans-serif"
}

var InputLabel = React.createClass({
  render: function () {
    return (
      <div style={labelStyles}>{this.props.text}</div>
    )
  }
});

module.exports = InputLabel
