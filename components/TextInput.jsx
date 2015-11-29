
// components/TextInput.jsx
var React = require('react')

var TextInput = React.createClass({
  getDefaultProps: function() {
    return {type: "text"}
  },
  currentError: function() {
    if(this.props.errorMessage) {
      return (
        <span className="w100p ts-small tc-red mb10">{this.props.errorMessage}</span>
      )
    }
  },
  render: function () {
    return (
      <label className="display-block">
        <span className="w100p ts-small tc-gray mb5 display-block">{this.props.label}</span>
        <input className="w100p p15 mb5" type={this.props.type} onBlur={this.props.onBlur} {...this.props}></input>
        {this.currentError()}
      </label>
    )
  }
});

module.exports = TextInput
