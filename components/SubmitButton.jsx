
// components/Button.jsx
var React = require('react')

var SubmitButton = React.createClass({
  render: function () {
    return (
      <button className="w100p p20" type="submit" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
});

module.exports = SubmitButton
